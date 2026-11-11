import { motion } from "framer-motion";
import { fadeInUp, stagger, viewport } from "@/lib/motion";


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
