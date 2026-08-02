import type { PageData } from '../../lib/types';

export const aboutPage: PageData = {
  metadata: {
    metaTitle: 'About | Your Company',
    metaDescription: 'Learn about our team and what we do.',
  },
  blocks: [
    {
      type: 'blocks.hero',
      heading: 'About',
      subHeading: 'A short statement about who you are and what you value.',
      backgroundColor: 'lavender',
      subHeadingTextWrapModel: 'about',
    },
    {
      type: 'blocks.action-statement',
      heading: 'Our mission',
      subHeading:
        'Replace this with a paragraph describing your company mission, approach, and the outcomes you deliver for clients.',
    },
    {
      type: 'blocks.employee-grid',
      employees: [
        { name: 'Team Member One', title: 'Role / Title', bio: 'Short bio placeholder.' },
        { name: 'Team Member Two', title: 'Role / Title', bio: 'Short bio placeholder.' },
        { name: 'Team Member Three', title: 'Role / Title', bio: 'Short bio placeholder.' },
      ],
    },
  ],
};
