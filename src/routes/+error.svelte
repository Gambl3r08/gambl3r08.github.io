<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[60vh] items-center justify-center px-4">
	<div class="text-center">
		<h1 class="mb-4 text-6xl font-bold text-primary">{$page.status}</h1>
		<p class="text-secondary mb-8 text-xl">
			{$page.error?.message || 'Página no encontrada'}
		</p>
		<a href="/" class="btn-primary">Volver al inicio</a>
	</div>
</div>
