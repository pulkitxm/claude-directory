
import type { Variants, Transition } from "motion/react";

export const EASE_REFINED = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = {
	duration: 0.6,
	ease: EASE_REFINED,
};


export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 26 },
	show: { opacity: 1, y: 0, transition: baseTransition },
};


export const stagger = (
	staggerChildren = 0.09,
	delayChildren = 0,
): Variants => ({
	hidden: {},
	show: {
		transition: { staggerChildren, delayChildren },
	},
});


export const popIn: Variants = {
	hidden: { opacity: 0, y: 20, scale: 0.97 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.65, ease: EASE_REFINED },
	},
};


export const inView = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" };
