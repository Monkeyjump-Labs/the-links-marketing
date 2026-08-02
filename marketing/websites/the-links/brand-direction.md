# Brand Direction — The Links

> Website Studio artifact · **Phase 1, brand track** · 2026-08-02 · slug `the-links`
> Evidence base: [`brand-inventory.md`](brand-inventory.md) — a verified audit of the live
> site's actual CSS, type, assets and copy. Nothing here re-derives it.
> Companions: [`strategy.md`](strategy.md) §2 (positioning, voice),
> [`current-site-audit.md`](current-site-audit.md) (what's broken today),
> `fareway-brain/marketing/websites/_playbook/playbook-sim-venue.md` §2 (segment voice rules).
> Machine-readable output: [`design/tokens.json`](design/tokens.json) → shipped in
> `src/styles/tokens.css`.
>
> **Status: PROPOSAL.** Nothing in this document has been shown to or approved by the client.
> It is written to be argued with at a human gate. Where it makes a call the evidence does not
> fully settle, it says so.
>
> **Every contrast ratio in this document was computed** from the sRGB relative luminance of the
> two stated values per WCAG 2.1 §1.4.3. None is estimated or recalled.

---

## 1. The call

### The diagnosis this direction is built on

The inventory's verdict is that this is **not styling drift** — it is a **stalled rename**. One
stylesheet, one palette, one type stack, one header logo, across all 41 pages; exactly one
author-set rogue hex in the entire site. The `/our-story` page announces the rebrand to *The
Links of Lakeville* and *The Links of Stillwater* in the owners' own words, and then exactly one
deliverable of it shipped: the white header wordmark.

So the job is not to design a brand. It is to **finish the one that was already announced**, and
to give the second venue the identity it was never given. Everything below is scoped to that.

### Keep

| Thing | Why it stays |
|---|---|
| **`#124B2E` deep forest green** | The single largest piece of colour equity. It is declared as the theme's *black* and backs 66 sections across the site. It is unusual — most simulator venues are black/grey/neon — and it is the one value that already reads as "this brand." Kept verbatim, not adjusted. |
| **The dark, warm, pendant-lit photography** | The strongest asset the brand owns, full stop. One photographer, two sessions, measured: mean luminance 54–74/255, 33–38% of each frame near-black, every frame red-dominant over blue by +15 to +19, with the cool bright simulator projection as the only counterpoint. That warm-dark-room / cool-bright-screen contrast **is** the venue's visual signature and nothing in the current brand system reflects it. This direction makes it the organising idea. |
| **`#E5E1E0` greige** | Real, in use on 54 sections, and the right neutral against warm photography. Kept verbatim. |
| **`#9CBEAD` pale sage** | Kept verbatim as a value, but **demoted** — see below. |
| **Open Sans** | It works, it is on all 41 pages, and it has the weights. Replacing it buys warmth we can get more cheaply elsewhere. Kept, trimmed from 5 weights + 3 italics to 400/600/700 + one italic. |
| **The name "The Links" as parent** | Already decided by the client, already on the header, already backed by a purchased domain. |

### Retire

| Thing | Why it goes |
|---|---|
| **`#7794A6` slate blue as the action colour** | See §2.1. It fails WCAG AA, and it is doing the job **by accident**. |
| **`#9CBEAD` sage as a dark section background** | Squarespace serves sage as the `dark` section theme, which sets headings and body to white. **White on `#9CBEAD` is 2.02:1** — less than half the AA floor of 4.5:1. Only 2 sections use it, so the cost of removing it is nil. The value survives as a *light* field carrying forest-green text (5.01:1 ✓). |
| **`#3C4741`** | The one rogue author-picked hex, on two homepage H4s. `hsl(147°, 8%, 26%)` against the brand's `hsl(150°, 61%, 18%)` — the same hue with the life washed out of it. Someone reached for the colour picker instead of the palette swatch. Delete. |
| **Alfa Slab One in the web build** | See §3. It survives only inside the drawn wordmark. |
| **Poppins** | A whole typeface, self-hosted on all 41 pages, to set **one element** — the header `BOOK NOW!` button. Delete outright. |
| **The ornate "Lakeville Links" emblem as favicon and OG image** | The header shows the new *The Links* mark while the favicon and every social/SMS link preview on all 41 pages show the **old** emblem. Every share the business has ever generated previews the brand it is trying to leave. This is the highest-leverage single asset swap available. |
| **"Premier Indoor Golf"** | In the `siteTitle` and the suffix of all 41 `og:title`s. Banned vocabulary per `strategy.md` §2 and the playbook. |

### Add

| Thing | Why |
|---|---|
| **A warm ember as the action colour** (`#8A400A`) | The only net-new hue in the system, and it is not invented — it is the colour of the light already in every photograph. See §2.2. |
| **An amber highlight** (`#F3B268`) for dark fields | The pendant light itself. Dark surfaces currently have no accent at all. |
| **A deeper "night" green** (`#0D3520`) | The photography is near-black; `#124B2E` alone is not dark enough to sit convincingly beside it. Same hue, darker — not a new colour, a second stop on one ramp. |
| **A state palette** | Focus, error, success, disabled. The current system has none — there is no focus colour and no error colour anywhere in the theme. |
| **An SVG mark system covering all four names** | Zero SVG brand assets exist today. See §4. |
| **Stillwater photography** | See §5. |

**Net hue count: from 8 in real use down to 5 brand hues** (forest green, ember/amber warm,
greige neutral, sage, screen blue) **plus two state hues** (clay red, moss green). Three values
are deleted outright and the remaining warm family is consolidated from two accidental oranges
into one deliberate ramp.

---

## 2. The colour system

### 2.1 The slate blue does not survive — and here is the arithmetic

The inventory's most important colour finding is that because Squarespace aliases
`--safeLightAccent` and `--safeDarkAccent` to `--accent`, **every primary, secondary and tertiary
button on every one of the 41 pages is `#7794A6` with `#FFFFFF` text, regardless of section
theme.** The brand's action colour is a desaturated blue-grey.

Three reasons it goes, in order of severity:

1. **It fails accessibility, sitewide.** `#FFFFFF` on `#7794A6` is **3.20:1**. WCAG AA requires
   4.5:1 for body text and 3:1 for large text. The buttons are set in Open Sans 800 at 1.6rem
   uppercase — borderline large-text territory at best, and the secondary and tertiary buttons
   at 1.1rem and 1rem are unambiguously body text. So *every call to action on the site*
   fails AA, and the primary ones fail on a technicality at best. Flipping the label to the
   brand green instead does not save it: `#124B2E` on `#7794A6` is **3.17:1**. The colour cannot
   carry text of either polarity. It is not fixable; it is replaceable.
2. **Nobody chose it.** It is the resolved value of a CSS alias chain. There is no design file,
   changelog or comment in evidence for the palette at all — the inventory flags the whole
   palette's origin as unverified and worth asking the client about. A colour that arrived by
   aliasing has no equity to protect.
3. **It is the wrong temperature.** The brand's photography is measurably warm in every frame
   (R−B +15 to +19). A cool blue-grey is the one thing in the palette that contradicts the
   strongest asset the brand owns.

**But the hue is not worthless.** The inventory's photography analysis found exactly one cool
element in the entire corpus: the simulator projection — bright blue-sky-and-fairway imagery
punched into a near-black room, contributing a 7–8% blue band at 210–240°. That is a real,
specific, ownable thing. So the slate hue survives in **one darkened form, doing one job**:
`#2E5A6E`, the informational/status colour, never the action colour. `#FFFFFF` on it is
**7.49:1** ✓.

### 2.2 Where the ember comes from

The replacement action colour is `#8A400A`. It is the only genuinely new hue in this direction,
so it needs a defence rather than an assertion:

- **It is the light in the room.** The interiors are lit by warm pendant downlights over the
  bar against a black-painted ceiling, with no daylight; the measured dominant hue band in the
  wide interior frame is 30–60° amber. Adopting a warm action colour is transcribing the
  photography, not overriding it.
- **It has weak but real precedent in the existing identity.** The `LL Icon` mark is
  `#F49C4C`, hue 29° — and that is the one hex in the existing (otherwise fabricated) brand kit
  with any grounding at all. The ember is hue 25°; the amber highlight is hue 32°. They read as
  one family with the mark that already exists.
- **It is the complement of the equity colour.** Forest green sits at 150°. Warm orange at
  25–32° is very nearly its opposite, which is why the button will separate cleanly from a page
  that is otherwise green and neutral — the exact job the slate blue was failing to do.
- **It was tuned to the code, not eyeballed.** `#8A400A` is dark enough that white text clears
  AA both at rest **and** after the two hover mechanics this codebase actually uses
  (`hover:brightness-125` in `Button.astro`, `hover:opacity-90` in `BookButton.astro`). Most
  attractive oranges do not survive that. See §2.4.

**Honest caveat for the gate:** this is the one place where a strategist's judgement, not the
evidence, is load-bearing. The evidence says the slate must go and the brand is warm; it does
not by itself dictate *this* orange. If the client has an attachment to the sage or wants the
green to be the button, §2.5 records the fallback and its cost.

### 2.3 The roles

Roles, not swatches. Components reference the role; the value is an implementation detail.

**Surfaces**

| Role | Value | Job |
|---|---|---|
| `surface.base` | `#FFFFFF` | Page background |
| `surface.raised` | `#F7F5F3` | Cards, raised sections — barely warm, reads as paper next to the photography |
| `surface.alt` | `#E5E1E0` | Alternating light band (existing greige) |
| `surface.tintWarm` | `#F0DCC9` | Callouts, the seasonal featured-offer block |
| `surface.tintCool` | `#9CBEAD` | Light decorative field (existing sage, demoted) |
| `surface.dark` | `#124B2E` | The dark field (existing forest) |
| `surface.darkest` | `#0D3520` | Sections over or beside photography |

**Foregrounds — every pairing, with its computed ratio**

| Foreground | On | Ratio | AA |
|---|---|---|---|
| `ink.default` `#124B2E` | `#FFFFFF` | **10.14:1** | ✓ body |
| `ink.default` `#124B2E` | `#F7F5F3` | **9.32:1** | ✓ body |
| `ink.default` `#124B2E` | `#E5E1E0` | **7.81:1** | ✓ body |
| `ink.default` `#124B2E` | `#F0DCC9` | **7.62:1** | ✓ body |
| `ink.default` `#124B2E` | `#9CBEAD` | **5.01:1** | ✓ body |
| `ink.muted` `#456052` | `#FFFFFF` | **6.89:1** | ✓ body |
| `ink.muted` `#456052` | `#E5E1E0` | **5.31:1** | ✓ body |
| `ink.onDark` `#F7F5F3` | `#124B2E` | **9.32:1** | ✓ body |
| `ink.onDark` `#F7F5F3` | `#0D3520` | **12.48:1** | ✓ body |
| `ink.inverse` `#FFFFFF` | `#124B2E` | **10.14:1** | ✓ body |
| `accent.highlight` `#F3B268` | `#124B2E` | **5.49:1** | ✓ body |
| `accent.highlight` `#F3B268` | `#0D3520` | **7.35:1** | ✓ body |
| `surface.alt` `#E5E1E0` as text | `#0D3520` | **10.46:1** | ✓ body |

**Action and accent**

| Role | Value | Pairing | Ratio | AA |
|---|---|---|---|---|
| `primary.default` | `#8A400A` | `#F7F5F3` text on it | **6.85:1** | ✓ body |
| `primary.default` | `#8A400A` | `#FFFFFF` text on it | **7.45:1** | ✓ body |
| `primary.default` | `#8A400A` | as text on `#FFFFFF` | **7.45:1** | ✓ body |
| `primary.default` | `#8A400A` | as text on `#E5E1E0` | **5.74:1** | ✓ body |
| `primary.hover` | `#AD500D` | `#F7F5F3` text on it | **4.91:1** | ✓ body |
| `primary.active` | `#6D3308` | `#F7F5F3` text on it | **9.08:1** | ✓ body |
| `accent.default` | `#2E5A6E` | `#F7F5F3` text on it | **6.89:1** | ✓ body |
| `accent.default` | `#2E5A6E` | `#FFFFFF` text on it | **7.49:1** | ✓ body |
| `accent.highlight` | `#F3B268` | `#FFFFFF` text on it | **1.85:1** | ✗ **never** |
| `accent.highlight` | `#F3B268` | `#124B2E` text on it | **5.49:1** | ✓ body |

**States**

| Role | Value | Pairing | Ratio | Gate |
|---|---|---|---|---|
| `state.focus` | `#B85718` | vs `#F7F5F3` | **4.37:1** | ✓ 3:1 non-text |
| `state.focus` | `#B85718` | vs `#FFFFFF` | **4.76:1** | ✓ 3:1 non-text |
| `state.focus` | `#B85718` | vs `#E5E1E0` | **3.66:1** | ✓ 3:1 non-text |
| `state.focusOnDark` | `#F3B268` | vs `#124B2E` | **5.49:1** | ✓ 3:1 non-text |
| `state.focusOnDark` | `#F3B268` | vs `#0D3520` | **7.35:1** | ✓ 3:1 non-text |
| `state.disabledInk` | `#52685B` | on `#E5E1E0` | **4.64:1** | ✓ body (1.4.3 exempts it anyway) |
| `state.disabledInk` | `#52685B` | on `#FFFFFF` | **6.02:1** | ✓ body |
| `state.error` | `#A22C22` | on `#FFFFFF` | **7.19:1** | ✓ body |
| `state.error` | `#A22C22` | on `#F7F5F3` | **6.61:1** | ✓ body |
| `state.error` fill | `#A22C22` | `#F7F5F3` text on it | **6.61:1** | ✓ body |
| `state.errorOnDark` | `#F2A2A2` | on `#124B2E` | **5.05:1** | ✓ body |
| `state.success` | `#155E36` | on `#FFFFFF` | **7.82:1** | ✓ body |
| `state.success` | `#155E36` | on `#E5E1E0` | **6.02:1** | ✓ body |
| `state.successOnDark` | `#A8E0C0` | on `#124B2E` | **6.80:1** | ✓ body |

**Every text pairing specified above passes AA at the 4.5:1 body threshold.** Nothing in the
system relies on the 3:1 large-text allowance, so the palette cannot be broken by someone
setting a heading at 16px.

### 2.4 Three constraints the palette had to satisfy, which are not obvious

These come from reading the components that consume the tokens, and they eliminated most
candidate palettes before aesthetics got a vote.

1. **Hover states in this codebase are computed, not chosen.** `Button.astro` uses
   `hover:brightness-125`; `BookButton.astro` uses `hover:opacity-90`. A colour that passes AA
   at rest can fail on hover. `#8A400A` was selected as the darkest attractive ember whose
   *brightened* form still clears AA: `#F7F5F3` on `brightness-125(#8A400A)` = **4.91:1** ✓.
   A more obvious, prettier orange like `#B85718` collapses to **3.20:1** under the same hover
   and would have shipped a failure that only appears under the cursor.
2. **A solid action button cannot sit on a near-black green field.** This is arithmetic, not
   taste. White text at 4.5:1 forces the fill's relative luminance below **0.183**; a 3:1 boundary
   against `#124B2E` (L = **0.054**) forces it above **0.261**. There is no value satisfying both.
   `#8A400A` against `#124B2E` is **1.36:1** and against `#0D3520` is **1.82:1** — invisible.
   **Rule, therefore: solid primary buttons live on light surfaces. On dark fields the CTA
   inverts** to a `#F7F5F3` fill with `#124B2E` text (**9.32:1** ✓) or a paper outline. This is
   a real design rule with a real reason, and the current site violates it constantly.
3. **Opacity is not a colour ramp.** Several components set secondary text with `text-ink/70`.
   `#124B2E` at 70% over white computes to `#59816D` = **4.39:1** — it misses AA. That is why
   `ink.muted` (`#456052`, 6.89:1) exists as an explicit token. See §8.

### 2.5 The fallback, if the client rejects the ember

The alternative is: **primary = `#124B2E` forest green** (white text 10.14:1 ✓), with the amber
kept only as a dark-field highlight. It is safe, it passes everything, and it costs nothing to
implement — the slot swap is one line.

What it costs: the action colour and the body-text colour become the same value, so nothing on
the page is coloured *because it is clickable*. On a site whose entire strategy is "two clicks
to book from anywhere" (`strategy.md` §4) that is a real, if unmeasurable, conversion tax. Put
the choice to the client as a choice, not as a default.

---

## 3. Type

### 3.1 Alfa Slab One: the honest assessment

It is running h1–h4 on all 41 pages, at h1 6.4rem down to **h4 1.4rem**, with
`text-transform: none`. Four separate problems, in descending order of severity:

1. **It ships one weight.** 400. No 500, no 700, no italic. Every emphasis in a heading, every
   bold button label, every `<strong>` inside a display line is therefore **synthetically
   bolded** by the browser — smeared, uneven, and on a face this heavy already, close to
   illegible. This codebase's `Button.astro` literally sets `font-mono font-bold`, so the CTA
   label is synthetic-bold display type on every page.
2. **It does not work small.** Alfa Slab One is a poster face: very heavy stems, abrupt bracket
   transitions, tight apertures, small counters. At h4 (1.4rem) and on a 375px-wide phone where
   an h2 wraps to three lines, the counters in *a*, *e*, *s* close up and the line reads as a
   black bar. The face was drawn to be seen at 60px and up; it is being asked to do 14px.
3. **It cannot carry the range.** A hospitality site needs eyebrows, subheads, table headers,
   card titles, badges and button labels. One weight of a poster slab covers exactly one of
   those. That is why Poppins exists on the site at all — the system needed a face it could set
   a button in, and reached outside for it.
4. **It is loud, not warm.** The segment's winning register is *warm and slightly irreverent*
   (`playbook-sim-venue.md` §2: *"Trash talk encouraged." "Not bar food."*). Alfa Slab One is
   emphatic — fairground, craft-beer-label, sports-poster. Emphasis is not warmth, and it has
   no register below "shouting." It is also among the most-deployed display faces on the open
   web, so it contributes no distinctiveness in exchange.

**Verdict: retire it from the web build.** Not because it is a bad typeface — it is a good
poster face — but because it is being asked to be a type *system* and it is a single style.

### 3.2 The recommendation

| Role | Face | Weights | Why |
|---|---|---|---|
| **Display** — h1–h4, card titles, button labels, stats | **Bitter** | 500 / 700 / 800 | Keeps the **slab genus**, so the change reads as finishing the rename rather than starting a third brand. Unlike Alfa Slab One it was drawn for screen text, so the same face works at a 64px hero and a 14px table header. Variable 300–800: the entire ladder, plus a real bold for buttons, from **one file**. |
| **Body** — copy, nav, forms, tables | **Open Sans** | 400 / 600 / 700 + italic | Retained. It works, it is already everywhere, and it has the weights. Changing it is cost without return. |

Fallback stacks (shipped in `tokens.css`), chosen so a swap does not change the *genus* and
therefore does not reflow dramatically:

```
display: 'Bitter', ui-serif, Georgia, 'Iowan Old Style', 'Times New Roman', Times, serif
body:    'Open Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto,
         Helvetica, Arial, sans-serif
```

**Note on where the warmth lives.** This is a deliberate split, not a hedge: **the type carries
warmth and confidence; the copy carries the irreverence.** A typeface that is itself jokey ages
badly and cannot set a rates table. The `/our-story` voice (§6) is where the personality
belongs, and it is free.

**Three rules that come with the face:**

- Headings stay **sentence case** — `text-transform: none`, as the current site already does
  correctly. Do not introduce all-caps headings; the segment is full of them and they read as
  shouting, not confidence.
- Display below 1.125rem is **body face, not display face**. Eyebrows and labels are Open Sans
  600 with letter-spacing, never a small slab.
- Numbers — rates, hours, league fees — are set in the **body** face. Tabular figures beat
  display personality in a price table every time, and prices-as-HTML-text is on the critical
  path (`strategy.md` §4).

### 3.3 Loading strategy

The site must serve crawlable HTML fast, and this is a static Astro build, so the whole point is
that nothing blocks first paint.

- **Self-hosted, no CDN.** Both families are served from `public/fonts/` on this origin. There
  is **zero** external font request. This preserves a property the current Squarespace site
  already has — the inventory confirms no Google Fonts link, no Typekit, no external font host
  anywhere in 41 pages. It also removes a third-party DNS lookup + TLS handshake from the
  critical path and eliminates a privacy/consent surface.
- **`font-display: swap` on every face.** Text paints immediately in the fallback and reflows
  when the face lands. The HTML is never blocked on a font, which matters for both Core Web
  Vitals and for AI crawlers that do not execute or wait.
- **Variable fonts, unicode-range sliced.** One file per family covers the whole weight range,
  so weights are free. Latin critical path: **33 KB display + 42 KB body = 75 KB** for two
  files. Latin-ext and italic are separate `unicode-range` slices and are only fetched by pages
  that contain those characters.
- **Weight discipline.** Six weights total across two families, down from a live site loading
  Open Sans at 5 weights + 3 italics, Alfa Slab One, *and* Poppins.

---

## 4. The two-venue identity

### 4.1 The problem, restated precisely

- **Three logo lockups exist and they share no artwork, no type and no construction.** #1 the
  white horizontal "THE LINKS / PREMIER INDOOR GOLF" wordmark; #2 the ornate vertical "LAKEVILLE
  LINKS" emblem with crossed irons and a didone wordmark; #3 a flat orange ball-and-chevron icon.
- **The two names the owners actually announced have no artwork at all.** "The Links of
  Lakeville" and "The Links of Stillwater": zero marks.
- **There are no SVG brand assets.** A scan of all 41 pages returns zero on the site's own CDN.
  The best available source is a 1842×713 PNG with clean alpha — fine for large display, unusable
  for favicons, signage, embroidery, single-colour print or dark-on-light.
- **The header mark is white-only.** On the default-white and `light` (`#E5E1E0`) section themes
  the site has no logo it can place.
- **The favicon and the OG image show the *old* emblem** — on all 41 pages. Every link anyone
  has ever shared previews the brand being retired.

### 4.2 The call: a one-mark endorsement system

**"The Links" is the mark. The venues are typographic endorsements, not separate marks.**

Concretely:

```
THE LINKS                          ← the mark. Owns all equity. Used alone
                                     wherever the venue is not the subject.

THE LINKS                          ← venue lockup. Same mark, unchanged, with a
─────────────                        rule and the venue line beneath in the body
OF LAKEVILLE                         face, 600, letterspaced. Never redrawn.

THE LINKS
─────────────
OF STILLWATER
```

Why an endorsement system and not two sibling marks:

- **It is the cheapest way to finish the rename.** The parent mark already exists and is already
  deployed on 41 pages. Adding a typeset descriptor line is one afternoon's work, not two logo
  projects.
- **It makes Stillwater legitimate immediately.** Stillwater's problem is not that it lacks a
  distinctive mark — it is that it has *nothing*. An endorsement lockup gives it parity with
  Lakeville on day one and inherits four years of Lakeville's recognition rather than starting
  from zero.
- **It matches the site architecture.** `current-site-audit.md` §5 recommends a location-neutral
  hero with the venue chosen at the booking boundary, and one page per *topic* with a venue
  dimension. Two competing marks would fight that; one mark with a venue line expresses it.
- **The alternative fails the two-venue test.** Two distinct venue marks means every shared
  page, every ad, every gift card has to pick one or show both. With eight or more venues that
  is a system; with two it is just a fork.

**The wordmark keeps its slab.** The existing "THE LINKS" artwork — condensed slab caps with a
golf ball on a tee substituted into the "I" — is the one piece of the new identity that shipped,
and the ball-in-the-I is a genuinely good idea. **Redraw it, do not replace it.** The redraw
fixes what is broken (no vector, white only, no small-size version) without discarding what is
recognised. Alfa Slab One retires from the *web build* but the wordmark stays a slab, which is
why Bitter is the right web display face: the page type and the logo stay the same genus.

### 4.3 The lockup system to commission

| # | Asset | Spec |
|---|---|---|
| 1 | **Primary horizontal** — `THE LINKS` | SVG. Redrawn from the existing white PNG, outlines only, no live text. |
| 2 | **Venue lockups ×2** — `THE LINKS / OF LAKEVILLE`, `THE LINKS / OF STILLWATER` | SVG. Primary mark + rule + venue line. Horizontal and stacked variants. |
| 3 | **Colour variants ×4 per lockup** | Forest `#124B2E` on light · Paper `#F7F5F3` on dark · Solid black · Solid white. The dark-on-light variant is the one that does not exist today and the one the new site needs most, since the majority of sections are light. |
| 4 | **Small-size / compact mark** | The ball-on-tee element alone, or `TL` monogram, drawn to hold at **16px**. Drives the favicon, the app icon, the map pin and the social avatar. The current favicon is the ornate emblem circle-cropped to 50×50 and the inventory records it as *illegible at size*. |
| 5 | **Favicon set** | `favicon.svg` + 32/180/192/512 PNG + `site.webmanifest`, generated from #4. Replaces the old-brand favicon on every page. |
| 6 | **Open Graph images ×3** | One parent, one per venue, 1200×630. Each = the correct lockup over that venue's own photography. **Blocking for Stillwater until the shoot lands** (§5) — do not ship a Stillwater OG image built from Lakeville frames; the site already does that on `/bookingstillwater` and it is one of the audit's findings. |
| 7 | **Clearspace + minimum-size rules** | One page. Clearspace = the cap-height of the "L". Minimum widths: primary 120px, venue lockup 180px (below that the descriptor line closes up), compact mark 16px. |

### 4.4 What must not happen

- **Do not commission a Stillwater-specific emblem.** It re-creates the exact problem being
  fixed and gives the newer, weaker venue a mark that inherits nothing.
- **Do not retire the ornate "Lakeville Links" emblem quietly.** It is four years of local
  recognition and it is on the door. Recommendation: **retire it from all digital surfaces
  immediately** (favicon, OG, header, print collateral) and let it live out its life on existing
  physical signage until that signage is replaced on its own schedule. Say this to the client
  explicitly — a rebrand that appears to erase the original venue's identity is how rebrands get
  reversed.
- **Do not ship the wordmark as live text in a font.** It must be outlines.

---

## 5. Photography direction

### 5.1 The register to hold

The existing professional shoot is the brand's best asset and it already has a defined,
measurable look. Any new photography matches these characteristics, which are stated as targets
because they were measured off the existing frames, not invented:

| Property | Target | Measured on existing frames |
|---|---|---|
| Exposure | Dark. Mean luminance ~55–75 / 255 | 54–74 |
| Near-black coverage | ~⅓ of frame | 33–38% |
| Colour temperature | Warm. Red channel exceeding blue by 15–20 | +15 to +19 |
| Light source | Practical, in-frame, warm — pendants over the bar, bay spill. No daylight, no flash | as shot |
| The one cool note | The simulator projection, bright, ~7–8% of saturated pixels in the 210–240° band | as shot |
| Format | Full-frame, ≥4500px long edge | 6000×4000 / 5648×3765 / 4549×3033 |

**The one-sentence brief for any photographer: a warm dark room with one bright screen in it.**
Do not light the room. The room's darkness is the product — it is what makes an indoor space
in January feel like somewhere you chose to be rather than somewhere you settled for.

### 5.2 What is missing, and what the Stillwater shoot must capture

The Stillwater situation, precisely: **one** usable Stillwater interior photograph exists — a
Pixel Night Sight phone frame dated six days before the venue opened — and it is on
`/our-story`, not on either Stillwater page. `/stillwater` has a Facebook-post graphic and the
site chrome. `/bookingstillwater` is illustrated with 2022 **Lakeville** assets. Stillwater has
zero professional photography and zero venue photography on its own pages.

The shoot list, in priority order. Same photographer as the `JWAT` series if at all possible —
matching the register is worth more than any single frame:

1. **Wide interior, evening, occupied.** The equivalent of `JWAT3647`. This is the hero and the
   OG image. It must answer "what is this room" in one frame.
2. **A bay with the projection lit and a person mid-swing.** The equivalent of `JWAT6238` — the
   warm/cool contrast shot. This is the single most important frame in the set.
3. **The lounge as it actually is** — tan leather sofas, the marble-top round table, four bays
   behind black curtains. The layout differs from Lakeville and that difference is an asset:
   Stillwater is a **lounge**, Lakeville is a **bar**. Shoot the difference, do not hide it.
4. **The Stillwater Bowl adjacency.** The F&B comes from next door. That is either a limitation
   or a feature depending entirely on whether there is a photograph of it. Get the photograph.
5. **Two to three group / event frames.** Real people, not staged models. The Events page is the
   highest-value page per visit in the segment and the playbook requires photos of an actual
   event.
6. **Food and drink, re-shot in the venue's own light.** The existing food photography
   (`IMG_3146`, pizza on a steel counter, mean RGB 159/126/88, R−B **+71**, luminance 131/255)
   is bright, hard, overhead kitchen light. It sits beside the moody interiors with no visual
   bridge at all. Shoot food **at the table, in the room, at night**, under the pendants.
7. **One exterior at dusk, sign lit.** Local search and "am I at the right door" both need it.
8. **Two to four portraits** — instructors and staff, in the room, available light.

**Also required, and cheap: re-shoot Lakeville's food** to the same brief. It is the one place
where the existing library breaks its own register.

### 5.3 Usage rules

- **Photography is the dark surface.** Where a section needs to be dark, prefer a photograph
  with a `#0D3520`/`#124B2E` overlay over a flat colour fill. The room is more interesting than
  the swatch.
- **Text over photography needs a scrim, and the scrim is not optional.** State the overlay
  opacity and verify contrast against the *lightest* region of the frame, not the average.
- **Never illustrate one venue with the other's photography.** The site does this today on
  `/bookingstillwater` and it is a trust defect, not a styling one.
- **No AI-generated imagery.** The audit found exactly one AI image on the whole site and the
  photography's credibility is the asset. Do not spend it.
- **Screenshots are not photography.** The 23 GolfZon course screens are product evidence for
  `/simulators`. They do not go in a hero.

---

## 6. Voice

**Three lines:**

1. **We are a room you want to be in, that happens to have golf in it.** Lead with the evening,
   not the equipment. The buyer is often not a golfer.
2. **Say the actual number.** Prices, hours, bay capacity, the cancellation window — plainly, in
   text, before anyone has to ask. Publishing them is the differentiator; only ~25% of the
   segment does it at all.
3. **Sound like the two guys who wrote `/our-story`.** That voice already exists, it is genuinely
   good, and it is on exactly one page. It is warm, specific, self-deprecating, and never makes
   the reader feel unqualified. Spread it; do not reinvent it.

**Banned outright:** *premier*, *state-of-the-art*, *ultimate*. They saturate the corpus, carry
no information, and "Premier Indoor Golf" is currently in every one of the 41 page titles.
Also banned: exclamation points in headings, and any construction implying the reader already
golfs.

### The five, from their own copy

| # | Don't (live on the site today) | Do | Why |
|---|---|---|---|
| 1 | `Lakeville Links Premier Indoor Golf` — the `siteTitle`, and the suffix of all 41 `og:title`s | `The Links of Lakeville — Indoor Golf & Bar, Lakeville MN` | "Premier" is banned and carries nothing. The replacement finishes the rename, names the category, and puts the town in the title — 56% of the segment has no geo cue at all. |
| 2 | `<h3>` **"Hours Subject to Change without Notice."** — set in the display face at 2.5rem, and it is the **third heading on the homepage** | Publish the actual hours per venue in a table, then, in body text: *"Hours shift with the season — these are current for [month, year]."* | The highest-traffic page's third-loudest statement is a liability disclaimer. Defensive copy promoted to display type reads as an apology for the business. |
| 3 | `<h1>` **"Fun. Competive."** — a live typo, in an H1, on the leagues page | *"Leagues you can actually get into."* | Beyond the typo: two abstract adjectives say nothing a competitor could not also say. Leagues are the highest-value retention surface on the site and it is currently a placeholder. |
| 4 | `<h3>` **"Stillwater Minnesota!!"** and `<p>` *"1 delicious pizza to fuel your game-day energy"* / *"8 ice-cold domestic beers"* | *"Now open in Stillwater — four bays, leather sofas, and the bowling alley's kitchen next door."* | Promo-flyer register: double exclamation points and food-ad adjectives. The specific fact is more appetising than the adjective, and it is the only version a competitor cannot copy. |
| 5 | **13 different phrasings of one action** across 41 pages — `BOOK NOW!` ×120, `Book Tee Time`, `Grab a Tee Time`, `Book a Bay`, `BOOK A SIMULATOR BAY`, `ACKNOWLEDGE AND GO TO BOOKING`… | **`Book a Bay`** everywhere, in sentence case, with the destination named when it leaves the site: `Book at Lakeville →` | One name for one action. "Bay" is also the honest unit — people buy an hour in a bay, not a tee time. And `ACKNOWLEDGE AND GO TO BOOKING` is a button that exists to apologise for the vendor; delete the interstitial rather than write better copy for it. |

**And the counter-example — this is the target, verbatim from `/our-story`:**

> *"…golf season disappeared into six feet of Minnesota sadness… we kept the Wednesday tradition
> alive with what we called 'bourbon nights.'"*
>
> *"Apparently having multiple locations means you're supposed to look professional or something."*

Specific, local, funny, and it never once claims to be premier. This is the register. It is also
worth telling the client plainly: **the best writing on their website is already theirs.**

---

## 7. What must be commissioned

Costed by effort, not currency — the numbers are working days for a competent supplier. Ordered
by whether the launch is blocked without them.

### Blocking — the site cannot launch correct

| # | Item | Effort | Notes |
|---|---|---|---|
| 1 | **SVG logo set** — primary + 2 venue lockups, 4 colour variants each, compact mark, clearspace sheet | **2–3 days**, designer | Redraw from `White Links Logo.png` (1842×713, clean alpha). If the owners hold the source `.ai` — the `-01` export suffix on the ornate mark suggests one exists for *that* mark at least — this drops to ~1 day. **Ask before commissioning a redraw.** |
| 2 | **Favicon + app-icon set** | **0.5 day** | Derived from #1's compact mark. Replaces the illegible old-brand favicon on every page. |
| 3 | **Stillwater photo shoot** — the 8-item list in §5.2 | **1 shoot day + 2 days edit** | Same photographer as the `JWAT` series if reachable. Genuinely blocking: Stillwater cannot launch with zero venue photography, and the current fallback is Lakeville's 2022 assets. |
| 4 | **Open Graph images ×3** | **0.5 day** | Each = correct lockup over that venue's own photography. Stillwater's is gated on #3. |

### High value, not blocking

| # | Item | Effort | Notes |
|---|---|---|---|
| 5 | **Lakeville food re-shoot** | **0.5 day**, bolt onto #3 | The existing food photography breaks the brand's own register (R−B +71 vs the interiors' +18). |
| 6 | **Lakeville top-up shoot** — winter/evening frames, event frames, current staff | **1 day** | The existing shoot is strong but is 2022-era and has no event coverage. |
| 7 | **Brand one-pager** — palette, type, lockups, voice, do/don't | **1 day** | So the client's own social and print stop drifting. This is what the fragmentation costs when nobody has a reference. |
| 8 | **Sponsor-logo treatment** | **0.5 day** | Six advertiser palettes (`#03024E`, `#FFFC00`, `#344074`, `#7FBC54`, `#595A5C`, `#103C63`) sit on the live homepage. Normalise to single-colour marks on a neutral band. The relationships are real local proof and worth keeping — the colour chaos is not. |

### Client decisions, not commissions — zero cost, blocking

| # | Decision | Why it is here |
|---|---|---|
| 9 | **Reverse the `thelinks.golf` redirect.** | It currently 301s *away* from the parent brand into the child venue. `strategy.md` §2 calls this the single highest-leverage fix available and it costs nothing. The identity system in this document assumes the parent brand is the domain. |
| 10 | **Confirm the palette's provenance.** | The inventory flags it as unverified and possibly a Squarespace stock palette. If the green was deliberate, this direction is a refinement. If it was stock, the client should know they are keeping it because it works, not because it was chosen. Either answer is fine — an unasked question is not. |
| 11 | **Confirm the retirement plan for the ornate emblem.** | Digital now, physical on its own schedule. §4.4. |
| 12 | **Confirm the ember, or take the fallback.** | §2.5. This is the one call in the document that judgement, not evidence, decides. |

---

## 8. Implementation notes

**Shipped in this pass:**

- `src/styles/tokens.css` — all 11 colour slots remapped, semantic aliases repointed, state
  tokens added, both font stacks set, `@font-face` for two self-hosted variable families. Slot
  **key names are unchanged**; `global.css` is untouched.
- `public/fonts/` — six `.woff2` slices, no external CDN request.
- `marketing/websites/the-links/design/tokens.json` — the durable DTCG artifact.

**Slot map** (the slot names are neutral; read the value, not the key):

| Slot | Value | Role |
|---|---|---|
| `--brand-soft-black` → `--brand-ink` | `#124B2E` | Forest — ink and dark field |
| `--brand-off-white` → `--brand-surface` | `#F7F5F3` | Paper — raised surface, and `text-surface` on dark fills |
| `--brand-grape` → `--brand-primary` | `#8A400A` | Ember — the action colour |
| `--brand-teal` → `--brand-accent` | `#2E5A6E` | Screen blue — informational/status |
| `--brand-blue` | `#0D3520` | Night green — deepest field |
| `--brand-pink` | `#E5E1E0` | Greige — alternating light band |
| `--brand-mint` | `#9CBEAD` | Sage — light decorative field |
| `--brand-banana` | `#F3B268` | Amber — highlight, **dark fields only** |
| `--brand-lavender` | `#F0DCC9` | Ember tint — warm light field |
| `--brand-gold` | `#B85718` | Ember mid — focus ring, **not a text-bearing fill** |
| `--brand-watermelon` | `#A22C22` | Clay — error |
| `--brand-font-mono` | Bitter | **The display slot.** `global.css` maps it to `font-mono`, which every heading and button label in this codebase uses. It is not a monospace slot. |
| `--brand-font-sans` | Open Sans | Body, nav, forms, tables |

**Three findings for whoever owns `src/components/` — not fixed here, out of scope:**

1. **`text-ink/70` misses AA.** `#124B2E` at 70% over white computes to **4.39:1**. It is used
   for nav links, footer addresses, table cells and form blurbs. Fix: use
   `text-[color:var(--brand-ink-muted)]` (`#456052`, **6.89:1**), or raise the opacity to 75%
   (**5.03:1**). `text-ink/60`, `/50` and `/40` are further below the line and should not carry
   any text a user needs to read.
2. **`bg-primary` on a dark section will be invisible.** §2.4 item 2 — the arithmetic makes it
   unavoidable. `BookButton` on a forest or night field must use `variant="outline"` with a
   paper border/text, or a paper fill with `text-ink`. The current `outline` variant sets
   `text-ink`, which is the dark green — it is only correct on light surfaces.
3. **`hover:brightness-125` is contrast-relevant.** It is safe with the shipped ember (4.91:1)
   and with the clay error (4.69:1), but it is **not** safe with `--brand-gold` `#B85718`
   (**3.20:1** after brightening). Gold is a border/ring token; do not turn it into a button
   fill.

---

## 9. What this document does not settle

- Whether the existing palette was ever a deliberate choice. Flagged unverified in the
  inventory; asked as decision #10.
- Whether vector source art exists off-site for any mark. If it does, commission #1 halves.
- Which venue is the growth priority (`strategy.md` §7.1). The endorsement lockup system treats
  the venues as peers. If the business does not, the photography and OG budget should skew and
  this document should be revisited — but the mark system does not need to change.
- The exact ember, if the client has a view. §2.5.
