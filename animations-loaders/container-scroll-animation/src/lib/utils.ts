import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The standard shadcn/ui class-name helper: merge conditional class lists and
 * resolve conflicting Tailwind utilities so the last one wins.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
