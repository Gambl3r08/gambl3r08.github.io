<script lang="ts">
	import { skillIcons } from '$lib/data/skillIcons';

	interface Props {
		skill: string;
	}

	let { skill }: Props = $props();

	let iconData = $derived(skillIcons[skill]);
</script>

<span
	class="group cursor-default inline-flex items-center gap-2 rounded-lg border border-accent/10 bg-accent/5 px-4 py-2 font-medium text-body transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-heading"
>
	{#if iconData}
		<svg
			class="h-4 w-4 transition-colors duration-300"
			style="color: {iconData[1]}"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d={iconData[0]} />
		</svg>
	{/if}
	{skill}
</span>

<style>
	span:hover {
		box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.15);
	}
</style>
