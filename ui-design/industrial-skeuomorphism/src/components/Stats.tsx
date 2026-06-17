import { motion } from "motion/react";
import { Container, Led } from "./primitives";
import { useCountUp } from "../lib/useCountUp";
import { inView, slideUp, stagger } from "../lib/motion";

type Stat = {
	target: number;
	decimals?: number;
	prefix?: string;
	suffix?: string;
	label: string;
};

const STATS: Stat[] = [
	{ target: 4200, suffix: "+", label: "Units in the field" },
	{ target: 99.99, decimals: 2, suffix: "%", label: "Measured uptime" },
	{ target: 12, suffix: "ms", label: "Median actuation" },
	{ target: 38, label: "Plants connected" },
];

function StatItem({ s }: { s: Stat }) {
	const { value, ref } = useCountUp(s.target);
	const display =
		(s.prefix ?? "") +
		value.toLocaleString("en-US", {
			minimumFractionDigits: s.decimals ?? 0,
			maximumFractionDigits: s.decimals ?? 0,
		}) +
		(s.suffix ?? "");
	return (
		<motion.div
			variants={slideUp}
			className="relative flex flex-col items-center gap-2 px-4 py-2 text-center"
		>
			<span
				ref={ref}
				className="font-mono text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] md:text-5xl"
			>
				{display}
			</span>
			<span className="stamp text-[0.6rem] text-slate-soft">{s.label}</span>
		</motion.div>
	);
}

export function Stats() {
	return (
		<section aria-label="Key metrics">
			<Container>
				<div
					className="carbon relative overflow-hidden rounded-2xl px-6 py-12 md:px-12"
					style={{
						backgroundColor: "var(--color-slate)",
						backgroundBlendMode: "overlay",
						boxShadow:
							"var(--shadow-card), inset 0 1px 0 rgba(255,255,255,0.06)",
					}}
				>
					{/* top-left lighting hotspot on the dark panel */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full"
						style={{
							background:
								"radial-gradient(circle, rgba(127,176,204,0.18), transparent 70%)",
						}}
					/>
					{/* status header */}
					<div className="mb-8 flex items-center justify-center gap-2">
						<Led tone="online" size={9} label="metrics live" />
						<span className="stamp text-[0.6rem] text-slate-soft/80">
							LIVE&nbsp;FLEET&nbsp;METRICS&nbsp;//&nbsp;REFRESHED&nbsp;1s&nbsp;AGO
						</span>
					</div>
					<motion.div
						variants={stagger}
						initial="hidden"
						whileInView="show"
						viewport={inView}
						className="grid grid-cols-2 gap-y-8 divide-edge-deep/20 md:grid-cols-4 md:divide-x"
					>
						{STATS.map((s) => (
							<StatItem key={s.label} s={s} />
						))}
					</motion.div>
				</div>
			</Container>
		</section>
	);
}
