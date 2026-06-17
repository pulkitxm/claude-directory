import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// Pill-shaped, tactile buttons. Every variant rounds fully, lifts and deepens
// its colour-tinted shadow on hover, and presses in on click — like picking up
// and setting down a smooth river stone. Tokens come from the Tailwind theme.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold whitespace-nowrap " +
  "transition-all duration-300 ease-organic will-change-transform " +
  "hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:shadow-soft-hover",
  outline:
    "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/10",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-6 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-14 px-10 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
