import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Seo from './Seo.astro';
import { globalData } from '../data/global';

// Assert the SUFFIX BEHAVIOUR, not a literal brand name — a forked site renames
// the brand and these tests must survive that.
const suffix = globalData.metaTitleSuffix;

const baseProps = {
  canonical: 'https://example.com/work/',
  // Absolute URL so the share-image resolution doesn't depend on Astro.site in tests.
  shareImage: 'https://example.com/og.png',
};

describe('Seo', () => {
  it('appends the brand suffix when the title lacks it', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Seo, { props: { ...baseProps, title: 'Our Work' } });
    expect(result).toContain('<title>Our Work');
    expect(result).toContain(`${suffix}</title>`);
  });

  it('does not double-append the suffix when the title already includes the brand', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Seo, {
      props: { ...baseProps, title: `Contact ${suffix}` },
    });
    expect(result).toContain(`<title>Contact ${suffix}</title>`);
  });

  it('renders Open Graph and Twitter tags from props', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Seo, {
      props: { ...baseProps, title: 'Our Work', description: 'What we build', twitterCardType: 'summary' },
    });
    expect(result).toContain('property="og:title"');
    expect(result).toContain('content="What we build"');
    expect(result).toContain('name="twitter:card"');
    expect(result).toContain('content="summary"');
    expect(result).toContain('https://example.com/og.png');
  });

  it('adds a noindex robots tag only when noIndex is true', async () => {
    const container = await AstroContainer.create();
    const indexed = await container.renderToString(Seo, { props: { ...baseProps, title: 'Our Work' } });
    expect(indexed).not.toContain('noindex');

    const hidden = await container.renderToString(Seo, { props: { ...baseProps, title: 'Secret', noIndex: true } });
    expect(hidden).toContain('content="noindex"');
  });
});
