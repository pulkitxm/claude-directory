import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: "var(--font-display)",
				body: "var(--font-body)",
				mono: "var(--font-mono)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				border: "hsl(var(--border))",
				// Stained-glass channels — sampled from the shader's sin(p.y + (6,1,2,3)) palette
				glass: {
					rose: "hsl(var(--glass-rose))",
					gold: "hsl(var(--glass-gold))",
					azure: "hsl(var(--glass-azure))",
					jade: "hsl(var(--glass-jade))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			letterSpacing: {
				monument: "0.42em",
			},
			keyframes: {
				"reveal-up": {
					from: { opacity: "0", transform: "translateY(22px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"reveal-blur": {
					from: { opacity: "0", filter: "blur(12px)" },
					to: { opacity: "1", filter: "blur(0)" },
				},
				"rail-in": {
					from: { opacity: "0", transform: "translateX(-14px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				"rail-in-right": {
					from: { opacity: "0", transform: "translateX(14px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				"hud-in": {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"candle-flicker": {
					"0%, 100%": { opacity: "1" },
					"45%": { opacity: "1" },
					"50%": { opacity: "0.55" },
					"55%": { opacity: "1" },
				},
				"sweep-spin": {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"reveal-up": "reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
				"reveal-blur": "reveal-blur 1s cubic-bezier(0.22,1,0.36,1) both",
				"rail-in": "rail-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
				"rail-in-right": "rail-in-right 0.7s cubic-bezier(0.22,1,0.36,1) both",
				"hud-in": "hud-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
				"candle-flicker": "candle-flicker 3.2s ease-in-out infinite",
				"sweep-spin": "sweep-spin 16s linear infinite",
			},
		},
	},
	plugins: [animate],
} satisfies Config;
