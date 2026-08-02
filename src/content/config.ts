import { defineCollection, z, type SchemaContext } from 'astro:content';

const brandColor = z.enum([
  'watermelon',
  'pink',
  'grape',
  'lavender',
  'banana',
  'gold',
  'mint',
  'teal',
  'blue',
  'offWhite',
  'softBlack',
]);

const postSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    shortName: z.string().optional(),
    description: z.string(),
    datePublished: z.date(),
    author: z.string(),
    heroBgColor: brandColor,
    heroImage: image().optional(),
    heroImageAltText: z.string().optional(),
    featured: z.boolean().default(false),
    indexImage: image().optional(),
    indexImageAltText: z.string().optional(),
    indexTitle: z.string().optional(),
    indexDescription: z.string().optional(),
    metaData: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        shareImage: image().optional(),
        twitterCardType: z.enum(['summary', 'summary_large_image']).optional(),
      })
      .optional(),
  });

// ── Collections ───────────────────────────────────────────────────────────────

const blog = defineCollection({ type: 'content', schema: postSchema });

const articles = defineCollection({ type: 'content', schema: postSchema });

const caseStudies = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortName: z.string().optional(),
      description: z.string(),
      slideshowDescription: z.string().optional(),
      heroBgColor: brandColor.optional(),
      heroImage: image().optional(),
      heroImageAltText: z.string().optional(),
      cardImage: z.string().optional(),
      cardImageAltText: z.string().optional(),
      slideshowImage: z.string().optional(),
      slideshowImageAltText: z.string().optional(),
      industry: z.string().optional(),
      technologies: z.string().optional(),
      status: z.string().optional(),
      gridOrder: z.number().optional(),
      slideshowOrder: z.number().optional(),
      published: z.boolean().default(false),
      metaData: z
        .object({
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
          shareImage: image().optional(),
          twitterCardType: z.enum(['summary', 'summary_large_image']).optional(),
        })
        .optional(),
    }),
});

// Free-form markdown pages, editable in TinaCMS and rendered at /pages/[slug]/.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    metaData: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, articles, caseStudies, pages };
