import { getAllPosts } from '$lib/utils/posts';
import { SITE_URL as BASE_URL } from '$lib/data/site';
import type { RequestHandler } from './$types';

export const prerender = true;


const staticRoutes = ['/', '/about', '/projects', '/skills', '/blog', '/contact'];

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	const urls = [
		...staticRoutes.map(
			(route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
		),
		...posts.map(
			(post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
		)
	].join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
