import { useEffect, useRef, useState } from "react"

export interface CanvasSignature {
	/** Mean RGB of the live shader canvas, 0..255 each. */
	rgb: [number, number, number]
	/** Mean luminance 0..1. */
	lum: number
}

/**
 * Samples the live shader's <canvas> a few times per second and reports its mean
 * colour back out — the lab's "the readout is driven by the shader itself" loop.
 *
 * It draws the canvas into a tiny 16x10 offscreen 2D canvas and averages the
 * pixels. WebGL canvases created without `preserveDrawingBuffer` can read back as
 * empty via drawImage in some browsers; when that happens we simply keep the last
 * good sample, so the HUD never flickers to black.
 */
export function useCanvasSignature(
	target: React.RefObject<HTMLElement | null>,
	intervalMs = 350,
): CanvasSignature {
	const [sig, setSig] = useState<CanvasSignature>({ rgb: [12, 9, 7], lum: 0.04 })
	const scratch = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (typeof document === "undefined") return
		const off = document.createElement("canvas")
		off.width = 16
		off.height = 10
		scratch.current = off
		const ctx = off.getContext("2d", { willReadFrequently: true })

		const tick = () => {
			const host = target.current
			const canvas = host?.querySelector("canvas")
			if (!canvas || !ctx) return
			try {
				ctx.clearRect(0, 0, off.width, off.height)
				ctx.drawImage(canvas, 0, 0, off.width, off.height)
				const { data } = ctx.getImageData(0, 0, off.width, off.height)
				let r = 0
				let g = 0
				let b = 0
				let n = 0
				for (let i = 0; i < data.length; i += 4) {
					r += data[i]
					g += data[i + 1]
					b += data[i + 2]
					n++
				}
				if (n === 0) return
				const mr = Math.round(r / n)
				const mg = Math.round(g / n)
				const mb = Math.round(b / n)
				// Skip all-black reads (empty buffer); keep the previous good sample.
				if (mr + mg + mb === 0) return
				const lum = (0.2126 * mr + 0.7152 * mg + 0.0722 * mb) / 255
				setSig({ rgb: [mr, mg, mb], lum })
			} catch {
				/* keep last good sample */
			}
		}

		const id = window.setInterval(tick, intervalMs)
		tick()
		return () => window.clearInterval(id)
	}, [target, intervalMs])

	return sig
}
