<script lang="ts">
	import { language } from '$lib/i18n';
</script>

<button
	onclick={() => language.toggle()}
	class="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-white/[0.15] hover:text-heading"
	aria-label="Cambiar idioma"
>
	{#if $language === 'es'}
		<span>ES</span>
	{:else}
		<span>EN</span>
	{/if}
</button>
