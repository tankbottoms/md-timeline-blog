<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let showModal = $state(false);

	onMount(() => {
		if (browser) {
			const consent = localStorage.getItem('cookie-consent');
			if (!consent) {
				showModal = true;
			}
		}
	});

	function acceptCookies() {
		if (browser) {
			localStorage.setItem('cookie-consent', 'accepted');
			showModal = false;
		}
	}
</script>

{#if showModal}
	<div class="modal-backdrop">
		<div class="modal">
			<h2>Cookie Notice</h2>
			<p>
				This website uses cookies to enhance your browsing experience and remember your
				preferences. By continuing to use this site, you consent to our use of cookies.
			</p>
			<button onclick={acceptCookies} class="accept-button">Accept & Continue</button>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 1rem;
	}

	.modal {
		background: var(--color-bg-secondary);
		border: 2px solid var(--color-border-dark);
		border-radius: 8px;
		padding: 2rem;
		max-width: 75vw;
		width: 100%;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
	}

	@media (min-width: 768px) {
		.modal {
			max-width: 600px;
		}
	}

	.modal h2 {
		margin-top: 0;
		margin-bottom: 1rem;
		font-family: var(--font-serif);
		font-size: 1.5rem;
		color: var(--color-text);
	}

	.modal p {
		margin-bottom: 1.5rem;
		line-height: 1.6;
		color: var(--color-text);
	}

	.accept-button {
		width: 100%;
		padding: 0.75rem 1.5rem;
		background: var(--color-text);
		color: var(--color-bg);
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.accept-button:hover {
		opacity: 0.9;
	}
</style>
