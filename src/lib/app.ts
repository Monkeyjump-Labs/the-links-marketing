/**
 * The Lakeville Links mobile app — the two store listings and the one line we
 * say about it.
 *
 * ── WHY THIS FILE EXISTS ───────────────────────────────────────────────────
 *
 * Two surfaces point at the same app: the dismissible strip above the header
 * (`AppBanner`) and the permanent badge in the footer (`AppBadge`). A store URL
 * typed into both is a store URL that will be corrected in one of them. The
 * pitch is here for the same reason.
 *
 * ── THE URLS ARE VERIFIED, NOT GUESSED ─────────────────────────────────────
 *
 * Both listings were read from the stores themselves on 2026-09-08 before they
 * were written down, because a dead CTA in fixed position on every page is a
 * worse defect than no CTA at all:
 *
 *   Apple  id1668921452  "Lakeville Links", subtitled "Premier Indoor Golf",
 *                        Sports, seller Jason Snow, free, live.
 *   Google com.myappguru.lakeville  "Lakeville Links" — "The Lakeville Links in
 *                        the palm of your hand!", live.
 *
 * If the app is ever re-published under a new listing, change it HERE and both
 * surfaces follow. Do not paste a store link into a component.
 */

/** Apple's listing. Also the no-JS default for the single Download control. */
export const APP_STORE_URL = 'https://apps.apple.com/us/app/lakeville-links/id1668921452';

/** Google's listing. */
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.myappguru.lakeville';

/**
 * The client's own words, unedited.
 *
 * Note for anyone tidying copy later: the site's banned-word list rules out
 * "premier", and the app's own App Store subtitle uses it. That is the client's
 * registered brand line, not our marketing prose, so it is not ours to rewrite —
 * and this pitch does not contain it anyway.
 */
export const APP_PITCH = 'Get our App for easy access to leagues, events & promotions';

/**
 * What the app is called IN BOTH STORES. This is the searchable name, so it is
 * the one screen readers get — a visitor told to look for "The Links App" would
 * not find it in either store.
 */
export const APP_NAME = 'Lakeville Links';

/**
 * What we CALL it in visible copy, at the owner's direction (2026-09-08).
 *
 * It differs from `APP_NAME` on purpose: the site's brand is The Links across
 * two venues, and "Lakeville Links" in the footer of a page about Stillwater
 * reads as the wrong venue rather than as the app's name. The store listing
 * still says Lakeville Links and the links still go there.
 */
export const APP_LABEL = 'The Links App';
