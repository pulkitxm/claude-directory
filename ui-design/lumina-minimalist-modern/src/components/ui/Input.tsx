import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Input — used in the final CTA email capture. Defaults to the dark/inverted
 * styling since the only input in this page lives on the inverted CTA section.
 */
export const Input = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
	<input
		ref={ref}
		className={cn(
			"h-14 w-full rounded-xl border border-white/15 bg-white/5 px-5 text-base text-background placeholder:text-white/40 transition-colors duration-200 focus:border-accent-secondary/60",
			className,
		)}
		{...props}
	/>
));
Input.displayName = "Input";
