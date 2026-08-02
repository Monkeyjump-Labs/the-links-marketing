# `soft` — token overlay rationale

> Design-factory **step 2 (DIVERGE)** artifact · candidate `home-soft` · register **`soft`** ·
> axis **`theme → token_set`** · 2026-08-02
> Artifact: [`soft.json`](soft.json) · Preview: [`../candidates/home-soft.html`](../candidates/home-soft.html)
> Overlays: [`../tokens.json`](../tokens.json)
> **Status: CANDIDATE.** Not client-approved, not merged. Layout and IA are held fixed per
> [`../screen-spec-home.md`](../screen-spec-home.md) §11.2 — only the visual language varies.
> Dials: variance **5** · motion **3** · density **5**.

---

## 1. The one committed idea

**The page is lit, not tinted.**

Soft, done badly, is a pastel wash and a 12px corner radius — and the wash is where the
accessibility failure comes from, because "gentle grey text on cream" is how a warm palette
quietly drops under 4.5:1. This candidate refuses the wash and gets its warmth from a **light
source with a direction**, which is the thing the brand actually owns: a warm dark room lit by
pendants over the bar, with one cool bright simulator screen in it.

Three tokens carry it, and nothing else has to:

| Token | What it does |
|---|---|
| `light.pendant` / `light.pendantWide` | An amber pool at the top edge of every dark band. Sections are lit from above, not filled. |
| `elevation.lamp` / `elevation.lampLift` | The only shadows in the system, and they are tinted **ember (25°)**, never grey or black. A grey shadow under a warm surface is the exact tell that turns "lit room" into "default card component". |
| `light.sheen` | A faint upper-rim highlight on raised light surfaces. It is the only place white appears anywhere in the system, and it appears as *light*, not as a fill. |

And one rule change that follows from it:

**The action colour is the light.** Ember (`#8A400A`) on a lit field; **amber (`#F3B268`) on a
dark one**, carrying night-green text at **7.35:1**. The canonical system solves the same
arithmetic — a solid ember button on forest is 1.36:1 and effectively invisible — by inverting
the CTA to a paper fill. That is correct and safe, and it is also precisely why the spec's §10.5
reads *"the hero CTA is a white rectangle… the palette is designed and unspent."* Making amber
the dark-field fill means the action colour is recognisably the same thing in both polarities:
it is the pendant. This does **not** relax the ember-on-forest prohibition, which still stands.

**What an editorial-minimal, brutalist or technical-dense sibling would not do.** All three of
those registers resolve elevation by *removing* it — hairlines, hard edges, flat fills, no
shadow. This is the only candidate in the run where **light itself is a token group**, and the
only one that changes the primary fill by field polarity. If the human picks a sibling, the
pendant, the warm shadow and the amber CTA all disappear with it; they are not a finish that can
be bolted onto another option.

**The motif** (§10.10 asks for something recognisable from a fragment): the *lamp rule* — a small
ember dot with a warm halo, trailing a hairline that fades out. It sits above every `<h2>` and
appears in both polarities. One device, repeated, costs nothing.

---

## 2. What I kept, and what I replaced

### Kept verbatim from `tokens.json`

| Token | Why it stayed |
|---|---|
| `forest #124B2E` | The brand's only real colour equity — theme black on 66 live sections. This overlay changes the light in the room, not the green. |
| `night #0D3520` | The dark brand field. Hero, venue band. |
| `ember #8A400A`, `emberHover #AD500D`, `emberActive #6D3308` | Retained *deliberately, not cautiously*: this exact darkness was tuned so linen text survives the codebase's `hover:brightness-125` at **5.01:1**. Re-picking a prettier orange re-opens a solved arithmetic problem, and `#B85718` — the obvious prettier one — collapses to 3.20:1 under the same hover. |
| `emberMid #B85718` | Focus ring on light. Border/ring only. |
| `emberTint #F0DCC9` | Kept, but **promoted** from a small callout fill to a full-width section band. |
| `amber #F3B268` | Kept, but **promoted** from a dark-field text highlight to a dark-field button fill. |
| `screen #2E5A6E` | Informational/status — and the literal job it was named for, inside the photography slot. |
| `clay #A22C22`, `moss #155E36` | Error and success, untouched. |
| `Open Sans` | Retained verbatim as the body family (see §4). |
| `size.contentMax 75rem`, `space.gutterX/gutterXLg` | Layout is off-axis; these do not move. |

### Replaced, one line each

| Out | In | Why |
|---|---|---|
| `white #FFFFFF` | `linen #FBF7F1` | Pure white is a screen colour and the coldest value in a measurably warm brand; 155 sections of it are half of why §10.2 reads as eleven feet of nothing. Removing it costs 0.64 of a contrast ratio (10.14 → 9.50) and buys the whole register. |
| `paper #F7F5F3` | `oat #F1E7DA` | Warmer raised surface. See the honesty note in §3 — the fill is *not* what makes a card read as raised here. |
| `greige #E5E1E0` | `wheat #E6D9C9` | Greige is a near-neutral grey and the one light value that fights the pendant. |
| `ink.muted #456052` | `#4E5A46` | Same job, warm-shifted (R−B +8 instead of −13) **and** higher contrast on every field: 6.84 vs 6.46 on the page ground. Warmth here cost nothing. |
| `state.disabledInk #52685B` | `#6E6350` | Warm equivalent, 4.82:1 on the raised surface. |
| `space.sectionY 4rem / 8rem` | `3.5rem / 6rem` + a 9-step internal scale | The canonical set has *two* spacing steps and no internal scale at all, which is why every card in the build is `p-6`. Section padding comes **down** and card padding goes **up**: a soft page is generous inside its containers, not just between them. And 8rem of nothing between two near-identical whites is not rhythm, it is §10.2. |
| `size.proseMax 46.875rem` | `40rem` | At the promoted 17px body size, 46.875rem runs past 85 characters. |
| `Bitter` (display) | **`Fraunces`** | See §4. |

### Dropped, with the value recorded

- **`sage #9CBEAD`.** It is the only cool light field in the palette and it directly contradicts a
  one-light-source stance. It is already demoted in the canonical set and only two live sections
  use it, so the cost is nil. If the client is attached to it, it returns as a light field
  carrying forest text at 5.01:1 — but it will read as a second, different lamp.

---

## 3. Every contrast ratio I computed

All values computed from sRGB relative luminance per WCAG 2.1 §1.4.3. **Nothing text-bearing is
below 4.5:1. Nothing that identifies a control is below 3:1.**

### Text on light fields

| Foreground | linen `#FBF7F1` | oat `#F1E7DA` | wheat `#E6D9C9` | emberTint `#F0DCC9` |
|---|---|---|---|---|
| `ink.default` `#124B2E` | **9.50** ✓ | **8.29** ✓ | **7.31** ✓ | **7.62** ✓ |
| `ink.muted` `#4E5A46` | **6.84** ✓ | **5.98** ✓ | **5.26** ✓ | **5.49** ✓ |
| `primary` `#8A400A` as text | **6.98** ✓ | **6.10** ✓ | — | **5.60** ✓ |
| `accent` `#2E5A6E` as text | **7.02** ✓ | **6.13** ✓ | **5.40** ✓ | — |
| `state.error` `#A22C22` | **6.74** ✓ | **5.89** ✓ | — | — |
| `state.success` `#155E36` | **7.32** ✓ | — | — | — |

### Text on dark fields

| Foreground | night `#0D3520` | forest `#124B2E` | roomBlack `#17120E` |
|---|---|---|---|
| `ink.onDark` `#FBF7F1` | **12.72** ✓ | **9.50** ✓ | **17.42** ✓ |
| `ink.mutedOnDark` `#C9BCA8` | **7.27** ✓ | **5.43** ✓ | **9.96** ✓ |
| `accent.highlight` `#F3B268` | **7.35** ✓ | **5.49** ✓ | **10.08** ✓ |

### Buttons

| Pairing | Ratio | Gate |
|---|---|---|
| linen on `primary` `#8A400A` | **6.98** | AA body ✓ |
| linen on `primary.hover` `#AD500D` | **5.01** | AA body ✓ |
| linen on `primary.active` `#6D3308` | **9.25** | AA body ✓ |
| ember fill boundary vs linen page | **6.98** | 3:1 ✓ |
| **night `#0D3520` on `primary.onDarkFill` `#F3B268`** | **7.35** | AA body ✓ |
| **amber fill boundary vs the night field** | **7.35** | 3:1 ✓ |
| night on `onDarkFillHover` `#FFC98A` | **9.03** | AA body ✓ (safe under `brightness-125`) |
| ember fill on forest — **forbidden, unchanged** | 1.36 | ✗ |

### Non-text: focus, borders, states

| Pairing | Ratio | Gate (3:1) |
|---|---|---|
| `state.focus` `#B85718` vs linen | **4.46** | ✓ |
| `state.focus` vs oat | **3.89** | ✓ |
| `state.focus` vs emberTint | **3.58** | ✓ |
| `state.focus` vs wheat | **3.43** | ✓ |
| `state.focusOnDark` `#F3B268` vs night | **7.35** | ✓ |
| `state.focusOnDark` vs forest | **5.49** | ✓ |
| `border.control` `#7F7261` vs linen | **4.39** | ✓ |
| `border.control` vs oat | **3.83** | ✓ |
| `border.control` vs emberTint | **3.52** | ✓ |
| `border.control` vs wheat | **3.38** | ✓ |
| `border.onDark` `#C9BCA8` vs night | **7.27** | ✓ |
| `state.disabledInk` `#6E6350` on wheat | **4.25** | ✓ (1.4.3 exempts it anyway) |

### Gradients — verified at their brightest composite, not against the flat field

A gradient is where a "soft" palette usually breaks AA without anyone noticing, so each one was
composited and re-measured.

| Composite | Resolves to | `ink.onDark` | `ink.mutedOnDark` | `accent.highlight` |
|---|---|---|---|---|
| `light.pendant` (amber @ .20) over **night** | `#3B4E2E` | **8.50** ✓ | **4.86** ✓ | **4.91** ✓ |
| `light.pendantWide` (amber @ .16) over **night** | `#32492C` | **9.26** ✓ | **5.29** ✓ | **5.35** ✓ |
| the same glow over **forest** — **forbidden** | `#3F603A` | 6.68 ✓ | **3.82 ✗** | **3.86 ✗** |
| `light.sheen` (white @ .55) over oat | `#F9F4EE` | `ink` **9.27** ✓ | `ink.muted` **6.68** ✓ | — |

**That third row is why `light.pendant` carries a hard rule in the overlay: the pendant
composites over `surface.dark` only.** Forest fields are flat. I hit this while checking the
numbers rather than assuming them, and it is exactly the failure mode the brief warned this
register was most likely to ship.

### Declared decorative — never text-bearing

`wheat` as a divider (1.30:1 on linen) · `oat` as a field step (1.15:1 on linen) ·
`emberTint` as a band (1.25:1 on linen) · `screenLit #A8CBDC` on light (1.9:1 — it exists only
inside the photography slot, where it is 10.84:1 on roomBlack) · `roomBlack` vs `night` (1.37:1,
a field-to-field transition).

---

## 4. Type — the real proposal

| Role | Face | Weights | Change |
|---|---|---|---|
| **Display** — h1–h3, card titles, stats, wordmark | **Fraunces** (variable; `opsz` 9–144, `SOFT` ≈ 40, `WONK` off) | 400 / 600 / **700 ceiling** | **Replaces Bitter** |
| **Body** — copy, nav, forms, tables, all numerals | **Open Sans** | 400 / 600 / 700 + italic | **Retained**, promoted to 17px / 1.65 |

**Why Fraunces.** It keeps the bracketed, slab-adjacent genus that ties page type to the existing
ball-in-the-I wordmark, so this is still *finish the rename*, not start a third brand — the same
argument that put Bitter in the canonical direction. What it adds is a **`SOFT` axis** that
rounds terminals and opens counters, which is where this register's warmth is supposed to come
from. Bitter is a competent screen slab and it is *rigid*; asking a rigid face to carry "you will
not embarrass yourself here" is exactly how a page ends up needing pastel to feel friendly. The
`opsz` axis also means the 64px hero and the 18px card title are genuinely different drawings
rather than one drawing scaled — which is the single thing Alfa Slab One could not do and the
reason it is being retired in the first place.

**Fallback, if the client wants the slab equity held tighter:** Bitter at 300/500 on this exact
ramp. One line in the overlay, no other change. Recorded as a fallback, not offered as a hedge.

**Why Open Sans stays.** Not caution. The register's warmth budget is spent on the display face
and on light; Open Sans is a humanist sans with open apertures that sets a rates table and a
two-field form without argument, it is already self-hosted, and it is on all 41 pages. What
changes is *how it is used* — body goes from 16/1.5 to **17/1.65**, which is the cheapest
legibility gain available on this page and is what "body-forward hierarchy" means in this
register. Numerals stay in this face with `tabular-nums`.

**Weight ceiling 700, not 800.** Hierarchy is carried by weight and colour, not by scale. The
current build's h1 is the heaviest thing available to it and is still not doing any work.

---

## 5. How warmth was kept without dropping contrast

The trap named in the brief is that soft palettes drift pale and gentle grey text fails. Four
moves, each of which adds warmth *without* touching the ink:

1. **Warmth moved into the light layer, not the ink layer.** The pendant, the sheen and the
   ember-tinted shadow are all non-text. They can be as warm as they like because no ratio
   depends on them — and where one *could* (the pendant over a dark heading), I composited and
   measured it, which is how the forest prohibition surfaced.
2. **The neutrals got warmer and the ink got darker.** `linen #FBF7F1` is warmer than white; ink
   stays the full-strength brand forest at **9.50:1**. Warmth is a hue change on the *ground*,
   never a lightening of the *figure*.
3. **The muted ink got warmer AND higher-contrast at the same time.** `#456052` → `#4E5A46` is
   +8 red-over-blue and 6.46 → **6.84:1**. There was no trade to make here; the canonical value
   was simply cool for no reason.
4. **No opacity anywhere.** The canonical set has `ink.muted` for light fields and nothing for
   dark, which is why the live hero subhead uses `opacity-80` — the exact mechanism that produced
   the 4.39:1 `text-ink/70` failure this rebuild already had to fix in 184 places. This overlay
   adds `ink.mutedOnDark` (`#C9BCA8`, **7.27:1** on night) so there is a real token to reach for.

The register's own instruction — "warm surfaces, gentle elevation, accent as a quiet tint" — is
honoured on the surfaces and *inverted* on the accent: the accent is not quiet here, because
§10.5 says the action colour is unspent. Warm and specific, not warm and faint.

---

## 6. Token gaps — flagged, not invented

Nine things this design wanted that `tokens.json` does not have. Each is proposed in
`soft.json` **with its computed ratios** so `design-brand-guardian` can accept or reject it as a
token decision rather than discovering it as drift.

| Gap | Why the canonical set needs it regardless of this candidate |
|---|---|
| `role.border.*` | There is **no border token at all**. Components hand-roll `border-ink/15` ≈ **1.4:1**, which cannot identify a control under WCAG 2.1 1.4.11. Proposed: `hairline` (decorative) + `control` (3.38–4.39:1) + `onDark`. |
| `role.ink.mutedOnDark` | Nothing exists for secondary text on dark, so components reach for opacity. |
| `elevation.*` | No shadow tokens. This register cannot be expressed without one, and a grey one would be the wrong one. |
| `radius.*` | No radius tokens; the codebase uses raw Tailwind `rounded`. |
| `light.*` | No gradient tokens. Proposed as a **named group** precisely so "the pendant" is one system object and not four hand-written radial-gradients that drift apart. |
| `type.*` ramp | Families and weights are declared but no sizes, line-heights or tracking, so every screen re-decides. |
| `space.*` | Only `sectionY`/`sectionYLg`/gutters — no internal scale. |
| `size.mediaRatio` | No aspect-ratio token, and the photography slot is this sprint's central problem. Reserving the wrong ratio is how a designed slot still breaks when the real frames land. |
| **Not invented, deliberately** | There is **no wordmark or logo token** and this candidate proposes none. The preview *typesets* "The Links" and, in the footer, the endorsement lockup (mark → rule → venue line) per `brand-direction.md` §4.2. It draws nothing. The SVG lockup set stays a commission. |

---

## 7. The missing photography, and how this candidate handles it

There is no photograph in the repo and stock imagery is a named ship-blocker. The slot is
therefore **drawn**, at the shoot's own **3:2** ratio, in the measured register from §8 of the
spec: warm near-black room (`roomBlack #17120E`, R−B +9, matching the shoot's +15 to +19 and its
33–38% near-black coverage), warm pendant pools, one cool lit screen (`screenLit #A8CBDC`,
standing in for the 7–8% of saturated pixels in the 210–240° band), and a vignette.

It is drawn as a **lighting diagram, not a fake photograph** — flat shapes, no detail, obviously
a reservation. Each slot is labelled with a chip.

**The asymmetry is the point, and it is honest.** Lakeville's slot is drawn *lit* and reads
"Shoot exists · not in the build". Stillwater's is the same room with **the lamp off, the screen
dark and its outline dashed**, and reads "Shoot not yet commissioned", with a line under the
section saying so in words. That is a true statement about the business — one venue has a
professional shoot, the other has zero frames — rendered as a visual difference rather than
smoothed away. It does not demote Stillwater; it shows the client, in one glance, what the
missing shoot costs. Never a Lakeville frame standing in for Stillwater, which is what the
current site does on `/bookingstillwater`.

On the hero the slot is desktop-only: below 1024px the hero photograph becomes the section's own
light rather than a separate frame, so the trust strip stays reachable within roughly one hero
screen-height on a 390×844 phone (spec §11.3).

---

## 8. Which of §10's weaknesses this overlay answers

| § | The weakness | The token answer |
|---|---|---|
| 10.1 | Not one image on the page | Three drawn slots at the correct ratio and register; `size.mediaRatio` + `surface.room` + `light.roomVignette` |
| 10.2 | One dark hero, then eleven feet of white | Six fields in sequence — night → linen → linen → wheat → emberTint → night → forest — plus `light.pendant`. Pure white removed entirely. |
| 10.3 | One undifferentiated card box for three jobs | Three container roles: `card` (oat + `elevation.lamp`), `card--feature` (emberTint + a stat), `waitlist` (`elevation.lampLift`). Five cards on a 1.5fr/1fr/1fr grid with Play spanning two rows — no hole, no three equal cards. |
| 10.4 | No brand mark | Typeset only: wordmark in the display face; footer shows the §4.2 endorsement lockup. Nothing drawn. |
| 10.5 | The action colour barely appears | `primary.onDarkFill` — amber becomes the CTA on dark, at 7.35:1. Ember now also carries card affordances, the stat, the lamp rule and the offer eyebrow. |
| 10.6 | The trust strip is styled as fine print | Promoted onto a lifted `surface.raised` panel; hours at `type.body.base` **600**, not `small`. The caveat is a bordered chip in `accent`, visually distinct from the hours rather than the same grey. |
| 10.7 | The proof stub is a note to ourselves | The honest stub renders verbatim behind an "Awaiting content" chip, above three dashed frames sized for real quotes with an explicit byline slot. No invented name, no star row, no avatar. |
| 10.9 | The differentiator looks like a newsletter box | The waitlist is the only surface on the page at `elevation.lampLift`, with a badge, 12px-radius fields on a real 3:1 border, and the degradation note rendered as stated. |
| 10.10 | No motif, no rhythm | The lamp rule, in both polarities, above every `<h2>`. |

Not answered, on purpose: **10.8** (nothing distinguishes the two venues) is only *partly*
addressed — the photography slots differ honestly and the meta chips carry the real bay counts
and opening years, but whether Lakeville should be visually senior is spec §6 open question 1, a
business call. Flagged, not resolved by a token set.

---

## 9. One addition beyond the §7 copy sheet

The Play card carries `$35 / hour` with `Per bay, not per person · Summer 2026 rate, published
through 3 Oct 2026`. Every value is verbatim from the spec's §8 data sheet — nothing invented,
nothing undated — and it is what gives Play visual seniority over Improve, which §10.3 asks for.
But §3.3 lists the five cards' copy as fixed, so this is **flagged rather than assumed**: it is
one block to delete if the copy sheet is treated as closed. Noted in the preview itself as well,
so the reviewer sees the flag without reading this file.
