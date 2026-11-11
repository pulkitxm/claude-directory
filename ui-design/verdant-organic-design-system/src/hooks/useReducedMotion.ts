import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";


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
