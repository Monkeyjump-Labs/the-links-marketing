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
   * Top nav — the playbook's canonical 7 for a simulator venue, unchanged.
   * `Leagues` stays here deliberately: only 38% of independent venues put it in
   * the top nav despite 56% having league content.
   * Venue selection is handled by the header switcher, not a nav slot.
   */
  nav: [
    { label: 'Book', href: '/book/' },
    { label: 'Rates & Hours', href: '/rates/' },
    { label: 'Leagues', href: '/leagues/' },
    { label: 'Memberships', href: '/memberships/' },
    { label: 'Events', href: '/events/' },
    { label: 'Food & Drink', href: '/food-and-drink/' },
    { label: 'Contact', href: '/contact/' },
  ],

  /** Everything that didn't make the 7. */
  footerLinks: [
    { label: 'Lessons', href: '/lessons/' },
    { label: 'Juniors', href: '/juniors/' },
    { label: 'The Bays', href: '/simulators/' },
    { label: 'Gift Cards', href: '/gift-cards/' },
    { label: 'FAQ', href: '/faq/' },
    { label: 'About', href: '/about/' },
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
