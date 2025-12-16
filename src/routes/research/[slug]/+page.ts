export const prerender = false;

import { calculateReadingTime } from '$lib/utils/readingTime';

export async function load({ params }) {
	const { slug } = params;

	try {
		const doc = await import(`../../../docs/research/${slug}.md`);

		// Load raw content for word count calculation
		let wordCount = 0;
		let readingTime = 0;
		let readingTimeText = '';

		try {
			const rawContent = await import(`../../../docs/research/${slug}.md?raw`);
			const readingStats = calculateReadingTime(rawContent.default);
			wordCount = readingStats.wordCount;
			readingTime = readingStats.readingTime;
			readingTimeText = readingStats.readingTimeText;
		} catch (error) {
			console.error('Could not calculate reading time:', error);
		}

		return {
			component: doc.default,
			metadata: {
				...doc.metadata,
				wordCount,
				readingTime,
				readingTimeText
			}
		};
	} catch (error) {
		console.error(`Could not load research document: ${slug}`, error);
		throw error;
	}
}
