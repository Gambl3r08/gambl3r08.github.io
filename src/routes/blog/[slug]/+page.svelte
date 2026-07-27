<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { t, language } from '$lib/i18n';
	import { onMount } from 'svelte';
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

	interface TocItem {
		id: string;
		text: string;
		level: number;
	}

	let tocItems = $state<TocItem[]>([]);
	let activeId = $state('');
	let tocOpen = $state(false);

	onMount(() => {
		const article = document.querySelector('.prose');
		if (!article) return;

		const headings = article.querySelectorAll('h2, h3');
		const items: TocItem[] = [];

		headings.forEach((heading, i) => {
			if (!heading.id) {
				heading.id = `heading-${i}`;
			}
			items.push({
				id: heading.id,
				text: heading.textContent || '',
				level: parseInt(heading.tagName[1])
			});
		});

		tocItems = items;

		if (items.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '-80px 0px -70% 0px' }
		);

		headings.forEach((h) => observer.observe(h));

		return () => observer.disconnect();
	});
</script>

<SEOHead
	title="{data.metadata.title} | {siteData.name}"
	description={data.metadata.description}
	image={data.metadata.image || '/og-image.png'}
	article={true}
/>

<article class="px-4 py-16">
	<div class="mx-auto max-w-3xl lg:max-w-5xl">
		<header class="mb-12 text-center lg:max-w-3xl lg:mx-auto">
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
							class="rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-sm text-accent-strong"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<div class="relative lg:flex lg:gap-8">
			<!-- TOC Sidebar (desktop) -->
			{#if tocItems.length > 2}
				<aside class="hidden lg:block lg:w-56 lg:shrink-0">
					<nav class="sticky top-20" aria-label="Table of contents">
						<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
							{$language === 'es' ? 'Contenido' : 'Contents'}
						</p>
						<ul class="space-y-1 text-sm">
							{#each tocItems as item}
								<li style="padding-left: {(item.level - 2) * 12}px">
									<a
										href="#{item.id}"
										class="block rounded py-1 px-2 transition-colors {activeId === item.id
											? 'text-accent-strong bg-accent/10'
											: 'text-muted hover:text-heading'}"
									>
										{item.text}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</aside>

				<!-- TOC Mobile (collapsible) -->
				<div class="mb-8 lg:hidden">
					<button
						onclick={() => tocOpen = !tocOpen}
						class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-heading"
						style="background: var(--glass-bg); border: 1px solid var(--glass-border)"
					>
						<span>{$language === 'es' ? 'Tabla de contenido' : 'Table of contents'}</span>
						<svg
							class="h-4 w-4 transition-transform {tocOpen ? 'rotate-180' : ''}"
							fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</button>
					{#if tocOpen}
						<nav class="mt-2 rounded-lg px-4 py-3" style="background: var(--glass-bg); border: 1px solid var(--glass-border)">
							<ul class="space-y-1 text-sm">
								{#each tocItems as item}
									<li style="padding-left: {(item.level - 2) * 12}px">
										<a
											href="#{item.id}"
											onclick={() => tocOpen = false}
											class="block rounded py-1 px-2 transition-colors {activeId === item.id
												? 'text-accent-strong bg-accent/10'
												: 'text-muted hover:text-heading'}"
										>
											{item.text}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					{/if}
				</div>
			{/if}

			<!-- Article content -->
			<div class="prose prose-lg mx-auto max-w-none lg:flex-1 lg:min-w-0">
				<data.content />
			</div>
		</div>

		<footer class="mt-12 border-t border-white/[0.06] pt-8 text-center">
			<a href="/blog" class="btn-outline">{$t.blog.backToBlog}</a>
		</footer>
	</div>
</article>
