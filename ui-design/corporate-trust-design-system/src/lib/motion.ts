/* Shared Motion presets — "Refined Motion": smooth, professional, never jarring.
   Centralized so every reveal across the page shares one easing + rhythm and we
   never sprinkle one-off transition objects through components. */
import type { Variants, Transition } from "motion/react";

export const EASE_REFINED = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = {
	duration: 0.6,
	ease: EASE_REFINED,
};

/* Fade + rise — the default section entrance. */
export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 26 },
	show: { opacity: 1, y: 0, transition: baseTransition },
};

/* Stagger container — children animate in sequence. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
	hidden: {},
	show: {
		transition: { staggerChildren, delayChildren },
	},
});

/* Scale + fade — used for cards / media that should feel like they "settle". */
export const popIn: Variants = {
	hidden: { opacity: 0, y: 20, scale: 0.97 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.65, ease: EASE_REFINED },
	},
};

/* Shared whileInView viewport config — fire once, a little before fully in view. */
export const inView = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" };
