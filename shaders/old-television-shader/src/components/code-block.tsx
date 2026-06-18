import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  lang = "bash",
  title,
  className,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard unavailable (e.g. headless) — degrade silently */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      className={cn(
        "panel overflow-hidden rounded-md",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-cabinet-700/70 bg-cabinet-950/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal-red/70" />
          <span className="h-2 w-2 rounded-full bg-signal-amber/70" />
          <span className="h-2 w-2 rounded-full bg-phosphor-400/70" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-200/60">
            {title ?? lang}
          </span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-sm border border-cabinet-700 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-200/70 transition-colors hover:border-phosphor-400/50 hover:text-phosphor-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5">
        <code className="font-mono text-[12px] leading-relaxed text-bone-100/90">
          {code}
        </code>
      </pre>
    </div>
  );
}
