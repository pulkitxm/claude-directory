import type { Variants } from "motion/react";



export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};


export const reveal = {
	initial: "hidden",
	whileInView: "show",
	viewport: { once: true, amount: 0.2 },
} as const;

export const REVEAL_TRANSITION = { duration: 0.4, ease: "linear" } as const;
