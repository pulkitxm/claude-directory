import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * TideCanvas — the page signature.
 *
 * A field of slow horizontal light bands, like an aurora reflected on dark
 * water. Layered sine waves drift continuously and lean gently toward the
 * pointer, so the surface feels alive without ever demanding attention — the
 * visual analogue of being in a deep-focus current.
 *
 * Honors prefers-reduced-motion by painting a single still frame.
 */
export function TideCanvas({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let raf = 0;
		let w = 0;
		let h = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

		// band palette (tide -> coral), as [r,g,b]
		const bands = [
			{
				color: [61, 212, 200],
				amp: 26,
				freq: 1.7,
				speed: 0.16,
				y: 0.34,
				a: 0.5,
			},
			{
				color: [111, 233, 221],
				amp: 18,
				freq: 2.4,
				speed: -0.22,
				y: 0.46,
				a: 0.42,
			},
			{
				color: [255, 122, 147],
				amp: 30,
				freq: 1.3,
				speed: 0.12,
				y: 0.62,
				a: 0.34,
			},
			{
				color: [255, 184, 119],
				amp: 22,
				freq: 2.0,
				speed: -0.18,
				y: 0.74,
				a: 0.22,
			},
		];

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			w = rect.width;
			h = rect.height;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const drawBand = (
			band: (typeof bands)[number],
			t: number,
			lean: number,
		) => {
			const baseY = band.y * h + lean * 34;
			const [r, g, b] = band.color;
			const grad = ctx.createLinearGradient(0, baseY - 90, 0, baseY + 90);
			grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
			grad.addColorStop(0.5, `rgba(${r},${g},${b},${band.a})`);
			grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

			ctx.beginPath();
			ctx.moveTo(0, baseY);
			const step = Math.max(8, w / 80);
			for (let x = 0; x <= w + step; x += step) {
				const p = x / w;
				const y =
					baseY +
					Math.sin(p * Math.PI * band.freq + t * band.speed) * band.amp +
					Math.sin(p * Math.PI * band.freq * 2.3 + t * band.speed * 1.7) *
						(band.amp * 0.35);
				ctx.lineTo(x, y);
			}
			ctx.lineTo(w, h);
			ctx.lineTo(0, h);
			ctx.closePath();
			ctx.fillStyle = grad;
			ctx.fill();
		};

		const render = (time: number) => {
			const t = time / 1000;
			// ease pointer toward target
			pointer.x += (pointer.tx - pointer.x) * 0.05;
			pointer.y += (pointer.ty - pointer.y) * 0.05;
			const lean = (pointer.y - 0.4) * 1.2;

			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = "lighter";
			for (const band of bands) drawBand(band, t, lean + (pointer.x - 0.5));
			ctx.globalCompositeOperation = "source-over";

			if (!reduce) raf = requestAnimationFrame(render);
		};

		const onPointer = (e: PointerEvent) => {
			pointer.tx = e.clientX / window.innerWidth;
			pointer.ty = e.clientY / window.innerHeight;
		};

		resize();
		window.addEventListener("resize", resize);
		if (!reduce) {
			window.addEventListener("pointermove", onPointer);
			raf = requestAnimationFrame(render);
		} else {
			render(0);
		}

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointer);
		};
	}, []);

	return (
		<canvas
			ref={ref}
			aria-hidden="true"
			className={cn("h-full w-full", className)}
		/>
	);
}
