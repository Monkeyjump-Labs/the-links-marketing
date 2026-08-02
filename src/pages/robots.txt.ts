import type { APIRoute } from 'astro';

/**
 * robots.txt, generated so staging and production differ.
 *
 * PRODUCTION: allow everything, declare the sitemap.
 *   Critically, we add NO AI-crawler Disallow. The current Squarespace site does
 *   not block them either (verified — _ingest/_corrections.md §1), and the
 *   playbook is explicit that being absent from AI answers is a growing
 *   acquisition cost. 19–22% of the audited corpus blocks GPTBot/ClaudeBot by
 *   accident because a site builder did it by default. We do not.
 *
 * STAGING: disallow everything. Set PUBLIC_SITE_NOINDEX=true in the Vercel
 * preview environment. The pages also emit <meta name="robots" content="noindex">.
 */
export const GET: APIRoute = ({ site }) => {
  const isStaging = import.meta.env.PUBLIC_SITE_NOINDEX === 'true';

  const body = isStaging
    ? ['# Staging — not for indexing', 'User-agent: *', 'Disallow: /', ''].join('\n')
    : ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`, ''].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
