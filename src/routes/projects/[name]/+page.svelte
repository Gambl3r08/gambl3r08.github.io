<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { languageColors } from '$lib/utils/github';
	import { t, language } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let repo = $derived(data.repo);
	let languageColor = $derived(
		repo.language ? languageColors[repo.language] || '#94a3b8' : null
	);

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString($language === 'es' ? 'es-ES' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEOHead
	title="{repo.name} | {siteData.name}"
	description={repo.description || `${repo.name} — ${siteData.name}`}
/>

<article class="px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<a
			href="/projects"
			class="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-strong"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
			</svg>
			{$t.projects.title}
		</a>

		<header class="reveal mb-10" use:reveal>
			<h1 class="mb-3 font-heading text-3xl font-bold text-heading md:text-4xl">{repo.name}</h1>

			{#if repo.description}
				<p class="mb-5 text-lg text-muted">{repo.description}</p>
			{/if}

			<!-- Repo facts -->
			<div class="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
				{#if repo.language && languageColor}
					<span class="flex items-center gap-2">
						<span class="h-3 w-3 rounded-full" style="background-color: {languageColor}"></span>
						{repo.language}
					</span>
				{/if}
				{#if repo.stargazers_count > 0}
					<span class="flex items-center gap-1.5">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
						</svg>
						{repo.stargazers_count}
					</span>
				{/if}
				{#if repo.forks_count > 0}
					<span>{repo.forks_count} forks</span>
				{/if}
				<span>{$t.projects.lastUpdated} {formatDate(repo.pushed_at)}</span>
			</div>

			{#if repo.topics && repo.topics.length > 0}
				<div class="mb-6 flex flex-wrap gap-2">
					{#each repo.topics as topic}
						<span class="rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-xs text-accent-strong">
							{topic}
						</span>
					{/each}
				</div>
			{/if}

			<div class="flex flex-wrap gap-3">
				<a
					href={repo.html_url}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary inline-flex items-center gap-2"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
					</svg>
					{$t.projects.viewOnGitHub}
				</a>
				{#if repo.homepage}
					<a
						href={repo.homepage}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-outline inline-flex items-center gap-2"
					>
						{$t.projects.liveDemo}
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
						</svg>
					</a>
				{/if}
			</div>
		</header>

		{#if data.readmeHtml}
			<!-- Rendered by GitHub's own markdown pipeline at build time, from the
			     owner's repository. -->
			<div class="card reveal readme prose max-w-none" use:reveal>
				{@html data.readmeHtml}
			</div>
		{:else}
			<div class="card text-center">
				<p class="text-muted">{$t.projects.noReadme}</p>
			</div>
		{/if}
	</div>
</article>

<style>
	/* GitHub's HTML ships its own class names and permalink anchors. Trim the
	   chrome that only makes sense on github.com. */
	.readme :global(.anchor),
	.readme :global(.octicon-link) {
		display: none;
	}

	.readme :global(img) {
		max-width: 100%;
		height: auto;
	}

	.readme :global(table) {
		display: block;
		overflow-x: auto;
		width: 100%;
	}

	/* GitHub wraps headings in a div; keep our own vertical rhythm. */
	.readme :global(.markdown-heading) {
		margin-top: 1.6em;
	}
	.readme :global(.markdown-heading:first-child) {
		margin-top: 0;
	}

	/* GFM alerts (`> [!NOTE]`, `> [!IMPORTANT]`, …) arrive as bare markup. */
	.readme :global(.markdown-alert) {
		margin: 1.25em 0;
		padding: 0.75em 1em;
		border-left: 4px solid rgb(var(--accent-strong-rgb));
		border-radius: 0.375rem;
		background: rgb(var(--accent-rgb) / 0.06);
	}
	.readme :global(.markdown-alert > :first-child) {
		margin-top: 0;
	}
	.readme :global(.markdown-alert > :last-child) {
		margin-bottom: 0;
	}
	.readme :global(.markdown-alert-title) {
		display: flex;
		align-items: center;
		gap: 0.4em;
		font-weight: 600;
		color: rgb(var(--accent-strong-rgb));
	}
	.readme :global(.markdown-alert-title .octicon) {
		width: 1em;
		height: 1em;
		fill: currentColor;
	}
</style>
