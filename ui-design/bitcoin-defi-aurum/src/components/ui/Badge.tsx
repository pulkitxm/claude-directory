import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	/** Render a pulsing "live network" dot on the left. */
	live?: boolean;
	tone?: "orange" | "gold" | "muted";
}

/**
 * Mono pill badge. With `live`, it shows a pinging dot suggesting live
 * on-chain network activity.
 */
export function Badge({
	className,
	children,
	live = false,
	tone = "orange",
	...props
}: BadgeProps) {
	const toneClasses = {
		orange: "border-orange/30 bg-orange/10 text-orange",
		gold: "border-gold/30 bg-gold/10 text-gold",
		muted: "border-white/15 bg-white/5 text-stardust",
	}[tone];

	const dotColor = {
		orange: "bg-orange",
		gold: "bg-gold",
		muted: "bg-stardust",
	}[tone];

	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest",
				toneClasses,
				className,
			)}
			{...props}
		>
			{live && (
				<span className="relative flex h-2 w-2">
					<span
						className={cn(
							"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
							dotColor,
						)}
					/>
					<span
						className={cn(
							"relative inline-flex h-2 w-2 rounded-full",
							dotColor,
						)}
					/>
				</span>
			)}
			{children}
		</span>
	);
}
