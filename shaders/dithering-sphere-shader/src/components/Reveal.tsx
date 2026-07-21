import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
};

/** Thin wrapper that applies the `.rise` entrance the first time it scrolls in. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
	const { ref, shown } = useReveal<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={cn("min-w-0", shown ? "rise" : "opacity-0", className)}
			style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}
