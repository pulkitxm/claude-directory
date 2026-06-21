/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		// Centralized design tokens — the DNA of the Linear/Modern system.
		// Everything downstream references these names instead of raw values.
		extend: {
			colors: {
				bg: {
					deep: "#020203",
					base: "#050506",
					elevated: "#0a0a0c",
				},
				fg: {
					DEFAULT: "#EDEDEF",
					muted: "#8A8F98",
					subtle: "rgba(255,255,255,0.60)",
				},
				accent: {
					DEFAULT: "#5E6AD2",
					bright: "#6872D9",
				},
			},
			fontFamily: {
				sans: ['"Inter"', '"Geist Sans"', "system-ui", "sans-serif"],
				mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
			},
			letterSpacing: {
				display: "-0.03em",
			},
			borderRadius: {
				"2xl": "1rem",
				xl: "0.75rem",
				lg: "0.5rem",
			},
			boxShadow: {
				// Multi-layer shadow formulas — never a single shadow.
				card: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
				"card-hover":
					"0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)",
				cta: "0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)",
				"cta-hover":
					"0 0 0 1px rgba(94,106,210,0.6), 0 6px 22px rgba(94,106,210,0.45), inset 0 1px 0 0 rgba(255,255,255,0.25)",
				"inner-hi": "inset 0 1px 0 0 rgba(255,255,255,0.1)",
				secondary:
					"inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 0 rgba(255,255,255,0.06)",
			},
			transitionTimingFunction: {
				// expo-out — the system's primary easing.
				expo: "cubic-bezier(0.16, 1, 0.3, 1)",
			},
			transitionDuration: {
				quick: "200ms",
				std: "300ms",
			},
			keyframes: {
				"float-a": {
					"0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
					"50%": { transform: "translate(0, -40px) rotate(1deg)" },
				},
				"float-b": {
					"0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
					"50%": { transform: "translate(30px, 30px) rotate(-1deg)" },
				},
				"float-c": {
					"0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
					"50%": { transform: "translate(-26px, 20px) rotate(1deg)" },
				},
				"pulse-glow": {
					"0%, 100%": { opacity: "0.5" },
					"50%": { opacity: "0.85" },
				},
				shimmer: {
					"0%": { backgroundPosition: "200% center" },
					"100%": { backgroundPosition: "-200% center" },
				},
				"scan-down": {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(400%)" },
				},
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			animation: {
				"float-a": "float-a 9s ease-in-out infinite",
				"float-b": "float-b 11s ease-in-out infinite",
				"float-c": "float-c 8s ease-in-out infinite",
				"pulse-glow": "pulse-glow 7s ease-in-out infinite",
				shimmer: "shimmer 6s linear infinite",
				"scan-down": "scan-down 4s ease-in-out infinite",
				marquee: "marquee 38s linear infinite",
			},
		},
	},
	plugins: [],
};
