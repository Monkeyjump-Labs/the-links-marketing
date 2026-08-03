#!/usr/bin/env node
/**
 * Compile the canonical DTCG token file into src/styles/tokens.css.
 *
 *   npm run tokens:build     regenerate tokens.css
 *   npm run tokens:check     fail if tokens.css is stale (CI gate)
 *
 * The DTCG file at marketing/websites/the-links/design/tokens.json is the SINGLE
 * SOURCE OF TRUTH. tokens.css is a build output — never hand-edit it. This is the
 * same shape as the tina-lock gate: a generated file plus a check that fails the
 * PR when someone edits the source and forgets to regenerate.
 *
 * It also HARD-FAILS on a contrast regression. Every text role in the token file
 * is re-measured here against its stated ground, so a well-meaning palette tweak
 * cannot quietly ship a 3.2:1 button the way the old site did on all 41 pages.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'marketing/websites/the-links/design/tokens.json');
const OUT = resolve(root, 'src/styles/tokens.css');

const tokens = JSON.parse(readFileSync(SRC, 'utf8'));

// ── resolve {dot.path} aliases ───────────────────────────────────────────────
const flat = {};
(function walk(node, path = '') {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object') {
      if ('$value' in v) flat[path + k] = v.$value;
      walk(v, path + k + '.');
    }
  }
})(tokens);

const resolveValue = (value, seen = new Set()) => {
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (seen.has(ref)) throw new Error(`Circular token reference at {${ref}}`);
    if (!(ref in flat)) throw new Error(`Unresolved token reference {${ref}}`);
    return resolveValue(flat[ref], new Set([...seen, ref]));
  });
};

// ── contrast gate ────────────────────────────────────────────────────────────
const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** [token, ground, floor] — the pairings that must never regress. */
const GATE = [
  ['semantic.ink.onDarkStrong', 'palette.midnight', 4.5],
  ['semantic.ink.onDark', 'palette.midnight', 4.5],
  ['semantic.ink.mutedOnDark', 'palette.midnight', 4.5],
  ['semantic.ink.displayOnLight', 'palette.white', 4.5],
  ['semantic.ink.bodyOnLight', 'palette.white', 4.5],
  ['semantic.ink.mutedOnLight', 'palette.white', 4.5],
  ['semantic.ink.mutedOnLight', 'palette.greige', 4.5],
  ['semantic.ink.mutedOnNavy', 'palette.navy', 4.5],
  ['semantic.ink.onAccentBand', 'palette.ember', 4.5],
  ['semantic.primary.on', 'palette.ember', 4.5],
  ['semantic.primary.on', 'palette.emberHover', 4.5],
  ['semantic.primary.onDarkFillInk', 'palette.amber', 4.5],
  ['semantic.state.error', 'palette.white', 4.5],
  ['semantic.state.warning', 'palette.white', 4.5],
  ['semantic.state.success', 'palette.white', 4.5],
  ['semantic.state.info', 'palette.white', 4.5],
  ['semantic.state.disabledInk', 'palette.greige', 4.5],
  ['semantic.state.errorOnDark', 'palette.midnight', 4.5],
  ['semantic.state.successOnDark', 'palette.midnight', 4.5],
  ['semantic.state.infoOnDark', 'palette.midnight', 4.5],
  ['semantic.state.focus', 'palette.white', 3],
  ['semantic.state.focusOnDark', 'palette.midnight', 3],
  ['semantic.rule.onLight', 'palette.white', 3],
  ['semantic.rule.onDark', 'palette.midnight', 3],
];

/**
 * [token, ground, floor, useInstead] — pairings that are BANNED because they
 * measure under the floor, re-measured here so the ban cannot go stale.
 *
 * The GATE above asks "is this pairing still good enough?". This asks the
 * opposite question: "is this pairing still bad?" — and that matters because a
 * ban nobody re-checks outlives the measurement it was based on. If a palette
 * edit ever lifts one of these over the floor, the entry is obsolete and the
 * build says so instead of leaving a rule in the style guide that is no longer
 * true.
 *
 * What this canNOT do is catch the pairing being USED: the tokens are correct
 * and only the combination is wrong, so a component that puts slate on navy
 * compiles clean. That is caught at runtime by axe in `npm run audit:visual`,
 * and prevented at design time by there being a right answer to reach for
 * (`ink.mutedOnNavy`). Three gates, because one was demonstrably not enough —
 * the unlayered-CSS regression shipped a site-wide 1.78:1 button while every
 * token in this file was correct.
 */
const FORBIDDEN = [['semantic.ink.mutedOnDark', 'palette.navy', 4.5, 'semantic.ink.mutedOnNavy (screenLight, 8.42:1)']];

const failures = [];
for (const [tokenPath, groundPath, floor] of GATE) {
  const fg = resolveValue(flat[tokenPath]);
  const bg = resolveValue(flat[groundPath]);
  const r = ratio(fg, bg);
  if (r < floor) {
    failures.push(`  ${tokenPath} on ${groundPath}: ${r.toFixed(2)}:1 — needs ${floor}:1`);
  }
}
if (failures.length) {
  console.error(`\n✖ Contrast gate failed — ${failures.length} pairing(s) below the floor:\n`);
  console.error(failures.join('\n'));
  console.error('\nFix the token values. Do not lower the gate.\n');
  process.exit(1);
}

const stale = [];
for (const [tokenPath, groundPath, floor, useInstead] of FORBIDDEN) {
  const r = ratio(resolveValue(flat[tokenPath]), resolveValue(flat[groundPath]));
  if (r >= floor) {
    stale.push(
      `  ${tokenPath} on ${groundPath} now measures ${r.toFixed(2)}:1 (floor ${floor}:1).\n` +
        `    The ban is obsolete. Remove it from FORBIDDEN and from rules.noMutedOnDarkOverNavy,\n` +
        `    or the style guide keeps telling people to use ${useInstead} for no reason.`,
    );
  }
}
if (stale.length) {
  console.error(`\n✖ FORBIDDEN gate: ${stale.length} ban(s) no longer describe the palette:\n`);
  console.error(stale.join('\n'));
  console.error('');
  process.exit(1);
}

// ── emit ─────────────────────────────────────────────────────────────────────
// Handles consecutive capitals: gutterXLg -> gutter-x-lg, not gutter-xlg.
// The naive form silently produced --brand-space-gutter-xlg while the aliases
// referenced --brand-space-gutter-x-lg, so every `-lg` spacing utility on the
// site computed to nothing — no desktop gutters, no large section spacing.
const kebab = (s) =>
  s
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
const meta = tokens.$extensions['com.monkeyjumplabs.meta'];

const line = (name, value, comment) =>
  `  --${name}: ${value};${comment ? ` /* ${comment} */` : ''}`;

const section = (title) => `\n  /* ── ${title} ${'─'.repeat(Math.max(0, 66 - title.length))} */`;

const out = [];
out.push(`/* =============================================================================
 * tokens.css — GENERATED. DO NOT EDIT.
 * -----------------------------------------------------------------------------
 * Source:    marketing/websites/the-links/design/tokens.json  (canonical DTCG)
 * Regenerate: npm run tokens:build
 * CI gate:    npm run tokens:check   (fails if this file is stale)
 *
 * ${meta.brand} · v${meta.version} · ${meta.date}
 * Register: ${meta.register}
 *
 * Every text pairing in the source records a measured WCAG ratio, and the build
 * re-measures them: a palette edit that drops a text role below 4.5:1 fails the
 * build rather than shipping. The old site ran a 3.20:1 button on all 41 pages.
 * ========================================================================== */

:root {`);

// palette primitives
out.push(section('Palette primitives — never reference directly, use the aliases'));
for (const [k, v] of Object.entries(tokens.palette)) {
  if (k.startsWith('$') || k === 'retired') continue;
  out.push(line(`brand-${kebab(k)}`, v.$value));
}

// semantic colour roles
out.push(section('Semantic colour roles — what components reference'));
for (const [group, entries] of Object.entries(tokens.semantic)) {
  if (group.startsWith('$')) continue;
  for (const [k, v] of Object.entries(entries)) {
    if (k.startsWith('$')) continue;
    out.push(line(`brand-${kebab(group)}-${kebab(k)}`, resolveValue(v.$value)));
  }
}

// starter-contract aliases (keep the existing Tailwind utility names working)
out.push(section('Starter-contract aliases — the names global.css @theme maps'));
out.push(line('brand-ink', 'var(--brand-navy)', 'display + default ink, 13.31:1 on white'));
out.push(line('brand-ink-muted', 'var(--brand-ink-muted-cool)', 'secondary text, 6.87:1 — never ink at an opacity'));
out.push(line('brand-ink-body', 'var(--brand-navy-mid)', 'long-form body, 9.92:1 on white'));
out.push(line('brand-surface', 'var(--brand-paper)', 'raised light ground / text on dark'));
out.push(line('brand-primary', 'var(--brand-ember)', 'the action colour'));
out.push(line('brand-accent', 'var(--brand-ember-mid)', 'caution/warning — NOT amber, which is 1.85:1 on white'));

// typography
out.push(section('Typography'));
for (const [k, v] of Object.entries(tokens.font)) {
  if (k.startsWith('$') || k === 'retired') continue;
  const stack = v.$value.map((f) => (/\s/.test(f) ? `'${f}'` : f)).join(', ');
  out.push(line(`brand-font-${kebab(k)}`, stack));
}
for (const group of ['fontWeight', 'fontWidth', 'typeScale', 'tracking', 'lineHeight']) {
  for (const [k, v] of Object.entries(tokens[group])) {
    if (k.startsWith('$')) continue;
    out.push(line(`brand-${kebab(group)}-${kebab(k)}`, resolveValue(v.$value)));
  }
}

// structure
out.push(section('Space, size, radius, border'));
for (const group of ['space', 'size', 'radius', 'border']) {
  for (const [k, v] of Object.entries(tokens[group])) {
    if (k.startsWith('$')) continue;
    out.push(line(`brand-${kebab(group)}-${kebab(k)}`, resolveValue(v.$value)));
  }
}

out.push(section('Motion, z-index, opacity, focus'));
for (const [k, v] of Object.entries(tokens.motion.duration)) {
  if (k.startsWith('$')) continue;
  out.push(line(`brand-duration-${kebab(k)}`, v.$value));
}
for (const [k, v] of Object.entries(tokens.motion.easing)) {
  if (k.startsWith('$')) continue;
  out.push(line(`brand-ease-${kebab(k)}`, `cubic-bezier(${v.$value.join(', ')})`));
}
for (const [k, v] of Object.entries(tokens.zIndex)) {
  if (k.startsWith('$')) continue;
  out.push(line(`brand-z-${kebab(k)}`, v.$value));
}
for (const [k, v] of Object.entries(tokens.opacity)) {
  if (k.startsWith('$')) continue;
  out.push(line(`brand-opacity-${kebab(k)}`, v.$value));
}
out.push(line('brand-focus-width', resolveValue(tokens.focus.width.$value)));
out.push(line('brand-focus-offset', resolveValue(tokens.focus.offset.$value)));

// legacy spacing names the starter's @theme still maps
out.push(section('Legacy starter names (kept so @theme mappings resolve)'));
out.push(line('brand-section-y', 'var(--brand-space-section-y)'));
out.push(line('brand-section-y-lg', 'var(--brand-space-section-y-lg)'));
out.push(line('brand-gutter-x', 'var(--brand-space-gutter-x)'));
out.push(line('brand-gutter-x-lg', 'var(--brand-space-gutter-x-lg)'));
out.push(line('brand-content-max', 'var(--brand-size-content-max)'));
out.push(line('brand-prose-max', 'var(--brand-size-prose-max)'));
out.push(line('brand-font-sans', 'var(--brand-font-body)'));
out.push(line('brand-font-mono', 'var(--brand-font-display)', 'the starter maps font-mono to the DISPLAY slot — it is not monospace here'));

// The 1.x BrandColor union is still referenced by unmigrated starter components
// (the dead blog/case-study modules, ContactForm, 404). Without these the
// utilities resolve to nothing and those files render unstyled. Deprecated:
// nothing new should use them, and they go away when those components do.
out.push(section('DEPRECATED 1.x slot names — do not use in new work'));
const LEGACY = {
  watermelon: '--brand-clay',
  pink: '--brand-ember-mid',
  grape: '--brand-ember',
  lavender: '--brand-slate',
  banana: '--brand-amber',
  gold: '--brand-amber',
  mint: '--brand-screen-light',
  teal: '--brand-navy-mid',
  blue: '--brand-navy',
  'off-white': '--brand-paper',
  'soft-black': '--brand-midnight',
};
for (const [slot, target] of Object.entries(LEGACY)) {
  out.push(line(`brand-${slot}`, `var(${target})`));
}

out.push('}');

// breakpoints can't be custom properties in media queries — emit as a comment block
out.push(`
/* Breakpoints are not usable as custom properties inside @media, so they live in
   global.css. Keep them in sync with the token file:
${Object.entries(tokens.breakpoint)
  .filter(([k]) => !k.startsWith('$'))
  .map(([k, v]) => `     ${k}: ${v.$value}  — ${v.$description ?? ''}`)
  .join('\n')}
*/`);

const css = out.join('\n') + '\n';

const isCheck = process.argv.includes('--check');
if (isCheck) {
  const current = readFileSync(OUT, 'utf8');
  if (current !== css) {
    console.error('\n✖ src/styles/tokens.css is STALE.\n');
    console.error('  The canonical token file changed but tokens.css was not regenerated.');
    console.error('  Run:  npm run tokens:build   and commit the result.\n');
    process.exit(1);
  }
  console.log(`✓ tokens.css is in sync with tokens.json (${GATE.length} contrast pairings pass)`);
} else {
  writeFileSync(OUT, css);
  console.log(`✓ tokens.css written — ${GATE.length} contrast pairings pass`);
}
