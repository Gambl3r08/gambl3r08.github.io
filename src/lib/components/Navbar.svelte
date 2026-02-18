<script lang="ts">
	import { page } from '$app/stores';

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
	};

	const navLinks = [
		{ href: '/', label: 'Inicio' },
		{ href: '/about', label: 'Sobre Mí' },
		{ href: '/projects', label: 'Proyectos' },
		{ href: '/skills', label: 'Habilidades' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contacto' }
	];
</script>

<nav class="sticky top-0 z-50 bg-white shadow-sm">
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex h-16 items-center justify-between">
			<a
				href="/"
				class="text-xl font-bold text-gray-900 transition-colors hover:text-primary"
			>
				Roberto Lozada
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden gap-8 md:flex">
				{#each navLinks as link}
					<a
						href={link.href}
						class="font-medium transition-colors {$page.url.pathname === link.href
							? 'text-primary'
							: 'text-gray-700 hover:text-primary'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button class="p-2 md:hidden" onclick={toggleMenu} aria-label="Toggle menu">
				<div class="flex h-5 w-6 flex-col justify-between">
					<span
						class="block h-0.5 w-full bg-gray-900 transition-transform {isMenuOpen
							? 'translate-y-2 rotate-45'
							: ''}"
					></span>
					<span
						class="block h-0.5 w-full bg-gray-900 transition-opacity {isMenuOpen
							? 'opacity-0'
							: ''}"
					></span>
					<span
						class="block h-0.5 w-full bg-gray-900 transition-transform {isMenuOpen
							? '-translate-y-2 -rotate-45'
							: ''}"
					></span>
				</div>
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if isMenuOpen}
			<div class="border-t py-4 md:hidden">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block py-2 font-medium {$page.url.pathname === link.href
							? 'text-primary'
							: 'text-gray-700'}"
						onclick={closeMenu}
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>
