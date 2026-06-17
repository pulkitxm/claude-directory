import { useState, useCallback } from "react";
import ShaderCanvas from "@/components/ui/celestial-sphere-shader";

/**
 * The brief's reference `demo.tsx`, ported to strict TypeScript and pointed at
 * the locally-vendored starfield texture. Kept as the canonical "drop-in usage"
 * example. The richer survey console lives in App.tsx; this file documents the
 * minimal way to wire the component up with presets, sliders, and colour pickers.
 */

// --- Constants ---
interface SphereProps {
  color1: string;
  color2: string;
  rotationSpeed: number;
  cloudDensity: number;
  glowIntensity: number;
}

const DEFAULT_PROPS: SphereProps = {
  color1: "#082f49", // Dark Blue
  color2: "#7dd3fc", // Light Blue
  rotationSpeed: 0.1,
  cloudDensity: 2.5,
  glowIntensity: 1.5,
};

const PRESETS: { name: string; settings: SphereProps }[] = [
  {
    name: "Orion Nebula",
    settings: { color1: "#431478", color2: "#e879f9", rotationSpeed: 0.05, cloudDensity: 3.0, glowIntensity: 1.8 },
  },
  {
    name: "Crimson Gas Giant",
    settings: { color1: "#4a044e", color2: "#be123c", rotationSpeed: 0.15, cloudDensity: 2.0, glowIntensity: 1.2 },
  },
  {
    name: "Ice Planet",
    settings: { color1: "#ffffff", color2: "#67e8f9", rotationSpeed: 0.1, cloudDensity: 4.0, glowIntensity: 2.0 },
  },
];

// --- Main App Component ---
export default function DemoOne() {
  const [props, setProps] = useState<SphereProps>(DEFAULT_PROPS);

  const applyPreset = useCallback((preset: { settings: SphereProps }) => setProps(preset.settings), []);
  const handleValueChange = useCallback(<K extends keyof SphereProps>(propName: K, value: SphereProps[K]) => {
    setProps((prev) => ({ ...prev, [propName]: value }));
  }, []);

  const randomize = useCallback(() => {
    setProps({
      color1: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      rotationSpeed: Math.random() * 0.4,
      cloudDensity: 1.0 + Math.random() * 4.0,
      glowIntensity: 0.5 + Math.random() * 2.5,
    });
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black font-sans overflow-hidden">
      {/* Background starfield texture (vendored locally) */}
      <div className="absolute inset-0 bg-[url('/assets/stardust.png')] opacity-30" />

      {/* The main shader component */}
      <ShaderCanvas {...props} />

      {/* UI Controls Panel */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl p-6 rounded-2xl text-white shadow-2xl w-96 border border-white/10">
        <h1 className="text-2xl font-bold mb-2 tracking-wide text-white/90">Celestial Sphere Controls</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm text-white/70">Nebula Color A</label>
            <input
              type="color"
              value={props.color1}
              onChange={(e) => handleValueChange("color1", e.target.value)}
              className="w-full h-10 p-1 bg-gray-800 border-white/20 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-white/70">Nebula Color B</label>
            <input
              type="color"
              value={props.color2}
              onChange={(e) => handleValueChange("color2", e.target.value)}
              className="w-full h-10 p-1 bg-gray-800 border-white/20 rounded-md"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Rotation Speed: {props.rotationSpeed.toFixed(2)}</label>
            <input
              type="range"
              min="0.0"
              max="0.5"
              step="0.01"
              value={props.rotationSpeed}
              onChange={(e) => handleValueChange("rotationSpeed", parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
          <div>
            <label className="text-sm">Cloud Density: {props.cloudDensity.toFixed(2)}</label>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.1"
              value={props.cloudDensity}
              onChange={(e) => handleValueChange("cloudDensity", parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
          <div>
            <label className="text-sm">Glow Intensity: {props.glowIntensity.toFixed(2)}</label>
            <input
              type="range"
              min="0.0"
              max="3.0"
              step="0.01"
              value={props.glowIntensity}
              onChange={(e) => handleValueChange("glowIntensity", parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="px-3 py-2 text-xs bg-white/10 rounded-md hover:bg-white/20 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={randomize}
              className="px-3 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-md hover:bg-purple-500/40 transition-colors"
            >
              Randomize
            </button>
            <button
              onClick={() => setProps(DEFAULT_PROPS)}
              className="px-3 py-2 text-sm bg-indigo-500/20 text-indigo-300 rounded-md hover:bg-indigo-500/40 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
