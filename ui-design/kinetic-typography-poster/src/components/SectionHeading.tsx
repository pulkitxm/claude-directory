import type { ReactNode } from "react";

type SectionHeadingProps = {
	children: ReactNode;
	className?: string;
};


export function SectionHeading({
	children,
	className = "",
}: SectionHeadingProps) {
	return (
		<h2
			className={`font-bold uppercase leading-[0.85] tracking-tighter text-5xl md:text-7xl lg:text-8xl ${className}`}
		>
			{children}
		</h2>
	);
}
