<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<button
	onclick={() => theme.toggle()}
	class="theme-toggle"
	aria-label={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
	title={$theme === 'light' ? 'Dark mode' : 'Light mode'}
>
	<div class="toggle-track" class:dark={$theme === 'dark'}>
		<div class="toggle-thumb" class:dark={$theme === 'dark'}>
			<!-- Sun icon -->
			<svg
				class="icon sun"
				class:active={$theme === 'light'}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="5" />
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
				<line x1="1" y1="12" x2="3" y2="12" />
				<line x1="21" y1="12" x2="23" y2="12" />
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
			</svg>
			<!-- Moon icon -->
			<svg
				class="icon moon"
				class:active={$theme === 'dark'}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>
		</div>
	</div>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
	}

	.toggle-track {
		position: relative;
		width: 48px;
		height: 26px;
		border-radius: 13px;
		background: linear-gradient(135deg, #fbbf24, #f59e0b);
		border: 1px solid rgba(0, 0, 0, 0.1);
		transition: background 0.4s ease, border-color 0.4s ease;
	}

	.toggle-track.dark {
		background: linear-gradient(135deg, #1e293b, #0f172a);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: white;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
		transition: transform 0.4s cubic-bezier(0.68, -0.15, 0.27, 1.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-thumb.dark {
		transform: translateX(22px);
		background: #1e293b;
	}

	.icon {
		position: absolute;
		width: 12px;
		height: 12px;
		transition: opacity 0.3s ease, transform 0.3s ease;
		opacity: 0;
		transform: scale(0.5) rotate(-90deg);
	}

	.icon.active {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}

	.sun {
		color: #f59e0b;
	}

	.moon {
		color: #94a3b8;
	}
</style>
