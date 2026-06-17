import { KineticMarquee } from "../components/KineticMarquee";
import { SectionLabel } from "../components/SectionLabel";
import { SectionHeading } from "../components/SectionHeading";
import { TESTIMONIALS } from "../content";

/**
 * The slower marquee (speed 40) for reading content. Wide bordered quote cards
 * with a border-l-4 acid accent, generous spacing between items, raw edges.
 */
export function TestimonialsMarquee() {
	return (
		<section className="border-b-2 border-line py-24 md:py-32">
			<div className="mx-auto mb-12 max-w-[95vw]">
				<SectionLabel index="05">From The Floor</SectionLabel>
				<SectionHeading className="mt-8">
					They Turned It
					<br />
					<span className="text-acid">All The Way Up.</span>
				</SectionHeading>
			</div>

			<KineticMarquee speed={40} label="Attendee testimonials">
				{TESTIMONIALS.map((t) => (
					<figure
						key={t.name}
						className="mx-4 flex h-full w-[78vw] flex-col justify-between border-2 border-l-4 border-line border-l-acid bg-ink p-8 sm:w-[60vw] md:w-[34rem] md:p-10"
					>
						<blockquote className="text-xl font-medium leading-tight text-bone md:text-2xl lg:text-3xl">
							“{t.quote}”
						</blockquote>
						<figcaption className="mt-8 flex flex-col">
							<span className="text-sm font-bold uppercase tracking-tight text-acid md:text-base">
								{t.name}
							</span>
							<span className="text-sm text-muted-foreground">{t.role}</span>
						</figcaption>
					</figure>
				))}
			</KineticMarquee>
		</section>
	);
}
