# `home-brutalist` — the brutalist token overlay

> Design-factory step 2 (DIVERGE) candidate · register **`brutalist`** · axis **`theme → token_set`**
> Artifact (source of truth): [`brutalist.json`](brutalist.json) · Preview (disposable):
> [`../candidates/home-brutalist.html`](../candidates/home-brutalist.html)
> Layout, IA, section order, copy and data are **fixed** per
> [`../screen-spec-home.md`](../screen-spec-home.md). Only the visual language varies.
> Status: **PROPOSAL** for a human gate. Not client-approved.
>
> Every contrast ratio below was computed from sRGB relative luminance per WCAG 2.1 §1.4.3,
> not estimated or recalled.

---

## 1. The one committed idea

**The page is a scoreboard, not a brochure.** Every fact sits in a labelled cell of a visibly
ruled grid; hierarchy comes only from weight, scale and ground inversion; and the section rhythm
is a hard alternation of full-bleed grounds with no soft transition anywhere:

```
night → white → night → white → EMBER → white → night
chrome  trust   jobs    proof   offer   venues  footer
 hero
```

Three mechanisms carry it, and they are the three things a sibling register would soften:

1. **Rules replace cards.** There is not one box on the page. Four rule weights
   (`border.hairline` 1px / `rule` 2px / `score` 4px / `slab` 8px) do every boundary a card,
   a shadow or a radius would otherwise do. `radius.*` is declared, and every value is `0`.
2. **Weight and scale are the whole hierarchy.** One display face at 900/800/600 against a
   quiet body face. The h1 runs to the full 75rem measure instead of a comfortable prose column.
3. **The one accent, used once, at full strength** — a full-bleed `#8A400A` ember band, and it
   is given to the **waitlist**, not to the hero.

### What a sibling would not do

Give the single loudest chromatic field on the page to a **form**. `editorial-minimal` keeps
colour scarce and semantic; `soft` would tint it; `technical-dense` would compress it into a
row. This candidate makes the waitlist — the one component **zero of 126 audited competitor
sites** have (`strategy.md` §3, screen-spec §3.5) — the largest colour event on the homepage.
That is the register and the strategy agreeing rather than compromising, and it is the direct
answer to weakness **§10.9** ("the differentiator is styled as a newsletter box").

---

## 2. What I kept, and what I replaced

### Kept — verbatim, and deliberately

| Thing | Why it stays |
|---|---|
| **Every colour in `palette.*`** | All twelve values are unchanged. See §3 — this is the headline. |
| **`space.sectionY` / `sectionYLg` / `gutterX` / `gutterXLg` / `size.contentMax` / `proseMax`** | Layout, and layout is fixed on this axis. |
| **`role.primary.default / hover / active / on`** (`#8A400A` / `#AD500D` / `#6D3308` / paper) | The ember and its computed hover states were tuned to this codebase's `hover:brightness-125`. Nothing here re-litigates that. |
| **`role.ink.muted` `#456052`** | Kept as the muted-on-light role, including the reason it exists (opacity is not a ramp: `ink/70` over white is 4.39:1 and fails). |
| **`role.state.focus` `#B85718` / `focusOnDark` `#F3B268` / `error` / `success`** | Unchanged values. Only the *shape* changes — a 4px offset slab, never a glow. |
| **`font.body` — Open Sans 400/600/700** | Unchanged. The warmth budget goes to the ember band, not to a fourth typeface. |
| **Sentence-case headings** (`brand-direction.md` §3.2) | Kept on purpose, and it is load-bearing for §5 below. |
| **The `variant="onDark"` inversion rule** (`brand-direction.md` §2.4.2) | Not broken — extended. A solid ember button on forest/night is still banned at 1.82:1. |

### Replaced

| Thing | Replaced with | Why, in one line |
|---|---|---|
| **`font.display` — Bitter** | **Archivo** (variable, weight 100–900, width 62–125) | A width axis makes scale *and* proportion into hierarchy tools, which is the entire hierarchy in this register; and a grotesque page face makes the slab wordmark read as a **mark** rather than as the same font set larger — a gain for a brand whose §10.4 problem is that it has no mark at all. Byte budget unchanged: one variable file for one variable file. |
| **The hero ground — `forest` `#124B2E`** | **`night` `#0D3520`** | Night was added specifically to sit beside photography that is 33–38% near-black; on a page with no photography it stands *in* for it. Type gets louder for free: paper on night is 12.48:1 vs forest's 9.32:1. |
| **The white/paper alternation (§10.2)** | **A seven-band hard alternation** | Two values that differ by almost nothing become four hard cuts and one full-strength colour band. |
| **Five identical bordered cards (§10.3)** | **A ruled row list, with the first row weighted** | A list has no bottom-right hole to leave. `Play` — the money row — gets an 8px amber slab rule and a 1.5× title; the four others get hairlines. Hierarchy where there was none. |
| **The `(hours being confirmed)` badge in the same muted grey as the hours (§10.6)** | **A `screen`-blue 2px-ruled caps tag** | 7.49:1, and visibly a *different kind of thing* from the data it qualifies. `role.accent.default` doing its declared informational/status job. |
| **The proof stub as a shipped note-to-self (§10.7)** | **Three hatched, hard-ruled quote cells + a bordered build-state note** | The container the real quotes will land in is now designed and visible; the stub copy is rendered verbatim inside a labelled note rather than sitting on the page as prose. |
| **Two identical venue cards (§10.8)** | **Two alternating full-width rows with asymmetric media slots** | Differentiated by *truth*, not decoration: `6` vs `4` at scoreboard scale, and a filled Lakeville slot vs an empty hatched Stillwater slot. |
| **Ornament: none (§10.10)** | **The rule system itself** | The 4px `score` rule under a section eyebrow, the 8px slab on the hero subhead and the featured row, the amber band separator — one recurring device, recognisable from a fragment. |

### Newly declared categories (the token file has none of these)

`radius` · `border` · `elevation` · `typeScale` · `tracking` · `lineHeight` · `fontWidth` ·
`motion` · an internal `space` ramp · `role.ground.*` · `role.rule.*` · `role.media.*` ·
`size.tapMin`. All are structural, not brand values. See §6 — they are a gap in the canonical
file, not an invention of this candidate.

---

## 3. Colour: zero new values

**This overlay adds no colour to the palette, removes none, and changes none.** Every hex the
preview renders resolves into `tokens.json`.

That is a position, not a coincidence. `brand-direction.md` §10.5 diagnoses the real problem:
*"the palette is designed and unspent"* — the ember appears on the homepage in exactly three
places and the hero CTA is a white rectangle. The brutalist answer to an unspent palette is not
a new palette. It is to spend the one you have, at full strength, in fewer places.

Two roles are **promotions of existing values** rather than additions:

- **`palette.sage` `#9CBEAD` becomes muted-text-on-dark.** Sage was retained-but-demoted to
  "a light field carrying forest text" and does almost nothing in the live system. On night it
  is **6.71:1** — a real secondary-text role the palette never had, filled with a value the
  brand already owns.
- **`palette.amber` `#F3B268` becomes the CTA fill on dark grounds** (see §4).

---

## 4. Every contrast ratio computed

Body gate **4.5:1**, large-text and non-text gate **3:1**. **No pairing this candidate renders
fails.** Bans are listed alongside passes because the bans are the load-bearing part.

### On the `night` ground — hero, jobs, chrome, footer

| Foreground | Ratio | Verdict | Used for |
|---|---|---|---|
| `white` `#FFFFFF` | **13.57:1** | ✓ AA body | h1, h2, h3 |
| `paper` `#F7F5F3` | **12.48:1** | ✓ AA body | body copy, nav, footer NAP |
| `greige` `#E5E1E0` | **10.46:1** | ✓ non-text | media-slot bright panel |
| `amber` `#F3B268` | **7.35:1** | ✓ AA body | eyebrow, reassurance, score rules, CTA fill |
| `sage` `#9CBEAD` | **6.71:1** | ✓ AA body | captions, slot labels, hairlines |
| `night` on an `amber` fill | **7.35:1** | ✓ AA body | the dark-field CTA label |
| ~~`emberMid` `#B85718`~~ | 2.85:1 | ✗ **banned** | — |
| ~~`ember` `#8A400A`~~ | 1.82:1 | ✗ **banned** | — |
| ~~`screen` `#2E5A6E`~~ | 1.81:1 | ✗ **banned** | — (see the gap in §6) |

### On the `white` ground — trust strip, proof, venues

| Foreground | Ratio | Verdict | Used for |
|---|---|---|---|
| `night` `#0D3520` | **13.57:1** | ✓ AA body | display headings, scoreboard figures, rules |
| `forest` `#124B2E` | **10.14:1** | ✓ AA body | body copy, links |
| `screen` `#2E5A6E` | **7.49:1** | ✓ AA body / ✓ non-text | the `(hours being confirmed)` tag, text **and** its 2px border |
| `ember` `#8A400A` | **7.45:1** | ✓ AA body / ✓ non-text | CTA fill boundary, the heavy score rule |
| `inkMuted` `#456052` | **6.89:1** | ✓ AA body | captions, quote-slot rules |
| `emberMid` `#B85718` | **4.76:1** | ✓ non-text (3:1) | the focus slab |
| `paper` on an `ember` fill | **6.85:1** | ✓ AA body | `Book at Lakeville` / `Book at Stillwater` / `Notify me` |
| `paper` on `emberHover` `#AD500D` | **4.91:1** | ✓ AA body | hover |
| `paper` on `emberActive` `#6D3308` | **9.08:1** | ✓ AA body | pressed |
| ~~`amber`~~ / ~~`sage`~~ / ~~`emberTint`~~ | 1.85 / 2.02 / 1.33:1 | ✗ **banned** | — |

### On the `ember` band — the featured offer

This band traps you the same way a forest band does, mirrored, and **the base file does not
record it**. Worth reading before anyone edits this section:

| Foreground | Ratio | Verdict | Used for |
|---|---|---|---|
| `white` `#FFFFFF` | **7.45:1** | ✓ AA body | h2, eyebrow, the rules around the promoted line |
| `paper` `#F7F5F3` | **6.85:1** | ✓ AA body / ✓ non-text | body copy, link — and the waitlist slab's own boundary |
| `greige` `#E5E1E0` | **5.74:1** | ✓ AA body | the lead-endpoint degradation note |
| ~~`amber` `#F3B268`~~ | **4.04:1** | ✗ **banned outright** | clears large-text 3:1 but fails body 4.5:1 — banned rather than conditionally allowed, so nobody sets it at 15px |
| ~~`sage`~~ | 3.68:1 | ✗ banned | — |
| ~~`night` `#0D3520`~~ | **1.82:1** | ✗ **banned** | a dark-green button on ember fails the 3:1 non-text gate exactly as an ember button on forest does |
| ~~`forest` `#124B2E`~~ | **1.36:1** | ✗ **banned** | — |

**Consequence, and it is a design rule not a workaround:** the waitlist sits inside a **paper
slab punched out of the ember** (6.85:1 boundary), and inside that slab everything reverts to
normal light-field styling — `night` h3 12.48:1, `forest` body 9.32:1, `inkMuted` placeholders
and degradation note 6.34:1, an `ember` submit with `paper` text 6.85:1, `emberMid` focus 4.37:1.

### The amber CTA on dark — the one new *rule*

`brand-direction.md` §2.4.2 offers two solutions for a CTA on a dark field: a paper fill with
forest text, or a paper outline. Both leave the primary action on the darkest and most-seen band
of the page **colourless** — which is a large part of why §10.5 reads the way it does.

This candidate adds a third, and it satisfies the same arithmetic:

> **`amber` `#F3B268` fill with `night` `#0D3520` text.**
> Label on fill **7.35:1** (✓ AA body). Fill against the night ground **7.35:1** (✓ non-text 3:1).

It does **not** relax the ban it sits next to: a solid `ember` button on night is still 1.82:1
and is still forbidden. And amber remains banned on every light ground (1.85:1 on white).

### Regressions this candidate closes

| Shipping today | Here |
|---|---|
| Hero eyebrow at `opacity-70` on forest | `amber` on night, **7.35:1** — no opacity anywhere in this overlay |
| Hero subhead at `opacity-80` on forest | `paper` on night, **12.48:1** |
| Trust strip entirely `inkMuted` at `text-sm` | Hours as `night`-on-white scoreboard figures, **13.57:1** |
| `(hours being confirmed)` in the same grey as the hours | A `screen`-blue ruled tag, **7.49:1**, visibly a different kind of object |
| No focus-visible styling at all (open ship-gate item) | A 4px offset slab: `emberMid` on light 4.76:1, `amber` on dark 7.35:1, `white` on the ember band 7.45:1 |

---

## 5. Keeping it welcoming to a beginner

This register's failure mode is that it reads as a club you are not in. The beginner is the
segment's largest untapped market (`strategy.md` §2, and 67% of league pages in the corpus fail
beginner reassurance), so this is a pass/fail condition, not a nicety. Four deliberate moves:

1. **The loudness is spent on the reassurance, not on the flex.** On the ember band, *"Never
   played in one? Most of our league players hadn't either. Handicaps keep it fair."* is set at
   display scale between two 4px white rules — **larger than the marketing paragraph above it.**
   In the jobs list, *"Up to five of you, same price."* breaks onto its own line in amber at
   display size. Screen-spec constraint 5 requires both strings stay visible; this candidate
   makes them the two most prominent sentences on the page after the h1. A first-timer meets the
   friendliest sentence at the biggest size.
2. **Sentence case, always.** `brand-direction.md` §3.2 is right that the segment is full of
   all-caps headings and they read as shouting. Caps + wide tracking here are reserved for small
   labels, the wordmark and button labels. **The register comes from mass and structure, not from
   volume** — which is also what separates real brutalism from "black page, neon accent".
3. **The trust strip answers the unconfident question first.** Hours at 3rem, on a hard white
   cut straight out of the black hero, address and phone as labelled rows with 44px targets. The
   person who is not sure they belong wants to know when it is open and whether they can just
   turn up, and this candidate answers that louder than it makes any claim.
4. **No gatekeeping vocabulary or iconography.** No golf jargon, no handicap or score ornament,
   no crossed-clubs motif. The scoreboard idea is carried **only by real figures** — 6 bays,
   4 bays, published hours — never by decorative index numbers, which is also the anti-slop rule
   against `01 / 4` labels the reader can already count.

Warmth also does structural work: the largest colour field on the page is a warm ember, the
accent throughout is the venue's own pendant light, and the only cool value on the page is the
one honest thing that *is* cool — the simulator screen.

---

## 6. Token gaps flagged, not invented

1. **There is no bright cool value — the palette cannot render its own photography brief.**
   `brand-direction.md` §5.1 states the register in one sentence: *"a warm dark room with one
   bright screen in it."* But `palette.screen` `#2E5A6E` was darkened until white text passed, so
   it is **1.81:1 against `palette.night`** — a simulator projection painted in it is invisible
   on the very ground it is supposed to punch out of. And `palette.sage` is a pale *green*.
   *Worked around, not papered over:* the media slot renders the bright panel in `greige`
   (10.46:1 on night) with a `screen`-blue horizon band inside it (5.77:1 on greige).
   *Proposed if the gate wants it:* `palette.screenLight`, a light 210–240° blue, **decorative /
   media only, never text-bearing**. Not added here.
2. **The canonical `tokens.json` has no radius, border, elevation, type-scale, tracking,
   line-height or internal spacing scale.** It carries colour, two font families, six weights,
   four spacing values and two widths. Every one of those missing categories is load-bearing for
   this register (radius 0, four rule weights, elevation explicitly `none`) and for every
   sibling. They are declared in `brutalist.json` as additions; **the convergent phase should
   promote the winning set into the canonical file** rather than leaving four candidates each
   carrying a private structural vocabulary.
3. **There is no warning / unverified state role.** `(hours being confirmed)` is neither an
   error nor a success — it is unverified data. This candidate uses `role.accent.default`
   (screen blue), which is the declared informational/status colour and fits, but a distinct
   `role.state.unverified` would stop that badge competing with a league `Full` pill.
4. **`elevation` is declared *empty* on purpose.** Recorded so a `shadow-sm` cannot drift back in
   during convergence and quietly cancel the register.
5. **Copy gap — flagged, not invented.** The register wants the published rate (**$35 / hour**,
   real and current through 2026-10-03) on the scoreboard. `screen-spec-home.md` §7 forbids any
   string not on the copy sheet and no homepage section carries a price, so **it is not on the
   page.** This is a one-string copy request for the convergent phase, not a licence.
6. **No brand mark, and none drawn.** Per §10.4 a candidate may *typeset* a wordmark treatment
   but must not draw a logo. The header sets `The Links` in the display face at 900, caps,
   0.22em tracked; the footer demonstrates `brand-direction.md` §4.2's endorsement system —
   `THE LINKS` / rule / `of Lakeville` and `of Stillwater` — using only real strings. The actual
   SVG lockup set remains commission #1.

---

## 7. Photography: how the absence is handled

There is no photography in the repo and **none is faked** — no stock, no gradient mesh standing
in for a hero image, no AI imagery. Two moves:

**1. The dark grounds do the photograph's job.** The hero is a flat near-black field because the
room is a near-black room. That is not a placeholder; it is the measured register
(mean luminance 54–74/255, roughly a third of every frame near-black) rendered as a ground. The
page therefore reads as the venue without a hero slot pretending to hold a frame that does not
exist. The `[needs-client-data]` hero photograph remains a real gap — it is flagged in §6 of the
spec and here, not disguised.

**2. Where the playbook actually demands frames (§3.6, "the space"), the slot is a spec drawing
built entirely from palette values that were themselves derived from the photography.**
`role.media.*`: a `night` ground, a `greige` bright panel with a `screen`-blue horizon for the
projection, `amber` pendants over a `forest` bar mass, a dashed `sage` rule marking the measured
near-black lower third, all at the real **3:2** the existing frames were shot at, inside a 2px
paper frame so it is unmistakably a **slot** and never mistaken for art.

**The two slots are deliberately asymmetric, because the truth is asymmetric:**

| | Lakeville | Stillwater |
|---|---|---|
| Slot | Drawn — pendants, bar, lit projection | **Empty**, hatched, with a hard amber cross |
| Caption | "A professional shoot of this room exists… It is not in this repository." | "No professional photograph of this room exists." |
| Tag | `needs-client-data — deliver the files` | `needs-client-data — commission the shoot` |
| Row weight | The wider column | The narrower column |

The Stillwater caption also states the rule the current site breaks: *Lakeville's frames will
never stand in for it — that swap is the trust defect this rebuild exists to fix.* The client
sees the shape of the missing asset and the cost of not commissioning it, in the place it will
land, at the aspect it will arrive in.

---

## 8. Dials, and what they cost

`variance 6 · motion 1 · density 6` — within the register's stated band (5–8 / 1–2 / 4–7).

- **Variance 6, not 9.** The alternating venue rows and the weighted first job row are the only
  asymmetries. The grid stays legible because a scoreboard that is hard to read is not a
  scoreboard.
- **Motion 1.** `motion.duration` is `0ms`. The site is zero-JS by default and this register has
  nothing to animate — a 150ms ease on a hard-edged slab reads as hesitation. Hover and focus
  are instant state swaps.
- **Density 6, not 8.** Cockpit density would win the register and lose the beginner. The rules
  are tight; the type is not small. Nothing carrying information is set below `0.9375rem`
  except tracked caps labels.

## 9. Known trade-offs, stated for the gate

- **Retiring Bitter is the contestable call**, exactly as the ember was in `brand-direction.md`
  §2.2. If the gate wants the slab genus kept, this overlay survives the swap: bind
  `font.display` back to Bitter at 700/800, drop `fontWidth.displayExpanded`, and every ratio in
  §4 is unaffected. The page loses some of its board-like proportion and none of its structure.
- **Four dark bands is a lot of dark.** It is the correct read of the photography and the direct
  answer to §10.2, but it is the thing most likely to draw a client comment. The cheapest
  retreat is to flip §3.3 (`role.ground.jobs`) to `white` — one token, and the alternation
  survives as night → white → white → white → ember → white → night.
- **The ember band leaves a large empty zone below the waitlist slab at desktop.** That is the
  register (flat fills, large empty zones), not an oversight — but it is a legitimate thing for
  the human to reject.
- **The preview's display type is an approximation.** Archivo cannot load in a no-network
  preview; the system grotesque at 800–900 stands in. Open Sans **is** real, base64-embedded
  from `public/fonts/open-sans-normal-latin.woff2`. Judge the preview's display face as an
  approximation and `brutalist.json`'s declaration as the proposal.
