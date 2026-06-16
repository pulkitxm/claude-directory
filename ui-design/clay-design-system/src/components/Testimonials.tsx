import type { CSSProperties } from "react";
import { Star, Quote } from "lucide-react";
import { Shell, SectionHeading, Card, Reveal, display } from "./primitives";

/* Testimonial cards that float up on hover. Amber star ratings, a soft quote
   glyph, and a gradient avatar orb per author. Single column on mobile → three
   across on desktop. */

type Testimonial = {
	quote: string;
	name: string;
	role: string;
	avatar: string; // gradient
	tint: string;
	initials: string;
};

const ITEMS: Testimonial[] = [
	{
		quote:
			"We swapped our flat card system for Claymakers in an afternoon. Engagement on our pricing page jumped — people literally want to press the buttons.",
		name: "Mara Liang",
		role: "Head of Product, Doughy",
		avatar: "linear-gradient(135deg,#c4b5fd,#7c3aed)",
		tint: "rgba(124,58,237,0.4)",
		initials: "ML",
	},
	{
		quote:
			"The 4-layer shadow tokens are the real deal. It's the first 'soft UI' that doesn't look like a vector illustration. It feels expensive.",
		name: "Tobias Reyes",
		role: "Design Lead, Velvet",
		avatar: "linear-gradient(135deg,#f9a8d4,#db2777)",
		tint: "rgba(219,39,119,0.4)",
		initials: "TR",
	},
	{
		quote:
			"Accessibility was my worry with anything this playful. The contrast floor and reduced-motion fallback are built in. We passed our audit untouched.",
		name: "Priya Anand",
		role: "Staff Engineer, Mochi",
		avatar: "linear-gradient(135deg,#7dd3fc,#0284c7)",
		tint: "rgba(2,132,199,0.4)",
		initials: "PA",
	},
];

export function Testimonials() {
	return (
		<section id="loved" className="py-16 sm:py-24">
			<Shell>
				<SectionHeading
					eyebrow="Loved by makers"
					title="Squishy, but seriously shippable"
					lead="Teams across product, design and engineering reach for clay — and their audits and dashboards agree."
				/>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{ITEMS.map((t, i) => (
						<Reveal key={t.name} delay={i * 100} className="flex">
							<Card className="h-full">
								<Quote
									size={36}
									className="text-clay-accent/25"
									fill="currentColor"
								/>
								<div className="mt-3 flex gap-0.5">
									{Array.from({ length: 5 }).map((_, s) => (
										<Star
											key={s}
											size={16}
											className="text-clay-amber"
											fill="currentColor"
										/>
									))}
								</div>
								<p className="mt-4 flex-1 text-base leading-relaxed text-clay-foreground">
									“{t.quote}”
								</p>
								<div className="mt-6 flex items-center gap-3">
									<span
										style={
											{
												backgroundImage: t.avatar,
												"--orb": t.tint,
											} as CSSProperties
										}
										className="grid h-12 w-12 place-items-center rounded-full text-white shadow-clay-orb"
									>
										<span style={display} className="text-sm font-black">
											{t.initials}
										</span>
									</span>
									<div>
										<div
											style={display}
											className="text-sm font-bold text-clay-foreground"
										>
											{t.name}
										</div>
										<div className="text-xs font-medium text-clay-muted">
											{t.role}
										</div>
									</div>
								</div>
							</Card>
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}
