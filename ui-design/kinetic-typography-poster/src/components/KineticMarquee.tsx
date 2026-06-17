import type { ReactNode } from "react";
import Marquee from "react-fast-marquee";
import { usePrefersReducedMotion } from "../hooks";

type KineticMarqueeProps = {
	children: ReactNode;
	/** 80 for high-energy stats, ~40 for slower reading content. */
	speed?: number;
	direction?: "left" | "right";
	/** Background applied to the rail (e.g. acid for the stats band). */
	className?: string;
	/** aria-label describing the rail for assistive tech. */
	label?: string;
};

/**
 * Infinite marquee built on react-fast-marquee.
 *
 * Per the design system: gradient edges are OFF (the raw edge is part of the
 * aesthetic), autoFill is ON so content repeats seamlessly, and easing is the
 * library's default linear scroll — it never pauses on hover, never stops.
 *
 * Accessibility: when the user prefers reduced motion we DON'T mount the
 * animated library at all. We render the same children once, statically, in a
 * horizontally-scrollable rail. The content, contrast and scale are identical
 * — only the perpetual motion is removed.
 */
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
	// content as continuously updating — wrong here, and doubly wrong on the
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
