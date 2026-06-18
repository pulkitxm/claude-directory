export function cn(...classes: Array<string | false | null | undefined>): string {
	return classes.filter(Boolean).join(" ")
}

export function clamp(v: number, lo: number, hi: number): number {
	return Math.min(Math.max(v, lo), hi)
}

/** Normalise any #rgb / #rrggbb string to a lowercase #rrggbb. */
export function normalizeHex(hex: string): string {
	let h = hex.trim().replace(/^#/, "")
	if (h.length === 3)
		h = h
			.split("")
			.map((ch) => ch + ch)
			.join("")
	if (!/^[0-9a-fA-F]{6}$/.test(h)) return "#000000"
	return `#${h.toLowerCase()}`
}

/** Relative luminance (0..1) of a hex colour, for picking readable swatch text. */
export function luminance(hex: string): number {
	const h = normalizeHex(hex).slice(1)
	const r = parseInt(h.slice(0, 2), 16) / 255
	const g = parseInt(h.slice(2, 4), 16) / 255
	const b = parseInt(h.slice(4, 6), 16) / 255
	const lin = (ch: number) => (ch <= 0.03928 ? ch / 12.92 : Math.pow((ch + 0.055) / 1.055, 2.4))
	return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
