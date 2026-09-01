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
 * Where a form submission is announced.
 *
 * **Live to the venue since 2026-08-30** (ship-gate launch task 1). Between
 * 2026-08-04 and then this pointed at `TESTING_INBOX` so the team could submit
 * real forms and read real notifications without putting practice enquiries in
 * front of venue staff, and without a customer's first genuine enquiry being the
 * thing that discovered a delivery bug.
 *
 * A customer enquiry now reaches someone who can answer it. The sheet is still
 * the system of record — the row is written first and a submission is never
 * reported successful unless it landed there — so a mail failure loses nothing,
 * it only delays the venue hearing about it.
 *
 * `TESTING_INBOX` is kept rather than deleted: flipping back is how you test a
 * change to the mail path without sending practice enquiries to a real business.
 * `npm run leads:check` prints a warning banner whenever it is selected, so a
 * temporary flip cannot quietly become permanent.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept as the deliberate escape hatch above
const TESTING_INBOX = 'hello@fareway.golf';
const VENUE_INBOX = 'info@lakevillelinks.com';

const INBOX = VENUE_INBOX;

export const LEAD_LISTS: Record<string, LeadList> = {
  event: {
    label: 'Event enquiry',
    tab: TABS.enquiries,
    notify: INBOX,
  },
  /**
   * Lessons. An ENQUIRY, not a waitlist — nothing is being waited for and there
   * is someone who can answer today, so it takes the Enquiries tab and its daily
   * rhythm rather than sitting untouched until an export. No `consent` line
   * either: this is a reply to a question the visitor asked, not permission to
   * mail them later.
   *
   * The page also publishes each coach's own email and phone, and keeps doing
   * so. This list is the second path, for the visitor who does not want to pick
   * a coach cold — which is why `lessonFor` is the load-bearing field on the
   * row. Who the lesson is for is what decides which coach gets forwarded it.
   */
  lessons: {
    label: 'Lesson enquiry',
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
   * is registered rather than 400ing in a way that makes the styleguide look
   * broken.
   *
   * ⚠️ Deliberately NOT `INBOX`. It used to be, back when `INBOX` was our own
   * testing address and "the same inbox" cost nothing. `INBOX` is now a real
   * business, and a reference page whose whole purpose is to be poked at must
   * not mail them every time someone tries a form. It lands on the Test tab and
   * tells us, which is also what makes it the safe way to exercise the mail path.
   */
  styleguide: {
    label: 'Styleguide test submission',
    tab: TABS.test,
    notify: TESTING_INBOX,
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
 *
 * ⚠️ Adding one here is HALF the change. The live workbook's tabs are created
 * with a fixed `columnCount`, so a new column also needs
 * `npm run sheet:provision` run against the sheet — it widens each data tab and
 * rewrites the header row. Without that the append lands outside the grid and
 * every submission 400s. `scripts/provision-sheet.mjs` mirrors this list, and
 * `config.test.ts` fails if the two drift.
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
  // Added for the lessons enquiry (FW-3999): themselves / a junior / a group.
  // Blank on every other form, exactly as `date` and `groupSize` are blank on a
  // waitlist row — one schema, per-form fields left empty, so the writer never
  // has to know which columns exist where.
  'lessonFor',
] as const;

export type SheetColumn = (typeof SHEET_COLUMNS)[number];
