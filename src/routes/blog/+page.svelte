<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { t, language } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Search and filter state
	let searchQuery = $state('');
	let activeTag = $state('');

	// Filter posts by current language
	let langPosts = $derived(
		data.posts.filter((post) => post.lang === $language)
	);

	// Extract unique tags
	let allTags = $derived(
		[...new Set(langPosts.flatMap((p) => p.tags || []))]
	);

	// Filter by search and tag
	let filteredPosts = $derived(
		langPosts.filter((post) => {
			const matchesTag = !activeTag || (post.tags && post.tags.includes(activeTag));
			const matchesSearch = !searchQuery ||
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesTag && matchesSearch;
		})
	);

	function formatDate(dateString: string): string {
		const locale = $language === 'es' ? 'es-ES' : 'en-US';
		return new Date(dateString).toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEOHead
	title="{$t.blog.title} | {siteData.name}"
	description={$t.blog.description}
/>

<section class="px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.blog.title}</h1>
		</div>

		<div class="reveal" use:reveal={{ delay: 100 }}>
			<p class="mx-auto mb-8 max-w-2xl text-center text-lg text-muted">
				{$t.blog.description}
			</p>
		</div>

		<!-- Search + Tag Filters -->
		{#if langPosts.length > 0}
			<div class="reveal mb-8 space-y-4" use:reveal={{ delay: 150 }}>
				<!-- Search input -->
				<div class="relative mx-auto max-w-md">
					<svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
					</svg>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder={$t.blog.searchPlaceholder}
						class="w-full rounded-lg py-2.5 pl-10 pr-4 text-sm text-body placeholder-muted outline-none transition-colors focus:border-accent/30"
						style="border: 1px solid var(--input-border); background: var(--input-bg)"
					/>
				</div>

				<!-- Tag pills -->
				{#if allTags.length > 0}
					<div class="flex flex-wrap justify-center gap-2">
						<button
							onclick={() => activeTag = ''}
							class="rounded-full border px-3 py-1 text-sm transition-all {!activeTag
								? 'border-accent/30 bg-accent/10 text-accent-light'
								: 'border-muted/20 text-muted hover:border-muted/40 hover:text-heading'}"
						>
							{$t.blog.allTags}
						</button>
						{#each allTags as tag}
							<button
								onclick={() => activeTag = activeTag === tag ? '' : tag}
								class="rounded-full border px-3 py-1 text-sm transition-all {activeTag === tag
									? 'border-accent/30 bg-accent/10 text-accent-light'
									: 'border-muted/20 text-muted hover:border-muted/40 hover:text-heading'}"
							>
								{tag}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		{#if filteredPosts && filteredPosts.length > 0}
			<div class="grid gap-8">
				{#each filteredPosts as post, i}
					<article class="card reveal" use:reveal={{ delay: i * 100 }}>
						<a href="/blog/{post.slug}" class="block group">
							<div class="mb-2 flex items-start gap-3">
								<div class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
									<svg class="h-4 w-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
									</svg>
								</div>
								<h2
									class="text-2xl font-semibold text-heading transition-colors group-hover:text-accent-light"
								>
									{post.title}
								</h2>
							</div>
							<p class="mb-4 text-muted pl-11">{post.description}</p>
							<div
								class="flex flex-wrap items-center gap-4 text-sm text-muted pl-11"
							>
								<span class="flex items-center gap-1.5">
									<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
									</svg>
									<time datetime={post.date}>
										{formatDate(post.date)}
									</time>
								</span>
								{#if post.readingTime}
									<span class="flex items-center gap-1.5">
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
										</svg>
										{post.readingTime} {$t.blog.minRead}
									</span>
								{/if}
								{#if post.tags && post.tags.length > 0}
									<div class="flex gap-2">
										{#each post.tags.slice(0, 3) as tag}
											<span class="flex items-center gap-1 rounded border border-accent/10 bg-accent/5 px-2 py-1 text-accent-light">
												<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
													<path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
												</svg>
												{tag}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</a>
					</article>
				{/each}
			</div>
		{:else if langPosts.length > 0}
			<div class="text-center">
				<p class="text-lg text-muted">{$t.blog.noResults}</p>
			</div>
		{:else}
			<div class="text-center">
				<p class="text-lg text-muted">
					{$t.blog.noPosts}
				</p>
			</div>
		{/if}
	</div>
</section>
