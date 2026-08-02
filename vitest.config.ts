/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// `getViteConfig` types its arg as Vite's UserConfig, which does not include
// Vitest's `test` key; the triple-slash reference augments it at type-check time
// but the arg position stays narrowly typed, so we widen it here.
export default getViteConfig({
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Provide PUBLIC_ env vars the components expect at import time, so the
    // suite is self-contained and doesn't depend on a local .env or CI secret.
    env: {
      PUBLIC_LEAD_ENDPOINT: 'https://example.test/lead',
    },
  },
} as Parameters<typeof getViteConfig>[0]);
