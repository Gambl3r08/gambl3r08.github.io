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
		}, 40);

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

			<!-- Terminal animation -->
			<div class="flex flex-1 justify-center">
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

<style>
	@keyframes gradientShift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
</style>
