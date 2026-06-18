import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The standard shadcn/ui class merge helper. `clsx` resolves conditional
 * class names and `tailwind-merge` de-duplicates conflicting Tailwind
 * utilities (e.g. `px-2 px-4` -> `px-4`). Components import this from
 * `@/lib/utils`, the default `utils` alias declared in components.json.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
