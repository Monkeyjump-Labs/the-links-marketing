# The Links — Brand Evidence Inventory

**Scope:** all 41 archived HTML pages at `_ingest/raw/`, plus the site's versioned Squarespace
CSS and a sampled set of CDN image assets.
**Site:** `https://www.lakevillelinks.com/` — Squarespace 7.1, site ID `624121706429813068ff3498`,
template `5c5a519771c10ba3470d8101`.
**Method:** every color, font and asset below was read out of the site's own CSS/HTML or measured
off the downloaded asset. Nothing here is inferred from appearance alone unless marked.
**Date of analysis:** 2026-08-02.

> **Headline finding, stated up front:** the *system* is far more coherent than expected —
> one palette, one type stack, one nav, one header logo across all 41 pages. The fragmentation
> is real but it sits in the **identity layer** (marks, names, CTA language) and in an
> **incomplete rebrand** the owners describe in their own words on `/our-story`. See §6.

---

## 0. Source of truth for the theme

All 41 pages load the **same single stylesheet build** — no page-level overrides, no second theme:

```
https://static1.squarespace.com/static/versioned-site-css/624121706429813068ff3498/79/
  5c5a519771c10ba3470d8101/624121706429813068ff34b2/1811/site.css?nocustom=true
```

41/41 pages reference this exact URL. There is **no** `static1.squarespace.com/static/sitecss/…`
path on this site. A second sheet
(`.../vta/5c5a519771c10ba3470d8101/versioned-assets/1784658820989-T86EF34M4QVPBBCSSFUN/static.css`)
is the template's editor/runtime chrome and contains no brand color.

Site-level tweak JSON contains exactly one color/font key: `form-use-theme-colors = true`.
No custom CSS injection was found on any page.

---

## 1. Color

### 1.1 Declared theme palette (verbatim from `site.css :root`)

```css
:root{
  --white-hsl:0,0%,100%;
  --black-hsl:149.47,61.29%,18.24%;
  --safeLightAccent-hsl:202.98,20.89%,55.88%;
  --safeDarkAccent-hsl:202.98,20.89%,55.88%;
  --safeInverseAccent-hsl:0,0%,100%;
  --safeInverseLightAccent-hsl:0,0%,100%;
  --safeInverseDarkAccent-hsl:0,0%,100%;
  --accent-hsl:202.98,20.89%,55.88%;
  --lightAccent-hsl:12,8.77%,88.82%;
  --darkAccent-hsl:150,20.73%,67.84%;
}
```

Converted to hex:

| Squarespace slot | HSL | Hex | RGB | Plain description |
|---|---|---|---|---|
| `--white` | `0, 0%, 100%` | **#FFFFFF** | 255,255,255 | pure white |
| `--black` | `149.47, 61.29%, 18.24%` | **#124B2E** | 18,75,46 | deep forest green — this is the site's "black" |
| `--accent` | `202.98, 20.89%, 55.88%` | **#7794A6** | 119,148,166 | muted slate blue |
| `--lightAccent` | `12, 8.77%, 88.82%` | **#E5E1E0** | 229,225,224 | warm off-white / greige |
| `--darkAccent` | `150, 20.73%, 67.84%` | **#9CBEAD** | 156,190,173 | pale sage green |
| `--safeLightAccent` | = accent | **#7794A6** | | |
| `--safeDarkAccent` | = accent | **#7794A6** | | |
| `--safeInverse*` (×3) | `0, 0%, 100%` | **#FFFFFF** | | |

So the declared palette is **five unique values**: `#FFFFFF`, `#124B2E`, `#7794A6`, `#E5E1E0`, `#9CBEAD`.

### 1.2 How the palette actually resolves per section theme

Squarespace maps those five into named section themes. Resolved from `site.css`:

| Section theme | Background | H2 (`--headingLargeColor`) | Body | Primary button bg / text |
|---|---|---|---|---|
| `""` (default) & `white` | `#FFFFFF` | `#124B2E` | `#124B2E` | `#7794A6` / `#FFFFFF` |
| `light` | `#E5E1E0` | `#124B2E` | `#124B2E` | `#7794A6` / `#FFFFFF` |
| `black` | `#124B2E` | `#FFFFFF` | `#FFFFFF` | `#7794A6` / `#FFFFFF` |
| `dark` | `#9CBEAD` | `#FFFFFF` | `#FFFFFF` | `#7794A6` / `#FFFFFF` |
| `bright` | `#7794A6` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` / `#7794A6` |

**The single most important color fact:** because `--safeDarkAccent` and `--safeLightAccent` both
resolve to `--accent`, **every primary, secondary and tertiary button on every page is
`#7794A6` slate blue with `#FFFFFF` text**, regardless of section theme. The brand's action
color is a desaturated blue-grey, not the green.

### 1.3 Section-theme usage across all 41 pages

| `data-section-theme` | Count |
|---|---|
| `""` (→ white) | 140 |
| `black` (→ #124B2E green) | 66 |
| `light` (→ #E5E1E0) | 54 |
| `white` | 15 |
| `dark` (→ #9CBEAD sage) | 2 |
| `bright` (→ #7794A6 slate) | 1 |

Per-page mix is remarkably uniform (typically 2–5 default, 2–5 `black`, 1–3 `light`).
The pale sage `#9CBEAD` and the slate `#7794A6` as a *background* are near-vestigial:
3 sections in the whole site.

Text-color overrides picked from the palette swatches:
`sqsrte-text-color--white` ×13, `--black` ×12, `--accent` ×8, `--custom` ×4.

### 1.4 Literal hex / rgb usage across all 41 pages — ranked

Full scan of every archived page for `#rrggbb`, `#rgb` and `rgb()/rgba()` literals:

| Value | Occurrences | Pages | Where |
|---|---|---|---|
| **#3C4741** | 4 | 2 (`home.html`, `ROOT.html` — the same live homepage) | inline `style="color:#3C4741"` on two H4s: *"Memberships & Packages"* and *"New Location"* |

**That is the entire list.** There are no other author-set literal colors anywhere in 41 pages.
No `rgb()` / `rgba()` literals are authored either.

Two near-misses were rejected as false positives and are **not** colors:
`#F4E90B` = the block ID `#block-f4e90b9a5daab6eeea0d` on `feedback.html`;
`#722B10` = the SVG element id `#722b10782e7c4a22763e` on `vikings-game-day-special.html`.
Anything resembling `#124` in the raw HTML is the HTML entity `&#124;` (a pipe character).

Literal hexes present in `site.css` (`#272727`, `#3E3E3E`, `#F6F6F6`, `#F0523D`, `#0E0E0E`,
`#00B2FF`, `#F92672`/`#AE81FF`/`#E6DB74` …) are Squarespace platform chrome — video player UI,
Monokai code-block highlighting, Squarespace's own brand orange `#F0523D`. **None are this
brand's colors.**

### 1.5 Colors that exist only inside raster assets

Measured directly off the downloaded PNGs (exact pixel values, opaque pixels only):

| Color | Source | Reach |
|---|---|---|
| **#F49C4C** (also #EE974A) | `LL Icon.png` — orange ball-and-chevron mark | 1 page (`juniorleagues.html`) |
| **#231F20** | `Lakeville Links Logo FINAL (2)-01.png` — ornate lockup ink | 1 page (`home-2.html`, orphaned) + the favicon + the OG share image |
| **#FFFFFF** | `White Links Logo.png` — 100% of opaque pixels are pure white | 41 pages |

### 1.6 Where declared and actual disagree

1. **`#3C4741` vs `#124B2E`.** `#3C4741` is `hsl(147.3, 8.4%, 25.7%)`; the brand green is
   `hsl(149.5, 61.3%, 18.2%)`. Same hue family (147° vs 149°), radically different saturation.
   Someone hand-picked a washed-out version of the brand green in the rich-text editor instead
   of using the palette swatch. Two headings on the live homepage render in a color that exists
   nowhere else in the system.
2. **The orange `#F49C4C` is off-palette entirely.** It appears in no CSS variable. It is the
   likely source of the `accent_orange: "#ee964b"` entry in the existing brand kit — that hex is
   within 3 points of a real pixel value in `LL Icon.png`, so it was probably eye-dropped from
   that one 600×600 icon on one page.
3. **Two of the five declared slots are effectively unused.** `#9CBEAD` (sage) backs 2 sections
   site-wide; `#7794A6` backs 1 as a section color — though it is simultaneously the color of
   *every button on the site*. `#7794A6` therefore reads as an action color, not a brand color.
4. **Six third-party sponsor palettes sit on the live homepage.** The `Bays Sponsored By:`
   section on `home.html` / `ROOT.html` / `home-2.html` / `home-old.html` carries six advertiser
   logos in unrelated colors, measured: **#03024E** (Align Integrated Health, near-black navy),
   **#FFFC00** (Snapchat-style yellow), **#344074 + #7FBC54** (navy + green), **#595A5C** (grey),
   **#103C63** (navy), plus a white-on-transparent mark (`Asset 9.png` = "Restore & Renovate
   Homes"). These are not the brand's colors but they are on the brand's most-viewed page.

### 1.7 Net palette in real use

| Rank | Hex | Role | Evidence of reach |
|---|---|---|---|
| 1 | `#FFFFFF` | dominant background + all button text + the logo artwork | 155 sections + 41 pages |
| 2 | `#124B2E` | the "dark" — backgrounds, headings and body on light | 66 sections |
| 3 | `#7794A6` | **every button, every page** | 41 pages |
| 4 | `#E5E1E0` | secondary light background | 54 sections |
| 5 | `#9CBEAD` | pale sage | 2 sections |
| 6 | `#3C4741` | rogue hand-picked green-grey | 2 headings, 1 page |
| 7 | `#F49C4C` | orange, asset-only | 1 page |
| 8 | `#231F20` | logo ink, asset-only | favicon + OG image + 1 orphan page |

---

## 2. Type

### 2.1 What is loaded

Every font is **self-hosted by Squarespace** from `file.squarespace-cdn.com/…/namespaces/fonts/
libraries/sqsp/…` as `.woff2`. There is **no** Google Fonts CDN link, **no** Typekit, **no**
external font host anywhere in 41 pages.

`@font-face` blocks, counted across all 41 pages:

| Family | Weights (normal) | Weights (italic) | @font-face blocks | Pages |
|---|---|---|---|---|
| **Open Sans** | 300, 400, 600, 700, 800 | 300, 400, 700 | 328 per weight/style (8 unicode subsets × 41 pages) | 41/41 |
| **Alfa Slab One** | 400 | — | 123 (3 subsets × 41) | 41/41 |
| **Poppins** | 500 | — | 123 (3 subsets × 41) | 41/41 |

Raw `font-family` string frequency across all 41 pages: Open Sans **3,280**, Poppins **123**,
Alfa Slab One **123**. No other brand family is referenced.

### 2.2 What each family is used for (verbatim from `site.css`)

```css
h1,h2,h3,h4 { font-family: var(--heading-font-font-family); … }
```

| Role variable | Family | Weight | Transform | Letter-spacing | Size |
|---|---|---|---|---|---|
| `--heading-font-*` (h1–h4) | **Alfa Slab One** | 400 | **none** | 0em | h1 6.4rem / h2 4.2rem / h3 2.5rem / h4 1.4rem |
| `--body-font-*` | **Open Sans** | 400 | none | 0em | line-height 1.6em |
| `--meta-font-*` | **Open Sans** | 300 | none | 0em | line-height 1.2em |
| `--site-navigation-font-*` | **Open Sans** | 600 | none | 0em | `--normal-text-size` |
| `--primary-button-font-*` | **Open Sans** | **800** | **uppercase** | **.2em** | 1.6rem |
| `--secondary-button-font-*` | **Open Sans** | 300 | none | .02em | 1.1rem |
| `--tertiary-button-font-*` | **Open Sans** | 300 | none | .02em | 1rem |
| `--header-button-font-*` | **Poppins** | **500** | none | .02em | .9rem |
| `--site-title-font-*` | inherits heading (Alfa Slab One) | 400 | none | 0em | 2rem |

So: **Poppins exists for exactly one element — the header CTA button** (`BOOK NOW!`, 80
instances = 2 per page × 40 pages). It is a whole extra typeface loaded on every page for one
button. That is the only genuine typographic inconsistency in the system, and it is small.

`--heading-font-text-transform` is **`none`**. Headings are sentence/title case, not uppercase.

### 2.3 Consistency page to page

Identical on all 41 pages. Same stylesheet build, same three families, same weights, same role
mapping. No page injects an override. Nav is byte-identical across 40 pages (the 41st,
`booking-scheduler.html`, is a bare scheduler embed):

`Home · Memberships · Leagues & Contests · Groups & Private Events · Instruction ·
Hours | Rates | Gift Cards · Location | APP · About the Facility · Menu · Simulator Settings ·
Our Story` — 40/40 each.

### 2.4 ⚠️ The brand-kit contradiction — resolved

`/Users/root/src/Fareway/fareway-brain/marketing/brand-kits/ven_lakeville_links.json` claims:

```json
"typography": {
  "display": { "family": "Oswald", "transform": "uppercase", "weights": [500,700] },
  "body":    { "family": "Montserrat", "weights": [400,600,700] }
}
```

**This is wrong. Both families. Verified:**

- **"Oswald" appears 0 times in 41 pages.** Zero. No `@font-face`, no `font-family`, no string
  match, case-insensitive.
- **"Montserrat" appears in 41 pages — as the name of a Caribbean territory.** Every single hit
  is inside the phone-country-code JSON that Squarespace ships with its form blocks:
  `{"name":"Montserrat","code":"MS","phoneCode":"+1"}`. It is **never** a font reference.
  This is almost certainly how the error entered the kit: a naive string search matched the
  country list.
- The kit's `transform: "uppercase"` for display is also wrong — the site's heading transform
  is explicitly `none`.

**The site actually uses:** display/headings = **Alfa Slab One** 400 (a heavy slab serif, nothing
like Oswald's condensed grotesque); body/nav/buttons = **Open Sans** 300/400/600/800; header CTA
= **Poppins** 500.

The kit's `colors` block is equally unfounded — `#145c9e`, `#ee964b`, `#007ea7`, `#478978`,
`#e8f1f2`, `#bbcbc3`, `#59a96a`, `#b0db43`, `#010402` — **all nine return 0 matches across all
41 pages**. Only `#ee964b` has any grounding: it is within 3/255 of the orange in `LL Icon.png`,
a 600×600 raster on one page. `bg_dark: "#145c9e"` (a mid blue) is not the site's dark; the
site's dark is `#124B2E`, a green.

> **Verdict: the brand kit's typography is inaccurate and its palette is unfounded. Any
> downstream work fed by `ven_lakeville_links.json` is working from fabricated inputs and should
> be re-checked.** The kit's `tagline`, `voice_samples`, `logo.primary_url` and `imagery` notes
> *are* accurate.

---

## 3. Logo & marks

### 3.1 The Links' own marks

| # | Asset | URL | Native size | Format | Color | Used where |
|---|---|---|---|---|---|---|
| 1 | `White Links Logo.png` | `…/06efebeb-2142-4704-a149-6921646c5771/White+Links+Logo.png` | **1842 × 713** | PNG-32 w/ alpha (84% transparent) | 100% pure `#FFFFFF` | **Header, all 41 pages** (80 `<img>` instances + `logoImageUrl` in site context). `alt="Lakeville Links Premier Indoor Golf"` |
| 2 | `Lakeville Links Logo FINAL (2)-01.png` | `…/302c0116-b881-4554-be04-b232802ba0f4/…` | **4500 × 3600** | PNG-8 palette w/ alpha | `#231F20` + `#FFFFFF` | **1 page only** — `home-2.html` (an orphaned draft homepage, canonical `/home-2`) |
| 3 | `LL Icon.png` | `…/9b48af4f-9b74-43e3-9969-fc02744151b2/LL+Icon.png` | **600 × 600** | PNG-8 palette w/ alpha | `#F49C4C` orange | **1 page only** — `juniorleagues.html` |
| 4 | `favicon.ico` | `…/11a639db-a63f-44aa-87cd-a65b624d154a/favicon.ico` | **50 × 50** | ICO (RGBA) | greyscale/black | All 41 pages. Content = mark #2, circle-cropped, **illegible at size** |
| 5 | `Lakeville Links Share Image .png` | `…/1726858543770-S4I4SEFFSLSNGFN7V6XR/…` | **1920 × 1080** | PNG | white mark #2 over a dark sim-bay photo | `og:image` on **all 41 pages** — every social/SMS/link preview |

**There are three distinct logo lockups, and they share no artwork:**

- **#1 "THE LINKS / PREMIER INDOOR GOLF"** — horizontal wordmark, condensed slab caps, a golf
  ball on a tee substituted for the dot/stem of the "I", thin rule flourishes flanking the
  descriptor line. White only. Reads as the *parent* mark. **Does not say "Lakeville".**
- **#2 "LAKEVILLE LINKS / PREMIER INDOOR GOLF · Est. 2022"** — vertical emblem: oversized
  stippled golf ball on a tee, crossed irons behind, high-contrast didone-style serif wordmark.
  Ornate, badge-like. Completely different construction, weight, and type voice from #1.
- **#3 LL Icon** — orange golf ball on a tee above a double chevron. Different again: flat,
  iconographic, single-color, no type at all.

**Named-entity coverage:**

| Name | Distinct artwork? |
|---|---|
| **"The Links"** (parent) | ✅ Yes — mark #1 |
| **"Lakeville Links"** | ✅ Yes — mark #2 |
| **"The Links of Lakeville"** | ❌ **No artwork exists** |
| **"The Links of Stillwater"** | ❌ **No artwork exists** |

The two names the owners announce as the new brand on `/our-story` have **no marks at all**.
Stillwater has no visual identity of any kind.

**The header/favicon/OG conflict:** the header shows mark #1 ("The Links"), while the favicon
*and* the Open Graph share image — the two things that represent the brand everywhere off-site —
both show mark #2 ("Lakeville Links"). Every link anyone shares, on all 41 pages, previews the
old mark.

### 3.2 Rebuild constraint — raster only

**Zero SVG brand assets exist.** A scan of all 41 pages for `.svg` on the site's own CDN returns
0 hits; the only SVG served is Squarespace's own `/universal/svg/social-accounts.svg` icon sheet.
All five marks above are PNG/ICO. The best available source is `White Links Logo.png` at
1842 × 713 with clean alpha — usable for large display, **not** usable for small sizes, dark-on-
light, single-color print, embroidery, signage, or favicon work without redraw.

**There is no dark-on-light variant of the current header mark.** Mark #1 is white-only. On the
`light` (`#E5E1E0`) and default-white section themes the site has no logo it can place.

### 3.3 Third-party marks carried on the site

`advertisinglogos.html` + the homepage `Bays Sponsored By:` block carry 12 advertiser logos:
`Align Logo Bay 1.png` (236×105), `align logo.png` (1725×595), `Thor Logo Bay 2.png` (178×109),
`Von Hanson Logo Bay 4.png` (407×404), `Miller Logo Bay 5.png` (285×249),
`Kretsch Logo Bay 6.png` (513×125), `mnivnow logo.png` (352×155), `tcgolf logo.png` (2627×647),
`pure home logo.png` (1135×352), `valley accounting logo.png` (1047×285),
`Asset 9.png` (3380×1768, "Restore & Renovate Homes"), `Asset 16 (1).png` (2130×1115).
Six of these (`1.png`–`6.png`, square 1080×1080 social crops of the same brands) sit on the
**live homepage**.

---

## 4. Photography

110 distinct CDN assets across the site. Classification:

| Category | Count | Character |
|---|---|---|
| Professional shoot (`JWAT####.jpg`) | 14 | 6000×4000 / 5648×3765 / 4549×3033 — full-frame DSLR |
| Phone photos (`IMG_*`, `PXL_*`) | 27 | 4032×2268 iPhone, 4080×3072 & 8160×6144 Pixel |
| Screenshots (`Screen Shot …`, `Screenshot …`) | 23 | 2022 GolfZon course screens + 2025/2026 UI grabs |
| Graphics / social crops | 26 | 1080×1080 squares, 1294×2000 & 889×2000 story crops, Facebook post crops |
| Logos & marks | 14 | see §3 |
| People / headshots | 5 | instructor portraits, mixed quality |
| Other | 1 | AI/`generated_…` 4096×4096 |

### 4.1 The professional shoot (`JWAT`)

Photographer initials/sequence `JWAT3615–3661` and `JWAT6199–6249` — two sessions, one
photographer, all Lakeville. Measured color statistics (160×160 resample, full frame):

| File | Mean RGB | R−B | Mean luminance | Saturated px | Dominant hue band |
|---|---|---|---|---|---|
| `JWAT3647` (wide interior, bar + high-tops) | 74, 68, 56 | **+18 warm** | 68/255 | 27% | 30–60° amber |
| `JWAT6199` (bay) | 71, 80, 55 | **+16 warm** | 74/255 | 31% | 60–90° yellow-green |
| `JWAT6207` (ball on tee, macro) | 40, 68, 21 | **+19 warm** | 54/255 | 45% | 90–120° green (77%) |
| `JWAT6238` (golfer mid-swing, sim screen) | 62, 77, 47 | **+15 warm** | 69/255 | 34% | 60–90° / 90–120° |

**Characterization.** Consistently **dark and warm**: mean luminance 54–74 out of 255 (the images
are ~25% grey), 33–38% of every frame is near-black, and every frame is red-dominant over blue by
+15 to +19. The light source is warm — black-painted ceiling with exposed joists, warm pendant
downlights over the bar, no daylight. The *only* cool element in any frame is the simulator
projection itself: bright blue-sky-and-fairway imagery punched into an otherwise near-black room,
plus a small 210–240° blue band (7–8% of saturated pixels) from screen spill. Turf green
(`#204000`–`#208000` family) is the single strongest saturated hue.

**Net: interiors read decisively warm and dark. The projected course imagery reads cool and
bright. That contrast — warm dark room, cool bright screen — is the venue's actual visual
signature and it is not reflected anywhere in the current brand system.**

The phone photos are a different register: `IMG_3146` (food, pepperoni pizza on a steel counter)
is mean RGB 159/126/88 — **R−B +71**, luminance 131/255. Bright, hard, unfiltered overhead
kitchen light. It sits beside the moody professional interiors with no visual bridge.

### 4.2 Stillwater photography — the "none exists" claim is **REFUTED, narrowly**

The claim is close to true but not exactly true.

- `stillwater.html` (the Stillwater location page) contains **four** images: a Facebook-post
  graphic (`Grand Opening (Facebook Post) (1).png`, 940×788), the shared OG image, the site
  logo, and the favicon. **No venue photography.**
- `bookingstillwater.html` contains `PXL_20221025_141025139.jpg` and `Sim Pic.jpg` — both
  **Lakeville** assets from 2022, four years before Stillwater opened. Stillwater's booking page
  is illustrated with the other venue.
- **One Stillwater interior photo does exist:** `PXL_20260123_180713787.NIGHT.RAW-01.COVER.jpg`
  (8160×6144, Pixel Night Sight, dated 2026-01-23 — six days before the Stillwater opening
  announced on the homepage). It shows a room with four sim bays behind black curtains, tan
  leather sofas, a marble-top round table, and **no bar** — consistent with Stillwater's stated
  arrangement (*"Full bar and menu (via Stillwater Bowl)"*, i.e. the bar is next door). It does
  not match any Lakeville frame. `[Stillwater attribution inferred from date + room layout +
  absence of a bar; the filename does not name the venue.]`
- That one photo appears on **`our-story.html` only** — not on the Stillwater location page, not
  on the Stillwater booking page, not on the homepage.

**Corrected statement: exactly one Stillwater venue photograph exists on the site — a phone
night-mode shot — and it is on the wrong page. Stillwater has no professional photography and no
photography at all on any of its own pages.**

---

## 5. Voice — verbatim strings

Confirmed taglines (all three verified present):

1. **"The most realistic indoor golf you can play, period."** — `<h2>`, on the live homepage and
   on all four homepage variants.
2. **"Save Big, Play More Golf"** — `<h3>`, homepage memberships block.
3. **"More Than Just Golf"** — `<h2>`, homepage leagues/contests block.

Further verbatim headlines, subheads and buttons:

4. `<h3>` "Check out our leagues, contests, and other ways to play and engage" *(homepage)*
5. `<h3>` "Your New Local Clubhouse on the East-Side" *(stillwater)*
6. `<h1>` "Fun. Competive." *(leagues — **"Competive" is a live typo in an H1**)*
7. `<h2>` "The Best Indoor Golf Leagues" *(leagues)*
8. `<h2>` "Just two guys wanting a better golf simulator to play on during the long Minnesota winters…" *(our-story)*
9. `<h1>` "Let's Go Vikes!" / `<h1>` "Skol! • Let's Go Vikes! • Skol! • Let's Go Vikes! •" *(marquee, vikings-game-day-special)*
10. `<p>` "Check out our flexible memberships where hours never expire and the beer just tastes that little bit better." *(homepage)*
11. `<p>` "GolfZon NX bays bring you the top technology in simulator golf - making your round at St Andrews feel as gusty as the real thing." *(stillwater)*
12. `<p>` "1 delicious pizza to fuel your game-day energy" / "8 ice-cold domestic beers or rail mixed drinks to cheers every touchdown!" *(vikings)*
13. `<p>` "No purchase necessary to enter the sweepstakes. Void where prohibited. Must be 18+ to enter." *(booking)*
14. `<p>` "You are responsible for paying for the entire time booked, even if you finish early." *(booking)*
15. `<p>` "Group pricing will apply for groups of 12 or more golfers. Larger discounts are available for larger groups. Amount of discount varies with the day of the week & time of the year hosted." *(groups)*
16. `<h3>` "Hours Subject to Change without Notice." — set as an **H3, in Alfa Slab One at 2.5rem**, on both the homepage and the rates page
17. `<p>` "If there are no pre-booked bay times, we reserve the right to open late or close early." *(homepage + rates)*
18. `<h3>` "Stillwater Minnesota!!" *(homepage — double exclamation in a heading)*
19. `<h2>` "Bays Sponsored By:" *(homepage)*
20. `<p>` "…golf season disappeared into six feet of Minnesota sadness… we kept the Wednesday tradition alive with what we called 'bourbon nights.'" *(our-story)*
21. `<p>` "…like whether toilet paper had become currency." *(our-story)*
22. `<p>` "Apparently having multiple locations means you're supposed to look professional or something." *(our-story)*
23. `<p>` "Over the next few months, we'll continue rolling out the rebrand, updating things, and pretending we fully know what we're doing." *(our-story)*
24. `<p>` "Job inquiry: hr@lakevillelinks.com" — in the **global footer of all 41 pages**

### 5.1 Tonal inconsistency

Three incompatible registers, sometimes on the same page:

- **Warm, self-deprecating, funny** — the whole of `/our-story` (#8, #20–23). This is genuinely
  good writing with a distinct personality. It exists on exactly one page.
- **Operational / defensive** — #14, #16, #17, "Hours Subject to Change without Notice." The
  homepage's *third* heading is a disclaimer, typeset in the display face at 2.5rem. Legal and
  liability language is promoted to heading level on the highest-traffic page.
- **Promo-flyer breathless** — #9, #12, #18. All-caps, multiple exclamation points, food-ad
  adjectives ("mouthwatering", "ice-cold", "delicious").

Plus a fourth, unattributed register: `cazopen.html` is a memorial charity scramble at **Green
Lea golf course, Albert Lea, MN** — a different venue 90 minutes away — with a list of twelve
deceased members under "Those in memory:". It is on the venue's domain, in the venue's chrome,
with no framing.

### 5.2 CTA fragmentation

The same action is asked for in **13 distinct phrasings** across 41 pages:

`BOOK NOW!` (120, header + inline) · `Book Now` (3) · `BOOK NOW` (2) · `Book Tee Time` (4) ·
`Book a Tee Time` (1) · `BOOK A TEE TIME` (2) · `Grab a Tee Time` (1) · `Book a Bay` (1) ·
`Book A BAY NOW!` (1) · `BOOK A SIMULATOR BAY` (1) · `BOOK ONLINE` (1) · `GO TO BOOKING` (1) ·
`ACKNOWLEDGE AND GO TO BOOKING` (2)

Casing is unsystematic — `Purchase Gift Card`, `Purchase GIFT CARD`, and `PURCHASE GIFT CARD NOW!`
all appear. `Book at Lakeville` / `Book at Stillwater MN` and `Join @ Lakeville` / `Join @
Stillwater` use two different location-suffix conventions.

---

## 6. The fragmentation verdict

**The client's read is half right, and the half they're right about is the important half.**

### What is NOT fragmented — measured

| Dimension | Finding |
|---|---|
| Stylesheets | **1** build, referenced by 41/41 pages |
| Declared palette | **1**, five slots, no page overrides |
| Author-set literal colors in 41 pages | **1** (`#3C4741`, 4 occurrences, 1 page) |
| Type families | **3**, identical on 41/41 pages, single role map |
| Header logo | **1**, identical on 41/41 pages |
| Navigation | **1**, 11 identical items on 40/40 pages |
| Section-theme vocabulary | **6** Squarespace themes, uniformly applied |

By the usual measure of a fragmented site — competing stylesheets, drifting hand-picked hexes,
different fonts per page — **this site is unusually disciplined.** One rogue hex in 41 pages is
close to a best-case outcome for a four-year-old Squarespace site. Anyone expecting to find
color chaos in the CSS will not find it.

### What IS fragmented — measured

| Dimension | Count | Detail |
|---|---|---|
| **Distinct hues in real use** | **8** | `#FFFFFF`, `#124B2E` green, `#7794A6` slate blue, `#E5E1E0` greige, `#9CBEAD` sage, `#3C4741` rogue green-grey, `#F49C4C` orange, `#231F20` logo ink — spanning green (149°), blue (203°), orange (29°) and a warm neutral (12°). **Plus 6 unrelated third-party sponsor palettes on the homepage** (`#03024E`, `#FFFC00`, `#344074`, `#7FBC54`, `#595A5C`, `#103C63`). |
| **Distinct type families** | **3** | Alfa Slab One (headings), Open Sans (everything else), Poppins (one button). Poppins is a whole webfont loaded on 41 pages to set a single element. |
| **Distinct logo lockups** | **3** | Sharing zero artwork, zero type, zero construction between them. Header shows one; favicon and every social preview show a different one. |
| **Venue names in circulation** | **5** | "Lakeville Links" (79 hits, 41 pages) · "The Links" (55 hits, 40 pages) · "The Links of Lakeville" (7 hits, 4 pages) · "The Links of Stillwater" (7 hits, 5 pages) · "Lakeville Links Premier Indoor Golf" (the `siteTitle`, and the suffix of all 41 `og:title`s). Plus two domains: `lakevillelinks.com` (45 hits, 40 pages, and every email address) and `thelinks.golf` (1 hit, 1 page). |
| **Distinct "book" CTA phrasings** | **13** | See §5.2 |
| **Marks for the two announced brand names** | **0** | "The Links of Lakeville" and "The Links of Stillwater" have no artwork |
| **Stillwater venue photographs on Stillwater pages** | **0** | The one Stillwater photo that exists is on `/our-story` |
| **Orphaned public pages** | **≥4** | `home-2` and `home-old` are live alternate homepages with their own canonicals; `home-2` carries logo #2. `XMemberships` and `Membership Packages Terms & Conditions (Copy)` are live with draft titles. `cazopen` is an unrelated third-party event. |

### The actual diagnosis

The site is not *drifting*. It is **mid-rebrand and stalled**, and the owners say so themselves,
on the record, in the site's own copy (`/our-story`):

> *"With the addition of Stillwater, we decided it was time for a rebrand… So now we proudly
> introduce: **The Links of Lakeville**, **The Links of Stillwater**. We also purchased the URL:
> **thelinks.golf**… Over the next few months, we'll continue rolling out the rebrand."*

Exactly one deliverable of that rebrand has shipped: the white "THE LINKS" header mark, deployed
to all 41 pages. Everything else is pre-rebrand:

- `siteTitle` = "Lakeville Links Premier Indoor Golf" (all 41 pages)
- All 41 `og:title`s end in "— Lakeville Links Premier Indoor Golf"
- Favicon = the old Lakeville Links emblem
- OG share image = the old Lakeville Links emblem
- Domain = `lakevillelinks.com`; all email = `@lakevillelinks.com`
- Page copy still says "Lakeville Links" 79 times ("Host Your Next Event at Lakeville Links!",
  "Lakeville Links Menu", "Contact Lakeville Links", "Things to know about coming to Lakeville
  Links:")
- `thelinks.golf` is mentioned once, in a paragraph, and is not linked

**So: how fragmented is this brand, actually?**

**The design system is coherent — one palette, one type stack, one nav, one header logo across
41 pages, with a single 4-occurrence rogue hex as the only leak. The brand identity is not: 3
logo lockups sharing no artwork, 5 names in circulation across 2 domains, 8 hues in real use
spanning green/blue/orange, 13 ways of saying "book", and 0 marks and 0 on-page photographs for
the newer of the two venues.**

The fragmentation is not a styling problem to tidy. It is a **half-executed rename** plus a
**second venue that was never given an identity**, sitting on top of a technically consistent
system. A strategist should treat the existing palette and type stack as a real, working
starting point — and treat the naming, the marks, and Stillwater's total visual absence as the
open questions.

---

## Appendix A — Unverified / not established

- `[unverified]` Whether `PXL_20260123_180713787.NIGHT.RAW-01.COVER.jpg` depicts Stillwater.
  Inferred from capture date (2026-01-23, six days before the announced Stillwater opening),
  room layout (four bays, leather lounge seating, marble table, no bar — matching the stated
  "full bar via Stillwater Bowl" arrangement), and non-correspondence with any Lakeville frame.
  The filename carries no venue name.
- `[unverified]` The photographer behind the `JWAT` series. `JWAT` is an assumed initials/
  sequence prefix; no credit, EXIF, or attribution appears anywhere in the archived HTML.
- `[unverified]` Whether the site currently renders at `thelinks.golf`. Only the 41 archived
  pages at `lakevillelinks.com` were examined; the `.golf` domain is mentioned once in prose and
  is not hyperlinked.
- `[unverified]` The origin of the current `#7794A6` / `#124B2E` / `#E5E1E0` / `#9CBEAD`
  palette. It is declared in the theme with no comment, changelog, or design file in evidence.
  It may be a Squarespace stock palette rather than a deliberate brand choice — worth asking the
  client directly.
- `[unverified]` Original vector artwork for any mark. None is present on the site; whether the
  owners hold AI/EPS files off-site is unknown. `Lakeville Links Logo FINAL (2)-01.png` at
  4500×3600 with a `-01` suffix is Illustrator export naming and implies a source `.ai` exists
  for mark #2. `White Links Logo.png` shows no such indicator.
- `[unverified]` Whether `home-2` and `home-old` are linked from anywhere. They are publicly
  reachable and self-canonical; no inbound internal link was searched for.
- Not established: mobile-specific typography or color overrides beyond
  `--mobile-site-title-font-font-size: 2rem` (identical to desktop). No mobile breakpoint alters
  the palette or families.

## Appendix B — Key asset URLs

```
Header logo (all pages, white, 1842×713, PNG+alpha, no SVG)
https://images.squarespace-cdn.com/content/v1/624121706429813068ff3498/06efebeb-2142-4704-a149-6921646c5771/White+Links+Logo.png

Ornate Lakeville Links lockup (home-2 only, 4500×3600)
https://images.squarespace-cdn.com/content/v1/624121706429813068ff3498/302c0116-b881-4554-be04-b232802ba0f4/Lakeville+Links+Logo+FINAL+(2)-01.png

Orange LL Icon (juniorleagues only, 600×600, #F49C4C)
https://images.squarespace-cdn.com/content/v1/624121706429813068ff3498/9b48af4f-9b74-43e3-9969-fc02744151b2/LL+Icon.png

Favicon (all pages, 50×50, = ornate lockup circle-cropped)
https://images.squarespace-cdn.com/content/v1/624121706429813068ff3498/11a639db-a63f-44aa-87cd-a65b624d154a/favicon.ico

OG share image (all 41 pages, 1920×1080, = ornate lockup over sim-bay photo)
https://images.squarespace-cdn.com/content/v1/624121706429813068ff3498/1726858543770-S4I4SEFFSLSNGFN7V6XR/Lakeville+Links+Share+Image+.png

The one Stillwater interior photo (our-story only, 8160×6144)
https://images.squarespace-cdn.com/content/v1/624121706429813068ff3498/318c0c74-7eda-43c3-b768-7f56ccae60ca/PXL_20260123_180713787.NIGHT.RAW-01.COVER.jpg

Representative professional Lakeville frames (6000×4000)
.../da95e81b-cab3-4a54-94ec-e734a938a628/JWAT3647.jpg   (wide interior, bar)
.../b84a6f03-144b-478e-aeeb-5c6336ae9ecb/JWAT6238.jpg   (golfer mid-swing)
.../f8dacc23-28e5-4616-a448-0602422cb1a5/JWAT6207.jpg   (ball on tee, macro)
.../0b356517-c84f-4297-a4d5-258622ac5eec/JWAT6199.jpg   (bay)

Theme stylesheet (the authority for §1 and §2)
https://static1.squarespace.com/static/versioned-site-css/624121706429813068ff3498/79/5c5a519771c10ba3470d8101/624121706429813068ff34b2/1811/site.css?nocustom=true
```
