import type { ReactNode } from "react";
import {
  CheckCircle2,
  FolderTree,
  Layers,
  MousePointerClick,
  PackageOpen,
  Palette,
  Rocket,
  ShieldCheck,
  Smartphone,
  Terminal,
  Workflow,
} from "lucide-react";
import { Code } from "./code";
import {
  CSS_IMPORT,
  DEPS,
  DROP_IN,
  INSTALL_SHADCN,
  USE_BACKDROP,
  USE_DEMO,
  VITE_ALIAS,
} from "./sources";

/* --- small building blocks ------------------------------------------------ */

function SectionHeading({
  index,
  icon: Icon,
  title,
  kicker,
}: {
  index: string;
  icon: typeof Layers;
  title: string;
  kicker: string;
}) {
  return (
    <div className="mb-7 flex items-start gap-4">
      <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[rgba(228,200,255,0.16)] bg-[rgba(20,15,30,0.6)]">
        <Icon className="h-5 w-5 text-amber" />
      </span>
      <div>
        <div className="font-mono text-[11px] tracking-[0.22em] text-magenta/80">
          {index} · {kicker}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-5 sm:p-6 ${className}`}>{children}</div>
  );
}

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
      <span>{children}</span>
    </li>
  );
}

function QA({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[rgba(228,200,255,0.1)] bg-[rgba(12,8,22,0.5)] p-4">
      <div className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-wide text-foreground">
        <span className="text-magenta">Q</span>
        {q}
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

const codeTag = (s: string) => (
  <code className="rounded bg-[rgba(255,178,77,0.13)] px-1.5 py-0.5 font-mono text-[12.5px] text-foreground">
    {s}
  </code>
);

/* --- the docs ------------------------------------------------------------- */

export function Docs() {
  return (
    <div
      id="docs"
      className="relative z-20 border-t border-[rgba(228,200,255,0.12)] bg-[#08060f]"
    >
      {/* faint top glow so the opaque docs meet the shader gracefully */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-[rgba(228,114,255,0.08)] to-transparent" />

      <div className="mx-auto max-w-[1100px] space-y-20 px-4 py-20 sm:px-6 sm:py-24">
        {/* 01 — anatomy */}
        <section id="anatomy" className="scroll-mt-24">
          <SectionHeading
            index="01"
            kicker="WHAT IT IS"
            icon={Layers}
            title="Anatomy of the component"
          />
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                {codeTag("hive.tsx")} is a single default-exported React
                component, {codeTag("ShaderDemo")}. It renders one{" "}
                {codeTag("<canvas>")} and, on mount, compiles a WebGL2 program:
                a pass-through vertex shader plus a fragment shader that
                raymarches a 20-step noise field and tints it with a cosine
                palette. A {codeTag("requestAnimationFrame")} loop feeds the
                elapsed time into a {codeTag("u_time")} uniform; a resize handler
                keeps the drawing buffer matched to the element at 1–2× DPR.
              </p>
              <ul className="mt-5 space-y-2.5">
                <Check>
                  Pure WebGL2 — no three.js, no glsl-loader, no shader runtime.
                </Check>
                <Check>
                  Owns its own animation loop and tears it down on unmount.
                </Check>
                <Check>
                  Fills its parent: {codeTag("width:100%")} ·{" "}
                  {codeTag("height:100vh")}.
                </Check>
              </ul>
            </Card>
            <Card className="bg-[rgba(10,7,18,0.6)]">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <FolderTree className="h-4 w-4 text-magenta" />
                Render pipeline
              </div>
              <ol className="space-y-3">
                {[
                  ["mount", "getContext(\"webgl2\")"],
                  ["compile", "vertex + fragment → program"],
                  ["upload", "fullscreen triangle pair"],
                  ["resize", "buffer ↔ element @ DPR"],
                  ["frame", "set u_time → drawArrays(6)"],
                  ["unmount", "cancelAnimationFrame + listeners"],
                ].map(([k, v], i) => (
                  <li key={k} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[rgba(228,200,255,0.16)] font-mono text-[11px] text-amber">
                      {i + 1}
                    </span>
                    <span className="font-mono text-[12px] text-muted-foreground">
                      <span className="text-foreground">{k}</span> — {v}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </section>

        {/* 02 — requirements / readiness */}
        <section className="scroll-mt-24">
          <SectionHeading
            index="02"
            kicker="THE CHECK"
            icon={ShieldCheck}
            title="This project is already shadcn-ready"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Workflow,
                t: "shadcn structure",
                d: (
                  <>
                    {codeTag("components.json")} is present with the{" "}
                    {codeTag("@/components")}, {codeTag("@/components/ui")} and{" "}
                    {codeTag("@/lib/utils")} aliases wired.
                  </>
                ),
              },
              {
                icon: Palette,
                t: "Tailwind CSS v4",
                d: (
                  <>
                    Installed via {codeTag("@tailwindcss/vite")} and imported
                    from {codeTag("src/index.css")} with{" "}
                    {codeTag('@import "tailwindcss"')}.
                  </>
                ),
              },
              {
                icon: Terminal,
                t: "TypeScript",
                d: (
                  <>
                    {codeTag("strict")} mode on, with the{" "}
                    {codeTag('@/* → ./src/*')} path mapping in{" "}
                    {codeTag("tsconfig")}.
                  </>
                ),
              },
            ].map((c) => (
              <Card key={c.t}>
                <c.icon className="h-6 w-6 text-amber" />
                <h3 className="mt-3.5 text-[15px] font-semibold text-foreground">
                  {c.t}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {c.d}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-[13.5px] leading-relaxed text-muted-foreground">
            If you are starting from a bare project that{" "}
            <span className="text-foreground">isn&apos;t</span> set up yet,
            section&nbsp;03 has the from-scratch commands.
          </p>
        </section>

        {/* 03 — default paths + setup from scratch */}
        <section className="scroll-mt-24">
          <SectionHeading
            index="03"
            kicker="PATHS & SETUP"
            icon={Rocket}
            title="Default paths, and setup from scratch"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <h3 className="text-[15px] font-semibold text-foreground">
                Where things live
              </h3>
              <div className="mt-4 space-y-3 font-mono text-[12.5px]">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(228,200,255,0.1)] bg-[rgba(12,8,22,0.5)] px-3 py-2.5">
                  <span className="text-muted-foreground">components</span>
                  <span className="text-amber">@/components/ui</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(228,200,255,0.1)] bg-[rgba(12,8,22,0.5)] px-3 py-2.5">
                  <span className="text-muted-foreground">styles</span>
                  <span className="text-magenta">src/index.css</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[rgba(228,200,255,0.1)] bg-[rgba(12,8,22,0.5)] px-3 py-2.5">
                  <span className="text-muted-foreground">utils</span>
                  <span className="text-foreground">@/lib/utils</span>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                These are read straight from {codeTag("components.json")} — the
                same file the shadcn CLI uses to know where to write generated
                components.
              </p>
            </Card>

            <div className="space-y-5">
              <Code
                code={INSTALL_SHADCN}
                label="terminal — from a blank folder"
              />
              <Code code={CSS_IMPORT} label="src/index.css" />
            </div>
          </div>

          <div className="mt-5">
            <Code code={VITE_ALIAS} label="vite.config.ts" />
          </div>
        </section>

        {/* 04 — why /components/ui */}
        <section className="scroll-mt-24">
          <SectionHeading
            index="04"
            kicker="THE CONVENTION"
            icon={FolderTree}
            title="Why the component goes in /components/ui"
          />
          <Card>
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">
              The default registry path resolves to{" "}
              {codeTag("src/components/ui")} — and the{" "}
              <span className="text-foreground">demo imports from exactly
              that path</span>:{" "}
              {codeTag('import ShaderDemo from "@/components/ui/hive"')}. If the
              file landed anywhere else, that import would break. Keeping the
              folder is what makes the drop-in work unedited.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <ul className="space-y-2.5">
                <Check>
                  <span className="text-foreground">Predictable imports.</span>{" "}
                  Every primitive resolves under one alias, so paths never drift
                  between files or authors.
                </Check>
                <Check>
                  <span className="text-foreground">CLI compatibility.</span>{" "}
                  {codeTag("npx shadcn@latest add …")} writes here by default —
                  hand-added and generated components sit side by side.
                </Check>
              </ul>
              <ul className="space-y-2.5">
                <Check>
                  <span className="text-foreground">Clean separation.</span>{" "}
                  {codeTag("ui/")} holds reusable primitives;{" "}
                  app-specific composition lives elsewhere (this lab keeps it in{" "}
                  {codeTag("components/lab")}).
                </Check>
                <Check>
                  <span className="text-foreground">Portability.</span> Copy{" "}
                  {codeTag("ui/hive.tsx")} into any shadcn project and it just
                  works — same alias, same home.
                </Check>
              </ul>
            </div>
          </Card>
        </section>

        {/* 05 — drop it in */}
        <section className="scroll-mt-24">
          <SectionHeading
            index="05"
            kicker="INTEGRATE"
            icon={PackageOpen}
            title="Drop it in and use it"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-5">
              <Code code={DROP_IN} label="paste the files" />
              <Code code={DEPS} label="dependencies — runtime" />
              <div className="rounded-xl border border-[rgba(255,178,77,0.2)] bg-[rgba(255,178,77,0.06)] p-4">
                <div className="flex items-center gap-2 font-mono text-[12px] font-semibold text-amber">
                  <PackageOpen className="h-4 w-4" />
                  Install dependencies
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  None for the shader itself — it imports only{" "}
                  {codeTag("react")}. This lab additionally uses{" "}
                  {codeTag("lucide-react")} for icons and{" "}
                  {codeTag("clsx")} + {codeTag("tailwind-merge")} for the{" "}
                  {codeTag("cn()")} helper, the standard shadcn trio.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <Code code={USE_DEMO} label="the bundled example" />
              <Code code={USE_BACKDROP} label="as a fixed hero backdrop" />
            </div>
          </div>
        </section>

        {/* 06 — props, state, the questions */}
        <section className="scroll-mt-24">
          <SectionHeading
            index="06"
            kicker="PROPS · STATE · ASSETS"
            icon={MousePointerClick}
            title="The integration questions, answered"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <QA q="What props will be passed?">
              None. {codeTag("ShaderDemo")} takes no props — it is fully
              self-driving. The only thing the caller controls is the size of
              the wrapping element, which the canvas fills.
            </QA>
            <QA q="Any state-management requirements?">
              No external store. All state is internal to one{" "}
              {codeTag("useEffect")}: the GL context, program, uniform
              locations and the rAF handle. Nothing leaks to context or props.
            </QA>
            <QA q="Required context providers or hooks?">
              None. It uses only React&apos;s built-in {codeTag("useRef")} and{" "}
              {codeTag("useEffect")} — no provider to mount, no custom hook to
              install.
            </QA>
            <QA q="Any required assets — images, icons?">
              The shader needs <span className="text-foreground">zero</span>{" "}
              assets — the visual is generated procedurally in GLSL, so there
              are no textures, images or fonts to ship. (This lab&apos;s chrome
              uses {codeTag("lucide-react")} icons only.)
            </QA>
            <QA q="What is the expected responsive behaviour?">
              Fully fluid. The resize handler re-matches the drawing buffer to
              the element on every {codeTag("resize")} event, clamping DPR to
              1–2× so it stays crisp on retina without over-rendering on phones.
              Give the parent any width/height and it adapts.
            </QA>
            <QA q="Where is the best place to use it?">
              As a full-bleed background: a landing-page hero, an auth screen, a
              loading state, or a section divider. Mount it{" "}
              {codeTag("fixed inset-0 -z-10")} and lay your content on top —
              exactly what the hero of this page does.
            </QA>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Smartphone,
                t: "Responsive",
                d: "DPR-clamped resize; fills any parent box.",
              },
              {
                icon: ShieldCheck,
                t: "Resilient",
                d: "Bails cleanly when WebGL2 is unavailable.",
              },
              {
                icon: Layers,
                t: "Lightweight",
                d: "One program, one draw call per frame.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="glass-soft flex items-start gap-3 rounded-xl p-4"
              >
                <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
                <div>
                  <div className="text-[13.5px] font-semibold text-foreground">
                    {c.t}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {c.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* footer */}
        <footer className="border-t border-[rgba(228,200,255,0.1)] pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="font-mono text-[12px] text-muted-foreground">
              <span className="text-spectrum font-semibold">HIVE</span> — a
              drop-in WebGL2 noise field for{" "}
              <span className="text-foreground">@/components/ui</span>.
            </div>
            <div className="font-mono text-[11px] tracking-wide text-muted-foreground">
              built with Fable 5 · shadcn · Tailwind v4 · TypeScript
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
