<script lang="ts">
	import { statistics } from '$lib/stores/statistics';
	import { onMount } from 'svelte';

	let { data } = $props();
	let stats = $state($statistics);

	// Subscribe to statistics changes
	statistics.subscribe((value) => {
		stats = value;
	});

	// Increment view count when page loads
	onMount(() => {
		statistics.incrementViews();
	});

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
	<title>My Research Blog</title>
	<meta name="description" content="A collection of research and technical blog posts" />
</svelte:head>

<div class="page-wrapper">
	<div class="intro">
		<p>
			Welcome to my research blog. This is a template for creating simple, timeline-based
			blog posts in markdown with rich media support including SVG charts, diagrams, audio, video, and a handful of layout options.
		</p>
	</div>

	<div class="section-header">
		<h2 class="section-title">Blog</h2>
		<div class="view-counter">
			<i class="fa-solid fa-eye"></i>
			<span class="view-count">{stats.totalViews.toLocaleString()} views</span>
		</div>
	</div>

	<div class="timeline-container">
	<div class="timeline">
		{#each data.posts as post, i}
			<a href="/{post.path}" class="timeline-item" class:featured={i % 3 === 0}>
				<div class="timeline-content">
					<div class="timeline-header">
						<div class="timeline-dot"></div>
						<div class="timeline-title">{post.metadata.title || 'Untitled'}</div>
						<div class="timeline-date">{post.metadata.date ? formatDate(post.metadata.date) : ''}</div>
					</div>
					{#if post.metadata.blurb}
						<p class="timeline-blurb">
							{post.metadata.blurb}
							{#if post.metadata.wordCount && post.metadata.readingTimeText}
								<span class="reading-stats"> • {post.metadata.wordCount.toLocaleString()} words • {post.metadata.readingTimeText}</span>
							{/if}
						</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
</div>

<style>
	.page-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}

	.intro {
		margin-bottom: 2rem;
		padding: 1rem 0;
	}

	.intro p {
		margin: 0;
		line-height: 1.6;
		color: var(--color-text);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.section-title {
		font-family: var(--font-serif);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		color: var(--color-text);
	}

	.view-counter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.view-counter i {
		font-size: 1rem;
	}

	.view-count {
		font-weight: 500;
	}

	.timeline-container {
		padding-left: 0.5rem;
		padding-right: 1rem;
		padding-bottom: 1rem;
	}

	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-left: 1px solid var(--color-timeline);
		padding: 1rem 0;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: -1px;
		top: 0;
		width: 1px;
		height: 1.5rem;
		background: linear-gradient(to top, var(--color-timeline), transparent);
	}

	.timeline::after {
		content: '';
		position: absolute;
		left: -1px;
		bottom: 0;
		width: 1px;
		height: 1.5rem;
		background: linear-gradient(to bottom, var(--color-timeline), transparent);
	}

	.timeline-item {
		display: block;
		text-decoration: none;
		color: inherit;
		margin-left: 1.5rem;
		padding: 0.75rem 0.75rem;
		transition: all 0.2s;
		cursor: pointer;
		isolation: isolate;
	}

	.timeline-item:hover {
		background-color: var(--color-hover-bg);
	}

	.timeline-item.featured {
		background: var(--color-featured-bg);
		border: 1px solid var(--color-featured-border);
		box-shadow: 3px 3px 0px var(--color-shadow);
		padding: 0.75rem;
	}

	.timeline-item.featured:hover {
		box-shadow: 5px 5px 0px var(--color-shadow);
		background: var(--color-featured-bg);
	}

	.timeline-content {
		position: relative;
	}

	.timeline-header {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		justify-content: space-between;
		position: relative;
		flex-wrap: wrap;
	}

	.timeline-dot {
		position: absolute;
		left: calc(-1.5rem - 0.75rem - 4px);
		top: 4px;
		width: 7px;
		height: 7px;
		background-color: var(--color-border-dark);
		border-radius: 1px;
		outline: 2px solid var(--color-bg);
	}

	.timeline-title {
		font-weight: 600;
		font-size: 0.875rem;
		flex: 1;
		min-width: 0;
		color: var(--color-text);
	}

	.timeline-date {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		white-space: nowrap;
		margin-left: auto;
	}

	.timeline-blurb {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin: 0.5rem 0 0 0;
		line-height: 1.5;
	}

	.reading-stats {
		color: var(--color-text-muted);
		opacity: 0.8;
		font-size: 0.7rem;
	}

	@media (max-width: 640px) {
		.timeline-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.timeline-date {
			margin-left: 0;
		}
	}
</style>
