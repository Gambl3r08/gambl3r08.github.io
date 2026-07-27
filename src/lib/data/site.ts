import type { SiteData } from '$lib/types';

/**
 * Canonical origin, without a trailing slash.
 *
 * Must be a constant rather than `$page.url.origin`: during prerendering the
 * origin resolves to the internal `http://sveltekit-prerender` host, which was
 * being baked into canonical links, og:url and og:image.
 */
export const SITE_URL = 'https://gambl3r08.github.io';

/** First year of professional experience. The only number to edit. */
export const CAREER_START_YEAR = 2020;

/**
 * Years of experience, derived from the calendar year so the figure never goes
 * stale (2026 → 6, 2027 → 7, …).
 *
 * Evaluated when the module loads: at build time for the prerendered HTML, and
 * again in the browser on hydration — so a visitor whose clock has rolled into
 * the next year sees the updated number even before the site is rebuilt.
 */
export const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

export const siteData: SiteData = {
	name: 'Roberto Lozada',
	title: 'Desarrollador de Software',
	description: `Especializado en automatización de redes y sistemas inteligentes con IA. +${yearsOfExperience} años de experiencia.`,
	aboutDescription: `Desarrollador de software con más de ${yearsOfExperience} años de experiencia en automatización de redes y sistemas de IA.`,
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
