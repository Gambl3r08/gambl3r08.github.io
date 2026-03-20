import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('light');

	function applyTheme(theme: Theme) {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', theme === 'dark');
			document.documentElement.style.colorScheme = theme;
		}
	}

	return {
		subscribe,
		set: (theme: Theme) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('theme', theme);
			}
			applyTheme(theme);
			set(theme);
		},
		toggle: () => {
			let current: Theme = 'light';
			subscribe((v) => (current = v))();
			const next: Theme = current === 'light' ? 'dark' : 'light';
			if (typeof window !== 'undefined') {
				localStorage.setItem('theme', next);
			}
			applyTheme(next);
			set(next);
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem('theme') as Theme | null;
				const theme: Theme = saved === 'dark' ? 'dark' : 'light';
				applyTheme(theme);
				set(theme);
			}
		}
	};
}

export const theme = createThemeStore();
