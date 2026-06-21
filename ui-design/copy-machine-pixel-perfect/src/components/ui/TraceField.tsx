import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The signature element: an SVG that looks like a board mid-route. Copper traces
 * grow along orthogonal/45° paths (real autorouters only turn at 45°), land on
 * pads, and feed pulsing vias. The whole field leans a few pixels toward the
 * pointer for depth. Fully reduced-motion aware (static board when requested).
 */

// 45°-constrained routes across a 1200x760 viewBox.
const TRACES: { d: string; delay: number; color: string }[] = [
	{ d: "M0 140 H180 L260 220 H520 L580 160 H820", delay: 0, color: "#E8A24B" },
	{
		d: "M1200 110 H1020 L940 190 H700 L640 250 H300",
		delay: 0.4,
		color: "#C97A2B",
	},
	{
		d: "M0 360 H140 L220 280 H460 L520 340 H780 L860 260 H1200",
		delay: 0.2,
		color: "#E8A24B",
	},
	{
		d: "M1200 420 H960 L880 500 H560 L500 560 H160",
		delay: 0.7,
		color: "#3DD6D0",
	},
	{
		d: "M0 600 H260 L340 520 H600 L680 600 H1200",
		delay: 0.55,
		color: "#C97A2B",
	},
	{ d: "M600 760 V620 L520 540 V360", delay: 0.9, color: "#E8A24B" },
	{ d: "M260 0 V120 L340 200 V340", delay: 0.3, color: "#3DD6D0" },
	{ d: "M940 0 V180 L860 260 V420", delay: 0.65, color: "#C97A2B" },
];

const PADS: { x: number; y: number; r: number }[] = [
	{ x: 180, y: 140, r: 5 },
	{ x: 820, y: 160, r: 6 },
	{ x: 300, y: 250, r: 5 },
	{ x: 860, y: 260, r: 6 },
	{ x: 160, y: 560, r: 5 },
	{ x: 600, y: 600, r: 6 },
	{ x: 520, y: 360, r: 6 },
	{ x: 340, y: 340, r: 5 },
];

const VIAS: { x: number; y: number }[] = [
	{ x: 520, y: 220 },
	{ x: 640, y: 250 },
	{ x: 680, y: 600 },
	{ x: 880, y: 500 },
	{ x: 460, y: 280 },
];

export function TraceField() {
	const reduce = useReducedMotion();
	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (reduce) return;
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		const onMove = (e: PointerEvent) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const dx = (e.clientX / window.innerWidth - 0.5) * 22;
				const dy = (e.clientY / window.innerHeight - 0.5) * 14;
				el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
			});
		};
		window.addEventListener("pointermove", onMove);
		return () => {
			window.removeEventListener("pointermove", onMove);
			cancelAnimationFrame(raf);
		};
	}, [reduce]);

	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
		>
			<svg
				ref={ref}
				viewBox="0 0 1200 760"
				preserveAspectRatio="xMidYMid slice"
				className="h-full w-full opacity-[0.85] transition-transform duration-300 ease-out [will-change:transform]"
			>
				<defs>
					<filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="2.4" result="b" />
						<feMerge>
							<feMergeNode in="b" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* faint copper underlay of every route */}
				{TRACES.map((t, i) => (
					<path
						key={`u-${i}`}
						d={t.d}
						fill="none"
						stroke={t.color}
						strokeWidth={2}
						strokeLinejoin="round"
						strokeLinecap="round"
						opacity={0.12}
					/>
				))}

				{/* growing copper, drawn on by dasharray */}
				{TRACES.map((t, i) =>
					reduce ? (
						<path
							key={`d-${i}`}
							d={t.d}
							fill="none"
							stroke={t.color}
							strokeWidth={2.5}
							strokeLinejoin="round"
							strokeLinecap="round"
							opacity={0.55}
							filter="url(#trace-glow)"
						/>
					) : (
						<motion.path
							key={`d-${i}`}
							d={t.d}
							fill="none"
							stroke={t.color}
							strokeWidth={2.5}
							strokeLinejoin="round"
							strokeLinecap="round"
							filter="url(#trace-glow)"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 0.62 }}
							transition={{
								pathLength: {
									duration: 2.4,
									delay: t.delay,
									ease: [0.65, 0, 0.35, 1],
								},
								opacity: { duration: 0.4, delay: t.delay },
							}}
						/>
					),
				)}

				{/* SMD pads */}
				{PADS.map((p, i) => (
					<g key={`p-${i}`}>
						<motion.rect
							x={p.x - p.r}
							y={p.y - p.r}
							width={p.r * 2}
							height={p.r * 2}
							rx={1.5}
							fill="#0E171C"
							stroke="#E8A24B"
							strokeWidth={1.6}
							initial={reduce ? false : { scale: 0, opacity: 0 }}
							animate={reduce ? undefined : { scale: 1, opacity: 0.8 }}
							transition={{ duration: 0.4, delay: 1.6 + i * 0.06 }}
							style={{ transformOrigin: `${p.x}px ${p.y}px` }}
						/>
					</g>
				))}

				{/* plated vias that pulse like an active net */}
				{VIAS.map((v, i) => (
					<circle
						key={`v-${i}`}
						cx={v.x}
						cy={v.y}
						r={4}
						fill="#070C0F"
						stroke="#1FB66E"
						strokeWidth={1.8}
						className={reduce ? "" : "animate-pad-pulse"}
						style={{
							transformOrigin: `${v.x}px ${v.y}px`,
							animationDelay: `${i * 0.5}s`,
						}}
					/>
				))}
			</svg>
		</div>
	);
}
