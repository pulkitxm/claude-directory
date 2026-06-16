import type { Variants } from "motion/react";

/**
 * Shared motion language. The mechanical easing curve [0.175,0.885,0.32,1.275]
 * gives the slight spring overshoot the design system asks for, so entrances
 * "settle" like a physical switch rather than glide.
 */
export const MECH_EASE = [0.175, 0.885, 0.32, 1.275] as const;

export const slideUp: Variants = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: MECH_EASE },
	},
};

export const slideIn = (x: number): Variants => ({
	hidden: { opacity: 0, x },
	show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: MECH_EASE } },
});

export const stagger: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Re-usable viewport config so sections reveal once, slightly before center. */
export const inView = { once: true, amount: 0.25 } as const;
