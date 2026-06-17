import { SectionLabel } from "../components/SectionLabel";
import { SectionHeading } from "../components/SectionHeading";
import { PROCESS } from "../content";

/**
 * Three-step process as a connected card system: a single grid with `gap-px`
 * over a line-colored container creates hairline dividers between cells. Each
 * cell carries a massive number used as a graphic shape, and hard-flips to acid
 * on hover.
 */
export function Process() {
	return (
		<section id="process" className="border-b-2 border-line py-24 md:py-32">
			<div className="mx-auto max-w-[95vw]">
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div>
						<SectionLabel index="03">The Process</SectionLabel>
						<SectionHeading className="mt-8">
							Strip. Scale.
							<br />
							<span className="text-acid">Move.</span>
						</SectionHeading>
					</div>
					<p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
						The whole method in three moves. Take anything generic and run it
						through these and it comes out kinetic.
					</p>
				</div>

				{/* Hairline-connected grid */}
				<div className="mt-16 grid grid-hairline gap-px border-2 border-line md:grid-cols-3">
					{PROCESS.map((step) => (
						<div
							key={step.number}
							className="group relative flex min-h-[20rem] flex-col justify-between overflow-hidden bg-ink p-8 transition-colors duration-300 hover:bg-acid md:p-10"
						>
							<span className="font-bold leading-none tracking-tighter text-muted transition-colors duration-300 group-hover:text-acid-foreground text-[6rem] md:text-[8rem]">
								{step.number}
							</span>
							<div>
								<h3 className="font-bold uppercase tracking-tighter text-bone transition-colors duration-300 group-hover:text-acid-foreground text-2xl md:text-3xl lg:text-4xl">
									{step.title}
								</h3>
								<p className="mt-3 max-w-xs text-base leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-acid-foreground/80 md:text-lg">
									{step.body}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
