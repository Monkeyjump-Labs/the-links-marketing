/**
 * The two things the leagues page and its blocks have to agree on.
 *
 * `LeagueBlock` links an archived season at the page's waitlist band, and
 * `leagues.astro` is what puts the anchor on it. An id spelled out twice is an
 * id that eventually only exists in one of the two places, and the failure is
 * silent — the link still renders, it just goes nowhere.
 */
import type { CollectionEntry } from 'astro:content';

/** The waitlist band's anchor. Archived blocks link here rather than dead-ending. */
export const LEAGUE_WAITLIST_ID = 'league-waitlist';

/**
 * The season the page is ABOUT — which is the one still to come, never an
 * archived one.
 *
 * The hero eyebrow and the capture band both name it ("Get first word on …"),
 * and both used to read it off `leagues[0]`. That was fine while the first row
 * was the next season; once Lakeville's four archived seasons sort above it, the
 * naive read makes the page offer first word on a season that finished last
 * December. So the archived rows are skipped, and a page with nothing but
 * archived rows says "the coming season" rather than naming the past.
 */
export function upcomingSeason(leagues: CollectionEntry<'leagues'>[]): string {
  return leagues.find((l) => l.data.status !== 'archive')?.data.season ?? 'the coming season';
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * `startDate` for display.
 *
 * The field carries two different kinds of value on purpose, and this is what
 * lets it. `LeagueSchema` emits a `SportsEvent` only for a start date in strict
 * `YYYY-MM-DD` form, so a league with a known first night stores the ISO date
 * and earns the structured data — the playbook's single largest untapped
 * opportunity in the segment. But a league whose start is genuinely approximate
 * ("Week of 4 October 2026" — Stillwater picks a night per team) must NOT be
 * forced into a false precision just to satisfy a formatter.
 *
 * So: an ISO date is rendered as prose, and anything else is passed through
 * exactly as written. The alternative was storing prose everywhere, which reads
 * fine and silently emits no `SportsEvent` for any league on the site.
 *
 * Parsed by hand rather than through `new Date(iso)`: that parses as UTC and
 * then formats in local time, which in any negative-offset zone — Minnesota is
 * one — renders the day before. A league that starts on the 5th would have gone
 * out advertising the 4th.
 */
export function formatLeagueDate(value?: string): string | undefined {
  if (!value) return undefined;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!iso) return value;
  const [, year, month, day] = iso;
  const name = MONTHS[Number(month) - 1];
  if (!name) return value;
  return `${Number(day)} ${name} ${year}`;
}
