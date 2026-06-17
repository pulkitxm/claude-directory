import { SectionLabel } from "../components/SectionLabel";
import { BENEFITS } from "../content";

/**
 * Benefit rows. On hover (desktop) the title slides right by 2rem and the
 * description, hidden by default, fades in — two transforms fired together.
 * On mobile there is no hover, so descriptions are shown permanently
 * (opacity-100) and the slide is disabled: the content is never gated behind a
 * pointer interaction.
 */
export function Benefits() {
	return (
		<section className="border-b-2 border-line py-24 md:py-32">
			<div className="mx-auto max-w-[95vw]">
				<SectionLabel index="04">The Payoff</SectionLabel>

				<div className="mt-12 grid gap-px grid-hairline border-2 border-line md:grid-cols-2">
					{BENEFITS.map((benefit) => (
						<div
							key={benefit.index}
							className="group relative bg-ink p-8 md:p-12"
						>
							<div className="flex items-start gap-6">
								<span className="shrink-0 pt-2 text-sm font-bold uppercase tracking-widest text-acid md:text-base">
									{benefit.index}
								</span>
								<div className="overflow-hidden">
									{/* No slide on mobile (no hover); on md+ the title slides +2rem on hover. */}
									<h3 className="font-bold uppercase leading-[0.9] tracking-tighter text-bone transition-transform duration-300 md:group-hover:translate-x-8 text-3xl md:text-4xl lg:text-5xl">
										{benefit.title}
									</h3>
									<p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground opacity-100 transition-opacity duration-300 md:text-lg md:opacity-0 md:group-hover:opacity-100">
										{benefit.body}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
