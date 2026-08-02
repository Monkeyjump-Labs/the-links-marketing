import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import CaseStudyCard from './CaseStudyCard.astro';

describe('CaseStudyCard', () => {
  it('renders title, description, stats and a Learn more link when href is set', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CaseStudyCard, {
      props: {
        study: {
          title: 'Chekt',
          description: 'Contactless food pickup platform',
          image: '/images/chekt.jpg',
          href: '/caseStudy/chekt/',
          industry: 'Food & Agriculture',
          technologies: 'Mobile, IoT',
          status: 'In-progress',
        },
      },
    });
    expect(result).toContain('Chekt');
    expect(result).toContain('Contactless food pickup platform');
    expect(result).toContain('Mobile, IoT');
    expect(result).toContain('/caseStudy/chekt/');
    expect(result).toContain('Learn more');
  });

  it('omits the Learn more link when there is no href', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(CaseStudyCard, {
      props: { study: { title: 'Steamchain', description: 'Machine-as-a-service platform' } },
    });
    expect(result).toContain('Steamchain');
    expect(result).not.toContain('Learn more');
  });
});
