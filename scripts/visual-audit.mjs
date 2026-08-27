#!/usr/bin/env node
/**
 * Visual + accessibility audit of the built site.
 *
 *   npm run audit:visual
 *
 * Serves the built static output, then for every route at desktop and mobile:
 *   - runs axe-core (colour-contrast, names, landmarks, …)
 *   - screenshots full page into .audit/
 *   - measures real layout facts: horizontal overflow, tap-target sizes,
 *     and the actual computed padding on every section
 *   - tallies the bytes the browser actually fetched, against a budget
 *
 * Why Playwright and not headless Chrome flags: Chrome on macOS clamps windows
 * to a 500px minimum, so `--window-size=390` yields a 390px CROP of a 500px
 * layout and reports overflow that isn't there. Playwright's device emulation
 * sets a true viewport, so the mobile numbers here are real.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * WHY THE PAGE-WEIGHT GATE MEASURES FETCHED BYTES, NOT BYTES ON DISK (FW-4009)
 * ──────────────────────────────────────────────────────────────────────────────
 * This is the decision here most likely to be "simplified" later, so it is
 * written down rather than implied. A budget computed by walking the built
 * directory would be much easier to write, and would be WRONG in both
 * directions on pages this site actually has:
 *
 *   - `/simulators/` commits ~3.4 MB of pillar video and fetches ~318 KB on
 *     load. The four loops are `preload="none"` and in-view-gated, so a visitor
 *     who does not scroll never pays for them. A disk-based budget would fail
 *     that page for video it never loads — and the obvious fix for a failing
 *     gate is to raise the number, at which point it stops catching anything.
 *   - The reverse case is worse. Weight arriving from outside the built tree —
 *     an embed, a third-party tag, a CDN font — is invisible on disk, and is
 *     exactly the sort of regression a page-weight budget exists to catch.
 *
 * So the tally is per-request, via `requestfinished` +
 * `request.sizes().responseBodySize`: the encoded body of everything the
 * browser genuinely pulled down. That is what a visitor pays for.
 *
 * Two properties to know before trusting a figure here:
 *
 *   1. It is measured AT LOAD, and counting stops before the full-page
 *      screenshot. That screenshot expands the viewport to capture the whole
 *      document, which triggers every in-view-gated video on the page and
 *      roughly quadruples `/simulators/`. So these are above-the-fold figures
 *      by design. Gating the scrolled-to-bottom cost is a SEPARATE and looser
 *      measurement — do not fold it into this number.
 *   2. The harness serves uncompressed, so text (HTML/CSS/JS) measures larger
 *      here than over the wire, where Vercel gzips it. Media, images and fonts
 *      are already compressed and measure true. The figure is therefore a
 *      conservative over-estimate for text — the right direction for a gate to
 *      err — and it is DETERMINISTIC: repeat runs agree byte-for-byte, so a
 *      change in the number means a change in the site, not in the weather.
 */
import { chromium, devices } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

/**
 * Where the built HTML lives.
 *
 * Adding the Vercel adapter (for `/api/lead`) moved the prerendered output:
 * Astro now writes `dist/client`, and the adapter assembles the deployable tree
 * under `.vercel/output/static`. This script served `dist` and started 404ing on
 * every route — which reads as "the whole site is broken" rather than "the
 * harness is looking in the wrong folder", so it is resolved rather than hardcoded.
 *
 * Preference order, so it keeps working with or without an adapter, and fails
 * with something actionable instead of a wall of 404s.
 */
const CANDIDATES = ['.vercel/output/static', 'dist/client', 'dist'];
const DIST = CANDIDATES.map((d) => resolve(d)).find((d) => existsSync(join(d, 'index.html')));
if (!DIST) {
  console.error(
    `\n✖ No built site found. Looked for index.html in:\n${CANDIDATES.map((c) => `    ${c}`).join('\n')}\n\n  Run:  npm run build\n`,
  );
  process.exit(1);
}
const OUT = resolve('.audit');
const PORT = 4477;

const ROUTES = [
  '/',
  '/book/',
  '/rates/',
  '/leagues/',
  '/locations/lakeville/',
  '/locations/stillwater/',
  '/memberships/',
  '/events/',
  // /simulators/ was missing from this list until 2026-08-03, so one of the four
  // pages FW-3967 rebuilt had never been contrast- or overflow-checked at all.
  // Every route the site publishes should be here; a page absent from the audit
  // is a page whose regressions nobody sees.
  '/simulators/',
  // Added with the lessons enquiry form (FW-3999) — same reasoning as the line
  // above. The page now carries a real lead form, and an unaudited form is
  // precisely the regression this list exists to catch.
  '/lessons/',
  '/thanks/',
  '/menu/',
  '/contact/',
  '/faq/',
  '/about/',
  // Added 2026-08-05 (FW-4013), and the reason is worth keeping. Ten live pages
  // were rendering raw internal "STUB —" notes to customers; the five below were
  // the worst of them AND the five missing from this list. A page absent from
  // the audit is a page whose regressions nobody sees — for a year, in this case.
  // Every route the site publishes belongs here. Do not prune this list.
  '/privacy/',
  '/terms/',
  '/policy/',
  '/juniors/',
  '/gift-cards/',
];

/**
 * Text that is written for US and must never reach a customer.
 *
 * The build-state marks (`StubNote`) render on staging only, so this gate is a
 * PRODUCTION-BUILD assertion: if one of these strings is visible in the rendered
 * page, an internal note has leaked into customer-facing copy again.
 *
 * It fails the run rather than printing a warning, because the defect it catches
 * shipped and sat on the live site — a line in a report nobody read is how it
 * got there. Note the audit builds without PUBLIC_SITE_NOINDEX, so `StubNote`
 * output is legitimately absent and this can be strict.
 *
 * `/styleguide/` is not audited, and if it ever is, it will need an exemption —
 * it demonstrates the marks rather than using them.
 */
const FORBIDDEN_TEXT = [
  { pattern: /\bSTUB\b/, why: 'an internal stub marker' },
  { pattern: /\bTBC\b/, why: 'a placeholder standing in for a real value' },
  { pattern: /Needs client input/i, why: 'an instruction addressed to us' },
  { pattern: /needs? confirming with the client/i, why: 'an instruction addressed to us' },
];

/**
 * PAGE-WEIGHT BUDGETS, in KB of fetched response bodies (FW-4009).
 *
 * They live here, next to their reasoning, rather than in a config file — the
 * same call as the contrast pairings in `tokens.json`. A bare number in a config
 * file has no argument attached to it, and gets raised the first time it fails.
 *
 * ── How these numbers were chosen ────────────────────────────────────────────
 * Measured against the site as built on 2026-08-06, every route, both viewports:
 *
 *   floor          ~205 KB   fonts 130 + stylesheet 62 + a ~13 KB document
 *   typical page   205–264 KB
 *   /simulators/    317.5 KB  four video POSTERS (~82 KB); the loops stay unfetched
 *   / desktop      1206.1 KB  the hero film, which autoplays above the fold
 *   / mobile        255.5 KB  same page, film below the fold, so never fetched
 *
 * The floor is the striking part: two thirds of a typical page here is font and
 * stylesheet, identical on every route. So a per-route budget is really a budget
 * on what that route adds on top of ~205 KB, and DEFAULT below leaves room for
 * roughly one more hero image before it complains.
 *
 * ── Why desktop and mobile are separate ──────────────────────────────────────
 * Only `/` actually differs, and it differs by 950 KB. Every other route fetches
 * the same bytes at both viewports. A single shared budget would have to be the
 * looser of the two, which would let the homepage ship a megabyte to phones —
 * the visitors least able to afford it — without anything noticing. Splitting
 * them is what makes the homepage's mobile figure a fact the gate holds us to.
 */
const BUDGET_KB = {
  /**
   * Everything that is not the homepage. `/simulators/` is the heaviest at
   * 317.5 KB, so this leaves it ~26% headroom — enough for ordinary copy and
   * image work, not enough for a video. If one of the pillar loops is ever made
   * eager it adds ~600 KB and fails here, loudly, which is the entire point.
   */
  default: { desktop: 400, mobile: 400 },

  /**
   * Per-route ceilings. Add sparingly: every entry here is a page exempted from
   * the rule, so it should carry the reason it deserves to be.
   */
  routes: {
    /**
     * The homepage carries the promo film as its hero (FW-4010), autoplaying
     * above the fold on desktop. That took it from 256 KB to 1207 KB and no
     * gate noticed — which is the defect that produced this budget.
     *
     * 1300 is a RATCHET, NOT AN ENDORSEMENT. 1.2 MB for a landing page is heavy
     * and we should be bringing it down, not growing into the allowance; the
     * ~8% of headroom is there for copy changes and nothing else. If you are
     * reading this because the gate failed: the answer is a smaller film — a
     * lower bitrate, a shorter loop, or a poster with the film behind a click —
     * not a bigger number on this line.
     *
     * Mobile stays on a near-default 350 because the film sits below the fold
     * there and is never fetched (255.5 KB measured). That is a real property of
     * the layout, and this is what keeps it true.
     */
    '/': { desktop: 1300, mobile: 350 },
  },
};

const budgetFor = (route, viewport) => (BUDGET_KB.routes[route] ?? BUDGET_KB.default)[viewport];

/**
 * How long to keep counting after `load` fires.
 *
 * `load` can resolve before an autoplaying video's first bytes land, which made
 * the homepage measure light and erratic. 1200ms is empirically enough for the
 * figures to repeat byte-for-byte across runs, and short enough that it does not
 * let anything in-view-gated sneak into the tally.
 */
const WEIGHT_SETTLE_MS = 1200;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = join(DIST, p);
    if (p.endsWith('/')) file = join(file, 'index.html');
    else if (!extname(file) && existsSync(join(DIST, p, 'index.html'))) file = join(DIST, p, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  }
});
await new Promise((r) => server.listen(PORT, r));
await mkdir(OUT, { recursive: true });

/**
 * Fail with something actionable when the browser binary is missing.
 *
 * A dependency bump can leave Playwright installed but its browser absent, and
 * the raw error is a wall of stack trace that is easy to skim past — which is
 * how a run that never happened gets reported as a pass. 2026-08-04: exactly
 * that, and the gate was claimed green in a commit message before anyone
 * noticed the audit had not run at all.
 */
let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  if (/Executable doesn't exist|playwright install/i.test(String(err))) {
    console.error(`\n✖ audit:visual could not start — Playwright's browser is not installed.\n`);
    console.error('  Run:  npx playwright install chromium\n');
    console.error('  This gate did NOT run. Do not record it as passing.\n');
    process.exit(1);
  }
  throw err;
}
const VIEWPORTS = [
  { name: 'desktop', opts: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  { name: 'mobile', opts: { ...devices['iPhone 13'] } },
];

const report = {
  contrast: [],
  otherA11y: [],
  overflow: [],
  tapTargets: [],
  padding: [],
  internalText: [],
  pageWeight: [],
};

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext(vp.opts);
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    // ── page weight: start counting BEFORE the navigation ──────────────────
    // See the header note. `responseBodySize` is the encoded body, so this is
    // bytes off the wire rather than bytes on disk. Sizes resolve asynchronously,
    // so the promises are collected and awaited before the total is read.
    let fetchedBytes = 0;
    let counting = true;
    const byType = {};
    const sizeProbes = [];
    const onRequestFinished = (request) => {
      if (!counting) return;
      sizeProbes.push(
        request
          .sizes()
          .then(({ responseBodySize }) => {
            fetchedBytes += responseBodySize;
            const type = request.resourceType();
            byType[type] = (byType[type] ?? 0) + responseBodySize;
          })
          // A request that never reported sizes contributes nothing rather than
          // taking the whole audit down; the gate errs light, and a genuinely
          // heavy page cannot hide behind one unmeasured request.
          .catch(() => {}),
      );
    };
    page.on('requestfinished', onRequestFinished);

    const resp = await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
    // Guard: a harness 404 renders as a <pre> and axe then reports "no title" /
    // "no lang" as if the SITE were broken. Fail loudly instead of lying.
    if (!resp || !resp.ok()) throw new Error(`audit harness could not load ${route} (${resp?.status()})`);
    const title = await page.title();
    if (!title) throw new Error(`audit harness got an empty document for ${route}`);

    // Settle, then STOP COUNTING — everything below this line (axe, and above
    // all the full-page screenshot) expands or scrolls the page and would pull
    // in the lazy, in-view-gated video this budget deliberately excludes.
    await page.waitForTimeout(WEIGHT_SETTLE_MS);
    counting = false;
    page.off('requestfinished', onRequestFinished);
    await Promise.all(sizeProbes);

    const kb = Math.round(fetchedBytes / 1024);
    const budget = budgetFor(route, vp.name);
    report.pageWeight.push({
      route,
      viewport: vp.name,
      kb,
      budget,
      over: kb > budget,
      // The three heaviest resource types, so a failure says WHAT got heavier
      // rather than only that something did.
      top: Object.entries(byType)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([type, bytes]) => `${type} ${Math.round(bytes / 1024)}KB`),
    });

    // ── internal build-state text (FW-4013) ────────────────────────────────
    // Read what a VISITOR reads — `innerText`, not the HTML source — so a string
    // inside a comment or an attribute does not trip it and a string rendered
    // into visible copy cannot hide from it.
    if (vp.name === 'desktop') {
      const visible = await page.evaluate(() => document.body.innerText);
      for (const { pattern, why } of FORBIDDEN_TEXT) {
        const hit = visible.match(pattern);
        if (!hit) continue;
        const at = Math.max(0, hit.index - 60);
        report.internalText.push({
          route,
          why,
          match: hit[0],
          context: visible
            .slice(at, hit.index + 120)
            .replace(/\s+/g, ' ')
            .trim(),
        });
      }
    }

    // ── axe ────────────────────────────────────────────────────────────────
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    for (const v of results.violations) {
      const entry = {
        route,
        viewport: vp.name,
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.slice(0, 4).map((n) => ({
          target: n.target.join(' '),
          summary: (n.failureSummary ?? '').split('\n').filter(Boolean).slice(1, 3).join(' | '),
          html: n.html.slice(0, 120),
        })),
        count: v.nodes.length,
      };
      (v.id === 'color-contrast' ? report.contrast : report.otherA11y).push(entry);
    }

    // ── horizontal overflow ────────────────────────────────────────────────
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      const scroll = de.scrollWidth;
      const inner = window.innerWidth;
      if (scroll <= inner + 1) return null;
      const guilty = [...document.querySelectorAll('*')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > inner + 1 && r.width > 0;
        })
        .slice(0, 6)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 90),
          right: Math.round(el.getBoundingClientRect().right),
        }));
      return { scroll, inner, guilty };
    });
    if (overflow) report.overflow.push({ route, viewport: vp.name, ...overflow });

    // ── tap targets ────────────────────────────────────────────────────────
    const small = await page.evaluate(() => {
      // WCAG 2.5.8 exempts links inside a sentence, so only flag real CONTROLS
      // against the 44px floor. An address or phone number inside a paragraph is
      // an inline link, not a button, and reporting it just buries the real ones.
      const MIN = 44;
      const isControl = (el) => {
        if (el.tagName !== 'A') return true;
        const cls = (el.className ?? '').toString();
        if (/\b(btn|button|bg-primary|bg-surface|border-2)\b/.test(cls)) return true;
        const display = getComputedStyle(el).display;
        return display.includes('flex') || display.includes('block');
      };
      return [...document.querySelectorAll('a, button, input, select, [role="button"]')]
        .filter(isControl)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            w: Math.round(r.width),
            h: Math.round(r.height),
            text: (el.textContent ?? '').trim().slice(0, 40),
            tag: el.tagName.toLowerCase(),
          };
        })
        .filter((e) => e.w > 0 && e.h > 0 && e.h < MIN)
        .slice(0, 10);
    });
    if (small.length) report.tapTargets.push({ route, viewport: vp.name, items: small });

    // ── section padding (the "padding issues" complaint, measured) ─────────
    if (vp.name === 'desktop') {
      const pads = await page.evaluate(() => {
        return [...document.querySelectorAll('main section, main > div')].slice(0, 14).map((el, i) => {
          const cs = getComputedStyle(el);
          const inner = el.querySelector(':scope > div') ?? el;
          const ics = getComputedStyle(inner);
          return {
            i,
            cls: (el.className ?? '').toString().slice(0, 70),
            padY: `${cs.paddingTop}/${cs.paddingBottom}`,
            innerPadY: `${ics.paddingTop}/${ics.paddingBottom}`,
            innerPadX: `${ics.paddingLeft}/${ics.paddingRight}`,
          };
        });
      });
      report.padding.push({ route, sections: pads });
    }

    // Freeze the videos first. A fullPage capture scrolls the whole document,
    // which is exactly what makes `videoLoop` start every clip it passes — so
    // the tallest page ends up composited from four playing videos. That is how
    // /simulators/ at mobile width (a 4 MB capture) came to sit on the 30s
    // screenshot timeout and fail the whole run at the LAST route it reaches,
    // with a stack trace and no findings. Pausing is not cosmetic: an audit that
    // dies on its own screenshot reports nothing about the twenty-one routes it
    // already checked.
    await page.evaluate(() => {
      document.querySelectorAll('video').forEach((v) => {
        v.pause();
        v.removeAttribute('autoplay');
      });
    });

    await page.screenshot({
      path: join(OUT, `${route.replace(/\//g, '_') || '_root'}${vp.name}.png`),
      fullPage: true,
      timeout: 60_000,
    });
  }
  await ctx.close();
}

await browser.close();
server.close();

await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2));

// ── summary ──────────────────────────────────────────────────────────────────
const uniq = (arr, key) => [...new Set(arr.map(key))];
console.log('\n══ CONTRAST (axe colour-contrast) ══');
if (!report.contrast.length) console.log('  none');
for (const c of report.contrast) {
  console.log(`  ${c.route} [${c.viewport}] — ${c.count} node(s)`);
  for (const n of c.nodes) console.log(`      ${n.target}\n        ${n.summary}`);
}

console.log('\n══ OTHER A11Y ══');
if (!report.otherA11y.length) console.log('  none');
for (const id of uniq(report.otherA11y, (v) => v.id)) {
  const hits = report.otherA11y.filter((v) => v.id === id);
  console.log(`  ${id} (${hits[0].impact}) — ${hits[0].help}`);
  console.log(`      routes: ${uniq(hits, (h) => h.route).join(', ')}`);
  console.log(`      e.g. ${hits[0].nodes[0]?.target} → ${hits[0].nodes[0]?.html}`);
}

console.log('\n══ HORIZONTAL OVERFLOW ══');
if (!report.overflow.length) console.log('  none');
for (const o of report.overflow) {
  console.log(`  ${o.route} [${o.viewport}] scrollWidth ${o.scroll} vs ${o.inner}`);
  for (const g of o.guilty) console.log(`      <${g.tag}> right=${g.right} ${g.cls}`);
}

console.log('\n══ TAP TARGETS < 44px ══');
if (!report.tapTargets.length) console.log('  none');
for (const t of report.tapTargets.filter((t) => t.viewport === 'mobile')) {
  console.log(`  ${t.route}`);
  for (const i of t.items) console.log(`      ${i.w}x${i.h}  <${i.tag}> "${i.text}"`);
}

console.log('\n══ INTERNAL TEXT VISIBLE TO CUSTOMERS ══');
if (!report.internalText.length) console.log('  none');
for (const t of report.internalText) {
  console.log(`  ${t.route} — "${t.match}" is ${t.why}`);
  console.log(`      …${t.context}…`);
}

// ── page weight ──────────────────────────────────────────────────────────────
// EVERY route prints its measured figure, passing or not. A gate that only
// speaks up when it fails tells you a page is too heavy; this one tells you what
// every page weighs, so a regression is legible as a number that moved rather
// than as a single red line with no baseline to compare it to.
console.log('\n══ PAGE WEIGHT (bytes actually fetched at load) ══');
for (const vpName of ['desktop', 'mobile']) {
  console.log(`  ${vpName}`);
  for (const w of report.pageWeight.filter((w) => w.viewport === vpName)) {
    const pct = Math.round((w.kb / w.budget) * 100);
    const mark = w.over ? '✖' : ' ';
    console.log(
      `    ${mark} ${w.route.padEnd(24)} ${String(w.kb).padStart(5)} KB / ${String(w.budget).padStart(4)} KB ` +
        `(${String(pct).padStart(3)}%)   ${w.top.join('  ')}`,
    );
  }
}

console.log(`\nScreenshots + report.json in ${OUT}\n`);

// ── GATES ────────────────────────────────────────────────────────────────────
// Both are gates, not report lines. They are collected rather than exited on in
// place, so one run tells you about BOTH failures — being sent back twice for
// two defects that were both visible the first time is its own small papercut.
const failures = [];

// See FORBIDDEN_TEXT.
if (report.internalText.length) {
  failures.push(
    `✖ ${report.internalText.length} internal note(s) are visible to customers on ` +
      `${[...new Set(report.internalText.map((t) => t.route))].join(', ')}.\n` +
      `  A note addressed to us belongs in <StubNote>, which renders on staging only.\n` +
      `  A fact a customer would look for and we do not have belongs in <GapCell>.`,
  );
}

// See BUDGET_KB.
const overweight = report.pageWeight.filter((w) => w.over);
if (overweight.length) {
  failures.push(
    `✖ ${overweight.length} route/viewport(s) are over the page-weight budget:\n` +
      overweight
        .map(
          (w) =>
            `      ${w.route} [${w.viewport}] — ${w.kb} KB against a ${w.budget} KB budget ` +
            `(+${w.kb - w.budget} KB). Heaviest: ${w.top.join(', ')}.`,
        )
        .join('\n') +
      `\n  These are bytes a visitor actually downloads before scrolling.\n` +
      `  Raising the budget in scripts/visual-audit.mjs is the LAST resort, not the first —\n` +
      `  read the reasoning beside the number before you change it.`,
  );
}

// ── Contrast, other axe rules, and horizontal overflow ───────────────────────
// These were MEASURED and reported for months without gating anything, which
// meant a change could drop text below 4.5:1 or push a page sideways on mobile
// and every check stayed green. All three measured exactly ZERO on 2026-08-27,
// so they were promoted to gates with no baseline needed — the honest moment to
// do it, because a gate introduced at zero can only ever be broken by a
// regression someone just caused.
//
// This matters most for edits made by someone who cannot read the output. The
// client edits on `staging`; these three are the difference between "the page
// looks wrong and nobody notices" and "the promotion is refused".
if (report.contrast.length) {
  failures.push(
    `\u2716 ${report.contrast.length} colour-contrast violation(s):\n` +
      report.contrast
        .map((c) => `      ${c.route} [${c.viewport}] — ${c.description ?? c.id ?? 'contrast'}`)
        .join('\n') +
      `\n  Text must clear 4.5:1 against its ground. Do not fix this by nudging a hex:\n` +
      `  colours come from design/tokens.json, where every text role records a measured\n` +
      `  ratio that build-tokens.mjs re-checks. See design/STYLE-GUIDE.md \u00a72.`,
  );
}

if (report.otherA11y.length) {
  failures.push(
    `\u2716 ${report.otherA11y.length} accessibility violation(s):\n` +
      report.otherA11y
        .map((a) => `      ${a.route} [${a.viewport}] — ${a.description ?? a.id}`)
        .join('\n') +
      `\n  These are axe rules other than contrast — missing names, broken landmarks,\n` +
      `  unlabelled controls. Each one is a visitor who cannot use the page.`,
  );
}

if (report.overflow.length) {
  failures.push(
    `\u2716 ${report.overflow.length} route/viewport(s) scroll sideways:\n` +
      report.overflow
        .map((o) => `      ${o.route} [${o.viewport}] — ${o.detail ?? 'horizontal overflow'}`)
        .join('\n') +
      `\n  Almost always one element with a fixed width, a long unbroken word, or a\n` +
      `  table that needs its own scroll container. On mobile this is the most\n` +
      `  visible way a page reads as broken.`,
  );
}

// NOT a gate: tapTargets. It records every tappable element's real size but
// carries no threshold, and the footer's 20px-high text links would trip any
// naive minimum. Deciding the rule is a design call, not a scripting one — until
// then this stays a measurement in report.json rather than a number someone
// raises to make a red check go away.

if (failures.length) {
  console.error(`\n${failures.join('\n\n')}\n`);
  process.exit(1);
}
