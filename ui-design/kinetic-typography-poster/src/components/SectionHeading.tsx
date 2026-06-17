import type { ReactNode } from "react";

type SectionHeadingProps = {
	children: ReactNode;
	className?: string;
};

/**
 * The shared display-heading lockup used by every section: bold, uppercase,
 * tight tracking, ultra-tight leading, and the brand's 5xl → 7xl → 8xl ramp.
 * Centralising it here keeps the headline scale consistent across the page and
 * means the ramp can be retuned in one place. Compose with `text-acid` spans
 * inside `children` for the accent words.
 */
export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
	return (
		<h2
			className={`font-bold uppercase leading-[0.85] tracking-tighter text-5xl md:text-7xl lg:text-8xl ${className}`}
		>
			{children}
		</h2>
	);
}
