<script lang="ts">
	interface Props {
		skill: string;
	}

	let { skill }: Props = $props();
</script>

<span
	class="cursor-default rounded-lg border border-accent/10 bg-accent/5 px-4 py-2 font-medium text-body transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-heading"
	style="hover:box-shadow: 0 0 12px rgba(99, 102, 241, 0.15)"
>
	{skill}
</span>

<style>
	span:hover {
		box-shadow: 0 0 12px rgba(99, 102, 241, 0.15);
	}
</style>
