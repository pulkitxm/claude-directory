import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
	children: ReactNode;
	className?: string;
	/** Stagger delay in ms. */
	delay?: number;
};

/**
 * Lightweight scroll-reveal wrapper — a CSS opacity/translate transition driven
 * by an IntersectionObserver. No animation library needed.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
	const { ref, shown } = useReveal<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={cn(
				"min-w-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
				shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
				className,
			)}
			style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
		>
			{children}
		</div>
	);
}
