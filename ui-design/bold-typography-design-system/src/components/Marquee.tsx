import { motion } from "framer-motion";
import { marquee } from "../data/content";

// ─────────────────────────────────────────────────────────────────────────────
// Marquee — a full-bleed band of the system's adjectives scrolling on one crisp,
// linear loop. A poster signature that adds motion without decoration. The strip
// is duplicated so the translate wraps seamlessly; reduced-motion users get the
// static strip (the CSS in index.css freezes the animation).
// ─────────────────────────────────────────────────────────────────────────────

export function Marquee() {
	const items = [...marquee, ...marquee];
	return (
		<div className="overflow-hidden border-y border-border bg-muted py-5 md:py-6">
			<motion.div
				className="flex w-max items-center gap-10 md:gap-14"
				animate={{ x: ["0%", "-50%"] }}
				transition={{ duration: 28, ease: "linear", repeat: Infinity }}
				aria-hidden
			>
				{items.map((word, i) => (
					<div key={i} className="flex items-center gap-10 md:gap-14">
						<span className="whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
							{word}
						</span>
						<span className="h-2 w-2 shrink-0 bg-accent" />
					</div>
				))}
			</motion.div>
			{/* Accessible, visually-hidden text equivalent for the decorative strip */}
			<span className="sr-only">{marquee.join(", ")}</span>
		</div>
	);
}
