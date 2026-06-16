import { SectionLabel } from "../components/SectionLabel";
import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { PRICING } from "../content";

/**
 * Three equal pricing columns connected with gap-px hairlines. The featured
 * tier ships permanently inverted (acid fill, black text); the others hard-flip
 * to acid on hover. Prices are rendered at massive scale so the number reads as
 * a graphic, with a small superscript currency mark.
 */
export function Pricing() {
	return (
		<section id="pricing" className="border-b-2 border-line py-24 md:py-32">
			<div className="mx-auto max-w-[95vw]">
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div>
						<SectionLabel index="06">Passes</SectionLabel>
						<SectionHeading className="mt-8">
							Pick A<span className="text-acid"> Tier.</span>
						</SectionHeading>
					</div>
					<p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
						No hidden fees, no gradient buttons. One acid accent and three honest
						options.
					</p>
				</div>

				<div className="mt-16 grid gap-px grid-hairline border-2 border-line lg:grid-cols-3">
					{PRICING.map((tier) => {
						const featured = tier.featured;
						return (
							<div
								key={tier.name}
								className={[
									"group flex flex-col p-8 transition-colors duration-300 md:p-10",
									featured
										? "bg-acid text-acid-foreground"
										: "bg-ink text-bone hover:bg-acid hover:text-acid-foreground",
								].join(" ")}
							>
								<div className="flex items-center justify-between">
									<h3 className="text-2xl font-bold uppercase tracking-tighter md:text-3xl">
										{tier.name}
									</h3>
									{featured && (
										<span className="border-2 border-acid-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest">
											Popular
										</span>
									)}
								</div>

								<div className="mt-8 flex items-start">
									<span
										className={[
											"mt-3 text-2xl font-bold md:text-3xl",
											featured
												? "text-acid-foreground"
												: "text-muted-foreground group-hover:text-acid-foreground",
										].join(" ")}
									>
										$
									</span>
									<span className="font-bold leading-[0.8] tracking-tighter text-[6rem] md:text-[8rem]">
										{tier.price}
									</span>
									<span
										className={[
											"mt-auto pb-4 pl-2 text-sm font-bold uppercase tracking-tight md:text-base",
											featured
												? "text-acid-foreground"
												: "text-muted-foreground group-hover:text-acid-foreground",
										].join(" ")}
									>
										{tier.cadence}
									</span>
								</div>

								<ul className="mt-8 flex flex-col gap-3 border-t-2 border-current/30 pt-8">
									{tier.features.map((f) => (
										<li
											key={f}
											className="flex items-center gap-3 text-base font-medium md:text-lg"
										>
											<span aria-hidden="true" className="font-bold">
												+
											</span>
											{f}
										</li>
									))}
								</ul>

								<div className="mt-10 pt-2">
									<a href="#tickets" className="block">
										<Button
											variant={featured ? "outline" : "primary"}
											className={
												featured
													? "w-full border-acid-foreground text-acid-foreground hover:bg-acid-foreground hover:text-acid"
													: "w-full"
											}
										>
											Choose {tier.name}
										</Button>
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
