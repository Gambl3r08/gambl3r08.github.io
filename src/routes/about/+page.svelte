<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
</script>

<svelte:head>
	<title>{$t.about.title} | {siteData.name}</title>
	<meta name="description" content="{$t.about.title} - {siteData.name}" />
</svelte:head>

<section class="px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<div class="reveal" use:reveal>
			<h1 class="section-title">{$t.about.title}</h1>
		</div>

		<div class="space-y-6 text-center">
			<div class="reveal" use:reveal={{ delay: 100 }}>
				<p class="text-lg leading-relaxed text-muted">
					{$t.about.description}
				</p>
			</div>

			<div class="mt-12">
				<div class="reveal" use:reveal={{ delay: 200 }}>
					<h2 class="mb-6 text-2xl font-semibold text-heading font-heading">{$t.about.experience}</h2>
				</div>
				<div class="grid gap-6 md:grid-cols-3">
					<div class="card reveal text-center group" use:reveal={{ delay: 300 }}>
						<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
							<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
							</svg>
						</div>
						<div class="mb-2 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">5+</div>
						<p class="text-muted group-hover:text-body transition-colors">{$t.about.yearsExperience}</p>
					</div>
					<div class="card reveal text-center group" use:reveal={{ delay: 400 }}>
						<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10">
							<svg class="h-5 w-5 text-violet" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
							</svg>
						</div>
						<div class="mb-2 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">+10</div>
						<p class="text-muted group-hover:text-body transition-colors">{$t.about.projectsCompleted}</p>
					</div>
					<div class="card reveal text-center group" use:reveal={{ delay: 500 }}>
						<div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
							<svg class="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
							</svg>
						</div>
						<div class="mb-2 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">+12</div>
						<p class="text-muted group-hover:text-body transition-colors">{$t.about.technologiesMastered}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
