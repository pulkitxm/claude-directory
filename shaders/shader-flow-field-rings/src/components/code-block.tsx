import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	code: string;
	/** Tiny lozenge shown top-left (e.g. a filename or "bash"). */
	filename?: string;
	className?: string;
}

/**
 * A minimal, dependency-free code surface with a copy button. Source is shown
 * as plain monospace text (no highlighter dependency) so the panel stays
 * self-contained and offline.
 */
export function CodeBlock({ code, filename, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			/* clipboard blocked (e.g. insecure context) — silently ignore */
		}
	};

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-lg border border-graphite-line bg-ink-900/90",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-graphite-line bg-ink-800/60 px-4 py-2">
				<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
					{filename ?? "source"}
				</span>
				<button
					type="button"
					onClick={copy}
					className="flex items-center gap-1.5 rounded-md border border-graphite-line bg-ink-900 px-2.5 py-1 font-mono text-[11px] text-phosphor/70 transition-colors hover:border-chan-g/60 hover:text-chan-g"
					aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
				>
					{copied ? (
						<Check className="h-3 w-3" />
					) : (
						<Copy className="h-3 w-3" />
					)}
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
			<pre className="max-h-[460px] overflow-auto px-4 py-4 text-[12.5px] leading-relaxed">
				<code className="font-mono text-phosphor/85">{code}</code>
			</pre>
		</div>
	);
}
