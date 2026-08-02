# Design-factory run — The Links, brand visual sprint

> kiwitron design-factory · run started 2026-08-02 · surface: **homepage**
> Workflow: `kiwitron/docs/design-factory-workflow.md`. Target for this run: **step 3 (gallery)** —
> first concept directions, ready for a human steer.

## Step 0 · Foundation — ✅

Canonical DTCG tokens exist at `design/tokens.json` (79 tokens), authored in the brand
reconciliation pass and already bound into the live site via `src/styles/tokens.css`.
Contrast ratios in that file were verified by recomputation, not taken on trust.

## Step 1 · Frame — ✅

`design/screen-spec-home.md` — section-by-section spec, the real copy, the real data, the
codebase grounding, and a specific list of what is visually weak today.

## Step 2.0 · PREFLIGHT

> ⚠️ **Confirmed by the orchestrator, not by the human.** The workflow requires a human ✅
> here. The human explicitly delegated this run ("I am stepping away again and need this to
> run autonomously to get to first concepts directions"), so the checklist is recorded and
> confirmed on their behalf. **The step-3 gallery remains a real human gate** — nothing
> converges until they steer.

| Item | Setting | Why |
|---|---|---|
| **RENDER surface** | self-contained HTML, generated from each candidate's token artifact | The review surface needs exactly this shape; generating it directly avoids a lossy hop. Tool HTML is a disposable preview, never the artifact. |
| **REVIEW surface** | **wisplet** (the default) | The human is away. wisplet gives a durable pause, a shareable link, and a Comment/Change round-trip. Paper and Claude Design cannot surface comment text headlessly. |
| **Step-0 binding verified** | ✅ `design/tokens.json` | Real DTCG file, already bound to the shipped site. Not hand-carried. |
| **Divergence axis** | **`theme → token_set`** | The human's verdict is on the *brand*, not the IA. On this axis each candidate is a token overlay that swaps the visual language while the layout stays identical — which is exactly "propose a different brand", and it keeps the four options honestly comparable. |
| **Dispatch inputs confirmed** | ✅ `tokens.json` + `screen-spec-home.md` + `strategy.md` §2 (positioning/voice) + `brand-direction.md` | |
| **Render target** | `design/candidates/` + `design/token-sets/`, fresh for this run | |

## Step 2 · Diverge — 4 candidates, one register each

Four, not five. The taste layer's failure mode is "three near-duplicates in the same safe
layout", and there are exactly four registers in `kiwitron/design-factory/taste/registers.md`.
One register per candidate gives four genuinely different stances; a fifth would have had to
double up on a register and would have produced the near-duplicate the layer warns about.

| Candidate | Register | The stance |
|---|---|---|
| `home-editorial` | `editorial-minimal` | The venue as a place with atmosphere — photography-led, big type, generous air |
| `home-brutalist` | `brutalist` | Loud and unapologetic — the "trash talk encouraged" register the segment rewards |
| `home-soft` | `soft` | Warm and welcoming — built for the person who has never held a club |
| `home-technical` | `technical-dense` | The launch-monitor read — data-forward, precise, for the serious golfer |

### Type constraint (documented, because it shapes what you see)

A wisplet `design` variant loads **no network resources at all**, so a preview cannot pull a
web font. Each candidate therefore: (a) **declares its intended production typeface in the
token overlay** — the artifact is the source of truth — and (b) renders its preview using
either a system font stack or one of the two families already self-hosted in this repo
(Bitter, Open Sans), base64-embedded if it wants them. **Judge the preview's type as an
approximation; judge the overlay's type declaration as the real proposal.**

## Round 1 gallery → human steer (2026-08-02, wisplet `rv_RPegEabiyFaa8c`)

> Daran Han: *"Lets g more brutalist but try to adopt a blue base theme color versus green -
> next diverge lets soften brutalist just a tiny tiny touch and then play with 3 new color
> palette directions"*

**Round 2 setup.** Register is now **fixed** (softened brutalist); the divergence axis narrows
to **palette only**, 3 candidates. So the three stay honestly comparable, the softening delta is
specified centrally and applied **identically** by all three — otherwise the comparison is
confounded by three different readings of "a tiny tiny touch".

### The softening delta (identical across all three)

Applied to `brutalist.json` / `home-brutalist.html` as the base composition:

- **Radius:** 0 → **3px on interactive elements only** (buttons, inputs, chips). Panels, cells
  and image slots stay square. This is the single most legible "less hostile" signal.
- **Rules:** the visible ruled grid **stays** — it is the idea. Secondary/internal dividers may
  drop 2px → 1px; structural and section rules stay 2px.
- **Spacing:** one step more air inside cells only. Section rhythm and full-bleed alternation
  unchanged.
- **Type:** peak display weight may come down one step. Sentence case stays. Scale unchanged.
- **Unchanged:** the scoreboard idea, labelled cells, ground inversion, hierarchy from weight
  and scale, and the reassurance copy carrying the loudest treatment.

### Two notes that shape round 2

1. **Blue resolves the gap round 1 found.** The palette could not render its own brief — "a warm
   dark room with one bright screen" — because `screen` is 1.81:1 on night. A blue base gives
   the system the cool axis it never had, so the brief becomes expressible rather than
   worked around.
2. **The old slate blue's failure was lightness, not hue.** `#7794A6` failed at 3.20:1 as a
   *text-bearing action colour*. That is not an argument against blue; it is an argument against
   that value in that role. A blue ink or ground at proper darkness is entirely sound —
   and every candidate still computes its own ratios.
3. **Dropping forest costs the one piece of real equity.** Forest `#124B2E` is the current
   theme's declared "black" across 66 sections. Round 2 tests whether blue earns that slot; the
   candidates should each say what they do with green — retire it, demote it to an accent, or
   keep it as a secondary — rather than silently deleting it.

### ⚠️ Verification gotcha — headless Chrome's 500px floor

Headless Chrome on macOS enforces a **500px minimum window width**. `--window-size=390` does
not give you a 390px viewport; it gives you a **390px crop of a 500px layout**, which looks
exactly like a horizontal-overflow bug that isn't there. Round 1's `home-brutalist.html`
reproduces the same artifact.

**Consequence:** any "verified at 390px" claim made this way is invalid, including round 1's.
Use CDP `Emulation.setDeviceMetricsOverride`, an `<iframe width="390">`, or a real device, and
treat overflow reported at `--window-size=390` as unproven rather than as a defect. Two round-2
explorers hit this independently; one candidate looked broken until re-rendered in a 390px
iframe, where it is clean.

### Open bug in the base composition — fix at convergence, not in a sibling

**At 1440px the sticky header wraps to two rows.** It reproduces in round 1's
`home-brutalist.html`, so it belongs to the inherited composition, not to any palette. Left
unpatched deliberately: fixing it in one of three siblings would make that candidate look
better for a reason unrelated to the axis being compared. **Convergence owns it.**

## Findings from divergence that outlive this run

Things the explorers surfaced that are true regardless of which direction wins.

1. **The canonical `tokens.json` has no structural vocabulary at all** — no type scale, no
   radius, no border, no elevation, no tracking, no line-height, no internal spacing scale.
   All four candidates had to declare their own, which means they currently carry four private
   structural languages. **The convergent phase must promote the winning set into the canonical
   file** rather than leaving that gap open; otherwise the next surface re-invents it.
2. **The palette cannot render its own brief.** The brand's stated visual idea is "a warm dark
   room with one bright screen in it", but `screen` measures **1.81:1 on night** — there is no
   bright cool value in the palette, so the one thing that makes the photography distinctive
   cannot be expressed in UI. A `palette.screenLight` was *proposed, not added*. This is the
   single most useful gap the sprint found.
3. **The dark-field CTA has a third option nobody had written down.** `brand-direction.md`
   §2.4.2 offered only paper-fill or paper-outline on dark, which leaves the primary action
   colourless on the most-seen band. **Amber fill + night text measures 7.35:1 both
   directions** and keeps the action colour present. The ember-on-dark ban is untouched.
4. **The ember band traps you in mirror image.** On an ember ground, night text is 1.82:1 and
   forest 1.36:1 — so a dark button on ember fails exactly as an ember button on forest does.
   Not recorded in the base file; worth adding as an explicit prohibition.

## Step 3 · Gallery — human gate

Pushed to wisplet as `rv_RPegEabiyFaa8c` for the human's steer: select / reject / edit /
freeform. Nothing converges until then.

**Verification status.** All four: zero external asset loads (every `url()` is an internal SVG
fragment; the one `@font-face` is a `data:` URI), exactly one `<h1>`, wisplet design-lint clean
(51 findings, all the same benign "link is inert in the sandbox" advisory). The `brutalist`
explorer additionally rendered its own candidate in headless Chrome at 1440px and 390px and
fixed two real bugs it found that way — paper-on-paper text in the offer block, and a mobile
header flex-order error. The other three were verified structurally, not visually; the
orchestrator could not screenshot them (the browser extension times out in this environment),
so **wisplet is the first real visual check for `editorial`, `soft` and `technical`.**
