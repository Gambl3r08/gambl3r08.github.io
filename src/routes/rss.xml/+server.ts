import { getAllPosts } from '$lib/utils/posts';
import { siteData, SITE_URL as BASE_URL } from '$lib/data/site';
import type { RequestHandler } from './$types';

export const prerender = true;


export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	const items = posts
		.map(
			(post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
		)
		.join('');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteData.name} - Blog]]></title>
    <description><![CDATA[${siteData.description}]]></description>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
