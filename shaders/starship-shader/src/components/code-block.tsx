import { useState } from "react";
import { Check, Copy } from "lucide-react";

/* A small monospace code surface. Content is passed as a plain string so we
   never fight JSX escaping for braces / angle brackets / quotes, and the copy
   button puts the exact source on the clipboard. */
export function CodeBlock({
  label,
  code,
  lang = "tsx",
}: {
  label: string;
  code: string;
  lang?: "tsx" | "bash" | "txt";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked (e.g. insecure context) — no-op */
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-void-900">
      <div className="flex items-center justify-between border-b border-hairline bg-void-700/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-caution-400/70" />
          <span className="h-2 w-2 rounded-full bg-phosphor-400/50" />
          <span className="eyebrow ml-1 normal-case tracking-wide2 text-slate">
            {label}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="group flex items-center gap-1.5 rounded border border-hairline px-2 py-1 text-faint transition-colors hover:border-phosphor-400/50 hover:text-phosphor-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-phosphor-400"
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <Check className="h-3 w-3 text-phosphor-300" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="font-mono text-[0.6rem] uppercase tracking-wide2">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed">
        <code
          className={
            lang === "bash"
              ? "font-mono text-phosphor-200"
              : "font-mono text-plasma"
          }
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
