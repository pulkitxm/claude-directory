import { PALETTE } from "@/lib/field";

/**
 * The 7-stop palette the shader's `multiColorGradient` mixes top-to-bottom.
 * Rendered as a continuous bar plus labelled chips so the console doubles as a
 * reference card for the exact hex stops baked into the GLSL.
 */
export function PaletteStrip() {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
          Pigment Stops
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-wide2 text-ink-400">
          7 · multiColorGradient
        </span>
      </div>

      <div
        className="h-3 w-full overflow-hidden rounded-full ring-1 ring-line-strong"
        style={{
          background: `linear-gradient(to right, ${PALETTE.map((p) => p.hex).join(", ")})`,
        }}
        aria-hidden="true"
      />

      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
        {PALETTE.map((p) => (
          <li key={p.hex} className="flex items-center gap-2">
            <span
              className="h-3 w-3 flex-shrink-0 rounded-[3px] ring-1 ring-black/10"
              style={{ backgroundColor: p.hex }}
              aria-hidden="true"
            />
            <span className="font-sans text-[11px] text-ink-600">{p.name}</span>
            <span className="ml-auto font-mono text-[10px] uppercase tabular text-ink-400">
              {p.hex.replace("#", "")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
