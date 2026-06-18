import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A small monospace eyebrow with a leading index, e.g. "02 / CONTROL DECK". */
export function Eyebrow({
	index,
	children,
	className,
}: {
	index: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-fog-400",
				className,
			)}
		>
			<span className="text-accent">{index}</span>
			<span className="h-px w-8 bg-line" />
			<span>{children}</span>
		</div>
	);
}

/** Section title in the display face. */
export function SectionTitle({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h2
			className={cn(
				"font-display text-3xl font-700 leading-tight tracking-tight text-fog-200 sm:text-4xl",
				className,
			)}
		>
			{children}
		</h2>
	);
}

/** A bordered panel used for instrument-style cards. */
export function Panel({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative rounded-2xl border border-line bg-ink-900/60 backdrop-blur-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}

/** Corner registration brackets for the instrument framing. */
export function CornerBrackets({ className }: { className?: string }) {
	const base = "pointer-events-none absolute h-4 w-4 border-accent/60";
	return (
		<div className={cn("pointer-events-none absolute inset-0", className)}>
			<span className={cn(base, "left-3 top-3 border-l border-t")} />
			<span className={cn(base, "right-3 top-3 border-r border-t")} />
			<span className={cn(base, "bottom-3 left-3 border-b border-l")} />
			<span className={cn(base, "bottom-3 right-3 border-b border-r")} />
		</div>
	);
}
