import { useEffect, useRef, useState } from "react";
export interface Telemetry {
	fps: number;
	frame: number;
	uptime: number;
}
export function useTelemetry(): Telemetry {
	const [tel, setTel] = useState<Telemetry>({
		fps: 60,
		frame: 0,
		uptime: 0,
	});
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
			if (dt > 0) {
				count.current += 1;
				acc.current += dt;
			}
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
