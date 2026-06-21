import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight code block with a copy-to-clipboard button and a faux terminal
 * header. Tokenizing is deliberately tiny (regex highlight for a handful of
 * categories) — enough to read nicely without pulling in a syntax-highlighter.
 */
const esc = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const KW =
	/^(import|from|export|const|let|return|function|interface|type|extends|class|new|default|lazy|async|await)$/;
const TYPE =
	/^(Suspense|Component|useState|useEffect|React|Card|Spotlight|SplineScene|Spline)$/;

/**
 * Single-pass tokenizer. We split the (raw) source on a master regex into
 * matched tokens + the gaps between them, then escape and wrap each piece
 * exactly once — so injected markup is never re-scanned (no double-wrapping or
 * corrupted spans).
 */
function highlight(code: string, lang: string): string {
	const master =
		lang === "bash"
			? /(#[^\n]*)|("[^"]*"|'[^']*')|(\b(?:npx|npm|pnpm|yarn|bunx|bun|cd|git)\b)|(\s--?[A-Za-z][\w-]*)/g
			: /(\/\/[^\n]*)|("[^"\n]*"|'[^'\n]*'|`[^`]*`)|([A-Za-z_$][\w$]*)/g;

	let out = "";
	let last = 0;
	for (const m of code.matchAll(master)) {
		const i = m.index ?? 0;
		out += esc(code.slice(last, i)); // plain gap
		last = i + m[0].length;
		const tok = m[0];

		if (lang === "bash") {
			if (m[1]) out += `<span class="tok-comment">${esc(tok)}</span>`;
			else if (m[2]) out += `<span class="tok-str">${esc(tok)}</span>`;
			else if (m[3]) out += `<span class="tok-fn">${esc(tok)}</span>`;
			else if (m[4]) out += `<span class="tok-attr">${esc(tok)}</span>`;
			else out += esc(tok);
			continue;
		}

		if (m[1]) out += `<span class="tok-comment">${esc(tok)}</span>`;
		else if (m[2]) out += `<span class="tok-str">${esc(tok)}</span>`;
		else if (m[3] && KW.test(tok))
			out += `<span class="tok-kw">${esc(tok)}</span>`;
		else if (m[3] && TYPE.test(tok))
			out += `<span class="tok-type">${esc(tok)}</span>`;
		else out += esc(tok);
	}
	out += esc(code.slice(last));
	return out;
}

export function CodeBlock({
	code,
	lang = "tsx",
	filename,
	className,
}: {
	code: string;
	lang?: "tsx" | "ts" | "bash";
	filename?: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			/* clipboard may be blocked; the button still flips for feedback */
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	};

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0f]",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-4 py-2.5">
				<div className="flex items-center gap-2">
					<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
					<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
					<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
					{filename && (
						<span className="ml-3 font-mono text-xs text-neutral-400">
							{filename}
						</span>
					)}
				</div>
				<button
					type="button"
					onClick={copy}
					aria-label="Copy code"
					className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-neutral-300 transition hover:border-white/25 hover:bg-white/5"
				>
					{copied ? (
						<>
							<Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
						</>
					) : (
						<>
							<Copy className="h-3.5 w-3.5" /> Copy
						</>
					)}
				</button>
			</div>
			<pre className="codescroll overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
				<code
					className="font-mono text-neutral-200"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: highlight(code, lang) }}
				/>
			</pre>
		</div>
	);
}
