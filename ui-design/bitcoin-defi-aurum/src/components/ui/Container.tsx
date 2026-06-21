import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

/** Centered max-width content well (1280px) with responsive gutters. */
export function Container({ className, children, ...props }: ContainerProps) {
	return (
		<div
			className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}
			{...props}
		>
			{children}
		</div>
	);
}
