/** @type {import('tailwindcss').Config} */
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
				display: ["Space Grotesk", "system-ui", "sans-serif"],
				sans: ["Inter", "system-ui", "sans-serif"],
				mono: ["JetBrains Mono", "ui-monospace", "monospace"],
			},
			colors: {
				ink: {
					DEFAULT: "#0B0C10",
					soft: "#101218",
					raised: "#161922",
				},
				iris: {
					DEFAULT: "#7C82FF",
					bright: "#9AA0FF",
					deep: "#4F46E5",
				},
				ember: "#F0A35E",
			},
			boxShadow: {
				// The exact layered drop shadow the source Card uses, exposed as a
				// reusable utility so other surfaces can echo the same depth.
				deck: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
			},
			keyframes: {
				"grid-drift": {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "0 -48px" },
				},
				"pulse-dot": {
					"0%, 100%": { opacity: "1", transform: "scale(1)" },
					"50%": { opacity: "0.4", transform: "scale(0.7)" },
				},
			},
			animation: {
				"grid-drift": "grid-drift 12s linear infinite",
				"pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
