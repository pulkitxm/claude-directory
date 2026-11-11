import type { ReactNode } from "react";
import FastMarquee from "react-fast-marquee";
import { useReducedMotion } from "../hooks";

type MarqueeProps = {
	children: ReactNode;
	direction?: "left" | "right";
	speed?: number;

	className?: string;
	ariaLabel?: string;
};


export function Marquee({
	children,
	direction = "left",
	speed = 50,
	className = "",
	ariaLabel,
}: MarqueeProps) {
	const reduced = useReducedMotion();

	if (reduced) {
		return (
			<div
				className={`overflow-hidden ${className}`}
				role="group"
				aria-label={ariaLabel}
			>
				<div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3">
					{children}
				</div>
			</div>
		);
	}

	return (
		<div className={className} role="group" aria-label={ariaLabel}>
			<FastMarquee
				direction={direction}
				speed={speed}
				gradient={false}
				autoFill
			>
				{children}
			</FastMarquee>
		</div>
	);
}
