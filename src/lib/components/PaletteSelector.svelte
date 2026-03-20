<script lang="ts">
	import { palette, palettes } from '$lib/stores/palette';

	let open = $state(false);

	function select(id: typeof $palette) {
		palette.set(id);
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative">
	<button
		onclick={() => (open = !open)}
		class="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent/10"
		aria-label="Color palette"
		aria-expanded={open}
	>
		<svg class="h-4 w-4 text-muted hover:text-heading transition-colors" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
		</svg>
	</button>

	{#if open}
		<!-- Backdrop -->
		<button
			class="fixed inset-0 z-40"
			onclick={() => (open = false)}
			aria-label="Close palette selector"
			tabindex="-1"
		></button>

		<!-- Dropdown -->
		<div
			class="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl p-2"
			style="background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--glass-border); box-shadow: 0 8px 32px var(--card-hover-shadow)"
		>
			{#each palettes as p}
				<button
					onclick={() => select(p.id)}
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors {$palette === p.id ? 'text-heading bg-accent/10' : 'text-muted hover:text-heading hover:bg-accent/5'}"
				>
					<!-- Color dots preview -->
					<div class="flex -space-x-1">
						<span
							class="inline-block h-4 w-4 rounded-full border-2"
							style="background: {p.accent}; border-color: var(--color-base)"
						></span>
						<span
							class="inline-block h-4 w-4 rounded-full border-2"
							style="background: {p.secondary}; border-color: var(--color-base)"
						></span>
					</div>
					<span class="font-medium">{p.name}</span>
					{#if $palette === p.id}
						<svg class="ml-auto h-4 w-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
