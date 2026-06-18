import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small glassy building blocks shared across the lab. Everything is translucent
 * and backdrop-blurred so it reads cleanly over the moving, colourful Warp
 * field underneath — the central challenge of putting UI on top of a shader.
 */

/** A frosted glass panel that sits legibly over the shader background. */
export function Glass({
	children,
	className,
	as: Tag = "div",
}: {
	children: ReactNode;
	className?: string;
	as?: "div" | "section" | "aside" | "header" | "footer";
}) {
	return (
		<Tag
			className={cn(
				"rounded-2xl border border-white/15 bg-black/35 backdrop-blur-xl",
				"shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]",
				className,
			)}
		>
			{children}
		</Tag>
	);
}

/** A tiny monospace eyebrow / kicker label. */
export function Kicker({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"font-mono text-[10px] uppercase tracking-[0.32em] text-white/55",
				className,
			)}
		>
			{children}
		</span>
	);
}

/** A pill chip used for stack tags and status. */
export function Chip({
	children,
	tone = "default",
	className,
}: {
	children: ReactNode;
	tone?: "default" | "live" | "outline";
	className?: string;
}) {
	const tones: Record<string, string> = {
		default: "bg-white/12 text-white/85 border-white/15",
		live: "bg-emerald-400/15 text-emerald-200 border-emerald-300/30",
		outline: "bg-transparent text-white/70 border-white/25",
	};
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
				"font-mono text-[10px] uppercase tracking-[0.14em]",
				tones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}
