import type { PageData } from '../../lib/types';
import { wantToWorkTogetherCta } from '../blocks/wantToWorkTogether';

export const workPage: PageData = {
  metadata: {
    metaTitle: 'Work | Your Company',
    metaDescription: 'A selection of our projects and case studies.',
  },
  blocks: [
    {
      type: 'blocks.hero',
      heading: 'Our Work',
      subHeading: 'A selection of projects that show how we work.',
      backgroundColor: 'mint',
      subHeadingTextWrapModel: 'work',
    },
    {
      type: 'blocks.case-study-grid',
      heading: 'Case studies',
    },
    {
      type: 'blocks.testimonial-slider',
      testimonials: [
        {
          quote: 'Add a client testimonial here. This is placeholder copy demonstrating the testimonial slider block.',
          clientName: 'Client Name',
          clientTitle: 'Title, Company',
          bgColor: 'lavender',
        },
        {
          quote: 'A second testimonial. Rotate through as many as you like.',
          clientName: 'Another Client',
          clientTitle: 'Title, Company',
          bgColor: 'banana',
        },
      ],
    },
    wantToWorkTogetherCta,
  ],
};
