<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
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
	<title>{$t.blog.title} | {siteData.name}</title>
	<meta
		name="description"
		content="{$t.blog.description}"
	/>
</svelte:head>

<section class="px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.blog.title}</h1>
		</div>

		<div class="reveal" use:reveal={{ delay: 100 }}>
			<p class="mx-auto mb-12 max-w-2xl text-center text-lg text-muted">
				{$t.blog.description}
			</p>
		</div>

		{#if data.posts && data.posts.length > 0}
			<div class="grid gap-8">
				{#each data.posts as post, i}
					<article class="card reveal" use:reveal={{ delay: i * 100 }}>
						<a href="/blog/{post.slug}" class="block group">
							<h2
								class="mb-2 text-2xl font-semibold text-heading transition-colors group-hover:text-accent-light"
							>
								{post.title}
							</h2>
							<p class="mb-4 text-muted">{post.description}</p>
							<div
								class="flex flex-wrap items-center gap-4 text-sm text-muted"
							>
								<time datetime={post.date}>
									{formatDate(post.date)}
								</time>
								{#if post.tags && post.tags.length > 0}
									<div class="flex gap-2">
										{#each post.tags.slice(0, 3) as tag}
											<span class="rounded border border-accent/10 bg-accent/5 px-2 py-1 text-accent-light">{tag}</span>
										{/each}
									</div>
								{/if}
							</div>
						</a>
					</article>
				{/each}
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
