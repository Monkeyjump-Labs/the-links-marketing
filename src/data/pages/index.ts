import type { PageData } from '../../lib/types';

/**
 * Map of slug → block-composed page data for the generic [slug].astro route.
 *
 * The Links' pages are venue-shaped (rates tables, league states, per-venue
 * schema) and are written as dedicated Astro routes under src/pages/ instead.
 * This map stays for any future generic marketing page.
 */
export const pageData: Record<string, PageData> = {};
