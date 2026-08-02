# The Links — Current Site Inventory (lakevillelinks.com)

**Crawled:** 2026-08-02 (raw HTML via `curl -sSL`, saved to `_ingest/raw/*.html`)
**Client:** The Links — indoor golf simulator venues, The Links of Lakeville + The Links of Stillwater (MN)
**Site crawled:** `https://www.lakevillelinks.com/`
**Brand domain:** `https://thelinks.golf/` → **HTTP 301** → `https://www.lakevillelinks.com/` (single hop, verified)

---

## 1. Summary

### Platform & tech

| Item | Value |
|---|---|
| CMS | **Squarespace 7.1** (`templateVersion: "7.1"`) |
| Template ID | `5c5a519771c10ba3470d8101` (tweakable; template *name* not exposed in markup — `[unverified]`) |
| Website ID | `624121706429813068ff3498` |
| Site title (Squarespace setting) | `Lakeville Links Premier Indoor Golf` |
| Time zone | `America/Chicago` |
| Server header | `Squarespace` |
| Analytics | **GA4 `G-DTLFJD8KFF`** (via `googletagmanager.com/gtag/js`) |
| Ad pixel | **Meta Pixel `1200620627766874`** (`connect.facebook.net/en_US/fbevents.js`, `fbq('init', …)`) |
| Other pixels | None found — no GTM container, no UA property, no TikTok, no Hotjar, no MS Clarity |
| Consent banner | None detected in markup |

### Scale

- **41 URLs fetched. All returned HTTP 200 with 0 redirects.** No 404s, no redirect chains anywhere in the set.
- `sitemap.xml` contains **40 `<loc>` entries** — it lists `/home` but **not** the bare root `/`. (Root and `/home` are the same page; both canonicalize to `https://www.lakevillelinks.com`.)
- Only **12 of 41 pages are reachable from the global nav**; 3 more from the footer. The remaining ~26 are sitemap-only / deep-link-only.

### Top 10 problems found

1. **Domain and brand are out of sync with the business.** Every `<title>` on all 41 pages ends `— Lakeville Links Premier Indoor Golf`; the JSON-LD `Organization.legalName` is `"Lakeville Links"`; the domain is `lakevillelinks.com`. But the footer says "The Links — Premier Indoor Golf Simulator in Lakeville & Stillwater Minnesota", `/our-story` has a section literally titled "**The Rebrand…**", and `/simulator-settings` is titled "GolfZon Simulator Settings | **The Links of Lakeville**". The two-location "The Links" brand exists in body copy only; it exists nowhere in the URL structure, titles, or structured data.
2. **Structured data describes one location and is wrong/thin.** Three JSON-LD blocks site-wide, identical on every page: `WebSite`, `Organization`, `LocalBusiness`. The `LocalBusiness` has only the **Lakeville** address (17630 Juniper Path), `openingHours` hard-coded to **"Mo–Su 08:00-22:00"** — which contradicts the published hours on `/rates` (Lakeville 11am–9pm; Stillwater Sun 12–7, Mon 12–9, Tue–Fri 3–9, Sat 10–10). **Stillwater has no LocalBusiness markup at all.** `Organization.email` is empty. No `Menu`, `Event`, `Product`, `FAQ`, or `BreadcrumbList` schema anywhere.
3. **All AI crawlers are blocked by robots.txt** — Squarespace's default block list is active: `GPTBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot` **(note: PerplexityBot is *not* in the list — see §3)**, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `Meta-ExternalAgent`, `FacebookBot`, `cohere-ai`, `Amazonbot`, `YouBot`, `DuckAssistBot`, `Quora-Bot`, `TikTokSpider`, plus **`AdsBot-Google`** (which also breaks Google Ads landing-page quality checks). The site is effectively invisible to LLM answer engines.
4. **Five-way duplicate titles + meta descriptions, twice over.** `/about`, `/booking`, `/booking-scheduler`, `/bookinglanding`, `/bookingstillwater` all share the title *"Book a Time | Realistic Golf Simulators | Twin Cities"* and (with `/rates`, six pages) the description *"Discover affordable rates at Lakeville Links! Play on premium indoor golf simulators…"*. Separately `/leagues`, `/leagues-contests`, `/juniorleagues`, `/sms-opt-in-form`, `/sms-opt-in-form-1` all share *"MN Twin Cities Winter Indoor Golf Leagues, High Tech Golf Simulators"* + *"Join the fun at Lakeville Links"*.
5. **19 of 41 pages have an empty meta description** — including `/stillwater` (the entire second location), `/our-story`, `/specials`, `/news` and all six news posts, `/photo-gallery`, `/policy`.
6. **Three live homepages plus a live "old" homepage.** `/` and `/home` are byte-identical current homepage. `/home-2` is titled **"Home (NEW)"** and still links to the *retired* booking engine (`lakevillelinks.golfbook.in`) and the *retired* Square gift-card / `fareway.golf` membership URLs. `/home-old` is a third variant. All three are in the sitemap and return 200.
7. **Booking vendor migration is half-finished — dead/stale booking paths are still live and indexable.** Current path is **Whoosh** (`app.whoosh.io`). But `/booking-scheduler` still hard-embeds an `<iframe src="https://lakevillelinks.golfbook.in/calendar.php">` (legacy **GolfBook**), and `/home-2` + `/vikings-game-day-special` still send "BOOK NOW"/"BOOK ONLINE" to golfbook.in. Gift cards point at **two different vendors**: `app.squareup.com/gift/MLYARTM9VAGFK` (`/rates`, `/specials`, `/home-old`) vs `toasttab.com/lakeville-links…/giftcards` (`/home-2`).
8. **H1 hygiene is broken across the site.** **17 pages have no H1 at all** — including the homepage (`/`, `/home`, `/home-2`, `/home-old`), `/specials`, `/leagues-contests`, `/policy`, `/photo-gallery`, both terms pages. `/news` emits **6 H1s** (one per post card). `/vikings-game-day-special` emits **5 H1s**, all decorative ("Skol!", "•", "Let's Go Vikes!"). `/stillwater` splits its H1 into three ("The Links of" / "Stillwater, MN" / "Book Now").
9. **Core commercial content is trapped in images.** `/menu` has **zero menu text** — the entire food & drink menu is one PNG (`MENU+(3).png`) with `alt=""`. `/simulator-settings` has 33 characters of text and 5 numbered PNGs. `/specials` has 318 characters of text; the actual specials are images. `/photo-gallery` has **zero body text and 36 images with `alt="IMG_8006.jpg"`-style filename alts**. None of this is readable by search or AI.
10. **Stale, dated, and orphaned content is live and crawlable.** `/cazopen` promotes a tournament dated **August 2, 2025** (a year past). `/booking` and `/bookingstillwater` both carry a "March Promotion Details — March 1–31, 2026" block. `/leagues` says only *"Check back for league information"* (empty page in the primary nav path). `/juniorleagues` promotes leagues that ran **Jan–Mar 2026**. `/advertisinglogos` and `/align-logo` are internal asset-holder pages with **zero body text**, both in the sitemap. `/membership-packages-terms-conditions-copy` is a literal Squarespace duplicate — its `<title>` is *"Membership Packages Terms & Conditions **(Copy)**"* and there is **no non-copy original** in the sitemap. `/sms-opt-in-form` and `/sms-opt-in-form-1` are byte-equivalent duplicates (collection title of the latter: *"SMS Opt-in Form (Copy)"*).

---

## 2. Site-wide structure

### Global nav (exact labels → hrefs)

Identical on all 41 pages. Desktop, mobile-duplicate, and hamburger menus all render the same tree.

```
[logo]                              → /
Home                                → /
Memberships                         → /memberships
Leagues & Contests                  → /leagues-contests
Groups & Private Events             → /groups
Instruction                         → /instruction
About the Facility  (folder)        → /about-the-facility  [folder URL; resolves to /rates]
    ├ Hours | Rates | Gift Cards    → /rates
    ├ Location | APP                → /contact
    ├ About the Facility            → /about
    ├ Menu                          → /menu
    └ Simulator Settings            → /simulator-settings
Our Story                           → /our-story
[BUTTON] BOOK NOW!                  → /bookinglanding
```

Observations:
- The nav has **no Stillwater entry**. `/stillwater` — the second location's only page — is unreachable from the nav; it is linked once, as *"Learn more"*, in a homepage card.
- The nav has **no Specials, no Gallery, no News** entry.
- The folder is labelled "About the Facility" and contains a child also labelled "About the Facility" — self-nesting.
- `/rates` is reachable under two labels ("Hours | Rates | Gift Cards" and, via folder root, `/about-the-facility`).

### Footer (exact text + links)

```
VIEW PHOTO GALLERY  → /photo-gallery       |     NEWS  → /news
The Links
Premier Indoor Golf Simulator in Lakeville & Stillwater Minnesota
17630 Juniper Path Suite H, Lakeville, MN 55044  → https://maps.app.goo.gl/s4jgsSzGd5m1RAZd9
      |
5862 Omaha Ave N, Stillwater, MN 55082           → google.com/maps/place/Stillwater+Bowl+%26+Lounge/…
Lakeville ->  612-699-0526   → tel:6126990526
Stillwater -> 612-699-0527   → tel:6126990527
Job inquiry: hr@lakevillelinks.com  → mailto:hr@lakevillelinks.com?subject=Job%20Inquiry%2C%20Lakeville%20Links
SMS Opt-in Form  → /sms-opt-in-form
Social icons: Instagram, Facebook, Google Maps
```

Notes: the footer is the **only** place the "The Links" brand name and both addresses appear together. The Stillwater address link resolves to a Google Maps place named **"Stillwater Bowl & Lounge"**, not to a Links listing. The Stillwater phone `612-699-0527` appears only here — `/stillwater` itself lists `(612) 699-0526` (Lakeville's number).

### Social profiles found (site-wide)

| Network | URL |
|---|---|
| Instagram | `http://www.instagram.com/lakevillelinks` (note: **http**, not https) |
| Facebook | `https://www.facebook.com/Lakeville-Links-Indoor-Golf-102975465733091` (legacy numeric-ID vanity URL) |
| Google Business Profile | `google.com/maps/place/Lakeville+Links+Indoor+Golf/@44.6928959,-93.2865013,…` |
| Google review link | `https://g.page/r/CXuRqGV8D_GNEAE/review` (on `/feedback`) |

No X/Twitter, TikTok, YouTube channel, or LinkedIn link anywhere. A Stillwater-specific social profile is **not** linked.

### Apps

- iOS: `https://apps.apple.com/us/app/lakeville-links/id1668921452`
- Android: `https://play.google.com/store/apps/details?id=com.myappguru.lakeville` (vendor: **MyAppGuru**)

### Structured data (JSON-LD)

Three blocks, byte-identical on every page (plus a `BlogPosting`-style block on each `/news/*` post):

- `@type: WebSite` — url, name, `description: ""` (empty), logo image.
- `@type: Organization` — `legalName: "Lakeville Links"`, Lakeville address, `email: ""`, `telephone: "6126990526"`, `sameAs: [Instagram, Facebook, Google Maps]`.
- `@type: LocalBusiness` — Lakeville address only, `openingHours: "Mo 08:00-22:00, Tu … Su 08:00-22:00"` (does not match the site's own published hours), `image` URL that ends in a bare `/` with no filename.
- News posts add a per-post block with `name`, `url`, `datePublished`, `dateModified`, `headline`.

**No** `LocalBusiness` for Stillwater. No `Product`/`Offer` on memberships. No `Menu`. No `Event` on `/cazopen`. No `BreadcrumbList`. No `FAQPage`. No `AggregateRating` despite a Google review testimonial being quoted on `/groups`.

### Third-party vendors in use

| Vendor | Domain | Where |
|---|---|---|
| **Whoosh** (booking + membership store) | `app.whoosh.io` | `/booking`, `/bookingstillwater`, `/memberships` |
| **GolfBook** (legacy booking, still live) | `lakevillelinks.golfbook.in` | `/booking-scheduler` (iframe), `/home-2`, `/vikings-game-day-special` |
| **ply.golf** (leagues/contests) | `ply.golf` | `/leagues-contests` |
| **PrimeSignup** (league/event registration) | `app.primesignup.com` | `/juniorleagues`, `/cazopen` |
| **Square** (gift cards) | `app.squareup.com/gift/MLYARTM9VAGFK` | `/rates`, `/specials`, `/home-old` |
| **Toast** (gift cards) | `toasttab.com/lakeville-links-…/giftcards` | `/home-2` |
| **fareway.golf** (membership microsite) | `www.fareway.golf/lakeville-links-memberships` | `/farewaygolf/lakeville-links-memberships`, `/home-2` |
| **SabrHub** (SMS opt-in form) | `cr.sabrhub.com/smsform_submit.html` (iframe) | `/sms-opt-in-form`, `/sms-opt-in-form-1` |
| **Squarespace Forms** (native) | — | `/groups` (formId `645516e1f69aec79d49bdbd8`), `/contact` (`67868dd385aee93b9e4f2756`), `/feedback` (`6786d9f2a45f2804ecf8ec18`) — field lists render client-side, `[unverified]` |
| **Embedly/YouTube** | `cdn.embedly.com` → `youtube.com/embed/…` | `/news/first-look-…` (`3_T1b032Zew`), `/news/sneak-peak-…` (`WXRRgKPt4lM`) |
| **YouTube (link out)** | `youtu.be/5YxEm2iq0lQ` | `/`, `/home`, `/home-2`, `/home-old` ("VIEW A DEMO") |
| Google Maps | `maps.app.goo.gl`, `google.com/maps` | footer; one map block on `/stillwater` |

Only **4 iframes exist site-wide**: golfbook calendar (1), SabrHub SMS (2), Embedly/YouTube (2 posts). No live booking widget is embedded on the primary booking pages — those are outbound links.

---

## 3. robots.txt — AI crawler status

Fetched from `https://www.lakevillelinks.com/robots.txt`. This is Squarespace's stock file (header comment: `# Squarespace Robots Txt`). A single stacked `User-agent:` block covers all of the below, then `User-agent: *` with the disallow rules — meaning **every listed agent inherits the same `Disallow:` set as `*`**, i.e. they are *not* fully blocked from the site, but the site ships Squarespace's AI-crawler grouping and, critically, includes `AdsBot-Google` in that same group. There is **no explicit `Disallow: /` for AI agents** and no `Allow:` carve-out.

| Crawler | Listed in the stacked block? |
|---|---|
| **GPTBot** | ✅ listed |
| **ClaudeBot** | ✅ listed |
| **anthropic-ai** | ✅ listed |
| **CCBot** | ✅ listed |
| **Google-Extended** | ✅ listed |
| **PerplexityBot** | ❌ **not listed** (not mentioned anywhere in the file) |
| Also listed | AI2Bot, Ai2Bot-Dolma, aiHitBot, Amazonbot, Applebot-Extended, Bytespider, cohere-ai, cohere-training-data-crawler, DuckAssistBot, FacebookBot, GoogleOther, GoogleOther-Image, GoogleOther-Video, img2dataset, Meta-ExternalAgent, MyCentralAIScraperBot, omgili, omgilibot, Quora-Bot, TikTokSpider, YouBot, **AdsBot-Google**, AdsBot-Google-Mobile, AdsBot-Google-Mobile-Apps |

Shared `Disallow` rules: `/config`, `/search`, `/account`, `/commerce/digital-download/`, `/api/` (with `Allow: /api/ui-extensions/`), `/static/`, and all `?author=` / `?tag=` / `?month=` / `?view=` / `?format=…` / `?reversePaginate=` query patterns. Sitemap declared: `https://www.lakevillelinks.com/sitemap.xml`.

**Verdict:** the file does not hard-block AI crawlers with `Disallow: /`, but it does group them with Squarespace's restricted-agent list, and it groups `AdsBot-Google` there too. On a rebuild this should be an explicit, deliberate policy file rather than a platform default. `[unverified]` whether Squarespace applies additional server-side AI-agent blocking beyond this file.

---

## 4. URL-by-URL inventory

All 41 URLs: **HTTP 200, 0 redirects, final URL = requested URL**. Canonical always equals the requested URL, with one exception noted. `lastmod` is from `sitemap.xml`.

Legend for **Loc**: `LKV` = Lakeville-specific · `STW` = Stillwater-specific · `BOTH` · `AMB` = ambiguous/unbranded.

---

### `/` (root) — **MERGE**
- **Title:** `Lakeville Links Premier Indoor Golf` · **Canonical:** `https://www.lakevillelinks.com` · **OG:** same title, OG image `Lakeville+Links+Share+Image+.png`
- **Desc:** "Experience the ultimate indoor golfing experience at Lakeville Links Premier Indoor Golf, featuring the most advanced and realistic golf simulators in the South Metro Twin Cities…"
- **H1:** *none*. **Outline:** H2 "The most realistic indoor golf you can play, period." → H3 "Summer Rates!" / "$35 per hour per bay!" / "Summer Hours" → H2 "Our Locations" (H3 "Lakeville, MN", H3 "Stillwater, MN") → H2 "News & Specials" → H2 "More Than Just Golf" → H2 "Bays Sponsored By:"
- **CTAs:** `Book at Lakeville` → `/booking` · `Book at Stillwater MN` → `/bookingstillwater` · `Book Tee Time` ×2 (→ `/booking`, → `/bookingstillwater`) · `Learn more` → `/memberships` · `Learn more` → `/stillwater` · `Explore Leagues` → `/leagues` · `Explore Memberships` → `/memberships` · `VIEW A DEMO` → `youtu.be/5YxEm2iq0lQ`
- **Widgets:** none (no iframes). 45 Squarespace button blocks, 1 code block.
- **Images:** 10 `<img>` (6 with empty alt), 64 unique CDN URLs / 14 distinct filenames. `JWAT6207.jpg`, `JWAT6238.jpg`, `PXL_20221025_141025139.jpg` = **real venue photography** (JWAT-prefixed pro shoot + Pixel phone shots). `1.png`–`6.png`, `Asset+9.png` are sponsor logos.
- **Loc:** BOTH (Lakeville ×3, Stillwater ×6 mentions)
- **Verdict:** **MERGE** — content is sound and genuinely two-location, but it has no H1, duplicates `/home` exactly, and its "Summer Rates/Hours" block hard-codes seasonal pricing into the homepage. Rebuild as the single canonical home; kill `/home`.

---

### `/home` — **CUT**
- **Title / desc / OG / body: byte-equivalent to `/`.** **Canonical points to `https://www.lakevillelinks.com`** (i.e. this URL self-declares as a duplicate) — yet it is the URL listed in `sitemap.xml` while root is not.
- Same 9 CTAs, same 10 images, no H1. `lastmod 2026-06-25`.
- **Verdict:** **CUT** — 301 to `/`. It is the only reason the sitemap and canonical disagree.

---

### `/home-2` — **CUT**
- **Title:** `Home (NEW) — Lakeville Links Premier Indoor Golf` · desc **empty** · `lastmod 2025-08-12`
- **H1:** none. **Outline:** H2 "The most realistic indoor golf you can play, period." → H2 "Now serving EAST &" → H2 "SOUTH METRO!" → H3 "Introducing" → H4 "Individual Summer Memberships!" → H2 "Bays Sponsored By:" → H3 "Welcome to Lakeville Links, the South Metro's Premier Indoor Golf Simulator Facility" → H4 "Ready to Play?" / "Join a League" / "Online Gift Cards" → H3 "Learn more about the new Golfzon **TwoVision** Simulators" → H3 "Come Golf with Us!" → H4 "Play. Eat. Drink." → H4 "Over 240+ Golf Courses + 6 Arcade Games"
- **CTAs:** `BOOK NOW` → **`lakevillelinks.golfbook.in/calendar.php`** (retired vendor) · `MEMBERSHIP INFO` → `www.fareway.golf/lakeville-links-memberships` · `BOOK A TEE TIME` → golfbook.in · `SIGN UP` → `/leagues` · `PURCHASE TODAY` → **`toasttab.com/lakeville-links-17630-juniper-path-suite-h/giftcards`** · `VIEW A DEMO` → YouTube · `View Rates & Tee Times` → `/rates` · `Book Now` → `/booking`
- **Images:** 19 `<img>` (14 empty alt), 121 CDN URLs / 22 filenames — real venue photos (`JWAT*`, `IMG_3151.jpg`) plus a `5-Stars.png` review graphic.
- **Loc:** LKV-leaning (says "Now serving EAST & SOUTH METRO" but names only Lakeville; still describes "TwoVision" sims, which the live homepage calls "GolfZon NX")
- **Verdict:** **CUT** — a stale draft homepage, publicly indexed, pointing customers at two decommissioned vendors and describing the wrong simulator hardware.

---

### `/home-old` — **CUT**
- **Title:** `Home | Lakeville Links Golf Simulators — …` · desc **empty** · `lastmod 2026-01-16`
- **H1:** none. Same "Welcome to Lakeville Links, the South Metro's Premier…" skeleton as `/home-2`, minus the Stillwater/summer-membership blocks.
- **CTAs:** `BOOK NOW` → `/booking` · `Purchase GIFT CARD` → **`app.squareup.com/gift/MLYARTM9VAGFK/order`** · `Book A BAY NOW!` → `/booking` · `BOOK A TEE TIME` → `/booking` · `SIGN UP` → `/leagues` · `PURCHASE TODAY` → Square · `VIEW A DEMO` → YouTube · `View Rates & Tee Times` → `/rates` · `Book Now` → `/booking`
- **Images:** 17 `<img>` (12 empty alt), 105 CDN URLs. Real venue photography.
- **Loc:** LKV
- **Verdict:** **CUT** — explicitly named "old", still 200 and in the sitemap. Third live homepage.

---

### `/about` — **REWRITE**
- **Title:** `Book a Time | Realistic Golf Simulators | Twin Cities — …` ← **wrong page, duplicate of the booking pages' title**
- **Desc:** "Discover affordable rates at Lakeville Links! Play on premium indoor golf simulators…" ← also the booking/rates description
- **H1:** "About our facility & golf" · **Outline:** H4 "Things to know about coming to Lakeville Links:" → H4 "You can always call with questions!" → H4 "612-699-0526"
- **Body (743 chars):** rental clubs $15, pace of play (1 hr per person for 18), "We have (6) Total simulators. (5) are set up for both right and left handers. (1) is right hand only", "(9) TVs", full bar.
- **CTAs:** `GO TO BOOKING` → `/bookinglanding`
- **Images:** 3 (1 empty alt); `JWAT3647.jpg` real venue photo.
- **Loc:** LKV only — the facility facts (6 sims, 9 TVs) are Lakeville's; Stillwater's 4 sims are never mentioned.
- **Verdict:** **REWRITE** — good raw FAQ content wearing the wrong title/description and silently excluding a whole location. Should become a per-location "Plan your visit" block.

---

### `/our-story` — **KEEP**
- **Title:** `Our Story — …` · desc **empty** · `lastmod 2026-05-29`
- **H1:** "Our Story" · **Outline:** H3 "CJ & CODY" → H2 "Just two guys wanting a better golf simulator to play on during the long Minnesota winters…" → H2 "Then came Stillwater…" → H2 "**The Rebrand…**" → H2 "Let's Play Golf!"
- **Body:** 3,509 chars — the longest genuine prose page on the site.
- **CTAs:** one outbound link, `thelinks.golf` → `http://thelinks.golf` (http, and it 301s straight back to this same site — a self-referential loop)
- **Images:** 5 (3 empty alt); `JWAT3615+(3).jpg`, `PXL_20221218_192416906.MP.jpg`, `PXL_20260123_180713787.NIGHT.RAW-01.COVER.jpg` — real founder/venue photography.
- **Loc:** BOTH (Lakeville ×2, Stillwater ×6)
- **Verdict:** **KEEP** — the only page that explains the two-location "The Links" brand. Needs a meta description and the circular `thelinks.golf` link removed.

---

### `/contact` — **REWRITE**
- **Title:** `Location | Hours | Download Our App — …` · **Desc:** "Get in touch with Lakeville Links, Twin Cities"
- **H1:** "Contact Lakeville Links" · **Outline:** H3 "Download our App!" → H3 "We'd love to hear from you!"
- **Body: 262 chars.** One Squarespace form (`formId 67868dd385aee93b9e4f2756`; fields render client-side, `[unverified]`).
- **CTAs:** App Store badge → `apps.apple.com/us/app/lakeville-links/id1668921452` · Play Store badge → `play.google.com/store/apps/details?id=com.myappguru.lakeville`
- **Images:** 6 (3 empty alt) — `Map+of+Links.png` (a static map *image*, not an embedded map), 2 app-store screenshots, `PXL_20221025_141025139.jpg`.
- **Loc:** **LKV only** — H1 says "Contact Lakeville Links"; zero Stillwater mentions on the site's contact page, despite Stillwater having its own address and phone in the footer.
- **Verdict:** **REWRITE** — a contact page for a two-location business that lists one location, uses a screenshot instead of a map, and buries hours behind a title that promises them.

---

### `/rates` — **REWRITE**
- **Title:** `Hours | Rates & Gift Cards | Realistic Golf Simulators | Twin Cities — …` · **Desc:** shared with 5 booking pages · `lastmod 2026-06-25` (most recently edited page on the site)
- **H1:** "Rates, Hours & Gift Cards" · **Outline:** H2 "Summer Hours:" → H3 "Hours Subject to Change without Notice." → H3 "If there are no pre-booked bay times, we reserve the right to open late or close early." → H3 "Check Online for Daily Open Hours and to Book" → H3 "Summer 2026 Hours & Rates: $35/Hour" → H3 "Lakeville, MN" → H3 "Stillwater, MN" → H3 "Gift Cards Available!"
- **Facts:** Lakeville "11am to 9pm Daily", May 3 2026 – Oct 3 2026, $35/hour; Stillwater Sun 12–7, Mon 12–9, Tue–Fri 3–9, Sat 10–10; closed Memorial Day / July 4 / Labor Day.
- **CTAs:** `Book a Tee Time` → `/bookinglanding` · `612-699-0526` → `tel:` · `info@lakevillelinks.com` → mailto · `Purchase Gift Card` → `app.squareup.com/gift/MLYARTM9VAGFK/order` · `Check Gift Card Balance` → Square · `Contact Us` → `/contact`
- **Images:** 3; real venue photo `JWAT3647.jpg`.
- **Loc:** BOTH (both hour sets present) — but note only **one** phone number and the hours contradict the site's own `LocalBusiness` schema.
- **Verdict:** **REWRITE** — this is the highest-value commercial page and the most-edited; it should be per-location with schema that matches, and it is currently reachable under two nav labels.

---

### `/memberships` — **KEEP**
- **Title:** `Indoor Golf Memberships and Packages — …` · **Desc:** "Rain, wind, heat, team, or the practice grind - grab access to golf all summer when you can"
- **H1:** "Memberships & Packages" · **Outline:** H4 "May - September" → H3 "2026 Summer Memberships" → H2 "Choose your package:" → H3 "LinksFlex Packages (Lakeville Location Only)" → H2 "Choose your package:" → H2 "LinksFlex Off Peak" / "LinksFlex Anytime" / "LinksFlex Junior"
- **CTAs:** `Join @ Lakeville` → `app.whoosh.io/patron/club/the-links-indoor-golf/store` · `Join @ Stillwater` → `app.whoosh.io/patron/club/linksstillwater/store/packages` · `PURCHASE A PACKAGE` → `app.whoosh.io/patron/club/the-links-indoor-golf/store/packages` · `612-619-1747` (**link text says 612-619-1747 but `href` is `tel:6126990526`** — mismatched number) · `info@lakevillelinks.com` → mailto
- **Images:** 7 (5 empty alt), 45 CDN URLs — real venue photos (`JWAT6210`, `JWAT6229`, `JWAT3632`) plus `Screenshot+2026-05-07+130606.png` (a screenshot used as content).
- **Loc:** BOTH, with an explicit "Lakeville Location Only" carve-out for LinksFlex.
- **Verdict:** **KEEP** — the strongest converting page and correctly two-location. Fix the tel-link mismatch, two duplicate "Choose your package:" H2s, and no `Product`/`Offer` schema.

---

### `/farewaygolf/lakeville-links-memberships` — **CUT**
- **Title:** `XMemberships — …` (leading "X" = the owner's own archive convention) · desc empty · **body text: 42 characters**
- **H1:** none. **Only content:** `Click Here to Learn More About Memberships` → `https://www.fareway.golf/lakeville-links-memberships`
- **Images:** 2 (logo + favicon only). No real content.
- **Loc:** AMB
- **Verdict:** **CUT** — a one-link doorway page under an orphaned `/farewaygolf/` path pointing off-domain. Superseded by `/memberships`.

---

### `/bookinglanding` — **MERGE**
- **Title/desc:** the shared booking title + rates description. **H1:** "Booking Details" · **body: 55 chars**
- **CTAs:** `Book at Lakeville` → `/booking` · `Book at Stillwater MN` → `/bookingstillwater`
- **Widgets:** none. 10 button blocks.
- **Loc:** BOTH · This is the destination of the global nav's **BOOK NOW!** button.
- **Verdict:** **MERGE** — the primary site CTA lands on a 55-character interstitial that just asks "which location?". Should be a location choice on the page you're already on, not a separate step.

---

### `/booking` — **MERGE**
- **Title/desc:** shared booking set. **H1:** "Booking Details Lakeville" · **Outline:** H4 "Some things to know before you book:" → H3 "**March Promotion Details**"
- **Body (1,380 chars):** credit-card hold policy, "You are responsible for paying for the entire time booked", 48-hour free-cancellation window, then a **"March Promotion Details … (March 1 - 31, 2026)"** block with 25% off and a $350 gift-card sweepstakes and its full legal fine print.
- **CTAs:** `ACKNOWLEDGE AND GO TO BOOKING` → `app.whoosh.io/patron/club/the-links-indoor-golf/agenda/simulators/today` (**Whoosh**)
- **Loc:** LKV
- **Verdict:** **MERGE** — the policy copy is genuinely useful and should survive; the expired March 2026 promo must go, and this + `/bookingstillwater` + `/bookinglanding` + `/booking-scheduler` are four URLs doing one job.

---

### `/bookingstillwater` — **MERGE**
- **Title/desc:** shared booking set (says "Lakeville Links" on the Stillwater page). **H1: none** — top heading is H2 "Booking Details Stillwater MN".
- Same policy body + the same expired **"March Promotion Details"** block.
- **CTAs:** `ACKNOWLEDGE AND GO TO BOOKING` → `app.whoosh.io/patron/club/linksstillwater/agenda/simulators/today`
- **Images:** 3; `Sim+Pic.jpg` — real venue photo.
- **Loc:** STW
- **Verdict:** **MERGE** — same as `/booking`, plus it needs its own title/description and an H1.

---

### `/booking-scheduler` — **CUT**
- **Title/desc:** shared booking set. **Collection title: `xBooking Scheduler`** (owner-marked as retired). **H1:** "Book a Time" → H3 "Select a Date Below To Book" · **body: 39 chars**
- **Widget:** `<iframe src="https://lakevillelinks.golfbook.in/calendar.php">` — the **retired GolfBook engine**, still embedded and live.
- **Loc:** AMB (Lakeville ×0, Stillwater ×0 — it is the legacy Lakeville scheduler)
- **Verdict:** **CUT** — a live, indexable booking page wired to the wrong vendor. Highest-risk orphan on the site: a customer landing here books nothing.

---

### `/stillwater` — **REWRITE**
- **Title:** `Stillwater Landing — …` · **desc empty** · `lastmod 2026-02-03`
- **H1 ×3:** "The Links of" / "Stillwater, MN" / "Book Now" · **Outline:** H3 "Your New Local Clubhouse on the East-Side" → H4 facility blurb → then ❋-prefixed feature headings ("Top of the Line Simulator Technology", "Leagues and Contests You'll Love", "Full Bar and Menu")
- **Body (913 chars):** "A joint-entertainment facility connected to a bowling alley"; address `5862 Omaha Ave N Stillwater, MN 55082`; phone `(612) 699 - 0526` (**Lakeville's number** — the footer lists 612-699-0527 for Stillwater); GolfZon NX bays; food "In partnership with **Stillwater Bowl**".
- **CTAs:** `Book Now` → `/bookingstillwater` · `Book a Bay` → `/bookingstillwater` · `Rates & Hours` → `/rates` · **`Leagues & Contests (Coming Soon)` → `href=""` (empty href — dead button)** · `Grab a Tee Time` → `/bookingstillwater`
- **Widgets:** 1 map block (only map block on the site). 25 button blocks.
- **Images:** 3 (1 empty alt), 4 filenames — the hero is `Grand+Opening+(Facebook+Post)+(1).png`, a **repurposed social graphic**, not venue photography. There is **no real photography of the Stillwater venue anywhere on the site.**
- **Loc:** STW
- **Verdict:** **REWRITE** — half of the business gets one untitled, undescribed, nav-less page with a broken button, the wrong phone number, and zero photos. This is the single biggest content gap.

---

### `/leagues` — **REWRITE**
- **Title:** `MN Twin Cities Winter Indoor Golf Leagues, High Tech Golf Simulators — …` (shared with 4 pages) · **Desc:** "Join the fun at Lakeville Links" (shared with 4 pages) · `lastmod 2025-12-26`
- **H1:** "Fun. Competive." (**typo — "Competive"**) · **Outline:** H2 "The Best Indoor Golf Leagues" → H2 "2026 Fall Leagues" → H3 "Check back for league information for both Lakeville & Stillwater Fall Leagues!"
- **Body: 282 chars — the page is an empty placeholder.**
- **CTAs:** `info@lakevillelinks.com` → mailto · `612-619-1747` → `tel:6126191747` (a **third** phone number, not in the footer)
- **Loc:** BOTH (by mention)
- **Verdict:** **REWRITE** — the homepage's "Explore Leagues" CTA lands on "check back later". Typo in the H1.

---

### `/leagues-contests` — **REWRITE**
- **Title/desc:** shared leagues set. **H1: none** — H2 "Fun. Competive." (same typo) → H2 "The Best Indoor Golf Leagues & Contests" · **body: 105 chars**
- **CTAs:** `Flexible Floating Leagues` → **`https://ply.golf/venue/lakeville-links/leagues`** · `Weekly Contests & Event` → `https://ply.golf/`
- **Loc:** AMB (neither city named in body)
- **Verdict:** **REWRITE** — this is the **global nav's** "Leagues & Contests" destination and it is a 105-character page whose only two links push users off-domain to a third-party (ply.golf), one of them to that vendor's bare homepage. Meanwhile `/leagues` (different content, same title) is the homepage's target. Consolidate.

---

### `/juniorleagues` — **CUT** (or archive)
- **Title/desc:** shared leagues set · `lastmod 2025-12-09`
- **H1 ×2:** "Fun. Competive." / "The Best Indoor Golf Leagues" · **Outline:** H2 "Sign-Up Now for 2026 Junior Leagues!" → H3 "Secure a spot!" → H3 "**Leagues Run Jan - March 2026**" → H2 "The Details" → H3 "Junior Leagues:" → H3 "AGE RANGE -> 12Y/O to 18Y/O(High High School)" (**typo: "High High School"**) → H4 "Weeks of January 11th thru March 8th 2026" → H4 "8 Weeks!" → H4 "SUNDAYS:" → H4 "GIRLS DIVISION" / "BOYS DIVISION" → H2 "Sign Up Links" → H3 "Cost & Info"
- **CTAs:** `SIGN UP` → `app.primesignup.com/e/eze9l7` · `SIGN UP` → `app.primesignup.com/e/vkijuv` · mailto (subject line says "**Fall** League") · `612-619-1747`
- **Images:** 4; `JWAT6247.jpg` real venue photo.
- **Loc:** LKV
- **Verdict:** **CUT** — a season that ended in March 2026 is still live and still saying "Sign-Up Now". Rebuild as a seasonal/archived program page.

---

### `/groups` — **KEEP**
- **Title:** `Groups & Events | Golf, Food, Drinks for Your Next Party — …` · **Desc:** the longest and best-written description on the site (373 chars — over Google's display limit) · `lastmod 2026-04-22`
- **H1:** "Groups & Private Events" · **Outline:** H2 "Host Your Next Event at Lakeville Links!" → H3 "SUBMIT YOUR INQUIRY BELOW!" → H3 testimonial
- **Body (1,082 chars):** 8 event types (birthday, bachelor/ette, corporate, tournaments, holiday, team, graduation, fundraisers); "With **6 bays** and room for up to **36 golfers**"; "Group pricing will apply for groups of 12 or more".
- **Widgets:** Squarespace form `formId 645516e1f69aec79d49bdbd8` (field list `[unverified]` — renders client-side). **The page has zero `<a>` CTAs in main content** — the only conversion path is the form.
- **Testimonial:** "The simulator was unlike any I have used before, very realistic. Also, we had our office Christmas party here and the staff was very accommodating. Very unique place!" — Lucas, Google Review (**not marked up as `Review`/`AggregateRating`**)
- **Images:** 6 (4 empty alt), 37 CDN URLs — `JWAT3647.jpg`, `JWAT3661.jpg`, `IMG_3146.jpg` real venue photography.
- **Loc:** **LKV only** ("6 bays", "at Lakeville Links") — Stillwater's 4 bays / bowling-alley tie-in are a natural group-event story and appear nowhere.
- **Verdict:** **KEEP** — best-converting non-booking page. Needs a Stillwater variant and review schema.

---

### `/instruction` — **KEEP**
- **Title:** `Golf Instruction Partners | Twin Cities, Minnesota Golf Simulators — …` · **Desc:** present and specific · `lastmod 2024-09-20` (**~2 years stale**)
- **H1:** "Instruction" — and **no other headings at all** across 3,313 chars of body copy (the four instructor bios are unheaded paragraphs)
- **CTAs:** `CONTACT US` → `/contact` · four instructor mailtos: `barry.wallin@futuresclub.org`, `David.Anderson@mysticlakegolf.com`, `tcgolfer44@gmail.com`, `nstoulil@yahoo.com`
- **Images:** 6 (4 empty alt) — `barry+headshot.png`, `dave+anderson.png`, `Tamara+Headshot.png`, `nick+s+pic.jpg` = **real instructor headshots**
- **Loc:** AMB (zero Lakeville or Stillwater mentions in the body)
- **Verdict:** **KEEP** — real, differentiated content and the second-longest page on the site. But it is a wall of text with one heading, it exposes four personal email addresses as the only booking path (two are personal gmail/yahoo), it names no location, and it has not been touched in two years.

---

### `/menu` — **REWRITE**
- **Title:** `Menu | Food & Drinks While Enjoying Indoor Golf Simulators — …` · **Desc:** present · `lastmod 2025-11-11`
- **H1:** "Lakeville Links Menu" → H4 "Below is our current menu and is subject to change:" · **body: 72 characters total**
- **The menu itself is a single image** (`MENU+(3).png`) with **`alt=""`**. 9 `<img>`, 61 CDN URLs, but the only non-decorative asset is the menu PNG plus numbered sponsor logos.
- **CTAs:** none. Zero links in main content — **no ordering link, no Toast link, no "book a bay" cross-sell.**
- **Loc:** LKV (title says "Lakeville Links Menu"; Stillwater's food is "via Stillwater Bowl" per the homepage and appears nowhere here)
- **Verdict:** **REWRITE** — a nav-level page with 72 characters of indexable text and no CTA. Menu content must become real HTML (and there needs to be a Stillwater menu answer).

---

### `/specials` — **REWRITE**
- **Title:** `Current Specials | Lakeville Links | MN Golf Simulators — …` · **Desc:** present · `lastmod 2026-02-03`
- **H1: none.** **Outline:** H2 "Current Specials & Contests" → H2 "Golf" → H2 "Food" → H2 "Drinks" · **body: 318 chars** (three generic one-line blurbs; the actual offers are in images)
- **CTAs:** `PURCHASE GIFT CARD NOW!` → `app.squareup.com/gift/MLYARTM9VAGFK/order` · `BOOK A SIMULATOR BAY` → `/bookinglanding`
- **Images:** 7, 49 CDN URLs — `JWAT3661.jpg`, `JWAT6199.jpg`, `IMG_3146.jpg` real venue photos + `Dark+Background.png` overlays.
- **Loc:** AMB (zero city mentions)
- **Verdict:** **REWRITE** — a "Current Specials" page whose specials are unreadable images, not in the nav, no H1, last touched Feb 2026, and using the Square gift-card vendor while `/home-2` uses Toast.

---

### `/vikings-game-day-special` — **CUT**
- **Title:** `Vikings Game Day Special | Lakeville Links | MN Golf Simulators — …` · **Desc:** present · `lastmod 2025-05-20`
- **H1 ×5 — all decorative:** "Skol!", "•", "Let's Go Vikes!", "•", "Skol! • Let's Go Vikes! • Skol! • Let's Go Vikes! •" (a marquee rendered as H1s). Real headings: H2 "The Big Game Day Packages!" → H2 "Golf" / "Food" / "Drinks"
- **CTAs:** `CALL TO RESERVE` → `tel:6126990526` · **`BOOK ONLINE` → `lakevillelinks.golfbook.in/calendar.php` (retired vendor)** · `CALL TO BOOK!` → `tel:6126990526`
- **Images:** 8 (1 empty alt), 57 CDN URLs — reuses `/specials` photography.
- **Loc:** AMB (zero city mentions)
- **Verdict:** **CUT** — an out-of-season (NFL) campaign page, orphaned, 5 decorative H1s, pointing "BOOK ONLINE" at a dead booking vendor, and uses a third-party team mark (Vikings/Skol) it presumably has no licence for.

---

### `/cazopen` — **CUT**
- **Title:** `Caz Open — …` · **desc empty** · `lastmod 2025-04-22`
- **H1: none.** H2 "Caz Open Memorial Tournament:" → H4 Location / Date and Time / Format / Registration / Food / Fees / Fee includes / On Course prizes / Optional Prize Payout / Additional Game / Those in memory
- **Body:** a tournament at **Green Lea golf course, Albert Lea, MN — August 2, 2025, 12:00pm shotgun** (a year past, and at a *different, outdoor* venue). $90/person, 25 four-person teams.
- **CTAs:** `Register Here` → `app.primesignup.com/customer/accounts/lakeville/events/caz-open-memorial-golf-tournament-2025/checkout/new` — **a live registration checkout for a 2025 event**
- **Images:** 1, filename `generated_bcd24247-….jpg` — the `generated_` prefix indicates an **AI-generated / auto-generated image**, the only non-photographic content image found on the site.
- **Loc:** neither — the event is at a third-party course in Albert Lea.
- **Verdict:** **CUT** — expired event with a live payment link. Archive or 410.

---

### `/photo-gallery` — **REWRITE**
- **Title:** `Gallery 1 — …` (**placeholder title Squarespace generated**) · **desc empty** · `lastmod 2022-10-26` (**oldest page on the site — ~4 years stale**)
- **H1: none. Body text: 0 characters.**
- **Images:** 36 `<img>`, 37 unique filenames, all `IMG_8006.jpg` … sequential phone-camera exports. **Every alt is the filename** (`alt="IMG_8006.jpg"`), i.e. zero descriptive alt text. All appear to be **real venue photography** (phone, not the JWAT pro shoot).
- **CTAs:** none.
- **Loc:** AMB — all pre-dates Stillwater (2022), so this is entirely Lakeville, unlabelled.
- **Verdict:** **REWRITE** — linked from the footer as "VIEW PHOTO GALLERY", titled "Gallery 1", zero text, filename alts, four years old, no Stillwater imagery.

---

### `/simulator-settings` — **REWRITE**
- **Title:** `GolfZon Simulator Settings | **The Links of Lakeville** — Lakeville Links Premier Indoor Golf` (the only title carrying the new brand — and it still gets the old brand appended) · **Desc:** identical to the title string · `lastmod 2026-05-08`
- **H1: none** — H2 "Simulator Settings & Instructions" · **body: 33 characters**
- **Images:** 8 (5 empty alt), 53 CDN URLs — `1.png`–`5.png` + `Dark+Background.png`. **The entire how-to is screenshots.**
- **CTAs:** none.
- **Loc:** LKV per title; body says nothing.
- **Verdict:** **REWRITE** — a nav-level utility page with 33 characters of text. Prime candidate for real step-by-step HTML (and it is the kind of content AI assistants get asked for).

---

### `/news` (blog index) — **KEEP**
- **Title:** `News — …` · **desc empty** · `lastmod 2024-09-20`
- **6 H1s** (one per post card) — no page-level H1.
- Lists 6 posts. Only 1 post is post-2022 (Sep 2024). **No post mentions Stillwater at all.**
- **Verdict:** **KEEP** (as a container) — but the blog has effectively been dormant since Sept 2024 and predates the entire Stillwater launch and the rebrand.

---

### `/news/indoor-golf-leagues-stay-active-and-social-with-high-tech-simulators-all-winter-long` — **KEEP**
- **Title:** matches H1. **Desc:** present and good (the only news post with one). Published **2024-09-20**, modified 2024-09-20. Author: Justine Conary.
- Longest news post; genuine SEO content ("Minnesota winters are long and harsh…"). No iframes. 3 images (1 empty alt).
- **Loc:** LKV (Lakeville ×7, Stillwater ×0) · **Verdict:** **KEEP** — the only news post worth migrating; refresh for two locations.

---

### `/news/first-look-at-lakeville-indoor-golf` — **CUT**
- Published 2022-10-25, modified 2025-09-19. desc empty. **Body is ~0 words** — the post is just an **Embedly→YouTube iframe (`3_T1b032Zew`)** plus "Written By Guest User". 2 images (logo/favicon only).
- **Verdict:** **CUT** or convert to a video asset. Not a post.

---

### `/news/sneak-peak-pre-opening-look-inside-lakeville-links-by-twincitiesgolfcom` — **CUT**
- Published 2022-10-19. desc empty. **Typo in the title: "Sneak *Peak*"**. Body ≈2 sentences + **Embedly→YouTube iframe (`WXRRgKPt4lM`)**. Pre-opening content, now 4 years old.
- **Verdict:** **CUT**.

---

### `/news/grand-opening-is-planned-for-october-29th-2022` — **CUT**
- Published & modified 2022-10-08. desc empty. Body: 2 sentences ("Keep watching for more details!"). Author: Christopher Johnson.
- **Verdict:** **CUT** — a four-year-old "coming soon" announcement, still indexable.

---

### `/news/lakeville-links-golf-simulator-business-may-open-by-august` — **CUT**
- Published 2022-04-25. desc empty. Body is literally `Source: https://www.hometownsource.com/sun_thisweek/...` plus two screenshots (`Screen+Shot+2022-04-25+at+8.17.45+AM.png`) of the original article.
- **Verdict:** **CUT** — republished third-party article as screenshots. Copyright-adjacent and worthless for search.

---

### `/news/golfzon-twovision` — **CUT**
- Published 2022-04-01. desc empty. Body: one sentence promoting **TwoVision** simulators — hardware the site now describes as **GolfZon NX**. Contains a `sqs-block-video`.
- **Verdict:** **CUT** — actively contradicts current equipment claims.

---

### `/policy` — **REWRITE**
- **Title:** `Policy Page — …` · **desc empty** · `lastmod 2025-09-30`
- **H1: none** — H2 "**Head Honchos, LLC, dba Lakeville Links** - LIABILITY WAIVER" → H3 "Waiver and Contact Information"
- **Body: 9,850 chars — the longest text on the site.** Zero links, zero CTAs, zero images.
- **Loc:** LKV (legal entity named as dba **Lakeville Links**; Stillwater not covered)
- **Verdict:** **REWRITE** — a liability waiver for a two-venue operator that names one dba. Also: not linked from the footer, so users sign nothing and find nothing.

---

### `/linksflex-terms-conditions` — **KEEP**
- **Title:** `LinksFlex Terms & Conditions — …` · desc empty · `lastmod 2026-02-21`
- **H1: none** — H2 "**Head Honchos, LLC, dba The Links of Lakeville** - LinksFlex Terms & Conditions" → numbered H2s 1–8 (Overview, Structure, Expiration & Validity, Non-Transferability, Refunds & Returns, Usage Policies, Service Availability, Amendments). 2,459 chars. No links.
- **Loc:** LKV · **Verdict:** **KEEP** — current, matches the `/memberships` LinksFlex offer. Note it uses the *new* dba while `/policy` uses the *old* one.

---

### `/membership-packages-terms-conditions-copy` — **REWRITE**
- **Title:** `Membership Packages Terms & Conditions **(Copy)** — …` · desc empty · `lastmod 2026-03-30`
- **H1: none** — H2 "**The Links of Lakeville & The Links of Stillwater** - Membership Packages Terms & Conditions" → same numbered 1–8 structure. 2,753 chars.
- **This is the only terms page covering both locations — and it is a Squarespace "(Copy)" duplicate living at a `-copy` URL. There is no non-`-copy` original in the sitemap.**
- **Loc:** BOTH · **Verdict:** **REWRITE** — correct content, wrong URL, wrong title. Move to a clean slug and drop "(Copy)".

---

### `/feedback` — **KEEP**
- **Title:** `Feedback — …` · desc empty · `lastmod 2025-01-27`
- **H1: none** — H2 "Feedback". Body: "Review us on Google! … Please fill out the below information so we can better serve you in the future!"
- **Widgets:** Squarespace form `formId 6786d9f2a45f2804ecf8ec18` (fields `[unverified]`)
- **CTAs:** `Leave a Google Review!` → `https://g.page/r/CXuRqGV8D_GNEAE/review` (**Lakeville's GBP only — no Stillwater review link**)
- **Loc:** AMB / LKV-by-implication
- **Verdict:** **KEEP** — small but functional. Needs a Stillwater review destination.

---

### `/sms-opt-in-form` — **KEEP**
- **Title/desc:** shared leagues set (**wrong** — an SMS consent page titled "MN Twin Cities Winter Indoor Golf Leagues") · `lastmod 2025-12-16`
- **H1: none** — H3 "SMS Opt-in Form" · **body: 15 chars**
- **Widget:** `<iframe src="https://cr.sabrhub.com/smsform_submit.html">` — **SabrHub**
- Linked from the footer. **Loc:** AMB
- **Verdict:** **KEEP** (compliance page) — but it must have its own title/description; carrying a leagues title on a consent page is a real compliance-hygiene problem.

---

### `/sms-opt-in-form-1` — **CUT**
- Identical to the above (same SabrHub iframe, same H3, same 15-char body, same shared title/desc). **Collection title: "SMS Opt-in Form (Copy)"**. `lastmod 2025-12-16`.
- **Verdict:** **CUT** — an exact duplicate of a consent page. Two live SMS opt-in URLs is a TCPA-record hazard.

---

### `/advertisinglogos` — **CUT**
- **Title:** `AdvertisingLogos — …` · **desc empty** · `lastmod 2023-02-17` · **H1: none. Body text: 0 characters.**
- 14 `<img>`, 100 CDN URLs — a **sponsor-logo asset library**: `Align+Logo+Bay+1.png`, `Thor+Logo+Bay+2.png`, `Von+Hanson+Logo+Bay+4.png`, `Miller+Logo+Bay+5.png`, `Kretsch+Logo+Bay+6.png`, `tcgolf+logo.png`, `mnivnow+logo.png`, `pure+home+logo.png`. These are the images the homepage's "Bays Sponsored By:" strip pulls from.
- **Verdict:** **CUT** — an internal asset shelf, publicly indexed, in the sitemap, since 2023. (Preserve the logo files; delete the page.)

---

### `/align-logo` — **CUT**
- **Title:** `Align Logo — …` · **desc empty** · `lastmod 2024-01-05` · **H1: none. Body text: 0 characters. Images: logo + favicon only** (2 `<img>`, 4 CDN URLs) — the page does not even render the Align logo it is named for.
- **Verdict:** **CUT** — a blank page in the sitemap.

---

## 5. Cross-cutting notes for the rebuild

**Duplicate / orphan / legacy inventory (explicit):**

| Problem | URLs | Action |
|---|---|---|
| Triple homepage + root | `/`, `/home`, `/home-2`, `/home-old` | keep one; 301 the rest |
| Booking sprawl (4 URLs, 2 vendors) | `/bookinglanding`, `/booking`, `/bookingstillwater`, `/booking-scheduler` | collapse to per-location booking; kill the golfbook.in iframe |
| Duplicate SMS consent | `/sms-opt-in-form`, `/sms-opt-in-form-1` | keep one, unique title |
| "(Copy)" terms page as the only both-location terms | `/membership-packages-terms-conditions-copy` | rename slug, drop "(Copy)" |
| Internal asset shelves in the sitemap | `/advertisinglogos`, `/align-logo` | delete |
| Expired campaigns still live | `/cazopen` (Aug 2025), `/vikings-game-day-special`, `/juniorleagues` (Jan–Mar 2026), March-2026 promo blocks on `/booking` + `/bookingstillwater` | archive or delete |
| Off-domain doorway | `/farewaygolf/lakeville-links-memberships` | delete |
| Dead / empty links | `/stillwater` "Leagues & Contests (Coming Soon)" has `href=""`; `/memberships` "612-619-1747" links to `tel:6126990526` | fix |

**Contact-data inconsistencies to resolve before rebuild:** three phone numbers in circulation (612-699-0526 Lakeville, 612-699-0527 Stillwater per footer, 612-619-1747 on `/leagues` + `/juniorleagues` + `/memberships` label), two dba names (`Lakeville Links` on `/policy`, `The Links of Lakeville` on `/linksflex-terms-conditions`), two gift-card vendors (Square, Toast), and `LocalBusiness` hours that match neither published schedule.

**Photography:** the site does have real venue photography — a professional shoot (`JWAT####.jpg`, ~15 distinct frames across `/`, `/groups`, `/memberships`, `/specials`, `/about`, `/rates`, `/juniorleagues`) plus phone photos (`PXL_*`, `IMG_*`, and the 37-frame `IMG_80xx` gallery). **No stock photography was detected.** The one non-photographic content image is `generated_bcd24247-….jpg` on `/cazopen`. **There is zero photography of the Stillwater venue** — its hero is a repurposed Facebook post graphic.

**Alt text:** empty or filename-only alt is pervasive — `/photo-gallery` 36/36 filename alts, `/home-2` 14/19 empty, `/home-old` 12/17 empty, `/menu` 7/9 empty (including the menu itself), `/`, `/home` 6/10 empty.

**Not verified in this pass** (`[unverified]`): Squarespace template *name*; Squarespace form field structures (client-rendered); page-level Squarespace "hide from search" flags (no `<meta name="robots">` was emitted on any of the 41 pages, so none are noindexed); Core Web Vitals / performance; whether any of the 41 pages currently rank or receive traffic; the contents of the golfbook.in and whoosh.io flows themselves.
