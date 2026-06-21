import { useState } from "react";
import { Check, Star } from "lucide-react";
import {
	Shell,
	SectionHeading,
	ButtonLink,
	Reveal,
	display,
} from "./primitives";

/* Three pricing tiers. The highlighted tier rests LARGER (md:scale-105) and
   carries a "Most popular" badge that floats ABOVE the card, breaking its
   container (the overlapping-elements pattern). A billing toggle proves the
   numbers are live. Non-highlighted cards grow slightly on hover. */

type Tier = {
	name: string;
	monthly: number;
	blurb: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const TIERS: Tier[] = [
	{
		name: "Starter",
		monthly: 0,
		blurb: "For tinkerers shaping their first clay screen.",
		features: [
			"Core tokens & primitives",
			"4 shadow stacks",
			"Light/blob backgrounds",
			"Community support",
		],
		cta: "Start free",
	},
	{
		name: "Studio",
		monthly: 24,
		blurb: "For product & design teams shipping in clay daily.",
		features: [
			"Everything in Starter",
			"Full bento + split layouts",
			"Figma clay library",
			"Motion presets & variants",
			"Priority support",
		],
		cta: "Get Studio",
		popular: true,
	},
	{
		name: "Atelier",
		monthly: 64,
		blurb: "For orgs standardizing on one tactile language.",
		features: [
			"Everything in Studio",
			"Theming & white-label",
			"Design tokens export",
			"Dedicated maker on call",
		],
		cta: "Talk to us",
	},
];

export function Pricing() {
	const [annual, setAnnual] = useState(false);

	const price = (m: number) => {
		if (m === 0) return "0";
		return annual ? String(Math.round(m * 0.8)) : String(m);
	};

	return (
		<section id="pricing" className="py-16 sm:py-24">
			<Shell>
				<SectionHeading
					eyebrow="Pricing"
					title="Pick your lump of clay"
					lead="Every plan ships the full material. Bigger plans just hand you more layouts, presets and hands-on help."
				/>

				{/* Billing toggle — a recessed track with a convex sliding knob */}
				<Reveal className="mt-10 flex justify-center" pop>
					<div className="inline-flex items-center gap-4 rounded-full bg-clay-recess p-1.5 shadow-clay-pressed">
						<button
							type="button"
							onClick={() => setAnnual(false)}
							style={display}
							aria-pressed={!annual}
							className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
								!annual
									? "bg-white text-clay-foreground shadow-clay-button-soft"
									: "text-clay-muted hover:text-clay-foreground"
							}`}
						>
							Monthly
						</button>
						<button
							type="button"
							onClick={() => setAnnual(true)}
							style={display}
							aria-pressed={annual}
							className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
								annual
									? "bg-white text-clay-foreground shadow-clay-button-soft"
									: "text-clay-muted hover:text-clay-foreground"
							}`}
						>
							Annual
							<span className="rounded-full bg-clay-emerald/15 px-2 py-0.5 text-[11px] font-extrabold text-[#047857]">
								−20%
							</span>
						</button>
					</div>
				</Reveal>

				<div className="mt-16 grid items-stretch gap-8 md:grid-cols-3 md:gap-6">
					{TIERS.map((tier, i) => (
						<Reveal key={tier.name} delay={i * 100} className="flex">
							<PricingCard
								tier={tier}
								price={price(tier.monthly)}
								annual={annual}
							/>
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}

function PricingCard({
	tier,
	price,
	annual,
}: {
	tier: Tier;
	price: string;
	annual: boolean;
}) {
	return (
		<div
			className={`relative flex w-full flex-col rounded-[32px] p-7 backdrop-blur-xl transition-all duration-500 sm:p-8 ${
				tier.popular
					? "bg-gradient-to-br from-clay-accent-light to-clay-accent text-white shadow-clay-button hover:-translate-y-1 hover:shadow-clay-button-hover md:scale-105"
					: "bg-clay-cardBg text-clay-foreground shadow-clay-card hover:-translate-y-1 hover:scale-[1.03] hover:shadow-clay-card-hover"
			}`}
		>
			{/* floating "popular" badge, breaking the top edge */}
			{tier.popular && (
				<div className="absolute -top-4 left-1/2 -translate-x-1/2">
					<span
						style={display}
						className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-clay-accent shadow-clay-button-soft"
					>
						<Star size={14} className="text-clay-amber" fill="currentColor" />
						Most popular
					</span>
				</div>
			)}

			<h3 style={display} className="text-xl font-extrabold tracking-tight">
				{tier.name}
			</h3>
			<p
				className={`mt-2 text-sm leading-relaxed ${
					tier.popular ? "text-white/85" : "text-clay-muted"
				}`}
			>
				{tier.blurb}
			</p>

			<div className="mt-6 flex items-end gap-1.5">
				<span style={display} className="text-5xl font-black leading-none">
					${price}
				</span>
				<span
					className={`pb-1 text-sm font-semibold ${
						tier.popular ? "text-white/80" : "text-clay-muted"
					}`}
				>
					/mo{annual && tier.monthly > 0 ? ", billed yearly" : ""}
				</span>
			</div>

			<div
				className={`my-7 h-px w-full ${
					tier.popular ? "bg-white/25" : "bg-clay-foreground/10"
				}`}
			/>

			<ul className="flex flex-1 flex-col gap-3.5">
				{tier.features.map((f) => (
					<li key={f} className="flex items-start gap-3 text-sm font-medium">
						<span
							className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
								tier.popular
									? "bg-white/25 text-white"
									: "bg-clay-emerald/15 text-clay-emerald"
							}`}
						>
							<Check size={12} strokeWidth={3} />
						</span>
						<span
							className={
								tier.popular ? "text-white/95" : "text-clay-foreground"
							}
						>
							{f}
						</span>
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
	);
}
