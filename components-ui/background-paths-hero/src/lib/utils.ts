import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui's standard class-name helper: merge conditional class lists with
 * `clsx`, then resolve Tailwind conflicts with `tailwind-merge`. The dropped-in
 * Button imports this from `@/lib/utils`.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
