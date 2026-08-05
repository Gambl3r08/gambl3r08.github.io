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

/**
 * Topic that marks a repository as portfolio-worthy.
 *
 * Add it from the repo page on GitHub (About → ⚙ → Topics) and it shows up on
 * the next build — the site is curated from GitHub's own UI, no code change.
 */
export const PORTFOLIO_TOPIC = 'portfolio';

/**
 * Per-build cache of the repository listing.
 *
 * Prerendering runs every page load in one Node process, and each project page
 * needs the same repo metadata. Without this the build issued one list call per
 * page and blew through the unauthenticated 60 req/h quota.
 */
const repoListCache = new Map<string, Promise<GitHubRepo[]>>();

export async function fetchUserRepos(
	options: {
		sort?: 'updated' | 'created' | 'pushed' | 'full_name';
		direction?: 'asc' | 'desc';
		per_page?: number;
		exclude?: string[];
		/** Build-time PAT. Lifts the API quota from 60/h per IP to 5000/h. */
		token?: string;
		/** Keep only repos carrying {@link PORTFOLIO_TOPIC}, when any do. */
		curated?: boolean;
	} = {}
): Promise<GitHubRepo[]> {
	const {
		sort = 'pushed',
		direction = 'desc',
		per_page = 100,
		exclude = [],
		token,
		curated = true
	} = options;

	const url = new URL(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`);
	url.searchParams.set('sort', sort);
	url.searchParams.set('direction', direction);
	url.searchParams.set('per_page', per_page.toString());
	url.searchParams.set('type', 'owner');

	const key = url.toString();
	let pending = repoListCache.get(key);

	if (!pending) {
		const headers: Record<string, string> = {
			Accept: 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28'
		};
		if (token) headers.Authorization = `Bearer ${token}`;

		pending = fetch(key, { headers }).then(async (response) => {
			if (!response.ok) {
				const remaining = response.headers.get('x-ratelimit-remaining');
				throw new Error(
					`GitHub API ${response.status} ${response.statusText}` +
						(remaining === '0'
							? ' — rate limit exhausted. Set GITHUB_TOKEN to raise the quota.'
							: '')
				);
			}
			return response.json() as Promise<GitHubRepo[]>;
		});

		// Don't cache a rejection: a transient failure shouldn't poison the rest
		// of the build.
		pending.catch(() => repoListCache.delete(key));
		repoListCache.set(key, pending);
	}

	const repos: GitHubRepo[] = await pending;

	const lowerExclude = new Set(exclude.map((n) => n.toLowerCase()));
	const owned = repos.filter((repo) => {
		const name = repo.name.toLowerCase();
		return (
			!repo.fork &&
			!repo.archived &&
			!lowerExclude.has(name) &&
			// The site's own repo and the profile README repo (the one named after
			// the account) are infrastructure, not portfolio pieces.
			name !== `${GITHUB_USERNAME}.github.io` &&
			name !== GITHUB_USERNAME
		);
	});

	if (!curated) return owned;

	const tagged = owned.filter((repo) => repo.topics?.includes(PORTFOLIO_TOPIC));

	if (tagged.length === 0) {
		// Nothing tagged yet — show everything rather than an empty page, but say
		// so loudly, because the untagged list is ordered by push date and will
		// happily surface scratch repos.
		console.warn(
			`[github] No repository carries the "${PORTFOLIO_TOPIC}" topic yet, so all ` +
				`${owned.length} owned repos are being shown. Add the topic on GitHub ` +
				`(repo → About → ⚙ → Topics) to curate what appears.`
		);
		return owned;
	}

	return tagged;
}

/**
 * A single repository's metadata. Returns null when it doesn't exist.
 *
 * Served from the cached listing when possible — every project page asks for a
 * repo that the listing already fetched, so this normally costs no extra API
 * call at all.
 */
export async function fetchRepo(repoName: string, token?: string): Promise<GitHubRepo | null> {
	for (const pending of repoListCache.values()) {
		try {
			const cached = (await pending).find(
				(r) => r.name.toLowerCase() === repoName.toLowerCase()
			);
			if (cached) return cached;
		} catch {
			// Fall through to the direct lookup below.
		}
	}

	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28'
	};
	if (token) headers.Authorization = `Bearer ${token}`;

	const response = await fetch(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}`, {
		headers
	});

	if (response.status === 404) return null;
	if (!response.ok) {
		throw new Error(`GitHub API ${response.status} ${response.statusText} fetching ${repoName}`);
	}

	return response.json();
}

/** Already a scheme, a protocol-relative URL, or a fragment — leave it alone. */
const ABSOLUTE_URL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/**
 * Point a README-relative path at GitHub.
 *
 * Images have to go through raw.githubusercontent.com to come back as bytes
 * rather than as a repository page; everything else resolves to the blob view,
 * which is what a reader clicking "CONTRIBUTING.md" expects. `HEAD` stands in
 * for the default branch, so this survives a rename of `main`.
 */
function toGitHubUrl(path: string, repoName: string, kind: 'asset' | 'page'): string {
	const clean = path.trim().replace(/^\.?\//, '');
	return kind === 'asset'
		? `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/HEAD/${clean}`
		: `https://github.com/${GITHUB_USERNAME}/${repoName}/blob/HEAD/${clean}`;
}

/** A srcset is `url [descriptor]` entries separated by commas. */
function absolutizeSrcset(value: string, repoName: string): string {
	return value
		.split(',')
		.map((entry) => {
			const [url, ...descriptor] = entry.trim().split(/\s+/);
			if (!url || ABSOLUTE_URL.test(url)) return entry.trim();
			return [toGitHubUrl(url, repoName, 'asset'), ...descriptor].join(' ');
		})
		.join(', ');
}

/**
 * A repository's README, rendered to HTML by GitHub itself.
 *
 * Using `Accept: application/vnd.github.html` means GitHub does the GFM
 * rendering (tables, task lists, callouts, syntax highlighting) — no markdown
 * dependency on our side, and the output matches what people see on GitHub.
 *
 * What it does *not* do is resolve relative paths: a README that references
 * `packaging/banner.png` or `CONTRIBUTING.md` comes back with those strings
 * verbatim, and they then resolve against `/projects/<name>` on this site.
 * That is not merely a broken image — the prerenderer follows them, 404s, and
 * takes the whole deploy down with it. So rewrite them here.
 *
 * Returns null when the repo simply has no README (a 404 here is normal).
 */
export async function fetchRepoReadme(
	repoName: string,
	token?: string
): Promise<string | null> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github.html',
		'X-GitHub-Api-Version': '2022-11-28'
	};
	if (token) headers.Authorization = `Bearer ${token}`;

	const response = await fetch(
		`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
		{ headers }
	);

	if (response.status === 404) return null;

	if (!response.ok) {
		throw new Error(
			`GitHub API ${response.status} ${response.statusText} fetching README for ${repoName}`
		);
	}

	let html = await response.text();

	html = html
		.replace(/\bsrcset="([^"]*)"/g, (_, value: string) => `srcset="${absolutizeSrcset(value, repoName)}"`)
		.replace(/\bsrc="([^"]*)"/g, (match, value: string) =>
			ABSOLUTE_URL.test(value) ? match : `src="${toGitHubUrl(value, repoName, 'asset')}"`
		)
		.replace(/\bhref="([^"]*)"/g, (match, value: string) =>
			ABSOLUTE_URL.test(value) ? match : `href="${toGitHubUrl(value, repoName, 'page')}"`
		);

	// GitHub emits `id="user-content-foo"` but links to `#foo`, relying on
	// client-side JS on github.com to bridge the two. Dropping the prefix makes
	// heading permalinks and README tables of contents resolve on their own.
	html = html.replace(/\bid="user-content-/g, 'id="');

	// The page already provides the <h1> (the repo name), so demote every README
	// heading a level — otherwise each project page shipped two <h1>s and a
	// broken outline. Walk downwards so levels aren't shifted twice.
	for (let level = 5; level >= 1; level--) {
		html = html
			.replace(new RegExp(`<h${level}(?=[\\s>])`, 'g'), `<h${level + 1}`)
			.replace(new RegExp(`</h${level}>`, 'g'), `</h${level + 1}>`);
	}

	return html;
}
