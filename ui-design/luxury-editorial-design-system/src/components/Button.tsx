import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	/** Alabaster base for use on dark sections (e.g. footer CTA). */
	inverted?: boolean;
	children: ReactNode;
}

const sizes: Record<Size, string> = {
	sm: "h-10 px-6",
	md: "h-12 px-8",
	lg: "h-14 px-10",
};

const base =
	"relative inline-flex items-center justify-center overflow-hidden " +
	"font-sans font-medium uppercase text-xs tracking-button " +
	"transition-all duration-500 ease-luxe " +
	"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground " +
	"disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

/**
 * Luxury button system.
 * - primary  : charcoal base, gold layer slides in from the left (translate-x),
 *              white label sits above via z-index. Shadow deepens on hover.
 * - secondary: transparent + thin border, fills charcoal on hover, text inverts.
 * - link     : underline-on-hover, gold accent.
 */
export function Button({
	variant = "primary",
	size = "md",
	inverted = false,
	children,
	className = "",
	...props
}: ButtonProps) {
	if (variant === "link") {
		return (
			<button
				className={[
					"group relative inline-flex items-center gap-2 font-sans font-medium uppercase",
					"text-xs tracking-button text-foreground transition-colors duration-500 ease-luxe",
					"hover:text-accent focus-visible:outline-none focus-visible:text-accent",
					className,
				].join(" ")}
				{...props}
			>
				<span>{children}</span>
				<span
					aria-hidden
					className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 ease-luxe group-hover:w-full"
				/>
			</button>
		);
	}

	if (variant === "secondary") {
		return (
			<button
				className={[
					base,
					sizes[size],
					"border border-foreground text-foreground",
					"hover:bg-foreground hover:text-accent-fg focus-visible:ring-foreground",
					className,
				].join(" ")}
				{...props}
			>
				<span className="relative z-10">{children}</span>
			</button>
		);
	}

	// primary — charcoal (or alabaster, when inverted) base; gold slides from left.
	return (
		<button
			className={[
				base,
				sizes[size],
				"group shadow-btn hover:shadow-btn-hover",
				inverted
					? "bg-background text-foreground"
					: "bg-foreground text-accent-fg",
				className,
			].join(" ")}
			{...props}
		>
			{/* Gold layer slides in from the left. */}
			<span
				aria-hidden
				className="absolute inset-0 z-0 -translate-x-full bg-accent transition-transform duration-500 ease-luxe group-hover:translate-x-0 reduce-motion-noscale"
			/>
			{/* Label sits above the gold layer via z-index. On the dark default the
          label stays white (per spec); on the inverted (alabaster) base it
          becomes charcoal on hover so it reads as charcoal-on-gold (AA). */}
			<span
				className={[
					"relative z-10 transition-colors duration-500 ease-luxe",
					inverted ? "group-hover:text-foreground" : "",
				].join(" ")}
			>
				{children}
			</span>
		</button>
	);
}
