import { GLSLHills } from "@/components/ui/glsl-hills";

/**
 * The canonical demo from the integration brief, reproduced faithfully: the
 * GLSL hill range filling a full-bleed stage with the editorial lockup floating
 * over it. Reused live as the hero stage in the showcase — the only change is
 * relaxing the implicit `100vh` to `h-full` so it can sit inside a framed
 * instrument window, and binding the brief's `text-primary/60` to a concrete
 * tint (this scaffold runs shadcn with `cssVariables: false`).
 */
export default function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-fog-950">
      <GLSLHills width="100%" height="100%" />
      <div className="pointer-events-none absolute z-10 space-y-6 px-6 text-center text-haze">
        <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tightest sm:text-6xl md:text-7xl">
          <span className="block text-4xl font-thin italic sm:text-5xl md:text-6xl">
            Designs That Speak
          </span>
          Louder Than Words
        </h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-haze/60">
          We craft stunning visuals and user-friendly experiences that help your
          brand stand out and connect with your audience.
        </p>
      </div>
    </div>
  );
}
