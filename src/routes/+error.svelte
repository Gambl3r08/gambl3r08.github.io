<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
</script>

<div class="flex min-h-[60vh] items-center justify-center px-4">
	<div class="text-center">
		<h1 class="mb-4 text-6xl font-bold text-primary">{$page.status}</h1>
		<p class="text-secondary mb-8 text-xl">
			{$page.error?.message || $t.error.notFound}
		</p>
		<a href="/" class="btn-primary">{$t.error.backHome}</a>
	</div>
</div>
