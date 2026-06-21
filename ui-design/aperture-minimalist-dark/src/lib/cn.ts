/** Tiny classnames joiner — keeps conditional class logic readable. */
export function cn(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}
