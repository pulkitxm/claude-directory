import { useEffect, useRef, useState } from "react";
export interface Telemetry {
	fps: number;
	frame: number;
	uptime: number;
}
export function useTelemetry(active = true): Telemetry {
	const [t, setT] = useState<Telemetry>({
		fps: 0,
		frame: 0,
		uptime: 0,
	});
	const raf = useRef<number>(0);
	const start = useRef<number>(0);
	const last = useRef<number>(0);
	const frames = useRef<number>(0);
	const ema = useRef<number>(60);
	useEffect(() => {
		if (!active) return;
		let mounted = true;
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
				ema.current = ema.current * 0.9 + inst * 0.1;
			}
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
