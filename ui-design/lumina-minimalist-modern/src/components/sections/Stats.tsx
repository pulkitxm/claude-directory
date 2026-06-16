import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeInUp, stagger, viewport } from "@/lib/motion";

interface Stat {
	value: number;
	suffix: string;
	prefix?: string;
	label: string;
	decimals?: number;
}

const STATS: Stat[] = [
	{ value: 4200, suffix: "+", label: "Teams shipping with Lumina" },
	{ value: 99.98, suffix: "%", label: "Pipeline uptime, last 12 months", decimals: 2 },
	{ value: 38, suffix: "M", label: "Events processed every minute" },
	{ value: 6.5, suffix: "x", label: "Faster time to first insight", decimals: 1 },
];

/** Counts a number up from 0 once it scrolls into view. */
function useCountUp(target: number, run: boolean, decimals = 0, duration = 1400) {
	const [value, setValue] = useState(0);
	useEffect(() => {
		if (!run) return;
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			setValue(target);
			return;
		}
		let raf = 0;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min((now - start) / duration, 1);
			// easeOutCubic
			const eased = 1 - Math.pow(1 - t, 3);
			setValue(target * eased);
			if (t < 1) raf = requestAnimationFrame(tick);
			else setValue(target);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, run, duration]);
	return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
	const display = useCountUp(stat.value, run, stat.decimals ?? 0);
	return (
		<motion.div
			variants={fadeInUp}
			className="relative px-2 py-6 text-center md:py-2 md:text-left"
		>
			<div className="font-display text-4xl tracking-tight text-background sm:text-5xl">
				{stat.prefix}
				{display}
				<span className="gradient-text">{stat.suffix}</span>
			</div>
			<p className="mt-2 text-sm leading-relaxed text-white/55">{stat.label}</p>
		</motion.div>
	);
}

export function Stats() {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<section className="relative overflow-hidden bg-foreground py-24 text-background md:py-28">
			{/* Dot-grid texture + corner glow */}
			<div aria-hidden className="dot-texture absolute inset-0" />
			<div
				aria-hidden
				className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-[150px]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-accent-secondary/10 blur-[150px]"
			/>

			<div ref={ref} className="relative mx-auto max-w-6xl px-5">
				<motion.div
					variants={stagger}
					initial="hidden"
					whileInView="visible"
					viewport={viewport}
					className="max-w-2xl"
				>
					<motion.div variants={fadeInUp}>
						<SectionLabel tone="dark">By the numbers</SectionLabel>
					</motion.div>
					<motion.h2
						variants={fadeInUp}
						className="mt-5 font-display text-3xl leading-[1.15] tracking-tight sm:text-[2.5rem]"
					>
						Numbers that hold up
						<br className="hidden sm:block" /> under{" "}
						<span className="gradient-text">real load</span>.
					</motion.h2>
				</motion.div>

				<motion.div
					variants={stagger}
					initial="hidden"
					whileInView="visible"
					viewport={viewport}
					className="mt-12 grid grid-cols-2 gap-y-2 md:mt-16 md:grid-cols-4 md:divide-x md:divide-white/10"
				>
					{STATS.map((stat, i) => (
						<div key={stat.label} className={i > 0 ? "md:pl-8" : ""}>
							<StatItem stat={stat} run={inView} />
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
