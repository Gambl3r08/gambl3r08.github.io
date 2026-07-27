import type { GitHubRepo } from '$lib/types';

const GITHUB_USERNAME = 'gambl3r08';
const GITHUB_API_URL = 'https://api.github.com';

export const languageColors: Record<string, string> = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	Python: '#3572A5',
	'C#': '#178600',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Shell: '#89e051',
	Dockerfile: '#384d54',
	Go: '#00ADD8',
	Rust: '#dea584',
	Java: '#b07219',
	PHP: '#4F5D95',
	Ruby: '#701516',
	Swift: '#F05138',
	Kotlin: '#A97BFF'
};

export async function fetchUserRepos(
	options: {
		sort?: 'updated' | 'created' | 'pushed' | 'full_name';
		direction?: 'asc' | 'desc';
		per_page?: number;
		exclude?: string[];
		/** Build-time PAT. Lifts the API quota from 60/h per IP to 5000/h. */
		token?: string;
	} = {}
): Promise<GitHubRepo[]> {
	const { sort = 'pushed', direction = 'desc', per_page = 12, exclude = [], token } = options;

	const url = new URL(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`);
	url.searchParams.set('sort', sort);
	url.searchParams.set('direction', direction);
	url.searchParams.set('per_page', per_page.toString());
	url.searchParams.set('type', 'owner');

	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28'
	};
	if (token) headers.Authorization = `Bearer ${token}`;

	const response = await fetch(url.toString(), { headers });

	if (!response.ok) {
		const remaining = response.headers.get('x-ratelimit-remaining');
		throw new Error(
			`GitHub API ${response.status} ${response.statusText}` +
				(remaining === '0'
					? ' — rate limit exhausted. Set GITHUB_TOKEN to raise the quota.'
					: '')
		);
	}

	const repos: GitHubRepo[] = await response.json();

	return repos.filter(
		(repo) =>
			!repo.fork && !exclude.includes(repo.name) && repo.name !== `${GITHUB_USERNAME}.github.io`
	);
}
