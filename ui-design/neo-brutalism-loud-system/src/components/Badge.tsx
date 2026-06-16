import type { ReactNode } from "react";

type BadgeProps = {
	children: ReactNode;
	/** background token class */
	bg?: string;
	/** pill (rounded-full) vs square (sharp + border) */
	shape?: "pill" | "square";
	/** spins further on hover (sticker physics) */
	spinOnHover?: boolean;
	className?: string;
};

/* A sticker. Heavy all-caps, wide tracking, thick border, hard shadow. Often
   rotated and positioned absolutely over a corner by the caller. */
export function Badge({
	children,
	bg = "bg-neo-accent",
	shape = "pill",
	spinOnHover = false,
	className = "",
}: BadgeProps) {
	const shapeClass = shape === "pill" ? "rounded-full px-4 py-1.5" : "rounded-none px-3 py-1.5";
	const spin = spinOnHover
		? "transition-transform duration-200 ease-out hover:rotate-12"
		: "";
	return (
		<span
			className={`inline-flex items-center gap-1.5 border-4 border-neo-ink ${bg} ${shapeClass} text-xs font-bold uppercase tracking-widest text-neo-ink neo-shadow-sm ${spin} ${className}`}
		>
			{children}
		</span>
	);
}
