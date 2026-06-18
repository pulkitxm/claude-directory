import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  label?: string;
  className?: string;
};

/** Minimal copy-to-clipboard code surface used in the integration sheet. */
export function CodeBlock({ code, label, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-md border border-hairline bg-[#070b11] overflow-hidden",
        className
      )}
    >
      {label && (
        <div className="flex items-center justify-between border-b border-hairline/70 px-3 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
            {label}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded border border-hairline bg-panel/80 text-muted transition-colors hover:border-phosphor/60 hover:text-phosphor"
        style={{ top: label ? "2.4rem" : "0.5rem" }}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-phosphor" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="overflow-x-auto px-3 py-3 font-mono text-[11.5px] leading-relaxed text-ink/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
