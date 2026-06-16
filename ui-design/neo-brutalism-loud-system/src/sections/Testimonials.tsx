import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../content";
import { Marquee } from "../components/Marquee";
import { SectionLabel } from "../components/Section";

/* A testimonials carousel built on the marquee — rotated quote cards scrolling
   right, each on a different token background. Five-star rows up top. */
export function Testimonials() {
	return (
		<section className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-bg">
			<div
				className="neo-dots pointer-events-none absolute inset-0 opacity-[0.1]"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-28">
				<div className="max-w-3xl">
					<SectionLabel bg="bg-neo-accent">Loud Reviews</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
						People Who
						<br />
						<span className="w-fit -rotate-1 bg-neo-secondary px-2">Stopped Whispering</span>
					</h2>
				</div>
			</div>

			<div className="relative mt-14 pb-24">
				<Marquee
					direction="right"
					speed={40}
					ariaLabel="Customer testimonials"
				>
					{TESTIMONIALS.map((t, i) => (
						<figure
							key={t.name}
							className={`mx-4 flex h-full w-[19rem] flex-col border-4 border-neo-ink ${t.bg} p-6 neo-shadow-md sm:w-[22rem] ${
								i % 2 === 0 ? "rotate-1" : "-rotate-1"
							}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex gap-0.5" aria-label="5 out of 5 stars">
									{Array.from({ length: 5 }).map((_, s) => (
										<Star
											key={s}
											className="h-4 w-4 fill-neo-ink stroke-neo-ink"
											strokeWidth={3}
											aria-hidden="true"
										/>
									))}
								</div>
								<Quote
									className="h-7 w-7 fill-neo-ink stroke-neo-ink"
									strokeWidth={2}
									aria-hidden="true"
								/>
							</div>
							<blockquote className="mt-4 flex-1 text-base font-bold leading-snug text-neo-ink">
								&ldquo;{t.quote}&rdquo;
							</blockquote>
							<figcaption className="mt-5 border-t-4 border-neo-ink pt-3">
								<p className="text-sm font-bold uppercase tracking-wide text-neo-ink">
									{t.name}
								</p>
								<p className="text-xs font-bold text-neo-ink/70">{t.role}</p>
							</figcaption>
						</figure>
					))}
				</Marquee>
			</div>
		</section>
	);
}
