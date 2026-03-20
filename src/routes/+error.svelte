<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
</script>

<div class="flex min-h-[70vh] items-center justify-center px-4">
	<div class="text-center">
		<!-- Large 404 with animated gradient -->
		<h1
			class="mb-4 font-heading text-[8rem] font-bold leading-none md:text-[10rem]"
			style="background: linear-gradient(135deg, #f59e0b, #f97316, #fbbf24, #f59e0b);
				background-size: 300% 300%;
				animation: gradientMove 6s ease infinite;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				background-clip: text;"
		>
			{$page.status}
		</h1>

		<h2 class="mb-3 font-heading text-2xl font-semibold text-heading md:text-3xl">
			{$t.error.subtitle}
		</h2>

		<p class="mx-auto mb-10 max-w-md text-lg text-muted">
			{$t.error.description}
		</p>

		<div class="flex flex-wrap justify-center gap-4">
			<a href="/" class="btn-primary">{$t.error.backHome}</a>
			<a href="/projects" class="btn-outline">{$t.error.goProjects}</a>
			<a href="/blog" class="btn-outline">{$t.error.goBlog}</a>
		</div>
	</div>
</div>

<style>
	@keyframes gradientMove {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
</style>
