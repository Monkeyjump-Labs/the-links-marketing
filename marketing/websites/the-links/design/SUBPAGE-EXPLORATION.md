# Sub-page design exploration — consolidated findings

> Paper file **Links Website** · `01KZ3TZW6GR1KKT19ZCMAMWEPR` · 2026-08-03
> Four pages designed in parallel against the bound v2 token system, then a convergence pass.
> Brief from the client: *"a little flat and could use some varying components to increase
> dynamism a bit (don't need to go overboard)."* **Restraint is part of the brief.**

## Why this ran

The homepage was rebuilt to the approved `blue-navy` composition. The other 19 pages inherited
Navy's colour and type but kept the earlier layout, so they read as flat: a heading, some prose,
and a couple of bordered boxes. These four are the highest-value of them.

Design system was **bound before any design happened** — 38 tokens pushed into Paper from
`design/tokens.json`, so the work is generated against the real brand rather than approximating
it. This is design-factory step 0; an unbound brand is a preflight failure.

## What each page committed to

| Page | The idea |
|---|---|
| **Leagues** | The season as a **track** — `01 NOW / 02 NEXT / 03 THEN` under a progress rule. Venue blocks, not cards. The capture band is the largest thing after the hero, because the waitlist is the component **not one of the 126 sites in our own playbook audit offered**. |
| **Memberships** | Two unlike products get **different grammars**: monthly is a card comparison, LinksFlex is a **fuel gauge** — bank sizes across, tiers down, a proportional amber bar per cell. An hour bank is a punch card, not a SaaS plan. |
| **Events** | **"Room for 36."** answers the four-second question in the headline. Form is a white card on midnight — the brightest object on the page — with headcount and date as the first two fields at scoreboard scale. |
| **Simulators** | The machine measures things, so the page does too. **The named readings** as small diagrams, a bay schematic, and a **handedness row** — five `L|R` cells and one `R` for the right-handed-only bay at Lakeville, four `?` cells for Stillwater. |

## Ideas worth keeping regardless of what ships

1. **Leagues — "On the blanks."** A closing note committing to publish night, format, length and
   price *together, before registration opens — not after you have paid.* Nobody asked for that;
   it turns a gap into a promise.
2. **Memberships — the recommendation is arithmetic.** Individual is flagged "Start here if
   you're not sure" because $149 ÷ $35 pays back after ~4¼ hours of bay time a month. A reason
   the customer can check beats a "Most popular" sticker.
3. **Memberships — the honest third answer.** The chooser's last row is *neither — just book a
   bay at $35.* A page willing to tell you not to buy is more persuasive than one that isn't.
4. **Events — "quoted", not "missing".** Unpublished prices are typeset **identically to the
   filled cells**, labelled `Quoted` / `Ask us` with a one-line reason. The absence reads as
   policy. This is the strongest single idea on the canvas and became the basis of the
   site-wide gap system.
5. **Events — the un-printed reply time.** Left deliberately blank with the reason shown: *we
   will not print a number we cannot keep every time.*
6. **Simulators — the `?` cells.** Stillwater's unknown handedness drawn as four question marks
   in the same diagram as Lakeville's known five. The unknown is legible at a glance.

## What convergence had to fix

Four agents solving the same problems independently produced four answers to each.

| Problem | The four answers |
|---|---|
| **Missing information** | em-dash + "Not yet set" · clay "NOT CONFIRMED" chip · amber "Quoted"/"Ask us" · a mix of "PENDING CONFIRMATION", "DETAIL PENDING", grey boxes and `?` cells |
| **The `01 / 02 / 03` motif** | a timeline · a section index · a section index · a list of items |
| **Hero** | status panel · 4-cell stat strip · form · 4-cell stat strip |
| **Photo slots** | none · none · one drawn + a 3-shot brief · two, one drawn and one explicitly empty |
| **Design-note strip** | only Events has one |

The gap convention is the one that actually mattered. A client reading the four in sequence
would conclude the site can't decide how honest it is.

## The gap system, as converged

**One grammar, three marks.** Every gap is typeset exactly like the filled cell beside it — the
label stays, the value slot holds an em-dash at the neighbouring value's size, a status word sits
on its baseline, and a reason line goes underneath. Events' idea, now the rule everywhere.

| State | Mark | Meaning |
|---|---|---|
| **Not yet set** | `—` + bare word, ink-muted on light / slate on dark. No colour. Greige-tinted cell. | An absence. The venue hasn't decided. |
| **Pending confirmation** | The system's **only outlined tag** — 1px, 12px caps, ember on light / amber on dark. Rides beside a stated value. | An absence with an answer coming. We asked; we're waiting. |
| **Quoted · Ask us** | `—` + bare word in ember / amber, **reason line mandatory**. Untinted ground. | **Not an absence — a decision.** We know, and give it on request. |

Form carries the distinction (tinted-and-grey / boxed / coloured-bare-word); colour only ever
signals which ground you're on. **Clay is now unused for gaps** — it reads as an error and none of
these are errors. It survives only as the "design note, not page content" colour.

Two structural fixes came with it. The `01 / 02 / 03` motif now means exactly one thing —
**steps in order over time**; section indexes became `SECTION 0X` in a fixed lane, and sets of
items lost their numerals. And the 4-cell hero strip is now a specified component (4 cells, 12px
Archivo caps label, 15px qualifier, 4px rule, 1px dividers) with Leagues as a **justified
exception**: its season track sits in the strip position with the same furniture, its rule
partly filled to show where in the season you are.

## Paper quirks found (worth carrying to the next client build)

1. **A token variable in the border WIDTH slot silently drops.**
   `border-top: var(--border-score) solid var(--color-amber)` renders *nothing*, with no error;
   `border-top: 4px solid var(--color-amber)` is fine. A token in the *colour* slot is safe.
   For a design whose whole idea is a visibly ruled grid, this quietly guts it.
   First diagnosed as "shorthand drops" — that was wrong and cost the siblings unnecessary
   longhand until it was corrected.
2. **`--color-slate` on `--color-navy` is 4.16:1 and fails.** Three of four agents hit it
   independently. All resolved it the same way — `--color-screen-light` at ~8:1 — which also
   gives navy bands a cooler readout tone that distinguishes them from midnight ones. **The
   token file should encode this**: slate is a midnight-ground token and nothing stops a
   designer reaching for it on navy.
3. **`--color-ember` goes unused on dark-heavy pages**, because every CTA lands on a dark block
   where the rule is an amber fill with midnight text. Not a problem — but a page that is
   mostly dark will never show the brand's action colour, which is worth knowing when judging
   whether the accent is carrying its weight.

## Two corrections from the truth audit (2026-08-03)

Both were caught before any of this shipped. They are recorded here rather than quietly
edited away, because this file is the brief for whoever ports these pages.

**"Four readings" was a design conceit that read as a product specification.** No source
says four. GolfZon's own sensors page lists five ball metrics from the T2 alone (ball speed,
direction and trajectory, spin rate, launch angle, spin axis), then club path and angle of
attack from the overhead unit; `simulators.astro` shipped five; and the Simulators design
committed to four diagrams. Three different counts for one machine. **Do not count the
readings — name them.** They are all real and they are all GolfZon's own, which is a better
diagram anyway: the reading has a name on it. Note also that the ball metrics come from a
**floor-mounted** sensor and the club metrics from the overhead cameras, so a diagram that
draws every reading arriving from above is drawing the wrong machine.

**The corpus figures.** `126` and `96` are both correct and both the playbook's own: **126**
is the whole audit (`_playbook/audit-findings.md` — simulator venues *and* golf courses) and
**96** is the simulator-venue subset that `playbook-sim-venue.md` is measured on. Nothing was
wrong; what was wrong was quoting them bare, so a reader meeting both concluded one of them
was made up. **Always say which corpus a number is from.** And because the waitlist claim is
a competitive statement about named third parties, it belongs in documents like this one and
in our own code comments — it is not on any customer-facing page and should not go on one.

## Open decisions for the human — RESOLVED 2026-08-03

All three were put to the human before the port started, not after.

1. **Caps split.** → **Bring the header down.** Buttons are now sentence case site-wide. The
   `uppercase` lived in the shared button recipe (`lib/buttons.ts`), so this was one change, not
   a header patch — and `tracking-label` went with it, because wide tracking is part of the caps
   treatment and reads as a spacing defect without it. Caps now survives in exactly one place:
   `caps-label`, the 12px label role.
2. **Events' reply time.** → **No mark, and keep the copy generic.** It is prose, not a cell:
   *"We will get back to you as soon as possible."* An *Ask us* would have implied a number
   exists on request, and the point is that one deliberately does not.
3. **Simulators' Stillwater blanks.** → **All stay *Pending confirmation*.** None flip. Stillwater
   is an operating venue that knows how its own room is laid out; nothing there is undecided, it
   is unverified, and those are different promises to a reader.

## Status

**Ported — FW-3967, 2026-08-03.** All four pages are in the codebase, on the homepage precedent:
content collections as the data source, every value from a token, six gates green.

What the port added beyond the four pages:

* `GapCell` (marks 1 and 3), `PendingTag` gaining a dark tone (mark 2), and `lib/readout.ts` —
  the shared size map that makes "a gap is typeset exactly like the filled cell beside it" a
  code guarantee rather than a thing you check by eye.
* `HeroStrip` (the specified 4-cell strip) and `SeasonTrack` (Leagues' justified exception).
* `SectionHead` gained `index`, rendering `SECTION 0X` in its own lane, so the `01/02/03`
  numerals mean one thing: steps in order over time.
* `FuelGauge`, `BaySchematic`, `HandednessRow`, `LeagueBlock`; `LeagueCard` is gone.
* A `memberships` content collection, prices stored as NUMBERS so per-hour figures are divided
  rather than stored and cannot drift.
* **The slate-on-navy trap is encoded.** `semantic.ink.mutedOnNavy` (screenLight, 8.42:1) now
  exists as the right answer to reach for, and `scripts/build-tokens.mjs` gained a FORBIDDEN
  gate that re-measures the banned pairing so the ban cannot silently go stale.
* `/simulators/` was missing from the visual-audit route list and is now in it — one of the four
  pages had never been contrast-checked at all.

Two things this port found that the exploration did not:

* **A `notSet` gap cannot sit directly on a greige band.** Its tint IS greige, so on the
  alternating field the mark keeps its words and loses the form that distinguishes it from a
  `quoted` one. Give it a white slab, the way `WaitlistForm` brings its own ground onto the
  ember band.
* **`accent.caution` on greige is 3.66:1** — the already-documented `noWarningOnGreige` rule,
  which this port tripped on its first audit run. A `PendingTag` on the alternating field needs
  its own white ground.
