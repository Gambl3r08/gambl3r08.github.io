<script lang="ts">
	import { page } from '$app/stores';
	import { siteData, SITE_URL } from '$lib/data/site';

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

	let canonical = $derived(SITE_URL + $page.url.pathname);
	let imageUrl = $derived(SITE_URL + image);

	// Structured data lets search engines render a knowledge panel / sitelinks
	// instead of guessing who the site belongs to.
	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Person',
					'@id': `${SITE_URL}/#person`,
					name: siteData.name,
					jobTitle: siteData.title,
					description: siteData.description,
					email: `mailto:${siteData.contact.email}`,
					url: SITE_URL,
					image: imageUrl,
					address: {
						'@type': 'PostalAddress',
						addressLocality: siteData.contact.address
					},
					knowsAbout: siteData.skills,
					sameAs: [
						`https://github.com/${siteData.contact.github}`,
						`https://linkedin.com/in/${siteData.contact.linkedin}`
					]
				},
				{
					'@type': 'WebSite',
					'@id': `${SITE_URL}/#website`,
					url: SITE_URL,
					name: `${siteData.name} — ${siteData.title}`,
					inLanguage: ['es', 'en'],
					author: { '@id': `${SITE_URL}/#person` }
				}
			]
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={article ? 'article' : type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{siteData.name} — {siteData.title}" />
	<meta property="og:site_name" content={siteData.name} />
	<meta property="og:locale" content="es_ES" />
	<meta property="og:locale:alternate" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="{siteData.name} — {siteData.title}" />

	<!-- RSS -->
	<link rel="alternate" type="application/rss+xml" title="{siteData.name} - Blog" href="/rss.xml" />

	<!-- Extra SEO -->
	<meta name="author" content={siteData.name} />
	<meta name="robots" content="index, follow" />

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
