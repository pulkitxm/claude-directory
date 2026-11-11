import { useEffect, useRef, useState } from "react";


export function useReveal<T extends HTMLElement = HTMLDivElement>(
	options: { threshold?: number; rootMargin?: string } = {},
) {
	const { threshold = 0.18, rootMargin = "0px 0px -10% 0px" } = options;
	const ref = useRef<T>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const reduce =
			typeof window !== "undefined" &&
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		if (reduce) {
			setShown(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setShown(true);
						observer.disconnect();
					}
				}
			},
			{ threshold, rootMargin },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	return { ref, shown };
}
