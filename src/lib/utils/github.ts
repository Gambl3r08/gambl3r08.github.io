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
	} = {}
): Promise<GitHubRepo[]> {
	const { sort = 'pushed', direction = 'desc', per_page = 12, exclude = [] } = options;

	const url = new URL(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`);
	url.searchParams.set('sort', sort);
	url.searchParams.set('direction', direction);
	url.searchParams.set('per_page', per_page.toString());
	url.searchParams.set('type', 'owner');

	try {
		const response = await fetch(url.toString(), {
			headers: {
				Accept: 'application/vnd.github.v3+json'
			}
		});

		if (!response.ok) {
			console.error(`Error fetching repos: ${response.statusText}`);
			return [];
		}

		const repos: GitHubRepo[] = await response.json();

		return repos.filter(
			(repo) =>
				!repo.fork &&
				!exclude.includes(repo.name) &&
				repo.name !== `${GITHUB_USERNAME}.github.io`
		);
	} catch (error) {
		console.error('Error fetching GitHub repos:', error);
		return [];
	}
}
