import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				// The avatar is optional: /about renders initials via its onerror
				// fallback when it's absent. Every other broken link should still
				// fail the build.
				if (path === '/profile.webp') {
					console.warn(`[prerender] optional asset missing: ${path} (from ${referrer})`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
