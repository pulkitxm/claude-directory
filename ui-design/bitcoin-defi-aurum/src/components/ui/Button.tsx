import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

/**
 * AURUM button. Pill-shaped (rounded-full) and emits colored light — the
 * signature crypto CTA. Primary fills with the Burnt → Bitcoin gradient and
 * throws an orange glow; outline/ghost/link stay minimal until hovered.
 */
const button = cva(
	"group/btn inline-flex min-h-[44px] select-none items-center justify-center gap-2 rounded-full font-body font-semibold uppercase tracking-wider transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-gradient-to-r from-burnt to-orange text-white shadow-glow hover:scale-105 hover:shadow-glow-lg",
				outline:
					"border-2 border-white/20 bg-transparent text-white hover:border-white hover:bg-white/10",
				ghost: "bg-transparent text-white hover:bg-white/10 hover:text-orange",
				link: "min-h-0 rounded-none px-0 text-orange underline-offset-4 hover:underline",
				gold: "bg-gradient-to-r from-orange to-gold text-void shadow-gold hover:scale-105",
			},
			size: {
				sm: "px-5 py-2 text-xs",
				md: "px-7 py-3 text-sm",
				lg: "px-9 py-4 text-base",
			},
		},
		defaultVariants: { variant: "primary", size: "md" },
	},
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	ref?: Ref<HTMLButtonElement>;
	children: ReactNode;
}

export function Button({
	className,
	variant,
	size,
	ref,
	...props
}: ButtonProps) {
	return (
		<button
			ref={ref}
			className={cn(button({ variant, size }), className)}
			{...props}
		/>
	);
}
