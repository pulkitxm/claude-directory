/* "Doodled by teams at" strip — hand-lettered fake brand names on torn paper
   chips. No external logos needed; everything stays in the sketch idiom. */
import { radius } from "../lib/tokens";

const BRANDS = [
	"Doodlr",
	"Napkin Co.",
	"Sketchpad",
	"Inklings",
	"Crayon Labs",
	"Margins",
];

const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-2"];

export function LogoStrip() {
	return (
		<section className="px-6 py-12">
			<div className="mx-auto max-w-5xl">
				<p className="mb-7 text-center text-lg text-ink/60">
					Doodled on by curious teams at
				</p>
				<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5">
					{BRANDS.map((b, i) => (
						<li
							key={b}
							className={
								"border-2 border-dashed border-ink/50 bg-card px-5 py-2 font-[var(--font-marker)] text-xl text-ink/70 transition-all duration-100 hover:border-solid hover:text-ink " +
								TILTS[i % TILTS.length]
							}
							style={{ borderRadius: radius.wobblyMd }}
						>
							{b}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
