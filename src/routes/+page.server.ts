import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { fetchUserRepos } from '$lib/utils/github';
import { getAllPosts } from '$lib/utils/posts';

export const prerender = true;

/**
 * Feeds the "featured projects" and "latest posts" strips on the home page.
 * Runs at build time only (the page is prerendered).
 */
export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();

	let repos: Awaited<ReturnType<typeof fetchUserRepos>> = [];
	try {
		repos = await fetchUserRepos({
			sort: 'pushed',
			exclude: ['gambl3r08.github.io'],
			token: env.GITHUB_TOKEN
		});
	} catch (error) {
		// The section is skipped entirely when empty, so a GitHub outage costs a
		// strip on the home page rather than the whole build.
		console.error('[home] Could not load repositories:', error);
	}

	// Most-starred first, then most recently pushed.
	const featuredRepos = [...repos]
		.sort(
			(a, b) =>
				b.stargazers_count - a.stargazers_count ||
				new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
		)
		.slice(0, 3);

	return {
		featuredRepos,
		latestPosts: posts.slice(0, 2)
	};
};
