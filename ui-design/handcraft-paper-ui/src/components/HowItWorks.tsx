import { Card, StickyTag, SquigglyLine } from "./primitives";
import { useReveal } from "../lib/reveal";
import { radius } from "../lib/tokens";

const STEPS = [
	{
		n: 1,
		title: "Open a blank board",
		body: "Start from nothing — just warm paper and a dot grid. No template to fight, no empty-state guilt.",
		emoji: "📄",
	},
	{
		n: 2,
		title: "Dump every idea",
		body: "Notes, doodles, arrows, half-sentences. Get it all out of your head and onto the wall, fast and ugly.",
		emoji: "✏️",
	},
	{
		n: 3,
		title: "Make sense of the mess",
		body: "Cluster the keepers, circle the winners, and let the broom tidy the rest into a plan you can actually share.",
		emoji: "✨",
	},
];

export function HowItWorks() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section id="how" className="relative px-6 py-20">
			<div ref={ref} className="mx-auto max-w-5xl">
				<div className="mb-16 text-center">
					<StickyTag color="accent" tilt="-rotate-2">
						Three messy steps
					</StickyTag>
					<h2 className="mt-6 text-4xl text-ink md:text-5xl">
						From blank stare to bright idea
					</h2>
				</div>

				<div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
					{/* squiggly connectors between the three steps (desktop only) */}
					<SquigglyLine className="absolute left-[20%] top-9 hidden h-9 w-[26%] md:block" />
					<SquigglyLine className="absolute right-[20%] top-9 hidden h-9 w-[26%] md:block" />

					{STEPS.map((s, i) => (
						<div
							key={s.n}
							className="relative flex flex-col items-center text-center transition-all duration-500"
							style={{
								opacity: shown ? 1 : 0,
								transform: shown ? "translateY(0)" : "translateY(24px)",
								transitionDelay: `${i * 140}ms`,
							}}
						>
							{/* elevated step number */}
							<span
								className="relative z-10 grid h-20 w-20 place-items-center border-[3px] border-ink bg-card font-[var(--font-marker)] text-4xl font-bold shadow-[var(--shadow-hard)]"
								style={{
									borderRadius: radius.blob,
									transform: i % 2 === 0 ? "rotate(-4deg)" : "rotate(4deg)",
								}}
							>
								{s.n}
							</span>

							<Card
								tilt={i % 2 === 0 ? "rotate-1" : "-rotate-1"}
								hoverJiggle
								className="mt-8 w-full p-7"
								radiusValue={radius.wobblyLg}
							>
								<div className="mb-3 text-4xl" aria-hidden>
									{s.emoji}
								</div>
								<h3 className="text-2xl text-ink">{s.title}</h3>
								<p className="mt-3 text-lg text-ink/75">{s.body}</p>
							</Card>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
