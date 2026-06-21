import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The standard shadcn/ui class merge helper. `clsx` resolves conditional
 * class names and `tailwind-merge` de-duplicates conflicting Tailwind
 * utilities (e.g. `px-2 px-4` -> `px-4`). The hero component imports this
 * from `@/lib/utils`, which is the default `utils` alias in components.json.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
