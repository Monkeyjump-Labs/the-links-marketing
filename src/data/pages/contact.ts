import type { PageData } from '../../lib/types';
import { globalData } from '../global';

export const contactPage: PageData = {
  metadata: {
    metaTitle: 'Contact | Your Company',
    metaDescription: 'Get in touch with us.',
  },
  blocks: [
    {
      type: 'blocks.contact-form',
      heading: "Let's talk",
      buttonText: 'Send',
    },
    {
      type: 'blocks.contact-find-us',
      heading: 'Find Us',
      companyName: globalData.footer.companyName,
      streetAddress: globalData.footer.companyAddress,
      city: globalData.footer.city,
      state: globalData.footer.state,
      zipCode: globalData.footer.zipCode,
      email: globalData.footer.generalCompanyEmail,
      phone: globalData.footer.companyPhone,
      careersHeading: 'Careers',
      careersEmail: 'jobs@example.com',
      careersPhone: globalData.footer.companyPhone,
    },
  ],
};
