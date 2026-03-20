<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import CursorGlow from '$lib/components/CursorGlow.svelte';
	import { language } from '$lib/i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		language.init();
	});

	// View Transitions API
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<!-- Skip to content -->
<a
	href="#main-content"
	class="skip-link"
>
	Skip to content
</a>

<div class="relative flex min-h-screen flex-col bg-base">
	<!-- Ambient glow orbs -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
		<div
			class="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[120px]"
			style="background: radial-gradient(circle, #6366f1, transparent)"
		></div>
		<div
			class="absolute -right-32 top-2/3 h-80 w-80 rounded-full opacity-15 blur-[120px]"
			style="background: radial-gradient(circle, #8b5cf6, transparent)"
		></div>
		<div
			class="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
			style="background: radial-gradient(circle, #818cf8, transparent)"
		></div>
	</div>

	<!-- Noise texture overlay -->
	<div class="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]" aria-hidden="true">
		<svg width="100%" height="100%">
			<filter id="noise">
				<feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
			</filter>
			<rect width="100%" height="100%" filter="url(#noise)" />
		</svg>
	</div>

	<Navbar />
	<main id="main-content" class="relative z-[2] flex-1">
		{@render children()}
	</main>
	<Footer />
	<BackToTop />
	<CursorGlow />
</div>

<style>
	/* View Transitions */
	@keyframes fade-in {
		from { opacity: 0; }
	}
	@keyframes fade-out {
		to { opacity: 0; }
	}
	@keyframes slide-from-right {
		from { transform: translateX(16px); }
	}
	@keyframes slide-to-left {
		to { transform: translateX(-16px); }
	}

	:root::view-transition-old(root) {
		animation: 150ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			200ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}
	:root::view-transition-new(root) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
