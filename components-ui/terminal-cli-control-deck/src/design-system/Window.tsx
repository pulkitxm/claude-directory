import type { ReactNode } from "react";

type Variant = "inverted" | "ascii";

/**
 * The fundamental layout pane — a black box with a 1px green border and a
 * "title bar". Two header treatments:
 *   - "inverted": a solid primary bar with black text (tmux active pane).
 *   - "ascii":    a +--- TITLE ---+ rule (a quieter, classic header).
 * `flags` render shell-style flags (e.g. --live) on the right of the bar.
 */
export function Window({
	title,
	variant = "inverted",
	flags,
	className = "",
	bodyClassName = "",
	children,
	id,
}: {
	title: string;
	variant?: Variant;
	flags?: ReactNode;
	className?: string;
	bodyClassName?: string;
	children: ReactNode;
	id?: string;
}) {
	return (
		<section
			id={id}
			aria-label={title}
			className={`group relative flex flex-col border border-border bg-bg/80 backdrop-blur-[1px] transition-[box-shadow,border-color] duration-200 hover:border-primary hover:glow-box ${className}`}
		>
			{variant === "inverted" ? (
				<header className="flex shrink-0 items-center justify-between gap-2 bg-primary px-2.5 py-1 text-bg">
					<span className="truncate text-2xs font-bold tracking-[0.18em] uppercase">
						{title}
					</span>
					{flags && (
						<span className="shrink-0 text-2xs tracking-[0.12em] tabular-nums">
							{flags}
						</span>
					)}
				</header>
			) : (
				<header className="flex shrink-0 items-center gap-1.5 px-2.5 pt-2 text-2xs tracking-[0.16em] text-muted uppercase select-none">
					<span aria-hidden className="text-dim">
						+──
					</span>
					<span className="text-primary glow">{title}</span>
					<span aria-hidden className="min-w-0 flex-1 overflow-hidden text-dim">
						──────────────────────────────────────────────
					</span>
					{flags && <span className="shrink-0 text-secondary">{flags}</span>}
					<span aria-hidden className="text-dim">
						+
					</span>
				</header>
			)}
			<div className={`min-h-0 flex-1 p-3 sm:p-4 ${bodyClassName}`}>
				{children}
			</div>
		</section>
	);
}
