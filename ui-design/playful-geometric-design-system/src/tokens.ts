/**
 * Design tokens — TypeScript mirror of the CSS custom properties in index.css.
 * Components that need token *values* in JS (the swatch gallery, the SVG
 * illustration, decorative shapes) import from here so there is still a single
 * conceptual source of truth rather than scattered hex literals.
 */

export const palette = {
	background: "#FFFDF5",
	foreground: "#1E293B",
	muted: "#F1F5F9",
	mutedForeground: "#64748B",
	accent: "#8B5CF6",
	accentForeground: "#FFFFFF",
	secondary: "#F472B6",
	tertiary: "#FBBF24",
	quaternary: "#34D399",
	border: "#E2E8F0",
	inputBorder: "#CBD5E1",
	card: "#FFFFFF",
	ring: "#8B5CF6",
} as const;

/** The three "confetti" pops, used rotationally for decoration + emphasis. */
export const confettiColors = [
	palette.accent,
	palette.secondary,
	palette.tertiary,
	palette.quaternary,
] as const;

export const swatches: { name: string; value: string; role: string }[] = [
	{ name: "background", value: palette.background, role: "Warm paper base" },
	{ name: "foreground", value: palette.foreground, role: "Text + borders" },
	{ name: "accent", value: palette.accent, role: "Primary / violet" },
	{ name: "secondary", value: palette.secondary, role: "Pop / hot pink" },
	{ name: "tertiary", value: palette.tertiary, role: "Optimism / amber" },
	{ name: "quaternary", value: palette.quaternary, role: "Fresh / mint" },
	{ name: "muted", value: palette.muted, role: "Quiet fills" },
	{ name: "border", value: palette.border, role: "Hairlines" },
];

export const radii: { name: string; value: string; px: number }[] = [
	{ name: "sm", value: "8px", px: 8 },
	{ name: "md", value: "16px", px: 16 },
	{ name: "lg", value: "24px", px: 24 },
	{ name: "full", value: "9999px", px: 9999 },
];

/** Tailwind text-* steps mapped to the 1.25 (Major Third) scale. */
export const typeScale: { step: string; size: string; sample: string }[] = [
	{ step: "6", size: "3.815rem", sample: "Display" },
	{ step: "4", size: "2.441rem", sample: "Heading" },
	{ step: "2", size: "1.5625rem", sample: "Title" },
	{ step: "0", size: "1rem", sample: "Body copy" },
];
