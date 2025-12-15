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
	<title>Research Documents</title>
	<meta name="description" content="Collection of research papers and technical documents" />
</svelte:head>

<div class="page-wrapper">
	<div class="intro">
		<p>
			Technical papers and in-depth research articles exploring various topics in computer science,
			distributed systems, and emerging technologies.
		</p>
	</div>

	<div class="timeline-container">
	<div class="timeline">
		{#each data.documents as doc, i}
			<a href="/research/{doc.path}" class="timeline-item" class:featured={i % 3 === 0}>
				<div class="timeline-content">
					<div class="timeline-header">
						<div class="timeline-dot"></div>
						<div class="timeline-title">{doc.metadata.title || 'Untitled'}</div>
						<div class="timeline-date">{doc.metadata.date ? formatDate(doc.metadata.date) : ''}</div>
					</div>
					{#if doc.metadata.blurb}
						<p class="timeline-blurb">{doc.metadata.blurb}</p>
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
