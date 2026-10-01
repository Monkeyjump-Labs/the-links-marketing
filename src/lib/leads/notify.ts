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
  // Above `message` on purpose: on a lesson enquiry this is the line that
  // decides which coach the mail gets forwarded to, so it should be read before
  // the paragraph, not after it. Absent on every other form, and a field that
  // is not present is not printed.
  ['lessonFor', 'Who the lesson is for'],
  // Same reasoning as the line above, for an application: these two are what
  // decide whether there is a conversation to have, so they are read before the
  // paragraph rather than after it. Absent on every other form.
  ['role', 'Kind of work'],
  ['availability', 'When they can work'],
  ['message', 'Message'],
];

/**
 * A plain-text body. No HTML: this is an internal notification read on a phone
 * behind a bar, and plain text renders identically everywhere and never lands in
 * spam for having a broken template.
 */
export function formatNotification(
  list: LeadList,
  data: Record<string, string>,
  pageUrl?: string,
): { subject: string; text: string } {
  const who = data.name || data.email || 'someone';
  const lines = BODY_FIELDS.filter(([k]) => data[k]).map(([k, label]) => `${label}: ${data[k]}`);

  // The consent promise is deliberately NOT repeated here. It is written onto
  // every row of the workbook (`handle.ts`), which is where it belongs as a
  // record — in the notification it read as a stray fragment addressed to
  // nobody, and the venue reported it as such. Removing it loses no record.
  if (pageUrl) lines.push('', `Submitted from: ${pageUrl}`);
  lines.push('', `Form: ${list.label}`, 'This is recorded in the submissions spreadsheet.');

  return {
    subject: `${list.label} — ${who}`,
    text: lines.join('\n'),
  };
}
