import { useEffect, useRef, useState } from "react";

/**
 * Animate a number from 0 -> target the first time the element scrolls into
 * view. Respects prefers-reduced-motion (jumps straight to the target).
 */
export function useCountUp(target: number, duration = 1400) {
	const [value, setValue] = useState(0);
	const ref = useRef<HTMLSpanElement | null>(null);
	const done = useRef(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const run = () => {
			if (done.current) return;
			done.current = true;
			if (reduce) {
				setValue(target);
				return;
			}
			const start = performance.now();
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / duration);
				// easeOutCubic
				const eased = 1 - Math.pow(1 - t, 3);
				setValue(target * eased);
				if (t < 1) requestAnimationFrame(tick);
				else setValue(target);
			};
			requestAnimationFrame(tick);
		};

		const obs = new IntersectionObserver(
			(entries) => entries.forEach((e) => e.isIntersecting && run()),
			{ threshold: 0.4 },
		);
		obs.observe(node);
		return () => obs.disconnect();
	}, [target, duration]);

	return { value, ref };
}
