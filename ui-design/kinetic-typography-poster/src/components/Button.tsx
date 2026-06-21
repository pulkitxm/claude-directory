import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: Variant;
	size?: Size;
};

/* Heights map 1:1 to the spec (sm 40 / md 56 / lg 80); horizontal padding is
   ~2x the vertical. All buttons are uppercase, bold, tight-tracked, 0 radius. */
const sizes: Record<Size, string> = {
	sm: "h-10 px-4 text-sm",
	md: "h-14 px-8 text-base",
	lg: "h-20 px-12 text-lg md:text-xl",
};

const variants: Record<Variant, string> = {
	// Acid fill, black text. The only motion is a snappy scale (hover 1.05 /
	// active 0.95) — transition-all so the scale eases, not the colour.
	primary:
		"bg-acid text-acid-foreground transition-all duration-200 hover:scale-105 active:scale-95",
	// Transparent with a 2px line; hard-flips to a bone fill + black text.
	outline:
		"border-2 border-line bg-transparent text-bone transition-colors duration-200 hover:bg-bone hover:text-acid-foreground",
	// No chrome; text just shifts to acid on hover.
	ghost:
		"bg-transparent text-bone transition-colors duration-200 hover:text-acid",
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	className = "",
	...rest
}: ButtonProps) {
	return (
		<button
			className={`inline-flex items-center justify-center rounded-none font-bold uppercase tracking-tighter disabled:pointer-events-none disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
}
