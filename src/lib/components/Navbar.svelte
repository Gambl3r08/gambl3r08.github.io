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
		{ href: '/', key: 'home', icon: 'home' },
		{ href: '/about', key: 'about', icon: 'user' },
		{ href: '/projects', key: 'projects', icon: 'code' },
		{ href: '/skills', key: 'skills', icon: 'bolt' },
		{ href: '/blog', key: 'blog', icon: 'pencil' },
		{ href: '/contact', key: 'contact', icon: 'chat' }
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
						class="relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors rounded-full {$page.url.pathname === link.href
							? 'text-accent-light bg-accent/10'
							: 'text-muted hover:text-heading'}"
					>
						{#if link.icon === 'home'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
						{:else if link.icon === 'user'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
						{:else if link.icon === 'code'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
						{:else if link.icon === 'bolt'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
						{:else if link.icon === 'pencil'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
						{:else if link.icon === 'chat'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
						{/if}
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
						class="flex items-center gap-2 rounded-lg py-2 px-3 font-medium {$page.url.pathname === link.href
							? 'text-accent-light bg-accent/10'
							: 'text-muted hover:text-heading'}"
						onclick={closeMenu}
					>
						{#if link.icon === 'home'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
						{:else if link.icon === 'user'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
						{:else if link.icon === 'code'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
						{:else if link.icon === 'bolt'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
						{:else if link.icon === 'pencil'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
						{:else if link.icon === 'chat'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>
						{/if}
						{$t.nav[link.key]}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>
