import { FileCode2 } from "lucide-react";
import DemoOne from "@/demo";

/**
 * Renders the brief's verbatim demo.tsx (`DemoOne`, which mounts
 * <VolumetricBeamsFullScreen> with the brief's exact props) inside a framed
 * viewport. demo.tsx's root is `fixed inset-0`; the `.verbatim-frame` wrapper
 * (see index.css) demotes that descendant to `absolute` so the live, unmodified
 * component sits inside this card rather than covering the page — proof the
 * shipped default export works as-is.
 */
export function VerbatimDemo() {
  return (
    <div className="rounded-xl border border-hairline bg-ink-800/70 p-6 backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileCode2 className="h-4 w-4 text-beam-400" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
            Verbatim default export
          </h3>
        </div>
        <code className="font-mono text-[11px] text-dust">
          &lt;VolumetricBeamsFullScreen /&gt; · demo.tsx
        </code>
      </div>

      <p className="mb-5 max-w-2xl text-[12.5px] leading-relaxed text-dust">
        The card below mounts the brief's{" "}
        <code className="rounded bg-ink-900 px-1 py-0.5 font-mono text-[11px] text-beam-100">
          demo.tsx
        </code>{" "}
        unchanged — including the component's own gradient heading overlay. Same
        component, same props, just framed so it shares the page.
      </p>

      <div className="verbatim-frame relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-hairline ring-1 ring-white/5 sm:aspect-[2/1]">
        <DemoOne />
        {/* Corner ticks */}
        <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-beam-400/40" />
        <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-beam-400/40" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-beam-400/40" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-beam-400/40" />
      </div>
    </div>
  );
}
