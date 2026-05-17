import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

const journal = defineCollection({
	loader: glob({ base: './src/content/journal', pattern: '**/[^_]*.{md,mdx}' }),
	schema: () =>
		z.object({
			date: z.coerce.date(),
			hoursWorked: z.number().optional(),
			summary: z.string(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts, journal };
