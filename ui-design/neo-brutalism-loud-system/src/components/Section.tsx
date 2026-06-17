import type { ReactNode } from "react";
import { useInView } from "../hooks";

/* Small all-caps eyebrow label, boxed and bordered like a filing tag. */
export function SectionLabel({
	children,
	bg = "bg-neo-secondary",
	className = "",
}: {
	children: ReactNode;
	bg?: string;
	className?: string;
}) {
	return (
		<span
			className={`inline-block border-4 border-neo-ink ${bg} px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-neo-ink neo-shadow-sm ${className}`}
		>
			{children}
		</span>
	);
}

/* Reveal: snaps children in (translate + opacity) the first time they scroll
   into view. Fast + mechanical, no soft easing. Reduced motion shows them
   immediately (useInView reports true at once). The stagger is delay-driven. */
export function Reveal({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	const [ref, inView] = useInView<HTMLDivElement>();
	return (
		<div
			ref={ref}
			className={`transition-all duration-300 ease-out ${
				inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
			} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}
