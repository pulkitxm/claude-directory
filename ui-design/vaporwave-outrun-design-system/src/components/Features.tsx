import {
	Grid3x3,
	Sparkles,
	MonitorPlay,
	Terminal,
	Waves,
	Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
	Card,
	Diamond,
	Eyebrow,
	Reveal,
	Section,
	SectionHeading,
	Shell,
} from "./primitives";

type Feature = {
	icon: LucideIcon;
	title: string;
	desc: string;
};

const FEATURES: Feature[] = [
	{
		icon: Grid3x3,
		title: "Infinite Grid",
		desc: "Perspective-transformed wireframe floors that recede toward the horizon — that iconic outrun highway depth, baked into every layout.",
	},
	{
		icon: Sparkles,
		title: "Neon Glow Engine",
		desc: "Hot magenta, electric cyan, sunset orange. Every element emits light through colored box-shadows that explode 2-3x on hover.",
	},
	{
		icon: MonitorPlay,
		title: "CRT Scanlines",
		desc: "A global overlay of horizontal scanlines and subtle RGB chromatic aberration — reality, distorted through a vintage tube.",
	},
	{
		icon: Terminal,
		title: "Terminal Chrome",
		desc: "Window title bars with colored dots, command prompts, file explorers, status bars. Everything references DOS and early GUIs.",
	},
	{
		icon: Waves,
		title: "Gradient Mania",
		desc: "Multi-stop sunset gradients clipped to text, painted on borders, and blurred into a giant floating sun behind the void.",
	},
	{
		icon: Zap,
		title: "Kinetic Motion",
		desc: "Snappy, mechanical, linear-eased transitions. Buttons un-skew, icons spin to 90°, cards lift. No organic curves allowed.",
	},
];

export function Features() {
	return (
		<Section id="features" className="z-10 py-20 sm:py-32">
			<Shell>
				<Reveal className="mb-12 max-w-3xl sm:mb-16">
					<Eyebrow>/usr/lib/modules</Eyebrow>
					<SectionHeading className="mt-5">Loaded modules</SectionHeading>
					<p className="mt-5 font-mono text-lg text-[var(--color-chrome)]/70">
						Six core subsystems power the synthetic reality. Hover any module to
						watch its diamond reactor spin and the panel lift off the void.
					</p>
				</Reveal>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((f, i) => (
						<Reveal key={f.title} delay={(i % 3) * 0.08}>
							<Card className="group h-full p-6">
								<Diamond>
									<f.icon size={22} className="text-[var(--color-magenta)]" />
								</Diamond>
								<h3 className="title-cyan mt-6 text-2xl font-semibold uppercase">
									{f.title}
								</h3>
								<p className="mt-3 font-mono text-sm leading-relaxed text-[var(--color-chrome)]/70">
									{f.desc}
								</p>
								<div className="mt-5 font-mono text-[0.7rem] uppercase tracking-widest text-[var(--color-magenta)]/70">
									&gt; module_{String(i + 1).padStart(2, "0")} loaded
								</div>
							</Card>
						</Reveal>
					))}
				</div>
			</Shell>
		</Section>
	);
}
