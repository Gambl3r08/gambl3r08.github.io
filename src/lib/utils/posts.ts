import type { PostMetadata } from '$lib/types';

export async function getAllPosts(lang?: 'es' | 'en'): Promise<PostMetadata[]> {
	const allPostFiles = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts: PostMetadata[] = [];

	for (const path in allPostFiles) {
		const file = allPostFiles[path] as { metadata: PostMetadata };
		const slug = path.replace('/src/posts/', '').replace('.md', '');

		if (file.metadata?.published) {
			// Si se especifica idioma, filtrar por él
			if (lang && file.metadata.lang !== lang) {
				continue;
			}
			posts.push({
				...file.metadata,
				slug
			});
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
