import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;

	bg?: string;

	lift?: boolean;

	shadow?: "md" | "lg";

	onDark?: boolean;
};


export function Card({
	children,
	bg = "bg-neo-white",
	lift = true,
	shadow = "md",
	onDark = false,
	className = "",
	...rest
}: CardProps) {
	const restShadow = onDark
		? "shadow-neo-w"
		: shadow === "lg"
			? "shadow-neo-lg"
			: "shadow-neo-md";

	const liftClass = lift
		? onDark
			? "transition-all duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-w-lg"
			: "transition-all duration-200 ease-out hover:-translate-x-1 hover:-translate-y-2 hover:shadow-neo-xl"
		: "";

	return (
		<div
			className={`rounded-none border-4 border-neo-ink ${bg} ${restShadow} ${liftClass} ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
}
