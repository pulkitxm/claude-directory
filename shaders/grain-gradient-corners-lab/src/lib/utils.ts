export function cn(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}
export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}
export function pct(value: number): string {
	return `${Math.round(value * 100)}%`;
}
