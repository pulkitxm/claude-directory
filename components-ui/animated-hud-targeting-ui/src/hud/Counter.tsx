import { useEffect, useRef, useState } from "react";

interface CounterProps {
	value: number;
	decimals?: number;
	/** seconds to ease toward a new value */
	ease?: number;
	className?: string;
}

/** A tabular-nums readout that eases toward its target value (no layout shift). */
export function Counter({ value, decimals = 0, ease = 0.45, className }: CounterProps) {
	const [display, setDisplay] = useState(value);
	const fromRef = useRef(value);
	const startRef = useRef(0);
	const targetRef = useRef(value);

	useEffect(() => {
		fromRef.current = display;
		targetRef.current = value;
		startRef.current = performance.now();
		let raf = 0;
		const dur = ease * 1000;
		const step = (now: number) => {
			const t = dur <= 0 ? 1 : Math.min(1, (now - startRef.current) / dur);
			const k = 1 - Math.pow(1 - t, 3); // easeOutCubic
			setDisplay(fromRef.current + (targetRef.current - fromRef.current) * k);
			if (t < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, ease]);

	return (
		<span className={`tnum ${className ?? ""}`}>{display.toFixed(decimals)}</span>
	);
}
