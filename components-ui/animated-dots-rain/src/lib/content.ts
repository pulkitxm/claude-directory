/**
 * Static content for the showcase page: preset patches, the props table, the
 * setup/usage snippets, and the *verbatim* component + demo source rendered in
 * the copyable code panels.
 */

export type Preset = {
	name: string;
	dotsNum: number;
	dotRadius: number;
	dotSpacing: number;
	speedRange: [number, number];
	backgroundColor: string;
	opacity: number;
	blendMode: GlobalCompositeOperation;
};

export const PRESETS: Preset[] = [
	{
		name: "Default",
		dotsNum: 60,
		dotRadius: 10,
		dotSpacing: 0,
		speedRange: [1, 4],
		backgroundColor: "#050507",
		opacity: 1,
		blendMode: "source-over",
	},
	{
		name: "Confetti",
		dotsNum: 120,
		dotRadius: 5,
		dotSpacing: 4,
		speedRange: [2, 7],
		backgroundColor: "#070510",
		opacity: 0.92,
		blendMode: "lighter",
	},
	{
		name: "Lava lamp",
		dotsNum: 26,
		dotRadius: 22,
		dotSpacing: 0,
		speedRange: [0.4, 1.4],
		backgroundColor: "#0a0306",
		opacity: 0.85,
		blendMode: "screen",
	},
	{
		name: "Pinstripe",
		dotsNum: 80,
		dotRadius: 4,
		dotSpacing: 12,
		speedRange: [1, 3],
		backgroundColor: "#04060a",
		opacity: 1,
		blendMode: "source-over",
	},
	{
		name: "Comet shower",
		dotsNum: 70,
		dotRadius: 8,
		dotSpacing: 2,
		speedRange: [4, 12],
		backgroundColor: "#02030a",
		opacity: 0.8,
		blendMode: "lighter",
	},
];

export const PROPS: {
	name: string;
	type: string;
	def: string;
	desc: string;
}[] = [
	{
		name: "dotsNum",
		type: "number",
		def: "60",
		desc: "Number of falling columns (one dot streams down per column).",
	},
	{
		name: "dotRadius",
		type: "number",
		def: "10",
		desc: "Radius of every dot, in px. Also sets the column pitch.",
	},
	{
		name: "dotSpacing",
		type: "number",
		def: "0",
		desc: "Extra gap added between columns on top of 2 × dotRadius.",
	},
	{
		name: "speedRange",
		type: "[number, number]",
		def: "[1, 4]",
		desc: "Min/max fall acceleration; each dot picks a random value in range.",
	},
	{
		name: "backgroundColor",
		type: "string",
		def: '"transparent"',
		desc: "Canvas fill per frame. transparent clears so it layers over anything.",
	},
	{
		name: "opacity",
		type: "number",
		def: "1",
		desc: "globalAlpha applied to the dots (the field's overall transparency).",
	},
	{
		name: "blendMode",
		type: "GlobalCompositeOperation",
		def: '"source-over"',
		desc: "Canvas composite op — lighter / screen make overlaps glow.",
	},
	{
		name: "fullScreen",
		type: "boolean",
		def: "true",
		desc: "true sizes to the window; false sizes to the parent box.",
	},
	{
		name: "colors",
		type: "DotColor[]",
		def: "16 stops",
		desc: "Channel palette: [channel, r, g, b] — channel ramps with the fall.",
	},
	{
		name: "className",
		type: "string",
		def: '""',
		desc: "Extra classes for the wrapper div.",
	},
];

export const SETUP_COMMANDS = `# Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# shadcn — writes the @/ alias, lib/utils cn(), CSS vars
npx shadcn@latest init`;

export const INSTALL_DEP = `# No runtime dependencies to install.
# AnimatedDots only needs react (already in any shadcn project).
# It paints to a raw <canvas> via the 2D context — no three.js,
# no framer-motion, no canvas libraries.`;

export const USAGE_SNIPPET = `import { AnimatedDots } from "@/components/ui/animated-dots";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* fullScreen={false} sizes the dots to this section, not the window */}
      <AnimatedDots fullScreen={false} className="absolute inset-0" />
      <div className="relative z-10">{/* your content */}</div>
    </section>
  );
}`;

/* ---- VERBATIM SOURCE (mirrors components/ui/animated-dots.tsx) ---- */
export const COMPONENT_SOURCE = `"use client";
import React, { useEffect, useRef } from "react";

type DotColor = ["red" | "green" | "blue", number, number, number];

interface AnimatedDotsProps {
  dotsNum?: number;
  dotRadius?: number;
  dotSpacing?: number;
  speedRange?: [number, number];
  backgroundColor?: string;
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
  fullScreen?: boolean;
  className?: string;
  colors?: DotColor[];
}

export const AnimatedDots: React.FC<AnimatedDotsProps> = ({
  dotsNum = 60,
  dotRadius = 10,
  dotSpacing = 0,
  speedRange = [1, 4],
  backgroundColor = "transparent",
  opacity = 1,
  blendMode = "source-over",
  fullScreen = true,
  className = "",
  colors = [/* 16 [channel, r, g, b] stops */],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const TWO_PI = 2 * Math.PI;
    let width = fullScreen ? window.innerWidth : canvas.offsetWidth;
    let height = fullScreen ? window.innerHeight : canvas.offsetHeight;

    class Dot {
      velocity = 0;
      ranVelocity =
        Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
      ranColor = Math.round(Math.random() * (colors.length - 1));
      radius = dotRadius;
      x: number; y: number;
      constructor(i: number) {
        this.x = this.radius + i * (this.radius * 2 + dotSpacing);
        this.y = -this.radius;
      }
      draw() {
        this.velocity += this.ranVelocity;
        const inc =
          255 - Math.round(this.velocity * (255 / (height + this.radius)));
        ctx.fillStyle = this.updateColors(colors[this.ranColor], inc);
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = blendMode;
        if (this.velocity >= height + this.radius) {
          this.velocity = 0;
          this.ranColor = Math.round(Math.random() * (colors.length - 1));
          this.ranVelocity =
            Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        }
        this.y = -this.radius + this.velocity;
        ctx.beginPath();
        ctx.arc(this.x % width, this.y, this.radius, 0, TWO_PI, false);
        ctx.fill();
      }
      updateColors(c: DotColor, inc: number) {
        let [type, r, g, b] = c;
        if (type === "red") r = inc;
        else if (type === "green") g = inc;
        else if (type === "blue") b = inc;
        return \`rgba(\${r}, \${g}, \${b}, 1)\`;
      }
    }

    const createDots = () => {
      dotsRef.current = [];
      for (let i = 0; i < dotsNum; i++) dotsRef.current.push(new Dot(i));
    };
    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      for (const dot of dotsRef.current) dot.draw();
      animationRef.current = requestAnimationFrame(draw);
    };
    const resizeCanvas = () => {
      width = fullScreen ? window.innerWidth : canvas.offsetWidth;
      height = fullScreen ? window.innerHeight : canvas.offsetHeight;
      canvas.width = width; canvas.height = height;
      createDots();
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dotsNum, dotRadius, colors, dotSpacing, speedRange,
      backgroundColor, opacity, blendMode, fullScreen]);

  return (
    <div className={\`relative \${fullScreen ? "w-screen h-screen" : ""} \${className}\`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};`;

export const DEMO_SOURCE = `import { AnimatedDots } from "@/components/ui/animated-dots";

export default function DemoOne() {
  return <AnimatedDots />;
}`;
