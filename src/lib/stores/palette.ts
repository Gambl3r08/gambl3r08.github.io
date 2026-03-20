import { writable } from 'svelte/store';

export type PaletteId = 'amber-fire' | 'indigo' | 'tangerine' | 'burnt-coral' | 'peach-copper' | 'sunset';

export interface Palette {
	id: PaletteId;
	name: string;
	accent: string;
	secondary: string;
}

export const palettes: Palette[] = [
	{ id: 'amber-fire', name: 'Amber Fire', accent: '#f59e0b', secondary: '#f97316' },
	{ id: 'indigo', name: 'Indigo', accent: '#6366f1', secondary: '#8b5cf6' },
	{ id: 'tangerine', name: 'Tangerine', accent: '#f97316', secondary: '#ea580c' },
	{ id: 'burnt-coral', name: 'Burnt Coral', accent: '#e8613c', secondary: '#d94f2b' },
	{ id: 'peach-copper', name: 'Peach Copper', accent: '#e07c4f', secondary: '#c96830' },
	{ id: 'sunset', name: 'Sunset', accent: '#f97316', secondary: '#ef4444' }
];

function createPaletteStore() {
	const { subscribe, set } = writable<PaletteId>('amber-fire');

	function apply(id: PaletteId) {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-palette', id);
		}
	}

	return {
		subscribe,
		set: (id: PaletteId) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('palette', id);
			}
			apply(id);
			set(id);
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const saved = localStorage.getItem('palette') as PaletteId | null;
				const valid = palettes.some((p) => p.id === saved);
				const id: PaletteId = valid && saved ? saved : 'amber-fire';
				apply(id);
				set(id);
			}
		}
	};
}

export const palette = createPaletteStore();
