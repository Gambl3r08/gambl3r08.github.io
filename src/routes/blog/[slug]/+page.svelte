<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { t, language } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		const locale = $language === 'es' ? 'es-ES' : 'en-US';
		return new Date(dateString).toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Estimate reading time from content
	let readingTime = $derived(() => {
		const text = data.metadata.description || '';
		const words = text.trim().split(/\s+/).length;
		return Math.max(1, Math.ceil(words / 200));
	});
</script>

<SEOHead
	title="{data.metadata.title} | {siteData.name}"
	description={data.metadata.description}
	image={data.metadata.image || '/og-image.png'}
	article={true}
/>

<article class="px-4 py-16">
	<div class="mx-auto max-w-3xl">
		<header class="mb-12 text-center">
			<h1 class="mb-4 font-heading text-4xl font-bold text-heading">{data.metadata.title}</h1>
			<p class="mb-4 text-xl text-muted">{data.metadata.description}</p>
			<div class="flex items-center justify-center gap-4 text-muted">
				<time datetime={data.metadata.date}>
					{formatDate(data.metadata.date)}
				</time>
				{#if data.metadata.readingTime}
					<span class="flex items-center gap-1.5">
						<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
						{data.metadata.readingTime} {$t.blog.minRead}
					</span>
				{/if}
			</div>
			{#if data.metadata.tags && data.metadata.tags.length > 0}
				<div class="mt-4 flex justify-center gap-2">
					{#each data.metadata.tags as tag}
						<span
							class="rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-sm text-accent-light"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<div class="prose prose-lg mx-auto max-w-none">
			<data.content />
		</div>

		<footer class="mt-12 border-t border-white/[0.06] pt-8 text-center">
			<a href="/blog" class="btn-outline">{$t.blog.backToBlog}</a>
		</footer>
	</div>
</article>
