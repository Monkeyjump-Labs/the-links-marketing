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
| **Leagues** | The season as a **track** — `01 NOW / 02 NEXT / 03 THEN` under a progress rule. Venue blocks, not cards. The capture band is the largest thing after the hero, because the waitlist is the component **none of the 126 audited competitors have**. |
| **Memberships** | Two unlike products get **different grammars**: monthly is a card comparison, LinksFlex is a **fuel gauge** — bank sizes across, tiers down, a proportional amber bar per cell. An hour bank is a punch card, not a SaaS plan. |
| **Events** | **"Room for 36."** answers the four-second question in the headline. Form is a white card on midnight — the brightest object on the page — with headcount and date as the first two fields at scoreboard scale. |
| **Simulators** | The machine measures things, so the page does too. Four readings as small diagrams, a bay schematic, and a **handedness row** — five `L|R` cells and one `R` for the right-handed-only bay at Lakeville, four `?` cells for Stillwater. |

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

## Open decisions for the human

1. **Caps split.** The shipped header button is `BOOK A BAY` in caps; every in-page CTA is now
   sentence case. **Recommendation: bring the header down.** The system reserves caps for 12px
   labels, and a single capitalised button is a leftover rather than a decision.
2. **Events' reply time.** It's marked *Ask us*, but the copy says they will not promise a number
   at all. **Recommendation: it isn't a gap — remove the mark and state the policy.** "Ask us"
   implies a number exists on request; the point is that it deliberately doesn't.
3. **Simulators' Stillwater blanks** are all *Pending confirmation*. That's right where the venue
   knows the answer and we haven't verified it (seating, screens, handedness). Flip any to *Not
   yet set* where the venue genuinely hasn't decided.

## Status

Exploration only. **Nothing here is in the codebase.** Porting a page is a separate step and
should follow the homepage precedent: real content collections as the data source, tokens for
every value, and the visual audit clean before merge.
