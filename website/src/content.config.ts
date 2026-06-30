import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/articles',
  }),
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
