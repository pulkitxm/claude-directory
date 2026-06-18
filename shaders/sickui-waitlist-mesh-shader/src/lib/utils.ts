/** Tiny classnames joiner (keeps the project dependency-light, no clsx needed). */
export function cn(...classes: Array<string | false | null | undefined>): string {
	return classes.filter(Boolean).join(" ");
}

/**
 * Pragmatic email check — good enough for a client-side waitlist gate. Requires a
 * local part, an "@", a dotted domain, and no whitespace. Not RFC-5322-complete
 * (deliberately), just enough to catch the obvious typos before the optimistic
 * success state.
 */
export function isValidEmail(value: string): boolean {
	const v = value.trim();
	if (v.length < 3 || v.length > 254) return false;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** Format an integer with thin thousands separators (1234 -> "1,234"). */
export function formatCount(n: number): string {
	return n.toLocaleString("en-US");
}
