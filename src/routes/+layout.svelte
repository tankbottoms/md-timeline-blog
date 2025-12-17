<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import { statistics } from '$lib/stores/statistics';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	let { children, data } = $props();
	let stats = $state($statistics);

	// Subscribe to statistics changes
	statistics.subscribe((value) => {
		stats = value;
	});

	// Inject Vercel Analytics
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.2/dist/svg.min.js"></script>
	<link rel="stylesheet" href="/fontawesome/css/all.min.css" />
</svelte:head>

<div class="container">
	<header class="header-wrapper">
		<div class="header">
			<a class="title" href="/">My Research Blog</a>
			<nav class="nav">
				<a href="/">Home</a>
				<a href="/research">Research</a>
				<a href="/team">Team</a>
				<a href="/about">About</a>
				<a href="/search" class="search-icon" aria-label="Search">
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
				</a>
				<ThemeToggle />
			</nav>
		</div>
	</header>

	<main class="content">
		{@render children()}
	</main>

	<footer class="footer-wrapper">
		<div class="footer">
			<div class="footer-content">
				<span class="footer-title">My Research Blog</span>
				<span class="footer-separator">•</span>
				<span class="footer-views">
					<i class="fa-solid fa-eye"></i>
					{stats.totalViews.toLocaleString()} views
				</span>
				<span class="footer-separator">•</span>
				<span class="footer-text">Built with SvelteKit and MDsveX</span>
			</div>
		</div>
	</footer>
</div>

<CookieConsent />

<style>
	.container {
		min-height: 100vh;
		padding: 3rem 0.5in 1rem 0.5in;
		background-color: var(--color-bg);
	}

	.header-wrapper,
	.footer-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;
		padding-bottom: 1rem;
	}

	@media (min-width: 768px) {
		.header {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.title {
		font-size: 1.875rem;
		font-family: var(--font-serif);
		color: var(--color-text);
		text-decoration: none;
	}

	.title:hover {
		text-decoration: none;
		opacity: 0.8;
	}

	.nav {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.nav a {
		text-decoration: underline;
		text-underline-offset: 8px;
		color: var(--color-text);
	}

	.nav a:hover {
		text-decoration-thickness: 2px;
	}

	.search-icon {
		display: flex;
		align-items: center;
		text-decoration: none !important;
		padding: 0.25rem;
		transition: opacity 0.2s;
	}

	.search-icon:hover {
		opacity: 0.7;
	}

	.search-icon svg {
		stroke: var(--color-text);
	}

	.content {
		min-height: 60vh;
	}

	.footer {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border-dark);
	}

	.footer-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.footer-title {
		font-family: var(--font-serif);
		font-size: 1.125rem;
		color: var(--color-text);
	}

	.footer-separator {
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	.footer-views {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.footer-views i {
		font-size: 0.875rem;
	}

	.footer-text {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.header {
			margin-bottom: 1.5rem;
		}

		.nav {
			flex-wrap: wrap;
		}
	}
</style>
