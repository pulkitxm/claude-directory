import { Reveal, SectionHead, Shell } from "./primitives";
import { Layers, Palette, Wand } from "./icons";
import type { ReactNode } from "react";

type Step = {
	n: string;
	icon: ReactNode;
	title: string;
	body: string;
};

const STEPS: Step[] = [
	{
		n: "01",
		icon: <Palette size={24} />,
		title: "Drop a seed color",
		body: "Paste a hex, sample a photo, or let Lumi read the time of day. That single color becomes the root of everything.",
	},
	{
		n: "02",
		icon: <Layers size={24} />,
		title: "Watch the tones bloom",
		body: "Lumi expands the seed into the full MD3 tonal palette and maps every role — surfaces, containers, on-colors — automatically.",
	},
	{
		n: "03",
		icon: <Wand size={24} />,
		title: "Ship the tokens",
		body: "Export to CSS, Tailwind, Figma or native. Components inherit instantly, contrast already verified.",
	},
];

/* How It Works: numbered badges where a hidden tertiary glow reveals on hover
   (opacity-0 -> group-hover:opacity-40). A soft connecting line threads the
   steps on desktop. */
export function HowItWorks() {
	return (
		<section
			id="how"
			className="relative scroll-mt-20 bg-[var(--color-md-surface)] py-20 sm:py-28"
		>
			<Shell>
				<SectionHead
					eyebrow="How it works"
					title="From one color to a whole system"
					lead="Three steps. No design tokens written by hand, no contrast spreadsheets."
				/>

				<div className="relative mt-16">
					{/* connecting line behind the cards (desktop) */}
					<div
						aria-hidden
						className="absolute left-0 right-0 top-9 hidden h-0.5 bg-[var(--color-md-outline-variant)] lg:block"
					/>
					<ol className="relative grid gap-6 lg:grid-cols-3">
						{STEPS.map((s, i) => (
							<Reveal as="li" key={s.n} delay={i * 110}>
								<article className="group relative h-full rounded-[var(--radius-md-lg)] bg-[var(--color-md-container)] p-8 shadow-[var(--shadow-md-1)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-md-2)]">
									<div className="relative inline-grid place-items-center">
										{/* hidden glow halo, revealed on hover */}
										<span
											aria-hidden
											className="absolute h-16 w-16 rounded-full bg-[var(--color-md-tertiary)] opacity-0 blur-2xl transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:opacity-40"
										/>
										<span className="relative grid h-16 w-16 place-items-center rounded-full bg-[var(--color-md-primary)] text-[var(--color-md-on-primary)] shadow-[var(--shadow-md-1)]">
											{s.icon}
										</span>
									</div>
									<div className="mt-6 flex items-baseline gap-3">
										<span className="text-sm font-medium tabular-nums text-[var(--color-md-primary)]">
											{s.n}
										</span>
										<h3 className="t-title">{s.title}</h3>
									</div>
									<p className="mt-2.5 leading-relaxed text-[var(--color-md-on-variant)]">
										{s.body}
									</p>
								</article>
							</Reveal>
						))}
					</ol>
				</div>
			</Shell>
		</section>
	);
}
