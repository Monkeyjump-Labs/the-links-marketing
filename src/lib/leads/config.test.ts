/**
 * The schema exists in two places, and this is what stops them drifting.
 *
 * `scripts/provision-sheet.mjs` is plain ESM run straight by node — no build
 * step, no TypeScript — so it cannot import `config.ts` and instead keeps its
 * own copy of the tab names and the column list. Its header comment used to
 * claim "kept in step by the check at the bottom of this file"; there was no
 * such check, and the first column added after that comment was written would
 * have shipped a header row that no longer described the rows underneath it.
 *
 * Reading the script as text is deliberately crude, and that is the point: it
 * asserts on the literal a human edits, so an edit to one list and not the other
 * fails the suite rather than the customer's submission.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SHEET_COLUMNS, DATA_TABS, TABS } from './config';

const script = readFileSync(new URL('../../../scripts/provision-sheet.mjs', import.meta.url), 'utf8');

/** Pull `const NAME = [ … ]` out of the script and read its string literals. */
function arrayLiteral(name: string): string[] {
  const match = script.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!match) throw new Error(`provision-sheet.mjs no longer declares a "${name}" array`);
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

describe('the sheet schema is the same in both places', () => {
  it('provision-sheet.mjs writes exactly the columns the site appends', () => {
    expect(arrayLiteral('COLUMNS')).toEqual([...SHEET_COLUMNS]);
  });

  it('provision-sheet.mjs creates exactly the tabs the site routes to', () => {
    // The script builds DATA_TABS from its own TABS object, so compare against
    // the values rather than the literal — this is the list it actually creates.
    const tabValues = [...script.matchAll(/const TABS = \{([^}]*)\}/g)]
      .flatMap((m) => [...m[1].matchAll(/'([^']+)'/g)])
      .map((m) => m[1]);
    for (const tab of Object.values(TABS)) expect(tabValues, `tab "${tab}"`).toContain(tab);
    for (const tab of DATA_TABS) expect(tabValues, `data tab "${tab}"`).toContain(tab);
  });
});
