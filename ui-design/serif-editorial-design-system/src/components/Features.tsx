import { features } from "../data/content";
import { Card, Section, SectionLabel } from "./Primitives";
import { PlateQuill, PlateSpecimen, PlateLetter } from "./Plates";

const plateFor = {
	specimen: PlateSpecimen,
	letter: PlateLetter,
	quill: PlateQuill,
} as const;

export function Features() {
	return (
		<Section id="features">
			{/* lead-in */}
			<div className="mx-auto max-w-3xl text-center">
				<SectionLabel className="mx-auto mb-8 max-w-sm">The House</SectionLabel>
				<h2
					className="font-display leading-[1.16] tracking-[-0.01em] text-foreground"
					style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
				>
					Made the slow way, on purpose.
				</h2>
				<p className="dropcap prose-editorial mx-auto mt-7 max-w-2xl text-left text-[1.05rem] leading-relaxed text-muted-foreground sm:text-center">
					Roman &amp; Quill keeps three rooms — one for reading, one for
					setting, one for binding. A manuscript moves through them in order and
					at its own pace. What follows is not a feature list so much as a
					description of the work we refuse to rush.
				</p>
			</div>

			{/* feature grid */}
			<div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
				{features.map((f) => {
					const Plate = plateFor[f.plate];
					return (
						<Card
							key={f.title}
							accentTop
							hover
							className="flex flex-col p-8 lg:p-9"
						>
							<div className="mb-6 overflow-hidden rounded-md border border-border bg-muted">
								<Plate className="h-44 w-full" />
							</div>
							<div className="flex items-baseline gap-3">
								<span className="font-display text-2xl italic text-accent">
									{f.kicker}
								</span>
								<h3 className="font-display text-xl font-semibold leading-snug text-foreground">
									{f.title}
								</h3>
							</div>
							<p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
								{f.body}
							</p>
							<span aria-hidden className="rule mt-6 w-10 bg-accent" />
						</Card>
					);
				})}
			</div>
		</Section>
	);
}
