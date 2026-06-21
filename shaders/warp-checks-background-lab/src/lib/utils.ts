export function cn(
	...classes: Array<string | false | null | undefined>
): string {
	return classes.filter(Boolean).join(" ");
}

export function clamp(v: number, lo: number, hi: number): number {
	return Math.min(Math.max(v, lo), hi);
}

/** Round to a fixed number of decimals and return a clean string (no -0). */
export function fmt(v: number, decimals = 2): string {
	const r = Number(v.toFixed(decimals));
	return (Object.is(r, -0) ? 0 : r).toString();
}
