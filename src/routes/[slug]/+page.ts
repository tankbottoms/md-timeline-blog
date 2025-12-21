export const prerender = false;

import { calculateReadingTime } from '$lib/utils/readingTime';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;

	if (slug === 'favicon.ico') {
		error(404, 'Not found');
	}

	try {
		const post = await import(`../../docs/posts/${slug}.md`);

		// Load raw content for word count calculation
		let wordCount = 0;
		let readingTime = 0;
		let readingTimeText = '';

		try {
			const rawContent = await import(`../../docs/posts/${slug}.md?raw`);
			const readingStats = calculateReadingTime(rawContent.default);
			wordCount = readingStats.wordCount;
			readingTime = readingStats.readingTime;
			readingTimeText = readingStats.readingTimeText;
		} catch (error) {
			console.error('Could not calculate reading time:', error);
		}

		return {
			component: post.default,
			metadata: {
				...post.metadata,
				wordCount,
				readingTime,
				readingTimeText
			}
		};
	} catch (error) {
		console.error(`Could not load post: ${slug}`, error);
		throw error;
	}
}
