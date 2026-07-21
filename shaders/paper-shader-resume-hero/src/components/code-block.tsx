import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	code: string;
	label?: string;
	lang?: string;
	className?: string;
}

/**
 * A minimal, dependency-light code panel with a copy-to-clipboard control.
 * No syntax-highlighting engine — just monospaced, scrollable source with a
 * darkroom frame, so the page stays light and fully offline.
 */
export function CodeBlock({
	code,
	label,
	lang = "tsx",
	className,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			// Clipboard can be unavailable (insecure context / headless). Fall back
			// to a transient textarea selection so the affordance still "works".
			const ta = document.createElement("textarea");
			ta.value = code;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand("copy");
			} catch {
				/* no-op */
			}
			document.body.removeChild(ta);
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	};

	return (
		<div
			className={cn(
				"group relative min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-panel-2/40",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
				<div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-magenta" />
					{label ?? lang}
				</div>
				<button
					type="button"
					onClick={copy}
					className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-dim transition-colors hover:border-magenta/60 hover:text-ink"
					aria-label="Copy code"
				>
					{copied ? (
						<Check className="size-3.5 text-magenta" />
					) : (
						<Copy className="size-3.5" />
					)}
					{copied ? "copied" : "copy"}
				</button>
			</div>
			<pre className="max-h-[26rem] overflow-auto p-4 text-[12.5px] leading-relaxed">
				<code className="font-mono text-ink/90">{code}</code>
			</pre>
		</div>
	);
}
