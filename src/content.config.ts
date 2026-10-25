import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['planned', 'in-progress', 'paused', 'complete']),
    // Lower numbers are listed first in the Projects page and menu.
    order: z.number().default(100),
    repo: z.url().optional(),
    demo: z.url().optional(),
  }),
});

export const collections = { projects };
