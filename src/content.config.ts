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
			lang: z.enum(['en', 'pt', 'de']).default('en'),
			translationKey: z.string().optional(),
		}),
});

const journal = defineCollection({
	loader: glob({ base: './src/content/journal', pattern: '**/[^_]*.{md,mdx}' }),
	schema: () =>
		z.object({
			date: z.coerce.date(),
			writtenAt: z.string().optional(),
			title: z.string().optional(),
			summary: z.string(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			focusTime: z.string().optional(),
			topCategories: z
				.array(
					z.object({
						name: z.string(),
						percent: z.number(),
						minutes: z.number(),
					}),
				)
				.optional(),
			topApps: z
				.array(
					z.object({
						name: z.string(),
						minutes: z.number(),
					}),
				)
				.optional(),
			rizePartial: z.boolean().optional(),
			screenshot: z.string().optional(),
			lang: z.enum(['en', 'pt', 'de']).default('en'),
			translationKey: z.string().optional(),
			targets: z.array(z.string()).optional(),
			wins: z.array(z.string()).optional(),
			losses: z.array(z.string()).optional(),
			lessons: z.array(z.string()).optional(),
			updates: z
				.array(
					z.object({
						at: z.string(),
						note: z.string(),
					}),
				)
				.optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.{md,mdx}' }),
	schema: () =>
		z.object({
			name: z.string(),
			status: z.string(),
			summary: z.string(),
			startedDate: z.coerce.date(),
			order: z.number().optional(),
			tags: z.array(z.string()).default([]),
			links: z
				.array(
					z.object({
						label: z.string(),
						url: z.string(),
					}),
				)
				.default([]),
			changelog: z
				.array(
					z.object({
						date: z.coerce.date(),
						note: z.string(),
					}),
				)
				.default([]),
			draft: z.boolean().default(false),
		}),
});

export const collections = { posts, journal, projects };
