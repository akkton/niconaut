import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// English feed only. Localized variants live under /pt and /de.
	const posts = await getCollection('posts', ({ data }) => !data.draft && data.lang === 'en');
	const journal = await getCollection('journal', ({ data }) => !data.draft && data.lang === 'en');

	const postItems = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: `/posts/${post.id}/`,
	}));

	const journalItems = journal.map((entry) => ({
		title: `Journal · ${entry.data.date.toISOString().slice(0, 10)}`,
		description: entry.data.summary,
		pubDate: entry.data.date,
		link: `/journal/${entry.id}/`,
	}));

	const items = [...postItems, ...journalItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
