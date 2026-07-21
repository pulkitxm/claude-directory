import { Check, Copy, FileCode2, Terminal } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";

const SETUP = `# 1 · a React + TypeScript app with Tailwind + shadcn
npx shadcn@latest init

# 2 · the only runtime dep the showcase chrome uses
npm i lucide-react

# 3 · drop the files below into your components/ui folder`;

const USAGE = `import { DitheringShader } from "@/components/ui/dithering-shader";

export default function DemoOne() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <DitheringShader
        shape="sphere"
        type="random"
        colorBack="#000000"
        colorFront="#f43f5e"
        pxSize={2}
        speed={1.5}
      />
      <span className="absolute z-10 text-7xl font-semibold tracking-tighter text-white">
        Sphere
      </span>
    </div>
  );
}`;

const FILES = [
	{
		path: "components/ui/dithering-shader.tsx",
		role: "The shader component (the dependency), ported to TypeScript.",
	},
	{
		path: "components/ui/dithering-shader.demo.tsx",
		role: "The brief's demo usage — the default export DemoOne.",
	},
	{
		path: "components/ui/sphere.tsx",
		role: "The brief's starter Component example, kept verbatim.",
	},
	{
		path: "lib/utils.ts",
		role: "The shadcn cn() helper (clsx + tailwind-merge).",
	},
];

function CopyBlock({
	code,
	lang,
	icon: Icon,
}: {
	code: string;
	lang: string;
	icon: typeof Terminal;
}) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {
			/* clipboard blocked — no-op */
		}
	};

	return (
		<div className="panel min-w-0 max-w-full overflow-hidden rounded-xl">
			<div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
				<span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-dim">
					<Icon className="h-3.5 w-3.5" />
					{lang}
				</span>
				<button
					type="button"
					onClick={copy}
					className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-faint transition-colors hover:text-rose"
				>
					{copied ? (
						<Check className="h-3.5 w-3.5 text-lime" />
					) : (
						<Copy className="h-3.5 w-3.5" />
					)}
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
			<pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-paper">
				<code>{code}</code>
			</pre>
		</div>
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
					<span className="font-mono text-xs uppercase tracking-[0.2em] text-rose">
						05 / install
					</span>
					<h2 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3.1rem)] font-bold leading-[0.98] tracking-[-0.02em] text-paper">
						Copy four files. Mount one tag.
					</h2>
					<p className="mt-4 font-body text-paper-dim">
						The component lives at the shadcn default path,{" "}
						<code className="font-mono text-paper">@/components/ui</code>.
						Keeping it there matters: the alias is what makes{" "}
						<code className="font-mono text-paper">
							import … from "@/components/ui/dithering-shader"
						</code>{" "}
						resolve, and it sits alongside the rest of your shadcn registry so
						updates and imports stay predictable.
					</p>
				</Reveal>

				<div className="grid gap-5 lg:grid-cols-2">
					<Reveal>
						<CopyBlock code={SETUP} lang="setup · bash" icon={Terminal} />
					</Reveal>
					<Reveal delay={80}>
						<CopyBlock code={USAGE} lang="usage · tsx" icon={FileCode2} />
					</Reveal>
				</div>

				<Reveal delay={120} className="mt-5">
					<div className="panel overflow-hidden rounded-xl">
						<div className="border-b border-[var(--line)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-dim">
							What lands in your project
						</div>
						<ul className="divide-y divide-[var(--line)]">
							{FILES.map((f) => (
								<li
									key={f.path}
									className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between"
								>
									<span className="font-mono text-xs font-bold text-paper">
										{f.path}
									</span>
									<span className="font-body text-[12px] text-paper-dim">
										{f.role}
									</span>
								</li>
							))}
						</ul>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
