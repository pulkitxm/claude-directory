import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../components/Button";
import { BackgroundNumber } from "../components/BackgroundNumber";
import { usePrefersReducedMotion } from "../hooks";

/**
 * The poster's cover. A viewport-width display lockup — `clamp(3rem,12vw,14rem)`
 * — sits over a towering muted background number. As the user scrolls the hero
 * out, Framer Motion's useScroll drives a zoom-out (scale 1 → 1.2) and fade
 * (opacity 1 → 0), so entering the page feels like pulling back from the print.
 */
export function Hero() {
	const ref = useRef<HTMLElement>(null);
	const reduced = usePrefersReducedMotion();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	// Only the first ~40% of the hero's scroll-out drives the zoom.
	const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);
	const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

	const style = reduced ? undefined : { scale, opacity };

	return (
		<section
			id="top"
			ref={ref}
			className="relative flex min-h-[92vh] items-center overflow-hidden border-b-2 border-line"
		>
			{/* Towering decorative background number — pure graphic, behind content. */}
			<BackgroundNumber className="absolute -right-[2vw] top-1/2 -z-10 -translate-y-1/2 leading-none text-muted/60 text-[40vw] md:text-[34vw]">
				05
			</BackgroundNumber>

			<motion.div
				style={style}
				className="relative z-10 mx-auto w-full max-w-[95vw] origin-left py-20 md:py-28"
			>
				<div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
					<span className="bg-acid px-3 py-1 font-bold text-acid-foreground">
						Vol. 05
					</span>
					<span>Berlin — Oct 24–26</span>
					<span className="hidden md:inline">Kinetic Typography Festival</span>
				</div>

				<h1 className="font-bold uppercase leading-[0.82] tracking-tighter text-[clamp(3rem,12vw,14rem)]">
					<span className="block">Make</span>
					<span className="block text-acid">Type</span>
					<span className="block">Move.</span>
				</h1>

				<div className="mt-8 flex max-w-2xl flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
					<p className="text-lg font-medium leading-tight text-muted-foreground md:text-xl lg:text-2xl">
						A three-day festival where letterforms stop sitting still. Posters
						that scroll, headlines that scream, and one acid-yellow accent doing
						all the heavy lifting.
					</p>
				</div>

				<div className="mt-10 flex flex-wrap items-center gap-4">
					<a href="#tickets">
						<Button size="lg">Get Tickets</Button>
					</a>
					<a href="#program">
						<Button size="lg" variant="outline">
							See Program
						</Button>
					</a>
				</div>
			</motion.div>

			{/* Scroll cue */}
			<div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground md:flex">
				<span>Scroll</span>
				<span className="inline-block h-8 w-px bg-line" aria-hidden="true" />
			</div>
		</section>
	);
}
