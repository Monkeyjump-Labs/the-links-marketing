# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The marketing website for **The Links** — indoor golf simulator venues at **two**
Minnesota locations: The Links of Lakeville (6 GolfZon NX bays, full bar, open
since 2022) and The Links of Stillwater (4 bays, inside Stillwater Bowl & Lounge,
opened early 2026).

Forked from `Monkeyjump-Labs/appletron-site-starter` (Astro 5 + React 18 +
Tailwind v4 + TinaCMS). Built as the first external test of the appletron website
factory — ClickUp `868kk6pr1`.

**Read `marketing/websites/the-links/` before changing anything substantive.** It
holds the ingest of the old site, the audit, the brief, the strategy, the IA and
the SEO map — the reasoning behind every structural decision here. `EDITING.md` is
the client-facing guide.

## ⚠️ If you are helping CJ, read this first

CJ Johnson (`cjohnson-creator`) runs The Links and owns this site. CJ is not a developer —
no git, no code, no command line. CJ edits through Claude, and these rules are here rather
than only in the onboarding prompt because a prompt can be lost and this file cannot.

**In a session with CJ:**

1. **Start by pulling, before you touch anything.** `staging` moves without CJ: a
   formatting fix-up is pushed back automatically (`.github/workflows/autofix.yml`), and a
   developer may have pushed too. Skip the pull and CJ's first push of the session is
   rejected as out of date — which lands as a wall of git output in front of someone who
   does not read git. Pull first and it never happens.
2. **Work only on `staging`.** Confirm the branch before changing a file. Never edit `main`
   directly.
3. **Publishing is its own spoken request.** CJ *may* promote to production and you may do
   it — but only when asked in plain words, never as the tidy-up at the end of another task.
   The **Branching & PRs** section below tells you to self-merge once CI is green. **That is
   for developers and does not apply here.** Finishing an edit means getting it onto staging.
4. **Never fill a gap with a guess.** Missing prices and hours are marked on purpose (see the
   two rules below). If CJ says "just put something sensible", refuse and explain why.
5. **Anything about how the site LOOKS is out of scope** — colours, sizes, spacing, corners.
   Write down what CJ dislikes in CJ's own words and pass it to a developer. See
   [`STYLE-RULES.md`](STYLE-RULES.md); if you are about to type a hex or a `text-[13px]`,
   you have left your lane.
6. **Promoting publishes everything on `staging`**, not just today's work. Check what is
   sitting there before you promote, and keep `staging` reset to `main` when it is idle.

The full prompt, the reasoning and the escalation path are in
`marketing/websites/the-links/onboarding-prompt-cj.md` and `handoff.md`.

## The two rules that shape this codebase

**1. Venue is a dimension, not a fork.** There is ONE set of topic pages; each
carries a venue column (`/rates`) or a venue-prefixed row (`/leagues`). Do not
create `/lakeville/rates` and `/stillwater/rates`. The only per-venue pages are
`/locations/lakeville` and `/locations/stillwater`, which exist to be the local-SEO
anchors and to carry per-venue `LocalBusiness` schema. Venue is chosen at the
booking click, not the front door. Rationale: `marketing/websites/the-links/sitemap.md` §1.

**2. Never publish an unverified fact.** The client has not supplied winter rates,
winter hours, Stillwater's real hours, the league lineup, group pricing or lesson
pricing. **Do not replace a gap with a plausible guess.** A marked gap is
recoverable; a wrong price on the internet is not. `verified: false` on a venue
record surfaces a pre-launch banner on its page.

**2a. A missing fact gets a MARK, and which mark depends on who it is for.**
This site used to write `STUB — …` inline wherever something was missing, which
put our build notes on ten live customer-facing pages for a year (FW-4013).
**Never write a raw `STUB —` block again.** There are four marks and they are not
interchangeable:

| The thing                                          | Mark               | Renders in production?                            |
| -------------------------------------------------- | ------------------ | ------------------------------------------------- |
| Work WE owe — chase the client, get the logo files | `StubNote`         | **No.** Staging only (`PUBLIC_SITE_NOINDEX=true`) |
| A fact a customer would look for and nobody has    | `GapCell` `notSet` | **Yes.** That is the point                        |
| A fact we state but have not verified              | `PendingTag`       | **Yes**, beside the value                         |
| A price we hold back on purpose, quoted on request | `GapCell` `quoted` | **Yes**                                           |

The test is _who is the sentence addressed to_. "Confirm this with the client" is
ours. "We have not published a walk-in policy" is theirs. One line can contain
both, and then it splits into two marks — see `/contact`, where a real HR email
address had been sitting inside a stub nobody was meant to read.

**On the legal pages the disclosure is customer-facing on purpose.** `/privacy`,
`/terms` and `/policy` state plainly that the documents are provisional and have
not been through a lawyer. Do **not** move that into a `StubNote`: hiding it would
present an unreviewed policy as a reviewed one, and silence is a stronger claim
than the notice is. Rewrite it if you like; do not delete it. Reasoning in full at
the head of `src/pages/privacy.astro`.

`npm run audit:visual` fails the build if `STUB`, `TBC` or an instruction
addressed to us is visible on any audited route. Add every new route to its
`ROUTES` list — the five pages worst affected by FW-4013 were also the five
missing from it.

## The playbook governs page structure

`fareway-brain/marketing/websites/_playbook/` is the evidence base — measured from
**126 live simulator-venue and golf-course sites**. It is authoritative on IA and
page content. Where generic instinct conflicts with it, the playbook wins. The
rules most load-bearing here:

- **Leagues carry a waitlist in all three registration states** (`open` / `full` /
  `between`) and never dead-end. Zero of the 126 sites audited had one. This is the
  highest-value component on the site.
- **Rates and hours live on ONE page** — the same decision moment.
- **Seasonality is a field, not a second page.** Never ship `/rates` and
  `/rates-winter`; add a rate card and flip `current`.
- **Prices, menus and rate cards are HTML text, never images or PDFs.**
- **Hours belong on the homepage** (the `TrustStrip`), not just `/contact`.
- **Name the simulator technology.** 42% of the segment doesn't.
- **Write to the least confident visitor** — the buyer is often not a golfer.
- Banned words: "premier", "state-of-the-art", "ultimate".

## Content model

Venue data lives in content collections so the client can edit it in Tina, NOT in
`src/data/global.ts`:

| Collection | Path                   | Holds                                                            |
| ---------- | ---------------------- | ---------------------------------------------------------------- |
| `venues`   | `src/content/venues/`  | address, phone, per-day hours, bays, booking URL, schema types   |
| `leagues`  | `src/content/leagues/` | one per league; `state` drives the three registration behaviours |
| `rates`    | `src/content/rates/`   | one card per season; `current: true` on the live one             |
| `menu`     | `src/content/menu/`    | menu sections and items                                          |
| `faq`      | `src/content/faq/`     | the AEO surface; renders `FAQPage` schema                        |

`src/lib/venues.ts` has the helpers — `getVenues`, `summariseHours`,
`schemaOpeningHours`, `formatAddress`, `telHref`. Use them rather than
re-formatting venue data inline.

## Structured data

`src/components/venue/*Schema.astro`. One `Organization` (no address — the parent
brand is not a place; putting Lakeville's address on the org is exactly the bug we
are fixing) with two `subOrganization` venues, each declared once on its own
location page. `Event` schema on dated leagues only — a stub league emits nothing
rather than invalid markup.

## Deploy, domain and staging

- Canonical host is **`thelinks.golf`**. ⚠️ Today `thelinks.golf` 301s INTO
  `lakevillelinks.com`. **Delete that rule before pointing the domain here** or the
  two form a redirect loop. Ordered cutover: `marketing/websites/the-links/seo-map.md` §4.1.
- `vercel.json` carries 29 permanent redirects from the old site. The five dated
  pages (`/cazopen`, `/vikings-game-day-special`, three `/news/*`) are deliberately
  left to 404 — Vercel's redirects cannot emit 410.
- **Staging must set `PUBLIC_SITE_NOINDEX=true`.** That makes every page emit
  `noindex` and serves a `Disallow: /` robots.txt. Unset it in production.
- `robots.txt` is generated by `src/pages/robots.txt.ts`. **Never add an
  AI-crawler `Disallow`.** The old site doesn't block them, and being absent from
  AI answers is a real acquisition cost. 19–22% of the audited corpus blocks
  GPTBot/ClaudeBot by accident because a site builder did it by default.

## Tech stack

Astro 5 (static), React 18 (islands), **Tailwind CSS v4** (via `@tailwindcss/vite`),
TinaCMS (git-backed, local filesystem mode), MDX content collections, TypeScript.
Do not reintroduce SCSS — styling is Tailwind utilities only.

## Architecture rules

- **Block model.** Pages are ordered arrays of typed blocks. The `Block` union is
  in `src/lib/types.ts`; the `type → component` map is in
  `src/components/BlockRenderer.astro`; page compositions are in
  `src/data/pages/*.ts`. To add a block: extend the union, create the component,
  register it in `BlockRenderer`. To add a block-composed page: create
  `data/pages/<name>.ts` and register it in `data/pages/index.ts`.
- **Content collections** live in `src/content/` (`blog`, `articles`,
  `caseStudies`, `pages`) with Zod schemas in `src/content/config.ts`.
- **Chrome.** `BaseLayout.astro` renders the shared `Header` + `Footer` around a
  page's blocks; individual pages should not re-render them. Pass `chrome={false}`
  for a bare page.

## Styling & design tokens

- **Never hardcode hex colors or `px` font families in components.** Use Tailwind
  utilities backed by theme tokens.
- The rebrand entry point is `src/styles/tokens.css` (raw brand primitives as CSS
  custom properties). `src/styles/global.css` maps them into Tailwind via `@theme`.
  Editing tokens.css re-themes the whole site.
- **Dynamic (`BrandColor`) classes** must go through `src/lib/colorClasses.ts`
  (`bgClass`/`textClass`/`borderClass` maps of full class strings) — Tailwind only
  detects statically-written class names, so `bg-${color}` interpolation will be
  purged. When extending the `BrandColor` union, update `tokens.css`, the `@theme`
  block, and `colorClasses.ts` together.

## TinaCMS

- `npm run dev` runs Tina in local filesystem mode — **no cloud credentials
  required**. Collections are in `tina/config.ts`.
- **`npm run build` (astro build) must never depend on Tina Cloud.** Keep it that
  way. Tina Cloud is opt-in via env vars (`TINA_CLIENT_ID`, `TINA_TOKEN`,
  `TINA_BRANCH`); see `.env.example`.
- Tina-generated output (`tina/__generated__/`, `public/admin/`) is gitignored.

### ⚠️ Tina schema changes: ALWAYS regenerate + commit `tina/tina-lock.json`

Tina Cloud derives its **remote** GraphQL schema from the **committed
`tina/tina-lock.json`** — NOT from `tina/config.ts` directly. If you add or change a
collection/field in `config.ts` but don't refresh the committed lock, a Tina-Cloud-
connected site keeps serving the old schema and deploys fail with _"local GraphQL
schema doesn't match the remote schema."_ Cloud-mode `tinacms build` will not fix it
(it snapshots the stale remote into the lock — a self-perpetuating mismatch).

**Whenever you touch `tina/config.ts`, in the same commit run:**

```bash
npm run tina:lock          # regenerates tina-lock.json from local schema (offline, no creds)
git add tina/tina-lock.json
```

- The `✅ Quality` CI gate (`npm run tina:lock:check`) **fails the PR** if the
  committed lock is stale. It runs offline with dummy creds and compares
  semantically (key-order independent), so it never flaps.
- Keep `tina/config.ts` **deterministic** — no `Date.now()`, `Math.random()`, or
  dated comments in schema-affecting positions; they cause phantom mismatches.
- Keep `tinacms` and `@tinacms/cli` on matching versions (`package-lock.json` is
  committed so CI installs the same Tina version).

### Enabling Tina Cloud on a forked site (prod editing at `/admin/`)

The starter ships local-mode only. To turn on live editing for a client site:

1. Create a Tina Cloud project, connect the site's GitHub repo, set
   `TINA_CLIENT_ID` / `TINA_TOKEN` / `TINA_BRANCH` in the Vercel project env.
2. Set the **Vercel deploy** build (`vercel.json` `buildCommand`) to
   `tinacms build && astro build` — this generates the live `/admin/` and validates
   schema sync on deploy. Leave `npm run build` (package.json) as `astro build` only.
3. First deploy will fail with a schema mismatch until the remote schema is seeded —
   run `npm run tina:lock`, commit the lock, and push so Tina Cloud indexes it.

## Testing a form locally: the URL needs its trailing slash

⚠️ **`POST /api/lead` 404s under `astro dev`. `POST /api/lead/` works.**

`trailingSlash: 'always'` in `astro.config.mjs` applies to API routes exactly as
it does to pages. Production is more forgiving — Vercel 308s the slashless form
and a 308 preserves the method and body — so this bites **only** in local
development, which is what makes it expensive: you get a bare 404 with nothing
pointing at the missing character, and conclude the endpoint is broken.

Every form on the site posts to `/api/lead/` and the site is consistent about it.
If you are testing by hand, include the slash:

```bash
curl -X POST http://localhost:4321/api/lead/ -d 'list=events&name=…'   # works
curl -X POST http://localhost:4321/api/lead  -d 'list=events&name=…'   # 404
```

A local POST answering **400 "This form is not configured correctly"** is the
route working: it means the handler ran and found no lead destination configured
(`LEAD_SHEET_ID`, `RESEND_API_KEY` — see `.env.example`). A **404** means the
slash. Do not chase the 400 as a routing bug.

Two related traps in the same area:

- `LeadFormScript.astro`'s `ENDPOINT` is used both to `fetch` and to select forms
  by `form[action="…"]`. It must stay character-identical to the `action` on
  `EnquiryForm`, `LessonEnquiryForm` and `WaitlistForm`, or the enhancement
  silently matches nothing and every form falls back to a page navigation.
- `astro dev` **auto-increments the port** when the one you asked for is taken,
  and says so only in its startup output. Read the port it actually bound before
  trusting a 404 — testing against a port another process owns proves nothing.

## Before you finish

Keep all of these green:

```bash
npm run build     # must pass, with no Tina cloud creds
npm run check     # astro check — 0 errors
npm test          # vitest
npm run lint      # eslint + prettier
```

CI (`.github/workflows/quality.yml`) runs tina-lock-freshness → lint → check →
test → build on PRs. If you changed the Tina schema, also run `npm run tina:lock`
and commit `tina/tina-lock.json`.

Two things about those two scripts that used to waste a run each time (FW-4023):

- **`npm run lint` works from a git worktree.** It did not: `.eslintrc.json` had
  no `root: true`, so ESLint cascaded up out of a worktree under `.claude/`,
  picked up the parent checkout's config, and then ignored every file as living
  under a dot-directory — reported as the very misleading `No files matching the
  pattern "src"`. **Do not "fix" that with `--no-ignore`**: that also un-ignores
  `dist/` and `.astro/`, so it lints a different set. `root: true` is the fix and
  it is already there. Leave it.
- **`npm run format` no longer rewrites Tina content.** `src/content/**/*.{json,md}`
  is in `.prettierignore`, because Tina and Prettier format those files
  differently and each reverts the other. `npm run format` on a clean checkout
  must leave `git status` clean — if it ever does not, that is the bug, not
  something to commit.

## Branching & PRs

`main` is the default branch: no direct pushes. All changes go through a PR that
must pass the `✅ Quality` check (which includes the Tina lock gate) before merge.
Approvals aren't required (0), so you can self-merge once CI is green. **This paragraph is for developers — it does not apply in a session with CJ; see the operator section near the top.** Work on a
branch → open a PR → let CI pass → merge (`strict` is on, so update the branch on
`main` first). Branch protection is enabled on `main` (verified 2026-08-30: required
`Quality` check, strict, force pushes and deletions blocked). The client-handoff runbook —
staging sandbox pipeline, onboarding checklist, snapshot/rollback — is
`marketing/websites/the-links/handoff.md`.

## Deploy

**Not** the Vercel Git integration — that is disconnected. Deploys run from
`.github/workflows/deploy.yml` under a CI-owned `VERCEL_TOKEN`, because the Git
integration attributes every deploy to the commit author and silently refuses one
from an account that is not a linked Vercel member: green CI, no error, no deploy.
That is what lets a client push and still have the site ship. Full reasoning and
the verification commands: `docs/vercel-ci-token-deploys.md`.

Three branches' worth of behaviour, all from that one workflow:

| Push to | Builds | Lands on |
| --------- | -------------- | ------------------------------------------- |
| `main` | `--prod` | production |
| `staging` | preview | `staging-the-links.vercel.app` via an alias |
| a PR | preview | a one-off URL commented on the PR |

`staging` is the client's sandbox — see `marketing/websites/the-links/handoff.md` §2.
Set `site` in `astro.config.mjs`. `PUBLIC_LEAD_ENDPOINT` is retired; lead capture is
configured with `LEAD_SHEET_ID` / `RESEND_API_KEY` (`docs/lead-capture.md`).

## Where the reasoning lives

| File                                                   | What it answers                                                       |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| `marketing/websites/the-links/brief.md`                | what we're building and the decisions log                             |
| `marketing/websites/the-links/current-site-audit.md`   | what was wrong with the old site                                      |
| `marketing/websites/the-links/strategy.md`             | positioning, funnel, seasonality                                      |
| `marketing/websites/the-links/sitemap.md`              | the IA and per-page acceptance criteria                               |
| `marketing/websites/the-links/seo-map.md`              | keywords, metadata, schema, the redirect table                        |
| `marketing/websites/the-links/brand-inventory.md`      | what the old brand actually was, verified                             |
| `marketing/websites/the-links/_ingest/_corrections.md` | **subagent findings that were wrong — read before citing the ingest** |
