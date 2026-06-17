import { useEffect, useRef, useState } from "react";

/**
 * Count a number up from 0 → target once the element scrolls into view.
 * Returns the live value and a ref to attach. Respects reduced motion by
 * jumping straight to the target.
 */
export function useCountUp(target: number, durationMs = 1600) {
	const ref = useRef<HTMLSpanElement | null>(null);
	const [value, setValue] = useState(0);
	const started = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReduced) {
			setValue(target);
			return;
		}

		const run = () => {
			if (started.current) return;
			started.current = true;
			const start = performance.now();
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / durationMs);
				// easeOutCubic for a snappy, decelerating count
				const eased = 1 - Math.pow(1 - t, 3);
				setValue(target * eased);
				if (t < 1) requestAnimationFrame(tick);
				else setValue(target);
			};
			requestAnimationFrame(tick);
		};

		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						run();
						io.disconnect();
					}
				}
			},
			{ threshold: 0.4 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [target, durationMs]);

	return { ref, value };
}
