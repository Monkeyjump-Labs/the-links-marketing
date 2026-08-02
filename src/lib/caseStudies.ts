import { getCollection } from 'astro:content';
import type { CaseStudy, CaseStudySlide } from './types';

function caseStudyHref(slug: string, published: boolean): string | undefined {
  return published ? `/caseStudy/${slug}/` : undefined;
}

export async function getGridCaseStudies(): Promise<CaseStudy[]> {
  const studies = await getCollection('caseStudies', ({ data }) => data.gridOrder !== undefined);
  return studies
    .sort((a, b) => (a.data.gridOrder ?? 0) - (b.data.gridOrder ?? 0))
    .map((study) => ({
      title: study.data.title,
      description: study.data.description,
      image: study.data.cardImage,
      imageAlt: study.data.cardImageAltText,
      slug: study.slug,
      href: caseStudyHref(study.slug, study.data.published),
      industry: study.data.industry,
      technologies: study.data.technologies,
      status: study.data.status,
    }));
}

export async function getSlideshowSlides(): Promise<CaseStudySlide[]> {
  const studies = await getCollection('caseStudies', ({ data }) => data.slideshowOrder !== undefined);
  return studies
    .sort((a, b) => (a.data.slideshowOrder ?? 0) - (b.data.slideshowOrder ?? 0))
    .map((study) => ({
      title: study.data.title,
      image: study.data.slideshowImage,
      description: study.data.slideshowDescription ?? study.data.description,
      info: {
        industry: study.data.industry,
        technologies: study.data.technologies,
        projectStatus: study.data.status,
      },
      href: caseStudyHref(study.slug, study.data.published),
    }));
}
