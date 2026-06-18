import type { Config } from "tailwindcss";

// shadcn-style token wiring: `bg-background` / `text-foreground` resolve to the
// CSS variables defined in index.css, so the canonical NestedSquares component
// (which uses `bg-background`) works untouched. The studio chrome adds its own
// named tokens on top.
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				panel: "hsl(var(--panel) / <alpha-value>)",
				rule: "hsl(var(--rule) / <alpha-value>)",
				muted: "hsl(var(--muted) / <alpha-value>)",
				lilac: "hsl(var(--lilac) / <alpha-value>)",
				violet: "hsl(var(--violet) / <alpha-value>)",
				bone: "hsl(var(--bone) / <alpha-value>)",
			},
			fontFamily: {
				display: ["Fraunces", "Georgia", "serif"],
				body: ["'Inter Tight'", "system-ui", "sans-serif"],
				mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
			},
		},
	},
	plugins: [],
} satisfies Config;
