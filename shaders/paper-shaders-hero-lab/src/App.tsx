import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
	Activity,
	Check,
	CircleDot,
	Copy,
	Droplets,
	Eye,
	Gauge,
	Layers,
	type LucideIcon,
	Maximize2,
	Palette,
	RotateCcw,
	Shuffle,
	Sparkles,
	SunMedium,
	Waves,
	Wind,
	Zap,
} from "lucide-react"
import {
	ConfigurablePulsingCircle,
	ConfigurableShaderBackground,
	Header,
	HeroContent,
	PULSE_DEFAULTS,
	SHADER_DEFAULTS,
	type PulseConfig,
	type ShaderConfig,
} from "@/components/ui/shaders-hero-lab"
import { useTelemetry } from "@/lib/useTelemetry"
import { useCanvasSignature } from "@/lib/useCanvasSignature"
import { cn, clamp, luminance, normalizeHex } from "@/lib/utils"

/* ------------------------------------------------------------------ *
 * Palette presets — each is a full ShaderConfig the hero accepts, plus a
 * matching pulse-ring palette. The first ("Saddle") is the verbatim default
 * from the 21st.dev drop-in, so the lab boots pixel-identical to the original.
 * ------------------------------------------------------------------ */
interface Preset {
	id: string
	name: string
	tag: string
	shader: ShaderConfig
	pulseColors: string[]
}

const PRESETS: Preset[] = [
	{
		id: "saddle",
		name: "Saddle",
		tag: "DEFAULT",
		shader: { ...SHADER_DEFAULTS },
		pulseColors: [...PULSE_DEFAULTS.colors],
	},
	{
		id: "ember",
		name: "Ember Forge",
		tag: "WARM",
		shader: {
			baseColors: ["#000000", "#7c2d12", "#f97316", "#1c1917", "#b45309"],
			wireColors: ["#000000", "#fb923c", "#7c2d12", "#000000"],
			baseSpeed: 0.42,
			wireSpeed: 0.28,
			distortion: 1.0,
			swirl: 0.75,
			wireOpacity: 0.55,
			wireframe: true,
		},
		pulseColors: ["#FFD9A0", "#FF8A3D", "#FF4C3E", "#FFB703", "#FB8500", "#E85D04", "#9D0208"],
	},
	{
		id: "abyss",
		name: "Abyssal",
		tag: "COOL",
		shader: {
			baseColors: ["#000000", "#0f3d57", "#e6f2f5", "#06141c", "#1b6985"],
			wireColors: ["#000000", "#bfe8f2", "#0f3d57", "#000000"],
			baseSpeed: 0.24,
			wireSpeed: 0.16,
			distortion: 0.7,
			swirl: 0.5,
			wireOpacity: 0.62,
			wireframe: true,
		},
		pulseColors: ["#BEECFF", "#5EC9E8", "#2A7FB8", "#00FF88", "#48CAE4", "#0096C7", "#023E8A"],
	},
	{
		id: "orchid",
		name: "Orchid Haze",
		tag: "VIVID",
		shader: {
			baseColors: ["#000000", "#6d28d9", "#f5e6ff", "#1a0b2e", "#a855f7"],
			wireColors: ["#000000", "#e9d5ff", "#6d28d9", "#000000"],
			baseSpeed: 0.5,
			wireSpeed: 0.32,
			distortion: 1.25,
			swirl: 1.0,
			wireOpacity: 0.5,
			wireframe: true,
		},
		pulseColors: ["#E9D5FF", "#E77EDC", "#C026D3", "#8A2BE2", "#A855F7", "#7C3AED", "#4C1D95"],
	},
	{
		id: "carbon",
		name: "Carbon",
		tag: "MONO",
		shader: {
			baseColors: ["#000000", "#3f3f46", "#fafafa", "#18181b", "#71717a"],
			wireColors: ["#000000", "#e4e4e7", "#52525b", "#000000"],
			baseSpeed: 0.2,
			wireSpeed: 0.14,
			distortion: 0.55,
			swirl: 0.35,
			wireOpacity: 0.7,
			wireframe: true,
		},
		pulseColors: ["#FFFFFF", "#D4D4D8", "#A1A1AA", "#E4E4E7", "#71717A", "#52525B", "#FAFAFA"],
	},
]

/* ------------------------------------------------------------------ *
 * Presentational atoms
 * ------------------------------------------------------------------ */

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
	return (
		<div className="flex flex-col leading-none">
			<span className="text-[9px] uppercase tracking-[0.18em] text-ink-dim">{label}</span>
			<span className={cn("mt-1 font-mono text-[13px] tabular-nums", accent ? "text-ember" : "text-ink")}>
				{value}
			</span>
		</div>
	)
}

function Fader({
	id,
	icon: Icon,
	label,
	value,
	min,
	max,
	step,
	unit = "",
	onChange,
}: {
	id: string
	icon: LucideIcon
	label: string
	value: number
	min: number
	max: number
	step: number
	unit?: string
	onChange: (v: number) => void
}) {
	const fill = ((value - min) / (max - min)) * 100
	return (
		<div className="group">
			<div className="mb-2 flex items-center justify-between">
				<span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
					<Icon className="size-3" strokeWidth={1.75} />
					{label}
				</span>
				<span className="font-mono text-[12px] tabular-nums text-ink">
					{value.toFixed(2)}
					<span className="ml-0.5 text-ink-dim">{unit}</span>
				</span>
			</div>
			<input
				id={id}
				type="range"
				className="fader"
				style={{ ["--fill" as string]: `${fill}%` }}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				aria-label={label}
			/>
		</div>
	)
}

function ModuleCard({
	title,
	icon: Icon,
	right,
	children,
}: {
	title: string
	icon: LucideIcon
	right?: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<section className="module grain rounded-xl border border-line">
			<header className="flex items-center justify-between border-b border-line px-4 py-2.5">
				<h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
					<Icon className="size-3.5 text-ember" strokeWidth={2} />
					{title}
				</h3>
				{right}
			</header>
			<div className="p-4">{children}</div>
		</section>
	)
}

/* ------------------------------------------------------------------ *
 * Documentation dock
 * ------------------------------------------------------------------ */

const INSTALL_CMD = `npm i @paper-design/shaders-react framer-motion lucide-react`

const SCAFFOLD_CMD = `# fresh shadcn-ready project
npm create vite@latest my-app -- --template react-ts
cd my-app
npx shadcn@latest init        # writes components.json + the @/ alias
npm i tailwindcss @tailwindcss/vite`

const PROPS_API: Array<{ name: string; type: string; def: string; note: string }> = [
	{ name: "children", type: "React.ReactNode", def: "—", note: "Overlaid on the shader (Header / HeroContent / …)" },
	{ name: "config.baseColors", type: "string[]", def: "5 saddle-brown stops", note: "Primary MeshGradient colour spots" },
	{ name: "config.wireColors", type: "string[]", def: "4 mono/brown stops", note: "Wireframe overlay colour spots" },
	{ name: "config.baseSpeed", type: "number", def: "0.3", note: "Base mesh time multiplier" },
	{ name: "config.wireSpeed", type: "number", def: "0.2", note: "Wireframe overlay time multiplier" },
	{ name: "config.distortion", type: "number", def: "0.8", note: "Organic noise distortion (0–2)" },
	{ name: "config.swirl", type: "number", def: "0.6", note: "Vortex distortion (0–2)" },
	{ name: "config.wireOpacity", type: "number", def: "0.6", note: "Opacity of the wireframe layer" },
	{ name: "config.wireframe", type: "boolean", def: "true", note: "Draw the wireframe overlay at all" },
	{ name: "pulse.colors", type: "string[]", def: "7-stop rainbow", note: "PulsingBorder spot colours" },
	{ name: "pulse.speed", type: "number", def: "1.5", note: "PulsingBorder animation speed" },
	{ name: "pulse.intensity", type: "number", def: "5", note: "PulsingBorder glow intensity" },
	{ name: "pulse.thickness", type: "number", def: "0.1", note: "PulsingBorder ring thickness (0–1)" },
	{ name: "pulse.pulse", type: "number", def: "0.1", note: "PulsingBorder pulse depth (0–1)" },
]

function usageSnippet(p: { shader: ShaderConfig; pulse: PulseConfig }): string {
	const base = p.shader.baseColors.map((c) => `"${c}"`).join(", ")
	return `import {
  ConfigurableShaderBackground,
  ConfigurablePulsingCircle,
  Header,
  HeroContent,
} from "@/components/ui/shaders-hero-lab"

export default function ShaderShowcase() {
  return (
    <ConfigurableShaderBackground
      config={{
        baseColors: [${base}],
        baseSpeed: ${p.shader.baseSpeed},
        distortion: ${p.shader.distortion.toFixed(2)},
        swirl: ${p.shader.swirl.toFixed(2)},
        wireframe: ${p.shader.wireframe},
      }}
    >
      <Header />
      <HeroContent />
      <ConfigurablePulsingCircle config={{ speed: ${p.pulse.speed.toFixed(2)} }} />
    </ConfigurableShaderBackground>
  )
}`
}

const VERBATIM_SNIPPET = `// The drop-in exactly as shipped — no props, constants baked in.
import {
  Header,
  HeroContent,
  PulsingCircle,
  ShaderBackground,
} from "@/components/ui/shaders-hero-section"

export default function ShaderShowcase() {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
    </ShaderBackground>
  )
}`

type Tab = "install" | "props" | "usage" | "shadcn" | "responsive"

function Dock({
	tab,
	setTab,
	snippet,
	onCopy,
	copied,
}: {
	tab: Tab
	setTab: (t: Tab) => void
	snippet: string
	onCopy: (text: string, key: string) => void
	copied: string | null
}) {
	const tabs: Array<{ id: Tab; label: string }> = [
		{ id: "install", label: "Install" },
		{ id: "props", label: "Props API" },
		{ id: "usage", label: "Usage" },
		{ id: "shadcn", label: "Why /components/ui" },
		{ id: "responsive", label: "Responsive" },
	]

	return (
		<div className="module grain rounded-xl border border-line">
			<div className="thin-scroll flex flex-wrap items-center gap-1 overflow-x-auto border-b border-line px-2 py-1.5">
				{tabs.map((t) => (
					<button
						key={t.id}
						role="tab"
						aria-selected={tab === t.id}
						onClick={() => setTab(t.id)}
						className={cn(
							"tab-ink whitespace-nowrap rounded-md px-3 py-1.5 text-[12px] font-medium",
							tab === t.id ? "bg-ember/15 text-ember" : "text-ink-dim hover:text-ink",
						)}
					>
						{t.label}
					</button>
				))}
			</div>

			<div className="p-4">
				{tab === "install" && (
					<div className="grid gap-4 lg:grid-cols-2">
						<div className="space-y-3">
							<p className="text-[13px] leading-relaxed text-ink-dim">
								The hero needs three runtime deps — the shader engine, the motion lib that spins the
								orbital text, and the icon set. Add them, then drop the component into{" "}
								<code className="text-ink">src/components/ui</code>.
							</p>
							<CodeBlock
								code={INSTALL_CMD}
								onCopy={() => onCopy(INSTALL_CMD, "install")}
								copied={copied === "install"}
							/>
						</div>
						<div className="space-y-3">
							<p className="text-[13px] leading-relaxed text-ink-dim">
								Starting from scratch? Scaffold a Vite + React-TS app, init shadcn (which writes{" "}
								<code className="text-ink">components.json</code> and the{" "}
								<code className="text-ink">@/</code> alias), and add Tailwind.
							</p>
							<CodeBlock
								code={SCAFFOLD_CMD}
								onCopy={() => onCopy(SCAFFOLD_CMD, "scaffold")}
								copied={copied === "scaffold"}
							/>
						</div>
					</div>
				)}

				{tab === "props" && (
					<div className="thin-scroll overflow-x-auto">
						<p className="mb-3 text-[13px] leading-relaxed text-ink-dim">
							The verbatim drop-in (<code className="text-ink">shaders-hero-section.tsx</code>) takes no
							props — every value is baked in. Its parameterised sibling (
							<code className="text-ink">shaders-hero-lab.tsx</code>) promotes those constants to the{" "}
							<code className="text-ink">config</code> / <code className="text-ink">pulse</code> objects
							below, which is what every fader on the right drives.
						</p>
						<table className="w-full border-collapse text-left text-[12px]">
							<thead>
								<tr className="text-[10px] uppercase tracking-[0.14em] text-ink-dim">
									<th className="py-1.5 pr-4 font-medium">Prop</th>
									<th className="py-1.5 pr-4 font-medium">Type</th>
									<th className="py-1.5 pr-4 font-medium">Default</th>
									<th className="py-1.5 font-medium">Notes</th>
								</tr>
							</thead>
							<tbody className="align-top">
								{PROPS_API.map((p) => (
									<tr key={p.name} className="border-t border-line">
										<td className="whitespace-nowrap py-1.5 pr-4 font-mono text-ember">{p.name}</td>
										<td className="whitespace-nowrap py-1.5 pr-4 font-mono text-ink">{p.type}</td>
										<td className="whitespace-nowrap py-1.5 pr-4 font-mono text-ink-dim">{p.def}</td>
										<td className="py-1.5 text-ink-dim">{p.note}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{tab === "usage" && (
					<div className="grid gap-4 lg:grid-cols-2">
						<div className="space-y-2">
							<p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-dim">
								Verbatim drop-in
							</p>
							<CodeBlock
								code={VERBATIM_SNIPPET}
								onCopy={() => onCopy(VERBATIM_SNIPPET, "verbatim")}
								copied={copied === "verbatim"}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-dim">
								Live deck (reflects the controls →)
							</p>
							<CodeBlock code={snippet} onCopy={() => onCopy(snippet, "usage")} copied={copied === "usage"} />
						</div>
					</div>
				)}

				{tab === "shadcn" && (
					<div className="space-y-3 text-[13px] leading-relaxed text-ink-dim">
						<p>
							shadcn/ui isn't an npm package you import — its CLI copies component source straight into
							your repo. The convention is <code className="text-ink">@/components/ui</code>, wired through
							a <code className="text-ink">@/*</code> path alias declared in both{" "}
							<code className="text-ink">tsconfig</code> and{" "}
							<code className="text-ink">vite.config.ts</code>.
						</p>
						<p className="font-medium text-ink">Why this exact folder matters</p>
						<ul className="list-disc space-y-1.5 pl-5">
							<li>
								<code className="text-ink">components.json</code> records it as the{" "}
								<code className="text-ink">ui</code> alias, so{" "}
								<code className="text-ink">npx shadcn@latest add …</code> drops every future primitive in
								the same predictable place.
							</li>
							<li>
								The import <code className="text-ink">@/components/ui/shaders-hero-section</code> resolves
								from anywhere, no matter how deeply the importing file is nested — no{" "}
								<code className="text-ink">../../../</code> chains.
							</li>
							<li>
								It keeps owned/vendored primitives separate from your own feature components — one folder
								to scan, theme, and audit.
							</li>
						</ul>
						<p>
							This project mirrors that exactly: the verbatim component lives at{" "}
							<code className="text-ink">src/components/ui/shaders-hero-section.tsx</code> and the
							parameterised sibling at{" "}
							<code className="text-ink">src/components/ui/shaders-hero-lab.tsx</code>. The component styles
							with bare Tailwind utilities, so no shadcn colour tokens are required — but the global
							stylesheet still maps the full shadcn palette so any primitive you add later resolves.
						</p>
					</div>
				)}

				{tab === "responsive" && (
					<div className="space-y-3 text-[13px] leading-relaxed text-ink-dim">
						<p className="font-medium text-ink">Expected responsive behaviour</p>
						<ul className="list-disc space-y-1.5 pl-5">
							<li>
								The hero is a <code className="text-ink">min-h-screen w-full</code> stage; the two{" "}
								<code className="text-ink">MeshGradient</code> layers are{" "}
								<code className="text-ink">absolute inset-0</code> and repaint to any viewport — no fixed
								pixel sizes.
							</li>
							<li>
								The headline scales with a breakpoint ramp (
								<code className="text-ink">text-5xl</code> →{" "}
								<code className="text-ink">md:text-6xl</code>); the corner{" "}
								<code className="text-ink">Header</code>, <code className="text-ink">HeroContent</code> and{" "}
								<code className="text-ink">PulsingCircle</code> stay pinned to their edges via{" "}
								<code className="text-ink">absolute</code> insets.
							</li>
							<li>
								The lab chrome around it is the responsive part: the control deck sits beside the stage on{" "}
								<code className="text-ink">lg+</code> (a{" "}
								<code className="text-ink">[1fr_360px]</code> grid) and stacks beneath it on mobile; the
								top rail and telemetry strip wrap with <code className="text-ink">flex-wrap</code>.
							</li>
							<li>
								All motion is gated behind{" "}
								<code className="text-ink">@media (prefers-reduced-motion: reduce)</code> for the chrome;
								the shader itself honours its own <code className="text-ink">speed</code> props.
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

function CodeBlock({ code, onCopy, copied }: { code: string; onCopy: () => void; copied: boolean }) {
	return (
		<div className="group relative overflow-hidden rounded-lg border border-line bg-black/40">
			<button
				onClick={onCopy}
				className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-line bg-carbon-2/90 px-2 py-1 text-[10px] uppercase tracking-wide text-ink-dim transition-colors hover:text-ink"
				aria-label="Copy code"
			>
				{copied ? <Check className="size-3 text-mint" /> : <Copy className="size-3" />}
				{copied ? "Copied" : "Copy"}
			</button>
			<pre className="thin-scroll overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-ink">
				<code>{code}</code>
			</pre>
		</div>
	)
}

/* ------------------------------------------------------------------ *
 * The lab shell
 * ------------------------------------------------------------------ */

export default function App() {
	const tel = useTelemetry()
	const plateRef = useRef<HTMLDivElement>(null)
	const sig = useCanvasSignature(plateRef)

	// Live shader state — flows straight into the parameterised hero.
	const [presetId, setPresetId] = useState(PRESETS[0].id)
	const [shader, setShader] = useState<ShaderConfig>({ ...PRESETS[0].shader })
	const [pulseColors, setPulseColors] = useState<string[]>([...PRESETS[0].pulseColors])
	const [pulseSpeed, setPulseSpeed] = useState(PULSE_DEFAULTS.speed)
	const [pulseIntensity, setPulseIntensity] = useState(PULSE_DEFAULTS.intensity)

	const [view, setView] = useState<"showcase" | "lab">("lab")
	const [tab, setTab] = useState<Tab>("install")
	const [copied, setCopied] = useState<string | null>(null)
	const [clicks, setClicks] = useState(0)
	const copyTimer = useRef<number | null>(null)

	useEffect(() => {
		return () => {
			if (copyTimer.current) window.clearTimeout(copyTimer.current)
		}
	}, [])

	const patchShader = useCallback((patch: Partial<ShaderConfig>) => {
		setShader((prev) => ({ ...prev, ...patch }))
		setPresetId("custom")
	}, [])

	const applyPreset = useCallback((p: Preset) => {
		setPresetId(p.id)
		setShader({ ...p.shader })
		setPulseColors([...p.pulseColors])
	}, [])

	const reset = useCallback(() => {
		applyPreset(PRESETS[0])
		setPulseSpeed(PULSE_DEFAULTS.speed)
		setPulseIntensity(PULSE_DEFAULTS.intensity)
	}, [applyPreset])

	const randomize = useCallback(() => {
		const rnd = () =>
			`#${Math.floor(Math.random() * 0xffffff)
				.toString(16)
				.padStart(6, "0")}`
		setShader((prev) => ({
			...prev,
			baseColors: ["#000000", rnd(), "#ffffff", rnd(), rnd()],
			wireColors: ["#000000", rnd(), rnd(), "#000000"],
		}))
		setPulseColors((prev) => prev.map(() => rnd()))
		setPresetId("custom")
	}, [])

	const setBaseColorAt = useCallback((i: number, hex: string) => {
		setShader((prev) => ({
			...prev,
			baseColors: prev.baseColors.map((c, j) => (j === i ? normalizeHex(hex) : c)),
		}))
		setPresetId("custom")
	}, [])

	const copy = useCallback((text: string, key: string) => {
		const done = () => {
			setCopied(key)
			if (copyTimer.current) window.clearTimeout(copyTimer.current)
			copyTimer.current = window.setTimeout(() => setCopied(null), 1600)
		}
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(text).then(done).catch(done)
		} else {
			done()
		}
	}, [])

	const pulse: PulseConfig = useMemo(
		() => ({ ...PULSE_DEFAULTS, colors: pulseColors, speed: pulseSpeed, intensity: pulseIntensity }),
		[pulseColors, pulseSpeed, pulseIntensity],
	)

	const snippet = useMemo(() => usageSnippet({ shader, pulse }), [shader, pulse])
	const activePreset = PRESETS.find((p) => p.id === presetId)
	const sigHex = useMemo(
		() => `#${sig.rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`,
		[sig.rgb],
	)

	return (
		<div className="bench relative flex min-h-screen flex-col">
			{/* ---- Live hero plate (fixed, full-viewport behind the chrome) ---- */}
			<div className="plate-bracket plate-vignette scanlines pointer-events-none fixed inset-0 z-0">
				<div className="pointer-events-auto absolute inset-0">
					<ConfigurableShaderBackground ref={plateRef} config={shader}>
						<Header />
						<HeroContent />
						<ConfigurablePulsingCircle config={pulse} />
					</ConfigurableShaderBackground>
				</div>
			</div>

			{/* ---- Top utility rail ---- */}
			<header className="module relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5 sm:px-6">
				<div className="flex items-center gap-3">
					<span className="grid size-8 place-items-center rounded-lg border border-line bg-carbon-2 text-ember">
						<Sparkles className="size-4" strokeWidth={2} />
					</span>
					<div className="leading-none">
						<div className="flex items-center gap-2">
							<h1 className="text-[13px] font-semibold tracking-tight text-ink">Paper Shaders</h1>
							<span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[9px] text-ink-dim">
								shaders-react · 0.0.76
							</span>
						</div>
						<p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-ink-dim">Hero Lab</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="hidden items-center gap-4 rounded-lg border border-line bg-carbon-2/70 px-3 py-1.5 md:flex">
						<span className="flex items-center gap-1.5">
							<span className="tally inline-block size-1.5 rounded-full bg-mint" />
							<span className="text-[9px] uppercase tracking-[0.18em] text-ink-dim">Live</span>
						</span>
						<Stat label="FPS" value={String(tel.fps)} accent />
						<Stat label="Frame" value={String(tel.frame)} />
						<Stat label="Uptime" value={`${tel.uptime.toFixed(1)}s`} />
					</div>

					{/* Showcase ↔ Lab view toggle */}
					<div className="flex items-center rounded-lg border border-line bg-carbon-2/80 p-0.5 text-[11px]">
						<button
							onClick={() => setView("showcase")}
							aria-pressed={view === "showcase"}
							className={cn(
								"flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
								view === "showcase" ? "bg-ember/20 text-ember" : "text-ink-dim hover:text-ink",
							)}
						>
							<Maximize2 className="size-3.5" /> <span className="hidden sm:inline">Showcase</span>
						</button>
						<button
							onClick={() => setView("lab")}
							aria-pressed={view === "lab"}
							className={cn(
								"flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
								view === "lab" ? "bg-ember/20 text-ember" : "text-ink-dim hover:text-ink",
							)}
						>
							<Gauge className="size-3.5" /> <span className="hidden sm:inline">Lab</span>
						</button>
					</div>
				</div>
			</header>

			{/* ---- Main work area: hero stage (spacer) + control deck ---- */}
			<main
				className={cn(
					"relative z-10 grid flex-1 grid-cols-1 gap-4 px-4 py-4 sm:px-6",
					view === "lab" && "lg:grid-cols-[1fr_360px]",
				)}
			>
				{/* Stage captions over the live hero (which is fixed behind) */}
				<div className="pointer-events-none relative hidden min-h-[60vh] lg:block">
					<div className="pointer-events-auto absolute left-0 top-0 flex items-center gap-2 rounded-full border border-line bg-black/40 px-3 py-1.5 backdrop-blur-md">
						<CircleDot className="size-3.5 text-ember" strokeWidth={2} />
						<span className="text-[11px] text-ink">
							Live specimen · <span className="font-mono">{activePreset?.name ?? "Custom"}</span>
						</span>
					</div>

					{/* Canvas-signature telemetry — read straight off the shader */}
					<div className="pointer-events-auto absolute right-0 top-0 flex items-center gap-3 rounded-full border border-line bg-black/40 px-3 py-1.5 font-mono text-[10px] text-ink-dim backdrop-blur-md">
						<span className="flex items-center gap-1.5">
							<span
								className="inline-block size-3 rounded-sm border border-line"
								style={{ background: sigHex }}
							/>
							sample {sigHex}
						</span>
						<span className="hidden xl:inline">lum {(sig.lum * 100).toFixed(0)}%</span>
					</div>

					<div className="pointer-events-auto absolute bottom-0 left-0 flex items-center gap-2 rounded-full border border-line bg-black/40 px-3 py-1.5 font-mono text-[11px] text-ink-dim backdrop-blur-md">
						<Activity className="size-3.5" strokeWidth={1.75} />
						CTA fired ×{clicks}
					</div>
				</div>

				{/* Control deck — only mounted in Lab view */}
				{view === "lab" && (
					<div className="flex flex-col gap-4">
						{/* Palette presets */}
						<ModuleCard
							title="Palette"
							icon={Palette}
							right={
								<button
									onClick={randomize}
									className="flex items-center gap-1 rounded-md border border-line bg-black/30 px-2 py-1 text-[10px] uppercase tracking-wide text-ink-dim transition-colors hover:text-ink"
								>
									<Shuffle className="size-3" /> Random
								</button>
							}
						>
							<div className="grid grid-cols-1 gap-1.5">
								{PRESETS.map((p) => {
									const active = p.id === presetId
									return (
										<button
											key={p.id}
											onClick={() => applyPreset(p)}
											aria-pressed={active}
											className={cn(
												"group flex items-center gap-3 rounded-lg border px-2.5 py-2 text-left transition-colors",
												active
													? "border-ember bg-ember/10"
													: "border-line bg-black/20 hover:border-ember/60",
											)}
										>
											<span className="flex h-6 w-16 overflow-hidden rounded-md border border-line">
												{p.shader.baseColors.map((c, i) => (
													<span key={i} className="flex-1" style={{ background: c }} />
												))}
											</span>
											<span className="flex-1">
												<span className="block text-[12px] font-medium text-ink">{p.name}</span>
											</span>
											<span
												className={cn(
													"font-mono text-[9px] tracking-wide",
													active ? "text-ember" : "text-ink-dim",
												)}
											>
												{p.tag}
											</span>
										</button>
									)
								})}
							</div>

							{/* Editable base stops */}
							<div className="mt-3 border-t border-line pt-3">
								<div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
									<Droplets className="size-3" strokeWidth={1.75} /> Mesh color stops
								</div>
								<div className="grid grid-cols-5 gap-1.5">
									{shader.baseColors.map((c, i) => (
										<label
											key={i}
											className="relative aspect-square overflow-hidden rounded-md border border-line"
											style={{ background: c }}
											title={`${normalizeHex(c)} — click to edit`}
										>
											<input
												type="color"
												className="swatch-input"
												value={normalizeHex(c)}
												onChange={(e) => setBaseColorAt(i, e.target.value)}
												aria-label={`Mesh color stop ${i + 1}`}
											/>
											<span
												className="pointer-events-none absolute bottom-0.5 left-0 right-0 text-center font-mono text-[7px] leading-none"
												style={{ color: luminance(c) > 0.5 ? "#1c2128cc" : "#ffffffcc" }}
											>
												{normalizeHex(c).slice(1)}
											</span>
										</label>
									))}
								</div>
							</div>
						</ModuleCard>

						{/* Geometry faders */}
						<ModuleCard title="Mesh Geometry" icon={Layers}>
							<div className="space-y-4">
								<Fader
									id="fader-basespeed"
									icon={Gauge}
									label="Base Speed"
									value={shader.baseSpeed}
									min={0}
									max={2}
									step={0.01}
									unit="×"
									onChange={(v) => patchShader({ baseSpeed: clamp(v, 0, 2) })}
								/>
								<Fader
									id="fader-wirespeed"
									icon={Wind}
									label="Wire Speed"
									value={shader.wireSpeed}
									min={0}
									max={2}
									step={0.01}
									unit="×"
									onChange={(v) => patchShader({ wireSpeed: clamp(v, 0, 2) })}
								/>
								<Fader
									id="fader-distortion"
									icon={Waves}
									label="Distortion"
									value={shader.distortion}
									min={0}
									max={2}
									step={0.01}
									onChange={(v) => patchShader({ distortion: clamp(v, 0, 2) })}
								/>
								<Fader
									id="fader-swirl"
									icon={Wind}
									label="Swirl"
									value={shader.swirl}
									min={0}
									max={2}
									step={0.01}
									onChange={(v) => patchShader({ swirl: clamp(v, 0, 2) })}
								/>
								<Fader
									id="fader-wireopacity"
									icon={Eye}
									label="Wire Opacity"
									value={shader.wireOpacity}
									min={0}
									max={1}
									step={0.01}
									onChange={(v) => patchShader({ wireOpacity: clamp(v, 0, 1) })}
								/>
							</div>

							<label className="mt-4 flex cursor-pointer items-center justify-between border-t border-line pt-3">
								<span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
									<Layers className="size-3" strokeWidth={1.75} /> Wireframe overlay
								</span>
								<button
									role="switch"
									aria-checked={shader.wireframe}
									onClick={() => patchShader({ wireframe: !shader.wireframe })}
									className={cn(
										"relative h-5 w-9 rounded-full border transition-colors",
										shader.wireframe ? "border-ember bg-ember/30" : "border-line bg-black/40",
									)}
								>
									<span
										className={cn(
											"absolute top-0.5 size-3.5 rounded-full bg-ink transition-transform",
											shader.wireframe ? "translate-x-4" : "translate-x-0.5",
										)}
									/>
								</button>
							</label>
						</ModuleCard>

						{/* Pulse ring controls */}
						<ModuleCard title="Pulse Ring" icon={Zap}>
							<div className="space-y-4">
								<Fader
									id="fader-pulsespeed"
									icon={Gauge}
									label="Pulse Speed"
									value={pulseSpeed}
									min={0}
									max={4}
									step={0.05}
									unit="×"
									onChange={(v) => {
										setPulseSpeed(clamp(v, 0, 4))
										setPresetId("custom")
									}}
								/>
								<Fader
									id="fader-pulseintensity"
									icon={SunMedium}
									label="Glow Intensity"
									value={pulseIntensity}
									min={0}
									max={10}
									step={0.1}
									onChange={(v) => {
										setPulseIntensity(clamp(v, 0, 10))
										setPresetId("custom")
									}}
								/>
							</div>

							<div className="mt-4 flex gap-2 border-t border-line pt-3">
								<button
									onClick={reset}
									className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line bg-black/20 px-3 py-2 text-[11px] font-medium text-ink transition-colors hover:border-ember"
								>
									<RotateCcw className="size-3.5" /> Reset
								</button>
								<button
									onClick={() => copy(INSTALL_CMD, "deck-install")}
									className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ember bg-ember/15 px-3 py-2 text-[11px] font-medium text-ember transition-colors hover:bg-ember/25"
								>
									{copied === "deck-install" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
									{copied === "deck-install" ? "Copied" : "Install"}
								</button>
							</div>
						</ModuleCard>
					</div>
				)}
			</main>

			{/* ---- Documentation dock ---- */}
			<section className="relative z-10 px-4 pb-4 sm:px-6">
				<Dock tab={tab} setTab={setTab} snippet={snippet} onCopy={copy} copied={copied} />
			</section>

			{/* ---- Bottom signal bus ---- */}
			<footer className="module relative z-10 overflow-hidden border-t border-line px-4 py-2 sm:px-6">
				<div className="relative flex items-center justify-between font-mono text-[10px] text-ink-dim">
					<span className="flex items-center gap-2">
						<Sparkles className="size-3 text-ember" />
						MeshGradient + PulsingBorder · @paper-design/shaders-react · framer-motion · fonts vendored
					</span>
					<span className="hidden sm:inline">
						base {shader.baseSpeed.toFixed(2)}× · swirl {shader.swirl.toFixed(2)} · pulse{" "}
						{pulseSpeed.toFixed(2)}×
					</span>
				</div>
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
					<span className="sweep absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ember to-transparent" />
				</div>
			</footer>

			{/* Invisible CTA hook: the verbatim hero's buttons live inside the fixed
			    plate; we surface the click count via the stage caption. The buttons
			    themselves are the verbatim markup, so we observe clicks at the plate. */}
			<ClickProbe targetRef={plateRef} onHit={() => setClicks((c) => c + 1)} />
		</div>
	)
}

/**
 * Counts clicks on the verbatim hero's CTA buttons without editing the verbatim
 * markup: listens on the live plate and increments when a <button> inside it is
 * activated. Keeps the "CTA fired ×N" readout honest.
 *
 * `onHit` is stashed in a ref so the listener attaches exactly once (the effect
 * does NOT depend on the caller's inline callback) and never churns on re-render.
 */
function ClickProbe({
	targetRef,
	onHit,
}: {
	targetRef: React.RefObject<HTMLDivElement | null>
	onHit: () => void
}) {
	const onHitRef = useRef(onHit)
	useEffect(() => {
		onHitRef.current = onHit
	}, [onHit])

	useEffect(() => {
		const el = targetRef.current
		if (!el) return
		const handler = (e: MouseEvent) => {
			const t = e.target as HTMLElement | null
			if (t && t.closest("button")) onHitRef.current()
		}
		el.addEventListener("click", handler)
		return () => el.removeEventListener("click", handler)
	}, [targetRef])
	return null
}
