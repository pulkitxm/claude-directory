import { ChevronDown } from "lucide-react";
import { faqs } from "../lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * FAQ built on native <details>/<summary> for free keyboard accessibility and
 * no JS state. The chevron rotates via the `group-open:` variant, and each
 * panel is an organically-rounded card with a hover tint.
 */
export function Faq() {
	return (
		<section className="relative bg-muted/40 px-4 py-32 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<SectionHeading
					eyebrow="Before you steep"
					title={
						<>
							The questions we're{" "}
							<span className="italic text-primary">asked most.</span>
						</>
					}
				/>

				<div className="mx-auto mt-14 max-w-3xl space-y-4">
					{faqs.map((item, i) => (
						<Reveal key={item.q} delay={i * 0.06}>
							<details className="group rounded-[1.5rem] border border-border/50 bg-card px-6 shadow-soft transition-shadow duration-300 open:shadow-soft-lg [&_summary]:list-none">
								<summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-serif text-lg font-semibold text-foreground transition-colors duration-300 marker:hidden hover:text-primary">
									{item.q}
									<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-all duration-300 ease-organic group-open:rotate-180 group-open:bg-primary group-open:text-primary-foreground">
										<ChevronDown size={18} strokeWidth={2.5} />
									</span>
								</summary>
								<p className="pb-6 pr-12 text-base leading-relaxed text-muted-foreground">
									{item.a}
								</p>
							</details>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
