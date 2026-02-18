import { writable, derived } from 'svelte/store';
import { translations, type Language } from './translations';

// Store para el idioma actual
function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>('es');

	return {
		subscribe,
		set: (lang: Language) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('language', lang);
			}
			set(lang);
		},
		toggle: () => {
			update((current) => {
				const newLang = current === 'es' ? 'en' : 'es';
				if (typeof window !== 'undefined') {
					localStorage.setItem('language', newLang);
				}
				return newLang;
			});
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem('language') as Language | null;
				if (saved && (saved === 'es' || saved === 'en')) {
					set(saved);
				}
			}
		}
	};
}

export const language = createLanguageStore();

// Store derivado para las traducciones actuales
export const t = derived(language, ($language) => translations[$language]);

// Helper para obtener traducción
export function getTranslation(lang: Language) {
	return translations[lang];
}
