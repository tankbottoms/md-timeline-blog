export const prerender = false;

export async function load({ params }) {
	const { slug } = params;

	try {
		const doc = await import(`../../../docs/research/${slug}.md`);

		return {
			component: doc.default,
			metadata: doc.metadata || {}
		};
	} catch (error) {
		console.error(`Could not load research document: ${slug}`, error);
		throw error;
	}
}
