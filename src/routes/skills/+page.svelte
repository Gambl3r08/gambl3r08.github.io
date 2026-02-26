<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import SkillBadge from '$lib/components/SkillBadge.svelte';
	import { reveal } from '$lib/utils/scrollReveal';
</script>

<svelte:head>
	<title>{$t.skills.title} | {siteData.name}</title>
	<meta
		name="description"
		content="{$t.skills.title} - {siteData.name}"
	/>
</svelte:head>

<section class="px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.skills.title}</h1>
		</div>

		<div class="flex flex-wrap justify-center gap-4">
			{#each siteData.skills as skill, i}
				<div class="reveal-scale" use:reveal={{ delay: i * 50 }}>
					<SkillBadge {skill} />
				</div>
			{/each}
		</div>

		<div class="mt-16">
			<div class="reveal" use:reveal>
				<h2 class="mb-8 text-center text-2xl font-semibold text-heading font-heading">
					{$t.skills.specializations}
				</h2>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 100 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-violet"></div>
					<h3 class="mb-3 text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
						{$t.skills.backend.title}
					</h3>
					<p class="text-muted">
						{$t.skills.backend.description}
					</p>
				</div>
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 200 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet to-accent"></div>
					<h3 class="mb-3 text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
						{$t.skills.cloud.title}
					</h3>
					<p class="text-muted">
						{$t.skills.cloud.description}
					</p>
				</div>
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 300 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-violet"></div>
					<h3 class="mb-3 text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
						{$t.skills.databases.title}
					</h3>
					<p class="text-muted">
						{$t.skills.databases.description}
					</p>
				</div>
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 400 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet to-accent"></div>
					<h3 class="mb-3 text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
						{$t.skills.frameworks.title}
					</h3>
					<p class="text-muted">
						{$t.skills.frameworks.description}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
