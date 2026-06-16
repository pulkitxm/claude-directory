import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — the design system's primary interactive primitive.
 * Variants follow the spec: gradient primary, outline, and ghost.
 * All variants lift on hover and scale down on press for tactile feedback.
 */
const buttonVariants = cva(
	"group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110",
				outline:
					"border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-accent/30 hover:bg-muted hover:shadow-md",
				ghost: "bg-transparent text-muted-foreground hover:text-foreground",
				"inverted-outline":
					"border border-white/20 bg-white/5 text-background hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10",
			},
			size: {
				md: "h-12 px-6 text-sm",
				lg: "h-14 px-8 text-base",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => (
		<button
			ref={ref}
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	),
);
Button.displayName = "Button";

export { buttonVariants };
