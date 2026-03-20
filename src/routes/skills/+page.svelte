<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { skillCategories } from '$lib/data/skills';
	import { skillIcons } from '$lib/data/skillIcons';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';

	const iconMap: Record<string, string> = {
		ai: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z',
		cloud: 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
		network: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
		code: 'M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z',
		languages: 'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802'
	};
</script>

<SEOHead
	title="{$t.skills.title} | {siteData.name}"
	description="{$t.skills.title} - {siteData.name}"
/>

<section class="px-4 py-16">
	<div class="mx-auto max-w-5xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.skills.title}</h1>
		</div>

		<div class="reveal" use:reveal={{ delay: 100 }}>
			<p class="mx-auto mb-12 max-w-2xl text-center text-lg text-muted">
				{$t.skills.specializations}
			</p>
		</div>

		<!-- Skill Categories Grid -->
		<div class="grid gap-6 md:grid-cols-2">
			{#each skillCategories as cat, catIdx}
				{@const catTranslation = $t.skills[cat.key as keyof typeof $t.skills] as { title: string; description: string }}
				<div class="card reveal group relative overflow-hidden" use:reveal={{ delay: 150 + catIdx * 100 }}>
					<!-- Top accent bar -->
					<div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r {catIdx % 2 === 0 ? 'from-accent to-violet' : 'from-violet to-accent'}"></div>

					<!-- Header -->
					<div class="mb-4 flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl {catIdx % 2 === 0 ? 'bg-accent/10' : 'bg-violet/10'}">
							<svg class="h-5 w-5 {catIdx % 2 === 0 ? 'text-accent-light' : 'text-violet'}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d={iconMap[cat.icon]} />
							</svg>
						</div>
						<div>
							<h2 class="text-lg font-semibold text-heading transition-colors group-hover:text-accent-light">
								{catTranslation.title}
							</h2>
							<p class="text-sm text-muted">{catTranslation.description}</p>
						</div>
					</div>

					<!-- Skills List -->
					<div class="space-y-3">
						{#each cat.skills as skill}
							{@const icon = skillIcons[skill.name]}
							<div class="flex items-center gap-3">
								<!-- Icon -->
								<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/5">
									{#if icon}
										<svg
											class="h-3.5 w-3.5"
											style="color: {icon[1] === 'currentColor' ? 'var(--accent)' : icon[1]}"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d={icon[0]} />
										</svg>
									{:else}
										<span class="text-xs font-bold text-accent-light">{skill.name.charAt(0)}</span>
									{/if}
								</div>

								<!-- Name + Level bar -->
								<div class="flex-1 min-w-0">
									<div class="flex items-center justify-between mb-1">
										<span class="text-sm font-medium text-body truncate">{skill.name}</span>
										<span class="text-xs text-muted ml-2 shrink-0">{skill.level}/5</span>
									</div>
									<div class="h-1.5 w-full rounded-full" style="background: var(--glass-border)">
										<div
											class="h-full rounded-full transition-all duration-700"
											style="width: {skill.level * 20}%; background: linear-gradient(90deg, var(--accent), var(--accent-secondary))"
										></div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- All Technologies -->
		<div class="mt-16">
			<div class="reveal" use:reveal>
				<h2 class="mb-6 text-center text-xl font-semibold text-heading font-heading">
					{$t.skills.allTech}
				</h2>
			</div>
			<div class="reveal flex flex-wrap justify-center gap-2" use:reveal={{ delay: 100 }}>
				{#each siteData.skills as skill}
					{@const icon = skillIcons[skill]}
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-sm text-body transition-all hover:border-accent/30 hover:bg-accent/10"
					>
						{#if icon}
							<svg
								class="h-3.5 w-3.5"
								style="color: {icon[1] === 'currentColor' ? 'var(--accent)' : icon[1]}"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d={icon[0]} />
							</svg>
						{/if}
						{skill}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>
