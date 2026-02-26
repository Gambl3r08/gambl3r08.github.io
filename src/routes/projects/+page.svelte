<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import RepoCard from '$lib/components/RepoCard.svelte';
	import { reveal } from '$lib/utils/scrollReveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{$t.projects.title} | {siteData.name}</title>
	<meta
		name="description"
		content="{$t.projects.title} - {siteData.name}"
	/>
</svelte:head>

<section class="px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.projects.title}</h1>
		</div>

		<div class="reveal" use:reveal={{ delay: 100 }}>
			<p class="mx-auto mb-12 max-w-2xl text-center text-lg text-muted">
				{$t.projects.description}
			</p>
		</div>

		{#if data.repos && data.repos.length > 0}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.repos as repo, i (repo.id)}
					<div class="reveal" use:reveal={{ delay: i * 80 }}>
						<RepoCard {repo} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center">
				<p class="mb-4 text-muted">
					{$t.projects.noRepos}
				</p>
				<a
					href="https://github.com/{siteData.contact.github}"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary"
				>
					{$t.projects.viewOnGitHub}
				</a>
			</div>
		{/if}

		<div class="reveal mt-12 text-center" use:reveal>
			<a
				href="https://github.com/{siteData.contact.github}?tab=repositories"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-outline"
			>
				{$t.projects.viewAllRepos}
			</a>
		</div>
	</div>
</section>
