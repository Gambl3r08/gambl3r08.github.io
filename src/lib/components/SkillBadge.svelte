<script lang="ts">
	interface Props {
		skill: string;
	}

	let { skill }: Props = $props();
</script>

<span
	class="cursor-default rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-800 transition-colors duration-300 hover:bg-primary hover:text-white"
>
	{skill}
</span>
