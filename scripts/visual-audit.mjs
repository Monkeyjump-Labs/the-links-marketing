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
 *
 * Why Playwright and not headless Chrome flags: Chrome on macOS clamps windows
 * to a 500px minimum, so `--window-size=390` yields a 390px CROP of a 500px
 * layout and reports overflow that isn't there. Playwright's device emulation
 * sets a true viewport, so the mobile numbers here are real.
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

const report = { contrast: [], otherA11y: [], overflow: [], tapTargets: [], padding: [], internalText: [] };

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext(vp.opts);
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    const resp = await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
    // Guard: a harness 404 renders as a <pre> and axe then reports "no title" /
    // "no lang" as if the SITE were broken. Fail loudly instead of lying.
    if (!resp || !resp.ok()) throw new Error(`audit harness could not load ${route} (${resp?.status()})`);
    const title = await page.title();
    if (!title) throw new Error(`audit harness got an empty document for ${route}`);

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

    await page.screenshot({
      path: join(OUT, `${route.replace(/\//g, '_') || '_root'}${vp.name}.png`),
      fullPage: true,
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

console.log(`\nScreenshots + report.json in ${OUT}\n`);

// This one is a GATE, not a report line. See FORBIDDEN_TEXT.
if (report.internalText.length) {
  console.error(
    `\n✖ ${report.internalText.length} internal note(s) are visible to customers on ` +
      `${[...new Set(report.internalText.map((t) => t.route))].join(', ')}.\n` +
      `  A note addressed to us belongs in <StubNote>, which renders on staging only.\n` +
      `  A fact a customer would look for and we do not have belongs in <GapCell>.\n`,
  );
  process.exit(1);
}
