import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

// Injects a `minutesRead` number into each post's frontmatter at build time.
// Stored as a number so the layout can format it per locale (the `reading-time`
// package only emits an English "x min read" string).
export function remarkReadingTime() {
	return function (tree, { data }) {
		const minutes = getReadingTime(toString(tree)).minutes;
		data.astro.frontmatter.minutesRead = Math.max(1, Math.ceil(minutes));
	};
}
