import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn's standard class merge helper: resolves Tailwind conflicts so the last
 * utility wins (e.g. `cn("px-2", condition && "px-4")`).
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
