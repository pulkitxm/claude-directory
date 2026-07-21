import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A small copy-to-clipboard source viewer styled as a press spec sheet, used by
 * the integration + source sections to show the verbatim component code.
 */
export function CodeBlock({
	code,
	filename,
	className,
}: {
	code: string;
	filename: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			/* clipboard may be blocked; the source is still selectable below */
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1400);
	};

	return (
		<figure
			className={cn(
				"min-w-0 max-w-full overflow-hidden rounded-lg border border-border bg-paper-2",
				className,
			)}
		>
			<figcaption className="flex items-center justify-between border-b border-border bg-card px-3 py-2">
				<span className="font-mono text-[11px] tracking-[0.14em] text-ink-dim">
					{filename}
				</span>
				<button
					type="button"
					onClick={copy}
					aria-label={`Copy ${filename}`}
					className="flex items-center gap-1.5 rounded-md border border-border bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-foreground"
				>
					{copied ? (
						<Check className="h-3 w-3" />
					) : (
						<Copy className="h-3 w-3" />
					)}
					{copied ? "Copied" : "Copy"}
				</button>
			</figcaption>
			<pre className="overflow-x-auto px-4 py-3.5 text-[12.5px] leading-relaxed">
				<code className="font-mono text-foreground/90">{code}</code>
			</pre>
		</figure>
	);
}
