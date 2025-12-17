<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	let { children, data } = $props();

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
				<div class="footer-left">
					<p class="footer-title">My Research Blog</p>
				</div>
				<div class="footer-right">
					<p class="footer-text">Built with SvelteKit and MDsveX</p>
				</div>
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
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}

	.footer-left {
		flex-shrink: 0;
	}

	.footer-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.footer-title {
		font-family: var(--font-serif);
		font-size: 1.125rem;
		margin: 0;
		color: var(--color-text);
	}

	.footer-text {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin: 0;
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

		.footer-content {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
