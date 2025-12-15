<script lang="ts">
	let { data } = $props();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.metadata.title || 'Blog Post'}</title>
	{#if data.metadata.blurb}
		<meta name="description" content={data.metadata.blurb} />
	{/if}
</svelte:head>

<article class="post">
	<nav class="post-nav-top">
		<a href="/" class="back-link">← Back to all posts</a>
	</nav>

	{#if data.metadata.title}
		<h1 class="post-title">{data.metadata.title}</h1>
	{/if}

	<div class="post-meta">
		{#if data.metadata.date}
			<span class="post-date">Published: {formatDate(data.metadata.date)}</span>
		{/if}
	</div>

	<div class="post-content prose">
		{@render data.component()}
	</div>

	<nav class="post-nav">
		<a href="/" class="back-link">← Back to all posts</a>
	</nav>
</article>

<style>
	.post {
		padding: 2rem 0;
		max-width: 1200px;
		margin: 0 auto;
	}

	.post-nav-top {
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
	}

	.post-title {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		line-height: 1.2;
		color: var(--color-text);
	}

	@media (max-width: 768px) {
		.post {
			max-width: 100%;
		}
	}

	.post-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.post-date {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.post-content {
		margin-bottom: 3rem;
		max-width: none;
		font-size: 14px;
	}

	.post-content :global(img),
	.post-content :global(svg) {
		max-width: 100%;
		height: auto;
	}

	.post-content :global(p) {
		margin: 1rem 0;
		font-size: 14px;
	}

	.post-content :global(h2) {
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	.post-content :global(h3) {
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	.post-nav {
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.back-link {
		color: var(--color-link);
		text-decoration: underline;
		text-decoration-skip-ink: auto;
	}

	.back-link:hover {
		text-decoration-thickness: 2px;
	}

	@media (max-width: 640px) {
		.post-title {
			font-size: 2rem;
		}
	}
</style>
