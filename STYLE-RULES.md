# Style rules

For anyone — person or Claude — changing how this site **looks**. Content edits (hours,
prices, leagues, menu, FAQ) don't need this file: those fields carry no styling, so changing
them cannot change the design. See [`EDITING.md`](EDITING.md).

The full reasoning is in
[`marketing/websites/the-links/design/STYLE-GUIDE.md`](marketing/websites/the-links/design/STYLE-GUIDE.md)
(475 lines). This page is the short version — the rules you must not break.

---

## The look, in one line

**A scoreboard, not a brochure.** Structure comes from blocks of colour, visible rules and
big figures — never from decoration.

## The five hard rules

**1. Never write a colour.** Not `#0A1A2E`, not `rgb(...)`, not a Tailwind `bg-[#...]`.
Colours come from named roles that record which background they are legal on and what their
measured contrast is. Writing a literal throws that away. Ask "what is the background, and
what is this doing on it?" — the answer picks the token.

**2. Never invent a size.** No `text-[13px]`, no `p-[22px]`. Use a step from the existing
scale. If nothing fits, that is a design decision, not a formatting one — see rule 5.

**3. One radius, and it is 3px.** It belongs on buttons, inputs and switcher chips. Panels,
cells, badges and images are square. Badges are declared `0` explicitly so nobody helpfully
rounds one.

**4. No shadows. No gradients.** Anywhere. There are none on the site today, and adding one
is the fastest way to make the page look like a different site.

**5. If you are reaching for a value that does not exist, stop and say so.** Prefer adding
it to `design/tokens.json` and regenerating, so it becomes part of the system. If it is
genuinely a one-off, it is a rule being broken — follow "Breaking a rule" below. What is
not allowed is inlining it silently: that is how the old site ended up shipping a 3.2:1
button on all 41 pages.

## Breaking a rule

**The five rules above are defaults, not walls.** The owner can choose to break one.
Your job is to make sure that choice is an informed one, then respect it. (Decided
2026-10-30: open things up a little, learn, and tighten again if the site starts to feel
disjointed.)

Before you write anything that breaks a rule:

1. **Say which rule, in plain words.** "This tilts the cards — nothing else on the site is
   tilted."
2. **Say why the rule exists and what breaking it risks.** Use the "why it matters" line
   below. One or two sentences, no jargon.
3. **Offer the closest version that keeps the rule**, if there is one.
4. **Let them decide.** If they say yes, build it.
5. **Record the yes in the code**: a comment on or directly above the line, starting
   `style-exception:` with the rule and who approved it, e.g.
   `<!-- style-exception: rule 3, rounded ticket corners — approved by CJ 2026-10-30 -->`.
   `style:check` lists every recorded exception on each run instead of failing.
6. **Keep it in one place.** A rule broken inside one named section or component is a
   decision; the same break copied across pages is drift. Reuse the section rather than
   repeating the exception.

| Rule                       | Why it matters — what to tell the owner                                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Colours from roles      | Every colour role has a measured contrast on the backgrounds it is allowed on. A hand-picked colour has none, and is the commonest way text becomes hard to read. |
| 2. Sizes from the scale    | The scale is what makes pages feel like one site. One-off sizes add up to a site that looks slightly different on every page.                                     |
| 3. One 3px radius          | Square panels are a large part of the site's "scoreboard" look. Rounded panels drift toward a generic template look.                                              |
| 4. No shadows or gradients | Depth comes from colour blocks and rules. A shadow is the single fastest way to make a page look like a different website.                                        |
| 5. No invented values      | An invented value cannot be re-themed later and nothing checks it.                                                                                                |

### What stays a hard stop

These are not style. Do not offer to break them, even when asked:

- **Text contrast below 4.5:1** (`tokens:check`). It is an accessibility floor — people
  cannot read it — not a matter of taste.
- **Internal notes visible to customers** (`audit:visual`).
- **Unverified facts** — see `CLAUDE.md`, "Never publish an unverified fact".

## What the build will refuse

| Check                  | Refuses                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| `npm run tokens:check` | A palette edit that drops any text below 4.5:1 contrast                        |
| `npm run style:check`  | Any **new** hardcoded colour or one-off size without a `style-exception:` note |
| `npm run audit:visual` | Internal notes visible to customers; pages over the weight budget              |

`style:check` works off a recorded baseline — the site inherited 83 one-off sizes from the
starter template. The count may go **down** and never up. Remove some and run
`npm run style:baseline` to lock the improvement in.

## Seeing the system

`/styleguide` on the running site renders every colour role, type step and component state,
with live contrast figures. Look there before guessing.
