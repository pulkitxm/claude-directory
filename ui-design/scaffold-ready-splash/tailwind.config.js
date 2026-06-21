/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
			},
			colors: {
				ink: {
					950: "#08080b",
					900: "#0b0b10",
					850: "#101018",
					800: "#15151f",
				},
				edge: "rgba(255,255,255,0.08)",
				accent: {
					DEFAULT: "#7D4EFF",
					soft: "#9a74ff",
				},
			},
			keyframes: {
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(14px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"grid-pan": {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "64px 64px" },
				},
				"orb-a": {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(40px, -30px) scale(1.08)" },
				},
				"orb-b": {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(-36px, 28px) scale(0.94)" },
				},
				"pulse-ring": {
					"0%": { transform: "scale(0.9)", opacity: "0.7" },
					"70%": { transform: "scale(1.6)", opacity: "0" },
					"100%": { transform: "scale(1.6)", opacity: "0" },
				},
				"caret-blink": {
					"0%, 49%": { opacity: "1" },
					"50%, 100%": { opacity: "0" },
				},
				"spin-slow": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				sheen: {
					"0%": { transform: "translateX(-120%)" },
					"100%": { transform: "translateX(120%)" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
				"grid-pan": "grid-pan 22s linear infinite",
				"orb-a": "orb-a 16s ease-in-out infinite",
				"orb-b": "orb-b 19s ease-in-out infinite",
				"pulse-ring": "pulse-ring 2.8s cubic-bezier(0.16,1,0.3,1) infinite",
				"caret-blink": "caret-blink 1.1s step-end infinite",
				"spin-slow": "spin-slow 9s linear infinite",
				sheen: "sheen 3.2s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
