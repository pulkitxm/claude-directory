import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A small, dependency-free code block with a copy button. We avoid a syntax
 * highlighter on purpose — keeping the lab self-contained and offline — and
 * instead lean on a monospace surface and the instrument palette.
 */
export function Code({
  code,
  label,
  className,
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — silently ignore */
    }
  };

  return (
    <div className={cn("code-surface group relative overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-[rgba(228,200,255,0.1)] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          {label ? (
            <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-foreground">
              {label}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md border border-[rgba(228,200,255,0.14)] bg-[rgba(20,15,30,0.6)] px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-amber" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-[#e9e1f2]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
