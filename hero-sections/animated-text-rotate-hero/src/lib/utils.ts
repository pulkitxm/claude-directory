import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// The shadcn `cn` helper: merges conditional class names (clsx) and then
// resolves conflicting Tailwind utilities (tailwind-merge) so the last one
// wins. Both copied components import it from "@/lib/utils".
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
