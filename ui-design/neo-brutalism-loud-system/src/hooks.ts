import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/* Tracks the user's reduced-motion preference reactively. Used to skip mounting
   animated marquee tracks and to short-circuit count-ups / reveals. */
export function useReducedMotion(): boolean {
	const [reduced, setReduced] = useState(() => {
		if (typeof window === "undefined" || !window.matchMedia) return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	});

	useEffect(() => {
		if (!window.matchMedia) return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setReduced(mq.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	return reduced;
}

/* Returns [ref, inView] — flips true the first time the element scrolls into
   view. Drives the staggered "snap-in" reveals. Honors reduced motion by
   reporting inView immediately. */
export function useInView<T extends HTMLElement>(
	options: IntersectionObserverInit = { threshold: 0.2 },
): [RefObject<T>, boolean] {
	const ref = useRef<T>(null) as RefObject<T>;
	const reduced = useReducedMotion();
	const [inView, setInView] = useState(false);

	useEffect(() => {
		if (reduced) {
			setInView(true);
			return;
		}
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") {
			setInView(true);
			return;
		}
		const obs = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setInView(true);
					obs.disconnect();
				}
			}
		}, options);
		obs.observe(el);
		return () => obs.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reduced]);

	return [ref, inView];
}

/* Counts up to `target` once `active` is true. Reduced motion jumps straight
   to the final value. Mechanical, fast (700ms) ease-out. */
export function useCountUp(target: number, active: boolean, durationMs = 700) {
	const reduced = useReducedMotion();
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!active) return;
		if (reduced) {
			setValue(target);
			return;
		}
		let raf = 0;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min((now - start) / durationMs, 1);
			// ease-out cubic
			const eased = 1 - Math.pow(1 - t, 3);
			setValue(target * eased);
			if (t < 1) raf = requestAnimationFrame(tick);
			else setValue(target);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [active, target, durationMs, reduced]);

	return value;
}
