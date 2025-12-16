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
	<title>{data.metadata.title || 'Research Document'}</title>
	{#if data.metadata.blurb}
		<meta name="description" content={data.metadata.blurb} />
	{/if}
</svelte:head>

<article class="research-doc">
	<nav class="doc-nav-top">
		<a href="/research" class="back-link">← Back to research</a>
	</nav>

	{#if data.metadata.title}
		<h1 class="doc-title">{data.metadata.title}</h1>
	{/if}

	<div class="doc-meta">
		{#if data.metadata.date}
			<span class="doc-date">Published: {formatDate(data.metadata.date)}</span>
		{/if}
		{#if data.metadata.author}
			<span class="doc-author">By {data.metadata.author}</span>
		{/if}
		{#if data.metadata.filename}
			<span class="doc-filename">Document: {data.metadata.filename}</span>
		{/if}
		{#if data.metadata.wordCount && data.metadata.readingTimeText}
			<span class="doc-stats">{data.metadata.wordCount.toLocaleString()} words • {data.metadata.readingTimeText}</span>
		{/if}
	</div>

	<div class="doc-content prose">
		{@render data.component()}
	</div>

	<nav class="doc-nav">
		<a href="/research" class="back-link">← Back to research</a>
	</nav>
</article>

<style>
	.research-doc {
		padding: 2rem 0;
		max-width: 1200px;
		margin: 0 auto;
	}

	.doc-nav-top {
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
	}

	.doc-title {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
		line-height: 1.2;
		color: var(--color-text);
	}

	.doc-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.doc-date,
	.doc-author,
	.doc-filename,
	.doc-stats {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.doc-content {
		margin-bottom: 3rem;
		max-width: none;
		font-size: 14px;
	}

	.doc-content :global(p) {
		font-size: 14px;
	}

	.doc-nav {
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

	@media (max-width: 768px) {
		.research-doc {
			max-width: 100%;
		}

		.doc-title {
			font-size: 2rem;
		}

		.doc-meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
