<script lang="ts">
	import { siteData } from '$lib/data/site';
</script>

<svelte:head>
	<title>Sobre Mí | {siteData.name}</title>
	<meta name="description" content="Conoce más sobre {siteData.name}" />
</svelte:head>

<section class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<h1 class="section-title">Sobre Mí</h1>

		<div class="space-y-6 text-center">
			<p class="text-secondary text-lg leading-relaxed">
				{siteData.aboutDescription}
			</p>

			<div class="mt-12">
				<h2 class="mb-6 text-2xl font-semibold">Experiencia</h2>
				<div class="grid gap-6 md:grid-cols-3">
					<div class="card text-center">
						<div class="mb-2 text-3xl font-bold text-primary">+3</div>
						<p class="text-secondary">Años de experiencia</p>
					</div>
					<div class="card text-center">
						<div class="mb-2 text-3xl font-bold text-primary">+10</div>
						<p class="text-secondary">Proyectos completados</p>
					</div>
					<div class="card text-center">
						<div class="mb-2 text-3xl font-bold text-primary">+12</div>
						<p class="text-secondary">Tecnologías dominadas</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
