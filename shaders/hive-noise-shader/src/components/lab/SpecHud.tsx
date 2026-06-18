import { Activity, Cpu, Layers, MonitorSmartphone } from "lucide-react";

/**
 * A compact instrument panel describing what the `hive` shader actually does.
 * The component exposes no live stats (it owns its own rAF loop and uniforms),
 * so rather than fake telemetry we surface the shader's real shape: its two
 * uniforms, the raymarch iteration count, and the draw call. Honest > flashy.
 */
const ROWS: { icon: typeof Cpu; label: string; value: string }[] = [
  { icon: Cpu, label: "Context", value: "webgl2" },
  { icon: Layers, label: "Raymarch", value: "20 steps" },
  { icon: Activity, label: "Uniforms", value: "u_res · u_time" },
  { icon: MonitorSmartphone, label: "DPR clamp", value: "1 – 2×" },
];

export function SpecHud() {
  return (
    <aside className="glass w-[230px] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Shader spec
        </span>
        <span className="flex items-center gap-1.5">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="font-mono text-[10px] text-amber/90">live</span>
        </span>
      </div>

      <div className="my-3 hairline opacity-50" />

      <dl className="space-y-2.5">
        {ROWS.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <r.icon className="h-3.5 w-3.5 text-magenta/80" />
              {r.label}
            </dt>
            <dd className="font-mono text-[11px] text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="my-3 hairline opacity-50" />

      <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
        Fullscreen triangle pair, one draw per frame. Output is
        <span className="text-amber"> tanh</span>-compressed so highlights bloom
        without clipping.
      </p>
    </aside>
  );
}
