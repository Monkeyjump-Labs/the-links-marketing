import { describe, expect, it, vi } from 'vitest';
import { getGridCaseStudies, getSlideshowSlides } from './caseStudies';

// Mock the content collection so the mappers can be tested without an Astro
// build. The fake getCollection applies the same predicate the mappers pass,
// so filtering by gridOrder / slideshowOrder is exercised too.
vi.mock('astro:content', () => {
  const entries = [
    {
      slug: 'chekt',
      data: {
        title: 'Chekt',
        description: 'Contactless food pickup platform',
        slideshowDescription: 'Redefining food pickup — the long version',
        cardImage: '/images/resized/chekt_305x193.jpg',
        slideshowImage: '/images/chekt_screen5.png',
        industry: 'Food & Agriculture',
        technologies: 'Mobile, IoT',
        status: 'In-progress',
        gridOrder: 4,
        slideshowOrder: 5,
        published: true,
      },
    },
    {
      slug: 'nosherie',
      data: {
        title: 'Nosherie',
        description: 'Food platform',
        // no slideshowDescription -> slideshow should fall back to description
        cardImage: '/images/nosherie.png',
        slideshowImage: '/images/nosherie.png',
        industry: 'FoodTech',
        technologies: 'React Native',
        status: 'Launched',
        gridOrder: 1,
        slideshowOrder: 1,
        published: false,
      },
    },
    {
      slug: 'steamchain',
      data: {
        title: 'Steamchain',
        description: 'Machine-as-a-service platform',
        cardImage: '/images/resized/steamchain_screen.jpg',
        industry: 'Manufacturing',
        technologies: 'IoT, Blockchain',
        status: 'Launched',
        gridOrder: 6,
        // no slideshowOrder -> excluded from the slideshow
        published: false,
      },
    },
  ];

  type Entry = (typeof entries)[number];
  return {
    getCollection: (_collection: string, filter?: (entry: Entry) => boolean) =>
      Promise.resolve(filter ? entries.filter(filter) : entries),
  };
});

describe('getGridCaseStudies', () => {
  it('returns every case study with a gridOrder, sorted ascending', async () => {
    const grid = await getGridCaseStudies();
    expect(grid.map((c) => c.slug)).toEqual(['nosherie', 'chekt', 'steamchain']);
  });

  it('links only published studies and uses the card image + short description', async () => {
    const grid = await getGridCaseStudies();
    const [nosherie, chekt] = grid;

    expect(chekt.href).toBe('/caseStudy/chekt/');
    expect(chekt.image).toBe('/images/resized/chekt_305x193.jpg');
    expect(chekt.description).toBe('Contactless food pickup platform');

    expect(nosherie.href).toBeUndefined();
  });
});

describe('getSlideshowSlides', () => {
  it('includes only studies with a slideshowOrder, sorted ascending', async () => {
    const slides = await getSlideshowSlides();
    expect(slides.map((s) => s.title)).toEqual(['Nosherie', 'Chekt']);
  });

  it('uses the slideshow image, status, and href for a published study', async () => {
    const slides = await getSlideshowSlides();
    const chekt = slides[1];

    expect(chekt.image).toBe('/images/chekt_screen5.png');
    expect(chekt.description).toBe('Redefining food pickup — the long version');
    expect(chekt.info.projectStatus).toBe('In-progress');
    expect(chekt.href).toBe('/caseStudy/chekt/');
  });

  it('falls back to the short description when no slideshowDescription is set', async () => {
    const slides = await getSlideshowSlides();
    const nosherie = slides[0];

    expect(nosherie.description).toBe('Food platform');
    expect(nosherie.href).toBeUndefined();
  });
});
