import { useEffect, useRef, useState } from "react";

export interface Telemetry {
	/** Smoothed frames-per-second. */
	fps: number;
	/** Total frames observed since mount. */
	frame: number;
	/** Seconds elapsed since mount. */
	uptime: number;
}

/**
 * A tiny rAF-driven telemetry loop. It is independent of the shader's own clock
 * but runs in lockstep with the browser's compositor, so the readout it exposes
 * (FPS / frame count / uptime) is a faithful proxy for how smoothly the Warp
 * background is being driven. EMA-smoothed so the FPS number reads stable.
 */
export function useTelemetry(active = true): Telemetry {
	const [t, setT] = useState<Telemetry>({ fps: 0, frame: 0, uptime: 0 });
	const raf = useRef<number>(0);
	const start = useRef<number>(0);
	const last = useRef<number>(0);
	const frames = useRef<number>(0);
	const ema = useRef<number>(60);

	useEffect(() => {
		if (!active) return;
		let mounted = true;
		// Reset every accumulator so a StrictMode remount (or an active toggle)
		// starts a clean measurement instead of inheriting the throwaway mount's
		// frame count and EMA.
		start.current = performance.now();
		last.current = start.current;
		frames.current = 0;
		ema.current = 60;

		const tick = (now: number) => {
			if (!mounted) return;
			const dt = now - last.current;
			last.current = now;
			frames.current += 1;
			if (dt > 0) {
				const inst = 1000 / dt;
				// Exponential moving average keeps the readout from jittering.
				ema.current = ema.current * 0.9 + inst * 0.1;
			}
			// Throttle React state updates to ~6Hz; the loop itself stays at rAF.
			if (frames.current % 10 === 0) {
				setT({
					fps: Math.round(ema.current),
					frame: frames.current,
					uptime: (now - start.current) / 1000,
				});
			}
			raf.current = requestAnimationFrame(tick);
		};
		raf.current = requestAnimationFrame(tick);

		return () => {
			mounted = false;
			cancelAnimationFrame(raf.current);
		};
	}, [active]);

	return t;
}
