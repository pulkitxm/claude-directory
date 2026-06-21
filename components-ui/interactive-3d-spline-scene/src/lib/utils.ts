import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The shadcn/ui class-name helper. Every component pasted into `components/ui`
 * imports this from `@/lib/utils`, so it must live exactly here.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
