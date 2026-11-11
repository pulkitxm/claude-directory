import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
	duration?: number;
	decimals?: number;
}


export function useCountUp(
	end: number,
	{ duration = 1600, decimals = 0 }: CountUpOptions = {},
) {
	const [value, setValue] = useState(0);
	const ref = useRef<HTMLElement | null>(null);
	const started = useRef(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReduced) {
			setValue(end);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !started.current) {
						started.current = true;
						const start = performance.now();
						const tick = (now: number) => {
							const progress = Math.min((now - start) / duration, 1);
							// easeOutCubic
							const eased = 1 - Math.pow(1 - progress, 3);
							setValue(end * eased);
							if (progress < 1) requestAnimationFrame(tick);
							else setValue(end);
						};
						requestAnimationFrame(tick);
					}
				});
			},
			{ threshold: 0.4 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [end, duration]);

	const formatted = value.toLocaleString("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	return { value: formatted, ref };
}
