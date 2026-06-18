import { useState } from "react";
import { Terminal, FolderTree, Check, Copy } from "lucide-react";

function CopyRow({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-ink-900/70 px-3.5 py-2.5">
      <code className="overflow-x-auto whitespace-nowrap font-mono text-[12px] text-beam-100">
        <span className="select-none text-dust">$ </span>
        {cmd}
      </code>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(cmd).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className="shrink-0 text-dust transition-colors hover:text-beam-200"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-beam-300" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

const TREE = `src/
├─ components/
│  └─ ui/
│     └─ volumetric-beams.tsx   ← drop-in component
├─ lib/
│  └─ utils.ts                  ← cn() helper
└─ index.css                    ← Tailwind layers`;

export function InstallStory() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Steps */}
      <div className="rounded-xl border border-hairline bg-ink-800/70 p-6 backdrop-blur-sm">
        <div className="mb-5 flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-beam-400" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
            Integration
          </h3>
        </div>

        <ol className="space-y-5">
          <li>
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-beam-500/50 font-mono text-[10px] text-beam-200">
                1
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wide2 text-beam-200/90">
                Scaffold a shadcn project
              </span>
            </div>
            <p className="mb-2 pl-7 text-[12.5px] leading-relaxed text-dust">
              The component lands in shadcn's{" "}
              <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
                @/components/ui
              </code>{" "}
              alias. If your repo isn't set up yet:
            </p>
            <div className="space-y-2 pl-7">
              <CopyRow cmd="npm create vite@latest my-app -- --template react-ts" />
              <CopyRow cmd="npx shadcn@latest init" />
            </div>
          </li>

          <li>
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-beam-500/50 font-mono text-[10px] text-beam-200">
                2
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wide2 text-beam-200/90">
                Install the render stack
              </span>
            </div>
            <div className="space-y-2 pl-7">
              <CopyRow cmd="npm install three @react-three/fiber" />
              <CopyRow cmd="npm install -D @types/three" />
            </div>
          </li>

          <li>
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-beam-500/50 font-mono text-[10px] text-beam-200">
                3
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wide2 text-beam-200/90">
                Drop in &amp; mount
              </span>
            </div>
            <p className="pl-7 text-[12.5px] leading-relaxed text-dust">
              Copy{" "}
              <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
                volumetric-beams.tsx
              </code>{" "}
              into{" "}
              <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
                components/ui
              </code>
              , then render{" "}
              <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
                &lt;VolumetricBeamsFullScreen /&gt;
              </code>{" "}
              as a fixed background layer.
            </p>
          </li>
        </ol>
      </div>

      {/* Why /components/ui + tree */}
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-hairline bg-ink-800/70 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <FolderTree className="h-4 w-4 text-beam-400" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
              Why <span className="text-beam-300">/components/ui</span>
            </h3>
          </div>
          <p className="text-[12.5px] leading-relaxed text-dust">
            shadcn's{" "}
            <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
              components.json
            </code>{" "}
            maps the{" "}
            <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
              ui
            </code>{" "}
            alias to{" "}
            <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
              @/components/ui
            </code>
            . The brief's{" "}
            <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
              import … from "@/components/ui/volumetric-beams"
            </code>{" "}
            only resolves when the file lives there — so the folder isn't
            cosmetic, it's the contract that lets the CLI add, the alias resolve,
            and future components co-locate cleanly.
          </p>
        </div>

        <div className="rounded-xl border border-hairline bg-ink-800/70 p-6 backdrop-blur-sm">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-wide2 text-dust">
            Resolved layout
          </div>
          <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-beam-100/90">
            {TREE}
          </pre>
        </div>
      </div>
    </div>
  );
}
