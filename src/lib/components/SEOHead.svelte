<script lang="ts">
	import { page } from '$app/stores';
	import { siteData } from '$lib/data/site';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: string;
		article?: boolean;
	}

	let {
		title = `${siteData.name} | Software Engineer`,
		description = siteData.description,
		image = '/og-image.png',
		type = 'website',
		article = false
	}: Props = $props();

	let url = $derived($page.url.href);
	let canonical = $derived($page.url.origin + $page.url.pathname);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={article ? 'article' : type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{$page.url.origin}{image}" />
	<meta property="og:site_name" content={siteData.name} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{$page.url.origin}{image}" />

	<!-- Extra SEO -->
	<meta name="author" content={siteData.name} />
	<meta name="robots" content="index, follow" />
</svelte:head>
