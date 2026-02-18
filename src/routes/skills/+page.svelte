<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import SkillBadge from '$lib/components/SkillBadge.svelte';
</script>

<svelte:head>
	<title>{$t.skills.title} | {siteData.name}</title>
	<meta
		name="description"
		content="{$t.skills.title} - {siteData.name}"
	/>
</svelte:head>

<section class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<h1 class="section-title">{$t.skills.title}</h1>

		<div class="flex flex-wrap justify-center gap-4">
			{#each siteData.skills as skill}
				<SkillBadge {skill} />
			{/each}
		</div>

		<div class="mt-16">
			<h2 class="mb-8 text-center text-2xl font-semibold">
				{$t.skills.specializations}
			</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">
						{$t.skills.backend.title}
					</h3>
					<p class="text-secondary">
						{$t.skills.backend.description}
					</p>
				</div>
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">
						{$t.skills.cloud.title}
					</h3>
					<p class="text-secondary">
						{$t.skills.cloud.description}
					</p>
				</div>
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">
						{$t.skills.databases.title}
					</h3>
					<p class="text-secondary">
						{$t.skills.databases.description}
					</p>
				</div>
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">
						{$t.skills.frameworks.title}
					</h3>
					<p class="text-secondary">
						{$t.skills.frameworks.description}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
