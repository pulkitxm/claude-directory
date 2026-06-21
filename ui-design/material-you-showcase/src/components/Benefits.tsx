import { Blob, Eyebrow, Reveal, Shell } from "./primitives";
import { Bolt, Globe, Heart, Layers, Palette, Shield } from "./icons";
import type { ReactNode } from "react";

type Benefit = {
	icon: ReactNode;
	title: string;
	body: string;
};

const BENEFITS: Benefit[] = [
	{
		icon: <Palette size={26} />,
		title: "Seeded color",
		body: "Pick one color and Lumi derives a full tonal palette — primary, secondary, tertiary and every surface in between.",
	},
	{
		icon: <Layers size={26} />,
		title: "Tonal surfaces",
		body: "Depth comes from layered tinted surfaces, not heavy shadows. Backgrounds never fall back to stark white.",
	},
	{
		icon: <Bolt size={26} />,
		title: "Live retheming",
		body: "Swap the seed and the whole interface re-tones in a single confident motion. No flash, no reload.",
	},
	{
		icon: <Shield size={26} />,
		title: "Contrast-safe",
		body: "Every generated pair is checked against WCAG. On-color text always clears AA, and AAA where it counts.",
	},
	{
		icon: <Globe size={26} />,
		title: "Cross-platform",
		body: "Export the same tokens to web, iOS, Android and Figma. One source of truth, everywhere it ships.",
	},
	{
		icon: <Heart size={26} />,
		title: "Tactile by default",
		body: "Pills, state layers and press feedback come baked in, so every component already feels satisfying to use.",
	},
];

/* Benefits sits on a full-width PRIMARY container — the "use colored blocks
   sparingly for emphasis" move. Cards are glass-morphism (white/10 +
   backdrop-blur), layered over floating organic blur shapes. */
export function Benefits() {
	return (
		<section
			id="benefits"
			className="on-color relative scroll-mt-20 overflow-hidden bg-[var(--color-md-primary)] py-20 text-[var(--color-md-on-primary)] sm:py-28"
		>
			{/* atmospheric depth */}
			<Blob
				float="a"
				className="-left-24 top-8 h-96 w-96 bg-[var(--color-md-tertiary)] opacity-40 mix-blend-screen"
			/>
			<Blob
				float="b"
				className="-right-24 -bottom-16 h-[28rem] w-[28rem] bg-[var(--color-md-primary-container)] opacity-30 mix-blend-screen"
			/>
			<div
				aria-hidden
				className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(255,255,255,0.16)_0%,_transparent_45%)]"
			/>

			<Shell className="relative">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
					<Reveal>
						<Eyebrow className="!bg-white/15 !text-white">Why Lumi</Eyebrow>
					</Reveal>
					<Reveal delay={80}>
						<h2 className="t-headline">
							A design system that adapts to people
						</h2>
					</Reveal>
					<Reveal delay={140}>
						<p className="t-body-l text-white/80">
							Material You moved design from rigid paper-and-ink to something
							personal and alive. Lumi packages that shift into tokens you can
							ship today.
						</p>
					</Reveal>
				</div>

				<ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{BENEFITS.map((b, i) => (
						<Reveal as="li" key={b.title} delay={i * 70}>
							<article className="group h-full rounded-[var(--radius-md-lg)] border border-white/15 bg-white/10 p-7 backdrop-blur-md transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:bg-white/15 hover:shadow-[var(--shadow-md-3)]">
								<span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-white transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-110">
									{b.icon}
								</span>
								<h3 className="t-title mt-5">{b.title}</h3>
								<p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/80">
									{b.body}
								</p>
							</article>
						</Reveal>
					))}
				</ul>
			</Shell>
		</section>
	);
}
