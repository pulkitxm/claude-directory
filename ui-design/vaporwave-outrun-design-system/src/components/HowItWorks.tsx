import {
	Eyebrow,
	Reveal,
	Section,
	SectionHeading,
	Shell,
} from "./primitives";

type Step = {
	n: string;
	title: string;
	desc: string;
};

const STEPS: Step[] = [
	{
		n: "01",
		title: "Mount the tokens",
		desc: "Drop the centralized token sheet into your stylesheet. Colors, fonts, glows, and radii resolve as CSS variables — one source of truth.",
	},
	{
		n: "02",
		title: "Compose primitives",
		desc: "Assemble pages from skewed buttons, dual-border cards, terminal windows, and the rotating diamond icon. Zero one-off styles.",
	},
	{
		n: "03",
		title: "Layer the void",
		desc: "Switch on the fixed perspective grid, the giant blurred sun, and the global CRT scanline overlay. Depth, for free.",
	},
	{
		n: "04",
		title: "Ship to 2088",
		desc: "Hover states explode, icons spin to 90°, gradients clip to text. Your interface now commands a synthetic reality.",
	},
];

export function HowItWorks() {
	return (
		<Section id="how" className="z-10 py-20 sm:py-32">
			<div className="absolute inset-0 dots opacity-30" aria-hidden />
			<Shell className="relative">
				<Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
					<Eyebrow>./boot --sequence</Eyebrow>
					<SectionHeading className="mt-5" gradient>
						Boot sequence
					</SectionHeading>
					<p className="mt-5 font-mono text-lg text-[var(--color-chrome)]/70">
						Four checkpoints from cold start to synthetic reality.
					</p>
				</Reveal>

				<div className="relative mx-auto max-w-4xl">
					{/* central neon checkpoint line (desktop) / left rail (mobile) */}
					<div
						className="absolute bottom-0 top-0 w-0.5 bg-gradient-to-b from-[var(--color-magenta)] via-[var(--color-cyan)] to-[var(--color-orange)] shadow-[0_0_12px_#FF00FF] max-md:left-3 md:left-1/2 md:-translate-x-1/2"
						aria-hidden
					/>

					<ol className="space-y-10 sm:space-y-14">
						{STEPS.map((step, i) => {
							const left = i % 2 === 0;
							return (
								<li key={step.n} className="relative">
									{/* checkpoint node */}
									<span
										className="absolute top-1 z-10 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border-2 border-[var(--color-cyan)] bg-[var(--color-void)] font-mono text-[0.6rem] text-[var(--color-cyan)] shadow-[0_0_12px_#00FFFF] max-md:left-3 md:left-1/2"
										aria-hidden
									>
										{step.n}
									</span>

									<Reveal
										delay={(i % 2) * 0.05}
										className={`pl-12 md:w-1/2 md:pl-0 ${
											left ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
										}`}
									>
										<div className="card card-hover group p-6">
											<div className="font-mono text-xs uppercase tracking-widest text-[var(--color-magenta)]">
												step {step.n}
											</div>
											<h3 className="title-cyan mt-2 text-2xl font-semibold uppercase">
												{step.title}
											</h3>
											<p className="mt-2 font-mono text-sm leading-relaxed text-[var(--color-chrome)]/70">
												{step.desc}
											</p>
										</div>
									</Reveal>
								</li>
							);
						})}
					</ol>
				</div>
			</Shell>
		</Section>
	);
}
