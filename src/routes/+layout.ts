export const prerender = false;

import { calculateReadingTime } from '$lib/utils/readingTime';

type PostMetadata = {
	title?: string;
	blurb?: string;
	date?: string;
	author?: string;
	headings?: Array<{ level: number; title: string }>;
	wordCount?: number;
	readingTime?: number;
	readingTimeText?: string;
};

type Post = {
	path: string;
	metadata: PostMetadata;
	component: any;
};

export async function load() {
	const posts: Post[] = [];

	try {
		const modules = import.meta.glob('../docs/posts/*.md');
		const rawModules = import.meta.glob('../docs/posts/*.md', { query: '?raw', import: 'default' });

		for (const path in modules) {
			const module: any = await modules[path]();
			const slug = path.replace('../docs/posts/', '').replace('.md', '');

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

			posts.push({
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
		posts.sort((a, b) => {
			const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
			const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
			return dateB - dateA;
		});
	} catch (error) {
		console.error('Error loading blog posts:', error);
	}

	return {
		posts
	};
}
