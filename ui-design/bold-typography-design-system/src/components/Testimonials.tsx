import { testimonials } from "../data/content";
import {
	Card,
	Reveal,
	RevealGroup,
	RevealItem,
	SectionLabel,
} from "./Primitives";

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials — the only place Playfair Display appears, used for the pull
// quotes to create elegant serif contrast against the sans headlines. A large
// lead quote sits above a 1 → 2 → 3 column grid of supporting voices.
// ─────────────────────────────────────────────────────────────────────────────

export function Testimonials() {
	const [lead, ...rest] = testimonials;

	return (
		<section className="border-b border-border py-20 md:py-28 lg:py-32">
			<div className="container-bold">
				<Reveal>
					<SectionLabel>From the studios</SectionLabel>
				</Reveal>

				{/* Lead pull quote — Playfair Display, oversized */}
				<Reveal className="mt-10 max-w-4xl">
					<figure>
						<span
							aria-hidden
							className="font-display text-7xl leading-none text-accent"
						>
							“
						</span>
						<blockquote className="-mt-6 font-display text-3xl italic leading-snug text-foreground sm:text-4xl md:text-5xl">
							{lead.quote}
						</blockquote>
						<figcaption className="mt-8 flex items-center gap-3 label-mono">
							<span aria-hidden className="h-px w-8 bg-accent" />
							<span className="text-foreground">{lead.author}</span>
							<span className="text-muted-foreground">— {lead.role}</span>
						</figcaption>
					</figure>
				</Reveal>

				{/* Supporting voices */}
				<RevealGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
					{rest.map((t) => (
						<RevealItem key={t.author} as="div">
							<Card
								interactive
								className="flex h-full flex-col justify-between"
							>
								<blockquote className="font-display text-xl italic leading-snug text-foreground md:text-2xl">
									{t.quote}
								</blockquote>
								<figcaption className="mt-8 flex items-baseline gap-2">
									<span className="text-sm font-semibold uppercase tracking-wide text-foreground">
										{t.author}
									</span>
									<span className="font-mono text-xs text-muted-foreground">
										/ {t.role}
									</span>
								</figcaption>
							</Card>
						</RevealItem>
					))}
				</RevealGroup>
			</div>
		</section>
	);
}
