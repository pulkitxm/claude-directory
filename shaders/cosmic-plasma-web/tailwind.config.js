/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#04030a",
        ink: "#0a0a16",
        panel: "#0d1022",
        plasma: "#7df9ff",
        violet: "#9b8cff",
        magenta: "#ff5fd2",
        amber: "#ffd166",
        mist: "#8b93b8",
      },
      fontFamily: {
        display: ['"Chakra Petch"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
