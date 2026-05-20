import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_URL, SOCIAL_LINKS } from '../consts';

// schema.org JSON-LD builders. Kept in one place so Person identity stays
// consistent across the homepage, about page, and every post.

export function personSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: SITE_AUTHOR,
		alternateName: 'Nico Neumann',
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		sameAs: SOCIAL_LINKS,
	};
}

interface BlogPostingInput {
	title: string;
	description: string;
	url: string;
	datePublished: Date;
	dateModified?: Date;
	image?: string;
	tags?: string[];
}

export function blogPostingSchema(input: BlogPostingInput) {
	const schema: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: input.title,
		description: input.description,
		url: input.url,
		mainEntityOfPage: input.url,
		datePublished: input.datePublished.toISOString(),
		author: { '@type': 'Person', name: SITE_AUTHOR, url: `${SITE_URL}/about/` },
		publisher: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
	};
	if (input.dateModified) schema.dateModified = input.dateModified.toISOString();
	if (input.image) schema.image = input.image;
	if (input.tags && input.tags.length > 0) schema.keywords = input.tags.join(', ');
	return schema;
}
