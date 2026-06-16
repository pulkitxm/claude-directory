import { useEffect, useRef, useState } from "react";

/* Reveal-on-scroll hook. Returns a ref + a boolean that flips true once the
   element enters the viewport. Used to fade/rise sections in like notes being
   pinned to the board. Honors prefers-reduced-motion by revealing immediately. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
	rootMargin = "-12% 0px -10% 0px",
) {
	const ref = useRef<T | null>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (
			typeof window !== "undefined" &&
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
		) {
			setShown(true);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setShown(true);
						io.disconnect();
						break;
					}
				}
			},
			{ rootMargin, threshold: 0.05 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [rootMargin]);

	return { ref, shown };
}
