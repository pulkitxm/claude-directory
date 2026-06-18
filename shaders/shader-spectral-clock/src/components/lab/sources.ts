// Copyable source strings shown in the "Source" tabs. The component string is the
// brief's verbatim shader-clock.tsx (the drop-in a host pastes into
// @/components/ui), and the usage string is the brief's verbatim demo.tsx.

export const SHADER_CLOCK_TSX = `"use client";

import { useEffect, useRef, useState } from "react";

//
// 🔹 Shader Background Component
//
export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Vertex + fragment shaders ...
    const vertexShaderSource = \`
      attribute vec4 aVertexPosition;
      void main() { gl_Position = aVertexPosition; }
    \`;

    const fragmentShaderSource = \`
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      // spectral_colour(l): maps a wavelength in nm to an approximate RGB.
      // ... (full body in the component) ...
      void main() {
        vec2 p = (2.0*gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        p *= 2.0;
        for (int i = 0; i < 8; i++) {
          p = vec2(
            p.y + cos(p.x + iTime) - sin(p.y * cos(iTime * 0.2)),
            p.x - sin(p.y - iTime) - cos(p.x * sin(iTime * 0.3))
          );
        }
        gl_FragColor = vec4(spectral_colour(p.y * 50.0 + 500.0 + sin(iTime * 0.6)), 1.0);
      }
    \`;

    // compile / link / draw with requestAnimationFrame ...
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" />;
};

//
// 🔹 Time Display Component (clock · editable city · °C/°F toggle)
//
export const TimeDisplay = () => { /* ... */ };

//
// 🔹 Example: Combined Wrapper
//
export default function Dashboard() {
  return (
    <div className="relative w-full h-screen">
      <ShaderBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <TimeDisplay />
      </div>
    </div>
  );
}
`;

export const DEMO_TSX = `import { useState, useEffect } from "react";
import { ShaderBackground } from "@/components/ui/shader-clock";
import { TimeDisplay } from "@/components/ui/shader-clock";

export default function App() {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <ShaderBackground />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={\`backdrop-blur-sm bg-black/20 px-8 py-10 rounded-2xl shadow-xl transition-all duration-700 \${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }\`}
        >
          <TimeDisplay />
        </div>

        {showInfo && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-6 py-4 rounded-lg text-white/80 text-sm animate-fadeIn">
            <p>Click on the city name to edit your location.</p>
            <p className="mt-1">Click on the temperature to toggle between °C and °F.</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowInfo((p) => !p)}
        className={\`absolute bottom-6 right-6 w-10 h-10 grid place-items-center rounded-full backdrop-blur-md text-white/70 hover:text-white transition-all \${
          showInfo ? "bg-black/40 rotate-180" : "bg-black/30"
        }\`}
        aria-label={showInfo ? "Close information" : "Show information"}
      >
        {showInfo ? "×" : "i"}
      </button>
    </div>
  );
}
`;

export const INSTALL_SH = `# 1 — scaffold a shadcn + Tailwind + TypeScript app (if you don't have one)
npx create-vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss @tailwindcss/vite
npx shadcn@latest init        # writes components.json, sets the "@/components" aliases

# 2 — the component lives at the shadcn default: @/components/ui
#     create the folder if it does not exist yet
mkdir -p src/components/ui

# 3 — drop the component in and install its only external dep
#     (lucide-react is optional — used for the icons in this lab, not the widget)
cp shader-clock.tsx src/components/ui/shader-clock.tsx
npm install lucide-react
`;

export const USAGE_MIN_TSX = `import Dashboard from "@/components/ui/shader-clock";

// The component is fully self-contained — no props, no providers.
export default function Page() {
  return <Dashboard />;
}

// …or compose the parts yourself:
import { ShaderBackground, TimeDisplay } from "@/components/ui/shader-clock";

function Hero() {
  return (
    <div className="relative w-full h-screen">
      <ShaderBackground />
      <div className="absolute inset-0 grid place-items-center">
        <TimeDisplay />
      </div>
    </div>
  );
}
`;
