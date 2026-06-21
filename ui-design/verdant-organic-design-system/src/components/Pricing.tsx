import { Check, Sparkles } from "lucide-react";
import { Blob } from "./Blob";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { plans } from "../lib/content";
import { cn } from "../lib/cn";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Three subscription tiers. The middle "Ritual" plan is the highlighted /
 * recommended tier — rendered on a moss fill, lifted and scaled above the
 * others, with a floating badge. Outer plans use the soft card treatment with
 * mirrored asymmetric corners so the trio reads balanced but never rigid.
 */
export function Pricing() {
	const reduced = useReducedMotion();
	return (
		<section
			id="pricing"
			className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8"
		>
			<Blob
				shape={1}
				color="bg-accent/40"
				className="left-1/2 top-10 h-[26rem] w-[26rem] -translate-x-1/2"
				animate={!reduced}
			/>

			<div className="relative mx-auto max-w-7xl">
				<SectionHeading
					eyebrow="Bring it home"
					title={
						<>
							Steep at your own{" "}
							<span className="italic text-primary">pace.</span>
						</>
					}
					intro="No lock-ins, no jargon. Begin with a single tin, or let the seasons arrive at your door. Pause whenever life asks you to."
				/>

				<div className="mt-16 grid items-center gap-8 lg:grid-cols-3">
					{plans.map((plan, i) => {
						const highlighted = !!plan.highlighted;
						return (
							<Reveal key={plan.name} delay={i * 0.1} className="h-full">
								<div
									className={cn(
										"relative flex h-full flex-col border p-8 transition-all duration-500 ease-organic",
										highlighted
											? "z-10 rounded-[2.5rem] rounded-tr-[5rem] border-transparent bg-primary text-primary-foreground shadow-float-lg lg:scale-105"
											: i === 0
												? "rounded-[2rem] rounded-bl-[4rem] border-border/50 bg-card text-foreground shadow-soft hover:-translate-y-1.5 hover:shadow-soft-lg"
												: "rounded-[2rem] rounded-br-[4rem] border-border/50 bg-card text-foreground shadow-soft hover:-translate-y-1.5 hover:shadow-soft-lg",
									)}
								>
									{highlighted && (
										<span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-secondary-foreground shadow-soft">
											<Sparkles size={13} />
											Most loved
										</span>
									)}

									<h3
										className={cn(
											"font-serif text-2xl font-semibold",
											highlighted
												? "text-primary-foreground"
												: "text-foreground",
										)}
									>
										{plan.name}
									</h3>
									<p
										className={cn(
											"mt-1.5 text-sm leading-relaxed",
											highlighted
												? "text-primary-foreground/80"
												: "text-muted-foreground",
										)}
									>
										{plan.blurb}
									</p>

									<div className="mt-6 flex items-end gap-1.5">
										<span className="font-serif text-5xl font-bold">
											{plan.price}
										</span>
										<span
											className={cn(
												"pb-1.5 text-sm font-semibold",
												highlighted
													? "text-primary-foreground/75"
													: "text-muted-foreground",
											)}
										>
											{plan.cadence}
										</span>
									</div>

									<ul className="mt-7 flex-1 space-y-3.5">
										{plan.perks.map((perk) => (
											<li key={perk} className="flex items-start gap-3">
												<span
													className={cn(
														"mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full",
														highlighted
															? "bg-white/15 text-primary-foreground"
															: "bg-primary/10 text-primary",
													)}
												>
													<Check size={15} strokeWidth={2.6} />
												</span>
												<span
													className={cn(
														"text-base font-semibold",
														highlighted
															? "text-primary-foreground/90"
															: "text-foreground/85",
													)}
												>
													{perk}
												</span>
											</li>
										))}
									</ul>

									<Button
										size="lg"
										variant={highlighted ? "primary" : "outline"}
										className={cn(
											"mt-8 w-full",
											highlighted &&
												"bg-card text-foreground hover:bg-background",
										)}
									>
										{plan.cta}
									</Button>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
