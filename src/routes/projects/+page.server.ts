import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { fetchUserRepos } from '$lib/utils/github';

export const prerender = true;

/**
 * Runs once at build time (the page is prerendered), so a token here never
 * reaches the browser. It lives in `+page.server.ts` rather than `+page.ts`
 * precisely so `$env/dynamic/private` is available.
 */
export const load: PageServerLoad = async () => {
	try {
		const repos = await fetchUserRepos({
			per_page: 12,
			sort: 'pushed',
			exclude: ['gambl3r08.github.io'],
			token: env.GITHUB_TOKEN
		});

		if (repos.length === 0) {
			console.warn('[projects] GitHub returned no repositories — shipping the empty state.');
		}

		return { repos };
	} catch (error) {
		// Don't fail the whole build over a flaky third-party API, but make the
		// degradation loud in the CI log instead of silently publishing a blank
		// projects page.
		console.error('[projects] Could not load repositories:', error);
		return { repos: [] };
	}
};
