import { Shell, Reveal, Eyebrow, Blob, Square } from "./primitives";

/* HOW IT WORKS — dark gray (Gray 900) color block. Big numbered steps, each
   step keyed to a different accent color. Bold type on dark, no shadows. */
const STEPS = [
	{
		n: "01",
		title: "Drop in the tokens",
		body: "One file defines color, type, radius. Import it and the whole palette is live — no theme wiring.",
		accent: "var(--color-brand)",
	},
	{
		n: "02",
		title: "Compose primitives",
		body: "Build screens from Section, Card, Button and Field. Every piece already obeys the flat rules.",
		accent: "var(--color-sun)",
	},
	{
		n: "03",
		title: "Block with color",
		body: "Alternate white, gray and bold accent sections. Color separates structure — never a line or shadow.",
		accent: "var(--color-grass)",
	},
	{
		n: "04",
		title: "Ship it sharp",
		body: "Snappy 200ms interactions, AA contrast, tiny bundles. A poster that happens to be a product.",
		accent: "#ffffff",
	},
];

export function HowItWorks() {
	return (
		<section
			id="how"
			className="on-dark relative overflow-hidden bg-[var(--color-ink)] py-20 text-white lg:py-28"
		>
			<Blob className="right-[-8rem] top-[-6rem] h-80 w-80 bg-white/[0.04]" />
			<Square rotate={16} className="left-[-3rem] bottom-10 h-44 w-44 bg-white/[0.03]" />

			<Shell className="relative">
				<Reveal className="max-w-2xl">
					<Eyebrow className="text-[var(--color-sun)]">The workflow</Eyebrow>
					<h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
						From tokens to shipped in four moves.
					</h2>
				</Reveal>

				<div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
					{STEPS.map((s, i) => (
						<Reveal key={s.n} delay={i * 0.08}>
							<div className="group">
								<div
									className="text-7xl font-extrabold leading-none tracking-tighter transition-transform duration-200 group-hover:scale-105"
									style={{ color: s.accent }}
								>
									{s.n}
								</div>
								<div
									className="mt-5 h-1.5 w-12 rounded-full"
									style={{ backgroundColor: s.accent }}
								/>
								<h3 className="mt-5 text-xl font-bold tracking-tight">
									{s.title}
								</h3>
								<p className="mt-3 leading-relaxed text-gray-400">{s.body}</p>
							</div>
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}
