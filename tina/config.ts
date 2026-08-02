import { defineConfig } from 'tinacms';

/**
 * TinaCMS configuration — LOCAL / filesystem mode.
 *
 * This runs with NO Tina Cloud credentials. `npm run dev` starts
 * `tinacms dev -c "astro dev"`, which serves a local content API and the admin
 * UI at http://localhost:4321/admin. Edits are written straight back to the
 * files in `src/content/**` as MDX/Markdown and committed with your normal git
 * flow.
 *
 * To connect Tina Cloud later (multi-user editorial, media, prod editing):
 *   1. Create a project at https://app.tina.io and get its Client ID + a
 *      read-only Token.
 *   2. Set TINA_CLIENT_ID, TINA_TOKEN, and TINA_BRANCH (see .env.example).
 *   3. Add `tina:build` to your build step. The values below already read from
 *      env, so no code change is required.
 */

const branch = process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

// A shared brand-color select mirroring the BrandColor union in src/lib/types.ts.
const brandColorOptions = [
  'watermelon',
  'pink',
  'grape',
  'lavender',
  'banana',
  'gold',
  'mint',
  'teal',
  'blue',
  'offWhite',
  'softBlack',
];

export default defineConfig({
  branch,
  // Empty in local mode. Populate via env for Tina Cloud.
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'shortName', label: 'Short Name' },
          { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
          { type: 'datetime', name: 'datePublished', label: 'Date Published', required: true },
          { type: 'string', name: 'author', label: 'Author', required: true },
          {
            type: 'string',
            name: 'heroBgColor',
            label: 'Hero Background Color',
            options: brandColorOptions,
            required: true,
          },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'article',
        label: 'Articles',
        path: 'src/content/articles',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'shortName', label: 'Short Name' },
          { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
          { type: 'datetime', name: 'datePublished', label: 'Date Published', required: true },
          { type: 'string', name: 'author', label: 'Author', required: true },
          {
            type: 'string',
            name: 'heroBgColor',
            label: 'Hero Background Color',
            options: brandColorOptions,
            required: true,
          },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'caseStudy',
        label: 'Case Studies',
        path: 'src/content/caseStudies',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'shortName', label: 'Short Name' },
          { type: 'string', name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'slideshowDescription', label: 'Slideshow Description' },
          { type: 'string', name: 'heroBgColor', label: 'Hero Background Color', options: brandColorOptions },
          { type: 'string', name: 'industry', label: 'Industry' },
          { type: 'string', name: 'technologies', label: 'Technologies' },
          { type: 'string', name: 'status', label: 'Status' },
          { type: 'number', name: 'gridOrder', label: 'Grid Order' },
          { type: 'number', name: 'slideshowOrder', label: 'Slideshow Order' },
          { type: 'boolean', name: 'published', label: 'Published' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'page',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
    ],
  },
});
