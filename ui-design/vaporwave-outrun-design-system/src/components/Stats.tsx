import { useEffect, useRef, useState } from "react";
import { Reveal, Section, Shell } from "./primitives";

type Stat = {
	value: number;
	suffix: string;
	label: string;
	decimals?: number;
};

const STATS: Stat[] = [
	{ value: 100, suffix: "%", label: "Pure neon saturation" },
	{ value: 2088, suffix: "", label: "Year of operation" },
	{ value: 60, suffix: "fps", label: "CRT refresh, locked" },
	{ value: 4.9, suffix: "/5", label: "Operator rating", decimals: 1 },
];

/* Count-up that only fires once the band scrolls into view. */
function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
	const [n, setN] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const started = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Mechanical count-up from 0 -> value once the cell is on screen.
		const run = () => {
			if (started.current) return;
			started.current = true;
			const DURATION = 1200;
			const t0 = performance.now();
			const step = (t: number) => {
				const p = Math.min(1, (t - t0) / DURATION);
				const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
				setN(p < 1 ? value * eased : value);
				if (p < 1) requestAnimationFrame(step);
			};
			requestAnimationFrame(step);
		};

		// Kick off immediately if already visible (covers fast loads / short pages),
		// otherwise wait for it to scroll into view. threshold:0 = any pixel.
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			run();
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					run();
					io.disconnect();
				}
			},
			{ threshold: 0, rootMargin: "0px 0px -10% 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [value]);

	return (
		<span ref={ref}>
			{n.toLocaleString("en-US", {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			})}
		</span>
	);
}

export function Stats() {
	return (
		<Section className="z-10 py-16 sm:py-20">
			<Shell>
				<div className="window">
					<div className="window-bar">
						<div className="window-dots" aria-hidden>
							<i className="bg-[var(--color-magenta)]" />
							<i className="bg-[var(--color-cyan)]" />
							<i className="bg-[var(--color-orange)]" />
						</div>
						<span className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
							system://telemetry
						</span>
					</div>
					<div className="grid grid-cols-1 divide-y divide-[var(--color-cyan)]/20 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
						{STATS.map((s, i) => (
							<Reveal
								key={s.label}
								delay={i * 0.08}
								className="p-8 text-center"
							>
								<div className="text-sunset font-heading text-4xl font-black sm:text-5xl">
									<CountUp value={s.value} decimals={s.decimals} />
									{s.suffix}
								</div>
								<div className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--color-chrome)]/60">
									{s.label}
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</Shell>
		</Section>
	);
}
