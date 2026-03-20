<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
</script>

<SEOHead
	title="{$t.about.title} | {siteData.name}"
	description={siteData.aboutDescription}
/>

<section class="px-4 py-16">
	<div class="mx-auto max-w-5xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.about.title}</h1>
		</div>

		<!-- Bento Grid -->
		<div class="grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto_auto]">
			<!-- Bio - spans 2 cols -->
			<div class="card reveal md:col-span-2 md:row-span-2" use:reveal={{ delay: 100 }}>
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
						<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
						</svg>
					</div>
					<h2 class="text-lg font-semibold text-heading">{siteData.name}</h2>
				</div>
				<p class="text-sm leading-relaxed text-muted">
					{$t.about.description}
				</p>
			</div>

			<!-- Years of Experience -->
			<div class="card reveal text-center group" use:reveal={{ delay: 200 }}>
				<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
					<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
					</svg>
				</div>
				<div class="mb-1 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">5+</div>
				<p class="text-sm text-muted group-hover:text-body transition-colors">{$t.about.yearsExperience}</p>
			</div>

			<!-- Projects Completed -->
			<div class="card reveal text-center group" use:reveal={{ delay: 250 }}>
				<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10">
					<svg class="h-5 w-5 text-violet" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
					</svg>
				</div>
				<div class="mb-1 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">+10</div>
				<p class="text-sm text-muted group-hover:text-body transition-colors">{$t.about.projectsCompleted}</p>
			</div>

			<!-- Location -->
			<div class="card reveal group" use:reveal={{ delay: 300 }}>
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-4 w-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
					</svg>
					<span class="text-sm font-medium text-muted">{$t.about.location}</span>
				</div>
				<p class="text-heading font-semibold">{$t.about.locationValue}</p>
			</div>

			<!-- Focus -->
			<div class="card reveal group" use:reveal={{ delay: 350 }}>
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-4 w-4 text-violet" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
					</svg>
					<span class="text-sm font-medium text-muted">{$t.about.focus}</span>
				</div>
				<p class="text-heading font-semibold">{$t.about.focusValue}</p>
			</div>

			<!-- Tech Stack - spans 2 cols -->
			<div class="card reveal md:col-span-2" use:reveal={{ delay: 400 }}>
				<div class="mb-3 flex items-center gap-2">
					<svg class="h-4 w-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
					</svg>
					<span class="text-sm font-medium text-muted">{$t.about.techStack}</span>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each $t.about.techStackItems as tech}
						<span class="rounded-md border border-accent/10 bg-accent/5 px-3 py-1 text-sm text-accent-light">
							{tech}
						</span>
					{/each}
				</div>
			</div>

			<!-- Technologies Mastered -->
			<div class="card reveal text-center group md:col-span-2" use:reveal={{ delay: 450 }}>
				<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
					<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
					</svg>
				</div>
				<div class="mb-1 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">+12</div>
				<p class="text-sm text-muted group-hover:text-body transition-colors">{$t.about.technologiesMastered}</p>
			</div>
		</div>
	</div>
</section>
