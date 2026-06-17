import type { ReactNode } from "react";
import FastMarquee from "react-fast-marquee";
import { useReducedMotion } from "../hooks";

type MarqueeProps = {
	children: ReactNode;
	direction?: "left" | "right";
	speed?: number;
	/** marquee row background token */
	className?: string;
	ariaLabel?: string;
};

/* Wraps react-fast-marquee with a reduced-motion guard: when the user prefers
   reduced motion we DON'T mount the animated track at all — we render the same
   children in a static, horizontally-clipped strip so the content is still
   present and readable, it just doesn't move. The library's rail is also
   pinned in CSS as a backstop. */
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
