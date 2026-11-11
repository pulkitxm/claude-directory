import { forwardRef } from "react";
import { cn } from "@/lib/utils";


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
