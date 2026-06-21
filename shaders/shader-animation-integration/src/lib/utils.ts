import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui class-name helper: merges conditional `clsx` classes and resolves
 * conflicting Tailwind utilities with `tailwind-merge`.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
