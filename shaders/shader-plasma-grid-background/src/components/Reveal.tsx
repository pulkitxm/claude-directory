import type { CSSProperties, ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	as?: "div" | "section" | "li" | "article";
};

/** Fade-and-rise wrapper, triggered the first time it enters the viewport. */
export function Reveal({
	children,
	className,
	delay = 0,
	as = "div",
}: RevealProps) {
	const { ref, shown } = useReveal<HTMLDivElement>();
	const Tag = as;
	const style: CSSProperties = {
		transitionDelay: `${delay}ms`,
	};
	return (
		<Tag
			ref={ref as never}
			style={style}
			className={cn(
				"min-w-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
				shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
				className,
			)}
		>
			{children}
		</Tag>
	);
}
