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
		class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent-light hover:-translate-y-0.5"
		style="background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px)"
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
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}
	button:hover {
		box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
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
