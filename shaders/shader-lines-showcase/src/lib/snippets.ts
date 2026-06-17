/**
 * Real, copy-pasteable snippets surfaced on the showcase page.
 * Kept here so the docs panel shows the same code the project actually ships.
 */

export const INSTALL_CLI = `# 1. Make sure the project is shadcn-ready (Tailwind + TS + components/ui)
npx shadcn@latest init

# 2. Vendor Three.js r89 so the component runs offline
curl -fsSL https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js \\
  -o public/vendor/three.min.js`;

export const USAGE_TSX = `import { ShaderAnimation } from "@/components/ui/shader-lines";

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center
                    justify-center overflow-hidden rounded-xl">
      <ShaderAnimation />
      <span className="pointer-events-none z-10 text-center text-7xl
                       leading-none font-semibold tracking-tighter text-white">
        Shader Lines
      </span>
    </div>
  );
}`;

export const COMPONENT_TSX = `"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

// three.min.js (r89) is vendored to /public so the field renders offline.
const THREE_SRC = "/vendor/three.min.js";

export interface ShaderAnimationProps {
  className?: string;
  speed?: number;
}

export function ShaderAnimation({ className, speed = 1 }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // ...loads Three.js once, builds a full-screen quad, and runs a single
  // ShaderMaterial whose fragment shader draws the line field below.

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}`;

export const FRAGMENT_GLSL = `precision highp float;
uniform vec2  resolution;
uniform float time;

float random (in float x)  { return fract(sin(x) * 1e4); }
float random (vec2 st)     { return fract(sin(dot(st.xy,
                              vec2(12.9898, 78.233))) * 43758.5453123); }

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy)
            / min(resolution.x, resolution.y);

  // Quantise to a 4x2 mosaic — this is what stair-steps the streaks.
  vec2 fMosaicScal = vec2(4.0, 2.0);
  vec2 vScreenSize = vec2(256.0, 256.0);
  uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x)
         / (vScreenSize.x / fMosaicScal.x);
  uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y)
         / (vScreenSize.y / fMosaicScal.y);

  float t = time * 0.06 + random(uv.x) * 0.4;
  float lineWidth = 0.0008;

  // Three colour channels, five offset lines each, accumulated into glow.
  vec3 color = vec3(0.0);
  for (int j = 0; j < 3; j++)
    for (int i = 0; i < 5; i++)
      color[j] += lineWidth * float(i * i)
        / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) - length(uv));

  gl_FragColor = vec4(color[2], color[1], color[0], 1.0);
}`;
