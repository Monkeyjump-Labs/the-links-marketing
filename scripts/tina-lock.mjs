#!/usr/bin/env node
/**
 * Keep tina/tina-lock.json in sync with the LOCAL schema (tina/config.ts).
 *
 * Why this exists: Tina Cloud derives its REMOTE GraphQL schema from the committed
 * tina/tina-lock.json — not from tina/config.ts directly. If you change a
 * collection/field in config.ts but don't refresh the committed lock, Tina Cloud
 * keeps serving the old schema and deploys fail with "local GraphQL schema doesn't
 * match the remote schema." Cloud-mode `tinacms build` won't fix it either — it
 * writes the lock as a snapshot of the (stale) remote, so it can never introduce a
 * new collection. Regenerating the generated files offline
 * (`tinacms build --skip-cloud-checks`) and rebuilding the lock from them breaks
 * that cycle.
 *
 * Modes:
 *   node scripts/tina-lock.mjs           # WRITE tina-lock.json from tina/__generated__
 *   node scripts/tina-lock.mjs --check   # FAIL (exit 1) if the committed lock is stale
 *
 * The --check comparison is SEMANTIC (key-order/whitespace-independent), so it does
 * not flap when Tina's own tooling serializes the lock in a different key order.
 *
 * Run `tinacms build --skip-cloud-checks` first so tina/__generated__ is fresh
 * (see the `tina:lock` npm script).
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const GEN = 'tina/__generated__';
const LOCK = 'tina/tina-lock.json';
const read = (f) => JSON.parse(readFileSync(`${GEN}/${f}`, 'utf8'));

// `tinacms build` (run just before this script) emits the Tina admin SPA into
// public/admin as a byproduct. It's gitignored, not needed for the lock, and its
// minified bundle makes `astro check` OOM-crash if left on disk. Remove it so the
// lock step never pollutes a later type-check / build. Dev regenerates it via
// `npm run dev`.
rmSync('public/admin', { recursive: true, force: true });

// Native Tina key order is { schema, lookup, graphql } — match it to avoid churn.
const fresh = {
  schema: read('_schema.json'),
  lookup: read('_lookup.json'),
  graphql: read('_graphql.json'),
};

// Recursively sort object keys so comparison ignores key order.
const canonical = (v) =>
  Array.isArray(v)
    ? v.map(canonical)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canonical(v[k])]))
      : v;

const names = fresh.schema.collections.map((c) => c.name);

if (process.argv.includes('--check')) {
  let committed;
  try {
    committed = JSON.parse(readFileSync(LOCK, 'utf8'));
  } catch {
    console.error(`::error file=${LOCK}::${LOCK} is missing. Run 'npm run tina:lock' and commit it.`);
    process.exit(1);
  }
  const stale = JSON.stringify(canonical(committed)) !== JSON.stringify(canonical(fresh));
  if (stale) {
    console.error(
      `::error file=${LOCK}::Stale Tina lock. You changed tina/config.ts but did not regenerate ${LOCK}. ` +
        `Run 'npm run tina:lock' and commit ${LOCK}. (schema collections: [${names.join(', ')}])`,
    );
    process.exit(1);
  }
  console.log(`${LOCK} is up to date ✓ (collections: [${names.join(', ')}])`);
} else {
  writeFileSync(LOCK, JSON.stringify(fresh));
  console.log(`${LOCK} rebuilt from ${GEN} — collections: [${names.join(', ')}]`);
}
