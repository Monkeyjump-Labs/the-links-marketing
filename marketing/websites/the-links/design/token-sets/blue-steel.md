# `blue-steel` — round 2 palette direction

> Design-factory round 2 · candidate `home-blue-steel` · 2026-08-02
> Artifact: [`blue-steel.json`](blue-steel.json) · Preview: [`../candidates/home-blue-steel.html`](../candidates/home-blue-steel.html)
> Base composition: `home-brutalist.html` + [`brutalist.json`](brutalist.json), plus the
> softening delta specified centrally in [`../RUN.md`](../RUN.md).
> Register is **fixed** for this round (softened brutalist). The only variable is colour.
>
> **Status: PROPOSAL.** Not shown to and not approved by the client.
> Every ratio below was computed from sRGB relative luminance per WCAG 2.1 §1.4.3. None is
> estimated or recalled.

---

## 1. The one committed idea

**Blue is the atmosphere, not the accent.**

Every ground, ink, border and grey on this page is one cool hue. There are no greys in the
system at all — only steel at nine lightnesses, all within ±5° of `palette.screen`'s 199°.
Nothing on this page is blue *because blue is the brand colour*; it is blue because that is
the temperature of the one light source the venue actually owns. The entire heat budget is a
single warm hue, spent at full strength in one place.

A sibling will hand blue a **job** — a button, a band, a highlight — and keep a warm or neutral
chassis underneath it. This candidate refuses to make blue an accent at all. Blue never appears
as a coloured *element* anywhere on the page, because it is the substrate. The only things that
read as "coloured" are the ember band, the amber on the dark fields, and the forest green on the
two venue names.

**The risk this takes:** restraint can read as absence. A reviewer who wants to *see* a brand
colour will find this quiet. That is the trade, and it belongs at the gate.

---

## 2. The palette

### The steel ramp — one hue, nine lightnesses

| Token | Value | Hue | L\* | Sat | Job |
|---|---|---|---|---|---|
| `steelNight` | `#0B1F2A` | 201° | 10.4% | 58% | The page's black. Chrome, hero, jobs, footer. |
| `steelDeep` | `#12303F` | 200° | 15.9% | 56% | Media-slot room mass only. |
| `screen` | `#2E5A6E` | 199° | 30.6% | 41% | **Retained verbatim** from `tokens.json`, and promoted to the ramp's anchor. |
| `steelMist` | `#9DB9C6` | 199° | 69.6% | 27% | Muted text and quiet rules on dark. |
| `screenLight` | `#C3DCE8` | 200° | 83.7% | 45% | **The projection.** The token round 1 flagged and did not add. |
| `steelFog` | `#DFE5E9` | 204° | 89.4% | 19% | Light alt field, decorative texture. |
| `steelChalk` | `#F3F6F7` | 195° | 96.1% | 20% | The off-white. Text on every dark and every warm fill. |
| `white` | `#FFFFFF` | — | 100% | — | Retained. The page ground. |
| `steelInk` | `#173C4D` | 199° | 19.6% | 54% | Body on light. |
| `steelMuted` | `#4A6473` | 202° | 37.1% | 22% | Meta, captions, placeholders on light. |

The ramp is **derived from an existing token, not from the photograph again.** `palette.screen`
is already the brand's justified trace of the measured 210–240° cool band in the simulator
projection, darkened until white text passed. This overlay extends that one value into a full
system rather than starting over — provenance over invention.

### The one warm hue — retained verbatim

`ember #8A400A` · `emberHover #AD500D` · `emberActive #6D3308` · `emberMid #B85718` ·
`amber #F3B268`.

Not replaced, and deliberately so. The ember is the only value in the whole system with a
**measurement** behind it: every frame of the existing shoot is red-dominant over blue by +15 to
+19, lit by warm pendants over the bar with no daylight (`brand-direction.md` §2.2). Coining a
prettier orange to sit against a new blue is exactly the invention this direction argues against.

**The hover arithmetic, re-verified against the new neutral:**
`steelChalk #F3F6F7` on `emberHover #AD500D` = **4.92:1** ✓ — round 1's `paper #F7F5F3` measured
4.91:1, so swapping the warm off-white for a cool one at the same lightness costs the hover
nothing. `steelChalk` on `emberActive` = 9.09:1 ✓. `white` on `emberHover` = 5.34:1 ✓.

**Why the warm is two values and not one.** One warm *hue*, at exactly two lightness stops,
because a single value provably cannot serve both grounds. `brand-direction.md` §2.4.2: white
text at 4.5:1 forces a fill's relative luminance below 0.183, while a 3:1 boundary against a
near-black ground forces it above 0.261. No value satisfies both. Ember carries light grounds;
amber carries dark. Arithmetic, not a second accent.

---

## 3. What happened to forest green

**Verdict: DEMOTED, not retired — and given one job it could never do before.**

`palette.forest #124B2E` is the live theme's declared *black* (`--black-hsl: 149.47, 61.29%,
18.24%`) and backs 66 sections. It is the brand's one piece of real colour equity. In this
overlay its **value is untouched** and its role collapses to a single semantic:

> `role.equity.venueName` — the colour of a **venue's name**, and nothing else.

On the homepage that is six places: the two trust-strip venue links and their 1px underlines,
and the two `<h3>`s in "Two venues".

**Why this beats keeping it.** As the theme's black, forest was the *substrate* — which meant the
brand's equity colour could never appear ON a dark field, because forest against its own
near-black sibling is 1.36:1. It was everywhere and it signified nothing. In a steel system it is
the only non-cool, non-warm value on the page, so the eye reads it as a **category**: green means
*this place has a name*. That is a direct answer to screen-spec §10.4 ("nothing on the page ever
visually says The Links **of Lakeville**") and to `brand-direction.md` §4.2's endorsement system.
It is the first time the equity colour does work rather than being the floor.

**Why this beats retiring it.** Retiring it spends four years of the only real colour equity the
brand has, to buy a hue that entered the system this morning. A one-role demotion keeps the
equity legible on the page's most-read block at a cost of zero new values.

**The constraint this imposes, and it is arithmetic.** Forest is a **light-ground-only** colour
here: vs `steelNight` 1.67:1, vs `steelDeep` 1.36:1, vs `screen` 1.35:1, vs `ember` 1.36:1 — all
far below the 3:1 non-text gate. So on the dark bands the venue name takes **amber** instead
(`role.equity.venueNameOnDark`, 9.15:1) — which is why the footer lockups read
`THE LINKS / of Lakeville` in amber, not green. Recorded as a rule so nobody reintroduces a green
mark on a steel field.

**Honest cost.** Six appearances is thin, and a reviewer is entitled to say so. The counter is
that six deliberate appearances of a colour that *means* something beat 66 sections of a colour
that means "background".

**One consequence to flag:** with forest demoted, `moss #155E36` (the success state) and forest
now sit 2.4° apart in hue and do two different jobs. One of them should go in the convergent
merge, and it should not be forest.

---

## 4. The gap this direction closes

`RUN.md` finding 2 — *"the palette cannot render its own brief."* `brand-direction.md` §5.1 says
the venue's signature is **"a warm dark room with one bright screen in it"**, but the only cool
value in the canonical palette measured **1.81:1** against `palette.night`. A simulator
projection painted in it is invisible on the dark ground it is supposed to punch out of. Round 1
proposed `palette.screenLight`, did not add it, and had to fake the projection in
`palette.greige`.

This overlay adds `palette.screenLight #C3DCE8` **under exactly the name round 1 proposed**, and
measures it:

| | Round 1 | This candidate |
|---|---|---|
| The bright cool value on the dark ground | `screen` on `night` — **1.81:1** ✗ | `screenLight` on `steelNight` — **11.84:1** ✓ |
| How the projection was drawn | a greige stand-in (10.46:1) — the right *brightness*, the wrong *temperature* | the actual cool value, at the actual brightness |

So the Lakeville media slot now renders the brief literally — a near-black cool room, three warm
pendant pools, the projection's spill on the walls, and one bright cool panel that is the
brightest thing in the frame — with no substitution anywhere. **This is the one thing this
direction can demonstrate that a warm-based sibling structurally cannot.**

Second-order effect worth naming: because the ground *is* the cool value now, the warm accent
stops competing with it. In the canonical system ember and screen are both "a colour on white"
and read as two accents. Here ember is the only accent, and screen has become the room.

---

## 5. Keeping a cool-neutral system from reading as cold or undesigned

This is the specific failure mode of this direction, so it was designed against on six axes:

1. **Saturation, not grey.** The classic failure is a desaturated ramp that reads as unpainted UI
   chrome. This ramp is saturated where it matters: 58% at `steelNight`, 56% at `steelDeep`, 41%
   at `screen`, 45% at `screenLight`, 27% at `steelMist`. Only the two lightest steps drop to
   19–20%, where saturation would tint paper. Every dark value on the page is unmistakably
   **blue**, not grey.
2. **One hue, nine lightnesses.** A cool system reads as undesigned when its neutrals wander in
   hue. This one cannot — the whole ramp spans 195–204°.
3. **The largest chromatic event on the page is warm.** The full-bleed ember band is unchanged
   from round 1 and is *louder* here than it was against green, because it is now the only warm
   field on an entirely cool page. One warm room in a cold building is the photographic brief,
   rendered as page structure.
4. **Every dark band has warm light in it.** Amber sets the hero eyebrow, the score rules, the
   on-dark CTA fill, the reassurance line, the footer lockup rules and the pendant marks. The dark
   bands are not blue rectangles; they are cool rooms with warm light in them — which is exactly
   what the photographs are.
5. **The light end is barely cool.** `steelChalk` is 20% saturation at 96% lightness — a hair off
   white. The light grounds read as paper lit by the same room, not as a blue wash. This is the
   most important restraint in the whole overlay: **tint the darks hard, tint the lights almost
   not at all.**
6. **Green is still there, meaning something.** Three colour categories, not one hue and an
   accent: steel = everything, warm = action, green = place.

---

## 6. Kept vs. replaced

### Kept verbatim
| Thing | Why |
|---|---|
| `palette.screen #2E5A6E` | Value untouched, and **promoted** from "informational/status only" to the anchor the whole ramp derives from. |
| The entire ember/amber family | The only measured colour in the system. Replacing it would be the invention this direction argues against. |
| `palette.forest #124B2E` | Value untouched; role reduced (§3). |
| `palette.clay`, `palette.moss`, `palette.white` | State hues and the page ground. |
| `space.section*` / `gutter*`, `size.contentMax` / `proseMax` | Layout is fixed on this axis. |
| The whole `typeScale` / `tracking` / `lineHeight` ramp | The delta forbids a scale change. Byte-identical to `brutalist.json`. |
| `elevation.none`, `motion.duration 0ms` | No shadows, nothing moves. Adding a transition would be softening past the instruction. |
| Archivo + Open Sans type proposal | The register is fixed for round 2; the type proposal travels with it. |

### Replaced
| From | To | Why |
|---|---|---|
| `night #0D3520` | `steelNight #0B1F2A` | The page's black had to become cool for the direction to exist. Bonus: white on it is 16.89:1 vs 13.57:1 — the type gets louder for free. |
| `paper #F7F5F3` | `steelChalk #F3F6F7` | A barely-*warm* off-white contradicts a cool system; the replacement is a barely-*cool* one at the same lightness, so inherited ratios move by <0.02. |
| `greige #E5E1E0` | `steelFog #DFE5E9` | Same lightness, on the ramp's hue. |
| `sage #9CBEAD` | `steelMist #9DB9C6` | Sage is a green light field; mist is its steel equivalent — and measures *better* on the new ground (8.19:1 vs sage's 6.71:1 on the old night). |
| `ink.bodyOnLight` = forest | `steelInk #173C4D` | Body ink had to leave forest for green to become a category rather than the default. |
| `ink.muted #456052` | `steelMuted #4A6473` | The old muted is a desaturated green; this is its exact steel counterpart, and it clears AA on all three light grounds. |

### Added outright
- `screenLight #C3DCE8` — §4. The point of the candidate.
- `steelDeep #12303F` — the second dark, used only inside the media slot.

### Retired by this overlay (recorded, not deleted)
`night`, `paper`, `greige`, `sage`, `inkMuted`, and **`emberTint #F0DCC9`** — a warm light field
has no home in a cool light ramp, and the offer band is full-strength ember rather than a tint.
If the convergent phase wants a light callout field, use `screenLight`: it is measured
(`steelNight` on it 11.84:1, `ember` on it 5.22:1) and it is on-hue.

---

## 7. The softening delta, as applied

Applied exactly as specified in `RUN.md`, no further:

| Delta | As applied |
|---|---|
| Radius 0 → 3px, interactive only | `radius.control` 3px on buttons, form inputs and the venue-switcher chips. `radius.surface` and `radius.media` stay **0** — panels, cells, the waitlist slab, the quote slots and the image slots are square. The unverified badge is explicitly square (`radius.pill: 0`). |
| Ruled grid stays; secondary dividers 2px → 1px | The grid is untouched. Two internal rules dropped to 1px: the trust-strip venue-name underline and the venue-meta top/bottom rules. Structural rules (section separators, band tops, quote-grid head, venue-row bounds) stay 2px or heavier. |
| One step more air inside cells only | Venue cell s6→s7 · quote slot s5→s6 · waitlist slab s6→s7 · job row block s6→s7 · slot caption s4→s5 · stub note s5→s6. **Section rhythm and band alternation byte-identical to round 1.** |
| Peak display weight down one step | The display ramp shifts one notch: 900/800/600 → **800/700/600**. Shifted as a ladder rather than only at the peak, so the h1-vs-h2 relationship survives instead of collapsing. Sentence case stays; scale unchanged. |
| Unchanged | The scoreboard idea, labelled cells, ground inversion (dark → white → dark → white → EMBER → white → dark), hierarchy from weight and scale, and the reassurance copy carrying the loudest treatment on the page. |

---

## 8. The full ratio table

Body gate **4.5:1**; large-text and non-text gate **3:1**. **Nothing in this candidate relies on
the large-text allowance. No pairing fails.**

### On `steelNight #0B1F2A` — chrome, hero, jobs, footer, media slots
| Foreground | Ratio | |
|---|---|---|
| `white #FFFFFF` | **16.89:1** | ✓ h1, h2, h3 |
| `steelChalk #F3F6F7` | **15.55:1** | ✓ body, nav, footer copy, rules |
| `steelFog #DFE5E9` | **13.28:1** | ✓ |
| `screenLight #C3DCE8` | **11.84:1** | ✓ the projection panel |
| `amber #F3B268` | **9.15:1** | ✓ eyebrow, score rules, reassurance, CTA fill, pendants, focus ring |
| `steelMist #9DB9C6` | **8.19:1** | ✓ captions, slot labels, muted meta, quiet rules |
| `steelNight` on `amber` | **9.15:1** | ✓ label on the dark-field CTA |
| **Banned here** | ember 2.27 ✗ · screen 2.25 ✗ · forest 1.67 ✗ · emberMid 3.55 ✗ body · steelDeep 1.22 (mass only) | |

### On `screen #2E5A6E` — the dark row hover ground
| Foreground | Ratio | |
|---|---|---|
| `white` | **7.49:1** | ✓ row heading on hover |
| `steelChalk` | **6.90:1** | ✓ row body on hover |
| `screenLight` | **5.25:1** | ✓ |
| `amber` | **4.06:1** | ✓ 3:1 non-text ONLY — the aria-hidden row arrow. Banned as body text; the reassurance line inverts to white on hover. |
| `steelMist` | **3.63:1** | ✓ non-text only |
| `screen` vs `steelNight` | 2.25:1 | a perceptible band change, non-text, non-boundary |

### On `white #FFFFFF` — trust strip, proof, venues
| Foreground | Ratio | |
|---|---|---|
| `steelNight` | **16.89:1** | ✓ display headings, scoreboard figures, structural rules |
| `steelInk #173C4D` | **11.73:1** | ✓ body |
| `forest #124B2E` | **10.14:1** | ✓ venue names, text and 1px underline |
| `screen` | **7.49:1** | ✓ the "(hours being confirmed)" tag, text and 2px border |
| `ember` | **7.45:1** | ✓ as text, as a fill boundary, as the heavy score rule |
| `steelMuted #4A6473` | **6.25:1** | ✓ captions, sub-rules, placeholders |
| `emberMid` | **4.76:1** | ✓ 3:1 non-text (focus slab) |
| `steelChalk` on the ember fill | **6.86:1** | ✓ (hover 4.92 ✓, active 9.09 ✓) |
| `white` on a `forest` fill | **10.14:1** | ✓ venue-name hover inversion |
| **Banned here** | amber 1.85 ✗ · steelMist 2.06 ✗ · screenLight 1.43 ✗ · steelFog 1.27 ✗ | |

### On `steelChalk #F3F6F7` — the waitlist slab
`steelNight` 15.55 ✓ · `steelInk` 10.80 ✓ · `forest` 9.33 ✓ · `screen` 6.90 ✓ · `ember` 6.86 ✓ ·
`steelMuted` 5.75 ✓ (placeholders, degradation note) · `emberMid` 4.38 ✓ 3:1 non-text (focus).
The slab's own boundary against the ember band: **6.86:1** ✓ non-text.
Banned: amber 1.70 ✗ · steelMist 1.90 ✗.

### On `steelFog #DFE5E9`
`steelNight` 13.28 ✓ · `steelInk` 9.23 ✓ · `forest` 7.98 ✓ · `screen` 5.89 ✓ · `ember` 5.86 ✓ ·
`steelMuted` **4.91 ✓** (the tightest text pairing in the candidate — and it clears) ·
`emberMid` 3.74 ✓ non-text · `disabledInk #52685B` 4.73 ✓.

### On the ember band `#8A400A`
`white` 7.45 ✓ · `steelChalk` 6.86 ✓ · `steelFog` 5.86 ✓ · `screenLight` 5.22 ✓.
**The trap is unchanged from round 1 and inverts here:** `steelNight` on ember is **2.27:1** and
`forest` on ember is **1.36:1**, so a dark panel or a dark button on this field fails the 3:1
non-text gate exactly as an ember button on a dark ground does. The waitlist therefore sits in a
`steelChalk` slab punched out of the ember, and the submit button reverts to a normal
ember-on-light CTA inside it. Also banned: `amber` 4.04 ✗ body (clears large-text 3:1 only — banned
outright) · `steelMist` 3.62 ✗ body.

### Media slot
`screenLight` panel on the ground **11.84:1** ✓ · `screen` horizon band on the panel **5.25:1** ✓ ·
`amber` pendants **9.15:1** ✓ · `steelChalk` 2px frame **15.55:1** ✓ · `steelMist` caption
**8.19:1** ✓ · `steelMist` hatch on Stillwater's empty slot **8.19:1** ✓ ·
`steelDeep` room mass 1.22:1 — a tonal mass inside an aria-labelled illustration, carrying no
information and no boundary.

### State roles
`emberMid` focus: vs white 4.76 · vs chalk 4.38 · vs fog 3.74 — all ✓ 3:1 non-text.
`amber` focus on dark: vs steelNight 9.15 ✓ · vs screen 4.06 ✓ non-text.
`white` focus on the ember band 7.45 ✓ (emberMid vs ember is 1.73:1 and cannot be used there).
`clay` error on white 7.19 ✓, on chalk 6.62 ✓. `errorOnDark #F2A2A2` on steelNight **8.41:1** ✓
(improved from 5.05:1 on forest). `moss` success on white 7.82 ✓. `successOnDark #A8E0C0` on
steelNight **11.33:1** ✓.

### Surface pairs that are *not* boundaries
white ↔ steelChalk **1.09:1** · steelChalk ↔ steelFog **1.17:1** · steelNight ↔ steelDeep
**1.22:1**. These are tonal steps, not boundaries — in this register every adjacent surface is
separated by a rule from `border.*`, so none of these ratios is load-bearing. Recorded because it
is the trap a softer register would fall into with this ramp (see §9).

### The slate-blue question, answered directly
The live site's every button is `#7794A6` with white text at **3.20:1** — a sitewide AA failure,
and this candidate is the closest of the three to that hue family. So, plainly: **that failure was
lightness in a text-bearing role, not hue.** The nearest value in this overlay, `screen #2E5A6E`,
is the same 199–203° family two-thirds darker, and white on it is **7.49:1**. No blue in this
overlay carries text at less than **4.91:1**.

---

## 9. Token gaps — flagged, not invented

1. **No warning / unverified role — and a monochrome system makes this worse.**
   `(hours being confirmed)` is neither an error nor a success; it is unverified data. Round 1 gave
   it `palette.screen` blue on white, which read as a different *kind* of thing because the rest of
   the page was green. Here blue is the substrate, so a blue badge no longer signals by hue. This
   overlay differentiates it by **form** instead — a 2px screen-ruled square caps tag against 3rem
   hour figures — and records the gap. A real `role.state.unverified` hue is needed and is **more**
   urgent in this direction than in a warm one. Not invented, because a third hue would break the
   stance.
2. **The canonical `tokens.json` still has no structural vocabulary** — no type scale, radius,
   border, elevation, tracking, line-height or internal spacing scale. Unchanged from `RUN.md`
   finding 1. All of them are declared in this overlay; the convergent phase must promote the
   winning set into the canonical file.
3. **The light ramp's adjacent steps are not self-separating** (§8). Fine here and deliberate,
   because this register separates every adjacent surface with a rule. **Do not carry this ramp
   into a card-and-shadow system without adding a border token to every surface pair.**
4. **`moss` and `forest` now collide.** With forest demoted to venue names, the system has two
   greens 2.4° apart doing different jobs. One should go in the merge; it should not be forest.
5. **`state.disabledInk #52685B` is still a green** and should become a steel in the merge. Kept
   verbatim here rather than silently re-coloured.
6. **Copy gap, not invented.** The register still wants the published rate (**$35 / hour**, real,
   current through 2026-10-03) on the scoreboard. `screen-spec-home.md` §7 forbids any string not
   on the copy sheet and no homepage section carries a price. Flagged for the convergent phase as a
   one-string copy request; **not** added.
7. **No brand mark.** The wordmark is typeset (Archivo 800, expanded, wide-tracked, caps) and the
   venue lockup is a typographic rule-and-line treatment per `brand-direction.md` §4.2. No logo is
   drawn — that is a commission, not a sprint output.

---

## 10. Verification

Rendered in headless Chrome and inspected at both widths.

- **Zero external asset loads.** No stylesheet link, no CDN, no web-font URL. The single
  `@font-face` is a `data:` URI (Open Sans, base64-embedded from
  `public/fonts/open-sans-normal-latin.woff2` — the real file). The only `url()` in the document is
  the internal SVG fragment `url(#hatch-sw)`. The six `https://` references are anchor **hrefs**
  (Google Maps, Whoosh, Facebook), not asset loads.
- **Exactly one `<h1>`.** No `<script>`. No `@import`.
- **Rendered pixel values match the tokens** — hero/jobs/footer ground sampled at `rgb(11,31,42)`
  = `#0B1F2A`; offer band `rgb(138,64,10)` = `#8A400A`; waitlist slab `rgb(243,246,247)` =
  `#F3F6F7`.
- **1440px:** correct. Bands alternate as specified, the ember band reads as the page's one warm
  event, the forest venue names read as a distinct category against the steel.
- **390px:** correct — no horizontal overflow, no clipped text, hours reachable within roughly one
  screen-height of hero.

### Two findings from rendering

1. **A methodology trap worth recording: `--window-size=390` does not give a 390px viewport.**
   Chrome on macOS clamps its window width to a **500px minimum**, in both old and new headless
   modes (`window.innerWidth` reports 500 regardless of the flag). A `--window-size=390`
   screenshot is therefore a **390px-wide crop of a 500px viewport**, which makes a perfectly
   healthy page look like it has horizontal overflow — clipped headlines, half-visible chips,
   truncated addresses. This candidate appeared broken at "390px" until it was re-rendered inside a
   `<iframe width="390">`, at which point it was clean. **Round 1's mobile verification is worth
   re-running this way**, and any future narrow check in this project should use the iframe method.
2. **An inherited composition bug, verified identical in round 1 and deliberately not fixed here.**
   At 1440px the sticky header wraps to two rows (wordmark + nav, then switcher + Book a Bay)
   instead of sitting on one. Rendering `home-brutalist.html` at the same width reproduces it
   exactly, so it is a property of the base composition, not of this palette. Layout is fixed on
   this round's axis and fixing it in one of three siblings would confound the comparison — so it
   is **flagged for the convergent phase** rather than patched.

---

## 11. What a reviewer should push back on

- **Six appearances of green may be too few** to count as keeping the equity. If the answer is
  "green needs to be *seen*", the cheapest fix inside this stance is to give the "What you can do
  here" band a forest ground instead of steel — one full-bleed green band, separated from every
  steel band by a white one so they never touch. That is a one-token change and it is the obvious
  next dial.
- **Eight new palette primitives is a lot** for a candidate whose argument is provenance. The
  defence is that they are one hue at nine lightnesses, all derived from a value the brand had
  already justified — but it is a fair challenge and it is the right thing to argue about.
- **The Archivo-for-Bitter swap is inherited from round 1 and is still the most contestable call
  in the register.** It has nothing to do with the palette; it should be settled separately.
