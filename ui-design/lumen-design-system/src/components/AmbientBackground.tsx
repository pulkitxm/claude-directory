import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

// Inline SVG fractal-noise texture (data URI) — keeps the project self-contained.
const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The fixed, four-layer ambient background that sits behind the whole page:
 *   1. radial base gradient (top-center vertical depth)
 *   2. animated, heavily-blurred gradient "light pools"
 *   3. fractal noise texture (anti-banding, tactile)
 *   4. 64px technical grid overlay
 * Floating motion is disabled under prefers-reduced-motion.
 */
export function AmbientBackground() {
  const reduced = usePrefersReducedMotion();
  const floatA = reduced ? "" : "animate-float-a";
  const floatB = reduced ? "" : "animate-float-b";
  const floatC = reduced ? "" : "animate-float-c";
  const pulse = reduced ? "" : "animate-pulse-glow";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer 1 — base radial gradient. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />

      {/* Layer 3 — animated gradient blobs (light pools). */}
      <div
        className={`absolute -top-[28rem] left-1/2 h-[44rem] w-[58rem] -translate-x-1/2 rounded-full blur-[150px] ${floatA}`}
        style={{
          background:
            "radial-gradient(circle, rgba(94,106,210,0.30) 0%, rgba(94,106,210,0.06) 45%, transparent 70%)",
        }}
      />
      <div
        className={`absolute top-[14rem] -left-40 h-[34rem] w-[26rem] rounded-full blur-[120px] ${floatB}`}
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(236,72,153,0.08) 50%, transparent 72%)",
        }}
      />
      <div
        className={`absolute top-[34rem] -right-32 h-[30rem] w-[22rem] rounded-full blur-[110px] ${floatC}`}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(94,106,210,0.08) 50%, transparent 72%)",
        }}
      />
      <div
        className={`absolute bottom-[-10rem] left-1/3 h-[36rem] w-[40rem] -translate-x-1/2 rounded-full blur-[150px] ${pulse}`}
        style={{
          background:
            "radial-gradient(circle, rgba(94,106,210,0.12) 0%, transparent 68%)",
        }}
      />

      {/* Layer 4 — 64px grid overlay. */}
      <div className="bg-grid absolute inset-0 opacity-[0.02] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_85%)]" />

      {/* Layer 2 — fractal noise. */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
        style={{ backgroundImage: NOISE_URI, backgroundSize: "200px 200px" }}
      />

      {/* Long downward vignette so content the bottom dissolves into the deep. */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg-deep to-transparent" />
    </div>
  );
}
