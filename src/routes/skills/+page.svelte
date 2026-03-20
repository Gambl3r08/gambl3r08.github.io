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
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
							<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
							{$t.skills.backend.title}
						</h3>
					</div>
					<p class="text-muted">
						{$t.skills.backend.description}
					</p>
				</div>
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 200 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet to-accent"></div>
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/10">
							<svg class="h-5 w-5 text-violet" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
							{$t.skills.cloud.title}
						</h3>
					</div>
					<p class="text-muted">
						{$t.skills.cloud.description}
					</p>
				</div>
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 300 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-violet"></div>
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
							<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
							{$t.skills.databases.title}
						</h3>
					</div>
					<p class="text-muted">
						{$t.skills.databases.description}
					</p>
				</div>
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 400 }}>
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet to-accent"></div>
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/10">
							<svg class="h-5 w-5 text-violet" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
							</svg>
						</div>
						<h3 class="text-xl font-semibold text-heading transition-colors group-hover:text-accent-light">
							{$t.skills.frameworks.title}
						</h3>
					</div>
					<p class="text-muted">
						{$t.skills.frameworks.description}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
