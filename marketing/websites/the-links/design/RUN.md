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

## Step 3 · Gallery — human gate

Pushed to wisplet for the human's steer: select / reject / edit / freeform. Nothing converges
until then.
