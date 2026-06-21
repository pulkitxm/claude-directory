import { Sparkles, ArrowRight } from "lucide-react";
import {
	LinkButton,
	StickyTag,
	ScribbleArrow,
	CornerFrames,
	AvatarStack,
} from "./primitives";
import { BoardSketch } from "./BoardSketch";
import { radius } from "../lib/tokens";

export function Hero() {
	return (
		<section id="top" className="relative px-6 pt-16 pb-20 md:pt-20">
			<div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
				{/* ---- Left: copy ---- */}
				<div className="relative">
					<StickyTag color="postit" className="mb-6">
						<span className="inline-flex items-center gap-1.5">
							<Sparkles size={18} strokeWidth={2.75} />
							No grid. No rules. Just ideas.
						</span>
					</StickyTag>

					<h1 className="text-5xl leading-[1.04] text-ink md:text-6xl">
						Think out loud,
						<br />
						right on the
						<span className="relative mx-2 inline-block text-accent">
							paper
							{/* hand-drawn highlighter sweep under the word */}
							<svg
								aria-hidden
								viewBox="0 0 220 30"
								preserveAspectRatio="none"
								className="absolute -bottom-2 left-0 h-4 w-full"
								fill="none"
								stroke="var(--color-accent)"
								strokeWidth="6"
								strokeLinecap="round"
							>
								<path d="M6 18 Q 110 4 214 16" />
							</svg>
						</span>
						{/* rotating exclamation mark */}
						<span className="ml-1 inline-block origin-bottom animate-[wiggle_2.2s_ease-in-out_infinite] text-pen">
							!
						</span>
					</h1>

					<p className="mt-7 max-w-md text-lg text-ink/75 md:text-xl">
						Scribbly is the messy-on-purpose whiteboard for teams who think with
						their hands. Sticky notes, doodles, and half-baked arrows — exactly
						like the wall behind your desk, but it never runs out of space.
					</p>

					<div className="relative mt-9 flex flex-wrap items-center gap-4">
						<LinkButton href="#pricing" className="text-lg md:text-2xl">
							Start scribbling
							<ArrowRight size={22} strokeWidth={2.75} />
						</LinkButton>
						<LinkButton
							href="#how"
							variant="secondary"
							className="text-lg md:text-2xl"
						>
							See how it works
						</LinkButton>

						{/* dashed arrow doodle pointing at the primary CTA (desktop only) */}
						<ScribbleArrow className="absolute -right-6 -top-20 hidden h-20 w-28 -scale-x-100 rotate-6 md:block" />
						<span className="absolute -right-12 -top-24 hidden -rotate-6 font-[var(--font-marker)] text-lg text-ink/70 md:block">
							start here!
						</span>
					</div>

					{/* social proof */}
					<div className="mt-10 flex items-center gap-4">
						<AvatarStack count={5} />
						<p className="text-base text-ink/70 md:text-lg">
							<span className="font-[var(--font-marker)] text-ink">
								12,400+
							</span>{" "}
							messy thinkers already on board
						</p>
					</div>
				</div>

				{/* ---- Right: hand-drawn board placeholder ---- */}
				<div className="relative">
					{/* bouncing decorative circle (desktop only) */}
					<span
						className="anim-bob absolute -left-8 -top-10 hidden h-20 w-20 border-[3px] border-ink bg-postit shadow-[var(--shadow-hard-sm)] md:grid md:place-items-center"
						style={{
							borderRadius: radius.blob,
							["--bob-rot" as string]: "-8deg",
						}}
						aria-hidden
					>
						<span className="font-[var(--font-marker)] text-3xl">?</span>
					</span>

					<div
						className="relative rotate-2 border-[3px] border-ink bg-card p-5 shadow-[var(--shadow-hard-lg)]"
						style={{ borderRadius: radius.wobblyLg }}
					>
						<CornerFrames />
						<div
							className="overflow-hidden border-2 border-dashed border-ink/40 bg-paper"
							style={{ borderRadius: radius.wobblyMd }}
						>
							<BoardSketch className="h-auto w-full" />
						</div>
						{/* taped caption strip */}
						<div className="mt-4 flex items-center justify-between px-1">
							<span className="font-[var(--font-marker)] text-lg text-ink">
								board: “Q3 brainstorm”
							</span>
							<span className="flex items-center gap-1.5 text-base text-ink/60">
								<span className="h-2.5 w-2.5 rounded-full bg-accent" />
								<span className="h-2.5 w-2.5 rounded-full bg-postit" />
								<span className="h-2.5 w-2.5 rounded-full bg-pen" />
							</span>
						</div>
					</div>

					{/* little pinned "live" sticky badge */}
					<span
						className="absolute -bottom-6 -right-3 -rotate-6 border-2 border-ink bg-accent px-4 py-1.5 text-base text-white shadow-[var(--shadow-hard-sm)] md:text-lg"
						style={{ borderRadius: radius.wobblyMd }}
					>
						7 people sketching now
					</span>
				</div>
			</div>
		</section>
	);
}
