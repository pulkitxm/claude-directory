import { MorphingLight } from "@/components/ui/morphing-light";

/**
 * DemoOne — the verbatim integration example from the brief. The richer
 * interferometer console lives in `App.tsx`; this file is kept so the canonical
 * drop-in usage from the prompt stays available and self-documenting. With no
 * props, <MorphingLight /> renders byte-for-byte the original shader.
 */
export default function DemoOne() {
  return (
    <div className="w-full h-screen">
      <MorphingLight />

      <main className="absolute top-40 left-1/2 -translate-x-1/2 z-20">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative">
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <span className="text-white/90 text-xs font-light relative z-10">
              ✨ New Design Ideas
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-9xl leading-[1.05] tracking-tight text-white mb-4">
            <span className="italic font-thin">Beautiful</span>
            <br />
            <span className="tracking-tight text-white font-black">
              Design Experiences
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs font-light text-white/70 my-4 leading-relaxed max-w-md mx-auto">
            Discover the essence of creativity in our exquisite collection of
            top-tier abstract design assets. Each piece is a blend of beauty and
            utility, perfect for elevating any project.
          </p>
        </div>
      </main>

      <div className="flex absolute bottom-20 left-1/2 -translate-x-1/2 justify-center items-center gap-3 flex-wrap">
        <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
          Book a call
        </button>
        <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
}
