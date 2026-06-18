import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** cn — the standard shadcn class-name combiner (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
