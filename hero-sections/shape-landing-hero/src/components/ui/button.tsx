import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A trimmed shadcn/ui Button. Included to demonstrate that the project follows
 * the standard `@/components/ui` + `cn` + `class-variance-authority` structure,
 * so any other shadcn component can be added with `npx shadcn@latest add <name>`.
 */
const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-white text-black hover:bg-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.12)]",
				outline:
					"border border-white/15 bg-white/[0.03] text-white/80 hover:bg-white/[0.07] hover:text-white backdrop-blur-md",
				ghost: "text-white/70 hover:text-white hover:bg-white/[0.06]",
			},
			size: {
				default: "h-11 px-6",
				sm: "h-9 px-4",
				lg: "h-12 px-8 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
