import type { ReactNode, CSSProperties } from "react";
import { Download, Combine, Rocket } from "lucide-react";
import {
	Shell,
	SectionHeading,
	Reveal,
	display,
	type OrbHue,
} from "./primitives";

/* Three big numbered steps. Each number lives in a convex clay circle that
   scales up on group-hover. A dashed connector threads them on desktop. */

type Step = {
	n: string;
	hue: OrbHue;
	icon: ReactNode;
	title: string;
	body: string;
};

const STEPS: Step[] = [
	{
		n: "01",
		hue: "violet",
		icon: <Download size={26} />,
		title: "Pull the tokens",
		body: "Drop the single @theme block and the shadow utilities into your Tailwind v4 setup. That's the whole foundation.",
	},
	{
		n: "02",
		hue: "pink",
		icon: <Combine size={26} />,
		title: "Compose primitives",
		body: "Reach for Card, Button, Input, IconOrb and Blobs. They already encode the clay physics — no one-off styling.",
	},
	{
		n: "03",
		hue: "sky",
		icon: <Rocket size={26} />,
		title: "Ship it squishy",
		body: "Lay sections into the bento grid and split layouts. Every surface lifts, presses and breathes for free.",
	},
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

export function HowItWorks() {
	return (
		<section id="how" className="py-16 sm:py-24">
			<Shell>
				<SectionHeading
					eyebrow="How it works"
					title="From zero to clay in three steps"
					lead="No build pipeline, no learning curve. If you can write Tailwind, you can mold clay."
				/>

				<div className="relative mt-16">
					{/* dashed connector (desktop) */}
					<div
						aria-hidden
						className="absolute left-[16%] right-[16%] top-12 hidden border-t-2 border-dashed border-clay-accent/25 md:block"
					/>

					<div className="grid gap-12 md:grid-cols-3 md:gap-8">
						{STEPS.map((s, i) => (
							<Reveal key={s.n} delay={i * 110}>
								<div className="group flex flex-col items-center text-center">
									<div
										className="grid h-24 w-24 place-items-center rounded-full text-white shadow-clay-orb transition-transform duration-300 group-hover:scale-110"
										style={
											{
												backgroundImage: orbGradient[s.hue],
												"--orb": orbTint[s.hue],
											} as CSSProperties
										}
									>
										{s.icon}
									</div>
									<span
										style={display}
										className="mt-5 text-sm font-black tracking-[0.2em] text-clay-accent"
									>
										STEP {s.n}
									</span>
									<h3
										style={display}
										className="mt-1 text-xl font-extrabold tracking-tight text-clay-foreground sm:text-2xl"
									>
										{s.title}
									</h3>
									<p className="mt-2.5 max-w-xs text-base leading-relaxed text-clay-muted">
										{s.body}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</Shell>
		</section>
	);
}
