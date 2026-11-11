import type { ReactNode } from "react";

type BadgeProps = {
	children: ReactNode;

	bg?: string;

	shape?: "pill" | "square";

	spinOnHover?: boolean;
	className?: string;
};


export function Badge({
	children,
	bg = "bg-neo-accent",
	shape = "pill",
	spinOnHover = false,
	className = "",
}: BadgeProps) {
	const shapeClass =
		shape === "pill" ? "rounded-full px-4 py-1.5" : "rounded-none px-3 py-1.5";
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
