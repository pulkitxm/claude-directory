import type { ReactNode } from "react";
import Marquee from "react-fast-marquee";
import { usePrefersReducedMotion } from "../hooks";

type KineticMarqueeProps = {
	children: ReactNode;

	speed?: number;
	direction?: "left" | "right";

	className?: string;

	label?: string;
};


export function KineticMarquee({
	children,
	speed = 60,
	direction = "left",
	className = "",
	label,
}: KineticMarqueeProps) {
	const reduced = usePrefersReducedMotion();

	// `role="group"` + aria-label gives the rail an accessible name without
	// claiming it's a live region (role="marquee" would falsely mark the
	// content as continuously updating ,  wrong here, and doubly wrong on the
	// static reduced-motion fallback below).
	if (reduced) {
		return (
			<div
				className={`flex w-full items-center gap-12 overflow-x-auto ${className}`}
				role="group"
				aria-label={label}
			>
				{children}
			</div>
		);
	}

	return (
		<div className={className} aria-label={label} role="group">
			<Marquee speed={speed} direction={direction} gradient={false} autoFill>
				{children}
			</Marquee>
		</div>
	);
}
