<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.metadata.title} | {siteData.name}</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<article class="px-4 py-16">
	<div class="mx-auto max-w-3xl">
		<header class="mb-12 text-center">
			<h1 class="mb-4 font-heading text-4xl font-bold text-heading">{data.metadata.title}</h1>
			<p class="mb-4 text-xl text-muted">{data.metadata.description}</p>
			<time datetime={data.metadata.date} class="text-muted">
				{formatDate(data.metadata.date)}
			</time>
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
