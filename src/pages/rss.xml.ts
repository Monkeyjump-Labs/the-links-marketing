import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Your Company Blog',
    description: 'Insights, updates, and ideas.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.datePublished.valueOf() - a.data.datePublished.valueOf())
      .map((p) => ({
        title: p.data.title,
        pubDate: p.data.datePublished,
        description: p.data.description,
        link: `/blog/${p.slug}/`,
      })),
  });
}
