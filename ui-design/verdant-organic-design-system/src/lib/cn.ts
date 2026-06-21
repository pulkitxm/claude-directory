/** Tiny classNames joiner — filters falsy values, no dependency needed. */
export function cn(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}
