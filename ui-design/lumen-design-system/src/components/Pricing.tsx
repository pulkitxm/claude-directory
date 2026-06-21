import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SpotlightCard } from "./SpotlightCard";
import { Button } from "./Button";
import { RevealGroup, RevealItem } from "./Reveal";

interface Plan {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	featured?: boolean;
	cta: string;
}

const PLANS: Plan[] = [
	{
		name: "Open source",
		price: "$0",
		cadence: "forever",
		blurb: "The full system, MIT licensed.",
		features: [
			"All primitives & tokens",
			"Ambient background system",
			"Cursor spotlights",
			"Community support",
		],
		cta: "Clone the repo",
	},
	{
		name: "Studio",
		price: "$24",
		cadence: "per seat / mo",
		blurb: "For teams shipping product UI.",
		features: [
			"Everything in Open source",
			"Figma token sync",
			"Motion presets library",
			"Theme generator",
			"Priority support",
		],
		featured: true,
		cta: "Start free trial",
	},
	{
		name: "Enterprise",
		price: "Custom",
		cadence: "annual",
		blurb: "Governance at scale.",
		features: [
			"Everything in Studio",
			"SSO & audit logs",
			"Design ops review",
			"SLA & dedicated channel",
		],
		cta: "Talk to sales",
	},
];

export function Pricing() {
	return (
		<section id="pricing" className="container-page py-20 sm:py-28 lg:py-32">
			<SectionHeader
				eyebrow="Pricing"
				title="Start free. Scale when you ship."
				lead="The same obsessive craft at every tier. Cancel anytime."
			/>

			<RevealGroup
				className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
				stagger={0.08}
			>
				{PLANS.map((p) => (
					<RevealItem key={p.name} className={p.featured ? "md:-mt-4" : ""}>
						<SpotlightCard
							variant={p.featured ? "gradient" : "default"}
							className={[
								"h-full",
								p.featured
									? "shadow-[0_0_0_1px_rgba(94,106,210,0.4),0_12px_48px_rgba(0,0,0,0.5),0_0_70px_rgba(94,106,210,0.18)]"
									: "",
							].join(" ")}
						>
							<div className="flex h-full flex-col p-6 sm:p-7">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold tracking-tight text-fg">
										{p.name}
									</h3>
									{p.featured && (
										<span className="rounded-full border border-accent/30 bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#c2c9ff]">
											Popular
										</span>
									)}
								</div>
								<p className="mt-1.5 text-sm text-fg-muted">{p.blurb}</p>

								<div className="mt-5 flex items-baseline gap-1.5">
									<span className="text-4xl font-semibold tracking-tight text-fg">
										{p.price}
									</span>
									<span className="text-sm text-fg-muted">{p.cadence}</span>
								</div>

								<ul className="mt-6 space-y-2.5">
									{p.features.map((f) => (
										<li
											key={f}
											className="flex items-start gap-2.5 text-sm text-fg-muted"
										>
											<span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
												<Check size={11} strokeWidth={3} />
											</span>
											{f}
										</li>
									))}
								</ul>

								<div className="mt-auto pt-7">
									<Button
										variant={p.featured ? "primary" : "secondary"}
										size="md"
										href="#"
										className="w-full"
									>
										{p.cta}
									</Button>
								</div>
							</div>
						</SpotlightCard>
					</RevealItem>
				))}
			</RevealGroup>
		</section>
	);
}
