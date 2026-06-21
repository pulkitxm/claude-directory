import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Tier {
	name: string;
	designator: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	featured?: boolean;
}

const TIERS: Tier[] = [
	{
		name: "Prototype",
		designator: "T1",
		price: "$0",
		cadence: "forever",
		blurb: "For one maker and the boards on your bench.",
		features: [
			"2-layer boards, unlimited",
			"Continuous DRC",
			"4M-part component library",
			"Gerber & BOM export",
		],
		cta: "Start a board",
	},
	{
		name: "Studio",
		designator: "T2",
		price: "$29",
		cadence: "per seat / mo",
		blurb: "For teams shipping real hardware on a schedule.",
		features: [
			"Up to 16 layers, blind & buried vias",
			"Signal-integrity field solver",
			"Push-and-shove router",
			"Schematic ↔ layout sync",
			"Inline assembly ordering",
		],
		cta: "Start 14-day trial",
		featured: true,
	},
	{
		name: "Foundry",
		designator: "T3",
		price: "Custom",
		cadence: "annual",
		blurb: "For orgs with their own fabs, rules, and audit trail.",
		features: [
			"Private component & rule libraries",
			"SSO, roles, and audit log",
			"On-prem field solver",
			"Dedicated fab integrations",
			"SLA & priority support",
		],
		cta: "Talk to us",
	},
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Pricing() {
	return (
		<section id="pricing" className="relative px-5 py-24 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionLabel designator="Q5" label="The order" align="center" />
				<motion.h2
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6, ease }}
					className="mx-auto mt-5 max-w-xl text-balance text-center font-display text-3xl font-bold leading-tight tracking-tightest text-silk sm:text-[2.6rem]"
				>
					Pay for layers, not for licenses.
				</motion.h2>
				<p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-silk-dim">
					Prototype free, upgrade when the stack-up grows. Every plan exports
					fab-ready files you fully own.
				</p>

				<div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
					{TIERS.map((tier, i) => (
						<motion.div
							key={tier.name}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.55, ease, delay: i * 0.08 }}
							className={cn(
								"relative flex flex-col rounded-3xl border p-7",
								tier.featured
									? "border-copper/50 bg-gradient-to-b from-copper/[0.08] to-substrate-800/40 shadow-pad lg:-mt-4 lg:mb-[-1rem] lg:pb-11"
									: "border-substrate-600/70 bg-substrate-800/40",
							)}
						>
							{tier.featured && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-copper px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-substrate-900">
									Most shipped
								</span>
							)}

							<div className="flex items-center justify-between">
								<h3 className="font-display text-xl font-bold tracking-tight text-silk">
									{tier.name}
								</h3>
								<span className="font-mono text-[10px] uppercase tracking-wider text-silk-faint">
									{tier.designator}
								</span>
							</div>
							<p className="mt-1.5 text-sm text-silk-dim">{tier.blurb}</p>

							<div className="mt-6 flex items-baseline gap-1.5">
								<span
									className={cn(
										"font-display text-4xl font-bold tracking-tightest",
										tier.featured ? "text-copper-foil" : "text-silk",
									)}
								>
									{tier.price}
								</span>
								<span className="text-xs text-silk-faint">{tier.cadence}</span>
							</div>

							<a
								href="#cta"
								className={cn(
									"group mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-all",
									tier.featured
										? "bg-copper text-substrate-900 hover:bg-copper-bright hover:shadow-pad"
										: "border border-substrate-500 bg-substrate-900/40 text-silk hover:border-copper/40 hover:bg-substrate-800",
								)}
							>
								{tier.cta}
								<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
							</a>

							<ul className="mt-7 space-y-3 border-t border-substrate-600/60 pt-6">
								{tier.features.map((f) => (
									<li
										key={f}
										className="flex items-start gap-2.5 text-sm text-silk-dim"
									>
										<Check
											className={cn(
												"mt-0.5 h-4 w-4 shrink-0",
												tier.featured ? "text-mask-bright" : "text-mask",
											)}
											strokeWidth={2.5}
										/>
										<span>{f}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
