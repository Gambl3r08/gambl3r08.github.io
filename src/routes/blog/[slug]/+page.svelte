<script lang="ts">
	import { siteData } from '$lib/data/site';
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

<article class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-3xl">
		<header class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold">{data.metadata.title}</h1>
			<p class="text-secondary mb-4 text-xl">{data.metadata.description}</p>
			<time datetime={data.metadata.date} class="text-gray-500">
				{formatDate(data.metadata.date)}
			</time>
			{#if data.metadata.tags && data.metadata.tags.length > 0}
				<div class="mt-4 flex justify-center gap-2">
					{#each data.metadata.tags as tag}
						<span
							class="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<div
			class="prose prose-lg mx-auto max-w-none prose-headings:text-gray-900 prose-a:text-primary prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-gray-900"
		>
			<data.content />
		</div>

		<footer class="mt-12 border-t pt-8 text-center">
			<a href="/blog" class="btn-outline">← Volver al blog</a>
		</footer>
	</div>
</article>
