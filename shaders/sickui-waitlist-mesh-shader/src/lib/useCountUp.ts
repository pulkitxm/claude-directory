import { useEffect, useRef, useState } from "react";

/**
 * Animate a number from `from` to `to` over `duration` ms with an ease-out curve,
 * driven by requestAnimationFrame. Used for the live "people on the waitlist"
 * tally so the hero feels alive the moment it loads (and animates smoothly in the
 * recorded demo, which advances rAF deterministically).
 */
export function useCountUp(to: number, duration = 1600, from = 0): number {
	const [value, setValue] = useState(from);
	const raf = useRef(0);
	const start = useRef(0);

	useEffect(() => {
		const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
		const tick = (now: number) => {
			if (!start.current) start.current = now;
			const t = Math.min(1, (now - start.current) / duration);
			setValue(Math.round(from + (to - from) * easeOut(t)));
			if (t < 1) raf.current = requestAnimationFrame(tick);
		};
		raf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf.current);
	}, [to, duration, from]);

	return value;
}
