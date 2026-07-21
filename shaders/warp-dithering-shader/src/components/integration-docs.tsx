import { Check, Copy, FolderTree, Terminal } from "lucide-react";
import { useState } from "react";

const SETUP = `# 1 · scaffold a TypeScript app (skip if you already have one)
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2 · add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3 · initialise shadcn/ui (writes components.json + the @/ alias)
npx shadcn@latest init`;

const INSTALL = `# DitheringShader itself is dependency-free (React only).
# These cover the shadcn cn() helper + icons used around it.
npm install clsx tailwind-merge lucide-react`;

const USAGE = `import { DitheringShader } from "@/components/ui/dithering-shader";

export default function DemoOne() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <DitheringShader
        shape="warp"
        type="4x4"
        colorBack="#000033"
        colorFront="#ff6600"
        pxSize={4}
        speed={0.8}
      />
      <span className="pointer-events-none z-10 text-center text-7xl leading-none absolute font-semibold tracking-tighter text-white whitespace-pre-wrap">
        Warp
      </span>
    </div>
  );
}`;

function CodeBlock({
	title,
	code,
	language,
}: {
	title: string;
	code: string;
	language: string;
}) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1400);
		} catch {
			// Clipboard is unavailable (e.g. headless / insecure context) — ignore.
		}
	};

	return (
		<div className="min-w-0 max-w-full overflow-hidden border border-border/70 bg-ink">
			<div className="flex items-center justify-between border-b border-border/70 bg-panel/70 px-3 py-2">
				<span className="font-mono text-[11px] text-ash">{title}</span>
				<div className="flex items-center gap-2">
					<span className="font-mono text-[9px] uppercase tracking-widest2 text-ash/70">
						{language}
					</span>
					<button
						type="button"
						onClick={copy}
						aria-label={`Copy ${title}`}
						className="flex items-center gap-1 border border-border/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ash transition-colors hover:border-amber/60 hover:text-amber"
					>
						{copied ? (
							<>
								<Check className="h-3 w-3" /> ok
							</>
						) : (
							<>
								<Copy className="h-3 w-3" /> copy
							</>
						)}
					</button>
				</div>
			</div>
			<pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-bone/90">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function Step({
	n,
	title,
	children,
}: {
	n: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="min-w-0 flex flex-col gap-3">
			<div className="flex items-center gap-2.5">
				<span className="flex h-6 w-6 items-center justify-center border border-amber/60 font-mono text-[11px] text-amber">
					{n}
				</span>
				<h3 className="font-display text-base font-semibold text-bone">
					{title}
				</h3>
			</div>
			{children}
		</div>
	);
}

const TREE = `src/
├─ components/
│  └─ ui/
│     └─ dithering-shader.tsx   ← drop the component here
├─ lib/
│  └─ utils.ts                  ← cn() helper
└─ index.css                    ← Tailwind entry (the "styles" path)`;

export function IntegrationDocs() {
	return (
		<div className="flex flex-col gap-10">
			<div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="min-w-0 flex flex-col gap-3 border border-border/70 bg-panel/40 p-5">
					<div className="flex items-center gap-2 text-amber">
						<FolderTree className="h-4 w-4" />
						<span className="font-mono text-[11px] uppercase tracking-widest2">
							Default paths
						</span>
					</div>
					<p className="text-[13px] leading-relaxed text-ash">
						This project carries a{" "}
						<span className="text-bone">components.json</span> with the
						canonical shadcn aliases — components resolve to{" "}
						<span className="font-mono text-amber">@/components/ui</span> and
						the style sheet to{" "}
						<span className="font-mono text-amber">src/index.css</span>. Because
						the component imports itself as{" "}
						<span className="font-mono text-amber">
							@/components/ui/dithering-shader
						</span>
						, it must live in <span className="font-mono">components/ui</span>:
						it is the folder the shadcn CLI writes primitives into and the path
						the
						<span className="font-mono"> @/</span> alias points at, so dropping
						it anywhere else breaks the import and splits your UI primitives
						from the convention every other shadcn component follows.
					</p>
					<pre className="mt-1 overflow-x-auto border border-border/60 bg-ink p-3 text-[11px] leading-relaxed text-ash">
						<code>{TREE}</code>
					</pre>
				</div>

				<div className="min-w-0 flex flex-col gap-3 border border-border/70 bg-panel/40 p-5">
					<div className="flex items-center gap-2 text-amber">
						<Terminal className="h-4 w-4" />
						<span className="font-mono text-[11px] uppercase tracking-widest2">
							Not on shadcn yet?
						</span>
					</div>
					<p className="text-[13px] leading-relaxed text-ash">
						The component needs a TypeScript + Tailwind project with the{" "}
						<span className="font-mono">@/</span> path alias. If you are
						starting cold, these three steps stand the whole stack up; if you
						already have Tailwind + TS, only{" "}
						<span className="font-mono text-amber">shadcn init</span> is
						required to register the alias and{" "}
						<span className="font-mono">components.json</span>.
					</p>
					<CodeBlock title="setup" language="bash" code={SETUP} />
				</div>
			</div>

			<div className="grid gap-8 lg:grid-cols-2">
				<Step n="1" title="Install dependencies">
					<CodeBlock title="terminal" language="bash" code={INSTALL} />
				</Step>
				<Step n="2" title="Use it">
					<CodeBlock
						title="components/ui/dithering-shader.demo.tsx"
						language="tsx"
						code={USAGE}
					/>
				</Step>
			</div>
		</div>
	);
}
