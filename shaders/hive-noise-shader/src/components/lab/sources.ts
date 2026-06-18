/**
 * Source-of-truth snippets surfaced in the docs. Kept here so the copy buttons
 * always hand back exactly what the lab shows.
 */

export const INSTALL_SHADCN = `# 1 · Scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2 · Add Tailwind CSS v4 (Vite plugin)
npm install tailwindcss @tailwindcss/vite

# 3 · Initialise shadcn/ui — creates components.json + the @/ alias
npx shadcn@latest init`;

export const VITE_ALIAS = `// vite.config.ts — the "@" alias shadcn relies on
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});`;

export const CSS_IMPORT = `/* src/index.css — Tailwind v4 entry (the "styles" path) */
@import "tailwindcss";`;

export const DROP_IN = `# Copy the component into the registry folder
src/components/ui/hive.tsx   # the shader (paste it here)
src/components/ui/demo.tsx   # the usage example`;

export const USE_DEMO = `// demo.tsx
"use client"

import ShaderDemo from "@/components/ui/hive"

export default function Demo() {
  return (
    <div className="w-full h-screen">
      <ShaderDemo />
    </div>
  )
}`;

export const USE_BACKDROP = `// Use it as a fixed, full-viewport backdrop and lay UI over it.
import ShaderDemo from "@/components/ui/hive"

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <ShaderDemo />
      </div>
      {/* your headline, CTA, nav … */}
    </section>
  )
}`;

export const DEPS = `// package.json — what the component needs
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
    // ↑ the shader itself imports nothing else.
    //   No three.js, no glsl loader, no shader runtime.
  }
}`;
