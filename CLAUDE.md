# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

`appletron-site-starter` is a **reusable, brand-neutral marketing-website starter
template** (Astro 5 + React 18 + Tailwind CSS v4 + TinaCMS). It is forked to
create individual client marketing sites. Content is placeholder and intentionally
generic — do not reintroduce brand-specific copy, assets, or colors into the
starter itself.

Read `README.md` first — it documents the block model, the token contract, the
Tina setup, forking, and deploy. This file adds working conventions and the
non-obvious rules.

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
connected site keeps serving the old schema and deploys fail with *"local GraphQL
schema doesn't match the remote schema."* Cloud-mode `tinacms build` will not fix it
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

## Branching & PRs

`master` is **branch-protected**: no direct pushes. All changes go through a PR that
must pass the `✅ Quality` check (which includes the Tina lock gate) before merge.
Approvals aren't required (0), so you can self-merge once CI is green. Work on a
branch → open a PR → let CI pass → merge (`strict` is on, so update the branch on
`master` first). Sites forked from this starter should keep the same convention.

## Deploy

Vercel via its Git integration (`vercel.json` present). No GitHub deploy workflow.
Set `site` in `astro.config.mjs` and `PUBLIC_LEAD_ENDPOINT` in the host env.

## Inherited reference

`docs-handoff/` is historical build-handoff documentation from the source project.
It predates the Tailwind + TinaCMS changes — useful background, not current truth.
