import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
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
  vite: {
    plugins: [tailwindcss()],
  },
});
