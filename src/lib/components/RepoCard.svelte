<script lang="ts">
	import type { GitHubRepo } from '$lib/types';
	import { languageColors } from '$lib/utils/github';

	interface Props {
		repo: GitHubRepo;
	}

	let { repo }: Props = $props();

	const languageColor = $derived(
		repo.language ? languageColors[repo.language] || '#94a3b8' : null
	);
</script>

<a
	href={repo.html_url}
	target="_blank"
	rel="noopener noreferrer"
	class="card group relative block overflow-hidden"
>
	<!-- Language color accent bar -->
	{#if languageColor}
		<div
			class="absolute inset-x-0 top-0 h-0.5 opacity-60 transition-opacity group-hover:opacity-100"
			style="background-color: {languageColor}"
		></div>
	{/if}

	<div class="mb-3 flex items-start justify-between">
		<h3 class="truncate text-lg font-semibold text-heading transition-colors group-hover:text-accent-light">{repo.name}</h3>
		<div class="flex items-center gap-3 text-sm text-muted">
			{#if repo.stargazers_count > 0}
				<span class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						/>
					</svg>
					{repo.stargazers_count}
				</span>
			{/if}
			{#if repo.forks_count > 0}
				<span class="flex items-center gap-1">
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
					{repo.forks_count}
				</span>
			{/if}
		</div>
	</div>

	<p class="mb-4 line-clamp-2 text-sm text-muted">
		{repo.description || 'Sin descripcion'}
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
					<span class="rounded border border-accent/10 bg-accent/5 px-2 py-0.5 text-xs text-accent-light">
						{topic}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</a>
