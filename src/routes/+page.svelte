<script lang="ts">
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
</script>

<svelte:head>
	<title>{siteData.name} | {$t.home.title}</title>
	<meta
		name="description"
		content="Portfolio de {siteData.name} - {$t.home.title}"
	/>
</svelte:head>

<section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4">
	<!-- Background grid pattern -->
	<div class="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
		<div class="h-full w-full" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 60px 60px"></div>
	</div>

	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col items-center justify-between gap-12 md:flex-row">
			<div class="flex-1 text-center md:text-left">
				<div class="reveal" use:reveal={{ delay: 0 }}>
					<p class="mb-4 text-sm font-medium uppercase tracking-widest text-accent-light">
						{$t.home.greeting}
					</p>
				</div>
				<div class="reveal" use:reveal={{ delay: 100 }}>
					<h1 class="mb-4 font-heading text-5xl font-bold md:text-6xl">
						<span class="bg-gradient-to-r from-accent-light via-violet to-accent bg-clip-text text-transparent" style="background-size: 200% auto; animation: gradientShift 8s ease infinite">{siteData.name}</span>
					</h1>
				</div>
				<div class="reveal" use:reveal={{ delay: 200 }}>
					<h2 class="mb-6 text-2xl text-body md:text-3xl">
						{$t.home.title}
					</h2>
				</div>
				<div class="reveal" use:reveal={{ delay: 300 }}>
					<p class="mb-8 max-w-xl text-lg text-muted">
						{$t.home.description}
					</p>
				</div>
				<div class="reveal flex justify-center gap-4 md:justify-start" use:reveal={{ delay: 400 }}>
					<a href="/projects" class="btn-primary">{$t.home.viewProjects}</a>
					<a href="/contact" class="btn-outline">{$t.home.contactMe}</a>
				</div>
			</div>

			<div class="flex flex-1 justify-center">
				<div class="reveal-scale" use:reveal={{ delay: 200 }}>
					<div class="relative flex h-72 w-72 items-center justify-center md:h-80 md:w-80">
						<!-- Outer rotating ring -->
						<div
							class="absolute inset-0 rounded-full border border-accent/20"
							style="animation: spin 20s linear infinite"
						></div>
						<!-- Middle rotating ring (opposite direction) -->
						<div
							class="absolute inset-4 rounded-full border border-violet/15"
							style="animation: spin 15s linear infinite reverse"
						></div>
						<!-- Inner ring -->
						<div
							class="absolute inset-8 rounded-full border border-accent/10"
							style="animation: spin 25s linear infinite"
						></div>

						<!-- Central orb -->
						<div class="relative flex h-32 w-32 items-center justify-center rounded-full" style="background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)">
							<span class="font-heading text-4xl font-bold bg-gradient-to-br from-accent-light to-violet bg-clip-text text-transparent">&lt;/&gt;</span>
						</div>

						<!-- Floating dots -->
						<div class="absolute top-4 right-8 h-2 w-2 rounded-full bg-accent/40 animate-float"></div>
						<div class="absolute bottom-8 left-4 h-1.5 w-1.5 rounded-full bg-violet/40 animate-float" style="animation-delay: 2s"></div>
						<div class="absolute top-1/2 right-2 h-1 w-1 rounded-full bg-accent-light/30 animate-float" style="animation-delay: 4s"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
	@keyframes gradientShift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
</style>
