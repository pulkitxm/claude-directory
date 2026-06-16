import type { Config } from "tailwindcss";

/**
 * Design tokens for the "Minimalist Modern" system.
 * Colors map to CSS custom properties injected in index.css so the palette
 * lives in a single source of truth and can be themed centrally.
 */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					secondary: "var(--accent-secondary)",
					foreground: "var(--accent-foreground)",
				},
				border: "var(--border)",
				card: "var(--card)",
				ring: "var(--ring)",
			},
			fontFamily: {
				display: ['"Calistoga"', "Georgia", "serif"],
				sans: ['"Inter"', "system-ui", "sans-serif"],
				mono: ['"JetBrains Mono"', "monospace"],
			},
			boxShadow: {
				sm: "0 1px 3px rgba(0,0,0,0.06)",
				md: "0 4px 6px rgba(0,0,0,0.07)",
				lg: "0 10px 15px rgba(0,0,0,0.08)",
				xl: "0 20px 25px rgba(0,0,0,0.1)",
				accent: "0 4px 14px rgba(0,82,255,0.25)",
				"accent-lg": "0 8px 24px rgba(0,82,255,0.35)",
			},
			letterSpacing: {
				label: "0.15em",
			},
			maxWidth: {
				"6xl": "72rem",
			},
			keyframes: {
				"pulse-dot": {
					"0%, 100%": { transform: "scale(1)", opacity: "1" },
					"50%": { transform: "scale(1.3)", opacity: "0.7" },
				},
			},
			animation: {
				"pulse-dot": "pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
		},
	},
	plugins: [],
} satisfies Config;
