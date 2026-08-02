import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { redirects } from './src/data/redirects';

// Update `site` to your production URL. It drives canonical URLs, the sitemap,
// and absolute Open Graph image URLs.
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), react(), sitemap()],
  redirects,
  vite: {
    plugins: [tailwindcss()],
  },
});
