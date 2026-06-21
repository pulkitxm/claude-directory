import type { Config } from "tailwindcss";

// Standard shadcn/ui Tailwind theme. Every color is wired to a CSS variable
// defined in src/index.css (HSL channels), so the same class names work in
// both light and dark mode. The copied component leans on these tokens:
//   bg-primary / text-primary-foreground / bg-secondary / text-muted-foreground
//   border-input / ring-ring / accent / destructive / rounded-md (radius).
// The bespoke `text-spektr-cyan-50` utility referenced in animated-hero.tsx is
// added under colors as well so the headline picks up the brand cyan.
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
				display: ['"Space Grotesk"', '"Inter"', "ui-sans-serif", "sans-serif"],
				mono: [
					'"JetBrains Mono"',
					"ui-monospace",
					"SFMono-Regular",
					"monospace",
				],
			},
			fontWeight: {
				regular: "400",
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
				// Brand cyan used by the headline's `text-spektr-cyan-50` class.
				"spektr-cyan": {
					50: "hsl(var(--spektr-cyan))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				aurora: {
					"0%, 100%": { transform: "translate3d(-6%, -2%, 0) scale(1)" },
					"50%": { transform: "translate3d(6%, 4%, 0) scale(1.12)" },
				},
				ticker: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				aurora: "aurora 18s ease-in-out infinite",
				ticker: "ticker 38s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
