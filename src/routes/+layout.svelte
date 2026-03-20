<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { language } from '$lib/i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		language.init();
	});
</script>

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

	<Navbar />
	<main class="relative flex-1">
		{#key $page.url.pathname}
			<div in:fly={{ y: 8, duration: 300, delay: 150 }}>
				{@render children()}
			</div>
		{/key}
	</main>
	<Footer />
</div>
