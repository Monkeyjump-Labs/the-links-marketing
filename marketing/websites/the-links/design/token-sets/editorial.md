# Candidate note — `home-editorial`

> Design-factory step 2 (DIVERGE) · register **`editorial-minimal`** · axis **`theme → token_set`**
> Artifact: [`editorial.json`](editorial.json) — the source of truth.
> Preview: [`../candidates/home-editorial.html`](../candidates/home-editorial.html) — disposable,
> generated from the overlay, never hand-tuned away from it.
> Base: [`../tokens.json`](../tokens.json) · Spec: [`../screen-spec-home.md`](../screen-spec-home.md)
> Status: **PROPOSAL for a human gate.** Not client-approved, not merged.

---

## 1. The one committed idea

**The homepage is set as a printed feature — one warm paper field, hairline rules, section heads
demoted into the margin, and type carrying the entire hierarchy — and the venue's warm dark room
enters only as captioned photographic PLATES dropped into that paper page.**

Two things follow from that single move, and they are the reason this candidate exists:

1. **The dark/light rhythm the brand already owns becomes the page's structural system.** The
   photography is measurably a warm dark room with one bright screen in it. So the page is paper,
   and every dark area on it is a *plate*: the hero image slot, the two venue slots, the
   featured-offer band, the footer. §10.2's complaint — "one dark hero, then eleven feet of white"
   — is not answered by adding a second flat green rectangle; it is answered by giving the page
   five tonal events that all mean the same thing.
2. **The missing photography stops being a hole and becomes a designed absence.** There is no
   photograph of this brand anywhere in the build. Every candidate has to deal with that. In this
   register the answer is the print convention: a plate at the right crop, drawn to the shoot's
   *measured* register (near-black base, warm pendant pools, one cool projection), with a mono
   caption naming the exact frame from the shoot list and its honest status. Stillwater's plate is
   **unexposed on purpose** — hairline crop grid, no light — because Stillwater has never been
   photographed and the truthful rendering of that is an empty plate, not Lakeville's frames.

**What a sibling wouldn't do.** A brutalist candidate makes the hero louder; a soft one makes it
warmer; a technical-dense one packs it with data. This one makes the hero **quieter** — the h1
sits on paper at 400 weight, the section heads shrink to 13px mono in the left margin, and the
loudest chromatic object above the fold is a 21:9 dark plate that contains no information at all.
It is the only one of the four that bets the page on restraint, and the only one that treats the
absent photography as a design subject rather than a problem to route around.

---

## 2. What was kept, and what was replaced

### Kept verbatim (and why)

| Token | Value | Why it stays |
|---|---|---|
| `forest` | `#124B2E` | The brand's single largest colour equity. **Re-cast, not changed:** in this overlay forest stops being a background and becomes **the ink**. It now appears on every word of the page instead of behind two of them. |
| `ember` / `emberHover` / `emberActive` / `emberMid` | `#8A400A` `#AD500D` `#6D3308` `#B85718` | The evidence-backed action colour, tuned to survive this codebase's computed hovers. Nothing about this candidate improves by re-picking it. |
| `amber` | `#F3B268` | The pendant light. Dark fields only — the rule *tightens* here (see §3). |
| `screen` | `#2E5A6E` | Status, and the deep tone of the projection inside every plate. |
| `clay` / `moss` | `#A22C22` / `#155E36` | Error / success. Untouched. |
| `inkMuted` | `#456052` | Kept as an **explicit value**, never an opacity on ink. The `ink/70 = 4.39:1` trap is unchanged and still fails. |
| **Open Sans** | 400 / 600 / 700 + italic | Deliberately unchanged. In this register the body face's job is to be invisible while the display face carries the page — and it is already self-hosted on all 41 pages. |
| Gutters | `1.5rem` / `4rem` | No reason to move them. |

### Replaced (and why, one line each)

| Was | Now | Why |
|---|---|---|
| `paper` `#F7F5F3` | `#F4F0E8` | Warmer and ~2% deeper so it reads as a printed sheet, and so a true-white input can sit on it as a visible inset. |
| `surface.base` = `#FFFFFF` (the page) | **paper is the page**; white demoted to form-field fill only | §10.2: white and `#F7F5F3` "differ by almost nothing". Give them different *jobs* instead of adjacent ones. |
| `night` `#0D3520` | `plate` `#0B2A1A` + new `plateDeep` `#071A10` | The plate field needs to sit convincingly beside photography that is 33–38% near-black; `plateDeep` is the photographic black *inside* a plate and never a text field. |
| `greige` / `sage` / `emberTint` as page fields | **unused on this surface** (not deleted) | A third and fourth near-neutral would recreate §10.2 exactly — greige is 1.12:1 against the new paper. They remain available on rates tables and callouts. |
| **Bitter** (display) | **Fraunces** — 300/400/500/700, variable `opsz 9–144 · wght · SOFT · WONK`; ship `WONK=0`, `SOFT≈40` | Fraunces has a real optical-size axis, so one file sets an 84px hero *and* a 12px caption — the exact failure that retired Alfa Slab One, solved rather than sidestepped. Its softened slab-ish terminals hold genus continuity with the ball-in-the-I slab wordmark, so this still reads as *finishing the rename*. And it is warm and characterful, which is the brand's actual voice; Bitter is correct but neutral, and neutrality is precisely what "not built out enough" describes. **Quieter fallback if the client finds Fraunces too characterful: Newsreader** (OFL, variable, `opsz`) — same argument, less personality, ~20 KB lighter. |
| *(no mono role existed)* | **IBM Plex Mono** 400/500, latin only | Closes the register's named gap. It carries hours, phone, addresses, bay counts, marginal heads, plate captions. It is how §10.6 gets fixed (the highest-leverage block on the page stops being fine print) and how §10.10 gets fixed (a recurring scorecard/tee-sheet device you could recognise the brand from). |
| Peak display weight **800** | Peak display weight **500** | A 5.25rem line at 400 is already emphatic. Bolding it is the "H1 that just screams" the anti-slop list bans; hierarchy comes from face, scale, colour and rule. |
| `proseMax` `46.875rem` | `measure` `34rem` | ~95 characters is a documentation width. 34rem is ~62 characters. This single change does more for "reads as designed, not as a wireframe" than any colour in the file. |
| `contentMax` `75rem` | `71rem` | So the rail + column structure holds a real measure at 1440px instead of stretching. |
| `sectionY` `4rem` / `8rem` | `5rem` / `9rem` | Macro-whitespace is the register's feature; micro-spacing stays tight so it reads composed, not sparse. |
| Rounded card boxes, `2px border-ink/15` | `radius.none` on everything large, `radius.control` 2px on buttons/fields; hairline rules replace every card | §10.3: three structurally different jobs currently share one undifferentiated container. Removing the container removes the problem. |
| *(no elevation tokens; Tailwind defaults)* | `elevation.*` = `none`, explicitly | Depth here is **tone**, not blur. A plate separates from the page by 13.58:1. A shadow on a printed page is a tell. |

---

## 3. Every contrast ratio computed for this candidate

All computed from sRGB relative luminance per WCAG 2.1 §1.4.3. None estimated or recalled.
Gates: **4.5:1** body text · **3:1** large text and non-text boundaries (1.4.11).

### Text on paper `#F4F0E8` — the page

| Foreground | Ratio | Verdict | Where |
|---|---|---|---|
| `ink` `#124B2E` | **8.92:1** | ✓ AA body | h1, h2, h3, hours, nav, wordmark, all primary copy |
| `inkMuted` `#456052` | **6.06:1** | ✓ AA body | card body copy, addresses, plate caption text, form blurb |
| `ember` `#8A400A` | **6.56:1** | ✓ AA body | the "(hours being confirmed)" caveat, plate caption labels, "awaiting a real, attributed review" |
| `screen` `#2E5A6E` | **6.59:1** | ✓ AA body | status/info (not on this page, verified for reuse) |
| `clay` `#A22C22` | **6.33:1** | ✓ AA body | error |
| `moss` `#155E36` | **6.88:1** | ✓ AA body | success |
| `amber` `#F3B268` | **1.62:1** | ✗ **FAIL — never** | recorded as a prohibition; worse than the 1.85:1 on the old paper, so the existing dark-fields-only rule *tightens* |

### Text on white `#FFFFFF` — form fields only

| Foreground | Ratio | Verdict |
|---|---|---|
| `ink` `#124B2E` | **10.14:1** | ✓ AA body |
| `inkMuted` `#456052` (placeholder) | **6.89:1** | ✓ AA body |

### Text on an ember fill — the primary CTA

| Pairing | Ratio | Verdict |
|---|---|---|
| `paper` on `ember` `#8A400A` | **6.56:1** | ✓ AA body |
| `paper` on `emberHover` `#AD500D` | **4.70:1** | ✓ AA body — **the binding constraint in this overlay.** Do not lighten ember or darken paper without recomputing this one |
| `paper` on `emberActive` `#6D3308` | **8.69:1** | ✓ AA body |

### Text on a plate `#0B2A1A` — featured-offer band, footer

| Foreground | Ratio | Verdict | Where |
|---|---|---|---|
| `paper` `#F4F0E8` | **13.58:1** | ✓ AA body | band h2, footer lockups, link hover |
| `inkMutedOnDark` `#A8BCAD` **(new)** | **7.69:1** | ✓ AA body | band body copy, footer nav and addresses |
| `amber` `#F3B268` | **8.36:1** | ✓ AA body | the band's eyebrow, footer column heads, lockup rule |

### Text on `plateDeep` `#071A10` — the slug label inside an image plate

| Foreground | Ratio | Verdict |
|---|---|---|
| `amber` `#F3B268` | **9.77:1** | ✓ AA body |
| `paper` `#F4F0E8` | **15.87:1** | ✓ AA body |
| `inkMutedOnDark` `#A8BCAD` | **8.99:1** | ✓ AA body |

*(The plate tag sits on a solid `plateDeep` backing plate, not on the artwork, precisely so this
ratio is the one that applies rather than an unpredictable one over a warm light pool.)*

### Non-text — WCAG 2.1 1.4.11, 3:1 gate

| Object | Against | Ratio | Verdict |
|---|---|---|---|
| `state.focus` `#B85718` (focus ring) | paper | **4.19:1** | ✓ (lower than the canonical 4.37:1 because paper darkened; still clear) |
| `state.focusOnDark` `#F3B268` | plate | **8.36:1** | ✓ |
| `border.control` `#7D7768` (input edge, plate crop frame) | paper | **3.92:1** | ✓ |
| `border.control` `#7D7768` (input edge) | white input fill | **4.46:1** | ✓ |
| ember CTA fill boundary | paper | **6.56:1** | ✓ |
| `border.emphasis` `#124B2E` (the 2px section rule) | paper | **8.92:1** | ✓ |
| plate boundary | paper | **13.58:1** | ✓ |

### Prohibitions carried forward, recomputed for the new values

| Pairing | Ratio | Rule |
|---|---|---|
| solid `ember` fill on a `plate` field | **2.07:1** | ✗ Fails the 3:1 non-text gate. **On any plate the CTA inverts.** In this candidate the whole waitlist block inverts to a paper coupon so the ember button lands on paper, where it is legal — which is also the design idea. |
| `amber` as text on paper | **1.62:1** | ✗ Never. |
| `ink` at 70% over the page | **4.39:1** (unchanged) | ✗ Never. Use `inkMuted`. 184 instances of this were already fixed; nothing here reintroduces it. |

### Decorative — declared, no gate claimed

| Object | Against | Ratio | Note |
|---|---|---|---|
| `rule` `#C7BFAC` (hairline divider) | paper | **1.61:1** | Section/list dividers only. Carries no meaning a sighted user must perceive; **every boundary that does carry meaning uses `border.control` at 3.92:1.** |
| `ruleOnDark` `#2F4A3B` | plate | **1.59:1** | Same, on dark. |
| `screenGlow` `#7FA8BE` | plateDeep | **7.08:1** | Inside plate artwork only. Recorded for information — it is **not** a text permission. |

---

## 4. How the plates handle the missing photography

There is no photograph of this brand in the build; `public/` holds a favicon and six `.woff2`
files. Three slots are designed, none filled, none faked.

| Slot | Crop | Rendering | Caption states |
|---|---|---|---|
| Hero | 21:9 | Drawn to the measured register: `plateDeep` base, three warm pendant pools, bar counter, silhouettes, one cool `screenGlow` projection at the right third, ~⅓ of the frame near-black | *Wide interior, evening, occupied* — the frame that answers "what is this room". The Lakeville shoot exists but is not in this build |
| Lakeville | 4:3 | Same register, tighter: one bay, projection lit, a figure mid-swing | *A bay with the projection lit, mid-swing* — the warm/cool frame, the most important shot in the set. Exists from the 2022 series; needs bringing into the build |
| Stillwater | 4:3 | **Deliberately unexposed** — no light at all, hairline crop grid, corner crop marks | *The lounge as it actually is* — Stillwater has zero professional photography. Shoot the difference from Lakeville; never illustrate one venue with the other's frames |

Two decisions inside that worth naming:

- **The two venues get the same-size plate, different content.** Open question §6.1 says a candidate
  that visually equalises the venues may misrepresent the business, and one that silently demotes
  Stillwater misrepresents it the other way. Equal size, honest content is the only reading that
  does neither: Stillwater is not smaller, it is *unphotographed*, and the page says so.
- **The plate captions are annotation, not marketing copy.** They exist because the spec asks for
  the slot to be visibly marked, and they name the exact frame from `brand-direction.md` §5.2's
  shoot list, so the client can read the page as a commissioning brief.

---

## 5. Against §10 — what this candidate actually changes

| § | The weakness | What this candidate does |
|---|---|---|
| 10.1 | Not one image on the page or in the build | Three designed, captioned plates at the right crops and the measured tone. The dark room is on the page for the first time |
| 10.2 | One dark hero, then eleven feet of white | Inverted: the page is paper, and there are **five** tonal events — hero plate, two venue plates, the featured-offer band, the footer |
| 10.3 | The card grid is the default card grid | Cards deleted. Five jobs become one lead item (Play, at 2.375rem) over four hairline-divided rows — the 3-column hole disappears because the grid does |
| 10.4 | No brand mark | The footer typesets the endorsement lockup — mark, rule, venue line — for both venues. **Typeset only. No logo drawn.** The commission stands |
| 10.5 | The action colour barely appears | Ember is now the page's only chromatic event on paper: CTA fills, every link rule, the hours caveat, plate caption labels, the coupon's top rule. Scarce *and* spent |
| 10.6 | The trust strip is styled as fine print | Hours move to 17px mono with tabular figures — the second-loudest thing on the page after the h1 — and the caveat gets its own **ember** role so it is legible and no longer indistinguishable from the data |
| 10.7 | The proof section is a paragraph of internal process text | A designed empty state: one large quote slot plus two smaller ones, asymmetric, with the hanging quote, the measure the real quote will occupy and its attribution line — each labelled *awaiting a real, attributed review*. The verbatim STUB string still ships, as an editor's note |
| 10.8 | Nothing distinguishes the two venues | Alternating asymmetric rows, not a card pair — and the plates carry the real difference: one shot, one not |
| 10.9 | The differentiator is styled as a newsletter box | The waitlist is a **paper coupon laid on the dark band** — the only paper object in the darkest part of the page. It is the second-most-visible thing on the page, which is what "zero of 126 competitors have this" deserves |
| 10.10 | No texture, ornament, motif or rhythm | The motif is the **rule and the mono data line**: a 2px ink rule opens every section, an ember rule sits under every link, hairlines divide every list, and every number on the page is mono. Recognisable from a fragment |

---

## 6. Constraint check (§11)

1. One `<h1>` ✓ — the hero. 2. Six body sections, in order, none added or removed ✓.
3. Hours within roughly one screen-height of hero on 390×844 ✓ — the mobile block tightens hero
padding, h1 clamp, lede size and the plate margin for exactly this; the hero measures ≈810px on a
390px viewport. 4. `Book a Bay` → `/book/` with no Whoosh disclosure; both venue buttons keep the
visible `→`, the `sr-only` "(opens Whoosh booking in a new tab)", `target="_blank" rel="noopener"`
and `data-analytics` ✓. 5. Both reassurance strings are body copy, not fine print ✓.
6. No banned words ✓. 7. Every new pairing computed above ✓. 8. Real copy and real data, verbatim ✓.
9. No stock photography ✓. 10. All three stub states render — proof stub, both "(hours being
confirmed)" badges, the lead-endpoint degradation note ✓. 11. Self-contained: one file, inline CSS,
inline SVG, **zero JavaScript**, system-font approximation declared on the page ✓. 12. Both venues
everywhere, Lakeville first ✓.

**Anti-slop:** no pure black (`plateDeep` is `#071A10`, a green-black) · no glow, no gradient text,
no custom cursor · hierarchy from face + colour + rule, display weight capped at 500 · serif used
for an editorial surface, which is the sanctioned case · **no three equal cards** — the jobs list is
1+4, the proof is 1+2, the venues alternate · every gap is a `space.*` step · no generic names, no
invented numbers, no filler verbs, no stock avatars · the one eyebrow that survives ("This season")
is real seasonal content, and there is no `01 / 4` numbering anywhere.

---

## 7. Token gaps — flagged, not invented around

The first four are gaps in the **canonical** `tokens.json`, not in this candidate. Every divergent
candidate on this run will hit them.

1. **There is no mono role.** `font.display` is bound to the `--brand-font-mono` slot for codebase
   reasons and is a *serif*. Wiring a real mono needs a genuinely new CSS custom property — a slot
   reuse would silently repoint every heading and button on 41 pages. **Blocking for this candidate
   if selected.**
2. **There is no type ramp at all.** `tokens.json` carries families and weights but zero font sizes,
   line heights or letter-spacing. This overlay had to author the whole ramp. Whichever candidate
   is selected, that ramp should be promoted into the canonical set.
3. **There are no radius or elevation tokens.** The shipped rounded-card look comes from Tailwind
   defaults, not from a decision anyone recorded.
4. **There is no `ink.mutedOnDark`.** `ink.onDark` is paper and nothing else, so secondary text on a
   dark field had no legal value — and reaching for `paper` at an opacity would repeat the
   `ink/70` mistake on the dark side. Added here as `#A8BCAD` (7.69:1).
5. **`state.caveat` is a new semantic role** (ember, for "(hours being confirmed)" and the awaiting-
   content labels). §10.6 is a *role* failure, not a size failure — the caveat and the data are
   currently the same grey. If the merger keeps this, it needs a name in the canonical set.
6. **The font byte budget is an estimate, not a measurement.** Fraunces is a four-axis variable
   font; latin subset guessed at 55–70 KB, IBM Plex Mono 400 at ~17 KB, putting the critical path
   at roughly 115–130 KB against today's measured 75 KB. **Subset and measure before committing.**
   Mitigations if it lands high: two static Fraunces instances instead of the variable file, or the
   Newsreader fallback. The mono is above the fold (the trust strip) and cannot be deferred.
7. **No brand mark exists.** The footer lockup here is typeset from the display and body faces to
   *show the endorsement direction*. It is not a logo and must not ship as one — the SVG commission
   in `brand-direction.md` §4.3 is unchanged, and the wordmark must ship as outlines, not live text.
8. **No photography exists.** The three plates are slots, not substitutes. Nothing in this candidate
   reduces the Stillwater shoot from blocking.
9. **The hover arithmetic is now tighter.** `paper` on `emberHover` is 4.70:1, down from 4.91:1,
   because the paper moved. It passes, but it is the value in this overlay with the least headroom
   and any future change to either ember or paper must recompute it.
