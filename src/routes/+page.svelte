<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { siteData } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
	import { onMount } from 'svelte';

	// Terminal typewriter effect
	const terminalLines = [
		'$ python main.py',
		'> Loading AI agents...',
		'> Connecting to network devices...',
		'> Running automation pipeline...',
		'✓ All systems operational'
	];
	let visibleLines = $state<string[]>([]);
	let currentLine = $state(0);
	let currentChar = $state(0);
	let typingText = $state('');

	onMount(() => {
		const speed = window.innerWidth < 768 ? 55 : 40;
		const typeInterval = setInterval(() => {
			if (currentLine >= terminalLines.length) {
				clearInterval(typeInterval);
				return;
			}
			const line = terminalLines[currentLine];
			if (currentChar < line.length) {
				typingText += line[currentChar];
				currentChar++;
			} else {
				visibleLines = [...visibleLines, typingText];
				typingText = '';
				currentChar = 0;
				currentLine++;
			}
		}, speed);

		return () => clearInterval(typeInterval);
	});
</script>

<SEOHead
	title="{siteData.name} | {$t.home.title}"
	description={$t.home.description}
/>

<section class="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4">
	<!-- Background grid pattern -->
	<div class="pointer-events-none absolute inset-0" style="opacity: var(--noise-opacity)" aria-hidden="true">
		<div class="h-full w-full" style="background-image: linear-gradient(var(--color-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-muted) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.15"></div>
	</div>

	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col items-center justify-between gap-12 md:flex-row">
			<div class="flex-1 text-center md:text-left">
				<div class="reveal mt-8 md:mt-0" use:reveal={{ delay: 0 }}>
					<p class="mb-3 text-sm font-medium uppercase tracking-widest text-accent-light">
						{$t.home.greeting}
					</p>
				</div>
				<div class="reveal" use:reveal={{ delay: 100 }}>
					<h1 class="mb-2 font-heading text-4xl font-bold md:text-5xl">
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
				<div class="reveal flex flex-wrap justify-center gap-4 md:justify-start" use:reveal={{ delay: 400 }}>
					<a href="/projects" class="btn-primary">{$t.home.viewProjects}</a>
					<a href="/contact" class="btn-outline">{$t.home.contactMe}</a>
					<a href="/Roberto_Lozada_CV_2026.pdf" download class="btn-outline inline-flex items-center gap-2">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
						</svg>
						{$t.home.downloadCV}
					</a>
				</div>
			</div>

			<!-- Terminal animation -->
			<div class="hidden flex-1 justify-center sm:flex">
				<div class="reveal-scale" use:reveal={{ delay: 200 }}>
					<div class="w-72 md:w-80 overflow-hidden rounded-xl" style="background: var(--terminal-bg); backdrop-filter: blur(12px); border: 1px solid var(--glass-border)">
						<!-- Terminal header -->
						<div class="flex items-center gap-2 px-4 py-3" style="border-bottom: 1px solid var(--glass-border)">
							<div class="h-3 w-3 rounded-full bg-red-500/70"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500/70"></div>
							<div class="h-3 w-3 rounded-full bg-green-500/70"></div>
							<span class="ml-2 text-xs text-muted">terminal</span>
						</div>
						<!-- Terminal body -->
						<div class="p-4 font-mono text-sm leading-relaxed" style="min-height: 180px">
							{#each visibleLines as line}
								<div class="{line.startsWith('✓') ? 'text-green-400' : line.startsWith('>') ? 'text-accent-light' : 'text-body'}">
									{line}
								</div>
							{/each}
							{#if typingText}
								<div class="{typingText.startsWith('✓') ? 'text-green-400' : typingText.startsWith('>') ? 'text-accent-light' : 'text-body'}">
									{typingText}<span class="inline-block w-2 h-4 ml-0.5 bg-accent-light animate-pulse align-middle"></span>
								</div>
							{:else if currentLine >= terminalLines.length}
								<div class="text-body mt-1">
									$ <span class="inline-block w-2 h-4 ml-0.5 bg-accent-light animate-pulse align-middle"></span>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Tech Stack Strip -->
<section class="border-t border-b px-4 py-8" style="border-color: var(--glass-border)">
	<div class="mx-auto max-w-4xl">
		<div class="reveal" use:reveal>
			<p class="mb-5 text-center text-xs font-medium uppercase tracking-widest text-muted">
				{$t.home.role === 'Software Engineer' ? 'Technologies I work with' : 'Tecnologías que uso'}
			</p>
			<div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
				{#each ['Python', 'FastAPI', 'Go', '.NET', 'TypeScript', 'Docker', 'Kubernetes', 'GCP', 'PostgreSQL'] as tech}
					<span class="text-sm font-medium text-muted/70 transition-colors hover:text-accent-light">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes gradientShift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
</style>
