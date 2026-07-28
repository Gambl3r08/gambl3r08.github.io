import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { fetchRepo, fetchRepoReadme } from '$lib/utils/github';

export const prerender = true;

/**
 * Case-study page for one repository. Prerendered from the links the projects
 * page emits, so only curated repos get a page.
 */
export const load: PageServerLoad = async ({ params }) => {
	const repo = await fetchRepo(params.name, env.GITHUB_TOKEN);

	if (!repo) {
		throw error(404, `Repository "${params.name}" not found`);
	}

	let readmeHtml: string | null = null;
	try {
		readmeHtml = await fetchRepoReadme(params.name, env.GITHUB_TOKEN);
	} catch (e) {
		// A missing or unreadable README costs the body of the page, not the build.
		console.warn(`[projects/${params.name}] README unavailable:`, e);
	}

	return { repo, readmeHtml };
};
