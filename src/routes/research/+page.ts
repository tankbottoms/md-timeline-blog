export const prerender = false;

type DocumentMetadata = {
	title?: string;
	filename?: string;
	blurb?: string;
	date?: string;
	contents?: string;
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

		for (const path in modules) {
			const module: any = await modules[path]();
			const slug = path.replace('../../docs/research/', '').replace('.md', '');

			documents.push({
				path: slug,
				metadata: module.metadata || {},
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
