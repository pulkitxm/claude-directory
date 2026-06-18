"use client";

import { useEffect, useRef, useState } from "react";
import "./particle-hero.css";

interface Particle {
	x: number;
	y: number;
	speed: number;
	opacity: number;
	fadeDelay: number;
	fadeStart: number;
	fadingOut: boolean;
	reset: () => void;
	update: () => void;
	draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface ParticleHeroProps {
	/** First line of the radial-reveal headline. */
	title?: string;
	/** Two-line tagline rendered below the headline (split on `\n`). */
	subtitle?: string;
	/** Start the scene in the inverted warm "gold" palette. */
	defaultGold?: boolean;
	/** Notified whenever the gold-mode orb is toggled. */
	onGoldModeChange?: (isGold: boolean) => void;
}

export function ParticleHero({
	title = "Gold Design",
	subtitle = "The world's best platform for Designs,\npowered by Dalim",
	defaultGold = false,
	onGoldModeChange,
}: ParticleHeroProps = {}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isGoldMode, setIsGoldMode] = useState(defaultGold);
	const particlesRef = useRef<Particle[]>([]);
	const animationRef = useRef<number>(undefined);

	// Keep internal state in sync if the parent flips `defaultGold`
	// (used by the showcase playground's gold-mode switch).
	useEffect(() => {
		setIsGoldMode(defaultGold);
	}, [defaultGold]);

	const createParticle = (canvas: HTMLCanvasElement): Particle => {
		const particle: Particle = {
			x: 0,
			y: 0,
			speed: 0,
			opacity: 1,
			fadeDelay: 0,
			fadeStart: 0,
			fadingOut: false,
			reset() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.speed = Math.random() / 5 + 0.1;
				this.opacity = 1;
				this.fadeDelay = Math.random() * 600 + 100;
				this.fadeStart = Date.now() + this.fadeDelay;
				this.fadingOut = false;
			},
			update() {
				this.y -= this.speed;
				if (this.y < 0) {
					this.reset();
				}

				if (!this.fadingOut && Date.now() > this.fadeStart) {
					this.fadingOut = true;
				}

				if (this.fadingOut) {
					this.opacity -= 0.008;
					if (this.opacity <= 0) {
						this.reset();
					}
				}
			},
			draw(ctx: CanvasRenderingContext2D) {
				ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`;
				ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
			},
		};

		particle.reset();
		particle.y = Math.random() * canvas.height;
		particle.fadeDelay = Math.random() * 600 + 100;
		particle.fadeStart = Date.now() + particle.fadeDelay;
		particle.fadingOut = false;

		return particle;
	};

	const calculateParticleCount = (canvas: HTMLCanvasElement) => {
		return Math.floor((canvas.width * canvas.height) / 6000);
	};

	const initParticles = (canvas: HTMLCanvasElement) => {
		const particleCount = calculateParticleCount(canvas);
		particlesRef.current = [];
		for (let i = 0; i < particleCount; i++) {
			particlesRef.current.push(createParticle(canvas));
		}
	};

	const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		particlesRef.current.forEach((particle) => {
			particle.update();
			particle.draw(ctx);
		});
		animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Size the canvas to the hero container (not the whole window) so the
		// component composes cleanly inside any page layout.
		const sizeToContainer = () => {
			canvas.width = container.clientWidth;
			canvas.height = container.clientHeight;
			initParticles(canvas);
		};

		sizeToContainer();
		animate(canvas, ctx);

		const resizeObserver = new ResizeObserver(sizeToContainer);
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	const toggleGoldMode = () => {
		setIsGoldMode((prev) => {
			const next = !prev;
			onGoldModeChange?.(next);
			return next;
		});
	};

	const [subLine1, subLine2] = subtitle.split("\n");

	return (
		<div
			ref={containerRef}
			className={`particle-hero relative h-[700px] w-full overflow-hidden ${isGoldMode ? "gold-mode" : ""}`}
			style={{
				background: "#05060f",
				backgroundImage:
					"linear-gradient(0deg,rgba(216,236,248,.06),rgba(152,192,239,.06))",
				fontSize: "max(calc(min(600px, 80vh) * 0.03), 10px)",
				WebkitFontSmoothing: "antialiased",
				textRendering: "optimizeLegibility",
				scrollBehavior: "smooth",
			}}
		>
			{/* Header */}
			<div
				className="header"
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					color: "#bad6f7",
					padding: "2em",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					margin: "0 auto",
					opacity: 0,
					transform: "translateY(-1em)",
					animation: "load 2s ease-in 2s forwards, up 1.4s ease-out 2s forwards",
				}}
			>
				<button
					type="button"
					className="mid-spot"
					onClick={toggleGoldMode}
					aria-pressed={isGoldMode}
					aria-label={isGoldMode ? "Switch to night palette" : "Switch to gold palette"}
					title={isGoldMode ? "Switch to night palette" : "Switch to gold palette"}
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						margin: "0 auto",
						width: "1.8em",
						height: "1.8em",
						padding: 0,
						border: "none",
						borderRadius: "50%",
						background: "black",
						boxShadow: "0 0 1em 0 #98c0ef",
						cursor: "pointer",
						transition: "box-shadow 1s ease-in-out",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.boxShadow = isGoldMode
							? "-0.3em 0.1em 0.2em 0 #98c0ef"
							: "-0.3em 0.1em 0.2em 0 #d8bd10";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.boxShadow = isGoldMode
							? "0 0 1em 0 #d8bd10"
							: "0 0 1em 0 #98c0ef";
					}}
				/>

				<div
					className="spotlight"
					style={{
						pointerEvents: "none",
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						margin: "0 auto",
						transition: "filter 1s ease-in-out",
						height: "42em",
						width: "100%",
						overflow: "hidden",
					}}
				>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							style={{
								borderRadius: "0 0 50% 50%",
								position: "absolute",
								left: 0,
								right: 0,
								margin: "0 auto",
								top: "3em",
								width: "30em",
								height: "max(42em, 86vh)",
								backgroundImage:
									"conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(124, 145, 182, .3) 49%, rgba(124, 145, 182, .5) 50%, rgba(124, 145, 182, .3) 51%, transparent 55%)",
								transformOrigin: "50% 0",
								filter: "blur(15px) opacity(0.5)",
								zIndex: -1,
								transform:
									i === 0 ? "rotate(20deg)" : i === 1 ? "rotate(-20deg)" : "rotate(0deg)",
								animation:
									i === 0
										? "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 17s ease-in-out infinite"
										: i === 1
											? "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 14s ease-in-out infinite"
											: "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 21s ease-in-out infinite reverse",
							}}
						/>
					))}
				</div>
			</div>

			{/* Canvas */}
			<canvas
				ref={canvasRef}
				id="particleCanvas"
				style={{
					position: "absolute",
					pointerEvents: "none",
					animation: "load 0.4s ease-in-out forwards",
					zIndex: 1,
					width: "100%",
					height: "100%",
				}}
			/>

			{/* Accent Lines */}
			<div
				className="accent-lines"
				style={{
					pointerEvents: "none",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					width: "100%",
					height: "42em",
					zIndex: 0,
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						left: 0,
						margin: "auto",
						height: "100%",
						width: "100%",
					}}
				>
					{[6, 11, 16, 24, 29].map((top, i) => (
						<div
							key={i}
							style={{
								position: "absolute",
								top: `${top}em`,
								right: 0,
								left: 0,
								margin: "auto",
								width: "100%",
								height: "1px",
								background:
									"linear-gradient(90deg, transparent, rgba(186, 215, 247, .18), transparent)",
								opacity: 0,
								transform: "scale(0)",
								animation: "accentload 2s ease-out 2.4s forwards",
							}}
						/>
					))}
				</div>
				<div
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						left: 0,
						margin: "auto",
						height: "100%",
						width: "100%",
					}}
				>
					{[24, 34, -24, -34].map((left, i) => (
						<div
							key={i}
							style={{
								position: "absolute",
								top: 0,
								left: left > 0 ? `${left}em` : "auto",
								right: left < 0 ? `${Math.abs(left)}em` : "auto",
								margin: "auto",
								width: "1px",
								height: "100%",
								background: "rgba(186, 215, 247, .18)",
								opacity: 0,
								transform: "scale(0)",
								animation: "accentload 2s ease-out 2s forwards",
							}}
						/>
					))}
				</div>
			</div>

			{/* Hero */}
			<div className="hero mx-auto flex max-w-3xl justify-center">
				<div
					className="heroT"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: "8em",
						margin: "auto",
						height: "20em",
						paddingTop: "2em",
						transform: "translateY(-1.6em)",
						opacity: 0,
						animation: "load 2s ease-in-out 0.6s forwards",
					}}
				>
					<h2
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							margin: "auto",
							width: "fit-content",
							fontSize: "7em",
							fontWeight: 600,
							color: "#9dc3f7",
							background: `
								radial-gradient(2em 2em at 50% 50%,
									transparent calc(var(--p, 0%) - 2em),
									#fff calc(var(--p, 0%) - 1em),
									#fff calc(var(--p, 0%) - 0.4em),
									transparent var(--p, 0%)
								),
								linear-gradient(0deg, #bad1f1 30%, #9dc3f7 100%)
							`,
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							textShadow: "0 2px 16px rgba(174,207,242,.24)",
							transition: "--p 3s linear",
							animation: "pulse 10s linear 1.2s infinite",
						}}
					>
						{title}
					</h2>
					<h2
						aria-hidden="true"
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							margin: "auto",
							width: "fit-content",
							fontSize: "7em",
							fontWeight: 600,
							background: `
								radial-gradient(2em 2em at 50% 50%,
									transparent calc(var(--p, 0%) - 2em),
									transparent calc(var(--p, 0%) - 1em),
									#fff calc(var(--p, 0%) - 1em),
									#fff calc(var(--p, 0%) - 0.4em),
									transparent calc(var(--p, 0%) - 0.4em),
									transparent var(--p, 0%)
								)
							`,
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							filter: "blur(16px) opacity(0.4)",
						}}
					>
						{title}
					</h2>
				</div>
			</div>

			{/* Hero P */}
			<p
				className="heroP"
				style={{
					fontSize: "1.2em",
					position: "absolute",
					left: 0,
					right: 0,
					top: "20em",
					margin: "auto",
					height: "fit-content",
					width: "fit-content",
					textAlign: "center",
					opacity: 0,
					transform: "translateY(1em)",
					animation: "load 2s ease-out 2s forwards, up 1.4s ease-out 2s forwards",
					color: "#d8ecf8",
					background: "linear-gradient(0deg, #d8ecf8 0, #98c0ef 100%)",
					backgroundClip: "text",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
				}}
			>
				{subLine1}
				{subLine2 ? (
					<>
						<br />
						{subLine2}
					</>
				) : null}
			</p>
		</div>
	);
}
