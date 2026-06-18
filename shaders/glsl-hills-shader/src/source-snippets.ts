/**
 * Copyable source fragments for the integration story. Kept as plain strings so
 * the "copy the source" tabs hand a developer exactly what to paste.
 */

export const INSTALL_DEP = `npm install three`;

export const INSTALL_SHADCN = `# 1. scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. add Tailwind CSS (v3)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. wire up shadcn — this writes components.json and
#    creates the components/ui + lib/utils conventions
npx shadcn@latest init`;

export const CONFIG_ALIAS = `// vite.config.ts — the "@/..." alias shadcn assumes
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});`;

export const USAGE_BASIC = `import { GLSLHills } from "@/components/ui/glsl-hills";

export default function Hero() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <GLSLHills />
      <h1 className="pointer-events-none absolute z-10 text-7xl font-semibold">
        <span className="block text-6xl font-thin italic">Designs That Speak</span>
        Louder Than Words
      </h1>
    </div>
  );
}`;

export const USAGE_TELEMETRY = `// The optional hooks let a host read the shader's live state off the
// render loop — no extra render passes, no touching the GLSL.
<GLSLHills
  speed={0.5}
  paused={frozen}
  onReady={({ uniforms }) => (clockRef.current = uniforms.time)}
  onFrame={({ time, fps, cameraZ }) => setHud({ time, fps, cameraZ })}
/>`;

/** A faithful excerpt of the drop-in component (the Plane + GLSL core). */
export const COMPONENT_SOURCE = `import { useEffect, useRef } from "react";
import * as THREE from "three";

const GLSLHills = ({ width = "100vw", height = "100vh",
  cameraZ = 125, planeSize = 256, speed = 0.5 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    class Plane {
      constructor() {
        this.uniforms = { time: { type: "f", value: 0 } };
        this.mesh = this.createMesh();
        this.time = speed;
      }
      createMesh() {
        return new THREE.Mesh(
          new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize),
          new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: /* perlin cnoise displaces the folded plane */ \`…\`,
            fragmentShader: /* opacity = (96 - length(vPosition)) / 256 * 0.6 */ \`…\`,
            transparent: true,
          }),
        );
      }
      render(time) { this.uniforms.time.value += time * this.time; }
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1e4);
    const clock = new THREE.Clock();
    const plane = new Plane();
    camera.position.set(0, 16, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 28, 0));
    scene.add(plane.mesh);

    (function loop() {
      plane.render(clock.getDelta());
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  }, [cameraZ, planeSize, speed]);

  return <canvas ref={canvasRef} />;
};

export { GLSLHills };`;
