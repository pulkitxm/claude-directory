import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** The standard shadcn/ui class-name helper: merge conditional + Tailwind classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
