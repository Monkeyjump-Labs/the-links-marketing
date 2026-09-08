/**
 * Global site data for The Links.
 *
 * Venue-specific facts (addresses, hours, phones, booking URLs) do NOT live here
 * — they live in the `venues` content collection so the client can edit them in
 * TinaCMS. This file holds only what is genuinely global.
 */
export const globalData = {
  siteName: 'The Links',
  siteUrl: 'https://thelinks.golf',
  metaTitleSuffix: '| The Links',
  favicon: '/favicon.ico',
  defaultShareImage: '/share-image.png',

  /**
   * Top nav — the playbook's canonical 7 for a simulator venue.
   *
   * These labels are IA, not voice. Each is the most common name for that concept
   * across the 96 audited SIMULATOR-VENUE sites — the sim-venue subset of the
   * playbook's 126-site corpus, which also contains golf courses — so a visitor
   * scanning the nav is pattern-matching rather than reading. The brand's
   * personality belongs in the headlines and body copy; the navigation is not
   * where to spend it.
   *
   * Both corpus figures are real and both are the playbook's own: 126 total
   * (`audit-findings.md`), 96 sim venues (`playbook-sim-venue.md`). Always name
   * which one you mean — two bare numbers in one project reads as sloppiness.
   * See truth-audit.md §U23.
   *
   * Corrected 2026-08-02 after the playbook was revised: our first pass inherited
   * On The Green's vocabulary from the playbook's own first draft — "The Bays",
   * "/food-and-drink" and "Celebrate", none of which the corpus supports.
   * "Celebrate" appears exactly once across the 96 sim-venue sites, and that once
   * is On The Green.
   * `Leagues` stays here deliberately: only 38% of independent venues put it in
   * the top nav despite 56% having league content.
   * Venue selection is handled by the header switcher, not a nav slot.
   */
  nav: [
    { label: 'Book Now', href: '/book/' },
    { label: 'Rates', href: '/rates/' },
    { label: 'Leagues', href: '/leagues/' },
    { label: 'Memberships', href: '/memberships/' },
    { label: 'Events', href: '/events/' },
    { label: 'Food & Drink', href: '/menu/' },
    { label: 'Contact', href: '/contact/' },
  ],

  /** Everything that didn't make the 7. */
  footerLinks: [
    { label: 'Lessons', href: '/lessons/' },
    { label: 'Juniors', href: '/juniors/' },
    { label: 'Simulators', href: '/simulators/' },
    { label: 'Gift Cards', href: '/gift-cards/' },
    { label: 'FAQs', href: '/faq/' },
    /**
     * "Our Story", not "About", at the owner's request (2026-09-08) — and it
     * points at `/about/`, which is not a mismatch but the whole point.
     *
     * The old site had BOTH `/about` (facility facts) and `/our-story` (the
     * founders' account). They were deliberately merged onto one page, and
     * `/our-story` 301s to it (vercel.json, seo-map.md §4). The story is the
     * first thing on that page, so the label now names what a visitor is
     * actually looking for. The owner went looking for "Our Story" in the
     * footer and did not find it — which is the whole failure this fixes.
     *
     * Do NOT resurrect a separate `/our-story` page to match the label. It
     * would be unreachable behind that 301, and lifting the 301 would put the
     * same story on two URLs competing with each other.
     */
    { label: 'Our Story', href: '/about/' },
  ],

  social: [
    { label: 'Facebook — Lakeville', href: 'https://www.facebook.com/lakevillelinks/' },
    { label: 'Facebook — Stillwater', href: 'https://www.facebook.com/linksofstillwater/' },
  ],

  /** Third-party surfaces we hand off to. Booking stays on Whoosh (decision #5). */
  external: {
    giftCardBuy: 'https://app.squareup.com/gift/MLYARTM9VAGFK/order',
    giftCardBalance: 'https://app.squareup.com/gift/MLYARTM9VAGFK/check-balance',
    leaguesLakeville: 'https://ply.golf/venue/lakeville-links/leagues',
    membershipsLakeville: 'https://app.whoosh.io/patron/club/the-links-indoor-golf/store/packages',
    membershipsStillwater: 'https://app.whoosh.io/patron/club/linksstillwater/store/packages',
  },

  copyright: {
    name: 'The Links',
    language: 'All rights reserved.',
  },
};
