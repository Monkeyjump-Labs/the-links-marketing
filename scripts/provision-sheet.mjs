#!/usr/bin/env node
/**
 * Provision the submissions workbook: a README cover page, then one tab per
 * kind of work, each with a frozen header row.
 *
 *   npm run sheet:provision
 *
 * Idempotent — safe to re-run. It renames the default `Sheet1` into the README
 * rather than leaving an empty tab beside it, creates any missing data tabs,
 * writes header rows, and puts README first in the tab strip. It NEVER deletes
 * a tab and never clears a data row: an operator re-running this on a live
 * workbook must not be able to destroy submissions.
 *
 * Why a cover page at all: the client opens this spreadsheet cold, months after
 * anyone explained it, usually because they are looking for one person's email
 * address. A grid of a dozen columns with no context is where they give up. The
 * README says what the workbook is, what each tab holds, and — most importantly
 * — the two things that break it if edited.
 *
 * Reads the same env as the site (see .env.example):
 *   GOOGLE_SERVICE_ACCOUNT_JSON_B64, LEAD_SHEET_ID
 */
import { GoogleAuth } from 'google-auth-library';
import { readFileSync, existsSync } from 'node:fs';

// Load .env for local runs. In CI or a shell that already has them, this is a no-op.
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const i = line.indexOf('=');
    if (i > 0 && !line.startsWith('#')) {
      const k = line.slice(0, i);
      if (!process.env[k]) process.env[k] = line.slice(i + 1);
    }
  }
}

const { GOOGLE_SERVICE_ACCOUNT_JSON_B64, LEAD_SHEET_ID } = process.env;
if (!GOOGLE_SERVICE_ACCOUNT_JSON_B64 || !LEAD_SHEET_ID) {
  console.error('\n✖ GOOGLE_SERVICE_ACCOUNT_JSON_B64 and LEAD_SHEET_ID must be set. See .env.example.\n');
  process.exit(1);
}

// Mirrors src/lib/leads/config.ts. This file is plain ESM run by node with no
// build step, so it cannot import the TypeScript module — the copy is kept
// honest by `src/lib/leads/config.test.ts`, which reads this file and fails the
// suite the moment the two lists diverge.
const TABS = { readme: 'README', enquiries: 'Enquiries', waitlist: 'Waitlist', test: 'Test' };
const DATA_TABS = [TABS.enquiries, TABS.waitlist, TABS.test];
const COLUMNS = [
  'timestamp',
  'list',
  'venue',
  'name',
  'email',
  'phone',
  'date',
  'groupSize',
  'message',
  'page',
  'consent',
  'lessonFor',
];

/** What each data tab is for, in the client's terms rather than ours. */
const TAB_NOTES = [
  [
    TABS.enquiries,
    'Someone asking about an event, a party, a group booking or a lesson. Reply to these — they are waiting.',
  ],
  [
    TABS.waitlist,
    'People who asked to hear when leagues or junior programmes open. Nothing to do until registration opens; then export this tab and email them.',
  ],
  [TABS.test, 'Submissions from the internal style guide. Ignore — nothing here is a real customer.'],
];

const README_ROWS = [
  ['The Links — website submissions'],
  [],
  ['Everything submitted through a form on thelinks.golf is recorded here, automatically.'],
  ['This spreadsheet is the record. The email notification is only a heads-up — if an email'],
  ['is deleted or missed, the row is still here. Nothing is ever recorded in only one place.'],
  [],
  ['THE TABS'],
  ...TAB_NOTES.map(([tab, note]) => [tab, note]),
  [],
  ['TWO THINGS THAT WILL BREAK IT'],
  [
    '1.',
    'Do not rename, reorder or delete the columns on a tab. New submissions are written by POSITION, not by header name — so moving a column silently puts every future entry in the wrong place.',
  ],
  [
    '2.',
    'Do not rename or delete the tabs. Submissions are routed to them by name; a renamed tab means submissions stop arriving and nobody finds out until someone goes looking.',
  ],
  [],
  [
    'Adding your own columns on the END is safe. Sorting and filtering is safe. Deleting a row you have dealt with is safe.',
  ],
  [],
  ['Questions: Monkeyjump Labs'],
];

const auth = new GoogleAuth({
  credentials: (() => {
    const c = JSON.parse(Buffer.from(GOOGLE_SERVICE_ACCOUNT_JSON_B64, 'base64').toString('utf8'));
    return { client_email: c.client_email, private_key: c.private_key };
  })(),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const token = await auth.getAccessToken();
const H = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
const API = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(LEAD_SHEET_ID)}`;

const call = async (url, init) => {
  const res = await fetch(url, init);
  if (!res.ok)
    throw new Error(
      `${init?.method ?? 'GET'} ${url.split('/').pop()} → ${res.status}: ${(await res.text()).slice(0, 300)}`,
    );
  return res.json();
};
const batch = (requests) =>
  call(`${API}:batchUpdate`, { method: 'POST', headers: H, body: JSON.stringify({ requests }) });

// `gridProperties.columnCount` is fetched, not assumed: step 2b compares against
// it to decide whether a tab needs widening, and a missing value would read as
// zero and let an update SHRINK a tab the client had extended themselves.
const meta = await call(
  `${API}?fields=properties.title,sheets.properties(title,sheetId,index,gridProperties.columnCount)`,
  { headers: H },
);
const existing = new Map(meta.sheets.map((s) => [s.properties.title, s.properties]));
console.log(`workbook: ${meta.properties.title}`);

// ── 1. README ────────────────────────────────────────────────────────────────
// Repurpose the default Sheet1 rather than adding a tab beside it — an empty
// "Sheet1" next to real tabs is the clearest sign nobody set this up on purpose.
if (!existing.has(TABS.readme)) {
  const defaultTab = [...existing.values()].find((p) => /^Sheet\d+$/.test(p.title));
  if (defaultTab) {
    await batch([
      { updateSheetProperties: { properties: { sheetId: defaultTab.sheetId, title: TABS.readme }, fields: 'title' } },
    ]);
    console.log(`✓ renamed "${defaultTab.title}" → ${TABS.readme}`);
    existing.set(TABS.readme, { ...defaultTab, title: TABS.readme });
    existing.delete(defaultTab.title);
  } else {
    const r = await batch([{ addSheet: { properties: { title: TABS.readme } } }]);
    console.log(`✓ created ${TABS.readme}`);
    existing.set(TABS.readme, r.replies[0].addSheet.properties);
  }
}

// ── 2. data tabs ─────────────────────────────────────────────────────────────
for (const tab of DATA_TABS) {
  if (existing.has(tab)) {
    console.log(`· ${tab} already exists`);
    continue;
  }
  const r = await batch([
    { addSheet: { properties: { title: tab, gridProperties: { frozenRowCount: 1, columnCount: COLUMNS.length } } } },
  ]);
  existing.set(tab, r.replies[0].addSheet.properties);
  console.log(`✓ created ${tab}`);
}

// ── 2b. widen a tab that predates a new column ───────────────────────────────
// A tab is created with exactly `COLUMNS.length` columns, so appending a column
// to the schema leaves every EXISTING tab one short — and the Sheets API does
// not silently grow the grid for you. Writing outside it fails with "exceeds
// grid limits", which arrives as a 400 on a real customer's submission, hours
// after the deploy that caused it. So the widening happens here, where the
// schema change is already being applied. Only ever grows; a tab the client has
// added their own columns to is left alone.
const widen = [...existing.entries()]
  .filter(([title, p]) => DATA_TABS.includes(title) && (p.gridProperties?.columnCount ?? 0) < COLUMNS.length)
  .map(([title, p]) => ({
    title,
    request: {
      updateSheetProperties: {
        properties: { sheetId: p.sheetId, gridProperties: { columnCount: COLUMNS.length } },
        fields: 'gridProperties.columnCount',
      },
    },
  }));
if (widen.length) {
  await batch(widen.map((w) => w.request));
  console.log(`✓ widened to ${COLUMNS.length} columns: ${widen.map((w) => w.title).join(', ')}`);
}

// ── 3. headers ───────────────────────────────────────────────────────────────
// Written every run: cheap, and it repairs a header someone edited by hand
// before the mismatch corrupts rows. Only ever touches row 1.
await call(`${API}/values:batchUpdate`, {
  method: 'POST',
  headers: H,
  body: JSON.stringify({
    valueInputOption: 'RAW',
    data: DATA_TABS.map((tab) => ({ range: `${tab}!A1`, values: [COLUMNS] })),
  }),
});
console.log(`✓ header row written on ${DATA_TABS.length} data tabs`);

await call(`${API}/values/${encodeURIComponent(TABS.readme)}!A1?valueInputOption=RAW`, {
  method: 'PUT',
  headers: H,
  body: JSON.stringify({ values: README_ROWS }),
});
console.log(`✓ ${TABS.readme} cover page written`);

// ── 4. presentation ──────────────────────────────────────────────────────────
await batch([
  // README first in the tab strip.
  { updateSheetProperties: { properties: { sheetId: existing.get(TABS.readme).sheetId, index: 0 }, fields: 'index' } },
  // Bold the header rows and the README title.
  ...DATA_TABS.map((tab) => ({
    repeatCell: {
      range: { sheetId: existing.get(tab).sheetId, startRowIndex: 0, endRowIndex: 1 },
      cell: { userEnteredFormat: { textFormat: { bold: true } } },
      fields: 'userEnteredFormat.textFormat.bold',
    },
  })),
  {
    repeatCell: {
      range: { sheetId: existing.get(TABS.readme).sheetId, startRowIndex: 0, endRowIndex: 1 },
      cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 14 } } },
      fields: 'userEnteredFormat.textFormat(bold,fontSize)',
    },
  },
]);
console.log('✓ README moved to the front; header rows bolded');

console.log(`\nhttps://docs.google.com/spreadsheets/d/${LEAD_SHEET_ID}/edit\n`);
