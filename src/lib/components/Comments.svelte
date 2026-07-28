<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { theme } from '$lib/stores/theme';
	import { t, language } from '$lib/i18n';
	import { onMount } from 'svelte';

	/**
	 * Comments backed by GitHub Discussions via giscus.
	 *
	 * Renders nothing until the four PUBLIC_GISCUS_* variables are set, so the
	 * blog works unchanged before Discussions is turned on. See README for the
	 * one-time setup.
	 */
	const repo = env.PUBLIC_GISCUS_REPO;
	const repoId = env.PUBLIC_GISCUS_REPO_ID;
	const category = env.PUBLIC_GISCUS_CATEGORY;
	const categoryId = env.PUBLIC_GISCUS_CATEGORY_ID;

	const isConfigured = !!(repo && repoId && category && categoryId);

	let container = $state<HTMLDivElement | null>(null);

	// giscus themes are served by name; these two track the site's own palette
	// closely enough without shipping a custom theme file.
	const giscusTheme = $derived($theme === 'dark' ? 'transparent_dark' : 'light');

	onMount(() => {
		if (!isConfigured || !container) return;

		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.async = true;
		script.crossOrigin = 'anonymous';
		Object.entries({
			'data-repo': repo,
			'data-repo-id': repoId,
			'data-category': category,
			'data-category-id': categoryId,
			// One discussion per post, keyed by pathname.
			'data-mapping': 'pathname',
			'data-strict': '1',
			'data-reactions-enabled': '1',
			'data-emit-metadata': '0',
			'data-input-position': 'top',
			'data-theme': giscusTheme,
			'data-lang': $language,
			'data-loading': 'lazy'
		}).forEach(([k, v]) => script.setAttribute(k, v as string));

		container.appendChild(script);
	});

	// Keep the embedded iframe in sync when the visitor flips theme or language.
	// The script tag's data-* attributes are only read once, at load.
	$effect(() => {
		if (!isConfigured) return;
		const setConfig = { theme: giscusTheme, lang: $language };
		const frame = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
		frame?.contentWindow?.postMessage({ giscus: { setConfig } }, 'https://giscus.app');
	});
</script>

{#if isConfigured}
	<section class="mt-16 pt-10" style="border-top: 1px solid var(--glass-border)">
		<h2 class="mb-6 font-heading text-2xl font-semibold text-heading">{$t.blog.comments}</h2>
		<div bind:this={container}></div>
	</section>
{/if}
