<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let visible = $state(false);
	let isTouch = $state(false);

	onMount(() => {
		// Disable on touch devices
		isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (isTouch) return;

		function handleMove(e: MouseEvent) {
			x = e.clientX;
			y = e.clientY;
			visible = true;
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

{#if !isTouch && visible}
	<div
		class="pointer-events-none fixed z-[3] h-[400px] w-[400px] rounded-full transition-opacity duration-300"
		style="
			left: {x - 200}px;
			top: {y - 200}px;
			background: radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
		"
		aria-hidden="true"
	></div>
{/if}
