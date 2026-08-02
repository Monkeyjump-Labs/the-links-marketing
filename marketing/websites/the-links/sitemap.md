# Sitemap & IA — The Links

> Website Studio artifact · **Phase 1** · 2026-08-02 · slug `the-links`
> Authority: `fareway-brain/marketing/websites/_playbook/playbook-sim-venue.md` §3 (canonical
> 14-page sim-venue sitemap) + `playbook-core.md` §3 (page system). Deviations are logged in §4.
> Companion: `strategy.md`, `brief.md`, `seo-map.md`.

## 1. The two-venue adaptation

The playbook's canonical sitemap assumes a **single-location** venue — the segment norm
("independently owned, usually single-location"). The Links has two. The adaptation, and the
reasoning:

**Venue is a dimension of the site, not a fork of it.** One site, one set of topic pages, each
carrying a venue column or a venue-prefixed row. Rejected alternatives: separate domains (splits
authority, doubles maintenance, and is what the current site does badly), an entry interstitial
(nobody in the 7-peer scan uses one; the current site's booking interstitial is being deleted),
and duplicated per-venue topic pages (16 → 28 pages, thin duplicates, cannibalised keywords).

**Location is chosen at the booking boundary**, not the front door. The hero is venue-neutral;
the venue question is asked at the moment it first matters — the Book click.

**Two additions to the canonical 14:** `/locations/lakeville` and `/locations/stillwater`. These
are the local-SEO anchor pages and the only place per-venue `LocalBusiness` schema lives. Total
**16 pages** — inside the playbook's 12–18 target.

## 2. Navigation

**Top nav — the playbook's 7, unchanged:**

```
Book · Rates & Hours · Leagues · Memberships · Events · Food & Drink · Contact
```

`Leagues` stays in the top nav deliberately — only 38% of independent venues put it there despite
56% having league content, and it is Fareway's wedge.

**Header utility (right of nav):** a **venue switcher** (`Lakeville ▾ | Stillwater`) and the
persistent **Book a Bay** button. The switcher — not a nav item — is how two venues stay
discoverable without spending a nav slot. It sets a sticky preference that pre-selects the venue
on `/book` and pre-filters the venue columns on `/rates` and `/leagues`.

> **Deviation logged.** The Phase-0 audit recommended `Locations` as a nav peer. Superseded: a
> header switcher is more prominent than a nav item, keeps the playbook's 7-item nav intact, and
> puts the venue choice on every page rather than one. `/locations/*` remain real, indexable
> pages, linked from the switcher, the footer, and `/contact`.

**Footer:** full NAP for **both** venues · hours for both · Lessons · Juniors · The Bays ·
Gift Cards · FAQ · About · Locations · social · legal. Footer NAP must match each Google Business
Profile character-for-character (playbook `core.md` §7).

## 3. The pages

`Venue` column: **shared** = one page, venue handled as a column/row · **per-venue** = one page
per venue. `Content` column: **have** = recoverable from the current site · **stub** = shipped as
a marked placeholder pending client input (decision #4).

| # | Route | Nav label | The job it does | Primary CTA | Venue | Content |
|---|---|---|---|---|---|---|
| 1 | `/` | Home | Answer all five visitor questions above the fold-to-bounce point | Book a Bay | shared | mixed |
| 2 | `/book` | Book | The transaction. No marketing interstitial | Venue chooser → Whoosh | shared | have |
| 3 | `/rates` | Rates & Hours | Screening: can I afford it, is it open | Book a Bay | shared (columns) | **stub — winter** |
| 4 | `/leagues` | Leagues | The retention engine + the waitlist | Register / Join waitlist | shared (rows) | **stub** |
| 5 | `/memberships` | Memberships | Retention lever — tiers + LinksFlex | Buy / Enquire | shared | have |
| 6 | `/events` | Events & Parties | Highest revenue per visit | Lead-capture form | shared | **stub — pricing** |
| 7 | `/food-and-drink` | Food & Drink | Hospitality proof; HTML menu | Book a Bay | shared | have (de-image) |
| 8 | `/lessons` | Lessons | Low-commitment entry point | Book an evaluation | shared | **stub — pricing** |
| 9 | `/juniors` | — (footer) | Junior programs + camps | Register / waitlist | shared | **stub — season** |
| 10 | `/simulators` | — (footer) | Name the tech; answer "is it any good" | Book a Bay | shared | have |
| 11 | `/about` | — (footer) | Who runs it, the story, the press | Book a Bay | shared | have |
| 12 | `/contact` | Contact | Local SEO anchor + logistics | Directions / Call | shared (both NAPs) | have |
| 13 | `/gift-cards` | — (footer) | Seasonal revenue, Nov–Dec spike | Buy (Square/Toast) | shared | have |
| 14 | `/faq` | — (footer) | AEO surface + objection handling | Book a Bay | shared | **stub** |
| 15 | `/locations/lakeville` | switcher | Venue anchor: NAP, hours, photos, schema | Book at Lakeville | per-venue | have |
| 16 | `/locations/stillwater` | switcher | Venue anchor: NAP, hours, photos, schema | Book at Stillwater | per-venue | **stub — hours, photos** |

Plus legal: `/privacy`, `/terms`, `/policy` (cancellation — see §5).

## 4. Page-level requirements that are not negotiable

Drawn from the playbook's ship gate (`core.md` §10) and the sim-venue additions (§7). These are
the acceptance criteria for Phase 2 content and Phase 4 assembly.

**Home** — hero (promise + geo + one CTA, real venue photography, never a stock golf ball) →
**trust strip: hours, address, phone, rating, immediately under the hero** → "what you can do
here" cards (Play · Compete · Celebrate · Improve · Eat & Drink) → proof → featured seasonal
offer (swappable without touching layout) → the space → email capture with a stated reason →
footer NAP. *67% of the segment has no hours on the homepage; this is the cheapest win available.*

**Book** — no interstitial. The button says where it goes ("Book at Lakeville on Whoosh →")
because the transition is offsite and must be expected. Must state: hourly cost, **how many people
fit in a bay**, whether clubs are provided, left-handed availability, walk-in policy, and **the
cancellation window** — the top pre-booking objection and almost never answered.

**Rates & Hours** — one page, both together, same decision moment. Prices as **HTML text**.
Must carry **all four seasons**, not just summer — the current site's defining failure. Price
cards carry their own eligibility windows (adopted from `onthegreen-golf.com`).

**Leagues** — the full 9-element spec in `core.md` §5, in order: what it is in one line → **who
it's for, with explicit beginner reassurance** → format → when → **what it costs, as a number** →
what you win → the action → standings/past winners → **the waitlist**.

> **The waitlist is mandatory in all three registration states** (open / full / between seasons)
> and never a dead end. Zero of 126 audited sites offer one. In August, both venues are almost
> certainly *between seasons* — so the waitlist is the page's primary action **at launch**, not a
> future enhancement.

**Events** — lead-capture form first, packages under it. Capacity, price band, what's included,
lead time, and photos of a real event.

**Food & Drink** — HTML, never a PDF, never a PNG. The current menu is six images; that is a
straight port to text.

**The Bays** — name the technology (GolfZon NX). 42% of the segment names none.

**Contact** — NAP for both venues, embedded map each, full hours, parking, phone, email, form.

## 5. Cancellation policy — a gap the audit surfaced

The playbook makes the cancellation window a required element on `/book`. The current site's
`/policy` page exists but the window was not recoverable from the ingest. **Stub it and flag it**
— this is a client answer, and it is the top pre-booking objection in the segment.

## 6. Redirect map

21 of the current 41 URLs retire. Full old→new table lives in `seo-map.md` §4, including the
domain-level `lakevillelinks.com/*` → `thelinks.golf/*` move. Rules: retire to nearest live
equivalent with a 301; **410 the dated/expired pages** (`/cazopen`, `/vikings-game-day-special`)
so they leave the index rather than accumulating redirect debt.

## 7. Build order

Priority is conversion value, so a partial site is still a working site:

1. `/`, `/book`, `/rates`, `/locations/*` — the venue-selection and transaction spine
2. `/leagues` — highest-value page, and the waitlist is the differentiator
3. `/memberships`, `/events` — the revenue pages
4. `/food-and-drink`, `/simulators`, `/lessons`, `/contact`
5. `/about`, `/faq`, `/gift-cards`, `/juniors`, legal
