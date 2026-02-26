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
						<div class="mb-2 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">5+</div>
						<p class="text-muted group-hover:text-body transition-colors">{$t.about.yearsExperience}</p>
					</div>
					<div class="card reveal text-center group" use:reveal={{ delay: 400 }}>
						<div class="mb-2 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">+10</div>
						<p class="text-muted group-hover:text-body transition-colors">{$t.about.projectsCompleted}</p>
					</div>
					<div class="card reveal text-center group" use:reveal={{ delay: 500 }}>
						<div class="mb-2 text-3xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent">+12</div>
						<p class="text-muted group-hover:text-body transition-colors">{$t.about.technologiesMastered}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
