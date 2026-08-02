import type { CtaWireboxBlock } from '../../lib/types';

// Reusable CTA block shared across pages. Edit freely.
export const wantToWorkTogetherCta: CtaWireboxBlock = {
  type: 'blocks.cta-wirebox',
  heading: 'Want to work together?',
  subText:
    'Tell us about your project. Whether you have a fully-formed idea or just the start of one, we would love to hear from you.',
  ctaLabel: 'Get in touch',
  ctaUrl: '/contact/',
};
