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

{#if enabled}
	<!-- Positioned with a compositor-only transform. Animating left/top instead
	     forced a layout + paint on every mousemove frame. -->
	<div
		class="pointer-events-none fixed left-0 top-0 z-[3] h-[400px] w-[400px] rounded-full transition-opacity duration-300"
		style="
			transform: translate3d({x - 200}px, {y - 200}px, 0);
			opacity: {visible ? 1 : 0};
			background: radial-gradient(circle, rgb(var(--accent-rgb) / 0.05) 0%, transparent 70%);
			will-change: transform;
		"
		aria-hidden="true"
	></div>
{/if}
