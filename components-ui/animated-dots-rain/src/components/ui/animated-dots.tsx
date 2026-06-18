"use client";
import React, { useEffect, useRef } from "react";

/**
 * A color stop for the rain. The first item is the RGB channel whose value is
 * driven by the dot's fall (it ramps from 0 at the top to `increment` toward
 * the bottom); the remaining three are the static base [r, g, b] for the
 * other two channels.
 */
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
	colors = [
		["red", 255, 69, 58],
		["green", 52, 199, 89],
		["blue", 0, 122, 255],
		["red", 255, 45, 85],
		["green", 164, 255, 46],
		["blue", 88, 86, 214],
		["red", 255, 149, 0],
		["green", 0, 199, 190],
		["blue", 100, 200, 255],
		["red", 255, 214, 10],
		["green", 48, 176, 199],
		["blue", 175, 82, 222],
		["red", 255, 100, 130],
		["green", 46, 255, 220],
		["blue", 205, 150, 255],
		["red", 255, 215, 0],
	],
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d")!;
		const TWO_PI = 2 * Math.PI;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		let width = fullScreen ? window.innerWidth : canvas.offsetWidth;
		let height = fullScreen ? window.innerHeight : canvas.offsetHeight;
		let dots: Dot[] = [];

		const requestAnimFrame =
			window.requestAnimationFrame ||
			((callback: FrameRequestCallback) =>
				window.setTimeout(() => callback(performance.now()), 1000 / 60));

		const resizeCanvas = () => {
			width = fullScreen ? window.innerWidth : canvas.offsetWidth;
			height = fullScreen ? window.innerHeight : canvas.offsetHeight;
			// Render at device-pixel resolution for crisp dots on HiDPI screens,
			// then scale the drawing space back to CSS pixels.
			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			createDots();
		};

		const createDots = () => {
			dots = [];
			for (let i = 0; i < dotsNum; i++) {
				dots.push(new Dot(i));
			}
		};

		const draw = () => {
			// Background pass always uses normal compositing so the previous
			// frame is cleanly wiped (or left transparent) before the dots paint.
			ctx.globalCompositeOperation = "source-over";
			ctx.globalAlpha = 1;
			if (backgroundColor === "transparent") {
				ctx.clearRect(0, 0, width, height);
			} else {
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, width, height);
			}

			for (const dot of dots) {
				dot.draw();
			}

			animationRef.current = requestAnimFrame(draw);
		};

		class Dot {
			velocity = 0;
			ranVelocity: number;
			ranColor: number;
			radius = dotRadius;
			x: number;
			y: number;

			constructor(i: number) {
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

				// Recycle the dot back to the top with a fresh color + speed once
				// it has fallen past the bottom edge.
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

			updateColors(selectedColor: DotColor, increment: number) {
				let [type, r, g, b] = selectedColor;

				if (type === "red") r = increment;
				else if (type === "green") g = increment;
				else if (type === "blue") b = increment;

				return `rgba(${r}, ${g}, ${b}, 1)`;
			}
		}

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
