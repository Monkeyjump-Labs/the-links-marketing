#!/usr/bin/env node
/**
 * Refuse to ship a production build with lead capture unconfigured.
 *
 *   npm run leads:check
 *
 * This site launched with every form inert because `PUBLIC_LEAD_ENDPOINT` was
 * never set and nothing anywhere objected. The ship gate had a checklist line
 * for it; a checklist line is a person remembering. This is the same move as
 * `tokens:check` failing the build on a contrast regression — make the mistake
 * impossible rather than documented.
 *
 * Both Squarespace and Wix enforce the equivalent in-product: Squarespace will
 * not let you publish a form with no storage destination, and an unconfigured
 * form simply cannot be submitted. This is our version of that rule.
 *
 * STAGING AND DEV STILL BUILD. The gate only binds when a build is
 * production-facing — `PUBLIC_SITE_NOINDEX` is the same signal `StubNote` and
 * the robots.txt generator use to tell the two apart. A contributor previewing
 * a copy change should never need Google credentials.
 */
import { readFileSync } from 'node:fs';

const isStaging = process.env.PUBLIC_SITE_NOINDEX === 'true';
const isCI = process.env.CI === 'true' || process.env.CI === '1';

/** [name, why it matters if missing] */
const REQUIRED = [
  ['GOOGLE_SERVICE_ACCOUNT_JSON_B64', 'no system of record — /api/lead refuses every submission'],
  ['LEAD_SHEET_ID', 'no system of record — /api/lead refuses every submission'],
  ['RESEND_API_KEY', 'submissions are recorded but NOBODY IS TOLD they arrived'],
  ['LEAD_FORM_SECRET', 'the signed-timestamp spam check is skipped; only the honeypot remains'],
];

const missing = REQUIRED.filter(([name]) => !process.env[name]);

/**
 * The notification address is a separate failure from a missing credential, and
 * a quieter one: everything works, submissions are recorded, and the venue
 * simply never hears about them. Loud, but a warning rather than an error —
 * blocking production would stop us deploying while still testing, which is the
 * exact state this is meant to support.
 */
const TESTING_INBOX = 'hello@fareway.golf';
const VENUE_INBOX = 'info@lakevillelinks.com';
if (
  readFileSync(new URL('../src/lib/leads/config.ts', import.meta.url), 'utf8').includes('const INBOX = TESTING_INBOX')
) {
  console.warn(`
┌──────────────────────────────────────────────────────────────────────────┐
│  ⚠  FORM NOTIFICATIONS ARE STILL GOING TO US, NOT TO THE VENUE           │
│                                                                          │
│     currently → ${TESTING_INBOX.padEnd(56)}│
│     should be → ${VENUE_INBOX.padEnd(56)}│
│                                                                          │
│  Submissions ARE recorded in the sheet, so nothing is lost — but no one  │
│  at the venue is told an enquiry arrived. Fix before launch:             │
│  src/lib/leads/config.ts → const INBOX = VENUE_INBOX;                    │
└──────────────────────────────────────────────────────────────────────────┘`);
}

if (isStaging) {
  console.log(`✓ leads:check skipped — staging build (PUBLIC_SITE_NOINDEX=true)`);
  if (missing.length) {
    console.log(`  note: ${missing.length} lead variable(s) unset. Forms will not accept submissions here.`);
  }
  process.exit(0);
}

/**
 * CI builds the site to prove it compiles; it has no business holding the
 * client's Google credentials, and putting them there would spread the secret
 * for no gain. So CI warns and passes. The gate binds where it matters: a real
 * production build, which is where an unconfigured form reaches a customer.
 */
if (isCI && missing.length) {
  console.log('⚠ leads:check — running in CI without lead credentials, which is expected.');
  for (const [name, why] of missing) console.log(`    ${name} — ${why}`);
  console.log('  Passing. The same check FAILS on a real production build.');
  process.exit(0);
}

if (missing.length) {
  console.error('\n✖ Lead capture is not configured, and this is a production build.\n');
  for (const [name, why] of missing) console.error(`  ${name}\n      → ${why}`);
  console.error(`
  Every form on this site posts to /api/lead. Without these it either refuses
  submissions or records them where no one is watching — which is how this site
  went live with five inert forms in the first place.

  Set them in the Vercel project (all three environments), or build with
  PUBLIC_SITE_NOINDEX=true if this is staging.
`);
  process.exit(1);
}

console.log(`✓ leads:check — all ${REQUIRED.length} lead variables present`);
