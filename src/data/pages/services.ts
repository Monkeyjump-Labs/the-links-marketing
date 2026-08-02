import type { PageData } from '../../lib/types';
import { wantToWorkTogetherCta } from '../blocks/wantToWorkTogether';

export const servicesPage: PageData = {
  metadata: {
    metaTitle: 'Services | Your Company',
    metaDescription: 'What we offer and how we can help.',
  },
  blocks: [
    {
      type: 'blocks.hero',
      heading: 'Services',
      subHeading: 'What we do and how we can help.',
      backgroundColor: 'banana',
      subHeadingTextWrapModel: 'services',
    },
    {
      type: 'blocks.service-grid',
      heading: 'What we offer',
      subHeading: 'Replace these with your actual service offerings.',
      services: [
        { title: 'Service One', description: 'Describe this service offering.' },
        { title: 'Service Two', description: 'Describe this service offering.' },
        { title: 'Service Three', description: 'Describe this service offering.' },
        { title: 'Service Four', description: 'Describe this service offering.' },
      ],
    },
    {
      type: 'blocks.accordion',
      items: [
        { heading: 'Frequently asked question one?', body: 'Answer placeholder for the first question.' },
        { heading: 'Frequently asked question two?', body: 'Answer placeholder for the second question.' },
      ],
    },
    wantToWorkTogetherCta,
  ],
};
