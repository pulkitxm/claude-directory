import { Shell } from "./primitives";

/* A continuous flat logo marquee. Wordmarks only — flat, monochrome ink, no
   boxes or shadows. Sits on white between the hero and stats. */
const BRANDS = [
	"Northwind",
	"Quadrant",
	"Helix",
	"Monolith",
	"Cobalt",
	"Paperplane",
	"Vertex",
	"Lumen",
];

export function LogoStrip() {
	return (
		<div className="border-b-2 border-[var(--color-fog)] bg-[var(--color-canvas)] py-10">
			<Shell>
				<p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
					Trusted by teams who ship without the gloss
				</p>
			</Shell>
			<div className="marquee-mask relative w-full overflow-hidden">
				<div className="marquee-track gap-16 pr-16">
					{[...BRANDS, ...BRANDS].map((b, i) => (
						<span
							key={`${b}-${i}`}
							className="shrink-0 text-2xl font-extrabold tracking-tight text-gray-300"
						>
							{b}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
