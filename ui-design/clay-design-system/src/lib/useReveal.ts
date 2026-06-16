import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook. Returns a ref to attach and a boolean once the element has
 * entered the viewport (one-shot). Pairs with the `.clay-reveal` /
 * `.clay-pop` CSS classes that animate when `data-shown="true"`.
 *
 * Centralized so every section animates in with one consistent motion instead
 * of each component re-implementing an IntersectionObserver.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
	options?: { threshold?: number; rootMargin?: string },
) {
	const ref = useRef<T | null>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Respect reduced motion — show immediately, never animate.
		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReduced) {
			setShown(true);
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setShown(true);
						io.disconnect();
					}
				}
			},
			{
				threshold: options?.threshold ?? 0.18,
				rootMargin: options?.rootMargin ?? "0px 0px -8% 0px",
			},
		);
		io.observe(el);
		return () => io.disconnect();
	}, [options?.threshold, options?.rootMargin]);

	return { ref, shown };
}
