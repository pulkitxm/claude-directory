import { Check, Star } from "lucide-react";
import { PLANS } from "../content";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { SectionLabel, Reveal } from "../components/Section";

/* Three tiers on a violet color block. The featured "Zine" plan is scaled up,
   rotated straight, and carries a rotated "MOST LOUD" sticker on its corner. */
export function Pricing() {
	return (
		<section
			id="pricing"
			className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-muted"
		>
			<div
				className="neo-halftone pointer-events-none absolute inset-0 opacity-10"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="mx-auto max-w-2xl text-center">
					<SectionLabel bg="bg-neo-secondary">Grab The Kit</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
						Pick A Plan,
						<br />
						<span className="neo-text-stroke">Make Noise</span>
					</h2>
				</div>

				<div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
					{PLANS.map((plan, i) => (
						<Reveal key={plan.name} delay={i * 80}>
							<div className={plan.featured ? "lg:-my-4 lg:scale-[1.04]" : ""}>
								<Card
									bg={plan.bg}
									shadow={plan.featured ? "lg" : "md"}
									className={`relative h-full p-7 ${plan.featured ? "z-10 rotate-0" : plan.rotate}`}
								>
									{plan.featured && (
										<div className="absolute -right-3 -top-4 z-20 rotate-6">
											<Badge bg="bg-neo-secondary" spinOnHover>
												<Star
													className="h-3.5 w-3.5 fill-neo-ink stroke-neo-ink"
													strokeWidth={3}
												/>
												Most Loud
											</Badge>
										</div>
									)}

									<h3 className="text-2xl font-bold uppercase tracking-tight text-neo-ink">
										{plan.name}
									</h3>
									<p className="mt-1 text-sm font-bold text-neo-ink/70">
										{plan.blurb}
									</p>

									<div className="mt-6 flex items-end gap-1">
										<span className="text-6xl font-bold tracking-tighter text-neo-ink">
											{plan.price}
										</span>
										<span className="mb-2 text-sm font-bold uppercase tracking-wide text-neo-ink/70">
											{plan.cadence}
										</span>
									</div>

									<ul className="mt-6 space-y-3 border-t-4 border-neo-ink pt-5">
										{plan.features.map((f) => (
											<li key={f} className="flex items-start gap-2 text-sm font-bold text-neo-ink">
												<span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center border-2 border-neo-ink bg-neo-bg">
													<Check className="h-3.5 w-3.5 stroke-neo-ink" strokeWidth={4} />
												</span>
												{f}
											</li>
										))}
									</ul>

									<Button
										variant={plan.featured ? "primary" : "outline"}
										size="lg"
										className="mt-7 w-full"
									>
										{plan.cta}
									</Button>
								</Card>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
