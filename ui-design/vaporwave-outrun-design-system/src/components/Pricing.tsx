import { Check } from "lucide-react";
import {
	ButtonLink,
	Eyebrow,
	Reveal,
	Section,
	SectionHeading,
	Shell,
} from "./primitives";

type Tier = {
	name: string;
	price: string;
	period: string;
	blurb: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const TIERS: Tier[] = [
	{
		name: "Shareware",
		price: "$0",
		period: "/forever",
		blurb: "Boot the OS and ship a single neon surface.",
		features: ["Core token sheet", "5 primitives", "CRT scanline overlay", "Community relay"],
		cta: "Download",
	},
	{
		name: "Operator",
		price: "$88",
		period: "/month",
		blurb: "The full synthetic reality engine for studios.",
		features: [
			"Everything in Shareware",
			"All 12 primitives + windows",
			"Perspective grid + sun kit",
			"Gradient text & glow presets",
			"Priority relay support",
		],
		cta: "Jack in",
		popular: true,
	},
	{
		name: "Mainframe",
		price: "$888",
		period: "/year",
		blurb: "Self-hosted, white-labeled, year-2088 ready.",
		features: [
			"Everything in Operator",
			"Source license",
			"Custom token theming",
			"On-prem deployment",
			"Dedicated synth engineer",
		],
		cta: "Contact ops",
	},
];

export function Pricing() {
	return (
		<Section id="pricing" className="z-10 py-20 sm:py-32">
			<Shell className="max-w-6xl">
				<Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
					<Eyebrow>./license --tiers</Eyebrow>
					<SectionHeading className="mt-5" gradient>
						License tiers
					</SectionHeading>
					<p className="mt-5 font-mono text-lg text-[var(--color-chrome)]/70">
						Pick an access level. Prices in synth-credits. Cancel anytime — the
						grid forgives.
					</p>
				</Reveal>

				<div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
					{TIERS.map((tier, i) => (
						<Reveal key={tier.name} delay={i * 0.08} className="h-full">
							<div
								className={`card relative flex h-full flex-col p-7 ${
									tier.popular
										? "border-2 border-[var(--color-cyan)] shadow-[0_0_40px_rgba(0,255,255,0.25)] lg:scale-105"
										: "card-hover"
								}`}
							>
								{tier.popular && (
									<span className="eyebrow absolute -top-3 left-1/2 -translate-x-1/2 border-[var(--color-cyan)] bg-[var(--color-void)] text-[var(--color-cyan)]">
										<span>most loaded</span>
									</span>
								)}

								<h3 className="font-heading text-xl font-bold uppercase tracking-widest text-[var(--color-chrome)]">
									{tier.name}
								</h3>
								<p className="mt-2 font-mono text-sm text-[var(--color-chrome)]/60">
									{tier.blurb}
								</p>

								<div className="mt-6 flex items-end gap-1">
									<span
										className={`font-heading text-5xl font-black ${
											tier.popular ? "text-sunset" : "text-[var(--color-cyan)] drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
										}`}
									>
										{tier.price}
									</span>
									<span className="mb-1 font-mono text-sm text-[var(--color-chrome)]/50">
										{tier.period}
									</span>
								</div>

								<ul className="mt-7 flex-1 space-y-3">
									{tier.features.map((feat) => (
										<li key={feat} className="flex items-start gap-3 font-mono text-sm text-[var(--color-chrome)]/80">
											<Check
												size={16}
												className="mt-0.5 shrink-0 text-[var(--color-magenta)]"
											/>
											<span>{feat}</span>
										</li>
									))}
								</ul>

								<ButtonLink
									href="#cta"
									variant={tier.popular ? "secondary" : "primary"}
									className="mt-8 w-full"
								>
									{tier.cta}
								</ButtonLink>
							</div>
						</Reveal>
					))}
				</div>
			</Shell>
		</Section>
	);
}
