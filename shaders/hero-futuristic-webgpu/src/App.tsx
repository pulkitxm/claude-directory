import { HeroFuturistic } from './components/ui/hero-futuristic';

export default function App() {
  return (
    <main className="relative h-svh w-full overflow-hidden bg-black text-white">
      {/* The hero (vendored component) — depth-mapped portrait + WebGPU/TSL post FX */}
      <HeroFuturistic />

      {/* Page chrome layered above the canvas, non-interactive so the
          pointer-driven parallax still reaches the WebGPU surface. */}
      <div className="pointer-events-none absolute inset-0 z-[70] select-none">
        {/* top status rail */}
        <header className="flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/70">
            ╱╱ Fable&nbsp;Labs
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            WebGPU · TSL · Bloom
          </div>
        </header>

        {/* corner reticles */}
        <span className="absolute left-6 top-1/2 h-px w-6 -translate-y-1/2 bg-white/20 md:left-10" />
        <span className="absolute right-6 top-1/2 h-px w-6 -translate-y-1/2 bg-white/20 md:right-10" />

        {/* bottom meta strip */}
        <footer className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 md:px-10 md:pb-8">
          <p className="max-w-[16rem] font-mono text-[10px] leading-relaxed tracking-[0.18em] text-white/45">
            DEPTH-DRIVEN PARALLAX · MOVE CURSOR TO STEER
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/45">
            /components/ui/hero-futuristic
          </p>
        </footer>
      </div>

      {/* film vignette + scanline veil */}
      <div className="pointer-events-none absolute inset-0 z-[65] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
      <div className="page-scanlines pointer-events-none absolute inset-0 z-[66]" />
    </main>
  );
}
