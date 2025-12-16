export const prerender = false;

import { calculateReadingTime } from '$lib/utils/readingTime';

type DocumentMetadata = {
	title?: string;
	filename?: string;
	blurb?: string;
	date?: string;
	author?: string;
	contents?: string;
	wordCount?: number;
	readingTime?: number;
	readingTimeText?: string;
};

type Document = {
	path: string;
	metadata: DocumentMetadata;
	component: any;
};

export async function load() {
	const documents: Document[] = [];

	try {
		const modules = import.meta.glob('../../docs/research/*.md');
		const rawModules = import.meta.glob('../../docs/research/*.md', { query: '?raw', import: 'default' });

		for (const path in modules) {
			const module: any = await modules[path]();
			const slug = path.replace('../../docs/research/', '').replace('.md', '');

			// Get raw content for word count calculation
			let wordCount = 0;
			let readingTime = 0;
			let readingTimeText = '';

			if (rawModules[path]) {
				const rawContent: any = await rawModules[path]();
				const readingStats = calculateReadingTime(rawContent as string);
				wordCount = readingStats.wordCount;
				readingTime = readingStats.readingTime;
				readingTimeText = readingStats.readingTimeText;
			}

			documents.push({
				path: slug,
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
		documents.sort((a, b) => {
			const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
			const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
			return dateB - dateA;
		});
	} catch (error) {
		console.error('Error loading research documents:', error);
	}

	return {
		documents
	};
}
