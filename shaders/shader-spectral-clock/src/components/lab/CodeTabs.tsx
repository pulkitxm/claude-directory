import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Tab = { id: string; label: string; lang: string; code: string };

/** A small tabbed code viewer with per-tab copy-to-clipboard. */
export function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const [copied, setCopied] = useState<string | null>(null);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  const copy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard may be unavailable in headless / insecure contexts */
    }
    setCopied(id);
    window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1400);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-edge bg-[#070912]">
      <div className="flex items-center justify-between border-b border-edge bg-ink-2/80 px-3">
        <div className="flex flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative px-3.5 py-2.5 font-mono text-[0.72rem] transition ${
                t.id === current.id ? "text-paper" : "text-muted hover:text-paper/80"
              }`}
            >
              {t.label}
              {t.id === current.id && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-spec-violet via-spec-cyan to-spec-rose" />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => copy(current.code, current.id)}
          className="inline-flex items-center gap-1.5 rounded-md border border-edge px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted transition hover:border-spec-cyan/60 hover:text-paper"
        >
          {copied === current.id ? (
            <>
              <Check className="size-3 text-spec-green" /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="max-h-[26rem] overflow-auto p-4 text-[0.74rem] leading-relaxed">
        <code className={`language-${current.lang} font-mono text-paper/85`}>{current.code}</code>
      </pre>
    </div>
  );
}
