/**
 * Svelte action for scroll-reveal animations using IntersectionObserver.
 * Usage: <div use:reveal> or <div use:reveal={{ delay: 200 }}>
 * Add class "reveal", "reveal-left", "reveal-right", or "reveal-scale" to the element.
 */

interface RevealOptions {
	/** Delay in ms before the reveal animation starts */
	delay?: number;
	/**
	 * How far above the bottom of the viewport, in px, the element's leading
	 * edge must travel before it reveals. Larger values fire later.
	 */
	offset?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, offset = 80 } = options;

	let timer: ReturnType<typeof setTimeout> | undefined;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (delay > 0) {
						timer = setTimeout(() => {
							node.classList.add('revealed');
						}, delay);
					} else {
						node.classList.add('revealed');
					}
					observer.unobserve(node);
				}
			});
		},
		// Deliberately a margin and not a ratio threshold. `intersectionRatio` is
		// measured against the *element*, so anything taller than the viewport
		// can never reach a meaningful one: a 13 000 px README in a 900 px window
		// peaks at 0.07, so the old `threshold: 0.15` never fired and the element
		// sat at `opacity: 0` forever. Insetting the root bottom instead is
		// independent of how tall the target is.
		{ threshold: 0, rootMargin: `0px 0px -${offset}px 0px` }
	);

	observer.observe(node);

	return {
		destroy() {
			// A pending delay would otherwise fire after the node is gone —
			// noticeable when navigating away mid-reveal.
			clearTimeout(timer);
			observer.disconnect();
		}
	};
}
