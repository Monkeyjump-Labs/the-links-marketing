# `technical` — the `technical-dense` token overlay

> Candidate **`home-technical`** · divergence axis **`theme → token_set`** · register **`technical-dense`**
> Artifact: [`technical.json`](technical.json) · Preview: [`../candidates/home-technical.html`](../candidates/home-technical.html)
> Base: [`../tokens.json`](../tokens.json) · Dials: variance 2 · motion 1 · density 8
> **Status: PROPOSAL.** One of four divergent candidates. Nothing here is approved or merged.

---

## 1. The one committed idea

**This venue measures your club path on every swing. It should tell you its Sunday closing time
with the same exactness — so every hard fact on the page is typeset as an instrument readout, and
the missing photograph is held by a labelled bay schematic instead of a grey rectangle.**

Structurally that lands as one move a sibling would not make: **the trust strip is not a bar
under the hero, it is the hero's own readout rail.** Hero and trust strip share one continuous
`night` field, separated only by the tick rule. The block a visitor reads first is *promise →
action → the four numbers you actually came for*, in one dark instrument header.

The register's danger is that "precision" reads as "for serious golfers only," and the beginner is
the biggest untapped segment. The defence is what the precision is *aimed at*: nothing on this page
measures the visitor. The measured objects are the hours, the address, the phone number, the bay
count and the two honest gaps in the build. Precision here is the business being exact **for** you,
not about you.

**What an editorial-minimal, brutalist or soft sibling would not do:** put the highest-leverage
block on the page — the one 67% of the segment omits entirely — inside the hero's own field, at
value-size, in tabular figures, with its caveat rendered as a distinct chip rather than as more
grey. The other registers will all treat the trust strip as a strip.

---

## 2. What was kept, what was replaced

### Kept verbatim, and why

| Token | Value | Why it survives untouched |
|---|---|---|
| `forest` | `#124b2e` | The brand's single largest colour equity (66 sections live). Ink on light, and the footer field. |
| `night` | `#0d3520` | Promoted, not changed. It is now three fields, not one. |
| `ember` + hover/active/mid | `#8a400a` `#ad500d` `#6d3308` `#b85718` | The evidence-backed action colour, tuned to survive this codebase's computed hover. Untouched — and in this overlay it is the **only** colour that means "clickable". No rule, tick, eyebrow or diagram stroke is allowed to use it. |
| `amber` | `#f3b268` | Given a real job at last: every field label on a dark field. |
| `screen` | `#2e5a6e` | Kept as a value, **promoted** to the system's second voice. See §3. |
| `paper` `white` `greige` | `#f7f5f3` `#ffffff` `#e5e1e0` | Unchanged surfaces. |
| `inkMuted` | `#456052` | Unchanged, but **fenced**: banned below 15px here. |
| `sage` | `#9cbead` | Kept as a value and **re-jobbed** — see §3. |
| `clay` `moss` + on-dark states, `disabledInk` | — | Unchanged. |
| `size.contentMax` | `75rem` | The container does not move on a theme axis. |
| The dark-field CTA rule | — | Inherited unchanged and re-verified: a solid ember button on forest is 1.36:1 against its own field. On dark, the CTA inverts to a paper fill with night text (12.48:1). Amber-fill was considered (7.35:1, passes both gates) and rejected — it would give the page two action colours. |

### Replaced, one line each

| What | From → To | Why |
|---|---|---|
| **Display face** | Bitter → *none* | Anti-slop: serif is for editorial and publication, not for dense product. The slab retires from the *web build* and survives where brand-direction §4.2 actually needs it — inside the redrawn wordmark SVG. |
| **Body face** | Open Sans → **IBM Plex Sans** | See §4. A superfamily is the mechanism this candidate's whole argument depends on. |
| **Numerals** | *(none existed)* → **IBM Plex Mono** | The register's named gap. There is no monospace in this system today — the `--brand-font-mono` slot holds Bitter. |
| **Type ramp** | h1 to 3.75rem → **3.25rem**; h2 1.86× step | Hierarchy by weight and colour, not by raw scale. |
| **Section rhythm** | 4 / 8rem → **3.5 / 5.5rem** | A 31% cut on the large step. The single most visible density move. |
| **Spacing** | 4 ad-hoc tokens → **a 4px scale, 9 steps** | The base set has nothing between "gutter" and "section", so every internal gap in the build is an unnamed Tailwind step. |
| **Radii** | `rounded` (~4–6px) → **0 / 2 / 3px** | An instrument does not have rounded corners. |
| **Borders** | 2px `border-ink/15` boxes → **1px `rule` hairlines** | Three structurally different jobs (5 job cards, 2 venue cards, the waitlist) stop being the same box. |
| **Elevation** | *(none defined)* → **explicitly none** | Not one drop shadow. Separation is a rule or a change of field. "Chrome recedes" means exactly this. |
| **Measure** | `proseMax` 46.875rem → **42rem** | ~68 characters at 17px. Density applied to the line, not the leading. |
| **Featured-offer field** | `emberTint` #f0dcc9 → **`night`** | This register has no decorative tint field. The offer goes dark, which gives the page its second contrast event *and* makes the waitlist the loudest block below the fold. `emberTint` is unused here, **not deleted** from the brand. |

### Added — four new families, each answering a named gap

| Token | Value | The gap it closes |
|---|---|---|
| `chalk` | `#efeae5` | white → paper → greige "differ by almost nothing" (§10.2). No inset row was possible without reading as a card. |
| `rule` / `hairline` | `#7c736b` / `#c4bbb2` | The register's named gap: *a hairline divider token*. Two of them, because a structural boundary and a decorative one have different obligations (see §5). |
| `room` + `screenOnDark` + `screenTrace` | `#1b1409` `#8fc0d8` `#5e93ae` | The image slot. The brand has no **warm** near-black; forest and night are green ones, and a photo slot filled with green does not read as the room. |
| `onDarkMuted` / `fieldOnDark` / `hairlineOnDark` | `#9fb3a6` `#5c8a72` `#2c6244` | Dark fields had exactly one text colour (paper), no form border and no divider — so a dark field had no hierarchy at all. |
| `label.*` / `value.*` / `border.*` / `ornament.*` / `imageSlot.*` | *(role families)* | The readout, the rule system, the motif, and the photography stand-in. |
| `size.rowMin` | `2.75rem` | The floor on density. See §6. |

---

## 3. Two colour moves worth arguing about

**Screen blue is promoted from an unused status colour to the system's second voice.** `#2E5A6E`
exists in the base tokens as the informational colour and appears nowhere on the homepage. Here it
is the colour of *measurement*: every field label on a light surface, every status chip, every tick
on the gauge rule, every schematic stroke. Its provenance makes this more than a reallocation — it
is the surviving trace of the simulator projection, the one cool element measured in every frame of
the photography. Making it the instrument colour is transcribing the room, not decorating it. It
also gives this candidate a colour identity no sibling will have: the other three will spend their
second voice on warmth.

**Sage is re-jobbed rather than dropped.** The base direction keeps `#9CBEAD` demoted to a
decorative light field. This register has no decorative fields, so instead of quietly dropping a
retained brand value, sage becomes the **rule and border colour on dark** — 5.01:1 on forest,
6.71:1 on night, 9.02:1 on room. A kept value doing structural work beats a kept value doing
nothing.

---

## 4. Type: the real proposal

| Role | Face | Weights |
|---|---|---|
| Headings, body, UI | **IBM Plex Sans** | 400 / 500 / 600 / 700 (variable, one file) |
| Numerals, field labels, status chips, schematic captions | **IBM Plex Mono** | 400 / 500 |

**Why.** IBM Plex was briefed as "the relationship between man and machine," which is this
candidate's argument in five words. More concretely it is a *designed superfamily*: Plex Sans and
Plex Mono share skeleton, cap height and metrics, so a mono label and a sans heading **align** in a
readout lane instead of nearly aligning. That alignment is the difference between a page that looks
measured and a page that looks like two fonts. Its humanist details — the flared `a`, the true
two-storey `g` in text weights — keep it off the cold-grotesque end that would make a hospitality
business look like a SaaS product.

**Tabular figures are the point, not a nicety.** `Mon–Sun 11am–9pm` sitting above
`Mon 12pm–9pm · Tue–Fri 3pm–9pm · Sat 10am–10pm · Sun 12pm–7pm` only reads as a *comparison* if the
digits are the same width. Two venues with different hours is the exact case the brand has.

**What it costs, stated plainly.** This discards the 75 KB of Bitter + Open Sans already
self-hosted in `public/fonts/`, and it departs from `brand-direction.md` §3.2, which kept Open Sans
on the reasoning that replacing it "buys warmth we can get more cheaply elsewhere." That reasoning
is sound for the base direction and wrong for this one: this candidate's warmth budget is spent on
the ember, the amber and the room, and its coherence budget is spent on type. If the client wants
the cheaper version, the fallback is **keep Open Sans, add IBM Plex Mono for numerals only** — two
families, ~+30 KB, and the label/value optical alignment is lost. That is a real downgrade, not an
equivalent.

The wordmark stays a slab (outlines, per brand-direction §4.2). On an otherwise instrument-set
page the mark becomes the one warm slab moment — a contrast this candidate wants, not a mismatch it
tolerated. **No new logo was drawn.** The header wordmark is typeset; the footer shows the
endorsement lockup (`THE LINKS` / rule / `OF LAKEVILLE`) as a typographic treatment only.

---

## 5. Every contrast ratio computed

All figures are WCAG 2.1 sRGB relative-luminance ratios, produced by a script over the two literal
hex values — none estimated or recalled.

### The dense-UI rule this candidate imposes on itself

> **No text below 14px uses a pairing under 6.5:1.**

Small type at low contrast is the classic technical-register accessibility failure, and density
makes it worse, not more acceptable. The base brand shipped a 3.20:1 button on 41 pages; this
sprint exists to fix that, and shipping 11px labels at 5.5:1 would be the same mistake in a smarter
outfit. Three concrete consequences:

- `ink.muted` (#456052) is **banned below 15px** here — 5.76:1 on chalk, 5.31:1 on greige.
- `label.onLight` (screen) is **not approved on chalk or greige** at 11–12px (6.27:1 / 5.77:1).
  On those fields labels use `ink.default` (8.48 / 7.81) and screen survives as the non-text status
  marker. Enforced in the preview by the `.proof .k` override.
- `label.onDark` (amber) is **not approved on forest** at 11–12px (5.49:1). This is *why* the trust
  strip sits on `night` beside the hero rather than on `forest` beneath it — the accessibility
  arithmetic and the design idea pointed the same direction.

### Text on light

| Foreground | On | Ratio | AA |
|---|---|---|---|
| `ink.default` #124B2E | white | **10.14:1** | ✓ |
| `ink.default` | paper #F7F5F3 | **9.32:1** | ✓ |
| `ink.default` | chalk #EFEAE5 | **8.48:1** | ✓ |
| `ink.default` | greige #E5E1E0 | **7.81:1** | ✓ |
| `ink.muted` #456052 | white | **6.89:1** | ✓ (15px+) |
| `ink.muted` | paper | **6.34:1** | ✓ (15px+) |
| `ink.muted` | chalk | **5.76:1** | ✓ (15px+) |
| `ink.muted` | greige | **5.31:1** | ✓ (15px+) |
| `label.onLight` / `accent.measure` #2E5A6E | white | **7.49:1** | ✓ incl. 11px |
| `accent.measure` | paper | **6.89:1** | ✓ incl. 11px |
| `accent.measure` | chalk | **6.27:1** | ✓ AA, ✗ this set's 11px floor |
| `accent.measure` | greige | **5.77:1** | ✓ AA, ✗ 11px floor |
| `primary.default` #8A400A | white | **7.45:1** | ✓ |
| `primary.default` | paper | **6.85:1** | ✓ |
| `primary.default` | chalk | **6.23:1** | ✓ |
| `primary.default` | greige | **5.74:1** | ✓ |
| `state.error` #A22C22 | white / paper | **7.19 / 6.61:1** | ✓ |
| `state.success` #155E36 | white / chalk | **7.82 / 6.54:1** | ✓ |
| `state.disabledInk` #52685B | white / greige | **6.02 / 4.64:1** | ✓ |

### Text on a primary fill

| Foreground | On | Ratio | AA |
|---|---|---|---|
| `primary.on` #F7F5F3 | #8A400A | **6.85:1** | ✓ |
| white | #8A400A | **7.45:1** | ✓ |
| `primary.on` | hover #AD500D | **4.91:1** | ✓ (the reason ember is this dark) |
| `primary.on` | active #6D3308 | **9.08:1** | ✓ |

### Text on dark

| Foreground | On | Ratio | AA |
|---|---|---|---|
| `ink.onDark` #F7F5F3 | night #0D3520 | **12.48:1** | ✓ |
| `ink.onDark` | forest #124B2E | **9.32:1** | ✓ |
| `ink.onDark` | room #1B1409 | **16.78:1** | ✓ |
| `label.onDark` #F3B268 | night | **7.35:1** | ✓ incl. 11px |
| `label.onDark` | room | **9.89:1** | ✓ incl. 11px |
| `label.onDark` | forest | **5.49:1** | ✓ AA, ✗ 11px floor |
| `ink.onDarkMuted` #9FB3A6 | night | **6.12:1** | ✓ (15px+) |
| `ink.onDarkMuted` | forest | **4.57:1** | ✓ (15px+) |
| `accent.measureOnDark` #8FC0D8 | room | **9.30:1** | ✓ |
| `accent.measureOnDark` | night | **6.92:1** | ✓ incl. the 13px degradation note |
| `accent.trace` #5E93AE | room | **5.44:1** | ✓ |
| greige as text | night | **10.46:1** | ✓ |
| `state.errorOnDark` #F2A2A2 | forest | **5.05:1** | ✓ |
| `state.successOnDark` #A8E0C0 | forest | **6.80:1** | ✓ |
| `primary.on` #F7F5F3 fill, night #0D3520 text | — | **12.48:1** | ✓ (the on-dark CTA) |

### Non-text boundaries (WCAG 2.1 §1.4.11, 3:1)

| Object | Against | Ratio | Gate |
|---|---|---|---|
| `border.rule` #7C736B | white | **4.64:1** | ✓ |
| `border.rule` | paper | **4.27:1** | ✓ |
| `border.rule` | chalk | **3.89:1** | ✓ |
| `border.rule` | greige | **3.58:1** | ✓ |
| `border.ruleOnDark` (sage) #9CBEAD | forest | **5.01:1** | ✓ |
| `border.ruleOnDark` | night | **6.71:1** | ✓ |
| `border.ruleOnDark` | room | **9.02:1** | ✓ |
| `border.fieldOnDark` #5C8A72 | night | **3.45:1** | ✓ |
| `state.focus` #B85718 | white | **4.76:1** | ✓ |
| `state.focus` | paper | **4.37:1** | ✓ |
| `state.focus` | chalk | **3.98:1** | ✓ |
| `state.focus` | greige | **3.66:1** | ✓ |
| `state.focusOnDark` (amber) | night | **7.35:1** | ✓ |
| `state.focusOnDark` | forest | **5.49:1** | ✓ |
| `primary.default` as a fill | white | **7.45:1** | ✓ |
| `surface.photo` #1B1409 panel | white page | **18.25:1** | ✓ |

### Deliberately below the gate, and declared

| Object | Against | Ratio | Why it is legal |
|---|---|---|---|
| `border.hairline` #C4BBB2 | white | **1.89:1** | Decorative row separation only. It is never a control boundary and never the sole indicator of anything — the rows it separates are already grouped by their own text. Anything that *is* a boundary uses `border.rule`. |
| `border.hairlineOnDark` #2C6244 | forest / night | **1.42 / 1.90:1** | Same contract on dark. Structural separation on dark uses sage. |

Ember on a near-black green is recorded here so nobody re-derives it: `#8A400A` on `#124B2E` is
**1.36:1** and on `#0D3520` is **1.82:1**. That is why the on-dark CTA inverts.

---

## 6. Keeping it welcoming to a beginner

Six specific decisions, because "technical" is one bad move away from "members only":

1. **Nothing on the page measures the visitor.** The readout is aimed at hours, address, phone, bay
   count, and the build's own gaps. The one place a schematic appears, it is a room in section —
   not a swing, not a score, not a handicap.
2. **`size.rowMin` = 2.75rem is the floor on density.** The page tightens until it hits a 44px tap
   target and then it stops. Density that respects your time, not density that crowds your thumb.
3. **Prose keeps 1.6 line-height and a 42rem measure.** Density here is horizontal and structural.
   A cramped paragraph is how this register reads as hostile.
4. **Both reassurance strings stay at full body size on a dark field, not in fine print.**
   "Up to five of you, same price." is the body of the **featured** row in "What you can do here" —
   the only row on the page with an ember marker rule. "Never played in one? Most of our league
   players hadn't either." is a full paragraph at 17px in the offer block, not a footnote.
5. **The sub-14px contrast floor is the accessibility form of the same courtesy.** A dense page that
   a 45-year-old in a dim bar cannot read is not precise, it is showing off.
6. **No jargon was added.** The only new strings on the page are slot and status labels the spec
   explicitly requires ("Photo slot · 3:2", "Awaiting content", "GBP · Stillwater — No profile
   found"). Every headline, subhead, card body, CTA, form string and paragraph is verbatim from
   §7 of the screen spec.

---

## 7. The missing photography

There are no photographs in this repo and stock is a named ship-blocker, so the image slot is
promoted to a **first-class token family** (`imageSlot.*`) rather than left as a grey box.

It renders the photography register from screen-spec §8 — *a warm dark room with one bright screen
in it* — as a **bay schematic**: `room` #1B1409 ground (R−B +18, inside the shoot's measured
+15..+19 band), one cool bright projection plane, one warm pendant, a hitting mat, and a single
ball-flight arc sampled on a tick scale.

**No numeric value is drawn anywhere on it.** No ball speed, no carry, no spin, no axis numbers.
This is deliberate: the register is the one that can legitimately substitute data visualisation for
photography, and the fastest way to abuse that is to draw a plausible number that a client then
reads as real. The geometry carries the idea; the caption says what it is. Every slot carries a
mono caption naming the ratio, the schematic's illustrative status, and the slot's real content
state.

**The two venues get different slot states, because they have different truths:**

- **Lakeville** — filled schematic. Caption: *"Professional shoot exists (2022 — warm, dark,
  pendant-lit). Not in this repo."*
- **Stillwater** — the same slot, **unfilled**. Dashed outlines, no projection, no pendant, no
  trace. Caption: *"No professional photography of this venue exists. Shoot required before launch
  — never a Lakeville frame in its place."*

That asymmetry is honest, it is what the spec asks for, and it does the work of §10.8: the two
venues stop being identical rows in a table, and they differ on the axis that is actually true
rather than on a manufactured hierarchy.

---

## 8. Token gaps flagged rather than invented

Everything below was wanted by the design and is **not** in this overlay.

1. **A brand mark.** Zero SVG brand assets exist. The header wordmark here is typeset and the
   footer lockup is a typographic endorsement treatment. **No logo was drawn.** The production mark
   is commission #1 in brand-direction §7 — 2–3 designer days, and it is blocking.
2. **A wordmark-slab web font.** The candidate's argument is "slab mark, instrument page," and the
   slab half of that pairing does not exist as a vector yet. Until it does, the header is a
   compromise.
3. **A component registry.** There is no shared component layer to compose against — `BookButton`,
   `WaitlistForm`, `TrustStrip` and `LeagueCard` exist as Astro components in the site repo but
   carry no `component.*` tokens. The preview therefore hand-composes their visual language from
   role tokens. If this candidate converges, that binding is the first ticket.
4. **A dark-field neutral between `night` and `room`.** The waitlist panel on the night band wants a
   slightly recessed fill; it currently uses a border and a 1px inset instead. A `surface.sunken`
   step is the honest ask.
5. **Testimonial data and both Google Business Profile URLs.** Rendered as the honest stub. Not
   invented, not designed around.
6. **A winter rate and verified Stillwater hours.** Not printed on the homepage; the
   "(hours being confirmed)" badge renders on both venues, styled as a distinct chip so the caveat
   and the hours are no longer indistinguishable.
7. **A lead endpoint.** The form renders the `mailto:` degraded state and the exact degradation
   note. Success and error states are declared in the token set (`state.success` / `state.error` and
   their on-dark twins) but not rendered, because the endpoint does not exist to trigger them.

---

## 9. Preview fidelity

The preview is **disposable and regenerable from the overlay** — it was not hand-tuned away from
it. Two things in it are approximations, both forced by the review surface loading nothing over the
network:

- **Type** is the system sans + system mono. Judge the overlay's `font` group as the proposal; judge
  the preview's type as a stand-in. The measurable claims (tabular figures, label/value alignment in
  a lane) are properties of Plex, only partly reproduced by the system stack.
- **The image slots** are schematics, not photographs. They hold the ratio and the register.

Everything else — every colour, every rule weight, every spacing step, every radius, the tick-rule
ornament, the 44px row floor, the focus treatment — resolves to a token in
[`technical.json`](technical.json).
