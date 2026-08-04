/**
 * The routing table: which forms exist, and where each one's notification goes.
 *
 * **This is content, not secrets.** It is committed on purpose — a routing
 * change is a reviewable diff rather than a dashboard click nobody can audit
 * later. Credentials live in Vercel env; nothing here is sensitive.
 *
 * Every form on the site posts to `/api/lead` with a `list` field. A list that
 * is not in this table is REJECTED — an unknown list means either a typo or a
 * form we forgot to register, and silently accepting it would put submissions
 * somewhere nobody looks.
 *
 * **The waitlist is not special.** Sheet plus notification, exactly like every
 * other form; `list` is a column, not a branch. The list-provider sync, double
 * opt-in and campaign send are a future capability, tracked on ClickUp
 * 868kkt2eu — deliberately out of scope here (FW-3975).
 */
export interface LeadList {
  /** Human label, used in the notification subject. */
  label: string;
  /** Where the notification email goes. */
  notify: string;
  /**
   * Shown to the submitter and RECORDED WITH THE ROW.
   *
   * Storing the promise alongside the address is what makes the league email
   * defensible in October: we can say exactly what this person agreed to and
   * when, rather than reconstructing it from whatever the page says by then.
   * It lives here rather than in the component so the promise and the record
   * cannot drift apart.
   */
  consent?: string;
}

/** The venue inbox. One address today; the table exists so that can change per list. */
const INBOX = 'info@lakevillelinks.com';

export const LEAD_LISTS: Record<string, LeadList> = {
  event: {
    label: 'Event enquiry',
    notify: INBOX,
  },
  'league-general': {
    label: 'League waitlist (homepage)',
    notify: INBOX,
    consent: 'One email when registration opens. Nothing else, ever.',
  },
  'league-fall-winter-2026-lakeville': {
    label: 'League waitlist — Lakeville',
    notify: INBOX,
    consent: 'One email when registration opens. Nothing else, ever.',
  },
  'league-fall-winter-2026-stillwater': {
    label: 'League waitlist — Stillwater',
    notify: INBOX,
    consent: 'One email when registration opens. Nothing else, ever.',
  },
  juniors: {
    label: 'Juniors waitlist',
    notify: INBOX,
    consent: 'One email when junior programmes open. Nothing else, ever.',
  },
  /**
   * The styleguide renders live form components for reference. It is noindexed
   * and staging-only, but the forms are real and can be submitted, so the list
   * is registered and routed to the same inbox rather than 400ing in a way that
   * makes the styleguide look broken.
   */
  styleguide: {
    label: 'Styleguide test submission',
    notify: INBOX,
  },
};

/**
 * The sending identity.
 *
 * From `thelinks.golf` (verified in Resend) TO the venue's `lakevillelinks.com`
 * inbox. Sending ACROSS domains rather than from `lakevillelinks.com` to itself
 * avoids same-domain spoofing heuristics, and it puts the brand the venue is
 * renaming *to* on every notification they read.
 */
export const LEAD_FROM = 'The Links website <no-reply@thelinks.golf>';

/** One tab; `list` is a column. A sheet filter gives per-list views for free. */
export const SHEET_TAB = 'Submissions';

/**
 * Column order for the sheet. Append-only — adding a column is safe, but
 * REORDERING OR REMOVING one silently corrupts every row written after the
 * change, because the Sheets API appends positionally and has no idea what a
 * header means. New fields go on the end.
 */
export const SHEET_COLUMNS = [
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
] as const;

export type SheetColumn = (typeof SHEET_COLUMNS)[number];
