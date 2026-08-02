import type { PageData } from '../../lib/types';

// Home page — a data-driven composition of blocks. Edit blocks freely or via
// TinaCMS. Each block's `type` maps to a component in BlockRenderer.astro.
export const homePage: PageData = {
  metadata: {
    metaTitle: 'Your Company | Starter Template',
    metaDescription: 'A brand-neutral Astro + Tailwind + TinaCMS marketing site starter.',
  },
  blocks: [
    {
      type: 'blocks.hero',
      heading: 'Welcome',
      subHeading: 'A starter template for building fast, content-driven marketing sites.',
      backgroundColor: 'lavender',
      subHeadingTextWrapModel: 'home',
    },
    {
      type: 'blocks.cta-wirebox',
      heading: 'Composed from reusable blocks',
      subText:
        'Every page in this starter is an ordered array of blocks rendered by a single renderer. Add, remove, or reorder blocks in data files or through TinaCMS — no template changes required.',
      backgroundColor: 'banana',
      renderIcon: true,
    },
    {
      type: 'blocks.service-grid',
      heading: 'What this starter includes',
      subHeading: 'A block/content model, design-token theming, git-backed editing, and SEO defaults.',
      backgroundColor: 'mint',
      services: [
        { title: 'Block System', description: 'Data-driven pages assembled from typed, reusable blocks.' },
        { title: 'Design Tokens', description: 'Swap tokens.css to rebrand — Tailwind @theme consumes the vars.' },
        { title: 'TinaCMS', description: 'Edit content in the browser; changes commit back to the repo.' },
        { title: 'Content Collections', description: 'Typed MDX blog, articles, and case studies.' },
        { title: 'SEO Built In', description: 'Sitemap, robots, canonical, and Open Graph tags.' },
        { title: 'Vercel Ready', description: 'Static output with trailing-slash + redirect handling.' },
      ],
    },
    {
      type: 'blocks.contact-form',
      heading: 'Get in touch',
      buttonText: 'Send',
    },
  ],
};
