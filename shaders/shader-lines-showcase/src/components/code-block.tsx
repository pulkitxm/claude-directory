import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  /** Label shown in the window title bar (usually the file name). */
  filename: string;
  lang?: string;
  className?: string;
}

/**
 * A minimal code surface in the spirit of a shadcn docs page: a titled window,
 * a working copy button, and gutter line numbers. Deliberately not a full
 * syntax highlighter — that would drag in a heavy dependency for a single page.
 */
export function CodeBlock({ code, filename, lang = "tsx", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-ink-800/80 backdrop-blur",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-ink-700/60 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[12px] text-bone/55">
          <span className="inline-flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-scarlet/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
          </span>
          <span className="ml-2 tracking-tight text-bone/75">{filename}</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-bone/40">
            {lang}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : `Copy ${filename}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-bone/70 transition hover:border-cyan/40 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan/60"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <div className="max-h-[440px] overflow-auto">
        <pre className="min-w-full font-mono text-[12.5px] leading-[1.65]">
          <code className="grid">
            {lines.map((line, i) => (
              <span key={i} className="grid grid-cols-[3rem_1fr]">
                <span className="select-none border-r border-white/5 pr-3 text-right text-bone/25">
                  {i + 1}
                </span>
                <span className="whitespace-pre pl-4 pr-6 text-bone/85">
                  {line || " "}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
