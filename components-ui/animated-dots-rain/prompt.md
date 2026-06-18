YOU ARE GIVEN A TASK TO INTEGRATE AN EXISTING REACT COMPONENT IN THE CODEBASE

THE CODEBASE SHOULD SUPPORT:

- SHADCN PROJECT STRUCTURE
- TAILWIND CSS
- TYPESCRIPT

IF IT DOESN'T, PROVIDE INSTRUCTIONS ON HOW TO SETUP PROJECT VIA SHADCN CLI, INSTALL TAILWIND OR TYPESCRIPT.

DETERMINE THE DEFAULT PATH FOR COMPONENTS AND STYLES.
IF DEFAULT PATH FOR COMPONENTS IS NOT /COMPONENTS/UI, PROVIDE INSTRUCTIONS ON WHY IT'S IMPORTANT TO CREATE THIS FOLDER
COPY-PASTE THIS COMPONENT TO /COMPONENTS/UI FOLDER:

```tsx
animated-dots.tsx
"use client";
import React, { useEffect, useRef } from "react";

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
  colors?: [("red" | "green" | "blue"), number, number, number][];
}

export const AnimatedDots: React.FC<AnimatedDotsProps> = ({
  dotsNum = 60,
  dotRadius = 10,
  dotSpacing = 0,
  speedRange = [1, 4],
  backgroundColor = "transparent",
  opacity = 1,
  blendMode = "normal",
  fullScreen = true,
  className = "",
  colors = [
  ["red", 255, 69, 58],
  ["orange", 255, 149, 0],
  ["yellow", 255, 214, 10],
  ["green", 52, 199, 89],
  ["mint", 0, 199, 190],
  ["teal", 48, 176, 199],
  ["blue", 0, 122, 255],
  ["indigo", 88, 86, 214],
  ["purple", 175, 82, 222],
  ["pink", 255, 45, 85],
  ["rose", 255, 100, 130],
  ["lime", 164, 255, 46],
  ["aqua", 46, 255, 220],
  ["sky", 100, 200, 255],
  ["violet", 205, 150, 255],
  ["gold", 255, 215, 0],
]


}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<any[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const TWO_PI = 2 * Math.PI;
    let width = fullScreen ? window.innerWidth : canvas.offsetWidth;
    let height = fullScreen ? window.innerHeight : canvas.offsetHeight;

    const requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60));

    class Dot {
      i: number;
      velocity: number;
      ranVelocity: number;
      ranColor: number;
      radius: number;
      x: number;
      y: number;

      constructor(i: number) {
        this.i = i;
        this.velocity = 0;
        this.radius = dotRadius;
        this.ranVelocity =
          Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        this.ranColor = Math.round(Math.random() * (colors.length - 1));
        this.x = this.radius + i * (this.radius * 2 + dotSpacing);
        this.y = -this.radius;
      }

      draw() {
        this.velocity += this.ranVelocity;
        const colorIncrement =
          255 - Math.round(this.velocity * (255 / (height + this.radius)));
        ctx.fillStyle = this.updateColors(colors[this.ranColor], colorIncrement);
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

      updateColors(selectedColor: any, increment: number) {
        let [type, r, g, b] = selectedColor;

        if (type === "red") r = increment;
        else if (type === "green") g = increment;
        else if (type === "blue") b = increment;

        return `rgba(${r}, ${g}, ${b}, 1)`;
      }
    }

    const resizeCanvas = () => {
      width = fullScreen ? window.innerWidth : canvas.offsetWidth;
      height = fullScreen ? window.innerHeight : canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      createDots();
    };

    const createDots = () => {
      dotsRef.current = [];
      for (let i = 0; i < dotsNum; i++) {
        dotsRef.current.push(new Dot(i));
      }
    };

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (const dot of dotsRef.current) {
        dot.draw();
      }

      animationRef.current = requestAnimFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
    dotsNum,
    dotRadius,
    colors,
    dotSpacing,
    speedRange,
    backgroundColor,
    opacity,
    blendMode,
    fullScreen,
  ]);

  return (
    <div
      className={`relative ${fullScreen ? "w-screen h-screen" : ""} ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};


demo.tsx
import { AnimatedDots } from "@/components/ui/animated-dots";

export default function DemoOne() {
  return <AnimatedDots />;
}

```

IMPLEMENTATION GUIDELINES

1. ANALYZE THE COMPONENT STRUCTURE AND IDENTIFY ALL REQUIRED DEPENDENCIES
2. REVIEW THE COMPONENT'S ARGUMENS AND STATE
3. IDENTIFY ANY REQUIRED CONTEXT PROVIDERS OR HOOKS AND INSTALL THEM
4. QUESTIONS TO ASK
   - WHAT DATA/PROPS WILL BE PASSED TO THIS COMPONENT?
   - ARE THERE ANY SPECIFIC STATE MANAGEMENT REQUIREMENTS?
   - ARE THERE ANY REQUIRED ASSETS (IMAGES, ICONS, ETC.)?
   - WHAT IS THE EXPECTED RESPONSIVE BEHAVIOR?
   - WHAT IS THE BEST PLACE TO USE THIS COMPONENT IN THE APP?

STEPS TO INTEGRATE

0. COPY PASTE ALL THE CODE ABOVE IN THE CORRECT DIRECTORIES
1. INSTALL EXTERNAL DEPENDENCIES
2. FILL IMAGE ASSETS WITH UNSPLASH STOCK IMAGES YOU KNOW EXIST
3. USE LUCIDE-REACT ICONS FOR SVGS OR LOGOS IF COMPONENT REQUIRES THEM
