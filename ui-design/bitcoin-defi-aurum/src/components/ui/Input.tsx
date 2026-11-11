import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	ref?: Ref<HTMLInputElement>;
}

export function Input({ className, ref, ...props }: InputProps) {
	return (
		<input
			ref={ref}
			className={cn(
				"h-12 w-full rounded-lg rounded-b-none border-b-2 border-white/20 bg-black/50 px-4 py-2 font-mono text-sm text-white transition-all duration-200 placeholder:text-white/30 focus-visible:border-orange focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
