export interface PostMetadata {
	title: string;
	description: string;
	date: string;
	published: boolean;
	tags: string[];
	image?: string;
	slug?: string;
}

export interface Post {
	metadata: PostMetadata;
	content: ConstructorOfATypedSvelteComponent;
}

export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	topics: string[];
	created_at: string;
	updated_at: string;
	pushed_at: string;
}

export interface ContactInfo {
	email: string;
	phone: string;
	address: string;
	github: string;
	linkedin: string;
}

export interface SiteData {
	name: string;
	title: string;
	description: string;
	aboutDescription: string;
	skills: string[];
	contact: ContactInfo;
}
