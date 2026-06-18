import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Standard shadcn class-name merge helper used by the bloom component. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
