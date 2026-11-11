import type { Variants } from "motion/react";



export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
	},
};

export const stagger: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};


export const reveal = {
	initial: "hidden" as const,
	whileInView: "show" as const,
	viewport: { once: true, amount: 0.3 },
};
