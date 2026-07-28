import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { fetchUserRepos } from '$lib/utils/github';

export const prerender = true;

/**
 * Runs once at build time (the page is prerendered), so a token here never
 * reaches the browser. It lives in `+page.server.ts` rather than `+page.ts`
 * precisely so `$env/dynamic/private` is available.
 */
/**
 * Ceiling for the uncurated fallback. Once repos carry the `portfolio` topic
 * the curated set is normally well under this, so the cap stops mattering.
 */
const MAX_REPOS = 12;

export const load: PageServerLoad = async () => {
	try {
		const all = await fetchUserRepos({
			sort: 'pushed',
			exclude: ['gambl3r08.github.io'],
			token: env.GITHUB_TOKEN
		});

		// Filtering happens after pagination, so fetch wide and trim here rather
		// than asking the API for exactly 12 and losing most of them to forks.
		const repos = all.slice(0, MAX_REPOS);

		if (repos.length === 0) {
			console.warn('[projects] GitHub returned no repositories — shipping the empty state.');
		} else if (all.length > MAX_REPOS) {
			console.warn(`[projects] Showing ${MAX_REPOS} of ${all.length} repositories.`);
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
