"use client";

import {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	type CSSProperties,
} from "react";
import * as THREE from "three";
import { Pause, Play, RotateCcw, ArrowLeftRight, Gauge } from "lucide-react";

// --- Default Images (used if no cardImages prop is provided) ---
// Vendored locally under /assets/cards so the component runs fully offline.
const defaultCardImages = [
	"/assets/cards/01.jpg",
	"/assets/cards/02.jpg",
	"/assets/cards/03.jpg",
	"/assets/cards/04.jpg",
	"/assets/cards/05.jpg",
];

// --- Helper function to generate ASCII-like code ---
const ASCII_CHARS =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
	let text = "";
	for (let i = 0; i < width * height; i++) {
		text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
	}
	let out = "";
	for (let i = 0; i < height; i++) {
		out += text.substring(i * width, (i + 1) * width) + "\n";
	}
	return out;
};

// --- Component Props Type Definition ---
export type ScannerCardStreamProps = {
	showControls?: boolean;
	showSpeed?: boolean;
	initialSpeed?: number;
	direction?: -1 | 1;
	cardImages?: string[];
	repeat?: number;
	cardGap?: number;
	friction?: number;
	scanEffect?: "clip" | "scramble";
};

// --- The Main Component ---
const ScannerCardStream = ({
	showControls = false,
	showSpeed = false,
	initialSpeed = 150,
	direction = -1,
	cardImages = defaultCardImages,
	repeat = 6,
	cardGap = 60,
	friction = 0.95,
	scanEffect = "scramble",
}: ScannerCardStreamProps) => {
	const [speed, setSpeed] = useState(initialSpeed);
	const [isPaused, setIsPaused] = useState(false);
	const [isScanning, setIsScanning] = useState(false);

	const cards = useMemo(() => {
		const totalCards = cardImages.length * repeat;
		return Array.from({ length: totalCards }, (_, i) => ({
			id: i,
			image: cardImages[i % cardImages.length],
			ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
		}));
	}, [cardImages, repeat]);

	const cardLineRef = useRef<HTMLDivElement>(null);
	const particleCanvasRef = useRef<HTMLCanvasElement>(null);
	const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
	const originalAscii = useRef(new Map<number, string>());

	const cardStreamState = useRef({
		position: 0,
		velocity: initialSpeed,
		direction,
		isDragging: false,
		lastMouseX: 0,
		lastDragTime: performance.now(),
		lastTime: performance.now(),
		cardLineWidth: (400 + cardGap) * cards.length,
		friction,
		minVelocity: 30,
	});

	const scannerState = useRef({ isScanning: false });

	const toggleAnimation = useCallback(() => setIsPaused((p) => !p), []);
	const resetPosition = useCallback(() => {
		if (cardLineRef.current) {
			cardStreamState.current.position =
				cardLineRef.current.parentElement?.offsetWidth || 0;
			cardStreamState.current.velocity = initialSpeed;
			cardStreamState.current.direction = direction;
			setIsPaused(false);
		}
	}, [initialSpeed, direction]);
	const changeDirection = useCallback(() => {
		cardStreamState.current.direction *= -1;
	}, []);

	// Keep the live cardLineWidth in sync when the card set changes.
	useEffect(() => {
		cardStreamState.current.cardLineWidth = (400 + cardGap) * cards.length;
	}, [cards.length, cardGap]);

	useEffect(() => {
		const cardLine = cardLineRef.current;
		const particleCanvas = particleCanvasRef.current;
		const scannerCanvas = scannerCanvasRef.current;
		if (!cardLine || !particleCanvas || !scannerCanvas) return;

		cards.forEach((card) => originalAscii.current.set(card.id, card.ascii));
		const scrambleIntervals = new Set<ReturnType<typeof setInterval>>();
		let animationFrameId: number;

		// --- Three.js ambient particle field ---
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(
			-window.innerWidth / 2,
			window.innerWidth / 2,
			125,
			-125,
			1,
			1000,
		);
		camera.position.z = 100;
		const renderer = new THREE.WebGLRenderer({
			canvas: particleCanvas,
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, 250);
		renderer.setClearColor(0x000000, 0);

		const particleCount = 400;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount);
		const alphas = new Float32Array(particleCount);

		const texCanvas = document.createElement("canvas");
		texCanvas.width = 100;
		texCanvas.height = 100;
		const texCtx = texCanvas.getContext("2d")!;
		const half = 50;
		const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
		gradient.addColorStop(0.025, "#fff");
		gradient.addColorStop(0.1, "hsl(217, 61%, 33%)");
		gradient.addColorStop(0.25, "hsl(217, 64%, 6%)");
		gradient.addColorStop(1, "transparent");
		texCtx.fillStyle = gradient;
		texCtx.arc(half, half, half, 0, Math.PI * 2);
		texCtx.fill();
		const texture = new THREE.CanvasTexture(texCanvas);

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
			velocities[i] = Math.random() * 60 + 30;
			alphas[i] = (Math.random() * 8 + 2) / 10;
		}
		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

		const material = new THREE.ShaderMaterial({
			uniforms: { pointTexture: { value: texture } },
			vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
			fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }`,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			vertexColors: false,
		});
		const particles = new THREE.Points(geometry, material);
		scene.add(particles);

		// --- 2D scanner spark field ---
		const ctx = scannerCanvas.getContext("2d")!;
		scannerCanvas.width = window.innerWidth;
		scannerCanvas.height = 300;
		type Spark = {
			x: number;
			y: number;
			vx: number;
			vy: number;
			radius: number;
			alpha: number;
			life: number;
			decay: number;
		};
		let scannerParticles: Spark[] = [];
		const baseMaxParticles = 800;
		let currentMaxParticles = baseMaxParticles;
		const scanTargetMaxParticles = 2500;
		const createScannerParticle = (): Spark => ({
			x: window.innerWidth / 2 + (Math.random() - 0.5) * 3,
			y: Math.random() * 300,
			vx: Math.random() * 0.8 + 0.2,
			vy: (Math.random() - 0.5) * 0.3,
			radius: Math.random() * 0.6 + 0.4,
			alpha: Math.random() * 0.4 + 0.6,
			life: 1.0,
			decay: Math.random() * 0.02 + 0.005,
		});
		for (let i = 0; i < baseMaxParticles; i++)
			scannerParticles.push(createScannerParticle());

		const runScrambleEffect = (element: HTMLElement, cardId: number) => {
			if (element.dataset.scrambling === "true") return;
			element.dataset.scrambling = "true";
			const originalText = originalAscii.current.get(cardId) || "";
			let scrambleCount = 0;
			const maxScrambles = 10;
			const interval = setInterval(() => {
				element.textContent = generateCode(
					Math.floor(400 / 6.5),
					Math.floor(250 / 13),
				);
				scrambleCount++;
				if (scrambleCount >= maxScrambles) {
					clearInterval(interval);
					scrambleIntervals.delete(interval);
					element.textContent = originalText;
					delete element.dataset.scrambling;
				}
			}, 30);
			scrambleIntervals.add(interval);
		};

		const updateCardEffects = () => {
			const scannerX = window.innerWidth / 2;
			const scannerWidth = 8;
			const scannerLeft = scannerX - scannerWidth / 2;
			const scannerRight = scannerX + scannerWidth / 2;
			let anyCardIsScanning = false;
			cardLine
				.querySelectorAll<HTMLElement>(".card-wrapper")
				.forEach((wrapper, index) => {
					const rect = wrapper.getBoundingClientRect();
					const normalCard =
						wrapper.querySelector<HTMLElement>(".card-normal")!;
					const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")!;
					const asciiContent = asciiCard.querySelector<HTMLElement>("pre")!;
					if (rect.left < scannerRight && rect.right > scannerLeft) {
						anyCardIsScanning = true;
						if (
							scanEffect === "scramble" &&
							wrapper.dataset.scanned !== "true"
						) {
							runScrambleEffect(asciiContent, cards[index]?.id ?? index);
						}
						wrapper.dataset.scanned = "true";
						const intersectLeft = Math.max(scannerLeft - rect.left, 0);
						const intersectRight = Math.min(
							scannerRight - rect.left,
							rect.width,
						);
						normalCard.style.setProperty(
							"--clip-right",
							`${(intersectLeft / rect.width) * 100}%`,
						);
						asciiCard.style.setProperty(
							"--clip-left",
							`${(intersectRight / rect.width) * 100}%`,
						);
					} else {
						delete wrapper.dataset.scanned;
						if (rect.right < scannerLeft) {
							normalCard.style.setProperty("--clip-right", "100%");
							asciiCard.style.setProperty("--clip-left", "100%");
						} else {
							normalCard.style.setProperty("--clip-right", "0%");
							asciiCard.style.setProperty("--clip-left", "0%");
						}
					}
				});
			setIsScanning(anyCardIsScanning);
			scannerState.current.isScanning = anyCardIsScanning;
		};

		// --- Pointer / wheel interaction (drag to scrub, flick for momentum) ---
		const pointerX = (e: MouseEvent | TouchEvent) =>
			"touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;

		const handleMouseDown = (e: MouseEvent | TouchEvent) => {
			const s = cardStreamState.current;
			s.isDragging = true;
			s.lastMouseX = pointerX(e);
			s.lastDragTime = performance.now();
			s.velocity = 0;
			cardLine.style.cursor = "grabbing";
		};
		const handleMouseMove = (e: MouseEvent | TouchEvent) => {
			const s = cardStreamState.current;
			if (!s.isDragging) return;
			const x = pointerX(e);
			const now = performance.now();
			const dx = x - s.lastMouseX;
			const dt = Math.max((now - s.lastDragTime) / 1000, 1 / 240);
			s.position += dx;
			if (dx !== 0) s.direction = dx < 0 ? -1 : 1;
			// Track instantaneous speed so a flick hands off real momentum.
			s.velocity = Math.min(Math.abs(dx) / dt, 4000);
			s.lastMouseX = x;
			s.lastDragTime = now;
		};
		const handleMouseUp = () => {
			const s = cardStreamState.current;
			if (!s.isDragging) return;
			s.isDragging = false;
			// Floor the released velocity so the stream keeps gliding.
			s.velocity = Math.max(s.velocity, initialSpeed);
			cardLine.style.cursor = "grab";
		};
		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			const s = cardStreamState.current;
			const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
			s.direction = delta < 0 ? -1 : 1;
			s.velocity = Math.min(s.velocity + Math.abs(delta) * 2, 4000);
		};

		const handleResize = () => {
			const w = window.innerWidth;
			camera.left = -w / 2;
			camera.right = w / 2;
			camera.updateProjectionMatrix();
			renderer.setSize(w, 250);
			scannerCanvas.width = w;
			scannerCanvas.height = 300;
		};

		cardLine.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
		window.addEventListener("touchmove", handleMouseMove, { passive: true });
		window.addEventListener("touchend", handleMouseUp);
		cardLine.addEventListener("wheel", handleWheel, { passive: false });
		window.addEventListener("resize", handleResize);

		const animate = (currentTime: number) => {
			const s = cardStreamState.current;
			const deltaTime = (currentTime - s.lastTime) / 1000;
			s.lastTime = currentTime;

			if (!isPaused && !s.isDragging) {
				if (s.velocity > s.minVelocity) s.velocity *= s.friction;
				s.position += s.velocity * s.direction * deltaTime;
				setSpeed(Math.round(s.velocity));
			}

			const containerWidth = cardLine.parentElement?.offsetWidth || 0;
			if (s.position < -s.cardLineWidth) s.position = containerWidth;
			else if (s.position > containerWidth) s.position = -s.cardLineWidth;
			cardLine.style.transform = `translateX(${s.position}px)`;
			updateCardEffects();

			// Ambient particles
			const time = currentTime * 0.001;
			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] += velocities[i] * 0.016;
				if (positions[i * 3] > window.innerWidth / 2 + 100)
					positions[i * 3] = -window.innerWidth / 2 - 100;
				positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
				alphas[i] = Math.max(
					0.1,
					Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05),
				);
			}
			geometry.attributes.position.needsUpdate = true;
			geometry.attributes.alpha.needsUpdate = true;
			renderer.render(scene, camera);

			// Scanner sparks
			ctx.clearRect(0, 0, window.innerWidth, 300);
			const targetCount = scannerState.current.isScanning
				? scanTargetMaxParticles
				: baseMaxParticles;
			currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;
			while (scannerParticles.length < currentMaxParticles)
				scannerParticles.push(createScannerParticle());
			while (scannerParticles.length > currentMaxParticles)
				scannerParticles.pop();
			scannerParticles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				p.life -= p.decay;
				if (p.life <= 0 || p.x > window.innerWidth)
					Object.assign(p, createScannerParticle());
				ctx.globalAlpha = p.alpha * p.life;
				ctx.fillStyle = "white";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fill();
			});

			animationFrameId = requestAnimationFrame(animate);
		};
		animationFrameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrameId);
			scrambleIntervals.forEach(clearInterval);
			cardLine.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			cardLine.removeEventListener("touchstart", handleMouseDown);
			window.removeEventListener("touchmove", handleMouseMove);
			window.removeEventListener("touchend", handleMouseUp);
			cardLine.removeEventListener("wheel", handleWheel);
			window.removeEventListener("resize", handleResize);
			geometry.dispose();
			material.dispose();
			texture.dispose();
			renderer.dispose();
		};
	}, [isPaused, cards, cardGap, friction, scanEffect, initialSpeed]);

	const ctrlBtn =
		"grid place-items-center h-9 w-9 rounded-md border border-white/10 bg-white/[0.03] text-violet-100/80 transition hover:bg-violet-500/20 hover:text-white hover:border-violet-400/40 active:scale-95";

	return (
		<main className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
			{/* Subtle vignette + grid backdrop for depth */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-[0.35]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(124,109,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,109,255,0.06) 1px, transparent 1px)",
					backgroundSize: "44px 44px",
					maskImage:
						"radial-gradient(110% 80% at 50% 50%, #000 30%, transparent 80%)",
				}}
			/>

			{showSpeed && (
				<div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-md">
					<Gauge className="h-3.5 w-3.5 text-violet-300" strokeWidth={2.2} />
					<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-100/70">
						scan rate
					</span>
					<span className="font-mono text-[13px] tabular-nums text-white">
						{String(speed).padStart(4, "0")}
					</span>
				</div>
			)}

			<canvas
				ref={particleCanvasRef}
				className="absolute top-1/2 left-0 -translate-y-1/2 w-screen h-[250px] z-0 pointer-events-none"
			/>
			<canvas
				ref={scannerCanvasRef}
				className="absolute top-1/2 left-0 -translate-y-1/2 w-screen h-[300px] z-10 pointer-events-none"
			/>

			<div
				className={`scanner-line absolute top-1/2 left-1/2 h-[280px] w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-violet-500 to-transparent rounded-full transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse ${
					isScanning ? "opacity-100" : "opacity-0"
				}`}
				style={{
					boxShadow:
						"0 0 10px #a78bfa, 0 0 20px #a78bfa, 0 0 30px #8b5cf6, 0 0 50px #6366f1",
				}}
			/>

			<div className="absolute w-screen h-[250px] flex items-center">
				<div
					ref={cardLineRef}
					className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform"
					style={{ gap: `${cardGap}px` }}
				>
					{cards.map((card) => (
						<div
							key={card.id}
							className="card-wrapper relative w-[400px] h-[250px] shrink-0"
						>
							<div
								className="card-normal card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-[2]"
								style={
									{
										clipPath: "inset(0 0 0 var(--clip-right, 0%))",
									} as CSSProperties
								}
							>
								<img
									src={card.image}
									alt="Card"
									draggable={false}
									className="w-full h-full object-cover rounded-[15px] transition-all duration-300 ease-in-out brightness-110 contrast-110 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] hover:brightness-125 hover:contrast-125"
								/>
							</div>
							<div
								className="card-ascii card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent z-[1]"
								style={
									{
										clipPath:
											"inset(0 calc(100% - var(--clip-left, 0%)) 0 0)",
									} as CSSProperties
								}
							>
								<pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
									{card.ascii}
								</pre>
							</div>
						</div>
					))}
				</div>
			</div>

			{showControls && (
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
					<button
						type="button"
						onClick={toggleAnimation}
						aria-label={isPaused ? "Play" : "Pause"}
						className={ctrlBtn}
					>
						{isPaused ? (
							<Play className="h-4 w-4" />
						) : (
							<Pause className="h-4 w-4" />
						)}
					</button>
					<button
						type="button"
						onClick={changeDirection}
						aria-label="Reverse direction"
						className={ctrlBtn}
					>
						<ArrowLeftRight className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={resetPosition}
						aria-label="Reset"
						className={ctrlBtn}
					>
						<RotateCcw className="h-4 w-4" />
					</button>
				</div>
			)}
		</main>
	);
};

export { ScannerCardStream };
