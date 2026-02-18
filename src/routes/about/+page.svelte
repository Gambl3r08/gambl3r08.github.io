<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t.about.title} | {siteData.name}</title>
	<meta name="description" content="{$t.about.title} - {siteData.name}" />
</svelte:head>

<section class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<h1 class="section-title">{$t.about.title}</h1>

		<div class="space-y-6 text-center">
			<p class="text-secondary text-lg leading-relaxed">
				{$t.about.description}
			</p>

			<div class="mt-12">
				<h2 class="mb-6 text-2xl font-semibold">{$t.about.experience}</h2>
				<div class="grid gap-6 md:grid-cols-3">
					<div class="card text-center">
						<div class="mb-2 text-3xl font-bold text-primary">5+</div>
						<p class="text-secondary">{$t.about.yearsExperience}</p>
					</div>
					<div class="card text-center">
						<div class="mb-2 text-3xl font-bold text-primary">+10</div>
						<p class="text-secondary">{$t.about.projectsCompleted}</p>
					</div>
					<div class="card text-center">
						<div class="mb-2 text-3xl font-bold text-primary">+12</div>
						<p class="text-secondary">{$t.about.technologiesMastered}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
