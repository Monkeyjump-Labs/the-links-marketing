/**
 * The notification email — **not** the system of record.
 *
 * The sheet holds the lead; this tells a human it arrived. That ordering is the
 * entire reason the store exists, and it is enforced in `handleLead`: a failure
 * here does NOT fail the submission, because the lead is already safe.
 *
 * Deliberately behind a one-method interface. Resend was chosen on cost at
 * trivial volume across multiple client domains, not on deliverability — this
 * mail goes to the venue's own inbox, a known mailbox that wants it, which is a
 * far lower bar than marketing mail. That also makes the choice cheap to
 * reverse: swapping to SES is this file and nothing else.
 */
import { LEAD_FROM, type LeadList } from './config';

export interface Notifier {
  send(msg: { to: string; subject: string; text: string; replyTo?: string }): Promise<void>;
}

export function createResendNotifier(apiKey: string): Notifier {
  return {
    async send(msg) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: LEAD_FROM,
          to: [msg.to],
          subject: msg.subject,
          text: msg.text,
          // The venue hits reply and reaches the CUSTOMER, not us. Without this
          // every reply goes to a no-reply address and the enquiry dies there.
          ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`Resend send failed (${res.status}): ${detail.slice(0, 300)}`);
      }
    },
  };
}

/** Fields worth putting in the body, in the order a human reads them. */
const BODY_FIELDS: [key: string, label: string][] = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['venue', 'Venue'],
  ['date', 'Date'],
  ['groupSize', 'How many people'],
  ['message', 'Message'],
];

/**
 * A plain-text body. No HTML: this is an internal notification read on a phone
 * behind a bar, and plain text renders identically everywhere and never lands in
 * spam for having a broken template.
 */
export function formatNotification(
  list: LeadList,
  listKey: string,
  data: Record<string, string>,
  pageUrl?: string,
): { subject: string; text: string } {
  const who = data.name || data.email || 'someone';
  const lines = BODY_FIELDS.filter(([k]) => data[k]).map(([k, label]) => `${label}: ${data[k]}`);

  if (list.consent) {
    lines.push('', `They were shown: "${list.consent}"`);
  }
  if (pageUrl) lines.push('', `Submitted from: ${pageUrl}`);
  lines.push('', `List: ${listKey}`, 'This is recorded in the submissions spreadsheet.');

  return {
    subject: `${list.label} — ${who}`,
    text: lines.join('\n'),
  };
}
