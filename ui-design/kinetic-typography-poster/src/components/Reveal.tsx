import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks";

type RevealProps = {
	children: ReactNode;
	className?: string;
	/** Stagger offset in seconds. */
	delay?: number;
};

/**
 * Entrance wrapper: elements scale up from 0.92 and unmask (clip-path) as they
 * enter the viewport — a snappy, poster-like "stamp in" rather than a gentle
 * fade. Honours reduced motion by rendering children with no animation.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
	const reduced = usePrefersReducedMotion();

	if (reduced) return <div className={className}>{children}</div>;

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 28, clipPath: "inset(0 100% 0 0)" }}
			whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
			viewport={{ once: true, margin: "-12% 0px" }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}
