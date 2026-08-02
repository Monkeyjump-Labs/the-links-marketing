/**
 * Read the canonical DTCG token file at runtime/build time so a surface can be
 * rendered FROM the design system rather than from a copy of it.
 *
 * `marketing/websites/the-links/design/tokens.json` is the single source of
 * truth; `src/styles/tokens.css` is compiled from it by `scripts/build-tokens.mjs`.
 * This module gives Astro pages the same view of that file the compiler has:
 * `{dot.path}` aliases resolved, `$description` preserved, and the WCAG 2.1
 * contrast formula implemented identically to the build gate — so a swatch's
 * ratio is MEASURED here, never transcribed.
 *
 * Only /styleguide uses this today. Nothing in the shipped page tree should
 * import it: production components read the compiled custom properties.
 */
import tokensJson from '../../marketing/websites/the-links/design/tokens.json';

export type TokenValue = string | number | string[] | number[];

/** A DTCG leaf: anything carrying a `$value`. */
export interface TokenLeaf {
  $value: TokenValue;
  $type?: string;
  $description?: string;
}

type TokenNode = Record<string, unknown>;

const root = tokensJson as unknown as TokenNode;

export interface TokenMeta {
  brand: string;
  venues: string[];
  slug: string;
  version: string;
  date: string;
  status: string;
  register: string;
  provenance: string;
  contrastPolicy: string;
  compiledTo: string;
}

export const meta = (root.$extensions as Record<string, TokenMeta>)['com.monkeyjumplabs.meta'];

// ── traversal ────────────────────────────────────────────────────────────────

const isNode = (v: unknown): v is TokenNode => typeof v === 'object' && v !== null && !Array.isArray(v);
const isLeaf = (v: unknown): v is TokenLeaf => isNode(v) && '$value' in v;

/** The node at a dot path, or undefined. */
export function node(path: string): TokenNode | undefined {
  let current: unknown = root;
  for (const key of path.split('.')) {
    if (!isNode(current)) return undefined;
    current = current[key];
  }
  return isNode(current) ? current : undefined;
}

/** The leaf at a dot path, or undefined. */
export function leaf(path: string): TokenLeaf | undefined {
  const found = node(path);
  return isLeaf(found) ? found : undefined;
}

export interface TokenRow extends TokenLeaf {
  /** `palette.midnight` — what you would type when citing this token. */
  path: string;
  /** `midnight` — the last segment. */
  name: string;
  /** The `$value` with every `{dot.path}` alias resolved. */
  resolved: string;
  /** The raw `$value` when it was an alias, e.g. `{palette.midnight}`. */
  alias?: string;
}

/**
 * Every direct child of `path` that is a token leaf, in file order.
 * `$`-prefixed metadata keys and nested sub-groups are skipped.
 */
export function group(path: string): TokenRow[] {
  const found = node(path);
  if (!found) return [];
  const rows: TokenRow[] = [];
  for (const [key, child] of Object.entries(found)) {
    if (key.startsWith('$') || !isLeaf(child)) continue;
    const raw = child.$value;
    const alias = typeof raw === 'string' && raw.includes('{') ? raw : undefined;
    rows.push({
      ...child,
      path: `${path}.${key}`,
      name: key,
      resolved: resolve(raw),
      alias,
    });
  }
  return rows;
}

/** `$description` of a group node (not a leaf), e.g. the note on `palette`. */
export function groupDescription(path: string): string | undefined {
  const found = node(path);
  const text = found?.$description;
  return typeof text === 'string' ? text : undefined;
}

// ── alias resolution — same semantics as scripts/build-tokens.mjs ────────────

const flat: Record<string, TokenValue> = {};
(function walk(current: TokenNode, prefix = '') {
  for (const [key, child] of Object.entries(current)) {
    if (key.startsWith('$') || !isNode(child)) continue;
    if (isLeaf(child)) flat[prefix + key] = child.$value;
    walk(child, `${prefix}${key}.`);
  }
})(root);

/** Resolve `{dot.path}` references. Non-strings pass through as text. */
export function resolve(value: TokenValue, seen: Set<string> = new Set()): string {
  if (Array.isArray(value)) return value.map((v) => resolve(v as TokenValue, seen)).join(', ');
  if (typeof value !== 'string') return String(value);
  return value.replace(/\{([^}]+)\}/g, (_match, ref: string) => {
    if (seen.has(ref)) throw new Error(`Circular token reference at {${ref}}`);
    if (!(ref in flat)) throw new Error(`Unresolved token reference {${ref}}`);
    return resolve(flat[ref], new Set([...seen, ref]));
  });
}

/** The resolved value at a dot path. Throws if the path is not a token. */
export function value(path: string): string {
  const found = leaf(path);
  if (!found) throw new Error(`No token at ${path}`);
  return resolve(found.$value);
}

// ── contrast — WCAG 2.1 §1.4.3, identical to the build gate ─────────────────

const channel = (c: number): number => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** sRGB relative luminance of a `#rrggbb` value. */
export function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast ratio between two `#rrggbb` values. Computed, never estimated. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
}

/** `"6.85:1"` — two decimals, matching how the token file records ratios. */
export function ratioText(a: string, b: string): string {
  return `${contrast(a, b).toFixed(2)}:1`;
}

export type ContrastVerdict = 'AA body' | 'AA non-text' | 'below 3:1';

/** WCAG 2.1 AA verdict for a measured pair: 4.5:1 body, 3:1 non-text. */
export function verdict(a: string, b: string): ContrastVerdict {
  const r = contrast(a, b);
  if (r >= 4.5) return 'AA body';
  if (r >= 3) return 'AA non-text';
  return 'below 3:1';
}

// ── small formatting helpers ────────────────────────────────────────────────

/** `"1.5rem"` -> `"24px"`. Returns undefined for anything not in plain rem. */
export function remToPx(v: string): string | undefined {
  const match = /^(-?[\d.]+)rem$/.exec(v.trim());
  return match ? `${Number(match[1]) * 16}px` : undefined;
}

/** The `rules` block: load-bearing prohibitions, in file order. */
export function prohibitions(): Array<{ name: string; text: string }> {
  return group('rules').map((row) => ({ name: row.name, text: row.resolved }));
}

/** `notes.pendingImplementation` — plain strings, not DTCG leaves. */
export function pendingImplementation(): Array<{ name: string; text: string }> {
  const found = node('notes.pendingImplementation');
  if (!found) return [];
  return Object.entries(found)
    .filter(([key, v]) => !key.startsWith('$') && typeof v === 'string')
    .map(([key, v]) => ({ name: key, text: v as string }));
}
