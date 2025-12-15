export const prerender = false;

type PostMetadata = {
	title?: string;
	blurb?: string;
	date?: string;
	headings?: Array<{ level: number; title: string }>;
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

		for (const path in modules) {
			const module: any = await modules[path]();
			const slug = path.replace('../docs/posts/', '').replace('.md', '');

			posts.push({
				path: slug,
				metadata: module.metadata || {},
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
