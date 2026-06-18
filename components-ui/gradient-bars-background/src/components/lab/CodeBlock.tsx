import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	code: string;
	lang?: string;
	filename?: string;
	className?: string;
	/** Cap the visible height and allow internal scroll for long files. */
	scroll?: boolean;
}

/**
 * Lightweight code panel with a copy button. Highlighting is intentionally
 * minimal — a regex pass that tints keywords, strings, comments, numbers and a
 * few JSX-ish identifiers. No syntax-highlighting dependency needed.
 */
export function CodeBlock({
	code,
	lang = "tsx",
	filename,
	className,
	scroll = false,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			// clipboard may be unavailable in headless contexts; ignore.
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1400);
	};

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border border-line bg-ink-950/80",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-line/80 bg-ink-900/60 px-4 py-2">
				<div className="flex items-center gap-2">
					<span className="flex gap-1.5">
						<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
						<span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
						<span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
					</span>
					<span className="ml-2 font-mono text-xs text-fog-400">
						{filename ?? `snippet.${lang}`}
					</span>
				</div>
				<button
					type="button"
					onClick={copy}
					className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-fog-300 transition-colors hover:border-flame/50 hover:text-fog-200"
				>
					{copied ? (
						<>
							<Check className="h-3.5 w-3.5 text-flame-soft" /> copied
						</>
					) : (
						<>
							<Copy className="h-3.5 w-3.5" /> copy
						</>
					)}
				</button>
			</div>
			<pre
				className={cn(
					"overflow-auto p-4 font-mono text-[12.5px] leading-relaxed text-fog-200",
					scroll && "max-h-[420px]",
				)}
			>
				<code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
			</pre>
		</div>
	);
}

/** Escapes HTML then applies a small set of token tints via class spans. */
function highlight(src: string): string {
	let s = src
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

	// strings (single, double, backtick — kept simple, no nested templates)
	s = s.replace(
		/(&#39;|'[^']*'|"[^"]*"|`[^`]*`)/g,
		(m) => `<span class="tok-str">${m}</span>`,
	);
	// line comments
	s = s.replace(
		/(\/\/[^\n]*)/g,
		(m) => `<span class="tok-com">${m}</span>`,
	);
	// keywords
	s = s.replace(
		/\b(import|from|export|default|const|let|var|function|return|interface|type|extends|React|useState|new|infinity|Infinity|Math)\b/g,
		(m) => `<span class="tok-kw">${m}</span>`,
	);
	// numbers
	s = s.replace(
		/\b(\d+(?:\.\d+)?)\b/g,
		(m) => `<span class="tok-num">${m}</span>`,
	);
	return s;
}
