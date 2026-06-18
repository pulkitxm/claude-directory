export function cn(...classes: Array<string | false | null | undefined>): string {
	return classes.filter(Boolean).join(" ");
}

export function clamp(v: number, lo: number, hi: number): number {
	return Math.min(Math.max(v, lo), hi);
}

/** Round to a fixed number of decimals without trailing FP noise. */
export function round(v: number, dp = 2): number {
	const f = 10 ** dp;
	return Math.round(v * f) / f;
}

/**
 * Normalise any #rgb / #rrggbb string to a lowercase #rrggbb.
 * Used by the native <input type="color"> swatches.
 */
export function normalizeHex(hex: string): string {
	let h = hex.trim().replace(/^#/, "");
	if (h.length === 3)
		h = h
			.split("")
			.map((c) => c + c)
			.join("");
	if (!/^[0-9a-fA-F]{6}$/.test(h)) return "#000000";
	return `#${h.toLowerCase()}`;
}

/** Relative luminance (0..1) of a hex colour, for readable swatch text. */
export function luminance(hex: string): number {
	const h = normalizeHex(hex).slice(1);
	const r = parseInt(h.slice(0, 2), 16) / 255;
	const g = parseInt(h.slice(2, 4), 16) / 255;
	const b = parseInt(h.slice(4, 6), 16) / 255;
	const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
	return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/* ------------------------------------------------------------------ *
 * HSL helpers — the LiquidMetal component is authored in `hsl(h, s%, l%)`
 * (and `hsl(h, s%, l%, a)` for the transparent backdrop). The foundry keeps
 * tint as HSL so the live readout matches the component's own prop format,
 * and converts to hex only to feed the native color picker.
 * ------------------------------------------------------------------ */

export interface Hsl {
	h: number; // 0–360
	s: number; // 0–100
	l: number; // 0–100
}

export function hslToCss({ h, s, l }: Hsl): string {
	return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

export function hslToHex({ h, s, l }: Hsl): string {
	const sN = s / 100;
	const lN = l / 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = sN * Math.min(lN, 1 - lN);
	const f = (n: number) => lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	const toHex = (x: number) =>
		Math.round(255 * x)
			.toString(16)
			.padStart(2, "0");
	return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export function hexToHsl(hex: string): Hsl {
	const h = normalizeHex(hex).slice(1);
	const r = parseInt(h.slice(0, 2), 16) / 255;
	const g = parseInt(h.slice(2, 4), 16) / 255;
	const b = parseInt(h.slice(4, 6), 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let hue = 0;
	if (d !== 0) {
		if (max === r) hue = ((g - b) / d) % 6;
		else if (max === g) hue = (b - r) / d + 2;
		else hue = (r - g) / d + 4;
		hue *= 60;
		if (hue < 0) hue += 360;
	}
	const l = (max + min) / 2;
	const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
	return { h: Math.round(hue), s: Math.round(s * 100), l: Math.round(l * 100) };
}
