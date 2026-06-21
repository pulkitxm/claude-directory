import { useEffect, useRef, useState } from "react";

/* Parse a display value like "99.99%", "12,000+", "4.9/5", "180+" into a
   numeric target plus the prefix/suffix to re-wrap around the animated number,
   preserving formatting (commas, decimals) on the way up. */
function parse(display: string) {
	const match = display.match(/-?[\d,]*\.?\d+/);
	if (!match) return null;
	const raw = match[0];
	const target = parseFloat(raw.replace(/,/g, ""));
	const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
	const grouped = raw.includes(",");
	const start = match.index ?? 0;
	return {
		target,
		decimals,
		grouped,
		prefix: display.slice(0, start),
		suffix: display.slice(start + raw.length),
	};
}

const fmt = (n: number, decimals: number, grouped: boolean) => {
	const s = n.toLocaleString("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
		useGrouping: grouped,
	});
	return s;
};

const prefersReduced = () =>
	typeof window !== "undefined" &&
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Count up to a formatted target once the element scrolls into view. Generic
   over the element type so callers can attach the ref without a cast. */
export function useCountUp<T extends HTMLElement = HTMLElement>(
	display: string,
	duration = 1500,
) {
	const parsed = parse(display);
	const ref = useRef<T | null>(null);
	const [text, setText] = useState(
		parsed
			? `${parsed.prefix}${fmt(0, parsed.decimals, parsed.grouped)}${parsed.suffix}`
			: display,
	);
	const done = useRef(false);

	useEffect(() => {
		if (!parsed || done.current) return;
		const el = ref.current;
		if (!el) return;

		if (prefersReduced()) {
			setText(display);
			done.current = true;
			return;
		}

		const obs = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting || done.current) return;
				done.current = true;
				obs.disconnect();
				const startT = performance.now();
				const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
				const tick = (now: number) => {
					const p = Math.min(1, (now - startT) / duration);
					const v = parsed.target * ease(p);
					setText(
						`${parsed.prefix}${fmt(v, parsed.decimals, parsed.grouped)}${parsed.suffix}`,
					);
					if (p < 1) requestAnimationFrame(tick);
					else
						setText(
							`${parsed.prefix}${fmt(parsed.target, parsed.decimals, parsed.grouped)}${parsed.suffix}`,
						);
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 },
		);
		obs.observe(el);
		return () => obs.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [display, duration]);

	return { ref, text };
}
