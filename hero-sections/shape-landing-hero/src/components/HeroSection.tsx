import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

/**
 * Wraps the verbatim `HeroGeometric` component (the integrated shadcn piece)
 * and overlays the call-to-action buttons + social proof a real above-the-fold
 * section needs. The component itself is left untouched; everything extra lives
 * in this absolutely-positioned layer so the original API stays pristine.
 */
export default function HeroSection() {
	return (
		<section id="top" className="relative">
			{/* The integrated component, rendered with the demo's props. */}
			<HeroGeometric
				badge="Kokonut UI"
				title1="Elevate Your"
				title2="Digital Vision"
			/>

			{/* CTA + proof layer, aligned to the hero's centered copy column. */}
			<div className="pointer-events-none absolute inset-x-0 bottom-[14%] z-20 flex justify-center px-4 sm:bottom-[16%] md:bottom-[18%]">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
					className="pointer-events-auto flex flex-col items-center gap-6"
				>
					<div className="flex flex-col items-center gap-3 sm:flex-row">
						<Button size="lg" className="group">
							Start building
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
						</Button>
						<Button variant="outline" size="lg" className="group">
							<Play className="h-3.5 w-3.5 fill-current" />
							Watch the reel
						</Button>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex -space-x-2">
							{[
								"from-indigo-400 to-indigo-600",
								"from-rose-400 to-rose-600",
								"from-amber-400 to-amber-600",
								"from-cyan-400 to-cyan-600",
							].map((g) => (
								<span
									key={g}
									className={`h-7 w-7 rounded-full border-2 border-[#030303] bg-gradient-to-br ${g}`}
								/>
							))}
						</div>
						<span className="text-xs text-white/40">
							Trusted by 4,000+ design teams
						</span>
					</div>
				</motion.div>
			</div>

			{/* Scroll cue */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2 }}
				className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
			>
				<div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
					<motion.span
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
						className="h-1.5 w-1 rounded-full bg-white/50"
					/>
				</div>
			</motion.div>
		</section>
	);
}
