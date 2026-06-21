import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: Variant;
	size?: Size;
	/** Render as an anchor instead of a button. */
	href?: string;
}

const base =
	"relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-medium " +
	"transition-[transform,box-shadow,background-color,color] duration-quick ease-expo active:scale-[0.98] " +
	"select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
	sm: "h-9 px-4 text-sm",
	md: "h-11 px-5 text-sm",
	lg: "h-12 px-6 text-[15px]",
};

const variants: Record<Variant, string> = {
	// Solid accent with multi-layer glow + inner highlight. Shine sweeps on hover.
	primary:
		"bg-accent text-white shadow-cta hover:bg-accent-bright hover:shadow-cta-hover",
	// Glass with inset border only, brightening + faint outer glow on hover.
	secondary:
		"bg-white/[0.05] text-fg shadow-secondary hover:bg-white/[0.08] " +
		"hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_0_24px_rgba(94,106,210,0.12)]",
	// Transparent, text brightens on hover.
	ghost: "bg-transparent text-fg-muted hover:bg-white/[0.05] hover:text-fg",
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	href,
	className = "",
	...props
}: ButtonProps) {
	const classes = [base, sizes[size], variants[variant], className].join(" ");

	const shine =
		variant === "primary" ? (
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-expo group-hover/btn:translate-x-full"
			/>
		) : null;

	const inner = (
		<>
			{shine}
			<span className="relative z-10 inline-flex items-center gap-2">
				{children}
			</span>
		</>
	);

	if (href) {
		return (
			<a href={href} className={`group/btn ${classes}`}>
				{inner}
			</a>
		);
	}

	return (
		<button className={`group/btn ${classes}`} {...props}>
			{inner}
		</button>
	);
}
