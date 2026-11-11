"use client";
import { useEffect, useRef } from "react";
import * as THREE_LIBRARY from "three";
function loadThree() {
	return Promise.resolve();
}
export interface ShaderAnimationProps {
	className?: string;
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
				if (state.disposed || !containerRef.current || !THREE_LIBRARY) return;
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
	}, []);
	function initThreeJS() {
		const container = containerRef.current;
		if (!container || !THREE_LIBRARY) return;
		const THREE = THREE_LIBRARY;
		const state = sceneRef.current;
		container.innerHTML = "";
		const camera = new THREE.Camera();
		camera.position.z = 1;
		const scene = new THREE.Scene();
		const geometry = new THREE.PlaneGeometry(2, 2);
		const uniforms = {
			time: {
				type: "f",
				value: 1.0,
			},
			resolution: {
				type: "v2",
				value: new THREE.Vector2(),
			},
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
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
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
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(container);
		state.resizeObserver = resizeObserver;
		const animate = () => {
			state.animationId = requestAnimationFrame(animate);
			uniforms.time.value += 0.05 * speedRef.current;
			renderer.render(scene, camera);
		};
		animate();
	}
	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className={className ?? "absolute inset-0 h-full w-full"}
		/>
	);
}
