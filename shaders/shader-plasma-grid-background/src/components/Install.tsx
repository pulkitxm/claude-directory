import { Check, Copy, FolderTree } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";

const USAGE = `// app/page.tsx — the component owns the whole backdrop
import ShaderBackground from "@/components/ui/shader-background";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <ShaderBackground />        {/* fixed, full-screen, -z-10 */}
      <section className="relative z-10 p-12">
        {/* your content floats on top */}
      </section>
    </main>
  );
}`;

const STEPS = [
	{
		n: "01",
		title: "Land it in the right folder",
		body: "Copy shader-background.tsx into components/ui/ — the shadcn convention where every primitive lives, so the @/components/ui/* alias resolves and the CLI never overwrites it.",
	},
	{
		n: "02",
		title: "No dependencies to install",
		body: "It speaks raw WebGL through the canvas API. No three.js, no react-three-fiber, no context provider — React 18 and a browser are the whole requirement.",
	},
	{
		n: "03",
		title: "Mount once, near the root",
		body: "Best placed at the top of a hero or full-page layout. It paints a fixed -z-10 canvas, so give the parent position: relative and lift your content with z-10.",
	},
	{
		n: "04",
		title: "It's already responsive",
		body: "A resize listener resizes the drawing buffer to the viewport every time the window changes, and the shader reads iResolution each frame — so it stays crisp from phone to ultrawide.",
	},
];

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	};
	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex items-center gap-1.5 rounded-md border border-[var(--line-strong)] bg-black/40 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-dim transition-colors hover:text-ink"
		>
			{copied ? (
				<>
					<Check className="h-3.5 w-3.5 text-phosphor" /> copied
				</>
			) : (
				<>
					<Copy className="h-3.5 w-3.5" /> copy
				</>
			)}
		</button>
	);
}

export function Install() {
	return (
		<section
			id="install"
			className="relative border-t border-[var(--line)] px-5 py-24 sm:px-8"
		>
			<div className="mx-auto max-w-6xl">
				<Reveal className="mb-12 max-w-2xl">
					<span className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor">
						03 / install
					</span>
					<h2 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3.1rem)] font-bold leading-[0.98] tracking-[-0.02em] text-ink">
						Copy one file. Mount one tag.
					</h2>
					<p className="mt-4 font-body text-ink-dim">
						This page is a shadcn-structured Vite + TypeScript + Tailwind app —
						the stack the brief asked for. Here's exactly how the component
						slots in.
					</p>
				</Reveal>

				<div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
					{/* usage code */}
					<Reveal className="brackets">
						<div className="panel min-w-0 max-w-full overflow-hidden rounded-xl">
							<div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
								<div className="flex items-center gap-2">
									<FolderTree className="h-3.5 w-3.5 text-violet" />
									<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
										app/page.tsx
									</span>
								</div>
								<CopyButton text={USAGE} />
							</div>
							<pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfcbff]">
								<code>{USAGE}</code>
							</pre>
						</div>

						<div className="panel mt-5 min-w-0 max-w-full rounded-xl p-5">
							<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
								file tree
							</span>
							<pre className="mt-3 font-mono text-[12.5px] leading-relaxed text-ink-dim">
								<code>
									{`src/
└─ components/
   └─ ui/
      └─ `}
									<span className="text-phosphor">shader-background.tsx</span>
									{`   ← paste here`}
								</code>
							</pre>
						</div>
					</Reveal>

					{/* steps */}
					<Reveal delay={80}>
						<ol className="flex flex-col gap-3">
							{STEPS.map((step) => (
								<li
									key={step.n}
									className="flex gap-4 rounded-xl border border-[var(--line-strong)] bg-[var(--panel)] p-5 backdrop-blur"
								>
									<span className="font-mono text-sm font-bold text-violet">
										{step.n}
									</span>
									<div>
										<h3 className="font-display text-base font-semibold text-ink">
											{step.title}
										</h3>
										<p className="mt-1.5 font-body text-sm leading-relaxed text-ink-dim">
											{step.body}
										</p>
									</div>
								</li>
							))}
						</ol>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
