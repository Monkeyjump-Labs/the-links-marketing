/**
 * The failure matrix, asserted.
 *
 * The third case — sheet fails, email succeeds → 500 — is the whole point of
 * this test file. It is the one a "just send an email" implementation gets
 * wrong, and it is invisible in manual testing because the venue DOES get the
 * email; only the visitor is lied to. So it gets a test rather than a comment.
 */
import { describe, it, expect, vi } from 'vitest';
import { handleLead } from './handle';
import { signTimestamp } from './spam';
import type { SheetWriter, LeadRow } from './sheet';
import type { Notifier } from './notify';
import { LEAD_LISTS, DATA_TABS } from './config';

const SECRET = 'test-secret';
const NOW = 1_800_000_000_000;
/** Old enough to clear the 3s "nobody typed that" floor. */
const STAMP = signTimestamp(NOW - 10_000, SECRET);

const base = () => ({
  list: 'event',
  name: 'Dana Reeve',
  email: 'dana@example.com',
  groupSize: '24',
  _ts: STAMP,
});

function okSheet(): SheetWriter & { rows: LeadRow[]; tabs: string[] } {
  const rows: LeadRow[] = [];
  const tabs: string[] = [];
  return {
    rows,
    tabs,
    append: async (r, tab) => {
      rows.push(r);
      tabs.push(tab);
    },
  };
}
const failSheet = (): SheetWriter => ({
  append: async () => {
    throw new Error('sheets 403');
  },
});
const okNotifier = () => ({ send: vi.fn(async () => {}) }) as Notifier & { send: ReturnType<typeof vi.fn> };
const failNotifier = () =>
  ({
    send: vi.fn(async () => {
      throw new Error('resend 500');
    }),
  }) as Notifier & { send: ReturnType<typeof vi.fn> };

describe('handleLead — the failure matrix', () => {
  it('sheet ok + email ok → 200', async () => {
    const sheet = okSheet();
    const r = await handleLead({ fields: base(), now: NOW }, { sheet, notifier: okNotifier(), formSecret: SECRET });
    expect(r.status).toBe(200);
    expect(r.ok).toBe(true);
    expect(sheet.rows).toHaveLength(1);
  });

  it('sheet ok + email FAILS → still 200, because the lead is durable', async () => {
    const sheet = okSheet();
    const log = vi.fn();
    const r = await handleLead(
      { fields: base(), now: NOW },
      { sheet, notifier: failNotifier(), formSecret: SECRET, log },
    );
    expect(r.status).toBe(200);
    expect(sheet.rows).toHaveLength(1);
    // The failure must not be silent — it is the only trace anyone will have.
    expect(log).toHaveBeenCalledWith('error', expect.stringContaining('notification failed'));
  });

  it('sheet FAILS + email ok → 500. An inbox is not a system of record.', async () => {
    const notifier = okNotifier();
    const r = await handleLead({ fields: base(), now: NOW }, { sheet: failSheet(), notifier, formSecret: SECRET });
    expect(r.status).toBe(500);
    expect(r.ok).toBe(false);
    // And we must not have emailed: the notification comes AFTER the record.
    expect(notifier.send).not.toHaveBeenCalled();
  });

  it('sheet FAILS + email fails → 500', async () => {
    const r = await handleLead(
      { fields: base(), now: NOW },
      { sheet: failSheet(), notifier: failNotifier(), formSecret: SECRET },
    );
    expect(r.status).toBe(500);
  });

  it('never reports success without a notifier, but does record the lead', async () => {
    const sheet = okSheet();
    const log = vi.fn();
    const r = await handleLead({ fields: base(), now: NOW }, { sheet, formSecret: SECRET, log });
    expect(r.status).toBe(200);
    expect(sheet.rows).toHaveLength(1);
    expect(log).toHaveBeenCalledWith('warn', expect.stringContaining('nobody was told'));
  });
});

describe('handleLead — validation', () => {
  it('rejects an unregistered list rather than filing it somewhere nobody looks', async () => {
    const sheet = okSheet();
    const r = await handleLead(
      { fields: { ...base(), list: 'not-a-real-list' }, now: NOW },
      { sheet, formSecret: SECRET },
    );
    expect(r.status).toBe(400);
    expect(sheet.rows).toHaveLength(0);
  });

  it('rejects a malformed email', async () => {
    const sheet = okSheet();
    const r = await handleLead({ fields: { ...base(), email: 'nope' }, now: NOW }, { sheet, formSecret: SECRET });
    expect(r.status).toBe(422);
    expect(sheet.rows).toHaveLength(0);
  });

  it('stores only allowlisted fields — an injected extra never reaches the sheet', async () => {
    const sheet = okSheet();
    await handleLead(
      { fields: { ...base(), sneaky: 'value', role: 'admin' }, now: NOW },
      { sheet, formSecret: SECRET },
    );
    expect(Object.keys(sheet.rows[0])).not.toContain('sneaky');
    expect(Object.keys(sheet.rows[0])).not.toContain('role');
  });

  it('records the consent text alongside a waitlist address', async () => {
    const sheet = okSheet();
    await handleLead({ fields: { ...base(), list: 'league-general' }, now: NOW }, { sheet, formSecret: SECRET });
    expect(sheet.rows[0].consent).toContain('One email when registration opens');
  });

  it('stores who a lesson is for — the field that enquiry actually turns on', async () => {
    // `lessonFor` decides which coach the notification gets forwarded to. Drop
    // it from the allowlist and the form still looks like it works, while every
    // junior enquiry arrives indistinguishable from an adult one.
    const sheet = okSheet();
    await handleLead(
      { fields: { ...base(), list: 'lessons', lessonFor: 'A junior' }, now: NOW },
      { sheet, formSecret: SECRET },
    );
    expect(sheet.rows[0].lessonFor).toBe('A junior');
  });
});

describe('handleLead — tab routing', () => {
  // Which tab a submission lands on comes from the routing table, so it is a
  // reviewable diff. These assert the mapping rather than the mechanism.
  it('routes an event enquiry to Enquiries', async () => {
    const sheet = okSheet();
    await handleLead({ fields: base(), now: NOW }, { sheet, formSecret: SECRET });
    expect(sheet.tabs).toEqual(['Enquiries']);
  });

  it('routes a lesson enquiry to Enquiries, not Waitlist', async () => {
    // It reads like a waitlist because it has no date attached, but there is a
    // person waiting on a reply today. Enquiries is worked daily; Waitlist sits
    // untouched until registration opens, which would be the wrong shelf.
    const sheet = okSheet();
    await handleLead({ fields: { ...base(), list: 'lessons' }, now: NOW }, { sheet, formSecret: SECRET });
    expect(sheet.tabs).toEqual(['Enquiries']);
  });

  it('routes every waitlist to Waitlist', async () => {
    for (const list of ['league-general', 'league-fall-winter-2026-lakeville', 'juniors']) {
      const sheet = okSheet();
      await handleLead({ fields: { ...base(), list }, now: NOW }, { sheet, formSecret: SECRET });
      expect(sheet.tabs, list).toEqual(['Waitlist']);
    }
  });

  it('keeps styleguide submissions out of real data', async () => {
    const sheet = okSheet();
    await handleLead({ fields: { ...base(), list: 'styleguide' }, now: NOW }, { sheet, formSecret: SECRET });
    expect(sheet.tabs).toEqual(['Test']);
  });

  it('every registered list names a tab that actually exists', async () => {
    for (const [key, list] of Object.entries(LEAD_LISTS)) {
      expect(DATA_TABS, `list "${key}"`).toContain(list.tab);
    }
  });
});

describe('handleLead — spam', () => {
  it('discards a honeypot submission but looks like success to the bot', async () => {
    const sheet = okSheet();
    const r = await handleLead({ fields: { ...base(), _hp: 'bot' }, now: NOW }, { sheet, formSecret: SECRET });
    expect(r.status).toBe(200);
    expect(r.ok).toBe(true);
    expect(r.discarded).toBe(true);
    expect(sheet.rows).toHaveLength(0);
  });

  it('discards a submission that arrived faster than a human could type', async () => {
    const sheet = okSheet();
    const instant = signTimestamp(NOW - 100, SECRET);
    const r = await handleLead({ fields: { ...base(), _ts: instant }, now: NOW }, { sheet, formSecret: SECRET });
    expect(r.discarded).toBe(true);
    expect(sheet.rows).toHaveLength(0);
  });

  it('discards a forged timestamp', async () => {
    const sheet = okSheet();
    const forged = `${NOW - 10_000}.${'0'.repeat(64)}`;
    const r = await handleLead({ fields: { ...base(), _ts: forged }, now: NOW }, { sheet, formSecret: SECRET });
    expect(r.discarded).toBe(true);
  });

  it('accepts a real submission when no form secret is set, rather than failing closed', async () => {
    // A missing secret is OUR misconfiguration. Rejecting a customer over it is
    // worse than accepting a little spam; `leads:check` stops it reaching prod.
    const sheet = okSheet();
    const r = await handleLead({ fields: { ...base(), _ts: undefined as unknown as string }, now: NOW }, { sheet });
    expect(r.status).toBe(200);
    expect(sheet.rows).toHaveLength(1);
  });

  it('accepts a submission with NO stamp — the no-JS path must stay open', async () => {
    // Pages are prerendered, so the stamp is minted at runtime by the
    // enhancement script. A visitor without JavaScript never gets one, and the
    // homepage waitlist and events enquiry both depend on that path working.
    const sheet = okSheet();
    const fields = { ...base() };
    delete (fields as Partial<typeof fields>)._ts;
    const r = await handleLead({ fields, now: NOW }, { sheet, formSecret: SECRET });
    expect(r.status).toBe(200);
    expect(r.discarded).toBeUndefined();
    expect(sheet.rows).toHaveLength(1);
  });
});
