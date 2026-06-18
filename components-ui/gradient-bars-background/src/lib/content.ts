/**
 * Source strings shown verbatim in the integration story, plus the structured
 * copy (props API, prompt Q&A, presets). Keeping them here keeps App.tsx lean.
 */

export const COMPONENT_SOURCE = `import React from 'react';

interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  className?: string;
}

const GradientBars: React.FC<GradientBarsProps> = ({
  numBars = 15,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  animationDuration = 2,
  className = '',
}) => {
  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <>
      <style>{\`
        @keyframes pulseBar {
          0% { transform: scaleY(var(--initial-scale)); }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.7)); }
        }
      \`}</style>

      <div className={\`absolute inset-0 z-0 overflow-hidden \${className}\`}>
        <div className="flex h-full" style={{ width: '100%' }}>
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            return (
              <div
                key={index}
                style={{
                  flex: \`1 0 calc(100% / \${numBars})\`,
                  maxWidth: \`calc(100% / \${numBars})\`,
                  height: '100%',
                  background: \`linear-gradient(to top, \${gradientFrom}, \${gradientTo})\`,
                  transform: \`scaleY(\${height / 100})\`,
                  transformOrigin: 'bottom',
                  transition: 'transform 0.5s ease-in-out',
                  animation: \`pulseBar \${animationDuration}s ease-in-out infinite alternate\`,
                  animationDelay: \`\${index * 0.1}s\`,
                  '--initial-scale': height / 100,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};`;

export const USAGE_SNIPPET_HEAD = `import { Component } from "@/components/ui/gradient-bars-background";

<Component`;

export const SETUP_SHADCN = `# 1 · scaffold a Vite + React + TS app
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2 · add Tailwind CSS v4 (Vite plugin)
npm i -D tailwindcss @tailwindcss/vite
# vite.config.ts -> plugins: [react(), tailwindcss()]
# src/index.css -> @import "tailwindcss";

# 3 · initialise shadcn/ui (writes components.json + the @/* alias)
npx shadcn@latest init`;

export const DEP_INSTALL = `# the GradientBars component itself ships ZERO runtime deps —
# it is pure React + inline styles + a CSS @keyframes.
# the demo chrome (settings / close icons) uses lucide-react:
npm i lucide-react`;

export interface PropRow {
	name: string;
	type: string;
	def: string;
	desc: string;
}

/** The 5 GradientBars props + the 2 wrapper-only props. */
export const PROPS: PropRow[] = [
	{
		name: "numBars",
		type: "number",
		def: "15 / 7",
		desc: "How many vertical bars fill the field. The wrapper defaults to 7; GradientBars itself defaults to 15.",
	},
	{
		name: "gradientFrom",
		type: "string",
		def: "'rgb(255, 60, 0)'",
		desc: "Bottom colour of each bar's vertical linear-gradient — the hot, saturated base of the flame.",
	},
	{
		name: "gradientTo",
		type: "string",
		def: "'transparent'",
		desc: "Top colour the gradient fades to. 'transparent' lets bars dissolve into the background.",
	},
	{
		name: "animationDuration",
		type: "number",
		def: "2",
		desc: "Seconds for one pulse half-cycle. Each bar is offset by index × 0.1s for the wave ripple.",
	},
	{
		name: "backgroundColor",
		type: "string",
		def: "'rgb(10, 10, 10)'",
		desc: "Wrapper-only. Canvas fill behind the bars on the <Component> section.",
	},
	{
		name: "className",
		type: "string",
		def: "''",
		desc: "GradientBars-only. Extra classes merged onto the absolutely-positioned bar container.",
	},
	{
		name: "children",
		type: "ReactNode",
		def: "—",
		desc: "Wrapper-only. Foreground content rendered in a z-10 centered layer above the bars.",
	},
];

export interface QA {
	q: string;
	a: string;
}

/** The prompt's required "questions to ask", answered for this integration. */
export const QA_LIST: QA[] = [
	{
		q: "What data / props will be passed to this component?",
		a: "Presentational props only — numBars, gradientFrom, gradientTo, animationDuration, backgroundColor and optional children. No data fetching: it is a decorative background layer.",
	},
	{
		q: "Are there any specific state management requirements?",
		a: "None inside GradientBars — it is fully stateless and deterministic. The demo holds local React state (numBars, picked colour, panel open/closed) and the control deck on this page holds the live prop values.",
	},
	{
		q: "Are there any required assets (images, icons, etc.)?",
		a: "Zero image assets — every bar is a CSS linear-gradient. Only lucide-react icons (Settings / X) are used, for the demo's settings toggle. This page vendors its fonts locally as woff2 to stay fully offline.",
	},
	{
		q: "What is the expected responsive behaviour?",
		a: "The bar field is absolutely-positioned inset-0 and flexes to fill any parent, so each bar takes 100% / numBars of the width at every breakpoint. The headline scales from text-5xl on mobile to text-7xl on md+.",
	},
	{
		q: "What is the best place to use this component in the app?",
		a: "As a full-bleed hero / above-the-fold background, a landing splash, an empty-state, or a waitlist / coming-soon panel — anywhere a living, equalizer-style gradient adds energy behind centered content.",
	},
];

export interface Preset {
	hex: string;
	name: string;
}

/** Preset colours mirroring the prompt's six swatches. */
export const PRESETS: Preset[] = [
	{ hex: "#ff3c00", name: "Ignition" },
	{ hex: "#ff006e", name: "Hot Pink" },
	{ hex: "#8338ec", name: "Ultraviolet" },
	{ hex: "#3a86ff", name: "Azure" },
	{ hex: "#06ffa5", name: "Mint" },
	{ hex: "#ffbe0b", name: "Gold" },
];

/** Stack chips for the spec ticker. */
export const TICKER = [
	"React 18",
	"TypeScript",
	"Vite 6",
	"Tailwind CSS v4",
	"shadcn/ui structure",
	"lucide-react",
	"pure CSS @keyframes",
	"zero image assets",
	"offline-first fonts",
	"@/components/ui",
];
