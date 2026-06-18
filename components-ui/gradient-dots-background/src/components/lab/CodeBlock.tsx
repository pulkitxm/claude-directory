import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
	code: string;
	lang?: string;
	className?: string;
};

/**
 * A monospace code panel with a copy-to-clipboard affordance. Lightweight,
 * dependency-free token highlighting keyed to the small TS/TSX/shell surface
 * this page shows.
 */
export function CodeBlock({ code, lang = "tsx", className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			/* clipboard may be unavailable in the headless capture; ignore */
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	};

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border border-line bg-ink-950/80",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-line/80 bg-ink-900/60 px-4 py-2">
				<div className="flex items-center gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
					<span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
					<span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
					<span className="ml-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fog-400">
						{lang}
					</span>
				</div>
				<button
					type="button"
					onClick={copy}
					className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-fog-300 transition-colors hover:border-accent/50 hover:text-accent"
				>
					{copied ? (
						<>
							<Check className="h-3 w-3" /> copied
						</>
					) : (
						<>
							<Copy className="h-3 w-3" /> copy
						</>
					)}
				</button>
			</div>
			<pre className="overflow-x-auto px-4 py-4 text-[0.8rem] leading-relaxed">
				<code
					className="font-mono text-fog-200"
					dangerouslySetInnerHTML={{ __html: highlight(code) }}
				/>
			</pre>
		</div>
	);
}

/* Minimal, safe token highlighter (escapes first, then wraps tokens). */
function highlight(src: string): string {
	const esc = src
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

	return esc
		.replace(
			/(&#39;|&#x27;|'|"|`)(?:\\.|(?!\1)[^\\])*\1/g,
			(m) => `<span class="tok-str">${m}</span>`,
		)
		.replace(/(\/\/[^\n]*)/g, '<span class="tok-com">$1</span>')
		.replace(
			/\b(import|from|export|default|function|return|const|let|type|interface|extends)\b/g,
			'<span class="tok-kw">$1</span>',
		)
		.replace(
			/\b(GradientDots|DefaultDemo|motion|React|npm|npx|pnpm|yarn|bun)\b/g,
			'<span class="tok-fn">$1</span>',
		)
		.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
}
