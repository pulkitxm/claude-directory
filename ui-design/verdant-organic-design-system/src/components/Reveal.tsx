import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type RevealProps = {
	children: ReactNode;

	delay?: number;

	y?: number;
	className?: string;
	as?: "div" | "li" | "section" | "article" | "span";
};


export function Reveal({
	children,
	delay = 0,
	y = 26,
	className,
	as = "div",
}: RevealProps) {
	const reduced = useReducedMotion();
	const MotionTag = motion[as];

	if (reduced) {
		const Tag = as;
		return <Tag className={className}>{children}</Tag>;
	}

	return (
		<MotionTag
			className={className}
			initial={{ opacity: 0, y, filter: "blur(8px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "0px 0px -12% 0px" }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</MotionTag>
	);
}
