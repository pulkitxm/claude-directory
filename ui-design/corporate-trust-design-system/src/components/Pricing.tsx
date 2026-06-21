import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import {
	Section,
	Shell,
	Eyebrow,
	Reveal,
	RevealGroup,
	Blob,
	cx,
} from "./primitives";
import { PRICING } from "../lib/content";
import { fadeUp } from "../lib/motion";

/* Three tiers, center tier highlighted: it rests larger (md:scale-105), carries
   the gradient ring + a "Most popular" badge, and inverts to a gradient ground. */
export function Pricing() {
	return (
		<Section id="pricing" className="overflow-hidden">
			<Blob
				tone="mixed"
				className="left-1/2 top-10 h-96 w-96 -translate-x-1/2 opacity-40"
			/>
			<Shell>
				<Reveal className="mx-auto max-w-2xl text-center">
					<Eyebrow icon={Sparkles}>Simple, scalable pricing</Eyebrow>
					<h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
						Pricing that grows{" "}
						<span className="text-gradient">with your team</span>
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
						Start free, upgrade when you're ready. Every plan includes the
						polish, security, and support that make Northwind worth trusting.
					</p>
				</Reveal>

				<RevealGroup
					className="mt-16 grid items-center gap-6 md:grid-cols-3 md:gap-5"
					stag={0.1}
				>
					{PRICING.map((tier) => (
						<motion.div
							key={tier.name}
							variants={fadeUp}
							className={cx(
								"relative flex h-full flex-col rounded-2xl p-7 transition-transform duration-200",
								tier.popular
									? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lift md:scale-105 md:z-10"
									: "card",
							)}
						>
							{tier.popular && (
								<span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-indigo-700 shadow-soft">
									<Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
									Most popular
								</span>
							)}

							<h3
								className={cx(
									"text-lg font-bold",
									tier.popular ? "text-white" : "text-slate-900",
								)}
							>
								{tier.name}
							</h3>
							<p
								className={cx(
									"mt-1.5 text-sm",
									tier.popular ? "text-indigo-100" : "text-slate-500",
								)}
							>
								{tier.blurb}
							</p>

							<div className="mt-6 flex items-end gap-1">
								<span
									className={cx(
										"text-4xl font-extrabold tracking-tight",
										tier.popular ? "text-white" : "text-slate-900",
									)}
								>
									{tier.price}
								</span>
								{tier.cadence && (
									<span
										className={cx(
											"pb-1 text-sm font-medium",
											tier.popular ? "text-indigo-100" : "text-slate-400",
										)}
									>
										{tier.cadence}
									</span>
								)}
							</div>

							<a
								href="#cta"
								className={cx(
									"btn mt-6 w-full",
									tier.popular ? "btn-on-dark" : "btn-primary",
								)}
							>
								{tier.cta}
							</a>

							<ul className="mt-7 space-y-3.5">
								{tier.features.map((f) => (
									<li
										key={f}
										className={cx(
											"flex items-start gap-3 text-[0.9375rem]",
											tier.popular ? "text-indigo-50" : "text-slate-600",
										)}
									>
										<span
											className={cx(
												"mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
												tier.popular
													? "bg-white/20 text-white"
													: "bg-emerald-100 text-emerald-600",
											)}
										>
											<Check className="h-3.5 w-3.5" aria-hidden="true" />
										</span>
										{f}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</RevealGroup>

				<Reveal
					className="mx-auto mt-10 max-w-md text-center text-sm text-slate-500"
					delay={0.1}
				>
					All prices in USD. Annual billing saves 20%. Need something bespoke?{" "}
					<a
						href="#cta"
						className="font-semibold text-indigo-600 underline-offset-2 hover:underline"
					>
						Talk to our team.
					</a>
				</Reveal>
			</Shell>
		</Section>
	);
}
