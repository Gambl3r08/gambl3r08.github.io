<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
	import LanguageSelector from './LanguageSelector.svelte';

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
	};

	const navLinks = [
		{ href: '/', key: 'home' },
		{ href: '/about', key: 'about' },
		{ href: '/projects', key: 'projects' },
		{ href: '/skills', key: 'skills' },
		{ href: '/blog', key: 'blog' },
		{ href: '/contact', key: 'contact' }
	] as const;
</script>

<nav
	class="sticky top-0 z-50 border-b border-white/[0.06]"
	style="background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px)"
>
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex h-16 items-center justify-between">
			<a
				href="/"
				class="font-heading text-xl font-bold bg-gradient-to-r from-accent-light to-violet bg-clip-text text-transparent transition-opacity hover:opacity-80"
			>
				Roberto Lozada
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden items-center gap-1 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full {$page.url.pathname === link.href
							? 'text-accent-light bg-accent/10'
							: 'text-muted hover:text-heading'}"
					>
						{$t.nav[link.key]}
						{#if $page.url.pathname === link.href}
							<span class="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-violet"></span>
						{/if}
					</a>
				{/each}
				<div class="ml-3">
					<LanguageSelector />
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center gap-2 md:hidden">
				<LanguageSelector />
				<button class="p-2" onclick={toggleMenu} aria-label="Toggle menu">
					<div class="flex h-5 w-6 flex-col justify-between">
						<span
							class="block h-0.5 w-full bg-accent-light transition-transform {isMenuOpen
								? 'translate-y-2 rotate-45'
								: ''}"
						></span>
						<span
							class="block h-0.5 w-full bg-accent-light transition-opacity {isMenuOpen
								? 'opacity-0'
								: ''}"
						></span>
						<span
							class="block h-0.5 w-full bg-accent-light transition-transform {isMenuOpen
								? '-translate-y-2 -rotate-45'
								: ''}"
						></span>
					</div>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if isMenuOpen}
			<div class="border-t border-white/[0.06] py-4 md:hidden">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block rounded-lg py-2 px-3 font-medium {$page.url.pathname === link.href
							? 'text-accent-light bg-accent/10'
							: 'text-muted hover:text-heading'}"
						onclick={closeMenu}
					>
						{$t.nav[link.key]}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>
