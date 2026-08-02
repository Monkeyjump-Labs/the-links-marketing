# Current-Site Audit — The Links (Lakeville + Stillwater)

> Website Studio artifact · **Phase 0 (Ingest)** · 2026-08-02 · slug `the-links`
> Subject: `https://www.lakevillelinks.com/` (41 URLs) · brand domain `thelinks.golf` 301s **into** it
> Evidence: `_ingest/site-inventory.md` (per-URL), `_ingest/operating-facts.md` (content facts),
> `_ingest/competitor-teardown.md` (onthegreen + 7 peers), `_ingest/raw/` (all 41 pages archived).
> **`_ingest/_corrections.md` overrides two subagent findings — read it before citing the inventory.**

---

## 1. The positioning read (what's actually wrong)

The current site is not a bad two-location website. It is a **good-enough one-location website
that a second location was appended to**, and every structural signal still points at the first
venue.

**The brand is inverted at every level.** The company has rebranded to **The Links**, an umbrella
with two venues under it — `/our-story` even has a section titled "The Rebrand." But:

| Signal | What it says today |
|---|---|
| Domain | `lakevillelinks.com` — and `thelinks.golf`, which they own, **301s away from the parent brand into the child venue** |
| Every `<title>` | ends `— Lakeville Links Premier Indoor Golf` |
| JSON-LD `legalName` | `Lakeville Links` |
| `LocalBusiness` schema | one entry, Lakeville's address only, on every page — **Stillwater does not exist to search engines** |
| Global nav | no Locations item; Stillwater is not in the nav at all |
| Default phone | Lakeville's, including **on the Stillwater page** |

Stillwater — a venue that opened six months ago — is one untitled, meta-less page reached by a
homepage "Learn more," with a button whose `href` is empty, the wrong phone number, a hero
cropped from a Facebook graphic, and **no photography of the venue on either Stillwater page**.
Site-wide there is exactly one usable Stillwater interior — a phone night shot taken six days
before opening — and it sits on `/our-story`. The parent brand exists only in the footer and one
story section.

**The site describes; it doesn't sell.** The commercial content is real but locked in images:
`/menu` is 72 characters of text and one PNG with `alt=""`; the membership card is a JPEG;
`/specials` is 318 characters; `/photo-gallery` is 36 images with filename alts, last touched
October 2022. A crawler, an AI engine, and a screen-reader user all see an empty site. Which
leads to the finding that reframes the SEO work —

**The AI crawlers are already allowed in** (`_corrections.md` §1 — the inventory's
"crawlers are blocked" finding was a misread; there is no `Disallow: /` anywhere). So unlike the
Fareway rebuild, there is no robots.txt to unblock. The problem is worse and slower to fix:
**the door is open and there is nothing inside worth citing.**

**The site is built around the wrong half of the year.** Today is 2026-08-02. The site publishes
`$35/hour` valid *May 3 – Oct 3, 2026* and **no winter rate and no winter hours anywhere**. For a
Minnesota indoor golf business, winter *is* the season — and `/leagues`, the page that should
carry it, is a "check back" placeholder with no adult league information of any kind, at either
venue. The single most valuable page of the year is empty, and the pricing goes dark in nine weeks.

**Their own reference site beats them on exactly this.** `onthegreen-golf.com` — single location,
same Squarespace, same town-adjacent market — publishes event packages at $399 / $699 / $1,599
with guest caps and gratuity terms, price cards carrying their own eligibility windows, and a
free trial lesson positioned under a $495 package. The Links publishes *no* group pricing
("groups of 12 or more," no numbers), *no* instruction pricing (four coaches, four personal
email addresses), and *no* league pricing.

---

## 2. What's genuinely good (do not lose these)

- **The photography is real and professional** — a proper shoot (`JWAT####.jpg`) plus honest phone
  photos. Only one AI-generated image found on the whole site. This is the most valuable asset
  they own and the rebuild should lean on it hard. *(Gap: the shoot is entirely Lakeville — Stillwater has one phone night shot, on the wrong page.)*
- **`GolfZon NX` is the top-tier sim** and a legitimate differentiator against peers running older
  or mixed kit. It is currently buried.
- **LinksFlex is a genuinely good product** — prepaid hour banks that never expire (12/24/48 hrs).
  Peers don't offer this. It's presented as a terms-and-conditions page.
- **Sponsor relationships exist** (Align, Thor, Von Hanson, Miller, Kretsch on bays 1/2/4/5/6) —
  local proof, currently invisible.
- **Real press coverage** — multiple TwinCitiesGolf features. Sitting in `/news` as 2022 archive.
- **They already use Fareway for leagues** (`/farewaygolf/…`, ply.golf links) — the league engine
  is in place; the site just doesn't merchandise it.

---

## 3. Keep / Cut / Rewrite

**Keep & rebuild (the spine):** `/` · `/rates` · `/memberships` · `/leagues` · `/groups` ·
`/instruction` · `/menu` · `/about` + `/our-story` · `/contact` · `/photo-gallery` · `/policy`

**New (does not exist today):** `/locations/lakeville` · `/locations/stillwater` · a real winter
rates + hours surface · per-venue league pages · an FAQ surface (AEO) · `/gift-cards`

**Cut — dead, duplicate, or internal (21 of 41 URLs):**

| URL(s) | Why |
|---|---|
| `/home`, `/home-2`, `/home-old` | three extra live homepages; `/home-2` still describes TwoVision sims and links the retired vendor |
| `/booking-scheduler` | hard-iframes the **retired GolfBook** calendar — a live 404 path |
| `/advertisinglogos`, `/align-logo` | internal asset shelves, zero body text, indexable |
| `/sms-opt-in-form-1` | exact duplicate of `/sms-opt-in-form` |
| `/membership-packages-terms-conditions-copy` | a `(Copy)` page — and the **only** both-location terms page |
| `/cazopen` | Aug 2025 event, still live **with a working payment link** |
| `/vikings-game-day-special` | Feb 2025 promo; its "BOOK ONLINE" 404s to GolfBook |
| `/juniorleagues` | Jan–Mar 2026 season, still says "Sign-Up Now" |
| `/simulator-settings` | 33 characters |
| `/news/*` (5 posts) | keep the press *citations* on `/about`; retire the blog shell |
| `/feedback`, `/bookinglanding`, `/leagues-contests` | thin redirect shims; `/leagues-contests` is the nav's leagues destination and is 105 characters whose only two links leave the domain |

All cuts need 301s to their nearest live equivalent; `/cazopen` and the dated promos should 410.

---

## 4. Defects to fix at the seam (customer-visible today)

1. **Four pages send customers to a dead booking vendor** — `/booking-scheduler`, `/home-2`,
   `/vikings-game-day-special`, `/specials` still point at GolfBook. Live booking is Whoosh.
2. **Stillwater's hours are unknowable from the site** — `/rates` shows two venue labels above
   **one** schedule, contradicted by a "11am to 9pm Daily" line in the same section
   (`_corrections.md` §2).
3. **Phone numbers disagree** — `612-699-0526` on `/stillwater` vs `612-699-0527` in the footer;
   `/memberships` *displays* `612-619-1747` while its `tel:` link dials `612-699-0526`. Three
   numbers in circulation.
4. **Sim tech contradicts itself** — GolfZon **NX** on current pages, **TwoVision** on
   `/home-old`, `/home-2`, and `/news`. All live.
5. **LinksFlex "Anytime" costs more per hour than walking in** — $39.56–$45.75/hr effective vs the
   $35 walk-up rate; its "Off Peak" window opens at 8am, three hours before the doors do.
6. **An expired March 2026 promo sits on both booking interstitials.**
7. **A `fareway.golf` page is still selling 2025 memberships at $150/mo through the retired
   vendor** — linked from this site. *Fareway-side fix; flag to the Fareway team.*
8. **Legal entity is three different names** across the legal pages; no Stillwater entity named.
9. **Metadata is broken at scale** — 19 of 41 pages have an empty meta description, 17 have no
   H1, five share the title "Book a Time | Realistic Golf Simulators | Twin Cities" (including
   `/about`), five more share a leagues title (including both SMS consent pages).
10. **Booking is three clicks through two interstitials** into two separate Whoosh clubs
    (`the-links-indoor-golf`, `linksstillwater`), behind an "ACKNOWLEDGE AND GO TO BOOKING" wall.

---

## 5. Structural recommendation — the two-venue architecture

From the 7-peer scan (Five Iron, X-Golf, Mulligan's, BirdieBay, Golf Lounge 18, Fore, INDR GLF):
nobody uses an entry interstitial, nobody splits domains, every hero is location-neutral, and
**not one ships correct per-location `LocalBusiness` schema** — which is a cheap, real edge here.

Recommended:

- **One site on `thelinks.golf`**, with `lakevillelinks.com` 301'ing *to* it — reversing today's
  redirect. The parent brand becomes the domain.
- **Location-neutral hero.** "The Links" sells the experience; the venue is chosen at the booking
  boundary, not the front door.
- **`Locations` as a real nav peer**, with `/locations/lakeville` and `/locations/stillwater`
  carrying that venue's hours, address, phone, photos, reviews, and its own JSON-LD.
- **Shared topic pages with a venue dimension** — rates and hours as a column per venue, leagues
  as a venue-prefixed row. One page per *topic*, not per venue-topic pair.
- **Location chosen at the booking click**, via a two-option chooser. Never a header button
  hardcoded to one venue (Mulligan's bug), never one that's dead until JS resolves (X-Golf bug).
- **Kill the interstitial.** It is a step that exists to apologise for the vendor.

Adopt from `onthegreen-golf.com`: the **verb-based IA** (`Play · Compete · Celebrate`) expanded
literally as the homepage's three-way intent split, and **price cards that carry their own
eligibility windows**. Avoid their three failure modes: every transaction offsite across three
vendors with the offer detail invisible to search; seasonal content split into parallel live
pages (`/rates` and `/rates-summer` both live, contradictory, one orphaned) — **the exact trap
The Links is walking toward with summer/winter**; and publishing the offer only behind a click.

---

## 6. What the rebuild cannot fix — client input required

Blocking (site cannot launch correct without these): **winter rates**, **winter hours per venue**,
**Stillwater's real hours**, **adult league lineup + pricing for the coming season**, **group/event
pricing**, **instruction pricing**, **Stillwater photography**, **which sim tech is in which
venue**, **which phone number is which**, **the correct legal entity per venue**.

Full checklist in `_ingest/operating-facts.md` → "MISSING — must ask the client."
