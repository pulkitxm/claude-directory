import { FEATURES } from "../content";
import { Card } from "../components/Card";
import { SectionLabel, Reveal } from "../components/Section";

/* Color-blocked feature grid. Each card is a rotated sticker on a different
   token background, lifting on hover. The icon sits in its own bordered box. */
export function Features() {
	return (
		<section
			id="features"
			className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-bg"
		>
			<div
				className="neo-halftone pointer-events-none absolute inset-0 opacity-10"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
					<div>
						<SectionLabel bg="bg-neo-accent">Why It Hits</SectionLabel>
						<h2 className="mt-5 max-w-2xl text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
							Six Loud
							<br />
							<span className="w-fit -rotate-1 bg-neo-secondary px-2">
								Principles
							</span>
						</h2>
					</div>
					<p className="max-w-xs text-lg font-bold leading-snug text-neo-ink">
						No subtle anything. Each rule is exaggerated on purpose —
						that&apos;s the whole point.
					</p>
				</div>

				<div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature, i) => {
						const Icon = feature.icon;
						return (
							<Reveal key={feature.title} delay={(i % 3) * 80}>
								<Card
									bg={feature.bg}
									shadow="md"
									className={`h-full ${feature.rotate} p-6`}
								>
									<span className="inline-flex h-14 w-14 items-center justify-center border-4 border-neo-ink bg-neo-bg neo-shadow-sm">
										<Icon className="h-7 w-7 stroke-neo-ink" strokeWidth={3} />
									</span>
									<h3 className="mt-5 text-2xl font-bold uppercase tracking-tight text-neo-ink">
										{feature.title}
									</h3>
									<p className="mt-3 text-base font-bold leading-snug text-neo-ink/80">
										{feature.body}
									</p>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
