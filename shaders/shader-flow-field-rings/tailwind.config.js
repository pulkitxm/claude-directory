/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				ink: {
					900: "#05060A",
					800: "#080A11",
					700: "#0C0F17",
					600: "#11151F",
					500: "#171C28",
				},
				graphite: {
					DEFAULT: "#3A4150",
					dim: "#262B36",
					line: "#1B202B",
				},
				phosphor: "#E8ECF4",
				chan: {
					r: "#FF2D55",
					g: "#39FF7A",
					b: "#2D7BFF",
				},
			},
			fontFamily: {
				display: ['"Space Grotesk"', "system-ui", "sans-serif"],
				sans: ['"Inter"', "system-ui", "sans-serif"],
				mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
			},
			letterSpacing: {
				tightest: "-0.045em",
			},
			keyframes: {
				"scan-sweep": {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(100%)" },
				},
				flicker: {
					"0%, 100%": { opacity: "0.92" },
					"50%": { opacity: "1" },
				},
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(14px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				"scan-sweep": "scan-sweep 6s linear infinite",
				flicker: "flicker 4s ease-in-out infinite",
				"fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
			},
		},
	},
	plugins: [],
};
