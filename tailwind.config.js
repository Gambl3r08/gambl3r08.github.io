/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				base: 'var(--color-base)',
				surface: 'var(--color-surface)',
				'surface-elevated': 'var(--color-surface-elevated)',
				accent: {
					DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
					light: 'rgb(var(--accent-light-rgb) / <alpha-value>)'
				},
				violet: 'rgb(var(--accent-secondary-rgb) / <alpha-value>)',
				heading: 'var(--color-heading)',
				body: 'var(--color-body)',
				muted: 'var(--color-muted)'
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				heading: ['Space Grotesk', 'Inter', 'sans-serif']
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in',
				'slide-up': 'slideUp 0.5s ease-out',
				float: 'float 6s ease-in-out infinite',
				'glow-pulse': 'glowPulse 4s ease-in-out infinite',
				'gradient-shift': 'gradientShift 8s ease infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				glowPulse: {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' }
				},
				gradientShift: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
