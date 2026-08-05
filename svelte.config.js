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
			// README content is authored in other repositories, so a stale anchor
			// in one of them shouldn't be able to break this site's deploy.
			handleMissingId: 'warn',
			handleHttpError: ({ path, referrer, message }) => {
				// The avatar is optional: /about renders initials via its onerror
				// fallback when it's absent.
				if (path === '/profile.webp') {
					console.warn(`[prerender] optional asset missing: ${path} (from ${referrer})`);
					return;
				}
				// Same reasoning as handleMissingId above, for links rather than
				// anchors. An individual project page is someone else's README;
				// a relative path in it that we failed to rewrite (see
				// fetchRepoReadme) must not be able to take the deploy down —
				// which is exactly what happened once, freezing the published
				// site while the repo list silently went stale.
				if (/^\/projects\/.+/.test(referrer ?? '')) {
					console.warn(`[prerender] unresolved README link: ${path} (from ${referrer})`);
					return;
				}
				// Every other broken link still fails the build.
				throw new Error(message);
			}
		}
	}
};

export default config;
