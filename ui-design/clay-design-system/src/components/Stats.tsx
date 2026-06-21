import type { CSSProperties } from "react";
import { useCountUp } from "../lib/useCountUp";
import { Shell, SectionHeading, display, type OrbHue } from "./primitives";

/* Breathing stat orbs. Perfect circles (rounded-full) that inflate/deflate
   gently and grow on hover. Numbers count up on scroll, set in the display
   face. 2 columns on mobile → 4 on desktop. */
type Stat = {
	value: number;
	suffix: string;
	decimals?: number;
	label: string;
	hue: OrbHue;
};

const STATS: Stat[] = [
	{ value: 120, suffix: "+", label: "Clay components", hue: "violet" },
	{ value: 4, suffix: " layers", label: "Per shadow stack", hue: "pink" },
	{
		value: 99.9,
		suffix: "%",
		decimals: 1,
		label: "Tactile satisfaction",
		hue: "sky",
	},
	{ value: 12, suffix: "k+", label: "Happy makers", hue: "emerald" },
];

const orbGradient: Record<OrbHue, string> = {
	violet: "linear-gradient(140deg,#c4b5fd,#7c3aed)",
	pink: "linear-gradient(140deg,#f9a8d4,#db2777)",
	sky: "linear-gradient(140deg,#7dd3fc,#0284c7)",
	emerald: "linear-gradient(140deg,#6ee7b7,#059669)",
	amber: "linear-gradient(140deg,#fcd34d,#d97706)",
	indigo: "linear-gradient(140deg,#a5b4fc,#4f46e5)",
};
const orbTint: Record<OrbHue, string> = {
	violet: "rgba(124,58,237,0.4)",
	pink: "rgba(219,39,119,0.4)",
	sky: "rgba(2,132,199,0.4)",
	emerald: "rgba(5,150,105,0.4)",
	amber: "rgba(217,119,6,0.4)",
	indigo: "rgba(79,70,229,0.4)",
};

function StatOrb({ stat, delay }: { stat: Stat; delay: number }) {
	const { ref, value } = useCountUp(stat.value);
	const display_value = value.toFixed(stat.decimals ?? 0);
	return (
		<div
			className="clay-pop flex flex-col items-center text-center"
			data-shown="true"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div
				style={
					{
						backgroundImage: orbGradient[stat.hue],
						"--orb": orbTint[stat.hue],
					} as CSSProperties
				}
				className="grid aspect-square w-32 animate-clay-breathe place-items-center rounded-full text-white shadow-clay-orb transition-transform duration-300 hover:scale-110 sm:w-36"
			>
				<span
					ref={ref}
					style={display}
					className="text-3xl font-black sm:text-4xl"
				>
					{display_value}
					<span className="text-xl font-extrabold sm:text-2xl">
						{stat.suffix}
					</span>
				</span>
			</div>
			<p
				style={display}
				className="mt-4 text-sm font-bold text-clay-foreground sm:text-base"
			>
				{stat.label}
			</p>
		</div>
	);
}

export function Stats() {
	return (
		<section id="stats" className="py-16 sm:py-24">
			<Shell>
				<SectionHeading
					eyebrow="By the numbers"
					title="Substance you can feel"
					lead="Every figure below is rendered in clay too — breathing orbs that grow when you reach for them."
				/>
				<div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8">
					{STATS.map((s, i) => (
						<StatOrb key={s.label} stat={s} delay={i * 90} />
					))}
				</div>
			</Shell>
		</section>
	);
}
