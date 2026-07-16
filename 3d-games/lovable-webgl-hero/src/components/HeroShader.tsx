import { useEffect, useRef, useState } from "react";
import { vendorAsset } from "@/lib/assets";

declare global {
	interface Window {
		_heroProjectData?: unknown;
		CoreRenderer?: { init: () => Promise<void> };
	}
}

async function loadScript(src: string) {
	const cacheKey = `__loaded_${src}`;
	if ((window as unknown as Record<string, boolean>)[cacheKey]) return;
	const res = await fetch(src, { credentials: "include" });
	if (!res.ok) throw new Error(`fetch ${src} -> ${res.status}`);
	const text = (await res.text()).replaceAll(
		'"/vendor/',
		`"${vendorAsset("")}`,
	);
	new Function(text).call(window);
	(window as unknown as Record<string, boolean>)[cacheKey] = true;
}

export default function HeroShader({ className = "" }: { className?: string }) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let cancelled = false;
		let blobUrl: string | null = null;

		(async () => {
			try {
				await loadScript(vendorAsset("core-renderer.js"));
				await loadScript(vendorAsset("hero-project.js"));
				if (cancelled) return;

				const projectData = window._heroProjectData;
				const container = containerRef.current;
				if (!projectData || !container || !window.CoreRenderer) return;

				const blob = new Blob([JSON.stringify(projectData)], {
					type: "application/json",
				});
				blobUrl = URL.createObjectURL(blob);
				container.setAttribute("data-cr-project-src", blobUrl);

				await window.CoreRenderer.init();
				if (blobUrl) URL.revokeObjectURL(blobUrl);

				if (!cancelled) {
					setTimeout(() => {
						if (!cancelled) setReady(true);
					}, 250);
				}

				window.dispatchEvent(
					new MouseEvent("mousemove", {
						clientX: window.innerWidth / 2,
						clientY: window.innerHeight / 2,
						bubbles: true,
					}),
				);
			} catch (err) {
				console.error("[HeroShader] init failed", err);
			}
		})();

		return () => {
			cancelled = true;
			if (blobUrl) URL.revokeObjectURL(blobUrl);
		};
	}, []);

	return (
		<div
			id="hero-canvas"
			ref={containerRef}
			className={className}
			style={{
				position: "absolute",
				inset: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 0,
				overflow: "hidden",
				opacity: ready ? 1 : 0,
				transform: ready ? "translateY(0)" : "translateY(40px)",
				transition:
					"opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
				willChange: "opacity, transform",
			}}
		/>
	);
}
