import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, GradientBorderCard } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Tier {
	name: string;
	price: string;
	cadence: string;
	tagline: string;
	features: string[];
	cta: string;
	featured?: boolean;
}

const TIERS: Tier[] = [
	{
		name: "Starter",
		price: "$0",
		cadence: "/ forever",
		tagline: "For side projects and first signals.",
		features: [
			"Up to 10k events / month",
			"3 dashboards",
			"7-day data history",
			"Community support",
		],
		cta: "Get started",
	},
	{
		name: "Growth",
		price: "$49",
		cadence: "/ month",
		tagline: "For teams turning data into decisions.",
		features: [
			"Up to 5M events / month",
			"Unlimited dashboards",
			"12-month history",
			"AI insights & anomaly alerts",
			"Priority support",
		],
		cta: "Start free trial",
		featured: true,
	},
	{
		name: "Scale",
		price: "Custom",
		cadence: "",
		tagline: "For data-heavy orgs with compliance needs.",
		features: [
			"Unlimited events",
			"SSO & advanced roles",
			"Data residency & SOC 2",
			"Dedicated success manager",
		],
		cta: "Talk to sales",
	},
];

function TierBody({ tier }: { tier: Tier }) {
	return (
		<div className="flex h-full flex-col p-8">
			{tier.featured && (
				<span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-3 py-1 text-xs font-semibold text-accent-foreground">
					Most popular
				</span>
			)}
			<h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
			<p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>

			<div className="mt-6 flex items-end gap-1">
				<span className="font-display text-5xl tracking-tight">
					{tier.price}
				</span>
				{tier.cadence && (
					<span className="mb-1.5 text-sm text-muted-foreground">
						{tier.cadence}
					</span>
				)}
			</div>

			<Button
				variant={tier.featured ? "primary" : "outline"}
				size="lg"
				className="mt-7 w-full"
			>
				{tier.cta}
			</Button>

			<ul className="mt-8 flex flex-col gap-3.5">
				{tier.features.map((f) => (
					<li key={f} className="flex items-start gap-3 text-sm">
						<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
							<Check className="h-3 w-3" strokeWidth={3} />
						</span>
						<span className="leading-relaxed text-foreground/80">{f}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Pricing() {
	return (
		<section id="pricing" className="relative py-28 md:py-36">
			<div className="mx-auto max-w-6xl px-5">
				<Reveal className="mx-auto max-w-2xl text-center">
					<RevealItem>
						<div className="flex justify-center">
							<SectionLabel>Pricing</SectionLabel>
						</div>
					</RevealItem>
					<RevealItem>
						<h2 className="mt-5 font-display text-3xl leading-[1.15] tracking-tight sm:text-[3.25rem]">
							Simple pricing that{" "}
							<span className="gradient-text">scales with you</span>.
						</h2>
					</RevealItem>
					<RevealItem>
						<p className="mt-5 text-lg leading-relaxed text-muted-foreground">
							Start free, upgrade when the signal gets loud. No seats to count,
							no surprise overages.
						</p>
					</RevealItem>
				</Reveal>

				<Reveal className="mt-16 grid items-center gap-6 lg:grid-cols-3">
					{TIERS.map((tier) => (
						<RevealItem
							key={tier.name}
							className={cn(tier.featured && "lg:-my-4 lg:z-10")}
						>
							{tier.featured ? (
								<GradientBorderCard className="h-full hover:-translate-y-1">
									<TierBody tier={tier} />
								</GradientBorderCard>
							) : (
								<Card className="h-full">
									<TierBody tier={tier} />
								</Card>
							)}
						</RevealItem>
					))}
				</Reveal>
			</div>
		</section>
	);
}
