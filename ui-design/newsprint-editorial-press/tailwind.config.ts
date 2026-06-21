import type { Config } from "tailwindcss";

/**
 * Newsprint design tokens, centralized.
 *
 * Everything the design system in prompt.md describes maps to a token here so
 * components never reach for one-off hex values. Border radius is forced to 0
 * across the whole scale — the aesthetic forbids rounded corners.
 */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		// Stark geometry: zero radius everywhere. No exceptions.
		borderRadius: {
			none: "0",
			DEFAULT: "0",
			sm: "0",
			md: "0",
			lg: "0",
			xl: "0",
			"2xl": "0",
			"3xl": "0",
			full: "0",
		},
		extend: {
			colors: {
				paper: "#F9F9F7", // background — warm newsprint off-white
				ink: "#111111", // foreground / borders — deep ink black
				divider: "#E5E5E0", // muted divider grey
				editorial: "#CC0000", // accent — editorial red, used sparingly
			},
			fontFamily: {
				serif: ["'Playfair Display'", "'Times New Roman'", "serif"],
				body: ["'Lora'", "Georgia", "serif"],
				sans: ["'Inter'", "'Helvetica Neue'", "sans-serif"],
				mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
			},
			fontSize: {
				// Massive viewport-dominating display sizes for the masthead headlines.
				"10xl": ["9rem", { lineHeight: "0.85" }],
				"11xl": ["11rem", { lineHeight: "0.82" }],
			},
			maxWidth: {
				"screen-xl": "1280px",
			},
			boxShadow: {
				// Hard offset shadow — the only shadow this system allows.
				hard: "4px 4px 0px 0px #111111",
				"hard-lg": "8px 8px 0px 0px #111111",
				"hard-red": "4px 4px 0px 0px #CC0000",
			},
			keyframes: {
				ticker: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
				rise: {
					"0%": { opacity: "0", transform: "translateY(16px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				wipe: {
					"0%": { transform: "scaleX(0)" },
					"100%": { transform: "scaleX(1)" },
				},
			},
			animation: {
				ticker: "ticker 32s linear infinite",
				"ticker-slow": "ticker 48s linear infinite",
				rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
				wipe: "wipe 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
			},
		},
	},
	plugins: [],
} satisfies Config;
