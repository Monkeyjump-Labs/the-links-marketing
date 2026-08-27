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

**5. If you are reaching for a value that does not exist, stop.** That is a design change,
not an edit. Add it to `design/tokens.json` and regenerate — or, if you are not the
developer, describe what you wanted and hand it over. Do not inline it "just this once";
that is exactly how the old site ended up shipping a 3.2:1 button on all 41 pages.

## What the build will refuse

| Check | Refuses |
|---|---|
| `npm run tokens:check` | A palette edit that drops any text below 4.5:1 contrast |
| `npm run style:check` | Any **new** hardcoded colour or one-off size |
| `npm run audit:visual` | Internal notes visible to customers; pages over the weight budget |

`style:check` works off a recorded baseline — the site inherited 83 one-off sizes from the
starter template. The count may go **down** and never up. Remove some and run
`npm run style:baseline` to lock the improvement in.

## Seeing the system

`/styleguide` on the running site renders every colour role, type step and component state,
with live contrast figures. Look there before guessing.
