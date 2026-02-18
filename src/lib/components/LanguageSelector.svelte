<script lang="ts">
	import { language } from '$lib/i18n';
</script>

<button
	onclick={() => language.toggle()}
	class="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
	aria-label="Cambiar idioma"
>
	{#if $language === 'es'}
		<span>🇪🇸</span>
		<span>ES</span>
	{:else}
		<span>🇺🇸</span>
		<span>EN</span>
	{/if}
</button>
