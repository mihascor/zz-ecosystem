import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number(),
    category: z.string(),
    subcategory: z.string(),
    tags: z.array(z.string()),
    cover: z.string(),
    description: z.string(),
    published: z.boolean(),
    date: z.string(),
  }),
});

export const collections = {
  articles,
};
