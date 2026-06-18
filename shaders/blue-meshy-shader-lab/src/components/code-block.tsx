import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A compact, dependency-free code/terminal block with a copy button.
 * Used for the shadcn / Tailwind / TypeScript setup snippets so the page can
 * double as a real integration guide.
 */
export function CodeBlock({
  code,
  label,
  language = "bash",
  className,
}: {
  code: string;
  label?: string;
  language?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard may be unavailable (e.g. insecure context) — ignore */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-hairline/80 bg-abyss-900/80",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-hairline/70 bg-abyss-850/80 px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sea-700/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-sea-600/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-sea-500/60" />
          {label && (
            <span className="ml-2 font-mono text-[11px] tracking-wide text-steel">
              {label}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md border border-hairline/70 bg-abyss-800/80 px-2 py-1 font-mono text-[10.5px] uppercase tracking-wide text-steel transition-colors hover:border-sea-500/50 hover:text-sea-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-sea-300" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5">
        <code
          className={cn(
            "font-mono text-[12.5px] leading-relaxed text-foam/90",
            language === "bash" && "text-sea-100",
          )}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
