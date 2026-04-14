<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let visible = $state(false);
	let enabled = $state(false);

	onMount(() => {
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		const isSmallScreen = window.innerWidth < 768;
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (isTouch || isSmallScreen || prefersReduced) return;

		enabled = true;
		let ticking = false;

		function handleMove(e: MouseEvent) {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				x = e.clientX;
				y = e.clientY;
				visible = true;
				ticking = false;
			});
		}

		function handleLeave() {
			visible = false;
		}

		window.addEventListener('mousemove', handleMove, { passive: true });
		document.addEventListener('mouseleave', handleLeave);

		return () => {
			window.removeEventListener('mousemove', handleMove);
			document.removeEventListener('mouseleave', handleLeave);
		};
	});
</script>

{#if enabled && visible}
	<div
		class="pointer-events-none fixed z-[3] h-[400px] w-[400px] rounded-full transition-opacity duration-300"
		style="
			left: {x - 200}px;
			top: {y - 200}px;
			background: radial-gradient(circle, rgba(var(--accent-rgb), 0.05) 0%, transparent 70%);
			will-change: left, top;
		"
		aria-hidden="true"
	></div>
{/if}
