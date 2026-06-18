import { useEffect, useRef, useState } from "react";

export interface Telemetry {
	fps: number;
	frame: number;
	uptime: number; // seconds since mount
}

/**
 * Drives the foundry's live readouts off requestAnimationFrame and
 * performance.now — both of which the demo recorder advances deterministically,
 * so the gauges animate smoothly in the captured video and in real time alike.
 */
export function useTelemetry(): Telemetry {
	const [tel, setTel] = useState<Telemetry>({ fps: 60, frame: 0, uptime: 0 });
	const raf = useRef(0);
	const start = useRef(0);
	const last = useRef(0);
	const frame = useRef(0);
	const acc = useRef(0);
	const count = useRef(0);

	useEffect(() => {
		const loop = (now: number) => {
			if (!start.current) {
				start.current = now;
				last.current = now;
			}
			const dt = now - last.current;
			last.current = now;
			frame.current += 1;
			// Only intervals with a real elapsed time feed the FPS average. The
			// priming frame (dt === 0, before `last` is established) is a true
			// frame for `frame.current` but not a measurable interval, so skipping
			// it here keeps the very first FPS readout from inflating.
			if (dt > 0) {
				count.current += 1;
				acc.current += dt;
			}

			// Recompute the smoothed FPS roughly every ~250ms of virtual time.
			if (acc.current >= 250) {
				const fps = Math.round((count.current * 1000) / acc.current);
				setTel({
					fps: Number.isFinite(fps) ? fps : 60,
					frame: frame.current,
					uptime: (now - start.current) / 1000,
				});
				acc.current = 0;
				count.current = 0;
			}
			raf.current = requestAnimationFrame(loop);
		};
		raf.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf.current);
	}, []);

	return tel;
}
