import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants for the design system's entrance choreography.
 * Centralized so every section breathes with the same rhythm and easing.
 */

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 28 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
};

export const stagger: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/** Shared in-view config for scroll-triggered entrances. */
export const viewport = { once: true, amount: 0.15, margin: "-60px" } as const;
