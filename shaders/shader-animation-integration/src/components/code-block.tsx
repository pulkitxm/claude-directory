import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import sourceNotice from "../../THIRD_PARTY_NOTICES.txt?raw";
interface CodeBlockProps {
	code: string;
	label?: string;
	lang?: string;
	className?: string;
}
export function CodeBlock({ code, label, lang, className }: CodeBlockProps) {
	const displayedCode = /fragmentShader|uniform vec2/.test(code)
		? `/*!\n${sourceNotice}*/\n${code}`
		: code;
	const [copied, setCopied] = useState(false);
	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(displayedCode);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	};
	return (
		<div
			className={cn(
				"group relative min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-[#0a0e1a]/90 shadow-2xl shadow-black/40 backdrop-blur",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-border/80 bg-white/[0.02] px-4 py-2.5">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1.5">
						<span className="size-3 rounded-full bg-[#ff5f57]" />
						<span className="size-3 rounded-full bg-[#febc2e]" />
						<span className="size-3 rounded-full bg-[#28c840]" />
					</div>
					{label && (
						<span className="font-mono text-xs text-muted-foreground">
							{label}
						</span>
					)}
				</div>
				<div className="flex items-center gap-2">
					{lang && (
						<span className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{lang}
						</span>
					)}
					<button
						type="button"
						onClick={onCopy}
						aria-label="Copy code"
						className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
					>
						{copied ? (
							<>
								<Check className="size-3.5 text-[#28c840]" /> Copied
							</>
						) : (
							<>
								<Copy className="size-3.5" /> Copy
							</>
						)}
					</button>
				</div>
			</div>

			<pre className="max-h-[28rem] overflow-auto px-4 py-4 text-[13px] leading-relaxed">
				<code className="font-mono text-slate-300">{displayedCode}</code>
			</pre>
		</div>
	);
}
