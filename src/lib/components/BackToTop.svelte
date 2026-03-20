<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	function handleScroll() {
		visible = window.scrollY > 400;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if visible}
	<button
		onclick={scrollToTop}
		class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-muted transition-all duration-300 hover:text-accent-light hover:-translate-y-0.5"
		style="background: var(--back-to-top-bg); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--glass-border)"
		aria-label="Back to top"
	>
		<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
		</svg>
	</button>
{/if}

<style>
	button {
		animation: fadeInUp 0.3s ease-out;
		box-shadow: 0 4px 16px var(--back-to-top-shadow);
	}
	button:hover {
		box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.2);
		border-color: rgba(var(--accent-rgb), 0.3) !important;
	}
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
