# Competitor / Reference Teardown — The Links website rebuild

**Client:** The Links — indoor golf simulator venues, Minnesota. **Two locations: Lakeville and Stillwater.**
**Primary reference (client-named):** https://onthegreen-golf.com/ — "single location only, but a good structure for us."
**Crawled:** 2026-08-02, via `curl` against the live site + `/sitemap.xml`.

> Everything below is quoted verbatim from the live HTML where it appears in quotes. Every claim carries
> its source URL. Anything I could not confirm from the page source is marked `[unverified]`.

---

# PART 1 — On The Green Indoor Golf (Blaine, MN)

## 1.1 At a glance

| | |
|---|---|
| Platform | **Squarespace** (`server: Squarespace` response header; `sqs-*` classes; site id `68a5c612c8ac0a32322f354e`) |
| Location | Single site — 12571 Central Ave. NE, Blaine, MN 55434 (https://onthegreen-golf.com/contact) |
| Bays | 10 total — "Bays 1-8" public, "Private Bays 9-10" (https://onthegreen-golf.com/rates) |
| Sim tech | GolfZon TwoVision + GolfVX (https://onthegreen-golf.com/simulators) |
| Booking vendor | **GolfBook** — `https://onthegreen.golfbook.in/calendar.php`, offsite |
| Leagues / events / memberships vendor | **Fareway Golf** — `https://ply.golf/venue/on-the-green` |
| Gift cards vendor | **Toast** — `https://www.toasttab.com/on-the-green-indoor-golf-12571-central-ave-ne/giftcards` |
| Total pages | 16 in sitemap + 4 redirect stubs |
| Blog / content marketing | **None.** `/blog` 302s to `/` (https://onthegreen-golf.com/blog) |

## 1.2 Full page inventory (from https://onthegreen-golf.com/sitemap.xml)

| URL | Purpose | `lastmod` |
|---|---|---|
| `/home` | Homepage (canonical is `https://onthegreen-golf.com`) | — |
| `/book-now` | Booking interstitial + bay sponsors | — |
| `/rates` | **Fall/winter** rates & hours | — |
| `/rates-summer` | **Summer** rates & hours (the one in the nav) | — |
| `/memberships` | Flex membership tiers | — |
| `/flex-member-signup` | Membership signup form | — |
| `/improve` | Lessons & practice | 2025-10-08 |
| `/junior-camps` | Junior camp program | 2026-06-05 |
| `/junior-camp-signup` | Junior camp signup form | — |
| `/leagues` | Leagues landing (hands off to Fareway) | — |
| `/celebrate` | Events & parties — packages, FAQ, inquiry form | — |
| `/food-and-drink` | F&B (links to a PDF menu) | — |
| `/simulators` | Sim technology | — |
| `/about` | Story + team | 2025-10-08 |
| `/community` | Local partnerships | — |
| `/contact` | Contact & hours | 2026-05-05 |

**Redirect stubs** (folder URLs that resolve to the first child — this is how Squarespace nav folders behave):
`/play → /book-now`, `/compete → /leagues`, `/experience → /food-and-drink`, `/about-us → /about`.

**404s:** `/events` (404) and `/locations` (404).

## 1.3 Global navigation — exact labels and order

Header is `header-layout-nav-right` with a persistent right-side button. Four dropdown folders, each with children:

```
Play ▾                          (folder → /play → /book-now)
  ├ Book A Tee Time             → /book-now
  ├ Summer Rates & Hours        → /rates-summer
  ├ Flex Memberships            → /memberships
  ├ Lessons & Practice          → /improve
  └ Juniors and Camps           → /junior-camps
Compete ▾                       (folder → /compete → /leagues)
  ├ Leagues                     → /leagues
  ├ Tournaments & Events        → https://ply.golf/venue/on-the-green   [offsite, no target indicator]
  └ Celebrate                   → /celebrate
Experience ▾                    (folder → /experience → /food-and-drink)
  ├ Food and Drink              → /food-and-drink
  └ Simulators                  → /simulators
About Us ▾                      (folder → /about-us → /about)
  ├ About Us                    → /about
  ├ Our Community               → /community
  └ Contact & Hours             → /contact

[ Book A Tee Time ]  ← persistent header button → https://onthegreen.golfbook.in/calendar.php
```

Verb-based top-level IA — **Play / Compete / Experience / About Us**. This is the single strongest
structural idea on the site and the thing the client most likely means by "a good structure for us."
It maps to intent (I want to hit balls / I want to compete / tell me what it's like / who are you)
rather than to org chart.

Note the collision: the nav item **"Book A Tee Time"** goes to `/book-now`, while the header **button**
with the *identical* label goes straight offsite to GolfBook. Two same-labeled controls, two destinations.

## 1.4 Footer structure (identical on all 17 pages)

Column 1 — NAP block:
```
(651) 728-6936
elliottjang@onthegreen-golf.com
12571 Central Ave. NE
Blaine, MN 55434
```
Column 2 — link list (verbatim, in order):
`Book A Tee Time` → golfbook.in · `Join A League` → /leagues · `Plan An Event` → **/events (404)** ·
`Memberships` → /memberships · `Buy Gift Cards` → toasttab.com · `Simulators` → /simulators ·
`Contact Us` → /contact · `Lessons` → /improve

Column 3 — social: Instagram (`onthegreen_indoorgolf`), Facebook (`OntheGreenIndoorGolfMN`).

Above the footer, a sitewide newsletter band: heading **"Subscribe"**, body "Sign up with your email
address to receive news and updates.", field "Email Address", button "Sign Up", microcopy "We respect
your privacy."

## 1.5 Homepage — section by section, in DOM order

Nine `<section>` blocks (https://onthegreen-golf.com/home).

**1. Hero**
- Headline (h1): **"Where Tuesday feels like Sunday at Pebble"**
- CTA: **"Book A Tee Time"** → `https://onthegreen.golfbook.in/calendar.php` (direct offsite)
- Background: real venue photo — "People playing indoor golf on three simulation screens…"
- No location line, no hours, no phone, no price in the hero.

**2. Positioning statement** (text-only band)
- "Your neighborhood's go-to spot for serious golf, not-so-serious fun, and the occasional hole-in-one dance."

**3. Three-way intent split** — the load-bearing section. Eyebrow: **"Play. Compete. Celebrate."**
| Card headline | Body | CTA (verbatim) | Destination |
|---|---|---|---|
| "Play Without the Pressure" | "Solo practice? Check. Weekend with friends? Absolutely. Late-night nine at Pebble? Why not." | **"Let's Play ▸"** | `/book-now` |
| "Compete for All the Glory" | "Join a league, crush your buddies, or just try to beat your own score. Either way, bragging rights are included." | **"Bring It On ▸"** | `/leagues` |
| "Celebrate in Grand Style" | "Birthdays, work wins, or just an excuse to eat cake - our bays and bar have you covered." | **"Book A Bash ▸"** | **`/events` — 404** |

This mirrors the nav folders exactly. The homepage *is* the nav, expanded. Clean.

**4. Promotion band** — animated marquee heading **"News and Updates 🔥⛳"** (repeated 3×), currently
carrying one offer:
- "Summer Memberships" / "Become a Summer Member" / **"$150/month"**
- Bullets: "2 hours a day:", "Purchase more hours anytime", "No guest fees", "Member must be present at tee time", "Subject to summer hours (walk-ins not guaranteed)"
- CTA: **"Join Now"** → `https://ply.golf/venue/on-the-green/memberships`

**5. Testimonials eyebrow** — "❊ Testimonials" (its own section)

**6. Testimonials** — heading "What Our Players Think:", three quotes, attributed to
"Great Places Minnesota", "Christopher W.", "Kelly C." No star ratings, no source links, no review count.

**7. Closing conversion band**
- Headline (h1): **"Your next round is one click away"**
- CTA: **"Book A Bay"** → `https://onthegreen.golfbook.in/calendar.php`

**8. Newsletter** — "Subscribe" (see 1.4)

**9. Footer** (see 1.4)

**Homepage headline inventory:** four `<h1>`s on one page — "Where Tuesday feels like Sunday at Pebble",
"News and Updates 🔥⛳" (×2, marquee duplication), "Summer Memberships", "Your next round is one click away".
That is an SEO defect, not a design choice.

## 1.6 Primary conversion action + step count

**Primary action: book a simulator bay.** It is unmissable — the `golfbook.in/calendar.php` URL appears
**8 times** in the homepage source (persistent header button ×2 for desktop/mobile menus, hero CTA,
closing band CTA, footer, plus mobile-menu duplicates).

**Homepage → booked:**
1. Click **"Book A Tee Time"** (header or hero) → leaves the site to `onthegreen.golfbook.in/calendar.php`
2. GolfBook calendar — pick a date from a month grid (page title: "On the Green, Indoor Golf | Reserve Your Spot")
3. Pick a time / bay
4. **"Sign In"** or **"Sign Up"** — the tool exposes Sign In / Sign Up / My Reservations / My Account, so an
   account appears to be required to complete a reservation `[unverified — I did not transact]`
5. Confirm

**~4–5 steps, with a hard site exit at step 1 and an account wall at step 4.** No duration/party-size
picker on onthegreen-golf.com itself; no price shown at the point of booking. The user must have already
visited `/rates-summer` to know what an hour costs.

The `/book-now` page is *not* a booking page — it's an interstitial: h1 "Reserve Your Bay", two buttons
("Book Now" → golfbook.in, "Rates & Hours" → /rates), then a **"Our Bay Sponsors"** block
(Rochelle Hennessy / RE/MAX Results Commercial, plus "Looking for Local Awarness?" [sic] — a solicitation
to sponsor a bay). A page whose job is to convert instead sells ad inventory.

## 1.7 How they present each content type

### Rates & hours — https://onthegreen-golf.com/rates-summer and https://onthegreen-golf.com/rates
**Two separate seasonal pages, both live, only one in the nav.** Identical `<title>` and meta description on
both ("Rates & Hours | Book Your Tee Time Today — On The Green Indoor Golf Simulators | Blaine, MN"),
different canonicals — textbook duplicate content.

Structure on each: h1 "Rates & Hours" → "Book now" button → "❊ Our Hours" (day-range cards) →
"❊ Simulator Rates" (tier cards) → "❊ Discounts & Promotions" → "❊ Other Pricing".

*Summer* (`/rates-summer`, in the nav): Mon Closed · Tue-Thu Noon-10 PM · Fri-Sat 10 AM-10 PM · Sun 10 AM-8 PM.
Note: "Listed hours are summer hours which start May 1" and "Hours are subject to change given weather.
Please check our tee sheet for most up to date hours". Rates: "Standard Rate - All Bays $35/hour/bay",
"Senior Rate - All Bays $29/hour/bay".

*Fall/winter* (`/rates`, **orphaned** — linked only from `/book-now` and `/simulators`): Mon-Thu 8 AM-10 PM ·
Fri-Sat 8 AM-11 PM · Sun 8 AM-9 PM, "Listed hours are fall and winter hours which start Nov 1." Rates
split by tier **and** bay class, each with an eligibility window:
- "Peak Premium" — Bays 1-8 $55/hour/bay, Private Bays 9-10 $60/hour/bay — "✅ Wed - Thu: 5 pm - Close / ✅ Fri - Sat: All Day / ✅ Sun: Open - 3 pm"
- "Non-Peak" — $45 / $50 — "✅ Mon - Tue: All Day / ✅ Wed - Thu: Before 5:00 pm / ✅ Sunday: 3 pm - Close"
- "Senior" (Must be 60+) — $29 / $34 — "✅ Mon - Thu: Open - 3:00 PM / ✅ Fri: Open - 12 PM"

Shared discount rail on both pages: "Flex Memberships" ("Flex Memberships are replacing our punch cards as
off Fall 2025." [sic]), "Patron Card $129/year" (20% off posted rates), plus "Other Pricing" —
First Responders/Veterans/Teachers 15% off, Students $35 M-F 3:00-5:00, Public Country Club $5 off/hour/bay,
Club Rentals $10, TPC Twin Cities Members 10% off bay time.

The pairing of **price tier + the exact days/times it applies**, as a checkmark list inside the price card, is
the single best pattern on the site. It kills the "is this peak?" question at the moment it forms.

### Hours
Published in **three** places — `/rates`, `/rates-summer`, `/contact` — with no single source of truth.
As of the crawl, `/contact` and `/rates-summer` show summer hours while `/rates` shows winter hours as
though current. There is **no hours markup in schema** (see 1.10).

### Memberships — https://onthegreen-golf.com/memberships
h1 "Become A Member" → "Purchase a Package" → a summer-membership promo band ("Join Now" → ply.golf,
"Learn More" → `https://onthegreen-golf.com/home#promotion`) → **"Play more, Pay less"** with the four
benefit headlines: "Buy hours upfront, save big", "Hours are shareable and never expire",
"21-day advanced booking windows", "15% Food and beverage discount", under the qualifiers
"No Annual Commitment." / "No Guest Fees."

Then "❊ Membership Options" — three tiers, each with a badge, an eligibility line, and a package ladder
showing the discount inline:
- Badge "Max Benefits" — **Anytime Flex** — "Book anytime - no restrictions" — 12 hrs $549 (24% off) / 24 hrs $1,049 (27% off) / 48 hrs $1,899 (34% off)
- Badge "Non-Peak" — **Basic Flex** — "Mon-Tue All Day, Wed-Thu before 5PM, Fri before 2PM, Sun after 3PM" — 12 hrs $459 (24% off) / 24 hrs $879 (27% off) / 48 hrs $1,589 (34% off)
- Badge "For Juniors" — **Junior Flex** — "Mon-Fri 2-5 PM" — 12 hrs $319 (24% off) / 24 hrs $599 (29% off) / 48 hrs $1,099 (35% off)

CTAs: "Purchase a Package" → `/memberships#signup`, "Have Questions?" → `/contact`.
Showing the **% off** on every rung is a good, cheap conversion device.

Conflict worth noting: the homepage promo sells a **$150/month** "Summer Membership" via Fareway, while
`/memberships` sells prepaid **hour packages** with "No Annual Commitment." Two different membership
products under one word, sold through two different systems.

### Leagues — https://onthegreen-golf.com/leagues
Thin. h1 "Leagues", an animated "Sign Up Now ☆" marquee, "Find your League" with
"From casual nine-hole weeklies to big-bracket battles, there's a spot for you here." →
**"Explore Leagues"** → `https://ply.golf/venue/on-the-green/leagues`. Then "Your chance to win an
(On the) Green Jacket…" and "Have Questions?" → "Contact us".

**No league names, no nights, no dates, no format, no price, no capacity on the page.** Everything is
behind an offsite click into a JavaScript-rendered app. A prospective league player cannot evaluate the
offer without leaving. This is the weakest page on the site.

### Events / parties — https://onthegreen-golf.com/celebrate
The strongest page. Order: h1 "Events & Parties" + CTA "Plan My Event" → occasion chip row
("🥳 Birthdays / 🥂 Company Events / 🍾 Holiday Parties / 🍻 Team Building / 🎊 Fundraisers / 🎗️ Banquets /
🎉 Bachelor/Bachelorette Parties / 🎓 Grad Parties / 👶 Diaper Parties / 👯 Just an Excuse to Celebrate")
under "Your party just found its sweet spot" → "Why Celebrate Here?" (three reasons: "All Play, No Pressure",
"Food & Drink to Match", "Spaces That Flex") → **"Party and Group Packages"** → add-ons → seasonal group
packages → inquiry form → FAQ.

Packages by size, priced:
- **Small** — "Grab a couple of bays for 3 hours of golf + food & drink special" — Public Bays $399 / Private Bays $449 — "✅ 2 bays for three hours / ✅ Up to 12 golfers, 20 total guests / ✅ 4 pitches of beer, 2 pizzas, and 2 appetizers included"
- **Medium** — 4 bays, 3 hours — w/ Buffet $699 (+buffet costs) / w/o Buffet $849 — "✅ Up to 24 golfers, 40 total guests"
- **Full Venue** — all 10 bays, 3 hours — w/ Buffet $1,599 (+buffet costs) — "✅ Up to 60 golfers, 150 total guests / ✅ Must be with buffet."

Add-on rules stated plainly: "Food Buffet: $20/person…", "All guests charged, not just golfers.",
"Catering: $1,000 additional fee…", "Large Parties: 20% service and gratuity fee will be added".

Seasonal group packages: "Grad Parties" ($3,000, 4-hr open house, whole facility), "The 'Big Game'"
($299/bay 5-10 PM, once a year, buffet for 6), "Gameday Parties" (Public Bay $199 / Private Bay $249,
"Only offered Sundays of Vikings game… $1 Grape Apes when Vikings score").

Eight-question FAQ answering the real objections: capacity per bay, lead time ("at least 2–3 weeks in
advance"), F&B, outside cake/decorations ("no outside alcohol"), what's included, deposit
("we typically require a deposit at booking"), non-golfers, staffing.

**Publishing event package prices, guest caps and gratuity rules on the page — instead of gating them
behind an inquiry form — is the best decision on this site.**

### Food & beverage — https://onthegreen-golf.com/food-and-drink
Almost nothing. h1 "Food & Drink", a **"See Menu"** button → a **PDF**
(`/s/OTG-Menu-Feb-2026.pdf`), and: "Food - ✅ / Libations - ✅ / Pull tabs - ✅ / E-tabs - ✅ /
We even have a pool table 🎱." No items, no prices, no photos, nothing indexable.

### Instruction — https://onthegreen-golf.com/improve
h1 "Sharpen the Swing" → instructor bio (Matt K, ~150 words of real credentials) → "Trial Lesson Program"
("Not sure? No worries. Try it out before committing." — 1 × 30-min consult, swing diagnostic,
"No commitments necessary") → "❊ Individual Lesson Pricing" (5 lessons $495 / $99 per lesson;
10 lessons $949 / $95 per lesson) → "❊ Group Lesson Pricing" (2 Adults: 5 × 90 min $899, 10 × 90 min $1,699;
4 Adults: 5 × 120 min $1,399, 10 × 120 min $2,699) → "Practice All Season. Improve Your Game." /
"AI Swing Coach? Why Not." with "Book Bay 8, 9, or 10 to give it a try."

The **free trial lesson as the entry rung above a $495 package** is a well-built ladder. The named
instructor with a real bio is the trust anchor.
Defect: the final CTA "Book Now ▸" points at `/contact-us` — a URL not in the sitemap `[unverified — likely
resolves via Squarespace, but it is not the `/contact` used everywhere else]`.

### Juniors — https://onthegreen-golf.com/junior-camps + `/junior-camp-signup`
"Junior Golf Camp", $450, "Six total days of camp included (Tue-Thu over two weeks)", "10 AM to 12:30 PM",
"Instructor and lunch included", ages 8-14. Camp options listed as
"Option 1: Jun 16-18 and 23-25" and "Option 2: July 14-16 and 21-23" — **both in the past as of the
2026-08-02 crawl**, still presented as bookable. Has its own FAQ. Signup is a separate page with a form.

### Promotions
One mechanism only: the homepage "News and Updates 🔥⛳" marquee band, holding a single offer at a time
(currently the $150/month summer membership). No announcement bar in use (the Squarespace
`sqs-announcement-bar-dropzone` is present but empty). No offers page, no expiry dates on offers.

### Proof
- **Testimonials:** 3 hardcoded quotes on the homepage, attributed by first name + last initial. No star
  rating, no aggregate count, no link to Google/Yelp, no review schema.
- **Community page** (https://onthegreen-golf.com/community): logo/partner wall — Centennial High School,
  The 3M Open, Blaine High School, Rooster River, Totino Grace High School, Coon Rapids High School,
  Spring Lake Lions Club, Irondale High School. Strong local-credibility play, no CTA on the page.
- **Team** (https://onthegreen-golf.com/about): six named people with roles and a "Favorite Sim Course:"
  line each (Elliott Jang, Jess Jang, Oskar Peterson — Co-Owners; Casey Turnipseed — Manager;
  Cody Connolly — Senior Associate; Angela Bohnsack — Bar Manager). Founder story is genuinely good:
  "In 2020, amidst the challenges of that year and a personal battle with cancer, golf became my sanctuary."
  and closes "Life is too short; book that tee time."
- **Bay sponsors** (https://onthegreen-golf.com/book-now): local business logos as a revenue line.
- **Photography:** all real venue/customer photography, not stock — alt text describes actual scenes
  ("Birthday celebration with black and gold balloons and people watching a golf video game in a lounge",
  "An interior of a bar or lounge with a pool table in the foreground…"). Warm, low-light, people-present.
  No press logos, no media mentions.

## 1.8 Booking — vendor stack

**Three separate transactional vendors plus Squarespace forms.** Nothing is embedded; every one is a hard exit.

| Job | Vendor | URL | Prominence |
|---|---|---|---|
| Bay / tee time | **GolfBook** | `https://onthegreen.golfbook.in/calendar.php` | Very high — persistent header button, hero, closing band, footer (8 refs on the homepage) |
| Leagues | **Fareway Golf** | `https://ply.golf/venue/on-the-green/leagues` | Medium — one "Explore Leagues" button |
| Tournaments & Events | **Fareway Golf** | `https://ply.golf/venue/on-the-green` | Medium — top-level nav item |
| Memberships (monthly) | **Fareway Golf** | `https://ply.golf/venue/on-the-green/memberships` | Medium — "Join Now" |
| Membership packages | Squarespace form | `/flex-member-signup` | Low |
| Event inquiry | Squarespace form block | `/celebrate` (form renders client-side) | Medium |
| Lessons / camps | Squarespace forms | `/improve#signup`, `/junior-camp-signup` | Medium |
| Gift cards | **Toast** | `toasttab.com/on-the-green-…/giftcards` | Footer only |
| Menu | Static PDF | `/s/OTG-Menu-Feb-2026.pdf` | Low |

GolfBook is a per-venue subdomain (`onthegreen.golfbook.in`) — an important detail for The Links: that
vendor model produces **one booking host per site**, which does not naturally serve two locations.

The ply.golf (Fareway Golf) pages are a client-rendered app: all three URLs return the same generic
`<title>Fareway Golf</title>` with no server-rendered content, so league and membership offers are
invisible to search engines and to link previews.

## 1.9 SEO surface

**Title pattern:** `<Page topic> | <benefit phrase> — On The Green Indoor Golf Simulators | Blaine, MN`
- Home: "On The Green Indoor Golf Simulators | Blaine, MN | Play, Compete, Celebrate - Join Now"
- Rates: "Rates & Hours | Book Your Tee Time Today — On The Green Indoor Golf Simulators | Blaine, MN"
- Simulators: "Golf Simulators | GolfZon & GolfVX — On The Green Indoor Golf Simulators | Blaine, MN"
- Celebrate: "Private Events & Parties | Book Your Celebration Today — On The Green Indoor Golf Simulators | Blaine, MN"

Deliberate, consistent, and **city-stamped on every page** — the right instinct for a local business.
Titles run long (100+ chars) and will truncate in SERPs. Two pages share a title verbatim (`/rates`,
`/rates-summer`) and two share it accidentally (`/flex-member-signup` and `/junior-camp-signup` both say
"Membership Signup | Join Now for Golf Flexibility…").

**Meta descriptions:** unique per page, benefit-led, each ending in a booking nudge and most naming
"Blaine, MN". Good.

**Open Graph / Twitter:** present on every page, but `og:image` is the **favicon**
(`.../Favicon+Light.png?format=1500w`) on every single page. Every share of this site — every text
message with a link to it — previews as a tiny logo instead of a photo of the venue. Cheap, high-impact fix.

**JSON-LD schema:** exactly two blocks, identical on all 17 pages:
```json
{"url":"https://onthegreen-golf.com","name":"On The Green Indoor Golf Simulators | Blaine, MN",
 "description":"","image":"//images.squarespace-cdn.com/...","@context":"http://schema.org","@type":"WebSite"}
```
```json
{"address":"","image":"https://static1.squarespace.com/...","openingHours":"",
 "@context":"http://schema.org","@type":"LocalBusiness"}
```
The `LocalBusiness` node has **`"address": ""` and `"openingHours": ""` — both empty.** No
`PostalAddress`, no `geo`, no `telephone`, no `priceRange`, no `sameAs`. There is no `Product`/`Offer`
markup on the rates or membership pages, no `Event` markup on leagues or camps, no `FAQPage` markup
despite two hand-built FAQ sections, no `AggregateRating` despite three testimonials, and no
`BreadcrumbList`. This is the Squarespace default, untouched — the single largest missed opportunity
on the site, and the easiest to beat.

**robots.txt:** Squarespace default. Notably it **blocks AI crawlers** — `GPTBot`, `ClaudeBot`,
`anthropic-ai`, `Google-Extended`, `PerplexityBot`, `CCBot` and ~25 others are disallowed
(https://onthegreen-golf.com/robots.txt). For a business whose customers increasingly ask an assistant
"where can I hit golf balls indoors near me", that default is working against them.

**Content marketing:** none. No blog, no location/service landing pages, no "indoor golf near
\<suburb\>" pages. All organic weight rests on 16 pages.

**Page weight:** 250 KB–1.13 MB of **HTML alone**, before images. `/junior-camps` 1.13 MB,
`/flex-member-signup` 1.09 MB, `/book-now` 1.01 MB, `/food-and-drink` 957 KB. Squarespace form blocks are
the likely culprit. `[unverified — I did not run Lighthouse]`, but a 1 MB HTML document on a booking
page is a real mobile-conversion tax.

## 1.10 Defects found (verified)

1. **`/events` 404s and is linked from all 17 pages.** The footer's "Plan An Event", the homepage's
   "Book A Bash ▸", and `/celebrate`'s own hero CTA "Plan My Event" (→ `/events#inquire`) all land on a
   404. The real page is `/celebrate`. The events funnel — which sells $399–$3,000 packages — is broken
   at three of its entry points.
2. **`/rates` is orphaned.** The nav only exposes "Summer Rates & Hours" → `/rates-summer`. `/rates`
   (winter pricing) is reachable only from `/book-now` and `/simulators`, is fully indexable, and shares
   its title/description with `/rates-summer`.
3. **Hours contradict across pages.** `/rates` presents winter hours as current; `/contact` and
   `/rates-summer` present summer hours. Three copies, no single source.
4. **Stale camp dates.** `/junior-camps` still advertises June and July 2026 sessions as bookable on 2026-08-02.
5. **Four `<h1>`s on the homepage**, two of them the duplicated marquee text.
6. **`og:image` is the favicon** on every page.
7. **Empty `address` and `openingHours`** in `LocalBusiness` JSON-LD.
8. **Same label, two destinations** — nav "Book A Tee Time" → `/book-now`; header button
   "Book A Tee Time" → offsite GolfBook.
9. **Typos in shipped copy** — "Looking for Local Awarness?" (`/book-now`), "as off Fall 2025"
   (`/rates`, `/rates-summer`), "GoflVX" and "GolfVS's" (`/simulators`), "I nterested in lessons?" (`/improve`).
10. **`/improve` final CTA** points to `/contact-us`, not the `/contact` used everywhere else.

## 1.11 Steal / avoid

### Steal (in priority order)

1. **The verb-based IA: Play / Compete / Experience.** Four folders, intent-named, and the homepage's
   three-card section is a literal expansion of the first three. A first-time visitor self-sorts in one
   glance. Adopt this wholesale for The Links, with **Locations** added as a fifth peer.
   (https://onthegreen-golf.com/home)
2. **Price-tier cards that carry their own eligibility windows.** "Non-Peak — $45/hour/bay — ✅ Mon-Tue:
   All Day / ✅ Wed-Thu: Before 5:00 pm / ✅ Sunday: 3 pm - Close". The rate and the rule live in the same
   card, so "is this peak?" never has to be asked. (https://onthegreen-golf.com/rates)
3. **Fully public event pricing with guest caps and gratuity rules.** $399 / $699 / $1,599 tiers, "Up to 24
   golfers, 40 total guests", "20% service and gratuity fee will be added", "Catering: $1,000 additional
   fee". Every group organizer's qualifying question answered before they fill in a form — which means
   the leads that do arrive are pre-qualified. (https://onthegreen-golf.com/celebrate)
4. **The occasion chip row.** Ten emoji-tagged occasions from "🥳 Birthdays" to "👶 Diaper Parties". A
   visitor finds their exact use case in the list and feels seen. Trivially cheap, very effective.
   (https://onthegreen-golf.com/celebrate)
5. **The free trial lesson as the bottom rung.** "Not sure? No worries. Try it out before committing." —
   a $0 offer sitting directly above a $495 package converts the undecided instead of losing them.
   (https://onthegreen-golf.com/improve)

Runners-up worth lifting: the **membership ladder with "(24% off)" printed on each rung**
(https://onthegreen-golf.com/memberships); the **8-question objection-shaped FAQ** on `/celebrate`;
the **local-partner logo wall** at `/community`; the **named team with "Favorite Sim Course"**;
the **all-real photography**; the **founder story** at `/about`; and the **persistent header booking
button** that never scrolls away.

### Avoid

1. **Every transaction is an offsite handoff, split across three vendors.** GolfBook for bays, Fareway
   Golf for leagues/events/memberships, Toast for gift cards, Squarespace forms for everything else. The
   user leaves the brand at the exact moment of commitment, four different ways, into four different
   account systems. Worse, the ply.golf pages render client-side — so league offers and membership prices
   are invisible to Google and to link previews. For The Links: pick **one** booking vendor, embed it if
   the vendor supports it, and keep the offer detail (league names, nights, prices) on your own indexable pages.
2. **Seasonal content duplicated into parallel pages instead of one page with a state.** `/rates` and
   `/rates-summer` both live, both indexed, sharing a title, contradicting each other on hours, with the
   off-season one orphaned from the nav. Twice a year someone must remember to reshuffle the nav — and
   they didn't. **This is the exact failure mode The Links will hit with two locations** if per-location
   content is handled by duplicating pages rather than by one page reading a location parameter.
3. **Publishing the offer only behind a click.** `/leagues` is a headline, a marquee and one button. No
   league names, no nights, no format, no price. `/food-and-drink` is four checkmarks and a PDF. These are
   two of the highest-intent queries in the category ("indoor golf league near me", "\<venue\> menu") and
   both pages are effectively empty. Put the league table and the menu in HTML.

Also avoid: shipping a booking page that sells sponsorships instead of bookings; leaving `LocalBusiness`
schema at the Squarespace default; letting the favicon serve as `og:image`; and 1 MB HTML documents on
mobile booking pages.

---

# PART 2 — Multi-location patterns across peer venues

Seven operators examined. onthegreen-golf.com is single-location, so it offers **no** guidance here —
it has no `/locations` page (`/locations` returns 404) and no location concept anywhere in its IA. The
location-switching pattern had to be sourced entirely from peers.

## 2.0 First — The Links' own current site is already a two-location site, and it is the best evidence we have

**https://www.lakevillelinks.com/** is live and already serves both venues. This is the actual baseline
the rebuild replaces, and it exhibits most of the failure modes below.

- **Brand/domain names one venue.** The site is titled "Lakeville Links Premier Indoor Golf" and lives on
  `lakevillelinks.com`, while the Stillwater venue is branded "The Links of Stillwater"
  (https://www.lakevillelinks.com/stillwater). One of two locations owns the domain and the `<title>` of
  every page — including Stillwater's own page, which reads
  "Stillwater Landing — Lakeville Links Premier Indoor Golf".
- **No "Locations" nav item.** Nav is: `Home · Memberships · Leagues & Contests · Groups & Private Events ·
  Instruction · Hours | Rates | Gift Cards · Location | APP · About the Facility ▾ (About the Facility,
  Menu, Simulator Settings, Our Story)` + a `BOOK NOW!` button → `/bookinglanding`. Location surfaces only
  as an "Our Locations" homepage section and a singular "Location | APP" → `/contact`.
- **Booking is a two-step interstitial.** `BOOK NOW!` → https://www.lakevillelinks.com/bookinglanding,
  a page whose entire content is h1 "Booking Details" and two buttons: **"Book at Lakeville"** → `/booking`
  and **"Book at Stillwater MN"** → `/bookingstillwater`. Each of those is a *second* interstitial — a
  terms/expectations page ending in **"ACKNOWLEDGE AND GO TO BOOKING"** — before finally exiting to Whoosh:
  - Lakeville → `https://app.whoosh.io/patron/club/the-links-indoor-golf/agenda/simulators/today`
  - Stillwater → `https://app.whoosh.io/patron/club/linksstillwater/agenda/simulators/today`

  **That is three clicks and two full page loads of friction before the calendar appears** — and the two
  venues are separate Whoosh clubs with unrelated slugs (`the-links-indoor-golf` vs `linksstillwater`).
- **Booking policies already differ per location** and are stated on those interstitials: Lakeville —
  "Credit Card Required to hold your reservation. Your card will have a hold placed on it."; Stillwater —
  "Credit Card Required to make your reservation. Your card will be charged in full."
  (https://www.lakevillelinks.com/booking, https://www.lakevillelinks.com/bookingstillwater)
- **Rates page already uses the column-per-site pattern — and it works.**
  https://www.lakevillelinks.com/rates gives one shared price ("Summer 2026 Hours & Rates: $35/Hour
  (May 3rd, 2026 through October 3, 2026)") and then two labelled hours columns, "Lakeville, MN" (11am to
  9pm Daily) and "Stillwater, MN" (Sunday → 12PM to 7PM / Monday → 12PM to 9PM / Tuesday through Friday →
  3PM to 9PM / Saturday → 10AM to 10PM), with a shared closures line. **Keep this.**
- **Stale promo, live today.** Both booking interstitials still carry "March Promotion Details — 25% off
  simulator time during the promotion period (March 1 - 31, 2026)" as of the 2026-08-02 crawl.
- **Leagues are already offsite to Fareway Golf** — "Flexible Floating Leagues" →
  `https://ply.golf/venue/lakeville-links/leagues` (https://www.lakevillelinks.com/leagues-contests).
  Note this is the **same vendor** On The Green uses for leagues/memberships. The Stillwater page marks
  leagues **"Leagues & Contests (Coming Soon)"** with an empty `href`.
- **Two phone numbers** (612-699-0526, 612-699-0527) but Stillwater's own page lists
  "P: (612) 699 - 0526" — the Lakeville number (https://www.lakevillelinks.com/stillwater).
- Gift cards go to **Square** (`app.squareup.com/gift/MLYARTM9VAGFK/order`); tee time booking is **Whoosh**;
  leagues are **Fareway Golf**. Same three-vendor sprawl as On The Green.

Also worth flagging: **`thelinksindoorgolf.com` is a different, unrelated business** — "The Links Indoor
Golf", 2435 South Main Street, Findlay, Ohio. Brand-search collision risk on the name "The Links Indoor
Golf" is real and should inform domain/brand decisions.

## 2.1 Five Iron Golf — 40+ locations, incl. Minneapolis North Loop
https://fiveirongolf.com

**A. How two+ locations are handled.** One site, one domain. Nav is
`Events · Membership · Lessons · League · Tournaments · **Locations**` plus a persistent "Book Now".
"Locations" → https://fiveirongolf.com/locations, a **state-grouped index** (h3 per state: Connecticut,
… Minnesota, … Washington) with a ZIP-code field whose placeholder is **"FIND YOUR NEAREST 5i"**. Detail
pages are `/locations/<city>-<neighborhood>` — `/locations/minneapolis-north-loop`,
`/locations/chicago-river-north`, `/locations/boston-seaport`. Location is a **first-class content type**:
the site ships a dedicated `location-sitemap1.xml` and a `location_state-sitemap1.xml`
(https://fiveirongolf.com/sitemap.xml). No entry interstitial, no forced geo-gate.

**B. Location vs. booking.** Location is chosen **before or at** the booking click, and it rides along as a
**query parameter into one shared booking app**:
`https://booking.fiveirongolf.com/select-experience?location=minneapolis-north-loop&experience=simulator`.
Every CTA on the location page pre-binds the venue — "BOOK A SIM" (`&experience=simulator`),
"BOOK A LESSON" (`&experience=lesson`), "BOOK A FITTING" (`&experience=clubFitting`), and even the events
form: "PLAN AN EVENT" → `/events-inquiry?location_id=30343`. The neutral `/book-now` page is itself a
chooser — h1 "Plan Your Visit", h2 "Book Now" — described by the agent scan as a three-step strip
"CHOOSE A LOCATION → SCHEDULE A DAY & TIME → SWING AWAY!". Homepage h2s are **experience-first**:
"Book Your Visit / Book A Bay / Take A Lesson / Plan A Party / Join A League / Become A Member /
Play A Tournament" — pick the *thing*, then the *place*.

**C. Differing rates/hours/leagues.** Shared national topic page + per-location detail. `/leagues` is one
page carrying the format and a range, with a "Select a Location" control and hand-written exceptions
("Entry price varies by location"). Hours, local coaches, local reviews ("FIVE IRON GOLF MINNEAPOLIS
REVIEWS"), parking ("FREE PARKING", "728 N 3RD ST."), the address
("729 N WASHINGTON AVE. SUITE D, MINNEAPOLIS, MN 55401") and local promos ("SEE PROMOS" → `/promos`) all
live on the location page.

**Hero:** location-neutral. **Schema:** **none** — I found zero `application/ld+json` blocks on
`/locations/minneapolis-north-loop`. Forty locations, no LocalBusiness markup. A beatable gap.

## 2.2 X-Golf — 139 locations, 6 in Minnesota
https://playxgolf.com (`xgolfamerica.com` and `xgolfminnesota.com` both 301 here)

**A.** One site with a **sticky "home location"** held client-side. Nav label **"Locations"**. Above the
nav on every page sits a persistent location chip (`wds-booking-widget`) whose dropdown renders the
*currently selected* venue's name, address, city/state/zip, phone and email from
`data-my-xgolf-location-*` attributes, with the links **"Map & Directions"**, **"More info"**,
**"Switch locations"** (→ `/locations/#all-locations`), a button **"Find an X-Golf near me"**, and a
location-bound **"Book Now"**. That button opens `#modal-locator`, a dialog titled
**"Find Nearby X-Golf Locations"** whose body reads "Getting your location…" — geolocation is *offered
behind a click*, never forced as an entry gate. Location pages: `/locations/champlin/`, `/locations/woodbury/`.
The location page offers **"Make This Your Home X-Golf"** and then shows a **"Your X-Golf"** badge.

**B.** Location strictly first. The chrome's "Book Now" is literally `href="#"` until JS resolves the
stored location — **with no location set, the primary CTA goes nowhere.** Booking vendor varies by
franchisee: Champlin → `https://xgolfchamplin.as.me/` (**Acuity**), plus `x-golf-champlin.square.site`
and `x-golf-apple-valley.square.site` (**Square**).

**C.** Devolved to the location page — each franchise runs its own promos. `/leagues/` is one shared
national page for the X-League format, gated by a **"Your X-Golf Location:"** selector with "Go to",
"See all X-Golf Locations" and "Find X-Golf Locations near me", plus the line "Find league details,
schedules, and availability at your local X-Golf."

**Hero:** location-neutral — "The Home of Indoor Golf ™". **Schema:** Yoast `@graph` with `WebPage`,
`BreadcrumbList`, `Organization`, `WebSite` — **no per-location `LocalBusiness`**.

## 2.3 Mulligan's Indoor Golf — Plymouth + Eagan, MN. **Two locations. Closest analogue.**
https://mulligansindoor.com (Squarespace)

**A.** **No location pages and no "Locations" nav item.** Nav: `RATES / MEMBERSHIPS / LEAGUES / COURSES /
LESSONS / FITTINGS / CONTACT / BOOK A TEE TIME`. Both cities are stuffed into every slug instead —
`/rates-indoor-golf-simulators-in-plymouth-eagan-minnesota-mn`,
`/indoor-golf-simulator-leagues-in-plymouth-eagan-minnesota-mn`,
`/contact-us-plymouth-eagan-mn-indoor-golf-simulators` (verified in
https://mulligansindoor.com/sitemap.xml). Behind that sits a large local-SEO blog farm — one post per
suburb: `/news/lakeville-indoor-simulator-golf`, `/news/burnsville-indoor-simulator-golf`,
`/news/eagan-indoor-simulator-golf`, `/news/minneapolis-indoor-simulator-golf` and ~20 more. **Worth
noting: they already target "Lakeville."**

**B.** Location chosen **at the button** — two parallel homepage CTAs, **"BOOK A TEE TIME PLYMOUTH"** →
`https://clients.uschedule.com/mulligansindoor/booking?filter=loc[2715]` and
**"BOOK A TEE TIME EAGAN"** → `…?filter=loc[13619]`. Vendor: **uSchedule**, one location filter per venue.
**Footgun:** the global header CTA "BOOK A TEE TIME" is hardcoded to `loc[2715]` (Plymouth) on every page —
an Eagan customer using the nav lands on the wrong venue's calendar.

**C.** One shared page per topic with per-location caveats in prose. A single tier table
(STANDARD $25 / PEAK $35 / PRIME $45), then: "Plymouth: our regular bays feature Uneekor QED technology /
Eagan: our regular bays feature Uneekor EyeXO technology", and "Bay 7 ($10/hour upcharge) — Plymouth: our
Premium bay… Eagan: our Private Room, with sofas…". Leagues tagged inline: "Location: Plymouth & Eagan".

**Hero:** neutral but names both cities. **Schema:** `LocalBusiness` carries **only** Plymouth
(3905 Annapolis Lane North, Plymouth, MN 55447) and one `openingHours` string. **Eagan has no schema at all.**

## 2.4 BirdieBay — Tulsa, OK + Hudson Oaks, TX. **Two locations.**
https://birdiebay.com

**A.** No "Locations" nav item. The choice is a homepage anchor section `/#visit` — heading
**"Come see us!"** over a tab strip (`role="tablist" aria-label="Choose a location"`) with
**"● Tulsa, OK"** / **"● Hudson Oaks, TX"**. Location URLs exist (`/bb_location/tulsa-ok/`,
`/bb_location/hudson-oaks-tx/`) but are WordPress taxonomy archives (`<title>Tulsa, OK Archives - BirdieBay`),
unlinked from the nav and useless as landing pages.

**B.** One **shared** booking entry — "Book a Bay" → `https://www.golfoclock.com/landing-pages/birdie-bay`
(**Golf O'Clock**), a single landing page serving both venues; location is resolved downstream.

**C.** **Rows labelled by city** rather than pages toggled — `/leagues/` reads
"Tulsa - Tuesday Night League Portal", "Tulsa - Wednesday Night League Portal",
"Hudson Oaks - Tuesday Night League". Homepage event cards carry a per-event city chip. Hours are a single
global nav badge — "OPEN · 10A TIL 10P" with `data-tz="America/Chicago"` — which only survives because both
venues share hours *and* a timezone. **Schema:** `CollectionPage` + `BreadcrumbList` only, no LocalBusiness.

## 2.5 Golf Lounge 18 — 11 locations, CT / MA / NY
https://golflounge18.com

**A.** **The location list *is* the booking page.** No "Locations" nav item; the nav label is
**"Book a Tee Time"** → https://golflounge18.com/book/, section heading **"SELECT A LOCATION"**, one
"Reserve A Bay" button per city. URL pattern is inconsistent and clearly accreted —
`/book/fairfield/`, `/book/canton/`, `/book/orange/` alongside `/book/sw-reservations/`,
`/book/stamford-reservations/`, `/book/dedham-reservations/`.

**B.** Location strictly first — the per-location page *is* the reservation page. Engine is client-side;
vendor `[unverified]`.

**C.** **Fully duplicated per-location pages**, each with its own tiers (Fairfield: "Early bird $40 /
Per hour Per bay", "Special off-peak $55", "peak $70", plus "Playing costs are per bay (not per player)").
The cost of that duplication shows up as a hand-written global banner on `/book/`: "Due to incoming storm
conditions, all CT & NY locations will be closed for the entire day tomorrow. All MA locations will close
at 1:00 PM…" — because there is no single place to change hours.

**Schema:** `SportsActivityLocation`, but a **single brand-level node** (`@id: …/#organization`) with one
`telephone` and one `openingHours` set, repeated verbatim across all eleven location pages. Actively wrong.

## 2.6 Fore INDR GLF — Stevens Point + Wisconsin Rapids, WI. **Two locations.**
https://www.foreindrglf.com (Squarespace)

**A.** No location pages, no "Locations" nav. The venue split is encoded *into a nav label*:
`Home / Sim Rates / "Membership - Point/Rapids" / GLF Leagues / Instruction / Contact`.

**B.** Two parallel above-the-fold buttons: **"Book Tee Time - Point Location"** →
`https://player.eagleclubsystems.online#/tee-slot?dbname=foreindr20221101` and
**"Book Tee Time - Rapids Location"** → `…?dbname=foreindrrapids20241201` — **Eagle Club Systems**, a
separate database per venue.

**C.** One shared page per topic with the venue in the heading — the rates page is headed
**"Summer Season Rates - Point Only"**, i.e. the second venue simply disappears off-season. Leagues name
the venue per row: "Spring 2025 Flex League — Rapids & Point Combined", "Spring 2025 Scramble Night
League - Point". Footer address is Stevens Point only. **Schema: `[unverified]`.**

## 2.7 What recurs

| Pattern | Who | Verdict for a 2-site operator |
|---|---|---|
| Entry interstitial / forced location gate | **Nobody** | Don't. Zero of seven use one. |
| Separate domain or subdomain per venue | **Nobody** | Don't. |
| Location-neutral homepage hero | **All seven** | Do. |
| Nav item literally labelled "Locations" | Five Iron, X-Golf (the two largest) | Do — the small operators skip it and all suffer for it |
| `/locations/<city>/` as a real content type | Five Iron, X-Golf | Do |
| Persistent location chip + "Switch locations" | X-Golf only | Optional at n=2; the state machine costs more than it returns |
| Two explicit parallel booking CTAs | Mulligan's, Fore INDR GLF, **The Links today** | Do — unambiguous, no state required |
| Location as a query param into ONE booking app | Five Iron (`?location=…`), Mulligan's (`?filter=loc[…]`) | Do if the vendor supports it |
| City label on each row (leagues, events) | BirdieBay | Do |
| Fully duplicated per-location topic pages | Golf Lounge 18 | **Don't** — forces hand-written cross-venue exception banners |
| Per-venue `LocalBusiness` JSON-LD | **Nobody did this correctly** | **Do — this is free competitive ground** |

Two failure modes recur and must be designed against explicitly:

1. **The global nav CTA silently favours one venue.** Mulligan's header "BOOK A TEE TIME" is hardcoded to
   Plymouth on every page. X-Golf's is `href="#"` until JS resolves. The Links today routes it through a
   two-step interstitial instead — safer, but slow.
2. **Structured data collapses to one venue.** Mulligan's `LocalBusiness` is Plymouth-only; Golf Lounge 18
   stamps one phone number and one hours block across eleven cities; Five Iron, X-Golf and BirdieBay emit
   no `LocalBusiness` at all. **Not one of the seven ships correct per-location markup.**

---

# RECOMMENDATION — location architecture for The Links

## The shape

**One site, one domain, two first-class location pages, a location-neutral homepage, and location chosen
at the booking boundary via two explicit labelled CTAs.**

```
/                         location-neutral hero + Play/Compete/Celebrate split (steal from OTG)
                          → a "Two locations" band naming both, each with hours + a direct Book button
/locations/lakeville      ← real page: address, hours, phone, bays/tech, local leagues,
/locations/stillwater        local photos, local reviews, parking, per-venue LocalBusiness JSON-LD,
                             and a Book CTA bound to THAT venue
/rates                    one page, one price table, a column per venue for hours + any deltas
/leagues                  one page, every row prefixed "Lakeville —" / "Stillwater —"
/memberships              one page; state plainly whether membership is valid at both venues
/events (or /celebrate)   one page, packages public; inquiry form has a required Location field
/instruction /food /about /contact   shared
```

Nav: **Play ▾ · Compete ▾ · Experience ▾ · Locations · About ▾** + a persistent **Book a Bay** button.
Take On The Green's verb-based folders wholesale and add **Locations** as a fifth peer item — the two
biggest peers (Five Iron, X-Golf) both have it and every small operator that skipped it ended up with the
location buried in a homepage anchor or a slug.

## The booking CTA — the one decision that matters

The header button must **never** silently pick a venue (Mulligan's bug) and must **never** be dead until JS
resolves (X-Golf bug). Two acceptable resolutions, in preference order:

1. **Best — if the booking vendor accepts a location parameter:** header "Book a Bay" opens a lightweight
   two-option chooser (a dropdown or a small sheet, *not* a page load) reading **"Book at Lakeville"** /
   **"Book at Stillwater"**, each going straight into the calendar with the venue pre-selected. One click to
   choose, one to land. This is Five Iron's `?location=<slug>` model at n=2.
2. **Acceptable — parallel CTAs everywhere:** every booking button on the site is already two buttons,
   labelled by city (Mulligan's / Fore model, and what The Links does today at `/bookinglanding`). Zero
   ambiguity, zero state, but it doubles every CTA.

**Either way, kill one of the two interstitials.** Today it is `BOOK NOW! → /bookinglanding → /booking →
ACKNOWLEDGE AND GO TO BOOKING → Whoosh` — three clicks and two page loads before a calendar. The
credit-card and cancellation terms currently on that middle page belong either on the location page or
inside the Whoosh flow, not as a wall in front of it.

On the location pages, bind every CTA to that venue — booking, lessons, and the events inquiry
(`?location=stillwater`), exactly as Five Iron does with `?location=minneapolis-north-loop` and
`/events-inquiry?location_id=30343`.

## Rates, hours, leagues when they differ

**One page per topic, never two.** The Links' current `/rates` already does this right: one shared
"$35/Hour", then two labelled hours columns. Preserve that and extend it:

- **Hours:** one table, a column per venue. Publish hours in exactly **one** place and reference it
  everywhere else. On The Green publishes hours in three places and they now contradict each other —
  and it only has one location. With two, three copies becomes six.
- **Rates:** one price table. If pricing is identical, say so explicitly ("Same rates at both locations").
  Where it differs, add a venue column — or, if it's a one-off, a labelled note in the same card
  (Mulligan's "Plymouth: … / Eagan: …" model). Steal On The Green's price-card-with-eligibility-window
  pattern for peak/off-peak.
- **Leagues:** one page, every row prefixed with the venue — "**Stillwater —** Tuesday Night League",
  "**Lakeville —** Flex League" (BirdieBay's pattern). And put the league table **in HTML on the page**;
  do not do what both On The Green and lakevillelinks.com currently do and hand the entire offer to
  `ply.golf`, which renders client-side and is invisible to search.
- **Seasonal:** handle summer/winter as **state on one page**, not as parallel URLs. On The Green's
  `/rates` + `/rates-summer` split is the exact trap — duplicate titles, contradictory hours, and the
  off-season one orphaned from the nav. Two locations × two seasons = four pages if you make this mistake.

## Schema — the free win

**Ship a distinct `LocalBusiness` (or `SportsActivityLocation`) JSON-LD node per location page**, each with
a real `PostalAddress`, `geo`, `telephone`, `openingHoursSpecification`, `priceRange`, `sameAs`, and an
`@id` unique to that venue — plus an `Organization` node with both as `department`/`location`. **Not one of
the seven operators does this correctly**, and On The Green ships `"address": ""` / `"openingHours": ""`.
For two suburban Twin Cities venues competing on "indoor golf near me", this is the cheapest available
advantage. Add `FAQPage` on the events page and `Event` on leagues/camps while you're in there.

## Tradeoffs, stated plainly

| Choice | Cost | Why it still wins |
|---|---|---|
| One site over two | Lakeville and Stillwater lose independent brand identity; `lakevillelinks.com` equity must be 301'd | Two sites means two of everything forever — two menus, two rate updates, two schema blocks, two SEO efforts. The current split already produced "Stillwater Landing — Lakeville Links Premier Indoor Golf" in a `<title>`. |
| Shared topic pages over per-location duplicates | Any genuine per-venue difference needs a column or a label, which is fiddly | GL18's eleven duplicated pages forced a hand-written storm banner because there was no single place to change hours. Shared pages fail loudly; duplicated pages fail silently. |
| No sticky location state | A returning Stillwater regular re-picks each visit | At n=2 the pick is trivial and always visible. X-Golf's stored-location machinery is what makes their primary CTA `href="#"`. Revisit if a third location opens. |
| Location chooser instead of a single Book button | One extra interaction | It is one *interaction*, replacing today's two page loads — and it removes the possibility of routing an Eagan-equivalent customer to the wrong calendar. |
| Real `/locations/<city>` pages | Two more pages to maintain | They are the highest-intent local-SEO assets on the site and the only correct home for per-venue hours, reviews, parking and schema. |

## Do not repeat, from the current site

Rename or neutralise the domain/brand so one venue does not own every `<title>`; retire the stale
"March Promotion Details" still live in August; give Stillwater its own phone number on its own page;
fill in "Leagues & Contests (Coming Soon)" or remove the dead link; and consolidate Whoosh + Fareway Golf
+ Square down toward as few vendors as the operation can tolerate — every extra vendor is another account
system the customer is bounced into at the moment of commitment.

