# Screen spec — Homepage · The Links

> **Design-factory step 1 (FRAME) artifact.** Author: `design-ux-architect`. Date: 2026-08-02.
> Surface: `/` (homepage). Divergence axis for this sprint: **`theme → token_set`**.
> **Layout and IA are FIXED.** This document defines the ONE composition every candidate renders.
> Candidates differ only in visual language — colour application, type scale, density, texture,
> imagery treatment, ornament. They do not differ in section order, section count, copy, or data.
>
> **Template provenance:** no `screen-spec.md` exists at
> `fareway-brain/.claude/templates/` (that layer holds only `voice.md` and `website-brief.md`),
> so this follows kiwitron's default `.claude/templates/screen-spec.md`. The brain can
> specialize it later.
>
> **Confidence tags:** `[in-code]` ships today · `[stub]` renders but the content is placeholder ·
> `[needs-client-data]` blocked on the client · `[needs-api]` blocked on a build dependency ·
> `[product-decision]` open question.
>
> **Grounding:** every string and every number below was read out of the running codebase at
> `/Users/root/src/Fareway/Clients/the-links-marketing`. Nothing here is invented. If a
> candidate needs a string that is not in §7 or a number that is not in §8, it does not exist —
> use the stub state, do not fabricate.

---

## 1. Screen + JTBD

**What it is.** The homepage of a two-venue indoor golf simulator business — The Links of
Lakeville and The Links of Stillwater, Minnesota. Static Astro, zero-JS by default, deployed to
staging with `PUBLIC_SITE_NOINDEX=true`.

**What the visitor must learn in the first five seconds.**
1. What this place is (indoor golf simulator bays you rent by the hour).
2. Where it is (Lakeville and Stillwater, Twin Cities).
3. When it is open, and what it costs.
4. That it is a night out, not a driving range — and that they do not have to be a golfer.

**Who the visitor is.** Often not a golfer. Date nights, work outings, birthday parties, bachelor
parties. Winter is the season; this is Minnesota. Write to the least confident person in the room.

**The one action.** Click **Book a Bay** → the venue chooser (`/book/`) → Whoosh. Every other
conversion (league waitlist, event enquiry, rates lookup) is secondary.

**Scope of this sprint.** The homepage only, and only its **visual language**. Section order,
section count, component structure, copy, and data are held fixed across all candidates so the
candidates are comparable.

**Why this sprint exists.** The client's verdict on the current brand: *"not very good and not
built out enough."* The site is functionally complete and strategically correct. It is visually
thin — see §10, which is the actual brief.

---

## 2. Top chrome (reuse what exists — do not invent)

`src/layouts/BaseLayout.astro` wraps the page: `<Header />` → `<main>` → `<Footer />` →
`<OrganizationSchema />`. `<html lang="en">`. Header and footer are shared with all 20+ pages, so
a candidate's chrome treatment must survive on a rates table and a legal page, not just here.

### Header — `src/components/layout/Header.astro` `[in-code]`

Sticky, `top-0`, `z-50`, white/95 with backdrop blur, bottom border.

| Element | Data + source | Behaviour |
|---|---|---|
| Wordmark | `globalData.siteName` = **"The Links"** — `src/data/global.ts` | Text link to `/`. **There is no logo file.** It is set in the body face today. |
| Main nav (7) | `globalData.nav` | Book · Rates & Hours · Leagues · Memberships · Events · Food & Drink · Contact. `aria-current="page"` on prefix match. Wraps to a full-width row below `lg`. |
| Venue switcher | `VenueSwitcher.astro` → `getVenues()` | Label "Visiting" (hidden < `sm`) + two real links: **Lakeville** · **Stillwater**. Writes `localStorage.preferredVenue` on click; works with JS off. Renders on every page. |
| CTA | `BookButton size="sm"` | Label **"Book a Bay"**, href `/book/`. Persistent, transactional. |

**Structural rules a candidate must honour:** the switcher is in the header (it is not a nav
item, by decision — `sitemap.md` §2); the CTA is in the header on every page; the nav is 7 items
and is job-shaped, never department-shaped.

### Footer — `src/components/layout/Footer.astro` `[in-code]`

Four columns at `lg`: **venue block ×2** (name, address, phone, email if present, collapsed
hours) then **Visit** (the 7 nav links) then **More** (Lessons · Juniors · The Bays · Gift Cards ·
FAQ · About + two Facebook links). Bottom bar: `© <year> The Links. All rights reserved.` ·
Privacy · Terms · Booking policy.

Footer NAP must match each Google Business Profile character-for-character. **Do not re-typeset,
abbreviate, or prettify an address.**

---

## 3. Section-by-section (data → placement → state → UX)

Top to bottom, as `src/pages/index.astro` renders today. Section numbers below match the numbered
comments in that file. **This order is the playbook's (`playbook-core.md` §4) and is authoritative
— do not reorder, merge, split, or drop a section.**

Playbook order: hero → trust strip → what you can do here → proof → featured seasonal offer →
the space → email capture → footer.

> **Deviation to know about (do not "fix" it):** the build **co-locates the email capture inside
> the featured-offer section** (§3.5) as a two-column block, and its "the space" section (§3.6) is
> the **two-venue card pair**, which currently contains no photography. So the built page has
> 6 body sections, not 7. Every candidate renders these same 6. Making §3.6 read as "the space"
> — a room you want to be in — is the single biggest visual job of this sprint.

Page container throughout: `max-w-content` (75rem) with `px-gutter` / `px-gutter-lg`
(1.5rem / 4rem) and `py-section` / `py-section-lg` (4rem / 8rem).

---

### 3.1 Hero `[in-code]`

**Job.** Promise + what it literally is + where, in one sentence, with the town in it. One
primary CTA.

**Fields + source**

| Field | Value / source | Tag |
|---|---|---|
| Eyebrow | Hardcoded: `Lakeville & Stillwater, Minnesota` | `[in-code]` |
| `<h1>` | Hardcoded: `Indoor golf that's actually a night out.` | `[in-code]` |
| Subhead | Hardcoded, 2 sentences (verbatim in §7) | `[in-code]` |
| Primary CTA | `BookButton size="lg" variant="onDark"` → `/book/`, label **"Book a Bay"** | `[in-code]` |
| Secondary CTA | Hardcoded link → `/rates/`, label **"See rates & hours"** | `[in-code]` |
| Hero image | **NONE.** A `TODO(content)` comment sits where it should be. | `[needs-client-data]` |

**Format today.** `bg-ink` (#124B2E forest) with `text-surface` (#F7F5F3) — 9.32:1. Eyebrow is
`text-sm`, uppercase, `tracking-widest`, `opacity-70`. H1 `text-4xl` → `lg:text-6xl`, bold,
`max-w-4xl`. Subhead `text-lg`, `opacity-80`, `max-w-2xl`. Secondary CTA is a 2px outline in
`border-surface/60`.

**States.** One state. No loading, no empty — every string is literal.

**UX.** The hero is **venue-neutral by design**: the venue question is asked at the Book click,
not the front door. The primary CTA therefore goes to `/book/` (the chooser), **not** to Whoosh,
and correctly carries no "opens Whoosh" affordance. Only venue-bound Book buttons (§3.6, and the
per-venue pages) go offsite and must declare it.

**Candidate latitude.** Everything visual: whether the hero stays a flat dark field or becomes an
image/gradient/pattern field, the type scale and pairing, eyebrow treatment, CTA shape and weight,
whether there is a scroll cue. **Fixed:** one `<h1>`, this exact copy, two CTAs in this order,
`Book a Bay` first.

---

### 3.2 Trust strip — `TrustStrip.astro` `[in-code]`

**Job.** Hours, address, phone, immediately under the hero. The playbook's single
highest-leverage block — 67% of audited simulator venues have no hours on the homepage at all.
`aria-label="Hours and locations"`.

**Fields + source.** `getCollection('venues')` sorted by `order`, one block per venue, 2-up at
`sm`.

| Field | Source | Renders as |
|---|---|---|
| Venue name | `venue.data.name` | Link → `/locations/<slug>/` |
| Hours | `summariseHours(venue)` joined with ` · ` | Collapsed day runs, e.g. `Mon–Sun 11am–9pm` |
| Unverified badge | `!venue.data.verified` | `(hours being confirmed)` — **currently shows on BOTH venues** |
| Address | `formatAddress(venue)` | Link → `https://maps.google.com/?q=…`, `target="_blank"` |
| Phone | `venue.data.phone` | Link → `telHref()` → `tel:+1…` |

**Rendered values today** (exact — see §8):
- **The Links of Lakeville** — `Mon–Sun 11am–9pm` *(hours being confirmed)* · 17630 Juniper Path
  Suite H, Lakeville, MN 55044 · 612-699-0526
- **The Links of Stillwater** — `Mon 12pm–9pm · Tue–Fri 3pm–9pm · Sat 10am–10pm · Sun 12pm–7pm`
  *(hours being confirmed)* · 5862 Omaha Ave N, Stillwater, MN 55082 · 612-699-0527

**States.** (a) *verified* — no badge. (b) *unverified* — the badge, both venues today.
(c) *empty hours* — `summariseHours` returns "Mon–Sun closed"; never render a blank line.

**Constraint.** This block must be reachable **without scrolling past one screen-height of hero**
on a 390×844 phone. Hours are a screening question, not a logistics question. A candidate whose
hero pushes the strip below two viewport heights on mobile fails.

**Candidate latitude.** Density, rules vs. cards vs. bare columns, whether icons appear, how the
"(hours being confirmed)" caveat is styled (it must stay legible, not be hidden). **Fixed:** two
venue blocks, in `order`, with all four data points each.

---

### 3.3 "What you can do here" `[in-code]`

**Job.** Jobs, not departments. Five cards, each linking to its page.

**Fields + source.** The `things` array, hardcoded at the top of `index.astro`. H2:
`What you can do here`.

| # | Title | Body | href |
|---|---|---|---|
| 1 | Play | Book a bay by the hour. Up to five of you, same price. | `/book/` |
| 2 | Compete | Fall and winter leagues at both venues. | `/leagues/` |
| 3 | Celebrate | Work parties, birthdays, bachelor parties. | `/events/` |
| 4 | Improve | Lessons and practice on a real launch monitor. | `/lessons/` |
| 5 | Eat & drink | Full bar, real food, nine screens. | `/food-and-drink/` |

**Format today.** `<ul>` → `sm:grid-cols-2 lg:grid-cols-3`, so five cards leave a **hole in the
bottom-right of the 3-col grid**. Each card is a full-height `<a>` with a 2px `border-ink/15` box,
`p-6`, `h3` at `text-xl`, body `text-inkMuted`, hover swaps the border to `primary`.

**States.** One. Static array, always five.

**UX.** The whole card is the tap target (≥44px trivially satisfied). Semantic list.

**Candidate latitude.** The grid hole is a legitimate design problem to solve — a 5-up rhythm, a
feature-first card, an asymmetric grid, icons/illustration, numbered cards, a rail. **Fixed:**
five cards, these titles, this copy, these hrefs, this order.

---

### 3.4 Proof — "What players say" `[stub]` `[needs-client-data]`

**Job.** Testimonials with names, or a live Google review widget. 81% of the segment shows no
reviews at all.

**Fields + source.** No data source exists. There is no `testimonials` content collection.
Currently: H2 `What players say` + one paragraph of honest stub text (verbatim in §7).

**States.**
- **Today — stub:** the H2 and the "STUB — awaiting real, attributed reviews…" paragraph.
- **Populated (design for it, render the stub):** 3 quotes, each with a **real name** and venue,
  plus a link to each venue's Google Business Profile.
- **Never:** an invented quote, "Jane D., Lakeville", a 5-star row with no source, a stock avatar.
  Unsourced quotes are not shipped. **A candidate that fabricates a testimonial is disqualified.**

**How to handle it in a candidate.** Render the stub copy, but design the *container* the real
quotes will land in — so the client can see what three attributed reviews will look like. Label
it visibly as awaiting content. Do not delete the section: it is in the playbook order.

**Gap.** `[needs-client-data]` — three attributed testimonials and both venues' Google Business
Profile URLs. **Stillwater appears to have no Google Business Profile at all** (ship-gate
blocker #1).

---

### 3.5 Featured offer — "Fall & winter leagues" + email capture `[in-code]` `[stub data]`

**Job.** The slot that changes monthly (`strategy.md` §5). Launching in the Sep–Oct window, so it
is league registration. Paired with the site's differentiator: the waitlist.

**Layout.** `grid lg:grid-cols-2` — prose left, `WaitlistForm` right.

**Left column — fields + source**

| Field | Value / source | Tag |
|---|---|---|
| Eyebrow | Hardcoded `This season`, `text-primary` (#8A400A ember) | `[in-code]` |
| H2 | Hardcoded `Fall & winter leagues` | `[in-code]` |
| Para 1 | Hardcoded, interpolates `leagues[0]?.data.season` → **`Fall/Winter 2026-27`** | `[in-code]` |
| Para 2 | Hardcoded beginner reassurance | `[in-code]` |
| Link | `See how leagues work` → `/leagues/`, underlined | `[in-code]` |

`leagues` = `getCollection('leagues')` filtered `published`. Two records exist, both
`state: "between"`, both `Fall/Winter 2026-27`, both with `oneLiner`/`format`/`night`/`price`/
`prizes` set to `TBC` or a STUB string. The homepage only reads `season`, so the stubs do not
leak here — but `/leagues/` is a shell until the client supplies the lineup.

**Right column — `WaitlistForm.astro`** (`listName="league-general"`)

| Element | Value |
|---|---|
| H3 | `Get first word on league sign-ups` |
| Blurb | `One email when registration opens. Nothing else.` |
| Fields | `name` (placeholder `Your name`) + `email` (placeholder `you@example.com`), both required, `sr-only` labels, stacked < `sm`, inline at `sm` |
| Honeypot | hidden `_hp` text input, `tabindex="-1"`, `aria-hidden` |
| Submit | `Notify me` |
| Degradation note | `Lead endpoint not configured — this form opens an email instead.` |

**States.**
- **Endpoint configured** — `method="POST"` to `PUBLIC_LEAD_ENDPOINT`, no degradation note.
- **Endpoint absent (today)** — `action="mailto:info@lakevillelinks.com"`, `method="GET"`, and the
  degradation note renders. **Render this state.**
- Success/error states do not exist yet — `[needs-api]`.

**Note.** This form is the strategic centrepiece: **zero of 126 audited competitor sites offer a
waitlist.** It should not look like a footer newsletter box bolted on. It is the differentiator.

**Candidate latitude.** How the two columns relate, whether the form sits on a tinted field
(`#F0DCC9` ember tint is a decorative-only fill — never text-bearing), input styling, button
weight. **Fixed:** eyebrow → H2 → 2 paragraphs → link, form on the right with these exact strings
and these exact fields.

---

### 3.6 The space / "Two venues" `[in-code]` `[needs-client-data: photography]`

**Job.** In the playbook this slot is **photography or video — what does it look like inside?**
In the build it is a two-card venue block **with no imagery at all.** Closing that gap is this
sprint's central visual problem.

**Fields + source.** `getVenues()`, one card per venue, `md:grid-cols-2`. H2: `Two venues`.

| Field | Source | Lakeville | Stillwater |
|---|---|---|---|
| H3 | `venue.data.name` | The Links of Lakeville | The Links of Stillwater |
| Intro | `venue.data.intro` | *(verbatim in §7)* | *(verbatim in §7)* |
| Meta line | `{bays} bays · {simulator}` | `6 bays · GolfZon NX` | `4 bays · GolfZon NX` |
| CTA | `BookButton venue={venue} size="sm"` | `Book at Lakeville →` | `Book at Stillwater →` |
| Secondary | link → `venuePath(venue)` | `Venue details` | `Venue details` |

**The venue-bound Book button is an external Whoosh handoff.** It renders `target="_blank"`,
`rel="noopener"`, a visible `→`, and an `sr-only` `(opens Whoosh booking in a new tab)`, and
carries `data-analytics="book:<slug>"`. **A candidate must not strip the arrow or the screen-reader
disclosure.** Destinations:
- Lakeville → `https://app.whoosh.io/patron/club/the-links-indoor-golf/agenda/simulators/today`
- Stillwater → `https://app.whoosh.io/patron/club/linksstillwater/agenda/simulators/today`

**States.**
- **Today:** no image on either card. `bg-white` card on a `bg-surface` field, 2px `border-ink/15`.
- **Lakeville photography exists** (professional shoot, warm/dark/pendant-lit — see §8 photo
  register) but **is not in the repo**: `public/` contains only `favicon.ico` and six font files.
- **Stillwater has ZERO usable photography.** One pre-opening phone night shot exists, on the old
  site, not in this repo. `[needs-client-data]`

**How to handle imagery in a candidate.** You have no real photographs. Do **not** import stock
golf imagery — it is a named ship-blocker (`playbook-core.md` §9). Instead design the *image
slot*: an inline `<svg>` or CSS-drawn placeholder that holds the correct aspect ratio and the
correct **register** (warm dark room, one bright cool screen), clearly marked as a photo slot.
Asymmetric handling is honest and encouraged — Lakeville has a shoot, Stillwater does not.

**Candidate latitude.** Card vs. full-bleed split vs. alternating rows; how the image slot is
introduced; whether the venue meta becomes a small stat row. **Fixed:** two venues, in `order`,
each with intro + bays + simulator + Whoosh CTA + Venue details link.

---

### 3.7 Footer

See §2. Not re-specified per candidate, but a candidate **must** style it — a default-looking
footer under a designed page is the tell that the candidate stopped early.

---

## 4. Cross-cutting UX

- **One `<h1>` per page.** The hero owns it. Every other section heading is `<h2>`; cards are
  `<h3>`. This is a ship-gate line item and is already true — do not break it.
- **Zero JS by default.** Astro static output. The only script on the page is the venue
  switcher's `localStorage` preference write. Anything a candidate adds must be progressive
  enhancement; the page must be complete with JS off.
- **No loading states.** Everything is build-time content collections. There is no fetch, no
  skeleton, no spinner. A candidate that designs a loading state is designing for a system that
  does not exist here.
- **Tap targets ≥44px** on every link and button, including the venue switcher's small pills and
  the footer link lists.
- **Focus-visible styling is currently absent** and is an open ship-gate item. Candidates should
  include a visible focus treatment: `--brand-state-focus` `#B85718` on light (4.37:1 vs paper),
  `#F3B268` amber on dark.
- **WCAG AA for all text.** 4.5:1 body, 3:1 large text and non-text boundaries. Known traps,
  already computed:
  - `text-ink/70` computes to **4.39:1 on white — fails.** Use `text-inkMuted` (#456052, 6.89:1).
    Any `ink` opacity below `/75` fails. 184 instances of this were already fixed; do not
    reintroduce it.
  - White on sage `#9CBEAD` is **2.02:1.** Sage is a **light field carrying forest text**
    (5.01:1) and nothing else.
  - Amber `#F3B268` on white is **1.85:1.** Amber lives on dark fields only (5.49:1 on forest,
    7.35:1 on night).
  - Ember `#8A400A` as a solid fill takes paper/white text (7.45:1 white, 6.85:1 paper) and
    survives `hover:opacity-90` at 5.43:1. `#B85718` ember-mid is **border/ring only** — white on
    it drops to 3.20:1 after `hover:brightness-125`.
  - Ember tint `#F0DCC9` is a **decorative fill only**, never text-bearing.
  - On the dark hero the CTA **inverts to a paper fill with ink text** (`variant="onDark"`). A
    solid ember button on forest measures 1.36:1 against the field — effectively invisible. Do
    not "fix" this by putting the action colour on the dark hero.
- **Mobile first.** Breakpoints in use: `sm` 640 / `md` 768 / `lg` 1024. The header nav wraps to
  its own full-width row below `lg`; the trust strip is 1-col below `sm`.
- **Dated content.** Every seasonal string carries its season and year (`Fall/Winter 2026-27`,
  `Summer 2026`). Undated seasonal content is a named anti-pattern.

---

## 5. Data gaps — build dependencies

Each of these is real, is in the repo as a stub, and gates the launch. **A candidate must render
the stub state, not paper over it.** Degradation strategy is given per row.

| # | Gap | Tag | Where it bites the homepage | Degrades how |
|---|---|---|---|---|
| 1 | **Testimonials** — no attributed quotes, no GBP links. Stillwater appears to have no Google Business Profile at all. | `[needs-client-data]` | §3.4 is a stub paragraph | Section renders with H2 + honest stub copy; container designed for 3 real quotes |
| 2 | **Stillwater photography** — zero professional frames; one pre-opening phone shot exists outside the repo | `[needs-client-data]` | §3.6 has no image; the OG image is blocked | Designed image slot, marked as awaiting the shoot. Never Lakeville frames standing in for Stillwater |
| 3 | **Lakeville photography not in the repo** — the shoot exists but `public/` holds only `favicon.ico` + fonts | `[needs-client-data]` | §3.1 hero and §3.6 have no imagery | Same: designed slot at the right aspect ratio and register |
| 4 | **Stillwater hours unverified** — inferred from a schedule that appears under BOTH venue headings on the old site | `[needs-client-data]` | §3.2 shows `(hours being confirmed)` on both venues | The badge renders; style it legibly, do not suppress it |
| 5 | **Winter rates** — the published $35/hr card expires **2026-10-03** and no winter rate exists anywhere | `[needs-client-data]` | Homepage does not print a rate, but `/rates/` is the secondary CTA target and is a stub after that date | Homepage unaffected structurally; do not invent a price in a candidate |
| 6 | **League details** — both league records are `state: "between"` with `format`/`night`/`price`/`prizes` = `TBC` | `[needs-client-data]` | §3.5 can only say the season string | Featured offer leans on the waitlist, which is the correct behaviour for `between` |
| 7 | **Lead endpoint** — `PUBLIC_LEAD_ENDPOINT` unset; every form degrades to `mailto:` | `[needs-api]` | §3.5 form renders the degradation note | Render the note. Design a success and an error state so the section is ready when the endpoint lands |
| 8 | **No brand mark** — zero SVG assets exist; the header wordmark is body-face text; the favicon is the retired Lakeville Links emblem | `[needs-client-data]` / commission | Header, footer, hero, OG | See §10.4 — a candidate may **typeset** a wordmark treatment, but must not draw a new logo |
| 9 | **Simulator: NX vs TwoVision** — live pages contradict each other; content collections say `GolfZon NX` | `[product-decision]` | §3.1 subhead and §3.6 meta line both say GolfZon NX | Use `GolfZon NX` as the repo does |
| 10 | **Phone numbers** — three in circulation; Lakeville's record flags `612-699-0526` vs `612-619-1747` | `[needs-client-data]` | §3.2 and footer | Use the values in the content collections verbatim |

---

## 6. Open questions `[product-decision]`

1. **Which venue is the growth priority?** The design treats Lakeville and Stillwater as peers.
   Lakeville has four years of authority, six bays, a full bar and a photo shoot. Stillwater is
   six months old, four bays, inside a bowling alley, with no photography and no GBP. A candidate
   that visually equalises them may be misrepresenting the business — but so would one that
   silently demotes Stillwater. Flagged, not resolved.
2. **Is Stillwater's food & drink its own offer or Stillwater Bowl & Lounge's?** Affects whether
   "Eat & drink" (§3.3 card 5, "Full bar, real food, nine screens") is true of both venues.
   Today it describes Lakeville.
3. **Does LinksFlex extend to Stillwater?** LinksFlex — prepaid hours that never expire — is the
   strongest differentiator in the positioning and **does not appear on the homepage at all
   today.** Whether it earns a homepage slot is a scope question, not a visual one; do not add a
   section for it in this sprint.
4. **Consent banner** — no GTM, no consent banner today; a client/legal call.

---

## 7. The copy sheet — verbatim, use exactly

**This is the anti-slop lever.** Every string a candidate renders comes from this list. No
"Lorem", no "Jane Doe", no invented headline, no rewritten CTA. If you want a string that is not
here, the answer is that it does not exist.

**Metadata**
- Title: `Indoor Golf & Simulators — Lakeville & Stillwater, MN`
- Description: `Two indoor golf venues in the Twin Cities. Book a GolfZon NX bay by the hour, bring up to five friends, full bar and food. Lakeville and Stillwater, MN.`

**Header**
- Wordmark: `The Links`
- Nav: `Book` · `Rates & Hours` · `Leagues` · `Memberships` · `Events` · `Food & Drink` · `Contact`
- Switcher: `Visiting` `Lakeville` `Stillwater`
- CTA: `Book a Bay`

**§3.1 Hero**
- Eyebrow: `Lakeville & Stillwater, Minnesota`
- H1: `Indoor golf that's actually a night out.`
- Subhead: `Ten GolfZon NX bays across two Twin Cities venues. Book by the hour, bring up to five friends for the same price, and let the simulator keep score while you order another round.`
- Primary CTA: `Book a Bay`
- Secondary CTA: `See rates & hours`

**§3.2 Trust strip** — see §8 for the exact rendered hours/address/phone strings.
- Unverified badge: `(hours being confirmed)`

**§3.3 What you can do here**
- H2: `What you can do here`
- `Play` — `Book a bay by the hour. Up to five of you, same price.`
- `Compete` — `Fall and winter leagues at both venues.`
- `Celebrate` — `Work parties, birthdays, bachelor parties.`
- `Improve` — `Lessons and practice on a real launch monitor.`
- `Eat & drink` — `Full bar, real food, nine screens.`

**§3.4 Proof**
- H2: `What players say`
- Stub: `STUB — awaiting real, attributed reviews and the Google Business Profile links for both venues. Unsourced quotes are not shipped.`

**§3.5 Featured offer**
- Eyebrow: `This season`
- H2: `Fall & winter leagues`
- Para 1: `League nights are the reason winter is our busiest season. Teams, handicaps, a live leaderboard and a bar tab. Registration for Fall/Winter 2026-27 opens soon at both venues.`
- Para 2: `Never played in one? Most of our league players hadn't either. Handicaps keep it fair.`
- Link: `See how leagues work`
- Form H3: `Get first word on league sign-ups`
- Form blurb: `One email when registration opens. Nothing else.`
- Placeholders: `Your name` · `you@example.com`
- Submit: `Notify me`
- Degradation note: `Lead endpoint not configured — this form opens an email instead.`

**§3.6 Two venues**
- H2: `Two venues`
- Lakeville intro: `Six GolfZon NX bays, a full bar and nine screens in the south metro. Five bays play both-handed; one is right-handed only.`
- Lakeville meta: `6 bays · GolfZon NX`
- Lakeville CTA: `Book at Lakeville` (+ `→`, + sr-only `(opens Whoosh booking in a new tab)`)
- Stillwater intro: `Four GolfZon NX bays in the east metro, inside Stillwater Bowl & Lounge. Opened early 2026.`
- Stillwater meta: `4 bays · GolfZon NX`
- Stillwater CTA: `Book at Stillwater` (+ `→`, + sr-only disclosure)
- Both: `Venue details`

**Footer**
- Column heads: venue names (as above) · `Visit` · `More`
- More links: `Lessons` · `Juniors` · `The Bays` · `Gift Cards` · `FAQ` · `About` · `Facebook — Lakeville` · `Facebook — Stillwater`
- Bottom: `© 2026 The Links. All rights reserved.` · `Privacy` · `Terms` · `Booking policy`

**Voice reference** (for any micro-copy a candidate must invent — keep it to none if possible):
warm and slightly irreverent beats premium and serious. Never make the reader feel unqualified.

---

## 8. The data sheet — verbatim facts

**Brand**
- Parent: **The Links** · domain `thelinks.golf` · two venues beneath it.

**The Links of Lakeville** — `src/content/venues/lakeville.json`
- Short name: `Lakeville` · slug `lakeville` · order 1 · opened 2022
- 17630 Juniper Path Suite H, Lakeville, MN 55044
- Phone `612-699-0526` · email `info@lakevillelinks.com`
- **6 bays** · **GolfZon NX** · lat 44.6794 / lon −93.2448
- Hours: 11:00–21:00 every day → renders `Mon–Sun 11am–9pm`
- Hours note: `SUMMER HOURS ONLY (through 3 Oct 2026). Winter hours are not yet supplied.`
- Amenities: Full bar · Food menu · 9 TVs · Up to 36 golfers · Club rental $15 · Left-handed bays
- Schema: `SportsActivityLocation`, `BarOrPub` · `verified: false`

**The Links of Stillwater** — `src/content/venues/stillwater.json`
- Short name: `Stillwater` · slug `stillwater` · order 2 · opened 2026
- 5862 Omaha Ave N, Stillwater, MN 55082
- Phone `612-699-0527` · **no email on record**
- **4 bays** · **GolfZon NX** · lat 45.035 / lon −92.822
- Hours: Mon 12:00–21:00 · Tue–Fri 15:00–21:00 · Sat 10:00–22:00 · Sun 12:00–19:00
  → renders `Mon 12pm–9pm · Tue–Fri 3pm–9pm · Sat 10am–10pm · Sun 12pm–7pm`
- Hours note: `UNVERIFIED. Inferred from a schedule that appears under BOTH venue headings on the current site — it may belong to Lakeville. Confirm before launch.`
- Amenities: `Food & drink via Stillwater Bowl & Lounge` · `containedInPlace: Stillwater Bowl & Lounge`
- Schema: `SportsActivityLocation` · `verified: false`

**Combined:** **10 GolfZon NX bays across two Twin Cities venues.**

**Rates** — `src/content/rates/summer-2026.json`
- Season `Summer 2026`, effective 2026-05-03 → **2026-10-03**, `current: true`
- **Bay rental — `$35 / hour`** — per bay, any day, both venues
- Club rental — `$15` per set per visit — **Lakeville only**
- Note: `Rates are per bay, not per person - bring up to five friends for the same price.`
- `winter-2026-27.json` is a **stub**: both rows `TBC`, `current: false`.

**Leagues** — two records, both `published: true`, both `state: "between"`
- Season string used on the homepage: **`Fall/Winter 2026-27`**
- `Fall / Winter League - Lakeville` — registerUrl `https://ply.golf/venue/lakeville-links/leagues`;
  next-season note: `Fall and winter league details are being finalised. Join the list and we will email you the moment registration opens.`
- `Fall / Winter League - Stillwater` — no registerUrl;
  next-season note: `Stillwater league play is being planned for its first winter. Join the list to hear first.`
- Both: `format`/`night`/`price`/`prizes` = `TBC`. Beginner note is a required field on both.

**External handoffs** — `src/data/global.ts`
- Booking: Whoosh (per venue, URLs in §3.6)
- Gift cards: Square · Memberships: Whoosh store · Leagues: ply.golf
- Social: `facebook.com/lakevillelinks/` · `facebook.com/linksofstillwater/`
- Analytics already live: GA4 `G-DTLFJD8KFF`, Meta Pixel `1200620627766874`

**Photography register** (measured off the existing Lakeville shoot — this is the look any
image slot should imply, not a stock direction):
mean luminance 54–74/255 · 33–38% of frame near-black · red channel exceeds blue by +15 to +19 ·
warm in-frame practical light (pendants over the bar), no daylight, no flash · one cool note: the
simulator projection, 7–8% of saturated pixels in the 210–240° band.
**The one-sentence brief: a warm dark room with one bright screen in it.**

---

## 9. Codebase-grounding note — what must be honoured structurally

Read before designing. These components ship today and their structure is fixed; only their
visual language varies.

| Component | Path | Structural contract |
|---|---|---|
| `Header` | `src/components/layout/Header.astro` | Sticky. Wordmark → 7-item nav → **venue switcher** → `Book a Bay`. The switcher lives in the header, not the nav. |
| `Footer` | `src/components/layout/Footer.astro` | Two venue NAP blocks + Visit + More + legal bar. NAP strings must match the GBP character-for-character. |
| `VenueSwitcher` | `src/components/venue/VenueSwitcher.astro` | Two real `<a>` links, active state by path prefix, works with JS off. |
| `TrustStrip` | `src/components/venue/TrustStrip.astro` | **Two venue blocks**, each: name link · collapsed hours (+ unverified badge) · maps link · `tel:` link. `aria-label="Hours and locations"`. |
| `BookButton` | `src/components/venue/BookButton.astro` | Three variants: `solid` / `outline` for light fields, **`onDark` for dark fields** (paper fill, ink text — an ember fill on forest is 1.36:1). Venue-bound → external Whoosh, `target="_blank"`, visible `→`, sr-only `(opens Whoosh booking in a new tab)`, `data-analytics="book:<slug>"`. Venue-less → `/book/` chooser, `data-analytics="book:chooser"`. |
| `WaitlistForm` | `src/components/venue/WaitlistForm.astro` | H3 + blurb + hidden `list`/`venue` + honeypot `_hp` + name + email + submit. Degrades to `mailto:` with a visible note when `PUBLIC_LEAD_ENDPOINT` is unset. |
| `LeagueCard` | `src/components/venue/LeagueCard.astro` | Not on the homepage, but sets the house pattern for state pills (`open`/`full`/`between`) and the required beginner-note callout. Match its language if a candidate introduces a badge. |

**Tokens.** `src/styles/tokens.css` is the compiled target; `marketing/websites/the-links/design/tokens.json`
is the DTCG source (status: **PROPOSAL, not client-approved**). `src/styles/global.css` maps raw
`--brand-*` vars into Tailwind's `@theme`. **Palette slot names are inherited from the starter and
are neutral** — `grape` is the ember `#8A400A`, `banana` is amber `#F3B268`, `blue` is night green
`#0D3520`. Read the comment, not the key. Prefer the semantic utilities: `bg-ink`, `text-surface`,
`text-primary`, `text-accent`, `text-inkMuted`, `font-sans`, `font-mono` (which is the **display**
slot — Bitter, not a monospace).

**Type.** Two self-hosted variable families, both already in `public/fonts/`: **Bitter** (display /
headings / button labels, 300–800) and **Open Sans** (body / UI, 400–700 + italic). 75 KB critical
path. A candidate may re-scale, re-weight and re-pair these; adding a third family costs real bytes
and needs a reason.

**Spacing.** `--brand-section-y` 4rem / `-lg` 8rem · gutters 1.5rem / 4rem · content 75rem ·
prose 46.875rem.

---

## 10. What is visually weak today — the actual brief

Concrete and critical. The page is strategically right and visually a wireframe.

**10.1 There is not one image on the page — or in the build.** `public/` contains `favicon.ico`
and six `.woff2` files. Nothing else. The hero has a `TODO(content)` comment where the photograph
should be. "The space" section (§3.6) is the playbook slot for *interior photography* and contains
two bordered text boxes. The brand's single strongest asset — a professional shoot of a warm dark
room lit by pendants, with the cool simulator projection as counterpoint — appears nowhere. The
page currently sells an hourly rental; it does not sell a room.

**10.2 One dark hero, then eleven feet of white.** The hero is a flat `#124B2E` rectangle with
left-aligned text and no image, no gradient, no texture, no depth. Every section after it
alternates white and `#F7F5F3` — two values that differ by almost nothing. There is no second
moment of contrast anywhere on the page, no full-bleed band, no dark-to-light rhythm. Scroll past
the fold and the page has no visual events left.

**10.3 The card grid is the default card grid.** Five identical `rounded` boxes with a 2px
`border-ink/15` outline and `p-6`, in a 3-column grid that leaves a hole in the bottom-right.
No icons, no imagery, no hierarchy between Play (the money card) and Improve. The venue cards in
§3.6 use the *same* box. The waitlist form uses the *same* box. Three structurally different jobs,
one undifferentiated container.

**10.4 There is no brand mark.** The header wordmark is the literal string "The Links" set in the
body face at `text-xl font-bold`. Zero SVG brand assets exist anywhere. The favicon still shows the
**retired** ornate "Lakeville Links" emblem — so every share the business generates previews the
brand it is leaving. There is no venue lockup, so nothing on the page ever visually says
"The Links **of Lakeville**". *(A candidate may typeset a wordmark treatment to show the direction
— the endorsement system in `brand-direction.md` §4.2 is one mark plus a rule plus a venue line —
but must not draw and ship a new logo. That is a commission, not a sprint output.)*

**10.5 The action colour barely appears.** Ember `#8A400A` is the deliberate, evidence-backed
action colour, drawn from the pendant light in the photography. On the homepage it shows up in
exactly three places: the "This season" eyebrow, the `Notify me` button, and a card border on
hover. The hero CTA is a white rectangle. The page reads as green-and-grey with a stray orange
word — the palette is designed and unspent.

**10.6 The trust strip — the highest-leverage block in the system — is styled as fine print.**
Four data points per venue, all at `text-sm` in `text-inkMuted`, in a 6-unit-tall bar between two
much louder sections. The one thing 67% of competitors omit is present and typographically
whispered. Both venues also carry "(hours being confirmed)" in the same muted grey, so the caveat
and the hours are indistinguishable.

**10.7 The proof section is a paragraph of internal process text.** "STUB — awaiting real,
attributed reviews…" is the right *decision* and the wrong *artifact*. It is not designed as an
empty state; it is a note to ourselves, shipped. There is no container that shows what three real
quotes will look like.

**10.8 Nothing distinguishes the two venues.** Same card, same border, same type, same length of
intro. Lakeville has six bays, a full bar, nine screens and four years of standing; Stillwater has
four bays inside a bowling alley and opened this year. The page renders them as identical rows in
a table.

**10.9 The differentiator is styled as a newsletter box.** The waitlist — the one component zero
of 126 audited competitors have — is a bordered rectangle with two grey inputs and a small orange
button, visually indistinguishable from a footer signup.

**10.10 No texture, no ornament, no motif, no rhythm.** No rules, no numerals, no eyebrow system
beyond one instance, no repeated graphic device, no scorecard/leaderboard/tee-sheet motif — nothing
that would let a returning visitor recognise this brand from a fragment. Bitter is loaded and only
ever used at `bold`. The page could be any local service business.

---

## 11. Constraints every candidate must respect

Non-negotiable. A candidate that breaks one of these is rejected at the gallery gate regardless of
how it looks.

1. **Exactly one `<h1>`.** The hero owns it. Ship-gate line item.
2. **The section order in §3 is fixed.** Six body sections, this sequence, no additions, no
   removals, no merges. This is the divergence axis contract — only the token set varies.
3. **Hours must be visible without scrolling past roughly one screen-height of hero** on a
   390×844 phone. The trust strip's position under the hero is load-bearing, not decorative.
4. **The primary CTA is transactional and says where it goes.** Label `Book a Bay`. Never "Learn
   More". Venue-bound Book buttons go offsite to Whoosh and must keep the visible `→` and the
   `sr-only` "(opens Whoosh booking in a new tab)". The hero CTA goes to `/book/` (the chooser)
   and correctly does *not* claim to open Whoosh — do not add the disclosure there, and do not
   point the hero CTA straight at a venue.
5. **Beginner-friendly tone.** Never imply the reader already golfs. The two reassurance strings
   ("Never played in one? Most of our league players hadn't either." and "Up to five of you, same
   price.") must stay visible, not be demoted to fine print.
6. **Banned words: "premier", "state-of-the-art", "ultimate".** They are in every page title of
   the current site and carry no information.
7. **WCAG AA for all text** — 4.5:1 body, 3:1 large text and non-text boundaries. Honour the
   specific traps in §4. State the computed ratio for any new pairing a candidate introduces.
8. **Use the real copy in §7 and the real data in §8, verbatim.** No Lorem, no placeholder names,
   no invented testimonial, no invented price, no invented hours.
9. **No stock photography.** Named ship-blocker. Design the image *slot* to the register in §8;
   do not fill it with a stock golf ball.
10. **Render the stub states honestly** — the proof stub, the "(hours being confirmed)" badges,
    the lead-endpoint degradation note. They are the truth about this build and the client needs
    to see them.
11. **Self-contained HTML** (wisplet `design` variant): inline CSS/JS, inline `<svg>` or `data:`
    URIs, system font stack. A stylesheet link or a web font **does not load slowly — it does not
    load.** Bitter and Open Sans are not available in the preview; approximate with a serif/slab
    and a humanist sans from the system stack and say so.
12. **Two venues, always.** Any block that shows venue data shows both, in `order`
    (Lakeville, then Stillwater). A two-venue operator whose homepage shows one venue is the
    defect this rebuild exists to fix.

---

*Sign-off gate: this spec is step 1 of the design-factory workflow. Steps 2–4 (diverge → gallery →
converge) must not start until a human has signed it off, and the step-2 preflight checklist must
clear before any candidate is generated. Never ticketize past an unresolved `[needs-api]` — §5 row
7 (the lead endpoint) is one.*
