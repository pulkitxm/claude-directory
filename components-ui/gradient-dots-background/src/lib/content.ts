/**
 * Static content for the showcase page: preset patches, the props table, the
 * setup/usage snippets, and the *verbatim* component + demo source rendered in
 * the copyable code panels.
 */

export type Preset = {
	name: string;
	dotSize: number;
	spacing: number;
	duration: number;
	colorCycleDuration: number;
	backgroundColor: string;
};

export const PRESETS: Preset[] = [
	{
		name: "Default",
		dotSize: 8,
		spacing: 10,
		duration: 20,
		colorCycleDuration: 6,
		backgroundColor: "#050507",
	},
	{
		name: "Fine mist",
		dotSize: 4,
		spacing: 7,
		duration: 30,
		colorCycleDuration: 10,
		backgroundColor: "#0b0d1a",
	},
	{
		name: "Coarse",
		dotSize: 14,
		spacing: 22,
		duration: 16,
		colorCycleDuration: 5,
		backgroundColor: "#050507",
	},
	{
		name: "Rave",
		dotSize: 9,
		spacing: 11,
		duration: 8,
		colorCycleDuration: 2,
		backgroundColor: "#0a0610",
	},
	{
		name: "Daylight",
		dotSize: 7,
		spacing: 10,
		duration: 24,
		colorCycleDuration: 7,
		backgroundColor: "#ffffff",
	},
];

export const PROPS: {
	name: string;
	type: string;
	def: string;
	desc: string;
}[] = [
	{
		name: "dotSize",
		type: "number",
		def: "8",
		desc: "Diameter of the punched-out dots, in px.",
	},
	{
		name: "spacing",
		type: "number",
		def: "10",
		desc: "Base grid pitch; hex rows are spaced spacing × 1.732.",
	},
	{
		name: "duration",
		type: "number",
		def: "30",
		desc: "Seconds for one full color-field drift loop.",
	},
	{
		name: "colorCycleDuration",
		type: "number",
		def: "6",
		desc: "Seconds for one full 0→360° hue rotation.",
	},
	{
		name: "backgroundColor",
		type: "string",
		def: "var(--background)",
		desc: "Canvas fill + dot mask colour.",
	},
	{
		name: "...props",
		type: "motion.div",
		def: "—",
		desc: "Any extra motion.div / div prop (className, style, …).",
	},
];

export const SETUP_COMMANDS = `# Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# shadcn — writes the @/ alias, lib/utils cn(), CSS vars
npx shadcn@latest init`;

export const INSTALL_DEP = `npm install framer-motion
# or: pnpm add framer-motion / yarn add framer-motion`;

export const USAGE_SNIPPET = `import { GradientDots } from "@/components/ui/gradient-dots";

export function Hero() {
  return (
    <section className="relative min-h-screen">
      <GradientDots duration={20} />
      <div className="relative z-10">{/* your content */}</div>
    </section>
  );
}`;

/* ---- VERBATIM SOURCE (mirrors components/ui/gradient-dots.tsx) ---- */
export const COMPONENT_SOURCE = `'use client';

import React from 'react';
import { motion } from 'framer-motion';

type GradientDotsProps = React.ComponentProps<typeof motion.div> & {
  dotSize?: number;
  spacing?: number;
  duration?: number;
  colorCycleDuration?: number;
  backgroundColor?: string;
};

export function GradientDots({
  dotSize = 8,
  spacing = 10,
  duration = 30,
  colorCycleDuration = 6,
  backgroundColor = 'var(--background)',
  className,
  ...props
}: GradientDotsProps) {
  const hexSpacing = spacing * 1.732;

  return (
    <motion.div
      className={\`absolute inset-0 \${className}\`}
      style={{
        backgroundColor,
        backgroundImage: \`...layered radial-gradients...\`,
        backgroundSize: \`\${spacing}px \${hexSpacing}px, ...\`,
      }}
      animate={{
        backgroundPosition: [/* drift keyframes */],
        filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
      }}
      transition={{
        backgroundPosition: { duration, ease: 'linear', repeat: Infinity },
        filter: { duration: colorCycleDuration, ease: 'linear', repeat: Infinity },
      }}
      {...props}
    />
  );
}`;

export const DEMO_SOURCE = `import { GradientDots } from "@/components/ui/gradient-dots";

export default function DefaultDemo() {
  return (
    <main className="relative flex size-full min-h-screen w-full items-center justify-center">
      <GradientDots duration={20} />
      <h1 className="text-6xl text-center font-extrabold z-10">
        Gradient Dots
      </h1>
    </main>
  );
}`;
