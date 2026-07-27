<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import RepoCard from '$lib/components/RepoCard.svelte';
	import { siteData } from '$lib/data/site';
	import { t, language } from '$lib/i18n';
	import { reveal } from '$lib/utils/scrollReveal';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString($language === 'es' ? 'es-ES' : 'en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

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

	let done = $derived(currentLine >= terminalLines.length);

	const lineClass = (line: string) =>
		line.startsWith('✓') ? 'term-ok' : line.startsWith('>') ? 'term-accent' : 'term-fg';

	onMount(() => {
		// WCAG 2.2.2: never auto-animate text for people who opted out of motion.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			visibleLines = terminalLines;
			currentLine = terminalLines.length;
			return;
		}

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

<!-- Capped below full viewport height: at 100vh the ~330px of hero content
     floated in a sea of empty space on desktop, and the sections below gave no
     hint they existed. -->
<section class="relative flex min-h-[34rem] items-center overflow-hidden px-4 py-20 lg:min-h-[40rem]">
	<!-- Background grid pattern -->
	<div class="pointer-events-none absolute inset-0" style="opacity: var(--noise-opacity)" aria-hidden="true">
		<div class="h-full w-full" style="background-image: linear-gradient(var(--color-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-muted) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.15"></div>
	</div>

	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col items-center justify-between gap-12 md:flex-row">
			<div class="flex-1 text-center md:text-left">
				<div class="reveal mt-8 md:mt-0" use:reveal={{ delay: 0 }}>
					<p class="mb-3 text-sm font-medium uppercase tracking-widest text-accent-strong">
						{$t.home.greeting}
					</p>
				</div>
				<div class="reveal" use:reveal={{ delay: 100 }}>
					<h1 class="mb-2 font-heading text-4xl font-bold md:text-5xl">
						<span class="bg-gradient-to-r from-accent-strong via-violet-strong to-accent-strong bg-clip-text text-transparent" style="background-size: 200% auto; animation: gradientShift 8s ease infinite">{siteData.name}</span>
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
						<div class="flex items-center gap-2 px-4 py-3" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08)">
							<div class="h-3 w-3 rounded-full bg-red-500/70"></div>
							<div class="h-3 w-3 rounded-full bg-yellow-500/70"></div>
							<div class="h-3 w-3 rounded-full bg-green-500/70"></div>
							<span class="ml-2 text-xs term-dim">terminal</span>
						</div>
						<!-- Terminal body. The pane is dark in BOTH themes, so it uses its
						     own fixed foreground colors rather than the theme tokens. -->
						<div class="term p-4 font-mono text-sm leading-relaxed" style="min-height: 180px" aria-hidden="true">
							{#each visibleLines as line}
								<div class={lineClass(line)}>{line}</div>
							{/each}
							{#if typingText}
								<div class={lineClass(typingText)}>
									{typingText}<span class="caret"></span>
								</div>
							{:else if done}
								<div class="mt-1 term-fg">
									$ <span class="caret"></span>
								</div>
							{/if}
						</div>
						<!-- Screen readers get the finished output as plain text instead of
						     a stream of partial characters. -->
						<p class="sr-only">{terminalLines.join('. ')}</p>
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
			<h2 class="mb-5 text-center text-xs font-medium uppercase tracking-widest text-muted">
				{$t.home.techStrip}
			</h2>
			<ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
				{#each ['Python', 'FastAPI', 'Go', '.NET', 'TypeScript', 'Docker', 'Kubernetes', 'GCP', 'PostgreSQL'] as tech}
					<li class="text-sm font-medium text-body transition-colors hover:text-accent-strong">{tech}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Featured projects. The home page previously stopped at the tech strip,
     leaving the rest of the viewport empty and giving visitors no reason to
     scroll; these two strips put that space to work. -->
{#if data.featuredRepos.length > 0}
	<section class="px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<div class="reveal mb-8 flex flex-wrap items-end justify-between gap-4" use:reveal>
				<div>
					<h2 class="font-heading text-2xl font-bold text-heading md:text-3xl">
						{$t.home.featuredProjects}
					</h2>
					<p class="mt-1 text-muted">{$t.home.featuredProjectsDesc}</p>
				</div>
				<a href="/projects" class="text-sm font-medium text-accent-strong hover:underline">
					{$t.home.seeAllProjects} →
				</a>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.featuredRepos as repo, i (repo.id)}
					<div class="reveal" use:reveal={{ delay: i * 80 }}>
						<RepoCard {repo} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Latest posts -->
{#if data.latestPosts.length > 0}
	<section class="border-t px-4 py-16" style="border-color: var(--glass-border)">
		<div class="mx-auto max-w-6xl">
			<div class="reveal mb-8 flex flex-wrap items-end justify-between gap-4" use:reveal>
				<div>
					<h2 class="font-heading text-2xl font-bold text-heading md:text-3xl">
						{$t.home.latestPosts}
					</h2>
					<p class="mt-1 text-muted">{$t.home.latestPostsDesc}</p>
				</div>
				<a href="/blog" class="text-sm font-medium text-accent-strong hover:underline">
					{$t.home.seeAllPosts} →
				</a>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				{#each data.latestPosts as post, i (post.slug)}
					<article class="reveal" use:reveal={{ delay: i * 80 }}>
						<a href="/blog/{post.slug}" class="card group flex h-full flex-col">
							<h3 class="mb-2 text-lg font-semibold text-heading transition-colors group-hover:text-accent-strong">
								{post.title}
							</h3>
							<p class="mb-4 line-clamp-2 text-sm text-muted">{post.description}</p>
							<div class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
								<time datetime={post.date}>{formatDate(post.date)}</time>
								{#if post.readingTime}
									<span>{post.readingTime} {$t.blog.minRead}</span>
								{/if}
							</div>
						</a>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	/* The terminal pane keeps a dark background in both themes, so its text
	   colors are fixed here instead of inheriting the theme tokens (which are
	   dark-on-light and were unreadable inside it). */
	.term-fg { color: #e2e8f0; }
	.term-dim { color: #94a3b8; }
	.term-ok { color: #4ade80; }
	.term-accent { color: #fbbf24; }

	.caret {
		display: inline-block;
		width: 0.5rem;
		height: 1rem;
		margin-left: 0.125rem;
		vertical-align: middle;
		background: #fbbf24;
		animation: caretBlink 1s step-end infinite;
	}

	@keyframes caretBlink {
		50% { opacity: 0; }
	}

	@keyframes gradientShift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
</style>
