import { Check } from "lucide-react";
import { Card, StickyTag, Tape } from "./primitives";
import { useReveal } from "../lib/reveal";
import { radius } from "../lib/tokens";

const CHECKS = [
	"Drag-anywhere sticky notes in 6 paper colors",
	"Pressure-style ink pen with a real eraser",
	"Live cursors that look like tiny pencils",
	"One-tap “tidy up” to align the chaos",
	"Version history back to the very first stroke",
	"Export as a poster, PDF, or live link",
];

export function ProductDetail() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section id="product" className="px-6 py-20">
			<div
				ref={ref}
				className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2"
			>
				{/* ---- Copy with drop-cap ---- */}
				<div
					className="transition-all duration-500"
					style={{
						opacity: shown ? 1 : 0,
						transform: shown ? "translateX(0)" : "translateX(-24px)",
					}}
				>
					<StickyTag color="muted" tilt="rotate-1">
						A closer look at the board
					</StickyTag>
					<h2 className="mt-6 text-4xl text-ink md:text-5xl">
						It behaves like paper.
						<br /> It just never tears.
					</h2>
					<p className="mt-6 text-lg text-ink/80 md:text-xl">
						<span
							className="float-left mr-3 mt-1 font-[var(--font-marker)] text-6xl font-bold leading-[0.8] text-accent"
							aria-hidden
						>
							S
						</span>
						cribbly keeps the good parts of a physical whiteboard — the
						speed, the mess, the permission to be wrong — and quietly
						removes the bad ones. Notes don't fall off. Markers don't dry
						out. And when the wall fills up, it just gets bigger. Pan out
						and your whole quarter of thinking is still right there,
						exactly where you left it.
					</p>
					<p className="mt-4 text-lg text-ink/70">
						No accounts to wrangle, no onboarding tour. Open a board,
						hand out the link, and start making a beautiful mess together.
					</p>
				</div>

				{/* ---- Sticky-note checklist card ---- */}
				<div
					className="relative transition-all duration-500"
					style={{
						opacity: shown ? 1 : 0,
						transform: shown ? "translateX(0)" : "translateX(24px)",
						transitionDelay: "120ms",
					}}
				>
					{/* post-it yellow sticky-note tag on the card */}
					<span
						className="absolute -left-3 -top-5 z-10 -rotate-6 border-2 border-ink bg-postit px-4 py-1.5 font-[var(--font-marker)] text-lg shadow-[var(--shadow-hard-sm)]"
						style={{ borderRadius: radius.wobblyMd }}
					>
						in the box →
					</span>

					<Card
						postit
						hoverJiggle={false}
						tilt="rotate-1"
						className="p-8"
						radiusValue={radius.wobblyLg}
					>
						<Tape />
						<ul className="space-y-4">
							{CHECKS.map((c) => (
								<li key={c} className="flex items-start gap-3">
									<span
										className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center border-2 border-ink bg-card text-pen"
										style={{ borderRadius: radius.blob }}
									>
										<Check size={17} strokeWidth={3.25} />
									</span>
									<span className="text-lg text-ink md:text-xl">{c}</span>
								</li>
							))}
						</ul>
					</Card>
				</div>
			</div>
		</section>
	);
}
