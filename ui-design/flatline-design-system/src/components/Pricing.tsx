import { Check } from "lucide-react";
import { Shell, Reveal, Eyebrow, Button } from "./primitives";

/* PRICING — scale carries the hierarchy. The popular tier RESTS larger
   (lg:scale-105) in a solid Blue block and scales MORE on hover. No shadow,
   no border — the size and the color do all the work. */
type Plan = {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const PLANS: Plan[] = [
	{
		name: "Solo",
		price: "$0",
		cadence: "forever",
		blurb: "For one designer testing the waters.",
		features: [
			"The full token file",
			"12 flat components",
			"Community support",
			"1 project",
		],
		cta: "Start free",
	},
	{
		name: "Studio",
		price: "$24",
		cadence: "per editor / mo",
		blurb: "For teams shipping flat, fast.",
		features: [
			"Everything in Solo",
			"40+ components & blocks",
			"Figma token sync",
			"Unlimited projects",
			"Priority support",
		],
		cta: "Choose Studio",
		popular: true,
	},
	{
		name: "Scale",
		price: "$79",
		cadence: "per editor / mo",
		blurb: "For orgs standardizing on flat.",
		features: [
			"Everything in Studio",
			"SSO & roles",
			"Brand-token theming",
			"Audit log",
			"Dedicated CSM",
		],
		cta: "Talk to sales",
	},
];

function FeatureRow({
	children,
	light,
}: {
	children: string;
	light?: boolean;
}) {
	return (
		<li className="flex items-start gap-3">
			<span
				className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
					light
						? "bg-white text-[var(--color-brand)]"
						: "bg-[var(--color-brand)] text-white"
				}`}
			>
				<Check size={13} strokeWidth={3} />
			</span>
			<span className={light ? "text-blue-50" : "text-gray-600"}>
				{children}
			</span>
		</li>
	);
}

export function Pricing() {
	return (
		<section id="pricing" className="bg-[var(--color-canvas)] py-20 lg:py-28">
			<Shell>
				<Reveal className="mx-auto max-w-2xl text-center">
					<Eyebrow className="text-[var(--color-brand)]">Pricing</Eyebrow>
					<h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
						Pick a plan. No fine print, no shadows.
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-gray-600">
						Flat pricing for a flat system. Upgrade or cancel anytime.
					</p>
				</Reveal>

				<div className="mt-16 grid items-center gap-6 lg:grid-cols-3 lg:gap-5">
					{PLANS.map((plan, i) =>
						plan.popular ? (
							<Reveal key={plan.name} delay={i * 0.08}>
								{/* Popular: solid Blue block, rests larger, scales more. */}
								<div className="on-color group relative z-10 origin-center rounded-lg bg-[var(--color-brand)] p-9 text-white transition-all duration-300 hover:scale-[1.04] lg:scale-105 lg:hover:scale-[1.09]">
									<span className="inline-flex items-center rounded-full bg-[var(--color-sun)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
										Most popular
									</span>
									<h3 className="mt-5 text-2xl font-extrabold tracking-tight">
										{plan.name}
									</h3>
									<p className="mt-1.5 text-sm text-blue-50">{plan.blurb}</p>
									<div className="mt-6 flex items-end gap-1.5">
										<span className="text-6xl font-extrabold tracking-tight">
											{plan.price}
										</span>
										<span className="pb-2 text-sm text-blue-50">
											{plan.cadence}
										</span>
									</div>
									<Button
										variant="secondary"
										className="mt-7 w-full !bg-white !text-[var(--color-brand)] hover:!bg-blue-50"
									>
										{plan.cta}
									</Button>
									<ul className="mt-8 space-y-3.5">
										{plan.features.map((f) => (
											<FeatureRow key={f} light>
												{f}
											</FeatureRow>
										))}
									</ul>
								</div>
							</Reveal>
						) : (
							<Reveal key={plan.name} delay={i * 0.08}>
								{/* Standard: muted block, subtle hover scale. */}
								<div className="group h-full rounded-lg bg-[var(--color-fog)] p-9 transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--color-hair)]">
									<h3 className="text-2xl font-extrabold tracking-tight">
										{plan.name}
									</h3>
									<p className="mt-1.5 text-sm text-gray-500">{plan.blurb}</p>
									<div className="mt-6 flex items-end gap-1.5">
										<span className="text-6xl font-extrabold tracking-tight">
											{plan.price}
										</span>
										<span className="pb-2 text-sm text-gray-500">
											{plan.cadence}
										</span>
									</div>
									<Button variant="outline" className="mt-7 w-full">
										{plan.cta}
									</Button>
									<ul className="mt-8 space-y-3.5">
										{plan.features.map((f) => (
											<FeatureRow key={f}>{f}</FeatureRow>
										))}
									</ul>
								</div>
							</Reveal>
						),
					)}
				</div>
			</Shell>
		</section>
	);
}
