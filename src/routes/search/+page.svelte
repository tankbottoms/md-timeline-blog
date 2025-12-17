<script lang="ts">
	import { searchHistory } from '$lib/stores/searchHistory';

	let { data } = $props();
	let searchTerm = $state('');
	let history = $state($searchHistory);

	// Subscribe to search history changes
	searchHistory.subscribe((value) => {
		history = value;
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Filter content based on search term
	let filteredContent = $derived(() => {
		const term = searchTerm.trim().toLowerCase();
		if (!term) return [];

		return data.allContent.filter((item) => {
			const title = item.metadata.title?.toLowerCase() || '';
			const blurb = item.metadata.blurb?.toLowerCase() || '';
			const author = item.metadata.author?.toLowerCase() || '';

			return title.includes(term) || blurb.includes(term) || author.includes(term);
		});
	});

	// Handle search term change - only on Enter key press
	function handleSearch() {
		const term = searchTerm.trim();
		if (term && filteredContent().length > 0) {
			searchHistory.addSearch(term);
		}
	}

	// Handle keyboard events
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
</script>

<svelte:head>
	<title>Search - My Research Blog</title>
	<meta name="description" content="Search blog posts and research documents" />
</svelte:head>

<div class="page-wrapper">
	<div class="search-container">
		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Search..."
			class="search-input"
			autofocus
			onkeydown={handleKeydown}
		/>
	</div>

	<div class="search-info">
		{#if searchTerm}
			<p class="match-count">
				{filteredContent().length}
				{filteredContent().length === 1 ? 'match' : 'matches'} found
			</p>
		{/if}
		{#if history.length > 0}
			<p class="previous-searches">
				Previous searches: {history.join(', ')}
			</p>
		{/if}
	</div>

	{#if searchTerm && filteredContent().length > 0}
		<div class="timeline-container">
			<div class="timeline">
				{#each filteredContent() as item, i}
					<a href={item.path} class="timeline-item" class:featured={i % 3 === 0}>
						<div class="timeline-content">
							<div class="timeline-header">
								<div class="timeline-dot"></div>
								<div class="timeline-title">
									{item.metadata.title || 'Untitled'}
									{#if item.type === 'research'}
										<span class="content-type">[Research]</span>
									{/if}
								</div>
								<div class="timeline-date">
									{item.metadata.date ? formatDate(item.metadata.date) : ''}
								</div>
							</div>
							{#if item.metadata.blurb}
								<p class="timeline-blurb">
									{item.metadata.blurb}
									{#if item.metadata.wordCount && item.metadata.readingTimeText}
										<span class="reading-stats">
											• {item.metadata.wordCount.toLocaleString()} words • {item.metadata
												.readingTimeText}
										</span>
									{/if}
								</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</div>
	{:else if searchTerm}
		<div class="no-results">
			<p>No matches found for "{searchTerm}"</p>
		</div>
	{/if}
</div>

<style>
	.page-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}

	.search-container {
		margin-bottom: 2rem;
		padding: 1rem 0;
	}

	.search-input {
		width: 100%;
		font-size: 1rem;
		font-family: var(--font-mono);
		color: var(--color-text);
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--color-text);
		padding: 0.5rem 0;
		outline: none;
		transition: border-color 0.2s;
	}

	.search-input::placeholder {
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	.search-input:focus {
		border-bottom-color: var(--color-text);
		border-bottom-width: 2px;
	}

	.search-info {
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.match-count {
		margin: 0 0 0.5rem 0;
	}

	.previous-searches {
		margin: 0;
		font-style: italic;
	}

	.no-results {
		text-align: center;
		padding: 2rem;
		color: var(--color-text-muted);
	}

	.no-results p {
		margin: 0;
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

	.content-type {
		font-weight: 400;
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-left: 0.5rem;
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
