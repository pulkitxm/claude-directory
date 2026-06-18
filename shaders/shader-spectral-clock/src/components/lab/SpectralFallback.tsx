/**
 * Pure-CSS spectral aurora shown only when WebGL is unavailable, so the stage is
 * never flat black. Marked with data-shader-fallback for headless verification.
 */
export function SpectralFallback() {
  return (
    <div
      data-shader-fallback="true"
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 20% 110%, #7b2cff55 0%, transparent 55%)," +
          "radial-gradient(120% 90% at 80% 110%, #ff4d6d55 0%, transparent 55%)," +
          "radial-gradient(90% 80% at 50% 120%, #2cff9a55 0%, transparent 60%)," +
          "linear-gradient(180deg, #05060f 0%, #0a0c1e 100%)",
      }}
    >
      <div
        className="absolute inset-x-[-30%] bottom-[-20%] top-[20%] opacity-70 blur-2xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 100%, #7b2cff, #2c8bff, #2cf0d8, #2cff9a, #ffe14d, #ff4d6d, #7b2cff)",
          maskImage: "radial-gradient(80% 70% at 50% 100%, #000 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(80% 70% at 50% 100%, #000 0%, transparent 70%)",
          animation: "fallbackDrift 14s ease-in-out infinite alternate",
        }}
      />
      <style>{`@keyframes fallbackDrift{from{transform:translateX(-4%) scaleY(1)}to{transform:translateX(4%) scaleY(1.1)}}`}</style>
    </div>
  );
}
