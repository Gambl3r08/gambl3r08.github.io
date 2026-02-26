/**
 * Svelte action for scroll-reveal animations using IntersectionObserver.
 * Usage: <div use:reveal> or <div use:reveal={{ delay: 200 }}>
 * Add class "reveal", "reveal-left", "reveal-right", or "reveal-scale" to the element.
 */

interface RevealOptions {
	/** Delay in ms before the reveal animation starts */
	delay?: number;
	/** IntersectionObserver threshold (0-1) */
	threshold?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.15 } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (delay > 0) {
						setTimeout(() => {
							node.classList.add('revealed');
						}, delay);
					} else {
						node.classList.add('revealed');
					}
					observer.unobserve(node);
				}
			});
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
