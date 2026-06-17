import { SectionLabel } from "../components/SectionLabel";
import { SectionHeading } from "../components/SectionHeading";
import { FEATURES } from "../content";

/**
 * Sticky-stacking feature cards. Each card is `sticky` at a staggered top
 * offset, so as the user scrolls, later cards slide up and overlap the earlier
 * ones — physical stacking, no transform animation needed. Every card hard-
 * flips to an acid fill with black text on hover, coordinated via `group`.
 */
export function StickyFeatures() {
	return (
		<section className="relative border-b-2 border-line py-24 md:py-32">
			<div className="mx-auto max-w-[95vw]">
				<SectionLabel index="02">Why Kinetic</SectionLabel>
				<SectionHeading className="mt-8 max-w-4xl">
					Three Rules,
					<br />
					<span className="text-acid">No Compromise.</span>
				</SectionHeading>

				<div className="mt-16 flex flex-col gap-6">
					{FEATURES.map((feature, i) => (
						<article
							key={feature.index}
							style={{ top: `calc(6rem + ${i * 2.5}rem)` }}
							className="group sticky overflow-hidden border-2 border-line bg-ink p-8 transition-colors duration-300 hover:border-acid hover:bg-acid md:p-12"
						>
							{/* Decorative number inside the card */}
							<span
								aria-hidden="true"
								className="pointer-events-none absolute -right-2 -top-10 select-none font-bold leading-none tracking-tighter text-muted transition-colors duration-300 text-[8rem] group-hover:text-acid-foreground/10 md:text-[12rem]"
							>
								{feature.index}
							</span>

							<div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
								<div className="max-w-3xl">
									<span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-acid transition-colors duration-300 group-hover:text-acid-foreground md:text-sm">
										{feature.tag}
									</span>
									<h3 className="font-bold uppercase leading-[0.9] tracking-tighter text-bone transition-colors duration-300 group-hover:text-acid-foreground text-3xl md:text-5xl lg:text-6xl">
										{feature.title}
									</h3>
									<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-acid-foreground/80 md:text-lg lg:text-xl">
										{feature.body}
									</p>
								</div>
								<span className="shrink-0 text-sm font-bold uppercase tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-acid-foreground">
									[{feature.index} / 03]
								</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
