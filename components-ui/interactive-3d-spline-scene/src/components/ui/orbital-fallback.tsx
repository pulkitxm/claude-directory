import { useEffect, useRef } from "react";

/**
 * OrbitalFallback — a self-contained, dependency-free animated 3D-ish visual
 * rendered to a <canvas>. It stands in for the remote Spline scene whenever that
 * scene can't load (network blocked, offline clone, WebGL unavailable, or a
 * loader error). It keeps the hero looking alive without any external asset, so
 * the project is fully runnable offline.
 *
 * It is intentionally NOT a literal copy of the Spline robot — it's an original
 * particle-orb composition: a wireframe globe of orbiting nodes with a glowing
 * core, plus parallax that tracks the pointer, echoing the "interactive 3D"
 * feel of the real scene.
 */
export function OrbitalFallback({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// Pointer target in normalized [-1, 1] space; smoothed every frame.
	const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
	const raf = useRef<number>(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let dpr = Math.min(window.devicePixelRatio || 1, 2);
		let W = 0;
		let H = 0;

		const resize = () => {
			const parent = canvas.parentElement;
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			W = Math.max(1, rect.width);
			H = Math.max(1, rect.height);
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(W * dpr);
			canvas.height = Math.round(H * dpr);
			canvas.style.width = `${W}px`;
			canvas.style.height = `${H}px`;
		};
		resize();

		const ro = new ResizeObserver(resize);
		if (canvas.parentElement) ro.observe(canvas.parentElement);

		// --- Build a fibonacci sphere of nodes -----------------------------------
		type Node = { x: number; y: number; z: number };
		const COUNT = 320;
		const nodes: Node[] = [];
		const golden = Math.PI * (3 - Math.sqrt(5));
		for (let i = 0; i < COUNT; i++) {
			const y = 1 - (i / (COUNT - 1)) * 2;
			const r = Math.sqrt(1 - y * y);
			const theta = golden * i;
			nodes.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
		}

		const onPointer = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			pointer.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			pointer.current.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
		};
		const onLeave = () => {
			pointer.current.tx = 0;
			pointer.current.ty = 0;
		};
		window.addEventListener("pointermove", onPointer);
		canvas.parentElement?.addEventListener("pointerleave", onLeave);

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const start = performance.now();
		const render = (now: number) => {
			const t = (now - start) / 1000;
			const p = pointer.current;
			p.x += (p.tx - p.x) * 0.06;
			p.y += (p.ty - p.y) * 0.06;

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, W, H);

			const cx = W * 0.5;
			const cy = H * 0.52;
			const radius = Math.min(W, H) * 0.34;

			// Auto-rotation + pointer-driven tilt.
			const ay = (reduce ? 0 : t * 0.28) + p.x * 0.6;
			const ax = -0.22 + p.y * 0.45;
			const cosY = Math.cos(ay);
			const sinY = Math.sin(ay);
			const cosX = Math.cos(ax);
			const sinX = Math.sin(ax);

			type P = { sx: number; sy: number; depth: number; scale: number };
			const projected: P[] = nodes.map((n) => {
				// rotate Y
				const x = n.x * cosY - n.z * sinY;
				let z = n.x * sinY + n.z * cosY;
				let y = n.y;
				// rotate X
				const y2 = y * cosX - z * sinX;
				const z2 = y * sinX + z * cosX;
				y = y2;
				z = z2;
				const persp = 1 / (2.4 - z); // z in [-1,1]
				return {
					sx: cx + x * radius * persp * 2.4,
					sy: cy + y * radius * persp * 2.4,
					depth: z,
					scale: persp,
				};
			});

			// Connective filaments between nearby nodes (drawn back-to-front faintly).
			ctx.lineWidth = 1;
			for (let i = 0; i < projected.length; i += 2) {
				const a = projected[i];
				for (let j = i + 1; j < i + 7 && j < projected.length; j++) {
					const b = projected[j];
					const dx = a.sx - b.sx;
					const dy = a.sy - b.sy;
					const d2 = dx * dx + dy * dy;
					if (d2 > radius * radius * 0.16) continue;
					const alpha = (1 - Math.sqrt(d2) / (radius * 0.4)) * 0.16;
					ctx.strokeStyle = `rgba(167, 139, 250, ${alpha.toFixed(3)})`;
					ctx.beginPath();
					ctx.moveTo(a.sx, a.sy);
					ctx.lineTo(b.sx, b.sy);
					ctx.stroke();
				}
			}

			// Glowing core.
			const coreR = radius * 0.92;
			const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
			g.addColorStop(0, "rgba(129, 140, 248, 0.55)");
			g.addColorStop(0.35, "rgba(99, 102, 241, 0.22)");
			g.addColorStop(1, "rgba(15, 23, 42, 0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
			ctx.fill();

			// Nodes, painter-sorted so nearer ones sit on top and glow brighter.
			projected
				.map((p2, i) => ({ p2, i }))
				.sort((a, b) => a.p2.depth - b.p2.depth)
				.forEach(({ p2 }) => {
					const front = (p2.depth + 1) / 2; // 0 back -> 1 front
					const r = 0.6 + p2.scale * 2.2 * (0.5 + front);
					const alpha = 0.25 + front * 0.75;
					ctx.beginPath();
					ctx.fillStyle = `rgba(${Math.round(196 - front * 30)}, ${Math.round(
						181 + front * 20,
					)}, 253, ${alpha.toFixed(3)})`;
					ctx.arc(p2.sx, p2.sy, r, 0, Math.PI * 2);
					ctx.fill();
				});

			// A couple of sweeping highlight rings for a "scan" feel.
			if (!reduce) {
				for (let k = 0; k < 2; k++) {
					const phase = (t * 0.5 + k * 0.5) % 1;
					const rr = radius * (0.4 + phase * 1.0);
					ctx.strokeStyle = `rgba(125, 211, 252, ${((1 - phase) * 0.18).toFixed(
						3,
					)})`;
					ctx.lineWidth = 1.5;
					ctx.beginPath();
					ctx.ellipse(cx, cy, rr, rr * 0.34, 0, 0, Math.PI * 2);
					ctx.stroke();
				}
			}

			raf.current = requestAnimationFrame(render);
		};
		raf.current = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(raf.current);
			ro.disconnect();
			window.removeEventListener("pointermove", onPointer);
			canvas.parentElement?.removeEventListener("pointerleave", onLeave);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			data-testid="orbital-fallback"
		/>
	);
}
