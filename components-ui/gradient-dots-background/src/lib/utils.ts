import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The standard shadcn/ui class-name helper: merges conditional `clsx` classes
 * and de-duplicates conflicting Tailwind utilities via `tailwind-merge`.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
