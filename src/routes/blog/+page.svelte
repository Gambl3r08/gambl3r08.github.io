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
	<title>{$t.blog.title} | {siteData.name}</title>
	<meta
		name="description"
		content="{$t.blog.description}"
	/>
</svelte:head>

<section class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<h1 class="section-title">{$t.blog.title}</h1>

		<p class="text-secondary mx-auto mb-12 max-w-2xl text-center text-lg">
			{$t.blog.description}
		</p>

		{#if data.posts && data.posts.length > 0}
			<div class="grid gap-8">
				{#each data.posts as post}
					<article class="card">
						<a href="/blog/{post.slug}" class="block">
							<h2
								class="mb-2 text-2xl font-semibold text-primary hover:text-primary-600"
							>
								{post.title}
							</h2>
							<p class="text-secondary mb-4">{post.description}</p>
							<div
								class="flex flex-wrap items-center gap-4 text-sm text-gray-500"
							>
								<time datetime={post.date}>
									{formatDate(post.date)}
								</time>
								{#if post.tags && post.tags.length > 0}
									<div class="flex gap-2">
										{#each post.tags.slice(0, 3) as tag}
											<span class="rounded bg-gray-100 px-2 py-1">{tag}</span>
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
				<p class="text-secondary text-lg">
					{$t.blog.noPosts}
				</p>
			</div>
		{/if}
	</div>
</section>
