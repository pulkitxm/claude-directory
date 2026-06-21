import { useEffect, useState } from "react";

/**
 * Reports whether the user prefers reduced motion. Components use this to
 * substitute static fallbacks for parallax, floating blobs, and spotlights so
 * essential interactions keep working without animation.
 */
export function usePrefersReducedMotion(): boolean {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	return reduced;
}
