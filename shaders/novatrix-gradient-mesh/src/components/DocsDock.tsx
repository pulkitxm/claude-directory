import { useState } from "react";
import { Boxes, FolderTree, Terminal, Wand2 } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

type Tab = "install" | "props" | "usage" | "why";

const TABS: Array<{ id: Tab; label: string; icon: typeof Terminal }> = [
  { id: "install", label: "Install", icon: Terminal },
  { id: "props", label: "Props API", icon: Boxes },
  { id: "usage", label: "Usage", icon: Wand2 },
  { id: "why", label: "components/ui", icon: FolderTree },
];

interface PropRow {
  name: string;
  type: string;
  def: string;
  note: string;
}

const PROP_ROWS: PropRow[] = [
  { name: "colors", type: "string[]", def: '["#3b2a8d","#aaa7d7","#f75092"]', note: "First 3 hex stops → uColorA/B/C" },
  { name: "distortion", type: "number", def: "5", note: "Fractal loop iterations (baked into shader)" },
  { name: "swirl", type: "number", def: "0.5", note: "Radial swirl strength" },
  { name: "speed", type: "number", def: "1.0", note: "Animation playback rate" },
  { name: "scale", type: "number", def: "1", note: "UV zoom" },
  { name: "offsetX", type: "number", def: "0", note: "Horizontal UV pan" },
  { name: "offsetY", type: "number", def: "0", note: "Vertical UV pan" },
  { name: "rotation", type: "number", def: "90", note: "UV rotation (radians)" },
  { name: "waveAmp", type: "number", def: "0.1", note: "Water displacement amplitude" },
  { name: "waveFreq", type: "number", def: "10.0", note: "Water wave frequency" },
  { name: "waveSpeed", type: "number", def: "0.2", note: "Water wave speed" },
  { name: "grain", type: "number", def: "0.06", note: "Color-dodge film grain" },
];

const INSTALL_DEPS = `# 1 ▸ the one external runtime dependency
npm install ogl

# lucide-react is only used by this lab's chrome,
# not by the shader component itself.`;

const INSTALL_SHADCN = `# 2 ▸ scaffold a TS + Tailwind app, then init shadcn
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss @tailwindcss/vite
npx shadcn@latest init   # writes components.json + the @/ alias`;

const USAGE_BASIC = `import { GradientMesh } from "@/components/ui/gradient-mesh";

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      {/* absolutely-positioned, fills its relative parent */}
      <GradientMesh />
      <h1 className="absolute inset-0 grid place-items-center
                     text-7xl font-bold mix-blend-overlay">
        Gradient Mesh
      </h1>
    </div>
  );
}`;

const USAGE_PROPS = `<GradientMesh
  colors={["#1a0b3d", "#7b2ff7", "#f0c1ff"]}
  speed={1.4}
  swirl={0.9}
  waveAmp={0.18}
  grain={0.05}
/>`;

const WHY_PATH = `my-app/
├─ components.json          # "ui": "@/components/ui"
├─ src/
│  ├─ components/
│  │  └─ ui/
│  │     └─ gradient-mesh.tsx   ◀ drop it here
│  └─ lib/utils.ts
└─ vite.config.ts           # "@" → ./src`;

export function DocsDock() {
  const [tab, setTab] = useState<Tab>("install");

  return (
    <section className="glass-strong flex flex-col overflow-hidden rounded-[var(--radius-plate)] border border-line">
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Integration documentation"
        className="flex shrink-0 gap-1 border-b border-line p-1.5"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-medium tracking-wide transition ${
                active
                  ? "bg-paper/10 text-paper"
                  : "text-haze hover:bg-paper/5 hover:text-paper/80"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="scroll-thin max-h-[300px] overflow-y-auto p-4">
        {tab === "install" && (
          <div className="space-y-3">
            <p className="text-[12.5px] leading-relaxed text-haze">
              The shader needs exactly one runtime package —{" "}
              <span className="font-mono text-rose">ogl</span> (a tiny WebGL
              wrapper). Everything else is React + Tailwind you already have.
            </p>
            <CodeBlock label="dependency" code={INSTALL_DEPS} />
            <CodeBlock label="fresh project (TS + Tailwind + shadcn)" code={INSTALL_SHADCN} />
          </div>
        )}

        {tab === "props" && (
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-paper/5">
                  {["Prop", "Type", "Default", "Effect"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-haze-dim"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROP_ROWS.map((r) => (
                  <tr key={r.name} className="border-t border-line/70">
                    <td className="px-3 py-1.5 font-mono text-[11.5px] text-rose">
                      {r.name}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-[11px] text-lilac">
                      {r.type}
                    </td>
                    <td className="tnum px-3 py-1.5 font-mono text-[10.5px] text-paper/70">
                      {r.def}
                    </td>
                    <td className="px-3 py-1.5 text-[11px] text-haze">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "usage" && (
          <div className="space-y-3">
            <p className="text-[12.5px] leading-relaxed text-haze">
              <span className="text-paper">GradientMesh</span> is{" "}
              <span className="font-mono text-rose">position:absolute</span> and
              fills its nearest positioned ancestor — wrap it in a{" "}
              <span className="font-mono text-rose">relative</span> box and layer
              content above with <span className="font-mono text-rose">z-10</span>.
            </p>
            <CodeBlock label="drop-in hero (verbatim demo)" code={USAGE_BASIC} />
            <CodeBlock label="driving the props" code={USAGE_PROPS} />
          </div>
        )}

        {tab === "why" && (
          <div className="space-y-3">
            <p className="text-[12.5px] leading-relaxed text-haze">
              shadcn doesn't ship a package — it copies source into{" "}
              <span className="font-mono text-rose">components/ui</span>, the path
              its <span className="font-mono text-paper">components.json</span>{" "}
              alias points at. Keeping the file there means the{" "}
              <span className="font-mono text-rose">@/components/ui/gradient-mesh</span>{" "}
              import in the prompt's <span className="font-mono text-paper">demo.tsx</span>{" "}
              resolves with zero edits, the CLI can update it in place, and the
              shader sits beside the rest of your owned primitives.
            </p>
            <CodeBlock label="where it lives" code={WHY_PATH} />
          </div>
        )}
      </div>
    </section>
  );
}
