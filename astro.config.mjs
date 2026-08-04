import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { redirects } from './src/data/redirects';

// Canonical production host. Drives canonical URLs, the sitemap, and absolute
// Open Graph image URLs.
//
// NOTE: today `thelinks.golf` 301s INTO `lakevillelinks.com`. That rule must be
// DELETED before this domain is pointed here, or the two rules form a loop.
// See marketing/websites/the-links/seo-map.md §4.1 for the ordered cutover.
export default defineConfig({
  site: 'https://thelinks.golf',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    react(),
    // /styleguide is an internal reference page. It already emits
    // `<meta name="robots" content="noindex">`; keeping it out of the sitemap
    // stops us asking Google to crawl a page we then tell it to drop.
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
  ],
  redirects,

  /**
   * The adapter exists for ONE route: `src/pages/api/lead.ts`, which sets
   * `export const prerender = false`. Everything else stays prerendered —
   * `output: 'static'` above is unchanged and all 21 pages still build to HTML.
   * Adding an adapter does not make the site server-rendered; it makes
   * server-rendering *available* to routes that opt in.
   */
  adapter: vercel(),

  /**
   * Typed environment, with the secrets declared as secrets.
   *
   * `access: 'secret'` is the load-bearing part. Astro inlines any `PUBLIC_*`
   * variable into the CLIENT bundle — which is correct for a form action URL and
   * catastrophic for an API key. Declaring these here means importing one from
   * client-side code is a BUILD ERROR rather than something a reviewer has to
   * notice. Same philosophy as the token contrast gate: make the mistake
   * impossible instead of documenting it.
   *
   * All are `optional: true` so the site still builds without them — the
   * forms degrade and say so. `npm run leads:check` is what refuses to let a
   * PRODUCTION build ship unconfigured; see scripts/check-leads.mjs.
   */
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      /**
       * The whole service-account JSON, base64-encoded.
       *
       * Base64 rather than the raw PEM because a Google private key is
       * multi-line, and multi-line values are the classic way this integration
       * breaks: the newlines get mangled somewhere between a clipboard, a
       * dashboard field and a shell, and you get an opaque "invalid_grant" at
       * runtime. One base64 line has nothing to mangle.
       */
      GOOGLE_SERVICE_ACCOUNT_JSON_B64: envField.string({ context: 'server', access: 'secret', optional: true }),
      LEAD_SHEET_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      /** HMAC key for the form's signed timestamp. Any long random string. */
      LEAD_FORM_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
