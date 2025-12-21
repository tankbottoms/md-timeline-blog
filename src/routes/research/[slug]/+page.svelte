<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { downloadPdf, downloadWord, downloadMd } from '$lib/utils/download';
	import { page } from '$app/stores';

	let { data } = $props();
	let postSlug = $state('');
	let contentRef: HTMLDivElement;
	let copied = $state(false);

	// Extract slug from URL
	onMount(() => {
		const path = window.location.pathname;
		postSlug = path.split('/').filter(Boolean).pop() || '';
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	async function handlePdf() {
		if (contentRef) {
			await downloadPdf(data.metadata.title || 'Research Document', contentRef.innerHTML);
		}
	}

	async function handleWord() {
		const slug = postSlug || $page.params.slug; 
		// Assumes research posts are in docs/research/
		await downloadWord(`research/${slug}.md`);
	}

	async function handleMarkdown() {
		const slug = postSlug || $page.params.slug;
		// Assumes research posts are in docs/research/
		await downloadMd(`research/${slug}.md`);
	}

	function handleShare() {
		navigator.clipboard.writeText(window.location.href);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
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
			<span class="separator">•</span>
		{/if}
		{#if data.metadata.author}
			<span class="doc-author">By {data.metadata.author}</span>
			<span class="separator">•</span>
		{/if}
		{#if data.metadata.filename}
			<span class="doc-filename">Document: {data.metadata.filename}</span>
			<span class="separator">•</span>
		{/if}
		{#if data.metadata.wordCount && data.metadata.readingTimeText}
			<span class="doc-stats">{data.metadata.wordCount.toLocaleString()} words</span>
			<span class="separator">•</span>
			<span class="doc-stats">{data.metadata.readingTimeText}</span>
		{/if}
	</div>

	<div class="doc-content prose" bind:this={contentRef}>
		{@render data.component()}
	</div>

	<div class="doc-actions-bottom">
		<button onclick={handleShare} aria-label="Share URL" title={copied ? "Copied!" : "Share URL"}>
			<Icon name="share" class={copied ? "text-green-600" : ""} />
		</button>
		<button onclick={handlePdf} aria-label="Download PDF" title="Download PDF">
			<Icon name="file-pdf-thin" />
		</button>
		<button onclick={handleWord} aria-label="Download Word" title="Download Word">
			<Icon name="file-word-light" />
		</button>
		<button onclick={handleMarkdown} aria-label="Download Markdown" title="Download Markdown">
			<Icon name="markdown" />
		</button>
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
		gap: 0.5rem;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.separator {
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	.doc-date,
	.doc-author,
	.doc-filename,
	.doc-stats {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.doc-actions-bottom {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		align-items: center;
		margin-top: 2rem;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.doc-actions-bottom button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-text-muted);
		font-size: 1.25rem;
		transition: color 0.2s;
		display: flex;
		align-items: center;
	}

	.doc-actions-bottom button:hover {
		color: var(--color-link);
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
		border-top: none;
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
