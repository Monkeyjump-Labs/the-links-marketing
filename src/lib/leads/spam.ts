/**
 * Spam defence, in the cheapest two layers that actually work.
 *
 * 1. **Honeypot** (`_hp`) — a hidden field. Humans never fill it; naive bots
 *    fill every field they find. Already in both forms; kept.
 * 2. **Signed timestamp** — the server stamps the form when the page renders
 *    and signs it. On submit we check the age. A human takes seconds to fill a
 *    form; a script posts instantly, and a harvested form replayed days later
 *    is stale.
 *
 * Signing is what makes the timestamp worth anything. An unsigned one is a
 * number the bot can set to whatever it likes.
 *
 * **No CAPTCHA.** Turnstile is free and privacy-respecting and still costs
 * conversions on a form whose whole job is conversion. It is worth adding the
 * day real spam arrives and not before — these two layers stop the
 * indiscriminate traffic, which is all this site will see.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

/** Below this, nobody typed it. */
const MIN_AGE_MS = 3_000;
/** Above this, the page has been sitting open (or harvested) too long. */
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

export function signTimestamp(issuedAt: number, secret: string): string {
  const mac = createHmac('sha256', secret).update(String(issuedAt)).digest('hex');
  return `${issuedAt}.${mac}`;
}

export type StampVerdict = 'ok' | 'missing' | 'malformed' | 'bad-signature' | 'too-fast' | 'expired';

export function verifyTimestamp(token: string | undefined, secret: string, now = Date.now()): StampVerdict {
  if (!token) return 'missing';

  const [issuedRaw, mac] = token.split('.');
  const issuedAt = Number(issuedRaw);
  if (!issuedRaw || !mac || !Number.isFinite(issuedAt)) return 'malformed';

  const expected = createHmac('sha256', secret).update(issuedRaw).digest('hex');
  // Constant-time compare. Length check first — timingSafeEqual throws on a
  // length mismatch rather than returning false.
  const a = Buffer.from(mac, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return 'bad-signature';

  const age = now - issuedAt;
  if (age < MIN_AGE_MS) return 'too-fast';
  if (age > MAX_AGE_MS) return 'expired';
  return 'ok';
}

/**
 * Is this submission spam?
 *
 * Returns a reason for logging rather than a bare boolean, because "we silently
 * dropped some submissions" is not a state anyone should have to guess at later.
 *
 * ── WHY A MISSING STAMP IS ACCEPTED ─────────────────────────────────────────
 *
 * Every page on this site is PRERENDERED. A stamp embedded at build time would
 * be hours or weeks old by the time a visitor loads the page, so the age check
 * would reject everyone — and a build-time stamp measures time since deploy,
 * which says nothing about how fast the form was filled in.
 *
 * So the stamp is issued at RUNTIME by `GET /api/lead?stamp=1`, which the
 * enhancement script fetches when a visitor first touches a form. That makes it
 * a real signal: it is minted when a human engages, not when we deployed.
 *
 * It is therefore only present on the JavaScript path, and a no-JS visitor
 * submits without one. We accept that submission. Requiring the stamp would
 * close the no-JS path, and on this site that path guards the homepage waitlist
 * and the events enquiry — the two conversions the pages are built around.
 * Losing a real customer to protect against spam we are not currently getting
 * is the wrong trade.
 *
 * The honest summary: **a present-but-invalid stamp is caught; an absent one is
 * not.** This raises the cost of a naive bot without closing the accessible
 * path. Turnstile is the escalation if real spam ever arrives — see the note in
 * the file header.
 *
 * With no secret configured the check is skipped entirely: a missing
 * `LEAD_FORM_SECRET` is our misconfiguration, and rejecting a customer over it
 * is worse than accepting spam. `leads:check` stops that reaching production.
 */
export function classify(
  fields: { honeypot?: string; stamp?: string },
  secret: string | undefined,
  now = Date.now(),
): { spam: boolean; reason?: string } {
  if (fields.honeypot) return { spam: true, reason: 'honeypot filled' };
  if (!secret) return { spam: false };
  if (!fields.stamp) return { spam: false };

  const verdict = verifyTimestamp(fields.stamp, secret, now);
  if (verdict !== 'ok') return { spam: true, reason: `timestamp ${verdict}` };
  return { spam: false };
}
