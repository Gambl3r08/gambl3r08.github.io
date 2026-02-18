<script lang="ts">
	import { siteData } from '$lib/data/site';
</script>

<svelte:head>
	<title>{siteData.name} | {siteData.title}</title>
	<meta
		name="description"
		content="Portfolio de {siteData.name} - {siteData.title}"
	/>
</svelte:head>

<section
	class="flex min-h-[calc(100vh-4rem)] animate-fade-in items-center px-4"
>
	<div class="mx-auto w-full max-w-6xl">
		<div
			class="flex flex-col items-center justify-between gap-12 md:flex-row"
		>
			<div class="flex-1 text-center md:text-left">
				<h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
					Hola! Soy <span class="text-primary">{siteData.name}</span>
				</h1>
				<h2 class="mb-6 text-2xl text-primary md:text-3xl">
					{siteData.title}
				</h2>
				<p class="text-secondary mb-8 max-w-xl text-lg">
					{siteData.description}
				</p>
				<div class="flex justify-center gap-4 md:justify-start">
					<a href="/projects" class="btn-primary">Ver Proyectos</a>
					<a href="/contact" class="btn-outline">Contactar</a>
				</div>
			</div>

			<div class="flex flex-1 justify-center">
				<div
					class="flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br from-primary-50 to-primary-100"
				>
					<div class="text-center">
						<div class="mb-2 text-6xl">👨‍💻</div>
						<p class="text-secondary text-sm">Backend Developer</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
