# The Links — style guide

> Prose companion to the canonical token file. **[`tokens.json`](tokens.json) is the source of
> truth**; this document is how to use it, and why it is shaped the way it is.
>
> | Thing | Where |
> |---|---|
> | Canonical tokens (DTCG) | `marketing/websites/the-links/design/tokens.json` |
> | Compiled custom properties | `src/styles/tokens.css` — **generated, never hand-edit** |
> | Tailwind utility mapping | `src/styles/global.css` (`@theme`) |
> | Compiler + contrast gate | `scripts/build-tokens.mjs` |
> | The system, rendered | `/styleguide` — internal, `noIndex` |
> | How the brand was decided | [`RUN.md`](RUN.md) · [`token-sets/blue-navy.md`](token-sets/blue-navy.md) |
> | Voice, in full | [`../brand-direction.md`](../brand-direction.md) §6 · [`../strategy.md`](../strategy.md) §2 |
>
> Version 2.0.0 · 2026-08-02 · supersedes the 1.x forest-green set kept at
> `design/tokens.v1-forest.json.bak`.
>
> **Nothing in this document invents a value.** Every hex, ratio, size and rule below is read out
> of `tokens.json`. Where a number was computed rather than quoted, it was computed with the WCAG
> 2.1 relative-luminance formula — the same one the build gate and `/styleguide` use — and it says
> so.

---

## 1. The register

**Softened brutalist — a scoreboard, not a brochure.**

The page is built out of fields, rules and figures. Hierarchy comes from mass, scale and ground
inversion, not from decoration: a section is a full-bleed band of one colour, a boundary is a
visible rule at a declared weight, a heading is heavy and tight, and a number is set large enough
to be read across a room. There are no shadows anywhere, no gradients, and exactly one radius on
the whole site — `radius.control` at 3px, on buttons, inputs and switcher chips. Panels, cells,
badges and media slots are square, and `radius.badge` is declared `0` explicitly so nobody
helpfully rounds a tag.

The softening is deliberate and it is *small*: three pixels of radius, one lighter internal rule
weight (`border.ruleQuiet`, 1px, where a structural rule would be 2px), one step more air inside
cells, and a display peak of 800 rather than 900. Everything else stays hard. The register has to
survive the beginner — the largest untapped segment and the one the copy is written for — so the
loudest treatment on any page belongs to the reassurance line, not to the flex.

The page is cold everywhere by construction. Six stops of one blue hue do every job a neutral ramp
would do elsewhere, which leaves ember and amber as the only warmth on the page. That is not a
flourish; it is the physical fact the photography will record — a near-black room whose only light
is warm practical pendants over the bar. The moment any structural element goes neutral, the ember
stops reading as *the light that is on for you* and goes back to being *an orange*.

---

## 2. Choosing a colour

**Always a semantic role. Never a palette primitive.**

`palette.*` is a set of raw values with no opinion about where they are legal. `semantic.*` is the
same values bound to a job, each one naming the ground it belongs on so its ratio is checkable.
A component that reaches past the semantic layer has thrown away the only thing that makes the
value safe.

The question to ask is never "which blue" — it is **"what is the ground, and what is this text/fill/rule
doing on it?"** Answer those two and the token is determined:

| I am putting… | …on a light ground | …on midnight |
|---|---|---|
| A display heading | `semantic.ink.displayOnLight` | `semantic.ink.onDarkStrong` |
| Body copy or a link | `semantic.ink.bodyOnLight` | `semantic.ink.onDark` |
| A caption, meta, secondary line | `semantic.ink.mutedOnLight` | `semantic.ink.mutedOnDark` |
| The primary action | `semantic.primary.default` fill + `semantic.primary.on` label | `semantic.primary.onDarkFill` fill + `semantic.primary.onDarkFillInk` label |
| A structural boundary | `semantic.rule.onLight` | `semantic.rule.onDark` |
| A band separator | `semantic.rule.scoreOnLight` | `semantic.rule.scoreOnDark` |
| Focus | `semantic.state.focus` | `semantic.state.focusOnDark` |

On the ember band there is a third column: `semantic.ink.onAccentBand`, `semantic.rule.onAccentBand`,
`semantic.state.focusOnAccentBand`. Nothing dark goes on that band at all — see §4.

### The prohibitions

These live in the `rules` block of `tokens.json` and are rendered in full on `/styleguide`. Each
exists because a measurement said so; breaking one ships an accessibility defect.

| Rule | The short version |
|---|---|
| `noEmberOnDark` | Ember fill on midnight is 2.35:1. On dark, the CTA is an amber fill with midnight text (9.48:1). |
| `noAmberOnLight` | Amber on white is 1.85:1. Amber is a dark-ground token, full stop. |
| `noScreenLightOnLight` | screenLight on white is 1.58:1. It exists to be bright against midnight. |
| `noDarkOnAccentBand` | Nothing dark is legible on the ember band — midnight 2.35:1, forest 1.36:1. |
| `noInkOpacityForText` | Never derive secondary text from an opacity of the ink. Use `semantic.ink.mutedOnLight`. |
| `noWarningOnGreige` | emberMid is 3.66:1 on greige. Warning text belongs on white or paper. |
| `noMutedOnDarkOverNavy` | slate on navy is 4.16:1. On the navy row-hover ground use `ink.onDark`. |
| `hoverIsComputed` | The codebase brightens on hover; ember's darkness was chosen so the brightened form still clears 4.91:1. |
| `noShadows` | Depth is rules and ground inversion. There is no shadow token because there is no shadow. |

Two of these are worth restating because they are counter-intuitive:

- **`noDarkOnAccentBand` and `noEmberOnDark` are the same measurement.** Contrast is symmetric:
  midnight-on-ember and ember-on-midnight are both 2.35:1. The ban runs in both directions from one
  number, not from two. The waitlist on the ember band sits inside a paper slab punched out of the
  band, and inside that slab everything reverts to light-field styling.
- **`noInkOpacityForText` is a policy, not a threshold.** The rule's own text cites 4.39:1 for
  `ink/70` — that number is the retired **forest** ink (`#124B2E` at 70% over white computes to
  4.39:1). Against today's navy ink the same step measures **5.21:1**, and the ladder crosses the
  4.5:1 floor between /65 and /66 (computed; the full ladder is rendered on `/styleguide`). The rule
  still holds — an opacity is not a token, it silently re-derives itself against whatever ground it
  lands on, and nobody should be navigating that crossover by feel — but the *number* in the rule
  describes a palette that no longer exists. See §10, open items.

### What you can actually type

`global.css` maps a **subset** of the system into Tailwind utilities. Reach for these first:

| Utility | Token behind it |
|---|---|
| `text-ink` | `palette.navy` — display ink, 13.31:1 on white |
| `text-inkBody` | `palette.navyMid` — long-form body, 9.92:1 |
| `text-inkMuted` | `palette.inkMutedCool` — secondary text, 6.87:1. **Not** `text-ink/70`. |
| `bg-surface` / `text-surface` | `palette.paper` |
| `bg-primary` / `text-primary` | `palette.ember` |
| `bg-accent` | `palette.emberMid` — caution. Deliberately **not** amber. |
| `bg-midnight` `text-navy` `text-slate` `text-screen` `text-amber` `text-ember` `bg-paper` `bg-greige` `text-forest` | palette primitives, addressable where no role fits |
| `text-error` `text-warning` `text-success` `text-info` | the four light-ground states |
| `rounded-control` / `rounded-surface` | `radius.control` / `radius.surface` |
| `z-sticky` `z-overlay` `z-modal` `z-toast` … | `zIndex.*` |
| `min-h-tap` | `size.tapMin` — put it on anything tappable |
| `max-w-content` / `max-w-prose-page` | `size.contentMax` / `size.proseMax` |
| `px-gutter` `py-section` `py-section-lg` | `space.gutterX` / `space.sectionY` / `sectionYLg` |
| `p-s1` … `p-s10`, `gap-s5`, `mt-s4` | the `space.*` ramp |
| `p-cell` `p-cell-lg` `py-row` | `space.cellPadding` / `cellPaddingLg` / `rowPaddingBlock` |
| `text-hero` `text-section` `text-row` `text-card` `text-score-xl` `text-score-md` `text-lead` `text-body` `text-small` `text-label` `text-label-sm` | the eleven `typeScale.*` steps |
| `font-display` / `font-body` | `font.display` / `font.body` (`font-mono` is the starter's alias for the display slot) |
| `font-extrabold` `font-bold` `font-semibold` `font-normal` | `fontWeight.*` — the defaults are repointed at the tokens |
| `tracking-display-tight` `tracking-display` `tracking-label` `tracking-label-wide` | `tracking.*` |
| `leading-hero` `leading-display` `leading-score` `leading-body` `leading-label` | `lineHeight.*` |
| `border-hairline` `border-*-quiet` `border-rule` `border-*-score` `border-*-slab` (and `h-rule` / `h-score` / `h-slab` for a standalone rule) | the five-step `border.*` ladder — Tailwind has no border-width namespace, so these are `@utility` definitions in `global.css` |
| `scoreboard` | `font.numeric` + tabular/lining figures + `fontWidth.displayExpanded` + `fontWeight.displayHeavy`, in one class |
| `caps-label` | the caps label treatment: display face, 600, `labelBase`, `tracking.labelWide` |
| `duration-fast` `duration-slow` `ease-standard` | `motion.*` |

Most semantic roles have **no** utility — every `ground.*`, every `rule.*`, `primary.hover`,
`state.focus`, all of `media.*`. Use the compiled custom property directly
(`style="background: var(--brand-ground-accent-band)"` or an arbitrary value like
`bg-[var(--brand-rule-score-on-light)]`). The custom-property names are the token path in kebab
case: `semantic.rule.scoreOnLight` → `--brand-rule-score-on-light`.

There is also a block of **deprecated 1.x slot names** at the bottom of `tokens.css`
(`bg-watermelon`, `text-teal`, …). They exist only so unmigrated starter components still render.
Nothing new uses them.

---

## 3. Contrast policy, and the gate that enforces it

**WCAG 2.1 AA. Body text ≥ 4.5:1, large text and non-text boundaries ≥ 3:1. Nothing in this system
relies on the large-text allowance for body copy.**

Every text pairing in `tokens.json` records its measured ratio in its `$description`. Ratios are
computed from sRGB relative luminance, never estimated and never recalled. **Any new pairing must
be computed before it is used** — including one you are confident about, because the two failures
this system was built to fix were both confident.

`scripts/build-tokens.mjs` re-measures 23 pairings on every build and **exits non-zero** if any of
them drops below its floor. The gate list covers all seven ink roles, the primary fill and its
hover, the amber CTA label, all eight state colours, the two focus colours and the two structural
rules. A palette edit that quietly drops a text role below 4.5:1 fails the build instead of
shipping — which is precisely what did not happen on the old site, where a 3.20:1 button ran on all
41 pages because Squarespace aliased every button colour to one accent variable.

The gate's floors are floors. **Do not lower one to make a change pass** — the error message says
this, and it means it. If a value cannot clear its floor, the value is wrong.

`/styleguide` re-measures independently, on the page, at render time. If a swatch's computed ratio
ever disagrees with the ratio written in its own `$description`, one of the two is stale and both
should be treated as suspect until reconciled.

---

## 4. Type

Three families, three jobs:

| Token | Family | Use it for |
|---|---|---|
| `font.display` | Archivo (variable grotesque, weight 100–900, width 62–125) | Headings, CTA labels, caps labels, eyebrows |
| `font.body` | Open Sans | Everything a person reads as a sentence |
| `font.numeric` | Archivo | Scoreboard figures — **always** with `font-variant-numeric: tabular-nums lining-nums` so columns align |

A grotesque page face is what lets a slab wordmark read as a *mark* rather than as the same font
set larger. Archivo's width axis makes proportion a second hierarchy tool alongside weight, which
is why `fontWidth.displayExpanded` (112) exists and is reserved for scoreboard figures.

**Neither family is currently loading.** Archivo is not in `public/fonts` — the token file says so.
Open Sans *is* in `public/fonts`, but the repository declares no `@font-face` anywhere, so those
`.woff2` files are never referenced and the body face falls through to the system stack too. Both
are pending work; see §10.

**Display vs body vs numeric — the actual decision:**

- **Display** when the thing is a *label on the structure*: a section heading, a row heading, a
  button, an eyebrow, a caps label. Sentence case, always. Caps is reserved for small labels
  (`typeScale.labelBase` / `labelSmall`), the wordmark and button labels — and caps sentences are
  banned outright, which is what `labelSmall`'s own note means by "never sentences".
- **Body** the moment it is a sentence someone has to read for meaning. `typeScale.bodySmall`
  (0.9375rem) is the **floor** for anything a user must read; below it live only labels.
- **Numeric** for any published figure — bays, hours, prices, scores. These are the brand's proof,
  and the scoreboard idea is carried by real figures only. Never an invented statistic, never a
  decorative `01 / 04` index number.

The scale has eleven steps: four display, two scoreboard, three body, two label. Display and
scoreboard steps are fluid `clamp()`; everything from `displayCard` down is fixed. Weight ladder:
800 for h1 and scoreboard figures, 700 for h2/h3 and CTA labels, 600 for caps labels and eyebrows.

**One gap to know about:** `typeScale`, `tracking` and `lineHeight` are three *independent* scales.
The token file does not declare which tracking or line-height belongs to a given step, so every
surface currently pairs them by hand. `/styleguide` infers a pairing from the token names and
flags it as inferred. Until the binding is declared, treat the pairing as a convention, not a rule:
tight tracking with the two largest display steps, normal display tracking below that, zero
tracking on body, and the two wide trackings on caps labels only.

---

## 5. Space and border rhythm

`space.s1`–`space.s10` is the ramp — 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 2.5 / 3.5 / 5 / 7rem. It is
not a linear scale and should not be treated as one: the jumps widen deliberately so that "one step
up" is always a visible change rather than a nudge.

Above the ramp sit the named jobs, and these are the ones to reach for:

| Token | Value | Job |
|---|---|---|
| `space.sectionY` / `sectionYLg` | 4rem / 8rem | Vertical section rhythm |
| `space.gutterX` / `gutterXLg` | 1.5rem / 4rem | Page gutters |
| `space.cellPadding` / `cellPaddingLg` | `s6` / `s7` | Inside a cell or panel |
| `space.rowPaddingBlock` | `s6` | A list row |
| `size.contentMax` / `proseMax` | 75rem / 46.875rem | The two measures |
| `size.tapMin` | 44px | A hard floor on density — never negotiate this one |
| `size.controlSm/Md/Lg` | 2.25 / 2.75 / 3.25rem | `controlMd` = `tapMin` and is the default |

The aliases matter: `cellPadding` *is* `s6`. Do not re-derive it — bind to the named token so a
change to cell rhythm is one edit rather than a search.

**Borders are a five-step ladder, and the step carries meaning:**

| Token | Width | Means |
|---|---|---|
| `border.hairline` | 1px | A divider *inside* a block — the ledger rules |
| `border.ruleQuiet` | 1px | A secondary internal boundary (these were 2px before the softening) |
| `border.rule` | 2px | A component boundary: inputs, media slots, cards |
| `border.score` | 4px | Band separators, and the focus slab |
| `border.slab` | 8px | The lead rule above a section heading |

Depth is expressed by **ground inversion plus a rule**, never by a shadow. A "raised" surface is
`semantic.ground.raised` with a 2px `semantic.rule.onLight` around it. An overlay is signalled by
the scrim (`opacity.scrim`, 0.72), not by a shadow. The `elevation.*` tokens all resolve to `none`
and exist so the answer is explicit rather than improvised.

Focus is a **slab, not a glow**: `focus.width` (= `border.score`, 4px), `focus.offset` 2px, style
solid, in `state.focus` / `state.focusOnDark` / `state.focusOnAccentBand` depending on the ground.

Motion is near-instant by register: `0ms` for ground and rule changes (the default), `90ms` for
colour-only transitions on interactive elements, `180ms` as the absolute ceiling. Anything that
moves must be gated behind `prefers-reduced-motion`.

---

## 6. Component rules

1. **A component references `semantic.*`, never `palette.*`, and never a literal.** If the role you
   need does not exist, that is a finding to record — not a licence to reach past the layer.
2. **Every component states the ground it is for.** `BookButton`'s `solid` and `outline` are
   light-ground variants; `onDark` is for a dark field. A variant on the wrong ground is not a
   styling preference, it is an arithmetic failure — the whole point of `noEmberOnDark`.
3. **One name for one action.** `Book a Bay`, sentence case, everywhere. When the action leaves the
   site, the label says where it goes (`Book at Lakeville →`) and the link carries
   `target="_blank" rel="noopener"` plus a screen-reader note. Never link out mid-funnel without
   warning.
4. **No state is a dead end.** `LeagueCard` has three registration states and all three carry an
   action: `open` registers, `full` and `between` both fall through to `WaitlistForm`. Zero of 126
   audited competitor sites offered a waitlist; it is the differentiator, and a card that renders a
   dead end throws it away.
5. **Beginner reassurance is required, not optional.** It is a required field on the league schema
   because 67% of the corpus omits it and it is the top reason people don't join.
6. **Prices, hours and figures are HTML text.** Never an image, never a PDF. Seasonality is a field
   on the page, never a second page.
7. **44px minimum on anything tappable.** `size.tapMin` is a floor on density.
8. **Disabled uses its own solid tokens** — `state.disabledSurface` + `state.disabledInk` at 4.74:1.
   `opacity.disabled` is deliberately `1`. Fading text with opacity is exactly how the 1.x system
   produced 4.39:1 body copy.
9. **Unverified data says it is unverified.** The `(hours being confirmed)` treatment is a real
   state, not a placeholder to delete before launch.
10. **Media slots are honest reservations.** There is no photography in this project; a slot is a
    drawn spec at the real 3:2 with a `media.slotFrame` rule around it and a caption naming the
    exact missing frame. No stock, no AI imagery, and **never** illustrate one venue with the
    other's photography — that is a trust defect, not a styling one.

---

## 7. Voice

The full treatment is `brand-direction.md` §6; this is the operating summary.

**Three lines.** We are a room you want to be in, that happens to have golf in it — lead with the
evening, not the equipment. Say the actual number: prices, hours, bay capacity, the cancellation
window, plainly, in text, before anyone has to ask. Sound like the two guys who wrote `/our-story`
— warm, specific, self-deprecating, and never making the reader feel unqualified.

**Banned outright: "premier", "state-of-the-art", "ultimate".** They saturate the segment, carry no
information, and "Premier Indoor Golf" is currently in every one of the old site's 41 page titles.
Also banned: exclamation points in headings, and any construction that implies the reader already
golfs.

**Sentence case everywhere**, including buttons. Caps is a *label* treatment at
`typeScale.labelBase` / `labelSmall` with `tracking.labelWide` / `labelWider` — never a sentence.

Specifics beat adjectives every time: "four bays, leather sofas, and the bowling alley's kitchen
next door" outperforms any amount of "state-of-the-art", and it is the only version a competitor
cannot copy.

---

## 8. How to change a token

```bash
# 1. Edit the canonical file — this is the ONLY file you edit.
$EDITOR marketing/websites/the-links/design/tokens.json

# 2. Recompile. Fails loudly if any gated pairing drops below its floor.
npm run tokens:build

# 3. Commit BOTH files: tokens.json and the regenerated src/styles/tokens.css.
```

- **`src/styles/tokens.css` is generated. Never hand-edit it.** It is byte-compared in CI.
- **`npm run tokens:check`** is the gate. It recompiles in memory and fails if the committed
  `tokens.css` differs, with the message *"tokens.css is STALE — run npm run tokens:build"*. It runs
  on every PR and push in `.github/workflows`, and it is the same shape as the `tina:lock:check`
  gate: a generated file plus a check that fails when someone edits the source and forgets to
  regenerate.
- **The same command runs the contrast gate.** A change that drops a gated pairing prints the
  offending pairing, its measured ratio and its floor, and exits 1. Fix the value. Do not lower the
  floor.
- **`tokens.css` is excluded from Prettier** (`.prettierignore`). Prettier lowercases hex values and
  rewraps the long font stacks, which makes the committed file differ from the compiler's output and
  fails `tokens:check` on a file nobody edited. The generator owns that file's formatting.
- **Adding a colour means adding a ratio.** Compute it against every ground it can appear on, record
  it in the `$description`, and add the pairing to the `GATE` array in `scripts/build-tokens.mjs` if
  it is text-bearing. A token without a measured ratio is not finished.
- **Breakpoints are the one thing that cannot be a custom property.** CSS custom properties do not
  work inside `@media`, so `breakpoint.*` is documentation: the `sm:`/`md:`/`lg:`/`xl:` prefixes in
  markup still resolve to Tailwind's own defaults. Keeping the two in sync is manual, and the
  compiler emits a reminder comment at the foot of `tokens.css`.
- **After changing anything, run the full five:** `npm run tokens:check`, `npm run build`,
  `npm run check`, `npm test`, `npm run lint`.

---

## 9. Decision log

The three calls that shaped this system, and what they cost.

### 9.1 Forest green: demoted from the theme's black to exactly two jobs

Forest `#124B2E` was the 1.x theme's declared "black" and backs **66 sections** of the live site. In
this system it grounds no band, inks no text, rules no boundary and heads no section. It keeps two
named jobs:

1. **`semantic.media.slotFairway`** — the projected course *inside* the simulator screen, at 6.41:1
   against `slotScreen`. This is the honest place for it: in the actual building, the green is not
   the room, it is the thing on the wall.
2. **`semantic.state.success`** — 10.14:1 on white. This retires `palette.retired.moss` as redundant;
   moss only ever existed so success would not read as body text *while forest was the body text*.

**Why not retire it.** It is the brand's one piece of real colour equity and it is on the door in
Lakeville. A rebrand that appears to erase the original venue's identity is how rebrands get
reversed.

**Why not keep it structural.** Forest on midnight is 1.73:1 — as a second dark ground it would not
read as a second ground at all, which reproduces the white-vs-paper complaint at the dark end.

**The costed retreat, if the client ever wants green back as a ground:** repoint the jobs band's
ground token to forest. One token, one band. Every on-midnight ratio reproduces on forest within
0.6, with one exception that must swap back — `slate` on forest is **3.17:1** (computed) and fails
body, so that band's muted text reverts. *Caveat:* the retreat path as written in the token file
names `semantic.ground.jobs`, and no such token exists in the file — see §10.

### 9.2 The slate blue's 3.20:1 failure was a lightness problem, not a hue problem

`#7794A6` sits in `palette.retired.slateAsButton` with a specific and correct reason: white text on
it is **3.20:1**, and because the old site aliased every button colour to one accent variable, that
failure shipped on every button of all 41 pages.

That is a **lightness** failure in a **text-bearing fill** role — not an argument against blue, and
not an argument against that value. Turn the role around and the same hex is fine: as **muted text
on midnight** it measures **5.48:1**, AA body with margin. It is revived unchanged as `palette.slate`
→ `semantic.ink.mutedOnDark`, and it is **never a fill here**.

It comes back carrying four bans, which make it the exact cool mirror of the amber rule: slate is
legal on midnight only — white 3.20:1, paper 2.94:1, **navy 4.16:1**, ember 2.33:1. The navy ban is
the operative one, because navy is the row-hover ground: `rules.noMutedOnDarkOverNavy` exists so
that no muted text ever appears inside a hoverable row. Use `semantic.ink.onDark` there (12.24:1).

The general lesson is the one worth carrying forward: **a colour does not fail, a colour-in-a-role
fails.** Retiring the value would have been the wrong correction to the wrong object.

### 9.3 `screenLight` had to be invented, because the brief was literally inexpressible

The brand's stated visual idea is *"a warm dark room with one bright screen in it."* The 1.x palette
had exactly one cool value, `palette.retired.screen #2E5A6E`, and it measures **1.81:1** on the dark
ground. A simulator projection painted in it is invisible on the very field it is supposed to punch
out of. The brutalist round-1 candidate had to fake the projection in a *warm* neutral, which is the
opposite of the idea.

This was the single most useful finding of the whole design run: **the palette could not render its
own brief.** No amount of layout work fixes that; it is a missing value.

`palette.screenLight #A9D3F2` closes it at **11.07:1 on midnight**, and the direction is built
around it — six stops of one blue hue running from the room at night (`midnight`, relative luminance
0.0100) to the screen on the wall (`screenLight`, 0.6143 — both computed). It renders in exactly one
place, and it is banned
everywhere else **by rule, not by ratio** (`rules.noScreenLightOnLight`, and 1.58:1 on white makes
the point anyway): if the projection colour also sets captions and rules, the page has many screens
and no room.

It also gave the system its informational state on dark (`state.infoOnDark`, 11.07:1) — a role the
old palette could not fill either.

---

## 10. Open items

Rendered honestly at the foot of `/styleguide`, and repeated here so this document stands alone.

**From `notes.pendingImplementation` in the token file:**

- **Archivo is not self-hosted.** `font.display` names it; `public/fonts` does not contain it. Until
  it lands, the display face falls back to the system grotesque and the brand reads generic.
  Self-hosting Archivo (variable, subset to latin) and retiring Bitter is the outstanding task.
- **Bitter still ships.** It is only needed for the wordmark and should leave the critical path once
  Archivo lands.
- **There is no brand mark.** The wordmark is typeset. The favicon is still the **retired Lakeville
  Links emblem**, so every social share previews the old brand.
- **There is no photography.** Media slots are designed reservations. Stillwater has never been
  photographed at all.

**Found while writing this guide and the styleguide page — not yet in the token file:**

- ~~**No `@font-face` exists anywhere in the repository.**~~ **STALE — no longer true.** `global.css`
  now declares five `@font-face` blocks against `public/fonts/`, Archivo included, so both faces load.
  (`notes.pendingImplementation.archivoNotSelfHosted` in the token file is stale in the same way.)
- **`typeScale`, `tracking` and `lineHeight` have no declared binding.** Three independent scales
  with no statement of which pairs with which, so every surface infers its own.
- **`rules.noInkOpacityForText` cites a stale number.** Its 4.39:1 for `ink/70` is the retired forest
  ink; today's navy ink measures 5.21:1 at that step (computed). The `global.css` comment claiming
  "any ink opacity below /75 fails" is stale in the same way — the real crossover is between /65 and
  /66. The prohibition is right; the arithmetic in it is inherited.
- **`LeagueCard` derives body text from an ink opacity.** `text-ink/80` on the one-liner is exactly
  the shape `rules.noInkOpacityForText` forbids. It happens to pass — 7.17:1 on white, computed —
  but it re-derives itself against whatever ground the card lands on, which is the reason for the
  ban. It should be `text-inkBody`.
- ~~**`semantic.primary.onDarkFill` and `BookButton`'s `onDark` variant disagree.**~~ **CLOSED**
  (homepage port, 2026-08-02). `BookButton` now renders the token — an amber fill with midnight ink
  at 9.48:1 — and gained a `ghostDark` variant for the secondary action on a dark field. Its hover
  states are `primary.hover` / `primary.active` rather than `hover:opacity-90`, which used to fade
  the label along with the fill.
- ~~**The `-lg` spacing utilities do not resolve.**~~ **STALE — no longer true.** `tokens.css` emits
  `--brand-space-section-y-lg` and `--brand-space-gutter-x-lg` and the legacy aliases point at exactly
  those names. Re-measured in the browser during the homepage port: `py-section-lg` computes to 128px
  (8rem) and `px-gutter-lg` to 64px (4rem) on every band of `/`.
- **`palette.forest`'s retreat path names a token that does not exist.** It says "repoint
  `semantic.ground.jobs` to forest", but `semantic.ground` has no `jobs` entry — the grounds are
  `chrome`, `hero`, `base`, `raised`, `alt`, `accentBand`, `rowHover`, `media`. The jobs band uses
  `ground.hero`/`chrome`'s value by way of midnight. Either add the role or correct the note; as
  written, the one documented escape hatch cannot be executed literally.
- **No `state.unverified` role.** `(hours being confirmed)` is neither an error nor a success; it is
  unverified data, and it currently borrows `accent.caution`.
