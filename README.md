# appletron-site-starter

A brand-neutral, reusable marketing-website **starter template**. Fork it, drop in
your brand's design tokens, edit the placeholder content, and deploy. It ships a
data-driven block/page system, git-backed content editing via TinaCMS, and SEO
defaults out of the box.

## Tech stack

- **Astro 5** — static site generation
- **React 18** — interactive islands (contact form, sliders, accordion)
- **Tailwind CSS v4** — styling, themed via CSS custom properties (`@theme`)
- **TinaCMS** — git-backed content editing (runs locally with no cloud account)
- **MDX** — content authoring for blog, articles, case studies, and pages
- **TypeScript**
- **Vercel** — static hosting (any static host works)

## Quick start

```bash
npm install
npm run dev      # starts TinaCMS + Astro; site at :4321, admin at :4321/admin
```

Other commands:

| Command | What it does |
|---|---|
| `npm run dev` | `tinacms dev -c "astro dev"` — Astro dev server + local Tina CMS |
| `npm run dev:astro` | Astro dev server only (no CMS) |
| `npm run build` | `astro build` — static build to `dist/` (no Tina cloud required) |
| `npm run tina:build` | Build the Tina admin/client (needs Tina Cloud env vars) |
| `npm run preview` | Preview the production build |
| `npm run check` | `astro check` — type-check |
| `npm test` | Run the Vitest suite |
| `npm run lint` / `npm run format` | ESLint / Prettier |

## Project structure

```
src/
├── components/     # UI: modules/ (page blocks), work/ (content blocks),
│                   #     posts/, contact/, about/, layout/, reusable/
├── content/        # MDX collections: blog, articles, caseStudies, pages
├── data/           # Page compositions (data/pages/*) + global.ts site data
├── layouts/        # BaseLayout (chrome), PostLayout (prose)
├── lib/            # types.ts (Block union), colorClasses.ts, helpers
├── pages/          # Astro routes
└── styles/         # tokens.css (brand override) + global.css (Tailwind + @theme)
tina/config.ts      # TinaCMS collections
```

## The block / content model

Every non-prose page is a **data-driven composition of blocks**. A page is an
ordered array of typed block objects; `BlockRenderer.astro` maps each block's
`type` to a component and renders it in order.

```ts
// src/data/pages/home.ts
export const homePage: PageData = {
  metadata: { metaTitle: '…', metaDescription: '…' },
  blocks: [
    { type: 'blocks.hero', heading: 'Welcome', subHeading: '…', backgroundColor: 'lavender' },
    { type: 'blocks.service-grid', heading: '…', services: [ … ] },
    { type: 'blocks.contact-form', heading: 'Get in touch' },
  ],
};
```

- The `Block` discriminated union lives in `src/lib/types.ts`.
- The `type → component` map lives in `src/components/BlockRenderer.astro`.
- Page compositions live in `src/data/pages/*.ts`.
  - `/` → `home.ts`; `/about/`, `/work/`, `/contact/` → `[slug].astro` reading
    `data/pages/index.ts`; `/services/` → `services/index.astro`.

Content collections (`src/content/`) hold editorial content as MDX/Markdown:
`blog` (`/blog/…`), `articles` (`/article/…`), `caseStudies` (`/caseStudy/…`),
and `pages` (`/pages/…`, free-form markdown). Schemas are in
`src/content/config.ts`.

### Add a page

- **Block-composed page:** create `src/data/pages/foo.ts` exporting `PageData`,
  then add it to the map in `src/data/pages/index.ts` (`foo: fooPage`). It renders
  at `/foo/`.
- **Prose page:** add `src/content/pages/foo.md` — it renders at `/pages/foo/`.

### Add a block type

1. Add an interface to the `Block` union in `src/lib/types.ts`.
2. Create the component (Astro for static, `.tsx` + `client:visible` for interactive).
3. Register it in `src/components/BlockRenderer.astro`.
4. Use it in any page's `blocks` array.

## Design tokens — the `tokens.css` contract

The single rebrand entry point is **`src/styles/tokens.css`**. It defines raw
brand primitives as CSS custom properties (colors, fonts, spacing, widths).

`src/styles/global.css` imports Tailwind and an `@theme` block that maps those
raw vars into Tailwind theme tokens — so `bg-grape`, `text-ink`, `font-mono`,
`max-w-content`, etc. all resolve to your token values.

**To rebrand:** replace `tokens.css` with your brand's compiled **DTCG** output
(Design Tokens Community Group JSON → CSS custom properties — e.g. the kiwitron
design-factory emits exactly this shape). Keep the custom-property **keys** the
same, or update the `@theme` mapping in `global.css` to match. You rarely touch
anything else.

> Note: dynamic color classes are resolved through `src/lib/colorClasses.ts`
> (full class strings), because Tailwind only detects statically-written class
> names. Add palette slots there if you extend the `BrandColor` union.

## TinaCMS — local mode (default) and Tina Cloud (later)

`npm run dev` runs TinaCMS in **local / filesystem mode with no cloud account**.
Open `http://localhost:4321/admin` to edit content in the browser; changes are
written straight back to files under `src/content/**` and committed with git as
usual. Collections are defined in `tina/config.ts`.

`npm run build` (`astro build`) does **not** require Tina — the site builds and
deploys with or without Tina configured.

**To connect Tina Cloud** (hosted multi-user editorial, prod editing): create a
project at <https://app.tina.io>, then set `TINA_CLIENT_ID`, `TINA_TOKEN`, and
`TINA_BRANCH` (see `.env.example`). No code change is needed — `tina/config.ts`
already reads these from the environment. Add `npm run tina:build` to your build
step when using cloud.

## Fork it for a new site

1. Copy this repo; run `npm install`.
2. Replace `src/styles/tokens.css` with your brand's DTCG tokens.
3. Update `src/data/global.ts` (company name, links, contact) and `site` in
   `astro.config.mjs`; update `public/robots.txt` and `public/favicon.ico`.
4. Replace placeholder content: `src/data/pages/*`, `src/content/**`.
5. Set `PUBLIC_LEAD_ENDPOINT` (contact form) in `.env` / your host.
6. `npm run build` and deploy.

## Deploy to Vercel

Import the repo in Vercel — the Astro framework preset is auto-detected, and
`vercel.json` sets the build command, output dir, trailing-slash, and clean-URL
behavior. Set `site` in `astro.config.mjs` to your production domain (drives
canonical URLs, the sitemap, and OG image URLs) and add any env vars
(`PUBLIC_LEAD_ENDPOINT`, optional Tina Cloud vars). Vercel's Git integration
handles production + preview deploys; no GitHub deploy workflow is included.

## SEO

- `@astrojs/sitemap` generates `/sitemap-index.xml`.
- `public/robots.txt` (update the domain).
- `src/components/Seo.astro` — title suffix, canonical, Open Graph, Twitter tags.
- `src/pages/rss.xml.ts` — blog RSS feed.

## Inherited reference

`docs-handoff/` contains the original build-handoff docs from the source project
(MJL). They describe the architecture this starter grew out of and remain useful
background, but they predate the Tailwind + TinaCMS changes — treat them as
historical reference, not current instructions.
