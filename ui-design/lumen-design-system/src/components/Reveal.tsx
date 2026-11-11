import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
	children: ReactNode;
	className?: string;

	delay?: number;

	mode?: "up" | "scale";
	as?: "div" | "section" | "li" | "span";
}


export function Reveal({
	children,
	className,
	delay = 0,
	mode = "up",
	as = "div",
}: RevealProps) {
	const variants: Variants = {
		hidden:
			mode === "scale" ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 24 },
		show: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.6, ease: EXPO, delay },
		},
	};

	const MotionTag = motion[as];

	return (
		<MotionTag
			className={className}
			variants={variants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.18 }}
		>
			{children}
		</MotionTag>
	);
}


export function RevealGroup({
	children,
	className,
	stagger = 0.08,
}: {
	children: ReactNode;
	className?: string;
	stagger?: number;
}) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.15 }}
			variants={{
				hidden: {},
				show: { transition: { staggerChildren: stagger } },
			}}
		>
			{children}
		</motion.div>
	);
}


export function RevealItem({
	children,
	className,
	mode = "up",
}: {
	children: ReactNode;
	className?: string;
	mode?: "up" | "scale";
}) {
	return (
		<motion.div
			className={className}
			variants={{
				hidden:
					mode === "scale"
						? { opacity: 0, scale: 0.95 }
						: { opacity: 0, y: 24 },
				show: {
					opacity: 1,
					y: 0,
					scale: 1,
					transition: { duration: 0.6, ease: EXPO },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
