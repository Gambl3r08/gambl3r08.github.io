<script lang="ts">
	import type { GitHubRepo } from '$lib/types';
	import { languageColors } from '$lib/utils/github';
	import { t } from '$lib/i18n';

	interface Props {
		repo: GitHubRepo;
	}

	let { repo }: Props = $props();

	const languageColor = $derived(
		repo.language ? languageColors[repo.language] || '#94a3b8' : null
	);
</script>

<!-- Links to the internal case-study page rather than straight out to GitHub.
     The card is a single link, so the "open on GitHub" action lives on the
     detail page instead of nesting a second anchor inside this one. -->
<a href="/projects/{repo.name}" class="card group relative block h-full overflow-hidden">
	<!-- Language color accent bar -->
	{#if languageColor}
		<div
			class="absolute inset-x-0 top-0 h-0.5 opacity-60 transition-opacity group-hover:opacity-100"
			style="background-color: {languageColor}"
		></div>
	{/if}

	<div class="mb-3 flex items-start justify-between gap-2">
		<div class="flex items-center gap-2 min-w-0">
			<!-- Repo icon -->
			<svg class="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
			</svg>
			<h3 class="truncate text-lg font-semibold text-heading transition-colors group-hover:text-accent-strong">{repo.name}</h3>
		</div>
		<div class="flex items-center gap-3 text-sm text-muted shrink-0">
			{#if repo.stargazers_count > 0}
				<span class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
					</svg>
					{repo.stargazers_count}
				</span>
			{/if}
			{#if repo.forks_count > 0}
				<span class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
					</svg>
					{repo.forks_count}
				</span>
			{/if}
		</div>
	</div>

	<p class="mb-4 line-clamp-2 text-sm text-muted">
		{repo.description || $t.projects.noDescription}
	</p>

	<div class="flex items-center justify-between">
		{#if repo.language && languageColor}
			<span class="flex items-center gap-2 text-sm text-body">
				<span
					class="h-3 w-3 rounded-full"
					style="background-color: {languageColor}; box-shadow: 0 0 6px {languageColor}"
				></span>
				{repo.language}
			</span>
		{:else}
			<span></span>
		{/if}

		{#if repo.topics && repo.topics.length > 0}
			<div class="flex gap-1">
				{#each repo.topics.slice(0, 2) as topic}
					<span class="rounded border border-accent/10 bg-accent/5 px-2 py-0.5 text-xs text-accent-strong">
						{topic}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Navigation affordance -->
	<svg class="absolute top-5 right-5 h-4 w-4 text-muted/0 transition-all group-hover:text-muted" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
	</svg>
</a>
