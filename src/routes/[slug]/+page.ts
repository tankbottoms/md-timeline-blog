export const prerender = false;

export async function load({ params }) {
	const { slug } = params;

	try {
		const post = await import(`../../docs/posts/${slug}.md`);

		return {
			component: post.default,
			metadata: post.metadata || {}
		};
	} catch (error) {
		console.error(`Could not load post: ${slug}`, error);
		throw error;
	}
}
