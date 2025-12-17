<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - {$page.error?.message || 'Error'}</title>
</svelte:head>

<div class="error-page">
	<div class="error-container">
		<div class="error-code">{$page.status}</div>
		<div class="error-message">
			{#if $page.status === 404}
				<h1>Page Not Found</h1>
				<p>{$page.error?.message || "The page you're looking for doesn't exist."}</p>
			{:else if $page.status === 500}
				<h1>Internal Server Error</h1>
				<p>{$page.error?.message || 'Something went wrong on our end.'}</p>
			{:else}
				<h1>Error {$page.status}</h1>
				<p>{$page.error?.message || 'An unexpected error occurred.'}</p>
			{/if}
		</div>
		<div class="error-actions">
			<a href="/" class="btn-home">← Go Home</a>
			<a href="/research" class="btn-research">View Research</a>
		</div>
	</div>
</div>

<style>
	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		padding: 2rem;
	}

	.error-container {
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	.error-code {
		font-family: var(--font-serif);
		font-size: 6rem;
		font-weight: 700;
		color: var(--color-text-muted);
		line-height: 1;
		margin-bottom: 1rem;
		opacity: 0.3;
	}

	.error-message h1 {
		font-family: var(--font-serif);
		font-size: 2rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0 0 1rem 0;
	}

	.error-message p {
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0 0 2rem 0;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-home,
	.btn-research {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: var(--color-featured-bg);
		border: 1px solid var(--color-featured-border);
		border-radius: 4px;
		color: var(--color-text);
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.btn-home:hover,
	.btn-research:hover {
		background: var(--color-hover-bg);
		box-shadow: 3px 3px 0px var(--color-shadow);
		transform: translateY(-2px);
	}

	.btn-home:active,
	.btn-research:active {
		transform: translateY(0);
		box-shadow: 1px 1px 0px var(--color-shadow);
	}

	@media (max-width: 640px) {
		.error-code {
			font-size: 4rem;
		}

		.error-message h1 {
			font-size: 1.5rem;
		}

		.error-actions {
			flex-direction: column;
			gap: 0.75rem;
		}

		.btn-home,
		.btn-research {
			width: 100%;
		}
	}
</style>
