import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconTileProps {
	icon: LucideIcon;
	className?: string;
	tone?: "orange" | "gold";
	/** Add a glow on hover of the nearest `group`. */
	glowOnGroupHover?: boolean;
}

/**
 * Holographic node — a lucide icon wrapped in a colored, glowing container.
 */
export function IconTile({
	icon: Icon,
	className,
	tone = "orange",
	glowOnGroupHover = true,
}: IconTileProps) {
	const toneClasses =
		tone === "orange"
			? "border-burnt/50 bg-burnt/20 text-orange"
			: "border-gold/50 bg-gold/15 text-gold";

	return (
		<div
			className={cn(
				"inline-flex h-12 w-12 items-center justify-center rounded-lg border p-3 transition-all duration-300",
				toneClasses,
				glowOnGroupHover &&
					(tone === "orange"
						? "group-hover:shadow-node"
						: "group-hover:shadow-gold"),
				className,
			)}
		>
			<Icon className="h-full w-full" strokeWidth={1.75} aria-hidden="true" />
		</div>
	);
}
