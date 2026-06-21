import { testimonials } from "../data/content";
import { Card, Section, SectionLabel } from "./Primitives";
import { PlatePortrait } from "./Plates";

export function Testimonials() {
	const [lead, ...rest] = testimonials;

	return (
		<Section id="testimonials">
			<div className="mx-auto mb-16 max-w-2xl text-center">
				<SectionLabel className="mx-auto mb-8 max-w-xs">
					In the Margins
				</SectionLabel>
				<h2
					className="font-display leading-[1.16] tracking-[-0.01em] text-foreground"
					style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
				>
					What our readers keep.
				</h2>
			</div>

			{/* lead testimonial — large, with oversized gold quote mark */}
			<Card elevated accentTop className="relative overflow-hidden p-9 md:p-14">
				<span
					aria-hidden
					className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[12rem] leading-none text-accent/15 md:text-[16rem]"
				>
					&ldquo;
				</span>
				<div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
					<blockquote className="font-display text-2xl font-medium leading-[1.4] text-foreground md:text-[2rem] md:leading-[1.35]">
						{lead.quote}
					</blockquote>
					<figcaption className="flex items-center gap-4 md:flex-col md:items-center md:text-center">
						<PlatePortrait
							seed={lead.seed}
							className="h-20 w-20 shrink-0 md:h-24 md:w-24"
						/>
						<div>
							<p className="font-display text-lg text-foreground">
								{lead.name}
							</p>
							<p className="small-caps mt-1 text-muted-foreground">
								{lead.role}
							</p>
						</div>
					</figcaption>
				</div>
			</Card>

			{/* supporting testimonials */}
			<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
				{rest.map((t) => (
					<Card key={t.name} hover className="flex flex-col p-8 lg:p-9">
						<span
							aria-hidden
							className="font-display text-5xl leading-none text-accent/70"
						>
							&ldquo;
						</span>
						<blockquote className="mt-2 flex-1 text-[1.05rem] italic leading-relaxed text-foreground/90">
							{t.quote}
						</blockquote>
						<span aria-hidden className="rule mt-7 w-full" />
						<figcaption className="mt-5 flex items-center gap-4">
							<PlatePortrait seed={t.seed} className="h-12 w-12 shrink-0" />
							<div>
								<p className="font-display text-base text-foreground">
									{t.name}
								</p>
								<p className="small-caps mt-0.5 text-muted-foreground">
									{t.role}
								</p>
							</div>
						</figcaption>
					</Card>
				))}
			</div>
		</Section>
	);
}
