# `home-blue-navy` — deep navy as the structural dark

> Design-factory **round 2** candidate · register **softened brutalist (fixed)** · axis **palette only**
> Artifact (source of truth): [`blue-navy.json`](blue-navy.json) · Preview (disposable):
> [`../candidates/home-blue-navy.html`](../candidates/home-blue-navy.html)
> Base composition: [`home-brutalist.html`](../candidates/home-brutalist.html) +
> [`brutalist.json`](brutalist.json), with the round-2 softening delta from
> [`../RUN.md`](../RUN.md) applied verbatim.
> Layout, IA, section order, copy and data are **fixed** per [`../screen-spec-home.md`](../screen-spec-home.md).
> Status: **PROPOSAL** for a human gate. Not client-approved.
>
> Every contrast ratio below was **computed** from sRGB relative luminance per WCAG 2.1 §1.4.3.
> None is estimated or recalled.

---

## 1. The one committed idea

**One blue ramp, six stops — from the room at night to the screen on the wall — and one warm accent.**

Navy is not an accent here and it is not a second dark. It replaces forest as **both the ground
and the ink**, and then keeps going: it is also the rules, the body copy, the muted text, the
captions and the hover state. Six stops of a single 205–215° hue do every job a neutral ramp
would do in another system:

| Stop | Token | Value | Relative luminance | Job |
|---|---|---|---|---|
| 1 | `midnight` | `#0A1A2E` | 0.0100 | The structural dark — chrome, hero, jobs, footer, slot ground |
| 2 | `navy` | `#12314F` | 0.0289 | Display headings + structural rules on light; the row-hover ground |
| 3 | `navyMid` | `#1E4470` | 0.0558 | Body copy and links on light |
| 4 | `inkMutedCool` | `#4A5C70` | 0.1028 | Captions, sub-rules, key labels on light |
| 5 | `slate` | `#7794A6` | 0.2781 | Muted text and quiet hairlines on `midnight` |
| 6 | `screenLight` | `#A9D3F2` | 0.6146 | **The one bright screen.** Media only |

Two consequences fall straight out of that, and they are the reason to pick this direction:

1. **The page is cold everywhere by construction, so the ember and the amber are the only
   temperature on it.** That is not a styling flourish — it is the literal physical fact the
   photography records: a near-black room whose only light is warm practical pendants over the
   bar. Round 1 said the ember was "designed and unspent"; here it is not competing with a green
   that is itself warm-adjacent, so a single ember rule on a white band reads as an event.
2. **The ramp finally has a bright cool value at the top.** Round 1's single most useful finding
   was that the palette *cannot render its own brief* — `screen #2E5A6E` measures **1.81:1** on
   the dark ground, so a simulator projection painted in it is invisible on the very field it is
   supposed to punch out of, and the brutalist candidate had to fake it in a **warm** neutral
   (greige). Here the projection is `screenLight` at **11.07:1** on `midnight`. *A warm dark room
   with one bright screen in it* is drawn rather than worked around.

### What a sibling would not do

Spend the **entire neutral axis** on one hue. A sibling blue direction will keep a grey, a warm
neutral, or a second family somewhere in the ink or the rules — which is the safe move, and it
costs the thing that makes this candidate work: the moment any part of the page's structure is
neutral rather than blue, the ember stops being *the only heat* and goes back to being *an
orange*. The refusal is the idea.

---

## 2. What I did with forest green — and why

**Verdict: DEMOTED TO A SECONDARY.** Not retired, not silently deleted.

**What it loses.** `#124B2E` stops being the theme's declared "black". It grounds no band, inks
no text, rules no boundary and heads no section. In the live theme it backs **66 sections**; in
this overlay it backs **none**.

**What it keeps — two named jobs, one of them visible on this page:**

1. **`role.media.slotFairway` — the projected course inside the simulator screen.** This is the
   honest place for it. In the actual building the green is not the room; it is the thing on the
   wall. Forest on `screenLight` measures **6.41:1**, so it renders as a real, legible band, not
   a tint. It is the only green anywhere on the homepage, and it is inside the one bright screen.
2. **`role.state.success` — the confirmed/good semantic across the whole system.** On white
   **10.14:1**, on paper **9.32:1**, on greige **7.81:1**. This lets the overlay **retire
   `palette.moss #155E36`** as redundant: moss existed only so that success would not read as
   body text *while forest was the body text*. Forest is no longer the body text.

**Why not retire it.** It is the brand's one piece of real colour equity and it is on the door in
Lakeville. `brand-direction.md` §4.4 says it plainly: a rebrand that appears to erase the original
venue's identity is how rebrands get reversed.

**Why not keep it structural.** Because "blue is the ground and the ink" and a navy page with a
forest band is two near-blacks that differ by almost nothing — which is precisely the §10.2
complaint about white-vs-paper, reproduced at the dark end. **Forest on midnight is 1.73:1.** As a
second ground it would not read as a second ground.

**The costed retreat, if the gate wants green back structurally.** Flip `role.ground.jobs` from
`midnight` to `forest` — one token, one band. Every ratio in the on-midnight table below is
reproduced on forest within 0.6 (white 10.14:1, paper 9.32:1, amber 5.49:1, screenLight 6.41:1),
with **one** exception that has to swap back: `slate` on forest is **3.17:1** and fails body, so
that band's muted text would revert to `sage` at 5.01:1.

---

## 3. What I kept, and what I replaced

### Kept from `brutalist.json` — verbatim

| Thing | Why it stays |
|---|---|
| **The band sequence** — dark → white → dark → white → EMBER → white → dark | The delta holds ground alternation fixed. Only the dark *value* changes. |
| **`font.display` Archivo, `font.body` Open Sans, `font.numeric`** | Round 2's axis is palette. Changing the face would confound the three-way colour comparison. |
| **The whole type scale, tracking and line-height** | Same reason. Only the weight step-down in the delta applies. |
| **`space.*` ramp, `sectionY/Lg`, `gutterX/Lg`, `contentMax`, `proseMax`, `tapMin`** | Layout is fixed on this axis. |
| **`border.hairline` 1px / `rule` 2px / `score` 4px / `slab` 8px** | The visible ruled grid is the idea; the delta permits one quiet weight, not a rewrite. |
| **`elevation` declared empty; `motion.duration` 0ms** | Softening the register does not mean introducing depth or hesitation. |
| **The ember ramp** `#8A400A` / `#AD500D` / `#6D3308` and **amber** `#F3B268` | Tuned to this codebase's `hover:brightness-125`. Nothing here re-litigates that. |
| **`clay`, `errorOnDark` `#F2A2A2`, `successOnDark` `#A8E0C0`, `greige`, `paper`, `white`, `emberTint`** | Unchanged values; the on-dark pair is simply re-measured against the new ground (and both improve). |
| **The `onEmberBand` rule** — the waitlist sits in a paper slab punched out of the ember | The arithmetic trap is unchanged by the palette: midnight on ember is 2.35:1. |

### Replaced

| Thing | Replaced with | Why, in one line |
|---|---|---|
| `night #0D3520` as the dark ground | **`midnight #0A1A2E`** | The direction: the ground is blue. It is also genuinely darker (L 0.0100 vs 0.0177) — closer to the measured room than the green ever admitted. |
| `night` / `forest` as ink on light | **`navy` / `navyMid`** | The two-stop darkness ladder is preserved (13.31:1 heading, 9.92:1 body) so hierarchy stays chromatic, not just scalar. |
| `role.ink.muted #456052` | **`inkMutedCool #4A5C70`** | A green-grey in a blue system. Chosen to land on the *same* ratios so nothing regresses: 6.87 / 6.32 / 5.29 against 6.89 / 6.34 / 5.31. |
| `sage #9CBEAD` as muted-on-dark | **`slate #7794A6`, revived from `retired`** | Sage is a pale *green*. The retired slate's documented failure was **3.20:1 as a white-bearing button fill** — a lightness failure in a fill role. Inverted, the same value is muted **text** on midnight at **5.48:1**. See §4. |
| `screen #2E5A6E` as the informational colour | **`emberMid #B85718` as a caution colour** | On a page whose ink is navy, a mid-blue tag reads as *the brand*, not as *a caveat* — the exact §10.6 defect. This palette can afford the opposite rule: **warm means caution.** |
| `state.focus` `emberMid` | **`ember #8A400A`** | A stronger ring (7.45:1 vs white, against emberMid's 4.76:1) on an open ship-gate item, and it frees emberMid for the caution role without state colours colliding. |
| The greige-faked simulator projection | **`screenLight #A9D3F2`** at 11.07:1 | The gap round 1 flagged, closed at the name and scope round 1 proposed. |
| `moss #155E36` | **`forest`** takes `state.success` | Redundant once forest is off ink duty. |

### The softening delta — applied exactly, no further

- **Radius 0 → 3px, interactive only.** Buttons, text inputs, and the two venue-switcher chips.
  Panels, cells, the paper slab, the media slots and the two static tags stay **square**;
  `radius.badge` is declared `0` explicitly so a rounded pill cannot drift back in on the argument
  that a tag is a chip.
- **The ruled grid stays.** One new weight, `border.ruleQuiet` 1px, replaces 2px on exactly **two**
  secondary internal dividers: the venue meta row and the build-state stub note. Structural and
  section rules are untouched. The weight is added rather than mutating `rule`, so a reviewer can
  see from the artifact which rules softened.
- **One step more air inside cells only.** Venue cell, quote slot, paper slab, slot caption, stub
  note, job row and button padding each move one step up the existing ramp. `sectionY`, the
  gutters and the full-bleed alternation are untouched.
- **Peak display weight down one step** — 900 → 800 for the h1 and the scoreboard figures, and
  800 → 700 below it so the ladder keeps two rungs instead of collapsing to one. Scale unchanged.
  Sentence case unchanged.
- **Unchanged:** the scoreboard idea, the labelled cells, ground inversion, hierarchy from weight
  and scale, and the reassurance copy carrying the loudest treatment on the page.

---

## 4. The revived slate — the argument, since it un-retires a value

`tokens.json` lists `#7794A6` under `retired` with a specific and correct reason: white text on it
is **3.20:1**, and because Squarespace aliases every button colour to `--accent`, that failure
shipped on all 41 pages. That is a **lightness** failure in a **text-bearing fill** role.

Turn the role around and the same value is fine: as **muted text on `midnight`** it measures
**5.48:1** — AA body, with margin. It comes back unchanged, carrying a hard rule that makes it the
exact cool mirror of the amber rule:

| Value | Allowed on | Banned on |
|---|---|---|
| `amber #F3B268` (warm) | dark grounds — 9.48:1 on midnight | every light ground — 1.85:1 on white |
| `slate #7794A6` (cool) | `midnight` only — 5.48:1 | white 3.20:1 · paper 2.94:1 · **navy 4.16:1** · ember 2.33:1 |

The `navy` ban matters and is enforced in the composition: `navy` is the job-row hover ground, so
**no muted text appears inside a job row** — every foreground in that row (white title 13.31:1,
paper body 12.24:1, amber arrow and reassurance 7.21:1) clears AA on the hovered field.

---

## 5. Every contrast ratio computed

Body gate **4.5:1**; large-text and non-text gate **3:1**. **Nothing rendered here relies on the
large-text allowance, and no pairing in this candidate fails.** Bans are listed alongside passes
because the bans are the load-bearing part.

### On the `midnight #0A1A2E` ground — chrome, hero, jobs, slots, footer

| Foreground | Ratio | Verdict | Used for |
|---|---|---|---|
| `white #FFFFFF` | **17.50:1** | ✓ AA body | h1, h2, h3, wordmark |
| `paper #F7F5F3` | **16.09:1** | ✓ AA body | body, nav, footer NAP, ghost-button label, slot frame |
| `greige #E5E1E0` | **13.48:1** | ✓ non-text | — |
| `screenLight #A9D3F2` | **11.07:1** | ✓ non-text | **the projection** (media only) |
| `amber #F3B268` | **9.48:1** | ✓ AA body | eyebrows, reassurance, score rules, CTA fill, focus ring, pendants |
| `midnight` on an `amber` fill | **9.48:1** | ✓ AA body | the dark-field CTA label |
| `slate #7794A6` | **5.48:1** | ✓ AA body | captions, slot labels, quiet hairlines, footer legal bar |
| `successOnDark #A8E0C0` | **11.74:1** | ✓ AA body | (not on this page — was 6.80:1 on forest) |
| `errorOnDark #F2A2A2` | **8.72:1** | ✓ AA body | (not on this page — was 5.05:1 on forest) |
| ~~`emberMid #B85718`~~ | 3.68:1 | ✗ **banned as a fill** | clears non-text but cannot carry a label — paper on it 4.37:1 |
| ~~`ember #8A400A`~~ | 2.35:1 | ✗ **banned** | — |
| ~~`forest #124B2E`~~ | 1.73:1 | ✗ **banned** | — (this is why forest cannot be a second ground) |
| ~~`navy #12314F`~~ as text | 1.31:1 | ✗ **banned** | it is a *field* change, never a boundary against midnight |

### On the `navy #12314F` row-hover ground

`white` 13.31:1 ✓ · `paper` 12.24:1 ✓ · `amber` 7.21:1 ✓ · `screenLight` 8.42:1 ✓ ·
~~`slate` 4.16:1~~ ✗ body — **banned**, and honoured by keeping muted text out of job rows.

### On the `white` ground — trust strip, proof, venues

| Foreground | Ratio | Verdict | Used for |
|---|---|---|---|
| `navy #12314F` | **13.31:1** | ✓ AA body | display headings, scoreboard figures, structural rules |
| `navyMid #1E4470` | **9.92:1** | ✓ AA body | body copy, links |
| `forest #124B2E` | **10.14:1** | ✓ AA body | `state.success` (not rendered on this page) |
| `ember #8A400A` | **7.45:1** | ✓ AA body / ✓ non-text | the heavy score rule, CTA fill boundary, focus slab |
| `inkMutedCool #4A5C70` | **6.87:1** | ✓ AA body | captions, quote-slot rules, key labels |
| `emberMid #B85718` | **4.76:1** | ✓ AA body / ✓ non-text | the `(hours being confirmed)` tag — text **and** its 2px rule; the stub-note box |
| `paper` on an `ember` fill | **6.85:1** | ✓ AA body | `Book at Lakeville` / `Book at Stillwater` / `Notify me` |
| `paper` on `emberHover #AD500D` | **4.91:1** | ✓ AA body | hover |
| `paper` on `emberActive #6D3308` | **9.08:1** | ✓ AA body | pressed |
| `greige` hatch | 1.30:1 | decorative texture only | the empty quote cells; carries nothing |
| ~~`amber`~~ / ~~`screenLight`~~ / ~~`slate`~~ / ~~`emberTint`~~ | 1.85 / 1.58 / 3.20 / 1.33:1 | ✗ **banned** | — |

### On the `ember #8A400A` band — the featured offer

`white` **7.45:1** ✓ (h2, eyebrow, the rules around the promoted line, focus ring) ·
`paper` **6.85:1** ✓ (body, link, **and the waitlist slab's own boundary**) ·
`greige` **5.74:1** ✓ (the lead-endpoint degradation note).

Inside the paper slab everything reverts to light-field styling: `navy` h3 **12.24:1**,
`navyMid` body **9.13:1**, `inkMutedCool` placeholders and degradation note **6.32:1**,
`paper` on an `ember` submit **6.85:1**, `ember` focus slab vs paper **6.85:1**.

**Banned on the band, and the trap is unchanged by the palette:** `midnight` **2.35:1** ✗ ·
`navy` **1.79:1** ✗ · `amber` **4.04:1** ✗ body (clears 3:1 large only — banned outright rather
than conditionally, so nobody sets it at 15px) · `slate` **2.33:1** ✗.

### The media slot — where this palette earns its keep

| Pairing | Ratio | Job |
|---|---|---|
| `screenLight` projection on the `midnight` slot ground | **11.07:1** | ✓ the one bright screen |
| `forest` fairway on the `screenLight` projection | **6.41:1** | ✓ the projected course |
| `white` sky band on the projection | 1.58:1 | a deliberate low-contrast internal step; carries nothing |
| `amber` pendants on `midnight` | **9.48:1** | ✓ the warm practical light |
| `amber` top edge on the `navy` bar mass | **7.21:1** | ✓ what makes the mass readable |
| `navy` bar mass on `midnight` | 1.31:1 | **on purpose** — a near-black room has no legible furniture. Read by its amber edge and a `slate` hairline (5.48:1) |
| `paper` 2px frame on `midnight` | **16.09:1** | ✓ the slot is always visibly a slot |
| `slate` caption / `amber` caption label on `midnight` | **5.48 / 9.48:1** | ✓ AA body |

### Regressions this candidate closes

| Shipping today | Here |
|---|---|
| Hero eyebrow at `opacity-70` on forest | `amber` on midnight, **9.48:1** — no opacity anywhere in this overlay |
| Hero subhead at `opacity-80` on forest | `paper` on midnight, **16.09:1** |
| Trust strip entirely `inkMuted` at `text-sm` | Hours as `navy` on white, **13.31:1**, at 3rem scoreboard scale |
| `(hours being confirmed)` in the same grey as the hours | An `emberMid` 2px-ruled caps tag, **4.76:1** — legible, and **the only warm thing on a cold light band**, so it is visibly a different *kind* of object |
| No focus-visible styling at all (open ship-gate item) | A 4px offset slab: `ember` on light 7.45:1, `amber` on dark 9.48:1, `white` on the ember band 7.45:1 |
| The projection could not be drawn at all (1.81:1) and was substituted with a warm neutral | `screenLight` at **11.07:1** — the brief rendered, not worked around |

---

## 6. Keeping it welcoming to a beginner

The beginner is the segment's largest untapped market and 67% of league pages in the corpus fail
beginner reassurance, so this is pass/fail, not a nicety. The four round-1 moves survive intact,
and the palette adds a fifth.

1. **The loudness is spent on the reassurance, not on the flex.** On the ember band, *"Never
   played in one? Most of our league players hadn't either. Handicaps keep it fair."* is set at
   display scale between two 4px white rules — larger than the marketing paragraph above it. In
   the jobs list, *"Up to five of you, same price."* breaks onto its own line in amber at display
   size. Those are the two most prominent sentences on the page after the h1.
2. **Sentence case, always.** Caps and wide tracking are reserved for small labels, the wordmark
   and button labels. The register comes from mass and structure, not from volume.
3. **The trust strip answers the unconfident question first** — hours at 3rem on a hard white cut
   straight out of the dark hero, address and phone as labelled rows with 44px targets.
4. **No gatekeeping vocabulary or iconography.** No jargon, no crossed clubs, no handicap
   ornament, no `01 / 4` index numbers. The scoreboard idea is carried by **real figures only**
   (6 bays, 4 bays, published hours).
5. **New here: cold ground makes warmth legible as welcome.** On the round-1 page the warm accent
   sat on a warm-adjacent green and read as decoration. On a page that is blue everywhere, every
   warm thing on it — the amber CTA, the amber pendants, the ember band that carries the
   reassurance, the amber rule under the eyebrow — reads as *the light that is on for you*. The
   3px radius on the controls is a small signal in the same direction; the surrounding structure
   is still square, which is what keeps this a softened brutalist page rather than a friendly one.

---

## 7. Token gaps — flagged, not invented

1. **CLOSED, not flagged: no bright cool value.** Round 1's headline gap is the one this candidate
   exists to close. `palette.screenLight #A9D3F2` is added at the name and the scope round 1
   proposed — a light 210–240° blue, **media/decorative only, never text-bearing**. It renders in
   exactly **one** place and the overlay bans it everywhere else **by rule, not by ratio**: if the
   projection colour also sets captions and rules, the page has many screens and no room.
2. **STILL OPEN — no warning / unverified role.** `(hours being confirmed)` is neither an error nor
   a success; it is unverified data. This overlay borrows `emberMid` and gives the borrowing a
   system rule (*warm means caution*, shared with the build-state stub note). A distinct
   `role.state.unverified` would still be better than a borrowed state colour.
3. **STILL OPEN — the canonical `tokens.json` has no structural vocabulary at all.** No radius,
   border, elevation, type scale, tracking, line-height or internal spacing scale. Declared here as
   additions, as in all four round-1 candidates. The convergent phase should promote the winning
   set rather than leave every candidate carrying a private structural language.
4. **FLAGGED, deliberately not fixed — `state.disabledInk #52685B` is a green-grey in a blue
   system.** It still passes (4.64:1 on greige, 6.02:1 on white), so it is an off-ramp value, not a
   defect. It is **not** re-cut here because the obvious cool substitution at the same apparent
   lightness (`#5A6B7C`) measures **4.23:1** on greige and *fails* — the replacement has to be
   darker than it looks. No disabled control renders on the homepage, so the convergent phase
   should do it against the rates table and the sold-out button rather than have this candidate
   guess.
5. **STILL OPEN — copy gap.** The scoreboard wants the published rate (**$35 / hour**, real and
   current through 2026-10-03). `screen-spec-home.md` §7 forbids any string not on the copy sheet
   and no homepage section carries a price, so **it is not on the page.** A one-string copy request
   for the convergent phase, not a licence.
6. **STILL OPEN — no brand mark, and none drawn.** The header typesets `The Links` in the display
   face at 800, caps, 0.22em tracked; the footer demonstrates `brand-direction.md` §4.2's
   endorsement system using only real strings. The SVG lockup set remains commission #1.

---

## 8. Photography: how the absence is handled

There is no photography in the repo and **none is faked** — no stock, no gradient mesh, no AI
frame. Two moves, both inherited from round 1, one of them materially improved by this palette.

**1. The dark ground is the photograph's job.** The hero is a flat near-black navy field because
the room is a near-black room (mean luminance 54–74/255, 33–38% of every frame near-black). The
`[needs-client-data]` hero photograph remains a real gap; it is flagged, not disguised.

**2. Where the playbook demands frames (§3.6), the slot is a spec drawing at the real 3:2**, built
only from palette values that were themselves derived from measurements of the real shoot — and
the two slots are **deliberately asymmetric, because the truth is asymmetric:**

| | Lakeville | Stillwater |
|---|---|---|
| Slot | Drawn and **lit** — pendants, bar mass, and the projection in `screenLight` with a forest fairway in it | **Empty and unlit**, hatched, with a hard amber cross |
| Caption | "A professional shoot of this room exists… It is not in this repository." | "No professional photograph of this room exists." |
| Tag | `needs-client-data — deliver the files` | `needs-client-data — commission the shoot` |
| Row weight | The wider column | The narrower column |

The two sit one above the other, so **the lit screen and the unlit one are the same drawing with
the light off** — the missing asset is visible as an absence rather than described as one. The
Stillwater caption also states the rule the current site breaks: *Lakeville's frames will never
stand in for it — that swap is the trust defect this rebuild exists to fix.*

---

## 9. Dials, and what they cost

`variance 6 · motion 1 · density 6` — unchanged from round 1, within the register's band.

- **Variance 6.** The alternating venue rows and the weighted first job row are the only
  asymmetries. A scoreboard that is hard to read is not a scoreboard.
- **Motion 1.** `motion.duration` is `0ms`. Hover and focus are instant state swaps; the row hover
  is a one-stop move up the same ramp rather than a hue change, so it reads as *lit*, not as *a
  different colour*.
- **Density 6.** Cockpit density would win the register and lose the beginner. The delta's extra
  step of in-cell air moves this candidate marginally toward 5.

---

## 10. Known trade-offs, stated for the gate

- **Demoting forest is the contestable call in this candidate**, and it is deliberately the one
  the gate should argue with. §2 states the cost and §2's last paragraph costs the retreat at one
  token.
- **Reviving a value the canonical file lists as `retired` needs saying out loud.** `slate` comes
  back at 5.48:1 in a role its lightness supports, with four explicit bans. If the gate would
  rather not reopen a retired value at all, the substitute is a purpose-cut light navy near
  `#9FB3C8` (8.13:1 on midnight) — more headroom, less story.
- **Four dark bands is still a lot of dark**, and navy is darker than the green it replaces. It is
  the correct read of the photography and the direct answer to §10.2, but it is the thing most
  likely to draw a client comment. Cheapest retreat is unchanged: flip `role.ground.jobs` to
  white — one token.
- **`screenLight` appears exactly once.** That is discipline, and it is also a risk: a reviewer
  scanning quickly may not reach §3.6 and may not see the thing this direction was chosen for. If
  the gate wants it earlier, the honest second placement is the hero's 8px subhead rule
  (11.07:1) — one binding, no new value, and it costs some of the preciousness.
- **The preview's display type is an approximation.** Archivo cannot load in a no-network preview;
  the system grotesque at 700–800 stands in. Open Sans **is** real, base64-embedded from
  `public/fonts/open-sans-normal-latin.woff2`.

---

## 11. Verification performed

- **Self-contained.** Zero `<link>`, `<script>` and `@import`. Exactly two `url()` references: an
  internal SVG fragment (`#hatch-navy`) and the `data:font/woff2` face. Every `https://` in the
  file is a navigational `href` (Whoosh, Google Maps, Facebook), never an asset load.
- **Exactly one `<h1>`.** Real copy and real data only, verbatim from `screen-spec-home.md` §7/§8.
  Stub states rendered honestly: the proof stub, both `(hours being confirmed)` badges, the
  lead-endpoint degradation note.
- **Rendered in headless Chrome at 1440px and at a true 390px viewport** and read back visually.
  No overflow, no clipped text, no invisible text; the header wraps to three rows at 390 and both
  venues' hours sit immediately under the hero.
  - *Environment note worth recording for the next candidate:* headless Chrome on macOS enforces a
    **500px minimum window width**, so `--window-size=390` silently lays out at 500 and produces a
    390px crop of a 500px page — which looks exactly like a horizontal-overflow bug and is not one.
    The round-1 `home-brutalist.html` reproduces the same artifact. Narrow rendering was therefore
    verified through a 390px iframe wrapper, not through `--window-size`.
