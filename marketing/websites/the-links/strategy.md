# Website Strategy — The Links

> Website Studio artifact · **Phase 1** · 2026-08-02 · slug `the-links`
> Authority: `fareway-brain/marketing/websites/_playbook/` (evidence base: 126 audited sites).
> Companion: `brief.md` (decisions), `sitemap.md` (IA), `seo-map.md` (keywords + schema),
> `brand-inventory.md` → `brand-direction.md` (brand track).
> Sections marked **[ASSUMPTION]** are reasoned from the ingest and the playbook, not from
> client interview. They are safe to build on and cheap to correct.

## 1. The strategic read

**The Links is a hospitality business that sells golf, currently marketed as a golf business
that happens to be indoors.** The playbook establishes this for the segment with a hard signal:
across 96 audited simulator venues, restaurant tooling (OpenTable 12%, Toast 6%) appears more
often than all golf-specific vendors combined (<10%). The Links fits the pattern exactly — full
bar, nine TVs, sponsor-branded bays, a bowling-alley co-location at Stillwater — and its site
still leads with equipment realism ("The most realistic indoor golf you can play, period.").

Three consequences, all of which the current site gets wrong:

1. **The buyer is often not a golfer.** Date nights, work outings, birthday parties. 67% of
   league pages in the corpus fail beginner reassurance — the implied "you already golf" is the
   segment's most expensive mistake. Write to the least confident visitor.
2. **The product is time, not rounds.** People buy an hour in a bay. The site is selling a
   reservation slot; availability and price are the whole decision.
3. **Weather and season drive demand, inversely.** For a Minnesota venue, winter is the season.
   The current site publishes summer rates that expire 2026-10-03 and **no winter rates or hours
   at all** — it is architected around the wrong half of the year.

## 2. Positioning

**Parent brand `The Links`, two venues beneath it.** Today the parent brand exists only in a
footer and a story section while `thelinks.golf` redirects *away* from itself into
`lakevillelinks.com`. Reversing that redirect (decision #3) is the single highest-leverage fix
available and costs nothing.

**The hero formula** (playbook `sim-venue.md` §2): *[experience promise] + [what it literally is]
+ [where]*. The town must be in it — 56% of the segment has no geo cue in its title.

**What we lead with — [ASSUMPTION], to test at the design gate:**

| Layer | Claim | Why it survives scrutiny |
|---|---|---|
| **Lead** | The room, not the rig — indoor golf as a night out, in Lakeville and Stillwater | Matches the actual buyer; the segment's winning heroes sell a feeling, not a spec |
| **Proof** | **GolfZon NX**, named | 42% of the segment names no simulator brand; it is a real search term with credibility weight |
| **Differentiator** | **LinksFlex** — prepaid hours that never expire | No peer in the scan offers it. Currently presented as a terms-and-conditions page |
| **Retention** | Leagues, with a waitlist that always works | Zero of 126 audited sites offer a waitlist |
| **Reassurance** | Never held a club? Good — that's most of the room | The largest addressable market, and almost nobody writes for it |

**Banned vocabulary:** "premier", "state-of-the-art", "ultimate". They saturate the corpus and
carry no information — and "Premier Indoor Golf" is currently in every one of their page titles.

**Voice — [ASSUMPTION], inherited from the existing brand kit and the segment rules:** confident,
value-forward, no-frills, local-Minnesota. Warm and slightly irreverent beats premium and serious.
The brand track (`brand-direction.md`) owns the final call.

## 3. The funnel, and where this site actually loses

Playbook `core.md` §1 — five stages. Most audited sites are built for Consideration only;
**Awareness and Retention are where the measurable money is and are systematically neglected.**

| Stage | The Links today | What the rebuild does |
|---|---|---|
| **Awareness** | One `LocalBusiness` record, Lakeville-only. Stillwater is invisible to search. AI crawlers are welcome but there is nothing citable — `/menu` is 72 characters of text | Two `LocalBusiness` entities, `Event` schema on every league, an FAQ surface written for AI answers |
| **Consideration** | Hours ambiguous between venues, prices in JPEGs, no winter rates | Trust strip on the homepage, all four seasons as HTML text |
| **Conversion** | Three clicks through two interstitials into two Whoosh clubs; four pages still point at a retired vendor | Two clicks from any page; venue chosen at the Book click; dead vendor paths deleted |
| **Experience** | Cancellation window not findable | Stated on `/book` |
| **Retention** | `/leagues` is a "check back" placeholder — at the start of league season | Full league spec + a permanent waitlist |

**The single biggest measurable gap is Retention**, and it is also the cheapest to close: the
leagues page.

## 4. Conversion architecture

- **Primary CTA: Book a Bay.** Transactional, persistent in the header, on every page. Never
  "Learn More."
- **Two clicks to book from anywhere.**
- **The offsite handoff is declared, not hidden.** Booking is Whoosh and stays Whoosh
  (decision #5). The button says where it goes. The current "ACKNOWLEDGE AND GO TO BOOKING"
  interstitial is deleted — it exists to apologise for the vendor.
- **Everything the vendor knows, we also publish.** The transaction is offsite and the vendor app
  is client-rendered, so prices, hours, packages, and policies must live as crawlable HTML on our
  site. This is simultaneously the SEO fix, the AEO fix, and the accessibility fix.
- **Secondary conversions, in priority order:** league registration / waitlist → membership and
  LinksFlex → event enquiry → lesson booking → email capture.
- **Email capture with a stated reason.** Only 41% of the segment captures email at all.

## 5. Seasonality — the structural fix

The featured-offer slot on the homepage is a **swappable content block**, changed monthly without
touching layout. Every dated page carries its season and year, and hands over a named refresh
owner. The playbook's cold-climate calendar, adopted:

| Period | Featured offer |
|---|---|
| Sep–Oct | Fall/winter league registration opens |
| Nov–Dec | Holiday parties + gift cards |
| Jan–Feb | New-year memberships; peak indoor season |
| Mar–Apr | Spring leagues; outdoor tune-up lessons |
| May–Aug | Junior camps, corporate events, rainy-day promos |

**We are launching in the Sep–Oct slot.** Fall/winter league registration is the featured offer at
launch, which makes `/leagues` — currently the emptiest page on the site — the most important page
of the build. It also means the winter rates and hours gap is on the critical path: the site goes
live weeks before the current published rate expires on 2026-10-03.

**Anti-pattern to avoid, observed on the client's own reference site:** `onthegreen-golf.com` runs
`/rates` and `/rates-summer` as parallel live pages with identical titles, contradictory hours, and
the off-season one orphaned from the nav. Seasonality is a **field on one page**, never a second page.

## 6. Measurement

Minimum viable instrumentation (playbook §11). GA4 `G-DTLFJD8KFF` and Meta Pixel
`1200620627766874` already exist and carry over; no GTM and no consent banner today — **[OPEN]**
whether a consent banner is required is a client/legal call, flagged not resolved.

| Stage | Metric | Source |
|---|---|---|
| Awareness | Impressions, CTR, Maps views/actions — **split by venue** | Search Console, GBP ×2 |
| Consideration | Sessions, `/rates` views, venue-switcher usage | GA4 |
| Conversion | Whoosh click-outs by venue, league registrations, event enquiries, **waitlist signups** | GA4 events |
| Retention | Repeat booking, membership conversion, league re-enrolment | Whoosh / Fareway |

**Watch waitlist signups.** It is the metric the entire category scores zero on and the one that
most directly proves the playbook's value. It is also the only conversion on this site that is
fully ours — every other transaction ends on someone else's domain.

## 7. Open strategic questions (not build-blocking)

1. **Which venue is the growth priority?** Stillwater is six months old, has no photography, no
   reviews, and no independent search presence. Lakeville has four years of authority. The site
   treats them as peers; the business may not.
2. **Is Stillwater's F&B its own offer or Stillwater Bowl's?** Changes whether `/menu`
   is one page with a venue column or genuinely per-venue.
3. **Does LinksFlex extend to Stillwater?** Currently Lakeville-only, and it is the strongest
   differentiator on the site.
4. **The LinksFlex "Anytime" anomaly** — $39.56–$45.75/hr effective against a $35 walk-up rate.
   A repricing decision, not a copy fix. We will not publish a premium tier that costs more than
   walking in.
