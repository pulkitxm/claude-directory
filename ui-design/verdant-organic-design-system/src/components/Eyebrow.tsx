import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type EyebrowProps = {
	children: ReactNode;

	icon?: ReactNode;

	onDark?: boolean;
	className?: string;
};


export function Eyebrow({
	children,
	icon,
	onDark = false,
	className,
}: EyebrowProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]",
				onDark
					? "border-white/25 bg-white/10 text-primary-foreground"
					: "border-border/70 bg-card text-secondary",
				className,
			)}
		>
			{icon}
			{children}
		</span>
	);
}
