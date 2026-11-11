import { useEffect, useRef, useState } from "react";
export interface Telemetry {
	fps: number;
	clock: number;
	frames: number;
}
export function useTelemetry(running: boolean): Telemetry {
	const [telemetry, setTelemetry] = useState<Telemetry>({
		fps: 0,
		clock: 0,
		frames: 0,
	});
	const raf = useRef<number>(0);
	const last = useRef<number>(performance.now());
	const smoothed = useRef<number>(60);
	const clock = useRef<number>(0);
	const frames = useRef<number>(0);
	const runningRef = useRef<boolean>(running);
	runningRef.current = running;
	useEffect(() => {
		let mounted = true;
		const tick = (now: number) => {
			const dt = now - last.current;
			last.current = now;
			if (dt > 0) {
				const inst = 1000 / dt;
				smoothed.current = smoothed.current * 0.9 + inst * 0.1;
			}
			if (runningRef.current) {
				clock.current += dt / 1000;
				frames.current += 1;
			}
			if (mounted) {
				setTelemetry({
					fps: runningRef.current ? Math.round(smoothed.current) : 0,
					clock: clock.current,
					frames: frames.current,
				});
			}
			raf.current = requestAnimationFrame(tick);
		};
		raf.current = requestAnimationFrame(tick);
		return () => {
			mounted = false;
			cancelAnimationFrame(raf.current);
		};
	}, []);
	return telemetry;
}
