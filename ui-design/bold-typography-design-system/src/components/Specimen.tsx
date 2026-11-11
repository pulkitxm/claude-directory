const specimenImg = "field-1";
import { Reveal, SectionLabel } from "./Primitives";
import { Check } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Specimen (Benefits / Product Detail) ,  a stacked → 2-column side-by-side block.
// The right card uses the system's special depth technique: an absolute accent
// top bar (h-1 w-16) plus layered text (a duplicate offset behind in border
// color), giving dimensionality with zero shadows.
// ─────────────────────────────────────────────────────────────────────────────

const points = [
	"Three vendored faces: Inter Tight, Playfair Display, JetBrains Mono",
	"A 13-step ramp from 12px fine print to 160px decorative numerals",
	"Tracking presets from -0.06em display to 0.2em sparse emphasis",
];

export function Specimen() {
	return (
		<section className="border-b border-border py-20 md:py-28 lg:py-32">
			<div className="container-bold grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
				{}
				<Reveal>
					<SectionLabel>The Specimen</SectionLabel>
					<h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
						One ramp, <span className="text-accent">total control.</span>
					</h2>
					<p className="mt-6 max-w-xl text-lg leading-normal text-muted-foreground">
						The whole system rides on a single type ramp. Sans does the
						structure, the serif appears only for a pull quote, and mono carries
						every label and statistic.
					</p>
					<ul className="mt-8 space-y-4">
						{points.map((p) => (
							<li
								key={p}
								className="flex items-start gap-3 text-base text-foreground"
							>
								<Check
									size={18}
									strokeWidth={1.5}
									className="mt-1 shrink-0 text-accent"
									aria-hidden
								/>
								<span className="text-muted-foreground">{p}</span>
							</li>
						))}
					</ul>
				</Reveal>

				{}
				<Reveal>
					<div className="relative">
						{}
						<span
							aria-hidden
							className="absolute -top-2 left-0 z-10 h-1 w-16 bg-accent"
						/>
						{}
						<span
							aria-hidden
							className="absolute left-2 top-2 -z-10 hidden h-full w-full border border-border md:block"
						/>
						<div className="overflow-hidden border border-border">
							<div data-visual={specimenImg} aria-label="Procedural color study" className={["procedural-visual", "block w-full"].join(" ")} data-loading="lazy" role="img" />
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
