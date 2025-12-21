<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { downloadPdf, downloadWord, downloadMd } from '$lib/utils/download';
	import { page } from '$app/stores';

	let { data } = $props();

	let contentRef: HTMLDivElement;
	let copied = $state(false);
	
	// Mock voting state
	let voteCount = $state(124);
	let userVote = $state(0); // -1: down, 0: none, 1: up

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

	function handleVote(type: 'up' | 'down') {
		if (type === 'up') {
			if (userVote === 1) {
				userVote = 0;
				voteCount--;
			} else {
				if (userVote === -1) voteCount++;
				userVote = 1;
				voteCount++;
			}
		} else {
			if (userVote === -1) {
				userVote = 0;
				voteCount++;
			} else {
				if (userVote === 1) voteCount--;
				userVote = -1;
				voteCount--;
			}
		}
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
		<div class="meta-info">
			{#if data.metadata.date}
				<span class="post-date">Published: {formatDate(data.metadata.date)}</span>
			{/if}
			{#if data.metadata.author}
				<span class="post-author">By {data.metadata.author}</span>
			{/if}
			{#if data.metadata.wordCount && data.metadata.readingTimeText}
				<span class="post-stats">{data.metadata.wordCount.toLocaleString()} words • {data.metadata.readingTimeText}</span>
			{/if}
		</div>
		
		<div class="vote-controls">
			<span class="vote-count">{voteCount}</span>
			<button onclick={() => handleVote('up')} aria-label="Upvote" class:active={userVote === 1} title="Upvote">
				<Icon name="thumbs-up" />
			</button>
			<button onclick={() => handleVote('down')} aria-label="Downvote" class:active={userVote === -1} title="Downvote">
				<Icon name="thumbs-down" />
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
		}
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.meta-info {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.vote-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.vote-count {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
		min-width: 1.5rem;
		text-align: center;
		margin-right: 0.5rem;
	}

	.vote-controls button {
		background: none;
		border: 1px solid transparent;
		cursor: pointer;
		padding: 0.4rem;
		color: var(--color-text-muted);
		font-size: 1.25rem;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		border-radius: 4px;
	}

	.vote-controls button:hover {
		color: var(--color-text);
		background-color: var(--color-hover-bg);
	}

	.vote-controls button.active {
		color: var(--color-text);
		background-color: #d1d5db; /* Grey fill on selection */
	}
	
	/* Dark mode adjustment for active state */
	:global([data-theme='dark']) .vote-controls button.active {
		background-color: #4b5563;
	}

	.post-actions-bottom {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		align-items: center;
		margin-top: 2rem;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.post-actions-bottom button {
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

	.post-actions-bottom button:hover {
		color: var(--color-link);
	}

	.post-date,
	.post-author,
	.post-stats {
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
		/* No border top here, effectively removing one line if previously it had one, or keeping just the one from actions-bottom */
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