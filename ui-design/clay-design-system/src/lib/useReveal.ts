import { useEffect, useRef, useState } from "react";


export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
	threshold?: number;
	rootMargin?: string;
}) {
	const ref = useRef<T | null>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Respect reduced motion ,  show immediately, never animate.
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
