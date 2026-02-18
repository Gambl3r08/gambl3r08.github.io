import type { PageLoad } from './$types';
import { fetchUserRepos } from '$lib/utils/github';

export const prerender = true;

export const load: PageLoad = async () => {
	const repos = await fetchUserRepos({
		per_page: 12,
		sort: 'pushed',
		exclude: ['gambl3r08.github.io']
	});

	return { repos };
};
