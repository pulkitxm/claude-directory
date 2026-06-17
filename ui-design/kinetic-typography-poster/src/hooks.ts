import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 * Components use this to swap kinetic behaviour for static fallbacks
 * (e.g. a marquee that renders its content once instead of scrolling).
 */
export function usePrefersReducedMotion(): boolean {
	const query = "(prefers-reduced-motion: reduce)";
	const [reduced, setReduced] = useState<boolean>(() => {
		if (typeof window === "undefined" || !window.matchMedia) return false;
		return window.matchMedia(query).matches;
	});

	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mql = window.matchMedia(query);
		const onChange = () => setReduced(mql.matches);
		// Reconcile once in case the setting changed between the lazy initializer
		// and effect mount, then track future changes.
		setReduced(mql.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return reduced;
}
