/**
 * Copyable source shown in the lab's "Integration" tabs. Kept as plain
 * strings so the UI can render and copy the exact files that live in
 * `components/ui` and the shadcn install steps verbatim.
 */

export const INSTALL_CMD = "npm i @paper-design/shaders-react";

export const SHADCN_INIT = `# 1 · scaffold a TypeScript + Tailwind app, then init shadcn
npm create vite@latest my-app -- --template react-ts
cd my-app
npm i -D tailwindcss @tailwindcss/vite
npx shadcn@latest init   # writes components.json -> aliases @/components`;

export const COMPONENT_SRC = `// components/ui/paper-design-shader-background.tsx
"use client"

import { GrainGradient } from "@paper-design/shaders-react"

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 0%)"
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={["hsl(14, 100%, 57%)", "hsl(45, 100%, 51%)", "hsl(340, 82%, 52%)"]}
      />
    </div>
  )
}`;

export const USAGE_SRC = `// app/page.tsx — the prompt's demo usage
import { GradientBackground } from "@/components/ui/paper-design-shader-background"

export default function DemoOne() {
  return (
    <main className="relative min-h-screen h-full w-full flex items-center
                     justify-center overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <section className="px-6">
        <h1 className="text-white text-center text-balance font-light
                       tracking-tight text-5xl">
          Backgrounds are awesome :)
        </h1>
      </section>
    </main>
  )
}`;

export const PARAMETRIC_SRC = `// components/ui/grain-gradient-stage.tsx — live-prop variant
import { GrainGradient } from "@paper-design/shaders-react"

export function GrainGradientStage(props) {
  return (
    <GrainGradient
      style={{ height: "100%", width: "100%" }}
      shape={props.shape}            // wave|dots|truchet|corners|ripple|blob|sphere
      colorBack={props.colorBack}
      colors={props.colors}          // up to 7 CSS colours
      softness={props.softness}      // 0..1 band blur
      intensity={props.intensity}    // 0..1 band distortion
      noise={props.noise}            // 0..1 film grain
      scale={props.scale}
      rotation={props.rotation}      // degrees
      offsetX={props.offsetX}
      offsetY={props.offsetY}
      speed={props.paused ? 0 : props.speed}
    />
  )
}`;
