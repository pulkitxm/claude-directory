import { GlassCard, Reveal, SectionHeading } from "./Primitives";

type Quote = {
	body: string;
	name: string;
	role: string;
	initials: string;
};

const QUOTES: Quote[] = [
	{
		body: "We deleted our deploy dashboard. The whole team drives Aperture from ⌘K now — even our designers ship copy fixes at midnight.",
		name: "Priya Raman",
		role: "Staff Eng, Northwind",
		initials: "PR",
	},
	{
		body: "The cold-start traces paid for the year in one incident. It pointed at a single function while I was still rubbing my eyes.",
		name: "Marcus Vohl",
		role: "Platform Lead, Orbital",
		initials: "MV",
	},
	{
		body: "Auto-revert caught a bad release at 03:12. By the time the page buzzed, we were already green again. I went back to sleep.",
		name: "Dana Okafor",
		role: "SRE, Halcyon",
		initials: "DO",
	},
	{
		body: "It feels less like a deploy tool and more like a calm room. Warm, quiet, everything within reach. Exactly the vibe I want at 2am.",
		name: "Sven Aaltonen",
		role: "Founder, Cinder",
		initials: "SA",
	},
];

function Avatar({ initials }: { initials: string }) {
	return (
		<span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-amber-500/20 to-amber-700/10 font-mono text-xs font-medium text-accent">
			{initials}
		</span>
	);
}

export function Testimonials() {
	return (
		<section id="testimonials" className="section-y relative">
			<div className="container-x">
				<SectionHeading
					eyebrow="Customers"
					title="Loved by people who answer the pager."
					lede="The teams shipping after midnight tend to be picky about their tools. Here is what they say about ours."
				/>

				<div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
					{QUOTES.map((q, i) => (
						<Reveal key={q.name} delay={(i % 2) * 100}>
							<GlassCard
								interactive
								className="relative h-full overflow-hidden p-7 md:p-8"
							>
								{/* signature glowing accent line */}
								<span className="absolute left-0 top-7 h-12 w-[3px] rounded-full bg-accent shadow-[0_0_14px_2px_rgba(245,158,11,0.55)]" />
								<p className="pl-4 text-base leading-relaxed text-foreground/90 md:text-lg">
									“{q.body}”
								</p>
								<div className="mt-7 flex items-center gap-3 pl-4">
									<Avatar initials={q.initials} />
									<div>
										<div className="text-sm font-medium text-foreground">
											{q.name}
										</div>
										<div className="font-mono text-xs text-muted-foreground">
											{q.role}
										</div>
									</div>
								</div>
							</GlassCard>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
