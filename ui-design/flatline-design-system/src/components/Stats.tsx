import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Shell, Reveal, Eyebrow } from "./primitives";

/* STATS — multi-color numbers, each stat a different accent. White section so
   the colored numerals pop as pure graphic marks. */
const STATS = [
	{
		value: 0,
		target: 100,
		suffix: "%",
		label: "Flat. Zero box-shadows.",
		color: "var(--color-brand)",
	},
	{
		value: 0,
		target: 7,
		suffix: "",
		label: "Design tokens, one source",
		color: "var(--color-grass)",
	},
	{
		value: 0,
		target: 60,
		suffix: "fps",
		label: "Snappy 200ms interactions",
		color: "var(--color-sun)",
	},
	{
		value: 0,
		target: 4.9,
		suffix: "/5",
		label: "Loved by designers",
		color: "var(--color-ink)",
		decimals: 1,
	},
];

function CountUp({
	target,
	suffix,
	decimals = 0,
}: {
	target: number;
	suffix: string;
	decimals?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.6 });
	const [val, setVal] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const duration = 1100;
		let raf = 0;
		let start = 0;
		const tick = (t: number) => {
			if (!start) start = t;
			const p = Math.min((t - start) / duration, 1);
			// easeOutCubic
			const eased = 1 - Math.pow(1 - p, 3);
			setVal(target * eased);
			if (p < 1) raf = requestAnimationFrame(tick);
			else setVal(target);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, target]);

	return (
		<span ref={ref}>
			{val.toFixed(decimals)}
			{suffix}
		</span>
	);
}

export function Stats() {
	return (
		<section className="bg-[var(--color-canvas)] py-20 lg:py-24">
			<Shell>
				<Reveal className="mx-auto max-w-2xl text-center">
					<Eyebrow className="text-[var(--color-brand)]">
						By the numbers
					</Eyebrow>
					<h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
						Reduction you can measure.
					</h2>
				</Reveal>

				<div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
					{STATS.map((s, i) => (
						<Reveal key={s.label} delay={i * 0.08} className="text-center">
							<div
								className="text-6xl font-extrabold leading-none tracking-tight sm:text-7xl"
								style={{ color: s.color }}
							>
								<CountUp
									target={s.target}
									suffix={s.suffix}
									decimals={s.decimals ?? 0}
								/>
							</div>
							<p className="mt-3 text-sm font-medium text-gray-500">
								{s.label}
							</p>
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}
