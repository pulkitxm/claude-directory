import type { Variants } from "motion/react";


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


export const inView = { once: true, amount: 0.25 } as const;
