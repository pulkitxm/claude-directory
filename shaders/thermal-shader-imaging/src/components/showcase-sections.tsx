import type { ReactNode } from "react";
import {
  FolderTree,
  MousePointer2,
  Package,
  Palette,
  ScanLine,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* The 7-stop thermal LUT baked into the component (THERMAL_PALETTE). */
const PALETTE: Array<{ hex: string; name: string }> = [
  { hex: "#000000", name: "Void" },
  { hex: "#073dff", name: "Deep blue" },
  { hex: "#53d5fd", name: "Cyan" },
  { hex: "#fefcdd", name: "Cream" },
  { hex: "#ffec6a", name: "Yellow" },
  { hex: "#f9d400", name: "Gold" },
  { hex: "#a61904", name: "Ember" },
];

const PROPS: Array<{ prop: string; type: string; def: string; note: string }> = [
  { prop: "logoUrl", type: "string", def: "apple.png", note: "Image whose ALPHA channel masks the heat. PNG/SVG with transparency." },
  { prop: "width", type: "number", def: "400", note: "Canvas width in px (the bay sizes the renderer from its container)." },
  { prop: "height", type: "number", def: "400", note: "Canvas height in px." },
  { prop: "className", type: "string", def: '""', note: "Extra classes on the flex wrapper." },
];

function SectionHeading({ kicker, title, icon }: { kicker: string; title: string; icon: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-panel2 text-cyan">
        {icon}
      </span>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan/70">{kicker}</div>
        <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">{title}</h2>
      </div>
    </div>
  );
}

function CodeBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-line bg-[#080b12] p-4 font-mono text-[12.5px] leading-relaxed text-mist",
        className,
      )}
    >
      {children}
    </pre>
  );
}

function Shell({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-5xl px-6 py-16 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function IntegrationSection() {
  return (
    <Shell id="integrate">
      <SectionHeading kicker="Drop-in" title="Wire it into a shadcn project" icon={<Package className="h-4 w-4" />} />
      <p className="mb-8 max-w-2xl text-mist">
        The bay is built on the shadcn project structure with{" "}
        <span className="text-cream">Tailwind CSS</span> and <span className="text-cream">TypeScript</span>. The
        effect is a single self-contained file — no providers, no global state. Three steps:
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            n: "01",
            icon: <Terminal className="h-4 w-4" />,
            title: "Install the one dependency",
            body: <CodeBlock>npm install three</CodeBlock>,
          },
          {
            n: "02",
            icon: <FolderTree className="h-4 w-4" />,
            title: "Drop the component in",
            body: <CodeBlock>{`src/components/ui/
  thermal-shader.tsx`}</CodeBlock>,
          },
          {
            n: "03",
            icon: <ScanLine className="h-4 w-4" />,
            title: "Import & render",
            body: <CodeBlock>{`import { ThermalEffect }
  from "@/components/ui/thermal-shader"`}</CodeBlock>,
          },
        ].map((step) => (
          <div key={step.n} className="rounded-xl border border-line bg-panel/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded border border-line bg-panel2 text-cyan">
                {step.icon}
              </span>
              <span className="font-mono text-xs text-mist/50">{step.n}</span>
            </div>
            <h3 className="mb-3 text-sm font-medium text-cream">{step.title}</h3>
            {step.body}
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-mist/70">
        No shadcn project yet? Scaffold one, then add the primitives this expects:
      </p>
      <CodeBlock className="mt-3">{`npm create vite@latest my-app -- --template react-ts
cd my-app
npx shadcn@latest init      # sets up Tailwind, tsconfig paths & components/ui
npm install three`}</CodeBlock>
    </Shell>
  );
}

export function WhyComponentsUiSection() {
  return (
    <Shell id="why-ui" className="border-y border-line/60 bg-panel/30">
      <SectionHeading
        kicker="Convention"
        title="Why a components/ui folder"
        icon={<FolderTree className="h-4 w-4" />}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 text-mist">
          <p>
            shadcn’s default alias resolves <code className="rounded bg-panel2 px-1 text-cyan">@/components/ui</code>{" "}
            to your source tree, and <code className="rounded bg-panel2 px-1 text-cyan">ui</code> is reserved for the
            unstyled, copy-in primitives you own outright. Dropping{" "}
            <code className="rounded bg-panel2 px-1 text-cyan">thermal-shader.tsx</code> there means its own import —
            written verbatim in the brief —
          </p>
          <CodeBlock>{`import { ThermalEffect }
  from "@/components/ui/thermal-shader"`}</CodeBlock>
          <p>
            resolves with zero edits, and the CLI can update sibling primitives without ever clobbering your custom
            piece.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-mist">
          {[
            "The @/ alias + components/ui pair is what every shadcn import assumes — keep it and the brief's code runs unmodified.",
            "It separates owned, editable primitives from app-specific composition (sections, pages, layouts).",
            "Tooling (the shadcn CLI, codemods, design-system scripts) targets this exact path by convention.",
            "Co-locating UI primitives keeps shaders, buttons and inputs discoverable in one predictable place.",
          ].map((line) => (
            <li key={line} className="flex gap-3 rounded-lg border border-line bg-panel/50 p-3">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

export function PaletteSection() {
  return (
    <Shell id="palette">
      <SectionHeading kicker="Calibration" title="The thermal LUT" icon={<Palette className="h-4 w-4" />} />
      <p className="mb-6 max-w-2xl text-mist">
        Seven stops drive the gradient inside the mask — a cold void rising through blue and cyan to a cream
        mid-band, then yellow, gold and a hot ember peak. The pointer adds heat; the shader keeps a slow procedural
        wave breathing bottom-to-top even at rest.
      </p>
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="thermal-ramp h-12 w-full" />
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-7">
          {PALETTE.map((stop) => (
            <div key={stop.hex} className="bg-panel px-3 py-2.5">
              <div className="mb-1 h-4 w-full rounded-sm" style={{ background: stop.hex }} />
              <div className="font-mono text-[11px] text-cream">{stop.hex}</div>
              <div className="text-[11px] text-mist/60">{stop.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function PropsSection() {
  return (
    <Shell id="api" className="border-y border-line/60 bg-panel/30">
      <SectionHeading
        kicker="Reference"
        title="Props"
        icon={<SlidersHorizontal className="h-4 w-4" />}
      />
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-panel2 font-mono text-[11px] uppercase tracking-wider text-mist/70">
              <th className="px-4 py-3">Prop</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Default</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {PROPS.map((row) => (
              <tr key={row.prop} className="bg-panel/50">
                <td className="px-4 py-3 font-mono text-cyan">{row.prop}</td>
                <td className="px-4 py-3 font-mono text-amber">{row.type}</td>
                <td className="px-4 py-3 font-mono text-mist/70">{row.def}</td>
                <td className="px-4 py-3 text-mist">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-mist/70">
        <MousePointer2 className="h-4 w-4 text-cyan" />
        Hold and drag across a viewport to pump heat into the mask — release and it cools back to the resting wave.
      </p>
    </Shell>
  );
}

export function HowToUseSection() {
  return (
    <Shell id="usage">
      <SectionHeading kicker="Recipe" title="How to use the bay" icon={<Terminal className="h-4 w-4" />} />
      <p className="mb-6 max-w-2xl text-mist">
        Point <code className="rounded bg-panel2 px-1 text-cyan">logoUrl</code> at any image with an alpha channel.
        This is the brief’s exact two-up usage, with a custom mask per panel:
      </p>
      <CodeBlock>{`import { ThermalEffect } from "@/components/ui/thermal-shader";

export default function Home() {
  return (
    <main className="flex w-full items-center justify-center gap-10">
      <ThermalEffect logoUrl="/logos/apple.png" />
      <p className="text-7xl font-thin">×</p>
      <ThermalEffect logoUrl="/logos/vercel.png" />
    </main>
  );
}`}</CodeBlock>
    </Shell>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line/60 bg-panel/40 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <div className="font-mono text-xs text-mist/60">
          <span className="text-amber">▲</span> THERMA — Thermal Imaging Bay
        </div>
        <div className="font-mono text-[11px] text-mist/40">
          React · TypeScript · Vite · Tailwind · three.js · shadcn/ui
        </div>
      </div>
    </footer>
  );
}
