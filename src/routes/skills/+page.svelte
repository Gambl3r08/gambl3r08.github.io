<script lang="ts">
	import { siteData } from '$lib/data/site';
	import SkillBadge from '$lib/components/SkillBadge.svelte';
</script>

<svelte:head>
	<title>Habilidades | {siteData.name}</title>
	<meta
		name="description"
		content="Tecnologías y habilidades de {siteData.name}"
	/>
</svelte:head>

<section class="animate-fade-in px-4 py-16">
	<div class="mx-auto max-w-4xl">
		<h1 class="section-title">Habilidades</h1>

		<div class="flex flex-wrap justify-center gap-4">
			{#each siteData.skills as skill}
				<SkillBadge {skill} />
			{/each}
		</div>

		<div class="mt-16">
			<h2 class="mb-8 text-center text-2xl font-semibold">
				Áreas de Especialización
			</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">
						Backend Development
					</h3>
					<p class="text-secondary">
						Desarrollo de APIs RESTful, microservicios, y arquitecturas
						serverless con Python, C# y .NET.
					</p>
				</div>
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">Cloud & AWS</h3>
					<p class="text-secondary">
						Despliegue y gestión de infraestructura en AWS, Lambda functions, y
						servicios serverless.
					</p>
				</div>
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">Bases de Datos</h3>
					<p class="text-secondary">
						Diseño y optimización de bases de datos SQL (PostgreSQL, MySQL,
						MSSQL) y NoSQL (MongoDB).
					</p>
				</div>
				<div class="card">
					<h3 class="mb-3 text-xl font-semibold text-primary">
						Frameworks Web
					</h3>
					<p class="text-secondary">
						Django, Django REST Framework, FastAPI para desarrollo rápido y
						escalable.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
