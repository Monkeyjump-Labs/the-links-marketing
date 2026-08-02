# Website Brief — The Links (Lakeville + Stillwater)

> Website Studio artifact · **Phase 0 (Intake)** · v1 · 2026-08-02 · slug `the-links`
> Repo: `/Users/root/src/Fareway/Clients/the-links-marketing` → GitHub `Monkeyjump-Labs/the-links-marketing`
> Stack: `appletron-site-starter` (Astro 5 + Tailwind v4 + TinaCMS) → Vercel staging, noindex
> Companion: `current-site-audit.md`, `_ingest/`. **Status: awaiting Phase-0 gate.**
> ⚠️ The client's existing **strategy briefs have not been attached yet** — §3, §5 and §6 are
> reasoned from the ingest and are marked **[ASSUMPTION]** where they outrun evidence. They must
> be reconciled against those briefs before Phase 1.

## 1. What we're doing

Rebuilding The Links' marketing site as a static, SEO/AEO-optimised, TinaCMS-editable site on the
appletron starter — the **first external test of the appletron website factory** (ClickUp
`868kk6pr1`). The rebuild's defining job is structural, not cosmetic: convert a
**one-location site with a second location appended** into a **two-venue brand site** that a
golfer can use to pick a venue, learn the offer, see a price, and book.

## 2. Primary goal & success definition

**PRIMARY (north-star): booked bay time.** A completed booking at either venue. Every build
tradeoff resolves in favour of this.

**Secondary conversions, in priority order:**
1. **League registration** — the highest-value action of the year, and the one the site currently
   cannot perform at all. Winter-weighted.
2. **Membership / LinksFlex purchase** — the retention product.
3. **Group & event inquiry** — highest revenue per transaction, currently unpriced.
4. **Lesson booking.**

**Leading indicators:** non-branded organic sessions; `LocalBusiness` impressions per venue in
GBP/Search; AI-citation rate for "indoor golf Lakeville / Stillwater MN" across
ChatGPT/Claude/Gemini/Perplexity (baseline is effectively zero — the crawlers are allowed in, but
there is nothing citable on the site today).

**Guardrail:** a golfer can find *this venue's* hours, price, and booking link in ≤2 clicks from
any entry page.

**[OPEN]** No numeric targets set — needs the client. Not build-blocking.

## 3. Audiences (priority order) — **[ASSUMPTION]** pending the strategy briefs

1. **Local recreational golfers, winter-primary** — the volume buyer. Wants: is it open, what
   does an hour cost, can I get a bay Saturday night, is there beer.
2. **League players & prospective league captains** — the retention engine and the reason winter
   pays for the year. Currently unserved by the site.
3. **Group / event organisers** — corporate outings, birthdays, bachelor parties, holiday parties.
   Highest ticket, entirely unpriced today.
4. **Serious golfers / off-season practice** — the GolfZon NX and LinksFlex buyer.
5. **Juniors & families** — a real published program (junior leagues, junior LinksFlex) with no
   current-season surface.

## 4. Primary conversion action & the booking model

**Book a bay.** Booking runs on **Whoosh**, as two separate club accounts
(`the-links-indoor-golf`, `linksstillwater`) — an offsite handoff, not an embed.

**The flow we're building:** location-neutral hero → **Book** → two-option venue chooser → Whoosh
for that venue. Today it is three clicks through two interstitials, including an "ACKNOWLEDGE AND
GO TO BOOKING" wall we are removing.

**Constraint that shapes the whole site:** the transaction is offsite and the offer detail lives
in a client-rendered vendor app that search engines cannot read. Therefore **every price, hour,
league, package and policy must be published as real HTML on our site** — never delegated to the
booking vendor, and never trapped in an image (today: the menu, the membership card, and the
specials are all JPEGs/PNGs). This is simultaneously the SEO fix, the AEO fix, and the
accessibility fix.

## 5. Positioning — **[ASSUMPTION]** pending the strategy briefs

- **Parent brand `The Links`, two venues beneath it.** `thelinks.golf` becomes the site;
  `lakevillelinks.com` 301s *to* it, reversing today's redirect.
- **Lead with the experience, not the equipment** — but let **GolfZon NX** carry the "this is the
  good stuff" proof, which peers running older kit can't echo.
- **Year-round, not seasonal.** The site's current architecture treats summer as default and
  winter as absent. Invert it: winter is the season, summer is the counter-cyclical add.
- **LinksFlex is the differentiated product** — prepaid hours that never expire. No peer scanned
  offers it. It is currently a terms-and-conditions page. *(Fix the pricing anomaly first — see
  audit §4.5, "Anytime" costs more per hour than walking in.)*
- **Reference structure:** `onthegreen-golf.com`'s verb-based IA (`Play · Compete · Celebrate`)
  and its self-documenting price cards. **Not** its three failure modes (audit §5).

## 6. Scope & sitemap (first cut — Phase 1 owns the final IA)

`/` · `/locations/lakeville` · `/locations/stillwater` · `/rates` (year-round, per venue) ·
`/memberships` (+ LinksFlex) · `/leagues` (per venue, per season) · `/groups` (priced) ·
`/instruction` (priced) · `/menu` (as text) · `/about` · `/contact` · `/gift-cards` · `/faq` (AEO)
· `/photo-gallery` · legal.

**Retiring 21 of 41 current URLs** with a 301/410 map — see `current-site-audit.md` §3.

## 7. Proof inventory

**Available and strong:** real professional venue photography (Lakeville only) · GolfZon NX ·
five named local bay sponsors (Align, Thor, Von Hanson, Miller, Kretsch) · multiple TwinCitiesGolf
press features · an operating history since Oct 2022.

**Not available — do not fabricate:** Stillwater photography (one pre-opening phone night shot, on `/our-story` — not usable as a venue hero) · any customer
testimonial *(the reference competitor runs three unsourced quotes — we will not copy that)* ·
Google review counts/ratings per venue **[unverified — needs pulling]** · any outcome metric.

## 8. Non-goals

Not a tee-time aggregator · no ecommerce beyond the existing gift-card vendors · not a blog
program (retire `/news`; keep the press citations) · no app · no member portal (Whoosh owns
account state) · **no invented pricing, hours, or testimonials** — anything not confirmed by the
client ships as a gap, not a guess.

## 9. Fixed inputs

Starter `Monkeyjump-Labs/appletron-site-starter` · site repo `Monkeyjump-Labs/the-links-marketing`
· Vercel (staging, noindex) · booking **Whoosh** (2 clubs) · leagues **Fareway / ply.golf**
(already in use) · gift cards **Square + Toast** · analytics **GA4 `G-DTLFJD8KFF`** + **Meta Pixel
`1200620627766874`** (no GTM, no consent banner today) · strict CI gate + Tina-lock freshness
check, per the Fareway build.

## 10. Open items — **client input, launch-blocking**

Ranked by how much of the build they block:

- [ ] **Winter rates + winter hours, per venue** — the site currently goes dark on 2026-10-03. *Blocks `/rates`.*
- [ ] **Stillwater's real hours** — not recoverable from the site. *Blocks `/locations/stillwater`.*
- [ ] **Adult league lineup, format, nights, price, season dates, per venue.** *Blocks `/leagues`, the highest-value page.*
- [ ] **Group/event packages + pricing + minimums.** *Blocks `/groups`.*
- [ ] **Instruction pricing** (4 coaches, currently 4 personal emails). *Blocks `/instruction`.*
- [ ] **Stillwater photography** — a shoot is required; the one existing frame is a pre-opening phone shot. *Blocks the venue page and the hero rotation.*
- [ ] **Which sim tech is in which venue** — NX vs TwoVision contradict across live pages.
- [ ] **Which phone number is which** — three numbers in circulation, one `tel:` mismatch.
- [ ] **Correct legal entity per venue** — three names across the legal pages, no Stillwater entity.
- [ ] **Stillwater capacity, TV count, F&B arrangement with Stillwater Bowl, event offer.**
- [ ] **Confirm the domain flip** to `thelinks.golf` (and who holds the DNS).
- [ ] **LinksFlex "Anytime" pricing anomaly** — repricing decision, not a copy fix.
- [ ] **Fareway-side:** a `fareway.golf` page is still selling 2025 memberships at $150/mo through
      a retired vendor, linked from this site. *Not ours to fix — route to the Fareway team.*

## 11. Decisions log — **RESOLVED 2026-08-02 (Daran)**

| # | Question | Decision |
|---|---|---|
| 1 | Strategy basis | **This brief + the fareway-brain website playbook** (`fareway-brain/marketing/websites/_playbook/`) — an evidence base measured from **126 live sim-venue and golf-course sites**. The build must "do the core basics of a simulator venue webpage." The playbook's canonical sitemap and ship gate are **authoritative**; where generic strategist instinct conflicts with it, the playbook wins. |
| 2 | "leads, leagues, and contests" | Read as **lessons**. `/lessons` is in scope. |
| 3 | Domain | **Confirmed** — `thelinks.golf` becomes canonical; `lakevillelinks.com` 301s to it. |
| 4 | Missing operating data | **Stub it.** Ship the structure with clearly-marked placeholders; fill with the client later. Not build-blocking. |
| 5 | Booking | **Stay with the Whoosh handoff.** Existing tee-time linkouts are kept as-is. |
| 6 | Brand | **Refresh and reconcile.** Extract what exists from the current site, then a brand-strategist pass sets the basis — fonts, colours, logo direction — because the current brand is fragmented. Output is a hand-authored DTCG `tokens.json` (the known brand-kit→tokens gap, `_playbook/intake.md` §5). |
| 7 | The stale `fareway.golf` membership page | **Do not link to it.** It retires on its own when the Fareway site converts (~next week). No action needed from us. |

### Consequences of #1 that change the build

- **Sitemap is the playbook's 14-page canonical**, not an invented IA. See `sitemap.md`.
- **The leagues waitlist is mandatory.** Across all 126 audited sites, **exactly zero** offered
  one, while 11% of league pages say "registration closed" and stop. It is the single
  highest-value component in the playbook and it ships in all three registration states.
- **Rates and Hours are one page**, not two — same decision moment.
- **Hours go on the homepage** in a trust strip. 67% of the segment fails this; it is the
  cheapest fix available.
- **Prices ship as HTML text, never images.** Directly fixes this site's worst defect.
- **`Event` schema on every league** — 1% of the corpus has it.
- **Name the simulator technology** (GolfZon NX) — 42% of the segment doesn't.
- **Write to the least confident visitor.** A sim venue is a hospitality business that sells
  golf; the buyer is often not a golfer. 67% of league pages fail beginner reassurance.

### Deliberate deviation from the playbook, logged

Playbook `core.md` §6 says to **own league registration on-site** and calls linking to `ply.golf`
"the pattern to replace, not copy." We are **keeping the ply.golf linkout for v1** (decision #5
covers booking; leagues follow the same constraint — AI Marketing Pro is not live, so there is no
on-site registration surface to own yet). **What we still own on-site:** the full league content
spec, `Event` schema, standings/results, and the **waitlist capture**. Revisit when the platform
surface exists.
