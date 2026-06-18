import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** A monospace code surface with a one-click copy button. */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard may be blocked in some headless contexts — non-fatal */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-ink/70">
      {label && (
        <div className="flex items-center justify-between border-b border-line px-3.5 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-haze-dim">
            {label}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-line text-haze transition hover:border-line-strong hover:text-paper"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-rose" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="scroll-thin overflow-x-auto px-3.5 py-3 text-[12px] leading-relaxed">
        <code className="font-mono text-paper/90">{code}</code>
      </pre>
    </div>
  );
}
