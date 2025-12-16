export const prerender = false;

import { calculateReadingTime } from '$lib/utils/readingTime';

type ContentMetadata = {
	title?: string;
	blurb?: string;
	date?: string;
	author?: string;
	wordCount?: number;
	readingTime?: number;
	readingTimeText?: string;
};

type ContentItem = {
	path: string;
	type: 'post' | 'research';
	metadata: ContentMetadata;
	component: any;
};

export async function load() {
	const allContent: ContentItem[] = [];

	try {
		// Load blog posts
		const postModules = import.meta.glob('../../docs/posts/*.md');
		const rawPostModules = import.meta.glob('../../docs/posts/*.md', {
			query: '?raw',
			import: 'default'
		});

		for (const path in postModules) {
			const module: any = await postModules[path]();
			const slug = path.replace('../../docs/posts/', '').replace('.md', '');

			// Get raw content for word count calculation
			let wordCount = 0;
			let readingTime = 0;
			let readingTimeText = '';

			if (rawPostModules[path]) {
				const rawContent: any = await rawPostModules[path]();
				const readingStats = calculateReadingTime(rawContent as string);
				wordCount = readingStats.wordCount;
				readingTime = readingStats.readingTime;
				readingTimeText = readingStats.readingTimeText;
			}

			allContent.push({
				path: `/${slug}`,
				type: 'post',
				metadata: {
					...module.metadata,
					wordCount,
					readingTime,
					readingTimeText
				},
				component: module.default
			});
		}

		// Load research documents
		const researchModules = import.meta.glob('../../docs/research/*.md');
		const rawResearchModules = import.meta.glob('../../docs/research/*.md', {
			query: '?raw',
			import: 'default'
		});

		for (const path in researchModules) {
			const module: any = await researchModules[path]();
			const slug = path.replace('../../docs/research/', '').replace('.md', '');

			// Get raw content for word count calculation
			let wordCount = 0;
			let readingTime = 0;
			let readingTimeText = '';

			if (rawResearchModules[path]) {
				const rawContent: any = await rawResearchModules[path]();
				const readingStats = calculateReadingTime(rawContent as string);
				wordCount = readingStats.wordCount;
				readingTime = readingStats.readingTime;
				readingTimeText = readingStats.readingTimeText;
			}

			allContent.push({
				path: `/research/${slug}`,
				type: 'research',
				metadata: {
					...module.metadata,
					wordCount,
					readingTime,
					readingTimeText
				},
				component: module.default
			});
		}

		// Sort by date descending
		allContent.sort((a, b) => {
			const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
			const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
			return dateB - dateA;
		});
	} catch (error) {
		console.error('Error loading content for search:', error);
	}

	return {
		allContent
	};
}
