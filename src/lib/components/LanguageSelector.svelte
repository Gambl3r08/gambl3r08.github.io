<script lang="ts">
	import { language } from '$lib/i18n';

	let ariaLabel = $derived(
		$language === 'es' ? 'Switch to English' : 'Cambiar a Español'
	);
</script>

<button
	onclick={() => language.toggle()}
	class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-heading"
	style="border: 1px solid var(--glass-border); background: var(--input-bg)"
	aria-label={ariaLabel}
>
	{#if $language === 'es'}
		<span>ES</span>
	{:else}
		<span>EN</span>
	{/if}
</button>
