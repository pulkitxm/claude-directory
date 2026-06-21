"use client";

import { useEffect, useRef } from "react";

declare global {
	interface Window {
		THREE: any;
	}
}

/**
 * Where the bundled Three.js r89 build lives.
 *
 * The original snippet pulled three.min.js straight off a CDN at runtime, which
 * means the component breaks the moment the page is offline or the CDN is
 * blocked. Here it is vendored into /public so the component is fully
 * self-contained — flip this to a CDN URL only if you'd rather not ship the file.
 */
const THREE_SRC = "/vendor/three.min.js";

/**
 * One shared loader for the whole app. Three.js is a global singleton, so a
 * second <ShaderAnimation /> (or React 18 StrictMode's double-mount) must reuse
 * the same <script> instead of injecting a duplicate.
 */
let threePromise: Promise<void> | null = null;
function loadThree(): Promise<void> {
	if (typeof window === "undefined") return Promise.resolve();
	if (window.THREE) return Promise.resolve();
	if (threePromise) return threePromise;

	threePromise = new Promise<void>((resolve, reject) => {
		const existing = document.querySelector<HTMLScriptElement>(
			`script[data-three-loader="true"]`,
		);
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () =>
				reject(new Error("three load failed")),
			);
			return;
		}
		const script = document.createElement("script");
		script.src = THREE_SRC;
		script.async = true;
		script.dataset.threeLoader = "true";
		script.onload = () => resolve();
		script.onerror = () => {
			threePromise = null;
			reject(new Error("three load failed"));
		};
		document.head.appendChild(script);
	});

	return threePromise;
}

export interface ShaderAnimationProps {
	/** Extra classes for the canvas host. Defaults to filling its sized parent. */
	className?: string;
	/**
	 * Animation speed multiplier applied to the shader clock each frame.
	 * 1 matches the original snippet; lower is calmer, higher is more frantic.
	 */
	speed?: number;
}

export function ShaderAnimation({
	className,
	speed = 1,
}: ShaderAnimationProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const speedRef = useRef(speed);
	speedRef.current = speed;

	const sceneRef = useRef<{
		scene: any;
		camera: any;
		renderer: any;
		uniforms: any;
		animationId: number | null;
		resizeObserver: ResizeObserver | null;
		disposed: boolean;
	}>({
		scene: null,
		camera: null,
		renderer: null,
		uniforms: null,
		animationId: null,
		resizeObserver: null,
		disposed: false,
	});

	useEffect(() => {
		const state = sceneRef.current;
		state.disposed = false;

		loadThree()
			.then(() => {
				if (state.disposed || !containerRef.current || !window.THREE) return;
				initThreeJS();
			})
			.catch((err) => {
				console.error("[ShaderAnimation] failed to load Three.js:", err);
			});

		return () => {
			state.disposed = true;
			if (state.animationId !== null) cancelAnimationFrame(state.animationId);
			if (state.resizeObserver) state.resizeObserver.disconnect();
			if (state.renderer) {
				state.renderer.dispose();
				state.renderer.forceContextLoss?.();
				const canvas = state.renderer.domElement;
				canvas?.parentNode?.removeChild(canvas);
			}
			state.scene = null;
			state.camera = null;
			state.renderer = null;
			state.uniforms = null;
			state.animationId = null;
			state.resizeObserver = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const initThreeJS = () => {
		const container = containerRef.current;
		if (!container || !window.THREE) return;

		const THREE = window.THREE;
		const state = sceneRef.current;

		container.innerHTML = "";

		const camera = new THREE.Camera();
		camera.position.z = 1;

		const scene = new THREE.Scene();
		const geometry = new THREE.PlaneBufferGeometry(2, 2);

		const uniforms = {
			time: { type: "f", value: 1.0 },
			resolution: { type: "v2", value: new THREE.Vector2() },
		};

		const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

		const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      varying vec2 vUv;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
          }
        }

        gl_FragColor = vec4(color[2],color[1],color[0],1.0);
      }
    `;

		const material = new THREE.ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
		});

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);
		renderer.domElement.style.display = "block";
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";

		state.scene = scene;
		state.camera = camera;
		state.renderer = renderer;
		state.uniforms = uniforms;

		const resize = () => {
			const rect = container.getBoundingClientRect();
			const w = Math.max(1, Math.floor(rect.width));
			const h = Math.max(1, Math.floor(rect.height));
			renderer.setSize(w, h, false);
			uniforms.resolution.value.x = renderer.domElement.width;
			uniforms.resolution.value.y = renderer.domElement.height;
		};

		resize();

		// Track the *parent box*, not just window resizes, so the field stays sharp
		// inside flex/grid layouts that change size without a window event.
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(container);
		state.resizeObserver = resizeObserver;

		const animate = () => {
			state.animationId = requestAnimationFrame(animate);
			uniforms.time.value += 0.05 * speedRef.current;
			renderer.render(scene, camera);
		};
		animate();
	};

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className={className ?? "absolute inset-0 h-full w-full"}
		/>
	);
}
