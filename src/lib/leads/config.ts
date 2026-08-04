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
 * **The waitlist is not special in KIND.** Sheet plus notification, exactly like
 * every other form — no list-provider sync, no double opt-in, no campaign send.
 * Those are a future capability, tracked on ClickUp 868kkt2eu and deliberately
 * out of scope (FW-3975). It gets its own TAB rather than its own pipeline,
 * because the difference is when a human reads it, not how it is handled.
 */
export interface LeadList {
  /** Human label, used in the notification subject. */
  label: string;
  /** Which tab in the workbook this list's rows land on. */
  tab: SheetTab;
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

/**
 * The workbook's tabs.
 *
 * A cover page first, then one tab per KIND OF WORK — not one per form. The two
 * data tabs exist because they have different rhythms and different readers:
 * `Enquiries` is worked through daily by whoever answers the phone, `Waitlist`
 * sits untouched until registration opens and is then exported in one go. A
 * venue owner can see that split in the tab strip; they would never find it in a
 * column filter.
 *
 * `Test` keeps styleguide submissions out of real data. The styleguide renders
 * live, submittable forms, and one accidental submit should not put a fake name
 * in front of someone working the enquiry list.
 *
 * README is `Sheet1` renamed and moved to the front, so the first thing anyone
 * opening the workbook sees is an explanation rather than a grid of columns.
 */
export const TABS = {
  readme: 'README',
  enquiries: 'Enquiries',
  waitlist: 'Waitlist',
  test: 'Test',
} as const;

export type SheetTab = (typeof TABS)[keyof typeof TABS];

/** The tabs that receive submissions. README is prose and never written to. */
export const DATA_TABS: SheetTab[] = [TABS.enquiries, TABS.waitlist, TABS.test];

/**
 * ⚠️ TEMPORARY — notifications go to US, not to the venue.
 *
 * Set 2026-08-04 so the team can submit real forms and read the real
 * notifications without putting test enquiries in front of venue staff, and
 * without a customer's first genuine enquiry being the thing that discovers a
 * delivery bug.
 *
 * **This MUST become `info@lakevillelinks.com` before launch.** While it is
 * wrong, every enquiry a customer sends reaches nobody who can answer it — the
 * row is still recorded in the sheet, so nothing is lost, but the venue is not
 * told. `npm run leads:check` warns loudly on a production build while this is
 * still in place, and it is a line item on the ship gate.
 *
 * The real address is kept right here so the switch is a one-word diff:
 *   const INBOX = VENUE_INBOX;
 */
const VENUE_INBOX = 'info@lakevillelinks.com'; // eslint-disable-line @typescript-eslint/no-unused-vars
const TESTING_INBOX = 'hello@fareway.golf';

const INBOX = TESTING_INBOX;

export const LEAD_LISTS: Record<string, LeadList> = {
  event: {
    label: 'Event enquiry',
    tab: TABS.enquiries,
    notify: INBOX,
  },
  'league-general': {
    label: 'League waitlist (homepage)',
    tab: TABS.waitlist,
    notify: INBOX,
    consent: 'One email when registration opens. Nothing else, ever.',
  },
  'league-fall-winter-2026-lakeville': {
    label: 'League waitlist — Lakeville',
    tab: TABS.waitlist,
    notify: INBOX,
    consent: 'One email when registration opens. Nothing else, ever.',
  },
  'league-fall-winter-2026-stillwater': {
    label: 'League waitlist — Stillwater',
    tab: TABS.waitlist,
    notify: INBOX,
    consent: 'One email when registration opens. Nothing else, ever.',
  },
  juniors: {
    label: 'Juniors waitlist',
    tab: TABS.waitlist,
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
    tab: TABS.test,
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

/**
 * ONE column schema, shared by every data tab.
 *
 * Deliberately not per-tab: a waitlist row leaves `date` and `groupSize` empty
 * and that is fine. Divergent schemas would mean the writer needs to know which
 * columns exist where, and the first time someone adds a field to one tab and
 * not another, rows start landing in the wrong columns silently. `list` stays a
 * column even though the tab already implies it — it is what tells you WHICH
 * waitlist a row came from once they are all in one place.
 *
 * Order is APPEND-ONLY. Adding a column on the end is safe; reordering or
 * removing one silently corrupts every row written afterwards, because the
 * Sheets API appends positionally and has no idea what a header means.
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
