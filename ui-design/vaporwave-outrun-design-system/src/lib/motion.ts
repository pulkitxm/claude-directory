import type { Variants } from "motion/react";

/* Centralized motion vocabulary. Snappy and mechanical to match the design
   system: short durations and a near-linear feel rather than organic springs.
   Used by the <Reveal> primitive so every section animates in identically. */

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};

/* Shared viewport-reveal props. amount 0.2 so sections trigger a touch early. */
export const reveal = {
	initial: "hidden",
	whileInView: "show",
	viewport: { once: true, amount: 0.2 },
} as const;

export const REVEAL_TRANSITION = { duration: 0.4, ease: "linear" } as const;
