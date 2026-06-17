import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: Variant;
	size?: Size;
};

/* Heights honor the spec (sm 48 / md 56 / lg 64) — all >= 44px touch targets.
   Horizontal padding is roughly 2x the implied vertical. */
const sizes: Record<Size, string> = {
	sm: "h-12 px-5 text-sm",
	md: "h-14 px-8 text-sm",
	lg: "h-16 px-10 text-base",
};

/* Every variant shares the mechanical "push" physics: it carries a hard offset
   shadow at rest, and on :active it translates 4px into the bottom-right to
   sit flush on that shadow (shadow removed) — a physical click-down. Hovers
   nudge the element back up-left and deepen the shadow, so the chrome moves but
   never fades. Transitions are fast (100ms). */
const variants: Record<Variant, string> = {
	primary:
		"bg-neo-accent text-neo-ink shadow-neo hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-md active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
	secondary:
		"bg-neo-secondary text-neo-ink shadow-neo hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-md active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
	outline:
		"bg-neo-white text-neo-ink shadow-neo hover:bg-neo-secondary hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-md active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
	// Borderless until hover, then snaps in a border + fill + shadow.
	ghost:
		"bg-transparent text-neo-ink !border-2 !border-transparent hover:!border-neo-ink hover:bg-neo-secondary hover:shadow-neo active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	className = "",
	type = "button",
	...rest
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`inline-flex items-center justify-center gap-2 rounded-none border-4 border-neo-ink font-bold uppercase tracking-wide transition-all duration-100 ease-out disabled:pointer-events-none disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
}
