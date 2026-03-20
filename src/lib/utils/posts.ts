import type { PostMetadata } from '$lib/types';

function estimateReadingTime(content: string): number {
	const text = content.replace(/<[^>]*>/g, '').replace(/[#*`~\[\]()]/g, '');
	const words = text.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(words / 200));
}

export async function getAllPosts(lang?: 'es' | 'en'): Promise<PostMetadata[]> {
	const allPostFiles = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts: PostMetadata[] = [];

	for (const path in allPostFiles) {
		const file = allPostFiles[path] as { metadata: PostMetadata; default: { render: () => { html: string } } };
		const slug = path.replace('/src/posts/', '').replace('.md', '');

		if (file.metadata?.published) {
			// Si se especifica idioma, filtrar por él
			if (lang && file.metadata.lang !== lang) {
				continue;
			}

			// Calculate reading time from raw file content
			let readingTime = 1;
			try {
				const rendered = file.default?.render?.();
				if (rendered?.html) {
					readingTime = estimateReadingTime(rendered.html);
				}
			} catch {
				// fallback: estimate from description
				readingTime = 1;
			}

			posts.push({
				...file.metadata,
				slug,
				readingTime
			});
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
