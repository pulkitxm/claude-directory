import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, Heart, Sparkles, Check } from "lucide-react";
import {
	Shell,
	SectionHeading,
	Card,
	Button,
	Input,
	Badge,
	Reveal,
	display,
} from "./primitives";

/* The live component playground / token gallery. Press the buttons to feel the
   squish; type in the field to watch it pop from recessed to raised. This is
   the section that proves the system is interactive, not decorative. */

const SWATCHES: { name: string; value: string; text: string }[] = [
	{ name: "Accent", value: "#7C3AED", text: "#fff" },
	{ name: "Pink", value: "#DB2777", text: "#fff" },
	{ name: "Sky", value: "#0EA5E9", text: "#fff" },
	{ name: "Emerald", value: "#10B981", text: "#fff" },
	{ name: "Amber", value: "#F59E0B", text: "#332F3A" },
	{ name: "Canvas", value: "#F4F1FA", text: "#332F3A" },
];

const RADII = [
	{ label: "20", px: 20 },
	{ label: "24", px: 24 },
	{ label: "32", px: 32 },
	{ label: "48", px: 48 },
];

export function Showcase() {
	const [pressed, setPressed] = useState(0);
	const [email, setEmail] = useState("");

	return (
		<section id="showcase" className="py-16 sm:py-24">
			<Shell>
				<SectionHeading
					eyebrow="Live playground"
					title="Poke it. It pokes back."
					lead="The actual primitives, rendered live. Press a button to feel the squish; focus the field to watch it rise out of the clay."
				/>

				<div className="mt-14 grid gap-6 lg:grid-cols-2">
					{/* ---- Buttons & states ---- */}
					<Reveal>
						<Card hover={false} className="h-full">
							<Badge tone="violet">
								<Sparkles size={14} />
								Buttons
							</Badge>
							<h3
								style={display}
								className="mt-4 text-2xl font-extrabold tracking-tight"
							>
								Four variants, one squish
							</h3>
							<p className="mt-2 text-base leading-relaxed text-clay-muted">
								Every variant lifts on hover and compresses on click. Counter
								below proves the press registers.
							</p>

							<div className="mt-6 flex flex-wrap gap-3">
								<Button onClick={() => setPressed((n) => n + 1)}>
									Primary
									<ArrowRight size={18} />
								</Button>
								<Button
									variant="secondary"
									onClick={() => setPressed((n) => n + 1)}
								>
									Secondary
								</Button>
								<Button
									variant="outline"
									onClick={() => setPressed((n) => n + 1)}
								>
									Outline
								</Button>
								<Button
									variant="ghost"
									onClick={() => setPressed((n) => n + 1)}
								>
									Ghost
								</Button>
							</div>

							<div className="mt-5 flex items-center gap-3">
								<span className="inline-flex h-11 items-center gap-2 rounded-2xl bg-clay-recess px-4 shadow-clay-pressed-sm">
									<Heart
										size={16}
										className="text-clay-accent-alt"
										fill="currentColor"
									/>
									<span
										style={display}
										className="text-sm font-bold text-clay-foreground"
										data-testid="press-count"
									>
										{pressed} squishes
									</span>
								</span>
								<span className="text-sm font-medium text-clay-muted">
									Try holding one down.
								</span>
							</div>
						</Card>
					</Reveal>

					{/* ---- Recessed input ---- */}
					<Reveal delay={90}>
						<Card hover={false} className="h-full">
							<Badge tone="sky">Inputs</Badge>
							<h3
								style={display}
								className="mt-4 text-2xl font-extrabold tracking-tight"
							>
								Pressed in, until you touch it
							</h3>
							<p className="mt-2 text-base leading-relaxed text-clay-muted">
								The field rests recessed into the surface. On focus it rises to
								a clean white card with a soft focus ring.
							</p>

							<form
								className="mt-6 flex flex-col gap-3 sm:flex-row"
								onSubmit={(e) => e.preventDefault()}
							>
								<Input
									type="email"
									placeholder="you@studio.com"
									aria-label="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Button type="submit" className="h-16 sm:w-auto">
									Join
								</Button>
							</form>
							<p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-clay-muted">
								<span className="grid h-5 w-5 place-items-center rounded-full bg-clay-emerald/15 text-clay-emerald">
									<Check size={12} strokeWidth={3} />
								</span>
								Recessed → raised, with a 200ms transition.
							</p>
						</Card>
					</Reveal>

					{/* ---- Color swatches ---- */}
					<Reveal delay={120}>
						<Card hover={false} className="h-full">
							<Badge tone="pink">Palette</Badge>
							<h3
								style={display}
								className="mt-4 text-2xl font-extrabold tracking-tight"
							>
								The candy-shop tokens
							</h3>
							<div className="mt-6 grid grid-cols-3 gap-3">
								{SWATCHES.map((s) => (
									<div
										key={s.name}
										className="flex aspect-[4/3] flex-col justify-end rounded-[20px] p-3 shadow-clay-button-soft"
										style={{ background: s.value, color: s.text }}
									>
										<span style={display} className="text-sm font-extrabold">
											{s.name}
										</span>
										<span className="text-[11px] font-semibold opacity-80">
											{s.value}
										</span>
									</div>
								))}
							</div>
						</Card>
					</Reveal>

					{/* ---- Radii + shadow specimens ---- */}
					<Reveal delay={150}>
						<Card hover={false} className="h-full">
							<Badge tone="amber">Shape & depth</Badge>
							<h3
								style={display}
								className="mt-4 text-2xl font-extrabold tracking-tight"
							>
								Super-rounded radii
							</h3>
							<div className="mt-6 flex flex-wrap items-end gap-4">
								{RADII.map((r) => (
									<div
										key={r.label}
										className="flex flex-col items-center gap-2"
									>
										<div
											className="h-16 w-16 bg-gradient-to-br from-clay-accent-light to-clay-accent shadow-clay-button"
											style={{ borderRadius: r.px } as CSSProperties}
										/>
										<span
											style={display}
											className="text-xs font-bold text-clay-muted"
										>
											{r.label}px
										</span>
									</div>
								))}
							</div>

							<div className="mt-6 grid grid-cols-2 gap-3">
								<div className="flex h-20 items-center justify-center rounded-2xl bg-clay-cardBg shadow-clay-card backdrop-blur-xl">
									<span
										style={display}
										className="text-sm font-bold text-clay-muted"
									>
										Convex
									</span>
								</div>
								<div className="flex h-20 items-center justify-center rounded-2xl bg-clay-recess shadow-clay-pressed">
									<span
										style={display}
										className="text-sm font-bold text-clay-muted"
									>
										Concave
									</span>
								</div>
							</div>
						</Card>
					</Reveal>
				</div>
			</Shell>
		</section>
	);
}
