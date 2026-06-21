import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's `prefers-reduced-motion` setting so components can opt out
 * of entrance animations and ambient drift. Reads the media query synchronously
 * on the first render (via a lazy initializer) so reduced-motion users never
 * see a one-frame flash of motion before an effect corrects the value.
 */
export function useReducedMotion(): boolean {
	const [reduced, setReduced] = useState(() =>
		typeof window !== "undefined" && "matchMedia" in window
			? window.matchMedia(QUERY).matches
			: false,
	);

	useEffect(() => {
		const mq = window.matchMedia(QUERY);
		setReduced(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	return reduced;
}
