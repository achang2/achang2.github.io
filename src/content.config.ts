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

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    // YYYY-MM-DD; treated as a calendar date (UTC) so it never shifts by time zone.
    date: z.coerce.date(),
    summary: z.string(),
    // Free-form, lowercase tags. Each distinct tag becomes a filter on /updates/.
    tags: z.array(z.string().trim().toLowerCase()).default([]),
  }),
});

export const collections = { projects, updates };
