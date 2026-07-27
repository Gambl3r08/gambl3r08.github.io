import { writable, derived } from 'svelte/store';
import { translations, type Language } from './translations';

// Store para el idioma actual
function createLanguageStore() {
	const { subscribe, set, update } = writable<Language>('es');

	// Screen readers pick pronunciation from <html lang>. Leaving it on the
	// hardcoded "es" made English content read with a Spanish voice.
	function persist(lang: Language) {
		if (typeof window === 'undefined') return;
		localStorage.setItem('language', lang);
		document.documentElement.lang = lang;
	}

	return {
		subscribe,
		set: (lang: Language) => {
			persist(lang);
			set(lang);
		},
		toggle: () => {
			update((current) => {
				const newLang: Language = current === 'es' ? 'en' : 'es';
				persist(newLang);
				return newLang;
			});
		},
		init: () => {
			if (typeof window === 'undefined') return;
			const saved = localStorage.getItem('language') as Language | null;
			const lang: Language = saved === 'es' || saved === 'en' ? saved : 'es';
			document.documentElement.lang = lang;
			set(lang);
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
