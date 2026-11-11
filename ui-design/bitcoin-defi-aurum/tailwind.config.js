export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#030304",
        matter: "#0F1115",
        orange: "#F7931A",
        burnt: "#EA580C",
        gold: "#FFD600",
        stardust: "#94A3B8",
        boundary: "#1E293B"
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"]
      },
      maxWidth: {
        "8xl": "88rem"
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(234,88,12,0.5)",
        "glow-lg": "0 0 30px -5px rgba(247,147,26,0.6)",
        gold: "0 0 20px rgba(255,214,0,0.3)",
        elevate: "0 0 50px -10px rgba(247,147,26,0.1)",
        card: "0 0 30px -10px rgba(247,147,26,0.2)",
        tier: "0 0 40px -10px rgba(247,147,26,0.15)",
        node: "0 0 20px rgba(234,88,12,0.4)"
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-20px)"
          }
        },
        "float-soft": {
          "0%, 100%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-12px)"
          }
        },
        drift: {
          "0%, 100%": {
            transform: "translate(0, 0)"
          },
          "50%": {
            transform: "translate(0, -14px)"
          }
        },
        shimmer: {
          "0%": {
            backgroundPosition: "200% center"
          },
          "100%": {
            backgroundPosition: "-200% center"
          }
        },
        "ticker-scroll": {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(-50%)"
          }
        },
        "reveal-up": {
          from: {
            opacity: "0",
            transform: "translateY(24px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-soft": "float-soft 6s ease-in-out infinite",
        drift: "drift 5s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        ticker: "ticker-scroll 40s linear infinite",
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) both"
      }
    }
  },
  plugins: []
};
