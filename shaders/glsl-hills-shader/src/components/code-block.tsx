import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A compact, copyable source/command block used throughout the integration
 * story. No syntax-highlighting dependency — just a monospace pane with a copy
 * affordance and an optional language tag.
 */
export function CodeBlock({
  code,
  lang = "tsx",
  className,
}: {
  code: string;
  lang?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked (e.g. insecure context) — silently ignore */
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-fog-line bg-fog-975/80",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-fog-line/70 bg-fog-900/60 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ridge-dim">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy to clipboard"
          className="inline-flex items-center gap-1.5 rounded-md border border-fog-line/70 bg-fog-850/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-haze/70 transition hover:border-signal/50 hover:text-haze"
        >
          {copied ? <Check className="h-3 w-3 text-signal" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[12.5px] leading-relaxed">
        <code className="font-mono text-haze/85">{code}</code>
      </pre>
    </div>
  );
}
