import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('light');

	function applyTheme(theme: Theme) {
		if (typeof document === 'undefined') return;

		document.documentElement.classList.toggle('dark', theme === 'dark');
		document.documentElement.style.colorScheme = theme;

		// Drives the mobile browser chrome colour.
		const meta = document.getElementById('theme-color') as HTMLMetaElement | null;
		if (meta) meta.content = theme === 'dark' ? '#0f172a' : '#f8fafc';
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
			if (typeof window === 'undefined') return;

			const media = window.matchMedia('(prefers-color-scheme: dark)');
			const saved = localStorage.getItem('theme') as Theme | null;

			// Mirrors the inline script in app.html: an explicit choice wins,
			// otherwise follow the OS.
			const resolved: Theme =
				saved === 'dark' || saved === 'light' ? saved : media.matches ? 'dark' : 'light';

			applyTheme(resolved);
			set(resolved);

			// Keep following the OS until the visitor picks a theme themselves.
			const onSystemChange = (e: MediaQueryListEvent) => {
				if (localStorage.getItem('theme')) return;
				const next: Theme = e.matches ? 'dark' : 'light';
				applyTheme(next);
				set(next);
			};
			media.addEventListener('change', onSystemChange);
			return () => media.removeEventListener('change', onSystemChange);
		}
	};
}

export const theme = createThemeStore();
