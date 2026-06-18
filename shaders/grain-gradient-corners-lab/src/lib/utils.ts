/**
 * Tiny class-name joiner (no clsx/tailwind-merge dependency needed for
 * this lab) plus a numeric clamp used by the control-deck faders.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

/** Format a 0..1 uniform as a percentage string for the readouts. */
export function pct(value: number): string {
	return `${Math.round(value * 100)}%`;
}
