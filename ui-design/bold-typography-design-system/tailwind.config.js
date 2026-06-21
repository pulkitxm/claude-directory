/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────────────────────
// Bold Typography Design System — single source of truth for design tokens.
// Every value here is lifted directly from the design-system spec so that the
// rest of the app composes from these tokens instead of one-off magic numbers.
// Colors are wired to CSS variables (defined in index.css) so we can flip a
// section to the "inverted" theme by swapping the variables, not the classes.
// ─────────────────────────────────────────────────────────────────────────────
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		// Restrained palette: black, warm white, and a single vermillion accent.
		colors: {
			transparent: "transparent",
			current: "currentColor",
			background: "var(--background)",
			foreground: "var(--foreground)",
			muted: "var(--muted)",
			"muted-foreground": "var(--muted-foreground)",
			accent: "var(--accent)",
			"accent-foreground": "var(--accent-foreground)",
			border: "var(--border)",
			"border-hover": "var(--border-hover)",
			input: "var(--input)",
			card: "var(--card)",
			"card-foreground": "var(--card-foreground)",
			ring: "var(--ring)",
		},
		// Sharp edges only — no border radius anywhere.
		borderRadius: {
			none: "0px",
			DEFAULT: "0px",
		},
		// No traditional shadows; depth comes from type, underlines and rules.
		boxShadow: {
			none: "none",
		},
		extend: {
			fontFamily: {
				sans: ['"Inter Tight"', '"Inter"', "system-ui", "sans-serif"],
				display: ['"Playfair Display"', "Georgia", "serif"],
				mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
			},
			// Full poster-scale type ramp, 12px fine print → 160px decorative numbers.
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1.6" }],
				sm: ["0.875rem", { lineHeight: "1.6" }],
				base: ["1rem", { lineHeight: "1.6" }],
				lg: ["1.125rem", { lineHeight: "1.6" }],
				xl: ["1.25rem", { lineHeight: "1.4" }],
				"2xl": ["1.5rem", { lineHeight: "1.25" }],
				"3xl": ["2rem", { lineHeight: "1.1" }],
				"4xl": ["2.5rem", { lineHeight: "1.1" }],
				"5xl": ["3.5rem", { lineHeight: "1.05" }],
				"6xl": ["4.5rem", { lineHeight: "1" }],
				"7xl": ["6rem", { lineHeight: "1" }],
				"8xl": ["8rem", { lineHeight: "1" }],
				"9xl": ["10rem", { lineHeight: "1" }],
			},
			letterSpacing: {
				tighter: "-0.06em",
				tight: "-0.04em",
				normal: "-0.01em",
				wide: "0.05em",
				wider: "0.1em",
				widest: "0.2em",
			},
			lineHeight: {
				none: "1",
				tight: "1.1",
				snug: "1.25",
				normal: "1.6",
				relaxed: "1.75",
			},
			maxWidth: {
				// Container caps out at 1200px per the layout strategy.
				container: "1200px",
			},
			borderWidth: {
				DEFAULT: "1px",
				thick: "2px",
			},
			transitionTimingFunction: {
				// Fast-out, crisp stop. No bounce anywhere.
				crisp: "cubic-bezier(0.25, 0, 0, 1)",
			},
			transitionDuration: {
				150: "150ms",
				200: "200ms",
				500: "500ms",
			},
		},
	},
	plugins: [],
};
