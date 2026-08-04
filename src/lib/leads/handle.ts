/**
 * The lead handler. Framework-free on purpose: it takes plain fields and two
 * providers and returns a plain result, so it is fully unit-testable and so the
 * same logic can move into `appletron-site-starter` behind whatever route shape
 * the next site uses.
 *
 * ── THE RULE THIS FILE EXISTS TO ENFORCE ────────────────────────────────────
 *
 *   **Never report success unless the lead landed somewhere durable.**
 *
 *   sheet ✅  email ✅   → 200
 *   sheet ✅  email ❌   → 200   the lead is safe; log the email failure
 *   sheet ❌  email ✅   → 500   an inbox is not a system of record
 *   sheet ❌  email ❌   → 500
 *
 * The third row is the one that matters and the one a "just send an email"
 * design gets wrong. An email in an inbox is a notification someone can delete,
 * filter or miss; it is not a record. If the sheet write fails we tell the
 * visitor it failed, so they can try again or phone — rather than thanking them
 * for something we did not keep.
 *
 * Ordering follows from the same rule: sheet FIRST, then notify. Emailing first
 * would mean the venue gets told about a lead that was never recorded.
 */
import { LEAD_LISTS } from './config';
import type { SheetWriter, LeadRow } from './sheet';
import { formatNotification, type Notifier } from './notify';
import { classify } from './spam';

export interface LeadInput {
  fields: Record<string, string>;
  pageUrl?: string;
  now?: number;
}

export interface LeadDeps {
  sheet: SheetWriter;
  notifier?: Notifier;
  formSecret?: string;
  /** Injected so tests can assert on it and so failures are never silent. */
  log?: (level: 'warn' | 'error', message: string) => void;
}

export interface LeadResult {
  status: 200 | 400 | 422 | 500;
  ok: boolean;
  /** Safe to show a visitor. Never leaks provider detail. */
  message: string;
  /** True when we accepted-and-discarded. Looks like success to a bot. */
  discarded?: boolean;
}

/** Only these ever reach the sheet. An unknown field is dropped, not stored. */
const ALLOWED = ['name', 'email', 'phone', 'venue', 'date', 'groupSize', 'message'] as const;

const EMAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

export async function handleLead(input: LeadInput, deps: LeadDeps): Promise<LeadResult> {
  const { fields, pageUrl } = input;
  const now = input.now ?? Date.now();
  const log = deps.log ?? (() => {});

  // ── validate ──────────────────────────────────────────────────────────────
  const listKey = fields.list?.trim();
  const list = listKey ? LEAD_LISTS[listKey] : undefined;
  if (!list) {
    // An unregistered list is a typo or a form nobody wired up. Accepting it
    // would file submissions somewhere no one looks, which is worse than a 400.
    log('error', `lead: unknown list "${listKey ?? '(none)'}"`);
    return { status: 400, ok: false, message: 'This form is not configured correctly. Please call us instead.' };
  }

  const email = fields.email?.trim() ?? '';
  if (!EMAIL_RE.test(email)) {
    return { status: 422, ok: false, message: 'That email address does not look right.' };
  }

  // ── spam ──────────────────────────────────────────────────────────────────
  // Accepted-and-discarded, returning the SAME shape as success. Telling a bot
  // it was caught just teaches whoever wrote it what to change.
  const verdict = classify({ honeypot: fields._hp, stamp: fields._ts }, deps.formSecret, now);
  if (verdict.spam) {
    log('warn', `lead: discarded as spam (${verdict.reason}) on list "${listKey}"`);
    return { status: 200, ok: true, discarded: true, message: 'Thanks — we have got it.' };
  }

  // ── 1. the system of record ───────────────────────────────────────────────
  const row: LeadRow = {
    timestamp: new Date(now).toISOString(),
    list: listKey,
    page: pageUrl ?? '',
    consent: list.consent ?? '',
  };
  for (const key of ALLOWED) {
    const value = fields[key]?.trim();
    if (value) row[key] = value.slice(0, 2000);
  }

  try {
    await deps.sheet.append(row);
  } catch (err) {
    // The one place we fail the request. The visitor is told the truth.
    log('error', `lead: SHEET WRITE FAILED for list "${listKey}": ${(err as Error).message}`);
    return {
      status: 500,
      ok: false,
      message: 'Something went wrong saving that. Please try again, or call us and we will take the details.',
    };
  }

  // ── 2. the notification ───────────────────────────────────────────────────
  // Past this point the lead is durable, so nothing here can fail the request.
  if (deps.notifier) {
    try {
      const { subject, text } = formatNotification(list, listKey, fields, pageUrl);
      await deps.notifier.send({ to: list.notify, subject, text, replyTo: email });
    } catch (err) {
      log('error', `lead: notification failed for list "${listKey}" (lead IS saved): ${(err as Error).message}`);
    }
  } else {
    log('warn', `lead: no notifier configured; "${listKey}" saved to the sheet but nobody was told`);
  }

  return { status: 200, ok: true, message: 'Thanks — we have got it.' };
}
