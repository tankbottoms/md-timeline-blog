<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { downloadPdf, downloadWord, downloadMd } from '$lib/utils/download';
	import { page } from '$app/stores';
	import { statistics } from '$lib/stores/statistics';
	import { onMount } from 'svelte';

	let { data } = $props();
	let stats = $state($statistics);
	let postSlug = $state('');
	let contentRef: HTMLDivElement;
	let copied = $state(false);

	// Subscribe to statistics changes
	statistics.subscribe((value) => {
		stats = value;
	});

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

	function handleThumbsUp() {
		if (postSlug) {
			statistics.thumbsUp(postSlug);
		}
	}

	function handleThumbsDown() {
		if (postSlug) {
			statistics.thumbsDown(postSlug);
		}
	}

	async function handlePdf() {
		if (contentRef) {
			await downloadPdf(data.metadata.title || 'Blog Post', contentRef.innerHTML);
		}
	}

	async function handleWord() {
		const slug = $page.params.slug;
		await downloadWord(`posts/${slug}.md`);
	}

	async function handleMarkdown() {
		const slug = $page.params.slug;
		await downloadMd(`posts/${slug}.md`);
	}

	function handleShare() {
		navigator.clipboard.writeText(window.location.href);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	// Get current post stats
	let postStats = $derived(() => {
		return stats.posts[postSlug] || { thumbsUp: 0, thumbsDown: 0 };
	});
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
		<div class="post-meta-left">
			{#if data.metadata.date}
				<span class="post-date">Published: {formatDate(data.metadata.date)}</span>
			{/if}
			{#if data.metadata.author}
				<span class="post-author">• By {data.metadata.author}</span>
			{/if}
			{#if data.metadata.wordCount && data.metadata.readingTimeText}
				<span class="post-stats"
					>• {data.metadata.wordCount.toLocaleString()} words • {data.metadata
						.readingTimeText}</span
				>
			{/if}
		</div>
		<div class="post-reactions">
			<span class="thumbs-count">{postStats().thumbsUp}</span>
			<button
				type="button"
				class="reaction-btn"
				class:active={postStats().hasVoted === 'up'}
				onclick={handleThumbsUp}
				aria-label="Thumbs up"
			>
				<i class="fa-solid fa-thumbs-up"></i>
			</button>
			<button
				type="button"
				class="reaction-btn"
				class:active={postStats().hasVoted === 'down'}
				onclick={handleThumbsDown}
				aria-label="Thumbs down"
			>
				<i class="fa-solid fa-thumbs-down"></i>
			</button>
		</div>
	</div>

	<div class="post-content prose" bind:this={contentRef}>
		{@render data.component()}
	</div>

	<div class="post-actions-bottom">
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
			width: 100%;
		}
	}

	@media (max-width: 640px) {
		.post {
			padding: 1rem 0;
		}
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
		flex-wrap: wrap;
	}

	.post-meta-left {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.post-date,
	.post-author,
	.post-stats {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.post-reactions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.thumbs-count {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		font-weight: 600;
		min-width: 2rem;
		text-align: right;
	}

	.reaction-btn {
		background: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-text-muted);
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: all 0.2s;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
	}

	.reaction-btn:hover {
		background: var(--color-hover-bg);
		border-color: var(--color-text);
		color: var(--color-text);
		transform: translateY(-2px);
	}

	.reaction-btn.active {
		background: var(--color-featured-bg);
		border-color: var(--color-featured-border);
		color: var(--color-text);
	}

	.reaction-btn:active {
		transform: translateY(0);
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

	.post-actions-bottom {
		display: flex;
		justify-content: flex-end;
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding-top: 2rem;
	}

	.post-actions-bottom button {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-text-muted);
		font-size: 2rem;
		transition: color 0.2s;
		display: flex;
		align-items: center;
	}

	.post-actions-bottom button:hover {
		color: #3b82f6;
	}

	.post-nav {
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

	@media (max-width: 640px) {
		.post-title {
			font-size: 2rem;
		}
	}
</style>
