import {
	Footprints,
	Wind,
	FlaskConical,
	CupSoda,
	type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { steps } from "../lib/content";

const icons: Record<string, LucideIcon> = {
	Footprints,
	Wind,
	FlaskConical,
	CupSoda,
};

/**
 * The four-step ritual from field to cup. A hand-drawn, dashed, curved SVG path
 * weaves between the steps on desktop (never a straight connector line), echoing
 * the "no straight lines in nature" tenet. Each step sits in a card with a moss
 * number token.
 */
export function HowItWorks() {
	return (
		<section
			id="how"
			className="relative overflow-hidden bg-accent/30 px-4 py-32 sm:px-6 lg:px-8"
		>
			<div className="relative mx-auto max-w-6xl">
				<SectionHeading
					eyebrow="From field to cup"
					title={
						<>
							Four slow steps,{" "}
							<span className="italic text-primary">no shortcuts.</span>
						</>
					}
					intro="We don't have a factory line. We have a footpath, a drying room, an oak table, and your kettle. Here's the whole journey."
				/>

				<div className="relative mt-20">
					{/* hand-drawn dashed connector, desktop only */}
					<svg
						className="pointer-events-none absolute inset-x-0 top-12 hidden h-24 w-full text-secondary/60 lg:block"
						viewBox="0 0 1000 120"
						fill="none"
						preserveAspectRatio="none"
						aria-hidden
					>
						<path
							d="M120 60 C 220 -10 280 110 375 56 C 470 4 540 110 625 58 C 720 6 780 118 880 56"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeDasharray="2 12"
							strokeLinecap="round"
						/>
					</svg>

					<ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
						{steps.map((s, i) => {
							const Icon = icons[s.icon] ?? Footprints;
							return (
								<Reveal
									key={s.number}
									delay={i * 0.12}
									as="li"
									className="h-full"
								>
									<div className="group flex h-full flex-col items-center rounded-[2rem] border border-border/50 bg-card p-8 text-center shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1.5 hover:shadow-soft-lg">
										<div className="relative">
											<span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-500 ease-organic group-hover:scale-110">
												<Icon size={26} strokeWidth={2} />
											</span>
											<span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-secondary font-serif text-xs font-bold text-secondary-foreground">
												{s.number}
											</span>
										</div>
										<h3 className="mt-6 text-2xl font-semibold text-foreground">
											{s.title}
										</h3>
										<p className="mt-2 text-base leading-relaxed text-muted-foreground">
											{s.body}
										</p>
									</div>
								</Reveal>
							);
						})}
					</ol>
				</div>
			</div>
		</section>
	);
}
