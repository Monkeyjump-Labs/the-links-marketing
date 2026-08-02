# `blue-signal` — the reasoning

> Round 2 candidate `home-blue-signal` · surface: homepage · register **fixed** (softened
> brutalist) · divergence axis **palette only**. Artifact: `blue-signal.json`.
> Preview: `../candidates/home-blue-signal.html`.
> Status: **PROPOSAL** — a divergent candidate for a human gate, not client-approved.

---

## 1. The one committed idea

**Rotate the ramp; don't repaint the page.**

The approved system already contains a three-step darkness ramp in green and exactly one cool
value, held back at about 12% of the page doing badge duty. This candidate rebuilds that ramp at
the **same three relative luminances** in the blue hue family, and takes that one cool value —
`palette.screen` `#2E5A6E` — keeps its darkness to four decimal places, pushes it from 28% to 95%
chroma, and hands it the hero, the jobs band, the hours and the action slot.

| Green value | L | → | Blue value | L | Ratios that move |
|---|---|---|---|---|---|
| `night` `#0D3520` | 0.0274 | → | `beaconDeep` `#09304F` | 0.0274 | **none** |
| `forest` `#124B2E` | 0.0536 | → | `beaconInk` `#154565` | 0.0536 | **none** |
| `#456052` | 0.1024 | → | `beaconMuted` `#2B5F82` | 0.1031 | −0.03 on three pairings |
| `screen` `#2E5A6E` | 0.0902 | → | `beacon` `#045890` | 0.0902 | **none** |

So 13.57:1, 12.48:1, 10.46:1, 10.14:1, 9.32:1, 7.81:1, 7.49:1, 6.89:1, 7.35:1 — the whole of
`brand-direction.md` §2.3 — survives the hue change **unchanged**. That is the point of the
candidate: the palette question stops being an accessibility question and becomes purely a
question of temperature, which is the question the human actually asked.

It also answers the brief's warning directly. "A saturated blue at scale has real contrast
arithmetic to solve, since blue's luminance is low." True — and the way to solve it is not to
guess a blue and then measure, but to fix the luminance first (at a value the system has already
proven) and let the hue follow.

**What a sibling would not do:** give the *opening hours* the loudest treatment on the page —
white figures inside solid saturated-blue cells on a white ground. The block 67% of audited
competitors omit becomes a departure board. On mobile, Stillwater's four day-runs stack into four
filled cells and the strip reads unmistakably as a schedule board rather than as fine print.

---

## 2. What happened to forest green

**Demoted — from the theme to the room. Retained in the palette; removed from every UI role.**

**Removed from:** every ground, every rule, every button, every heading, all body and muted text.
Neither `forest` `#124B2E` nor `night` `#0D3520` appears anywhere in the page chrome.

**Kept in, verbatim:**

1. **The photo slots.** `role.media.slotGround` is `night`; `role.media.slotMass` is `forest`. The
   rooms genuinely are that colour — the measured shoot is 33–38% near-black per frame with a
   green-black cast — so the drawn interior is honest only in green. **Green survives exactly
   where it is true.** It also means the only near-black anywhere on this page is *inside the
   photograph*, which is what makes a page with two saturated-blue bands still read as bright.
2. **The success state.** `moss #155E36`, 7.82:1 on white, untouched.
3. **The palette file.** Nothing is deleted. Re-promoting forest is a one-line role swap.

**Why.** Forest's claimed equity is that it backs 66 sections as the declared theme black
(`--black-hsl`). That is the *same* provenance problem this direction already used to throw out
the slate blue: `brand-direction.md` §2.1 retired `#7794A6` partly because "a colour that arrived
by aliasing has no equity to protect." Forest arrived the same way — it is a Squarespace theme
slot — and the argument was never applied to it. What forest *does* have is one real, verifiable
strength: it looks like the room. This candidate keeps that and drops the rest.

**What it costs, stated honestly for the gate.** The page loses its inherited hue at the
most-repeated element on it (body text), so recognition now rests on the blue, the ember band and
the ruled board rather than on green. If the client's attachment to the green is genuine rather
than inherited, that is a legitimate reason to reject this candidate — and it should be asked as a
question, not assumed either way.

**What it does not cost.** Not one contrast ratio (§1).

---

## 3. Kept vs. replaced

### Replaced (5 new values, all one hue family, 203–206°)

| Token | Value | Replaces | One-line reason |
|---|---|---|---|
| `beacon` | `#045890` | `screen` `#2E5A6E` as the cool value, `ember` as the light-ground action fill | The palette already had this colour at this darkness; it was just held at 28% chroma and given a badge to carry. |
| `beaconDeep` | `#09304F` | `night` as display ink, rules, chrome and footer ground | Same luminance as night, so every one of night's ratios transfers. |
| `beaconInk` | `#154565` | `forest` as body ink | Same luminance as forest, so 10.14 / 9.32 / 7.81 transfer. |
| `beaconMuted` | `#2B5F82` | `#456052` as muted ink | Same luminance band; keeps "opacity is not a ramp" enforceable. |
| `screenLight` | `#B8DFF9` | *nothing — this fills the gap round 1 flagged* | The brief "one bright screen in a warm dark room" was unrenderable because `screen` is 1.81:1 on night. This is 9.67:1. |
| `beaconHover` / `beaconActive` | `#0A6DAE` / `#04405F` | `#AD500D` / `#6D3308` in the action slot | Declared as values, not left to `hover:brightness-125` — the mechanic §2.4 warns about. |

### Kept verbatim (and why each one matters)

| Token | Reason it stays |
|---|---|
| `white`, `paper` `#F7F5F3`, `greige` `#E5E1E0` | **The anti-SaaS insurance.** Every light field on this page is warm. There is not one cool grey in the overlay. |
| `ember` `#8A400A` + hover/active/mid | The single full-bleed warm band survives from round 1 unchanged, and ember picks up a second job (§5). Its whole §2.2 defence is untouched. |
| `amber` `#F3B268` | The pendant light. Rules, CTA fills and focus on blue grounds. It is the other half of what stops this reading as software. |
| `night`, `forest`, `sage` | Demoted to the photo slots (§2). |
| `moss`, `clay` | Success and error, unchanged and unused on this surface. |
| Type: Archivo + Open Sans, the full type scale, tracking, line-height | The register is fixed in round 2; type is not the variable. |
| `emberTint` `#F0DCC9` | Unused here, recorded so it is not assumed deleted. |

### The softening delta — applied exactly, no further

- **Radius** 0 → **3px on interactive elements only.** Buttons, inputs, switcher chips, the
  unverified tag. Panels, cells, the media slots, the waitlist slab and every band stay square.
- **Rules.** The visible grid stays. Internal dividers sit at 1px (`hairline`); structural
  boundaries and section rules stay at 2px and 4px; the section lead rule stays 8px.
- **Spacing.** One step more air *inside cells only* (`s5`→`s6`, `s6`→`s7` on cell padding).
  Section rhythm and the full-bleed alternation are untouched.
- **Type.** Peak display weight down one step: **900 is removed from the ramp**, the h1 and the
  scoreboard figures sit at 800. Sentence case stays. Scale unchanged.
- **Unchanged:** the scoreboard idea, labelled cells, ground inversion, hierarchy from weight and
  scale, and the reassurance copy carrying the loudest treatment on its band.

---

## 4. The full ratio table

Computed from sRGB relative luminance per WCAG 2.1 §1.4.3 (text) and §1.4.11 (non-text), not
estimated. Body gate 4.5:1; large-text and non-text gate 3:1. **Nothing here relies on the
large-text allowance.**

### On `beacon` `#045890` — the hero and jobs bands

| Foreground | Ratio | Verdict | Used for |
|---|---|---|---|
| `white` | **7.49:1** | ✓ body | h1, h2, h3, scoreboard figures |
| `paper` | **6.89:1** | ✓ body | body copy, structural rules |
| `greige` | **5.77:1** | ✓ body | secondary meta |
| `screenLight` | **5.34:1** | ✓ body | eyebrows, cell labels, arrows, 1px rules |
| `amber` | **4.06:1** | ✓ 3:1 **non-text only** | score rule, CTA fill boundary, focus ring |
| `beaconDeep` on an `amber` fill | **7.35:1** | ✓ body | the label on the dark-field CTA |

**Banned on beacon:** `beaconDeep` 1.81:1 · `night` 1.81:1 · `ember` **1.01:1** · `emberMid`
1.57:1 · `amber` as body copy 4.06:1.

### On `beaconDeep` `#09304F` — chrome and footer

`white` **13.57:1** ✓ · `paper` **12.48:1** ✓ · `greige` **10.46:1** ✓ · `screenLight` **9.67:1** ✓
· `amber` **7.35:1** ✓ · `sage` 6.71:1 ✓ (unused outside the slots).
`beacon` on `beaconDeep` is 1.81:1 — used **only** as the deliberate low-contrast chrome/hero seam,
which carries no information and is cut by a 4px amber rule at 7.35:1.

### On `white`

`beaconDeep` **13.57:1** ✓ · `beaconInk` **10.14:1** ✓ · `beacon` **7.49:1** ✓ · `ember`
**7.45:1** ✓ · `moss` 7.82:1 ✓ · `clay` 7.19:1 ✓ · `beaconMuted` **6.86:1** ✓ · `emberMid`
**4.76:1** ✓ 3:1 non-text (focus).
`white` on a `beacon` fill **7.49:1** ✓ · on `beaconHover` **5.51:1** ✓ · on `beaconActive`
**11.03:1** ✓.
**Banned on white:** `amber` 1.85:1 · `screenLight` 1.40:1 · `sage` 2.02:1.

### On `paper` `#F7F5F3` — inside the waitlist slab

`beaconDeep` **12.48:1** ✓ · `beaconInk` **9.32:1** ✓ · `beacon` **6.89:1** ✓ · `ember` 6.85:1 ✓ ·
`beaconMuted` **6.31:1** ✓ (placeholders, on the white input: 6.86:1) · `emberMid` **4.37:1** ✓ 3:1
(focus).

### On the `ember` band

`white` **7.45:1** ✓ · `paper` **6.85:1** ✓ · `greige` 5.74:1 ✓ · `screenLight` **5.31:1** ✓ ·
the paper slab's own boundary 6.85:1 ✓ non-text.
**Banned on ember, and the first one is new and exact:** `beacon` **1.01:1** — beacon and ember are
luminance twins (0.0902 vs 0.0909), so a blue button on the ember band is not merely low-contrast,
it is invisible. Also `beaconDeep` 1.82:1 · `amber` 4.04:1 (clears 3:1 large only — banned
outright) · `sage` 3.68:1.

### Media slot (the room)

`screenLight` projection panel on `night` **9.67:1** ✓ non-text · `beacon` horizon band on the
panel **5.34:1** ✓ non-text · `amber` pendants on `night` **7.35:1** ✓ non-text · `paper` 2px frame
**12.48:1** ✓ non-text · `sage` caption **6.71:1** ✓ body · `forest` bar mass on `night` 1.34:1,
tonal only and carrying no information (which is what it is in the photograph too).

**No pairing in this candidate fails.**

---

## 5. How a saturated blue was kept from reading as software

Six decisions, each the opposite of what a generic tech palette does.

1. **Hue 204°, not 217–225°.** The SaaS cluster is indigo-leaning (`#2563EB` is 221°, `#3B82F6` is
   217°). 204° is the hue of the retired slate `#7794A6` (203.8°) and of `screen` (203°) — the
   brand's own cool axis, measured off the simulator projection. It is a signage blue, not a
   product blue.
2. **No cool neutrals, anywhere.** Every light field is a kept warm value. A tech palette pairs its
   blue with slate-50 and slate-500; that pairing is most of what makes a page read as software.
   Blue on warm paper reads as print.
3. **The warm band stays.** The full-bleed `#8A400A` ember band survives from round 1 as the
   loudest chromatic event, given to the waitlist. 204° and 25° are very nearly complementary — that
   pairing is a scoreboard and a bar sign. No software product has a full-bleed burnt-orange band.
4. **Blue never sets running text.** `beacon` is a ground, a fill, a rule and a figure. It never
   sets body copy, a link, or a heading on a light ground. Brand-blue headings and link-blue body
   are the tell; a navy ink ramp is a newspaper.
5. **No shadow, no gradient, no pill, no glow.** `elevation` is declared empty on purpose — a soft
   blue shadow or an outer glow is the named AI tell this direction sits closest to, so the
   absence is recorded rather than assumed. Radius is 3px on interactive elements and 0 elsewhere.
6. **The numerals are enormous.** Every figure — 6 bays, 4 bays, the hours — is tabular, lining,
   expanded, at display scale, in the display face, inside a filled cell. A product UI sets
   numerals small and quiet. A board sets them huge.

**One deliberate anti-slop override, recorded rather than hidden.** `taste/anti-slop.md` says "no
oversaturated accents — desaturate to sit with the neutrals." This candidate does not, because the
round-2 brief asks for saturated blue as the signal. Every other item on that checklist is
honoured: no pure black, no glow, no gradient text, no custom cursors, no three equal cards, no
generic names, no fabricated numbers, no filler verbs, no decorative index numbers, no stock
imagery.

**And the risk that remains.** Blue on white is the most common look on the internet; six decisions
reduce the resemblance, they do not abolish it. The honest test at the gate is whether the *hours
board* and the *ember band* are the two things a reviewer remembers. If they aren't, this direction
has not earned its saturation and one of the siblings should win.

---

## 6. Gaps — flagged, not invented

1. **CLOSED: `palette.screenLight`.** Round 1's single most useful finding was that the palette
   could not render its own brief. This candidate adds the value under exactly the name round 1
   proposed, at `#B8DFF9`, and proves it goes further than proposed: it is not decorative-only, it
   clears AA body on all three dark grounds. The media slot now genuinely shows a warm dark room
   with one bright cool screen in it.
2. **CLOSED: the caution role.** Round 1 flagged that `(hours being confirmed)` is neither an error
   nor a success and had to borrow the informational blue. Here that blue *is* the page, so
   borrowing it would make the caveat vanish into the thing it qualifies. `ember` is freed from the
   action slot by the same promotion and takes `role.state.unverified` — 7.45:1 as text and as a
   2px boundary on white. A warm outline on a blue page reads as attention without reading as
   error; `clay` stays reserved.
3. **STILL OPEN: structural vocabulary.** The canonical `tokens.json` still has no type scale,
   radius, border, elevation, tracking, line-height or internal spacing scale. This overlay
   declares its own, inherited from `brutalist.json`. Round 1's finding stands and is now more
   urgent: **the convergent phase must promote the winning set into the canonical file**, or the
   next surface invents a fifth private structural language.
4. **OPEN: hover mechanics are a code change, not a token change.** `Button.astro` uses
   `hover:brightness-125` and `BookButton.astro` uses `hover:opacity-90`. `beacon` needs the same
   treatment ember got; this overlay declares explicit `beaconHover` / `beaconActive` values and
   the build must bind those instead of a filter.
5. **COPY GAP, not invented.** The register still wants the published rate ($35 / hour, real,
   current through 2026-10-03) on the board. `screen-spec-home.md` §7 forbids any string not on the
   copy sheet and no homepage section carries a price. Flagged again for the convergent phase as a
   one-string copy request; **not** added to this candidate.
6. **Not resolved, and not this candidate's to resolve.** The unequal hours boards make Stillwater
   visually heavier than Lakeville in the trust strip. That is a truthful consequence of the real
   data (one day-run vs. four), and it touches `screen-spec-home.md` §6 open question 1 — which
   venue is the growth priority. Flagged, not designed around.

---

## 7. Verification

- Rendered in headless Chrome at **1440px** and at a **true 390px viewport** (via a 390px iframe —
  Chrome's headless window has a ~500px minimum width, so a bare `--window-size=390` reports a 500px
  layout viewport and silently crops the screenshot; measuring that way produces false overflow
  reports).
- **`document.documentElement.scrollWidth === innerWidth` at both widths, and zero elements
  overflow the viewport.** Round 1's `home-brutalist.html` measures identically at 1440.
- Three narrow-width fixes made in the process, all responsive plumbing rather than design
  decisions: the venue switcher takes its own row below 540px; the hour cells stack one per row
  below 640px; the address line wraps rather than pushing the row. A `<meta name="viewport">` was
  added, which round 1 omits.
- Structure: exactly one `<h1>`, four `<h2>`, zero `<link>`, zero `<script>`, zero `<img>`, zero
  `@import`. The only `url()` references are the base64 Open Sans face and an internal `#hatch`
  SVG pattern. Every off-site `href` is a real destination (Whoosh, Google Maps, Facebook), inert
  in the sandbox.
- `wisplet lint --kind design`: **51 findings, all the same benign advisory** — 50 "link is inert in
  the sandbox" plus one "form action would submit off-artifact". Same class and count as round 1.
- Copy and data are verbatim from `screen-spec-home.md` §7 and §8. No invented testimonial, price,
  hour or name. The proof stub, both `(hours being confirmed)` badges and the lead-endpoint
  degradation note all render.
