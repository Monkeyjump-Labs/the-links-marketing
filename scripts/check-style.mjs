#!/usr/bin/env node
/**
 * Token discipline gate.
 *
 *   npm run style:check      fail if a NEW hardcoded value appeared (CI gate)
 *   npm run style:baseline   re-record the baseline after removing some
 *
 * WHAT THIS ENFORCES
 * CLAUDE.md and design/STYLE-GUIDE.md both say the same thing: colours and sizes
 * come from the token system, never from a literal in a component. `tokens.json`
 * is the source of truth, `tokens.css` is generated from it, and every text role
 * carries a measured contrast ratio that `build-tokens.mjs` re-checks. A literal
 * written straight into a component is outside all of that — it cannot be
 * re-themed, and nothing measures its contrast.
 *
 * WHY A BASELINE RATHER THAN ZERO
 * The site inherited 84 one-off values from appletron-site-starter across 24
 * files. A gate that fails on all of them on day one gets switched off within a
 * week, which is worse than no gate. So this records what exists and fails only
 * on an INCREASE. The number can go down and never up — the same ratchet shape
 * as the tina-lock and tokens gates already in this repo.
 *
 * Deleting a violation and running `npm run style:baseline` tightens the gate
 * permanently. There is no way to loosen it except deliberately, in a commit
 * someone reviews.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { globSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const BASELINE = resolve(ROOT, 'scripts/style-baseline.json');

/**
 * `/styleguide` renders the palette, so it necessarily prints hex values as
 * content. It is the one legitimate exception and it is `noIndex`.
 */
const EXEMPT = ['src/pages/styleguide.astro'];

const PATTERNS = [
  {
    id: 'hex',
    // A literal colour. Currently ZERO of these outside the exemption, so this
    // half of the gate starts clean — keep it that way.
    re: /#[0-9a-fA-F]{3,8}\b/g,
    why: 'a literal colour. Use a semantic token — see design/STYLE-GUIDE.md §2.',
  },
  {
    id: 'arbitrary',
    // Tailwind arbitrary value: text-[13px], bg-[#fff], w-[calc(...)], min-h-[80vh].
    re: /\b[a-z][a-z0-9]*(?:-[a-z0-9]+)*-\[[^\]\s]+\]/g,
    why: 'a one-off size or value. Use a scale step from the token set.',
  },
];

const files = globSync('src/**/*.{astro,tsx,ts,jsx,js,css}', { cwd: ROOT })
  .filter((f) => !EXEMPT.includes(f))
  // tokens.css is generated FROM the source of truth; global.css maps tokens
  // into Tailwind. Both are where literals are supposed to live.
  .filter((f) => f !== 'src/styles/tokens.css' && f !== 'src/styles/global.css')
  .sort();

const counts = {};
for (const f of files) {
  const src = readFileSync(resolve(ROOT, f), 'utf8');
  for (const { id, re } of PATTERNS) {
    const n = (src.match(re) || []).length;
    if (n) (counts[f] ??= {})[id] = n;
  }
}

const update = process.argv.includes('--update');
if (update) {
  writeFileSync(BASELINE, JSON.stringify(counts, null, 2) + '\n');
  const total = Object.values(counts).reduce((a, c) => a + Object.values(c).reduce((x, y) => x + y, 0), 0);
  console.log(`✓ baseline recorded — ${total} value(s) across ${Object.keys(counts).length} file(s)`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error('✖ scripts/style-baseline.json is missing. Run: npm run style:baseline');
  process.exit(1);
}
const base = JSON.parse(readFileSync(BASELINE, 'utf8'));

const regressions = [];
for (const [f, found] of Object.entries(counts)) {
  for (const [id, n] of Object.entries(found)) {
    const allowed = base[f]?.[id] ?? 0;
    if (n > allowed) {
      const { why } = PATTERNS.find((p) => p.id === id);
      regressions.push(`  ${f}\n    ${n - allowed} new ${id} value(s) — ${why}`);
    }
  }
}

if (regressions.length) {
  console.error(
    `\n✖ New hardcoded value(s) introduced:\n\n${regressions.join('\n\n')}\n\n` +
      `  The token system is the single place colours and sizes are defined, and it is what\n` +
      `  the contrast gate measures. A literal in a component is outside both.\n\n` +
      `  Read: marketing/websites/the-links/design/STYLE-GUIDE.md\n` +
      `  If a value genuinely has no token, that is a DESIGN decision — add it to\n` +
      `  design/tokens.json and run 'npm run tokens:build', do not inline it.\n`,
  );
  process.exit(1);
}

// A file that got BETTER is worth saying out loud — it is how the ratchet tightens.
const improved = Object.entries(base).filter(([f, b]) =>
  Object.entries(b).some(([id, n]) => (counts[f]?.[id] ?? 0) < n),
);
if (improved.length) {
  console.log(
    `✓ style:check passed — and ${improved.length} file(s) improved.\n` +
      `  Run 'npm run style:baseline' to lock the improvement in.`,
  );
} else {
  console.log('✓ style:check passed — no new hardcoded colours or one-off sizes.');
}
