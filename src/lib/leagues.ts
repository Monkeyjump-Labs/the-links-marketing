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
