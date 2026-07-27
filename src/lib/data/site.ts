import type { SiteData } from '$lib/types';

/**
 * Canonical origin, without a trailing slash.
 *
 * Must be a constant rather than `$page.url.origin`: during prerendering the
 * origin resolves to the internal `http://sveltekit-prerender` host, which was
 * being baked into canonical links, og:url and og:image.
 */
export const SITE_URL = 'https://gambl3r08.github.io';

export const siteData: SiteData = {
	name: 'Roberto Lozada',
	title: 'Desarrollador de Software',
	description:
		'Especializado en automatización de redes y sistemas inteligentes con IA. +5 años de experiencia.',
	aboutDescription:
		'Desarrollador de software con más de 5 años de experiencia en automatización de redes y sistemas de IA.',
	skills: [
		'Python',
		'Go',
		'Rust',
		'.NET',
		'TypeScript',
		'FastAPI',
		'OpenAI Agents SDK',
		'LangChain',
		'PostgreSQL',
		'Docker',
		'Kubernetes',
		'React',
		'GCP',
		'AWS',
		'Apache Kafka',
		'Netmiko',
		'NAPALM',
		'Ansible',
		'Redis',
		'ChromaDB',
		'SQLAlchemy',
		'Clean Architecture'
	],
	contact: {
		email: 'robertojoselozada@gmail.com',
		address: 'Barranquilla, Colombia',
		github: 'gambl3r08',
		linkedin: 'roberto-lozada-ariza-37317a180'
	}
};
