import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	/** background token class, e.g. "bg-neo-white" | "bg-neo-secondary" */
	bg?: string;
	/** enable the hover lift (translate up + shadow grows). Default true. */
	lift?: boolean;
	/** resting shadow size */
	shadow?: "md" | "lg";
	/** white shadow variant for cards on black sections */
	onDark?: boolean;
};

/* The signature container: bg + border-4 + sharp corners + a deep hard shadow.
   On hover it physically LIFTS — translates up-left while the shadow grows,
   the inverse of the button's click-down. */
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
