import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * shadcn/ui Tailwind scaffold (dark-first) plus the `spotlight` keyframes the
 * Aceternity <Spotlight /> relies on. The Spotlight ships with the class
 * `animate-spotlight` and `opacity-0`; without this keyframe definition it would
 * stay invisible forever, so registering it here is part of integrating the
 * component correctly.
 */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: { "2xl": "1400px" },
		},
		extend: {
			fontFamily: {
				sans: ["Geist", "Inter", "system-ui", "sans-serif"],
				mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				spotlight: {
					"0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
					"100%": {
						opacity: "1",
						transform: "translate(-50%, -40%) scale(1)",
					},
				},
				"border-beam": {
					"100%": { "offset-distance": "100%" },
				},
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				},
			},
			animation: {
				spotlight: "spotlight 2s ease 0.75s 1 forwards",
				marquee: "marquee var(--duration, 30s) linear infinite",
			},
		},
	},
	plugins: [animate],
} satisfies Config;
