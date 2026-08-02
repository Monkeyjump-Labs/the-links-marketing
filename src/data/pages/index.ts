import type { PageData } from '../../lib/types';
import { aboutPage } from './about';
import { workPage } from './work';
import { contactPage } from './contact';

// Map of slug → page data for the generic [slug].astro route
export const pageData: Record<string, PageData> = {
  about: aboutPage,
  work: workPage,
  contact: contactPage,
};
