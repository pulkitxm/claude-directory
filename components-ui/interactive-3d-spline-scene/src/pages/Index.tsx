import {
	Boxes,
	FolderTree,
	Layers,
	MousePointerClick,
	Package,
	ShieldCheck,
	Sparkles,
	TerminalSquare,
	Wand2,
} from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { ScenePlayground } from "@/components/scene-playground";
import { SplineSceneBasic } from "@/components/ui/demo";

/* ------------------------------------------------------------------ helpers */

function SectionLabel({
	icon: Icon,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) {
	return (
		<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-300">
			<Icon className="h-3.5 w-3.5 text-violet-300" />
			{children}
		</div>
	);
}

function FileNode({
	name,
	depth = 0,
	kind = "file",
	highlight = false,
	note,
}: {
	name: string;
	depth?: number;
	kind?: "dir" | "file" | "root";
	highlight?: boolean;
	note?: string;
}) {
	return (
		<div
			className="flex items-center gap-2 py-0.5"
			style={{ paddingLeft: `${depth * 18}px` }}
		>
			{kind === "dir" || kind === "root" ? (
				<FolderTree className="h-3.5 w-3.5 shrink-0 text-sky-300/80" />
			) : (
				<span className="h-3.5 w-3.5" />
			)}
			<span
				className={
					highlight
						? "rounded bg-violet-500/15 px-1 font-mono text-[12.5px] text-violet-200"
						: kind === "dir" || kind === "root"
							? "font-mono text-[12.5px] text-neutral-200"
							: "font-mono text-[12.5px] text-neutral-400"
				}
			>
				{name}
			</span>
			{note && (
				<span className="font-mono text-[11px] text-neutral-600">— {note}</span>
			)}
		</div>
	);
}

/* --------------------------------------------------------------------- data */

const splineCode = `'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<span className="loader" />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}`;

const usageCode = `import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="flex h-full">
        <div className="flex-1 p-8 z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold ...">Interactive 3D</h1>
          <p className="mt-4 text-neutral-300 max-w-lg">Bring your UI to life...</p>
        </div>
        <div className="flex-1 relative">
          <SplineScene scene="https://prod.spline.design/.../scene.splinecode" />
        </div>
      </div>
    </Card>
  )
}`;

const setupCode = `# 1 ·  Scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts

# 2 ·  Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3 ·  Initialise shadcn/ui (writes components.json + the @/ alias)
npx shadcn@latest init`;

const installCode = `# external runtime + animation dependencies
npm install @splinetool/runtime @splinetool/react-spline framer-motion

# the shadcn primitive this component composes with
npx shadcn@latest add card`;

const PROPS = [
	{
		name: "scene",
		type: "string",
		req: true,
		desc: "URL (or local path) to the exported .splinecode scene that the runtime streams and renders.",
	},
	{
		name: "className",
		type: "string",
		req: false,
		desc: "Forwarded to the underlying canvas wrapper — size it with h-full w-full inside a relative parent.",
	},
];

const QA = [
	{
		icon: Boxes,
		q: "What data / props are passed in?",
		a: "Only two: a required scene URL string and an optional className. The surrounding Card takes the headline and body copy as children. There is no other external data — the 3D content lives entirely inside the Spline scene file.",
	},
	{
		icon: Layers,
		q: "Any state-management requirements?",
		a: "None global. The component is self-contained: React.lazy + Suspense handle the async load, and this build adds local state (loaded / failed + a timeout) so a blocked or slow scene degrades to an animated fallback instead of hanging.",
	},
	{
		icon: Sparkles,
		q: "Required assets, icons, hooks?",
		a: "The lib/utils cn() helper, the spotlight keyframes registered in Tailwind, and the .loader CSS. Decorative icons use lucide-react. No images are needed by the component itself — the scene is the asset.",
	},
	{
		icon: MousePointerClick,
		q: "Expected responsive behaviour?",
		a: "A two-column flex split on desktop (copy left, scene right) that stacks to a single column on small screens. The Spotlight repositions at the md breakpoint and the canvas always fills its relative parent.",
	},
	{
		icon: Wand2,
		q: "Best place to use it?",
		a: "A landing-page hero or a feature spotlight — anywhere a large, attention-grabbing above-the-fold moment earns its weight. Keep one interactive 3D scene per view so it stays the focal point.",
	},
];

/* --------------------------------------------------------------------- page */

export default function Index() {
	return (
		<div className="relative min-h-screen bg-neutral-950 text-neutral-100">
			{/* ambient gradient wash + dot grid */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 bg-dotgrid opacity-60"
			/>
			<div
				aria-hidden
				className="pointer-events-none fixed inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_100%_at_50%_-10%,rgba(124,58,237,0.18),transparent_70%)]"
			/>

			<div className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
				{/* nav */}
				<header className="flex items-center justify-between py-6">
					<div className="flex items-center gap-2.5">
						<span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
							<Boxes className="h-4 w-4 text-white" />
						</span>
						<span className="text-sm font-semibold tracking-tight">
							spline-scene
							<span className="ml-1 font-mono text-xs font-normal text-neutral-500">
								/ ui
							</span>
						</span>
					</div>
					<div className="hidden items-center gap-6 text-sm text-neutral-400 sm:flex">
						<a href="#setup" className="transition hover:text-neutral-100">
							Setup
						</a>
						<a href="#structure" className="transition hover:text-neutral-100">
							Structure
						</a>
						<a href="#playground" className="transition hover:text-neutral-100">
							Playground
						</a>
						<span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-neutral-300">
							<Package className="h-3 w-3" /> shadcn
						</span>
					</div>
				</header>

				{/* hero copy */}
				<section className="pb-8 pt-6 text-center">
					<div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
						</span>
						Component integrated · React + TypeScript + Tailwind
					</div>
					<h1 className="mx-auto max-w-3xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl">
						Interactive 3D, dropped into{" "}
						<span className="bg-gradient-to-r from-violet-300 to-sky-300 bg-clip-text">
							components/ui
						</span>
					</h1>
					<p className="mx-auto mt-5 max-w-xl text-balance text-neutral-400">
						A Spline scene wrapped as a shadcn-style component — composed with
						Card and Spotlight, with a graceful WebGL fallback, a live props
						playground, and the full integration guide below.
					</p>
				</section>

				{/* HERO DEMO — the exact SplineSceneBasic */}
				<section className="mt-2">
					<SplineSceneBasic />
					<p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-neutral-500">
						<ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
						Live scene streams from Spline when reachable; otherwise the
						built-in animated orb renders so the hero always works offline.
					</p>
				</section>

				{/* SETUP */}
				<section id="setup" className="mt-20 scroll-mt-20">
					<SectionLabel icon={TerminalSquare}>Prerequisites</SectionLabel>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Does your codebase support this?
					</h2>
					<p className="mt-2 max-w-2xl text-sm text-neutral-400">
						The component needs a{" "}
						<strong className="text-neutral-200">
							shadcn project structure
						</strong>
						, <strong className="text-neutral-200">Tailwind CSS</strong> and{" "}
						<strong className="text-neutral-200">TypeScript</strong>. If you
						don&apos;t have them yet, this is the whole setup — running{" "}
						<code className="text-neutral-200">shadcn init</code> is what writes
						both <code className="text-neutral-200">components.json</code> and
						the <code className="text-neutral-200">@/</code> import alias the
						component relies on.
					</p>
					<div className="mt-6 grid gap-5 lg:grid-cols-2">
						<CodeBlock code={setupCode} lang="bash" filename="terminal" />
						<CodeBlock code={installCode} lang="bash" filename="dependencies" />
					</div>
				</section>

				{/* STRUCTURE + why components/ui */}
				<section id="structure" className="mt-20 scroll-mt-20">
					<SectionLabel icon={FolderTree}>Default paths</SectionLabel>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Where the files go
					</h2>
					<p className="mt-2 max-w-2xl text-sm text-neutral-400">
						shadcn resolves component and style locations from{" "}
						<code className="text-neutral-200">components.json</code>. The
						defaults below put primitives under{" "}
						<code className="text-neutral-200">@/components/ui</code> and the
						token stylesheet at{" "}
						<code className="text-neutral-200">src/index.css</code>.
					</p>

					<div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
						<div className="rounded-xl border border-white/10 bg-[#0c0c0f] p-5">
							<div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-neutral-500">
								project tree
							</div>
							<div className="leading-relaxed">
								<FileNode name="my-app/" kind="root" />
								<FileNode
									name="components.json"
									depth={1}
									note="alias config"
								/>
								<FileNode name="tailwind.config.ts" depth={1} />
								<FileNode name="src/" kind="dir" depth={1} />
								<FileNode name="index.css" depth={2} note="style entry" />
								<FileNode name="lib/" kind="dir" depth={2} />
								<FileNode name="utils.ts" depth={3} note="cn()" />
								<FileNode name="components/" kind="dir" depth={2} />
								<FileNode name="ui/" kind="dir" depth={3} highlight />
								<FileNode name="splite.tsx" depth={4} highlight />
								<FileNode name="card.tsx" depth={4} highlight />
								<FileNode name="spotlight.tsx" depth={4} highlight />
							</div>
						</div>

						<div className="rounded-xl border border-violet-400/20 bg-gradient-to-b from-violet-500/[0.07] to-transparent p-5">
							<div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
								<FolderTree className="h-4 w-4" /> Why a dedicated
								components/ui?
							</div>
							<ul className="mt-2 space-y-3 text-sm text-neutral-300">
								<li className="flex gap-2.5">
									<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
									<span>
										It&apos;s the{" "}
										<strong className="text-neutral-100">
											convention shadcn&apos;s CLI targets
										</strong>{" "}
										— the <code className="text-neutral-200">ui</code> alias in{" "}
										<code className="text-neutral-200">components.json</code>{" "}
										points here, so{" "}
										<code className="text-neutral-200">add</code> drops files in
										the right place and the{" "}
										<code className="text-neutral-200">@/components/ui/*</code>{" "}
										imports resolve.
									</span>
								</li>
								<li className="flex gap-2.5">
									<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
									<span>
										It{" "}
										<strong className="text-neutral-100">
											separates generated primitives
										</strong>{" "}
										(owned, copy-pasted, freely edited) from your hand-written
										feature components — keeping ownership obvious.
									</span>
								</li>
								<li className="flex gap-2.5">
									<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
									<span>
										It keeps imports{" "}
										<strong className="text-neutral-100">
											predictable and portable
										</strong>
										: every snippet in the ecosystem assumes{" "}
										<code className="text-neutral-200">@/components/ui</code>,
										so paste-in components work with zero rewiring.
									</span>
								</li>
							</ul>
							<p className="mt-4 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-neutral-400">
								If your components path isn&apos;t already{" "}
								<code className="text-neutral-200">/components/ui</code>, create
								it and set <code className="text-neutral-200">aliases.ui</code>{" "}
								in <code className="text-neutral-200">components.json</code>{" "}
								before pasting these files.
							</p>
						</div>
					</div>
				</section>

				{/* THE COMPONENT */}
				<section className="mt-20">
					<SectionLabel icon={Boxes}>The component</SectionLabel>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						splite.tsx &amp; how to use it
					</h2>
					<div className="mt-6 grid gap-5 lg:grid-cols-2">
						<CodeBlock
							code={splineCode}
							lang="tsx"
							filename="components/ui/splite.tsx"
						/>
						<CodeBlock
							code={usageCode}
							lang="tsx"
							filename="components/ui/demo.tsx"
						/>
					</div>

					{/* props table */}
					<div className="mt-6 overflow-hidden rounded-xl border border-white/10">
						<div className="grid grid-cols-[140px_120px_1fr] border-b border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-neutral-500">
							<span>Prop</span>
							<span>Type</span>
							<span>Description</span>
						</div>
						{PROPS.map((p) => (
							<div
								key={p.name}
								className="grid grid-cols-[140px_120px_1fr] items-start gap-2 border-b border-white/5 px-4 py-3 text-sm last:border-0"
							>
								<span className="font-mono text-violet-200">
									{p.name}
									{p.req && <span className="text-rose-400">*</span>}
								</span>
								<span className="font-mono text-sky-300">{p.type}</span>
								<span className="text-neutral-400">{p.desc}</span>
							</div>
						))}
					</div>
				</section>

				{/* DEPENDENCIES */}
				<section className="mt-20">
					<SectionLabel icon={Package}>Dependencies</SectionLabel>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						What it pulls in
					</h2>
					<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								n: "@splinetool/react-spline",
								d: "React wrapper that mounts the scene",
							},
							{
								n: "@splinetool/runtime",
								d: "The engine that renders .splinecode",
							},
							{
								n: "framer-motion",
								d: "Animation primitives (Spotlight variant)",
							},
							{ n: "lucide-react", d: "Icons for surrounding UI" },
						].map((dep) => (
							<div
								key={dep.n}
								className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20"
							>
								<div className="mb-1 font-mono text-[12.5px] text-neutral-100">
									{dep.n}
								</div>
								<div className="text-xs text-neutral-500">{dep.d}</div>
							</div>
						))}
					</div>
				</section>

				{/* Q&A */}
				<section className="mt-20">
					<SectionLabel icon={Sparkles}>Integration notes</SectionLabel>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Questions worth answering first
					</h2>
					<div className="mt-6 grid gap-4 md:grid-cols-2">
						{QA.map((item) => (
							<div
								key={item.q}
								className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
							>
								<div className="mb-2 flex items-center gap-2.5 text-sm font-semibold text-neutral-100">
									<span className="grid h-7 w-7 place-items-center rounded-md bg-violet-500/15 text-violet-300">
										<item.icon className="h-4 w-4" />
									</span>
									{item.q}
								</div>
								<p className="text-sm leading-relaxed text-neutral-400">
									{item.a}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* PLAYGROUND */}
				<section id="playground" className="mt-20 scroll-mt-20">
					<SectionLabel icon={MousePointerClick}>Live playground</SectionLabel>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Drive the props
					</h2>
					<p className="mt-2 max-w-2xl text-sm text-neutral-400">
						The same{" "}
						<code className="text-neutral-200">
							Card + Spotlight + SplineScene
						</code>{" "}
						tree, wired to live controls — edit the copy, toggle the spotlight,
						recolour its fill.
					</p>
					<div className="mt-6">
						<ScenePlayground />
					</div>
				</section>

				{/* footer */}
				<footer className="mt-24 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center text-xs text-neutral-500">
					<div className="flex items-center gap-2">
						<Boxes className="h-4 w-4 text-violet-400" />
						<span className="text-neutral-300">spline-scene</span> · a shadcn/ui
						component integration
					</div>
					<p>
						Built with React, TypeScript, Tailwind CSS, shadcn/ui, Spline,
						Framer Motion &amp; Lucide.
					</p>
				</footer>
			</div>
		</div>
	);
}
