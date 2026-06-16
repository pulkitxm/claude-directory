import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/motion";

/**
 * Reveal — a scroll-triggered container that staggers its direct children up
 * into view. Children should be motion elements using the `fadeInUp` variant
 * (exported via RevealItem) for the staggered cascade to register.
 */
export function Reveal({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			variants={stagger}
			initial="hidden"
			whileInView="visible"
			viewport={viewport}
			className={className}
		>
			{children}
		</motion.div>
	);
}

/** A single child of <Reveal> that fades up as part of the stagger cascade. */
export function RevealItem({
	children,
	className,
	as = "div",
}: {
	children: React.ReactNode;
	className?: string;
	as?: "div" | "li" | "span";
}) {
	const MotionTag = motion[as];
	return (
		<MotionTag variants={fadeInUp} className={className}>
			{children}
		</MotionTag>
	);
}
