<script lang="ts">
	import { siteData } from '$lib/data/site';
	import RepoCard from '$lib/components/RepoCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Proyectos | {siteData.name}</title>
	<meta
		name="description"
		content="Proyectos y repositorios de {siteData.name}"
	/>
</svelte:head>

<section class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<h1 class="section-title">Proyectos</h1>

		<p class="text-secondary mx-auto mb-12 max-w-2xl text-center text-lg">
			Estos son algunos de mis proyectos más recientes en GitHub. Cada uno
			representa un desafío único y una oportunidad de aprendizaje.
		</p>

		{#if data.repos && data.repos.length > 0}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.repos as repo (repo.id)}
					<RepoCard {repo} />
				{/each}
			</div>
		{:else}
			<div class="text-center">
				<p class="text-secondary mb-4">
					No se pudieron cargar los repositorios.
				</p>
				<a
					href="https://github.com/{siteData.contact.github}"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary"
				>
					Ver en GitHub
				</a>
			</div>
		{/if}

		<div class="mt-12 text-center">
			<a
				href="https://github.com/{siteData.contact.github}?tab=repositories"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-outline"
			>
				Ver todos los repositorios
			</a>
		</div>
	</div>
</section>
