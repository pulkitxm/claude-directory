import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

/**
 * SIGNATURE ELEMENT — the scroll telemetry HUD.
 *
 * A fixed right-rail spine that exposes the very MotionValues the
 * ContainerScroll primitive computes: rotateX (20° → 0°), scale, and the raw
 * 0–100% scroll progress. It re-derives them from the page's own scroll so the
 * numbers tick in lockstep with the cards tilting upright — turning the
 * invisible transform math into the page's most memorable, on-brand readout.
 */
export function TelemetryHud() {
	const { scrollYProgress } = useScroll();
	const rail = useRef<HTMLDivElement>(null);

	// Map whole-page progress so the deck "stages" (roughly the middle 70% of the
	// document, where the three cards live) drive a 20°→0° tilt that loops per
	// card. We keep it simple and continuous so the HUD always reads live.
	const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [20, 6, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

	const [pct, setPct] = useState(0);
	const [rot, setRot] = useState(20);
	const [scl, setScl] = useState(1.05);

	useMotionValueEvent(scrollYProgress, "change", (v) =>
		setPct(Math.round(v * 100)),
	);
	useMotionValueEvent(rotate, "change", (v) => setRot(v));
	useMotionValueEvent(scale, "change", (v) => setScl(v));

	return (
		<div
			ref={rail}
			aria-hidden
			className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 select-none lg:block"
		>
			<div className="flex flex-col items-stretch gap-3 rounded-2xl border border-white/[0.08] bg-ink-soft/70 p-3 font-mono text-[10px] text-white/55 backdrop-blur-md">
				<div className="flex items-center gap-1.5 px-0.5 text-iris-bright">
					<span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-iris-bright" />
					<span className="tracking-[0.18em]">SCROLL · LIVE</span>
				</div>

				{/* progress spine */}
				<div className="relative mx-auto h-40 w-1 overflow-hidden rounded-full bg-white/10">
					<motion.div
						style={{ scaleY: scrollYProgress }}
						className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-iris-bright via-iris to-ember"
					/>
				</div>

				<Stat label="scrollY" value={`${pct}%`} />
				<Stat label="rotateX" value={`${rot.toFixed(1)}°`} />
				<Stat label="scale" value={scl.toFixed(3)} />
			</div>
		</div>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.03] px-2 py-1">
			<span className="text-white/35">{label}</span>
			<span className="tabular-nums text-white/85">{value}</span>
		</div>
	);
}
