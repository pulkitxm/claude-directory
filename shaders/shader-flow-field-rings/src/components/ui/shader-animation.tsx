"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
export interface ShaderFrame {
	time: number;
	fps: number;
	uptime: number;
	channels: [number, number, number];
}
export interface ShaderAnimationProps {
	speed?: number;
	paused?: boolean;
	onFrame?: (frame: ShaderFrame) => void;
	className?: string;
	style?: React.CSSProperties;
}
export function ShaderAnimation({
	speed = 1,
	paused = false,
	onFrame,
	className,
	style,
}: ShaderAnimationProps = {}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const speedRef = useRef(speed);
	const pausedRef = useRef(paused);
	const onFrameRef = useRef(onFrame);
	speedRef.current = speed;
	pausedRef.current = paused;
	onFrameRef.current = onFrame;
	const sceneRef = useRef<{
		camera: THREE.Camera;
		scene: THREE.Scene;
		renderer: THREE.WebGLRenderer;
		uniforms: {
			time: {
				value: number;
			};
			resolution: {
				value: THREE.Vector2;
			};
		};
		animationId: number;
	} | null>(null);
	useEffect(() => {
		if (!containerRef.current) return;
		const container = containerRef.current;
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

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `;
		const camera = new THREE.Camera();
		camera.position.z = 1;
		const scene = new THREE.Scene();
		const geometry = new THREE.PlaneGeometry(2, 2);
		const uniforms = {
			time: {
				value: 1.0,
			},
			resolution: {
				value: new THREE.Vector2(),
			},
		};
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
		const onResize = () => {
			const width = container.clientWidth || 1;
			const height = container.clientHeight || 1;
			renderer.setSize(width, height, false);
			uniforms.resolution.value.x = renderer.domElement.width;
			uniforms.resolution.value.y = renderer.domElement.height;
		};
		onResize();
		const ro = new ResizeObserver(onResize);
		ro.observe(container);
		window.addEventListener("resize", onResize, false);
		const sampleChannels = (time: number): [number, number, number] => {
			const t = time * 0.05;
			const lineWidth = 0.002;
			const out: [number, number, number] = [0, 0, 0];
			for (let j = 0; j < 3; j++) {
				for (let i = 0; i < 5; i++) {
					const frac = (t - 0.01 * j + i * 0.01) % 1;
					const denom = Math.abs((frac < 0 ? frac + 1 : frac) * 5.0);
					out[j] += (lineWidth * (i * i)) / Math.max(denom, 1e-3);
				}
				out[j] = Math.min(out[j], 1);
			}
			return out;
		};
		let startTs = 0;
		let lastTs = 0;
		let fps = 0;
		const animate = (ts: number) => {
			const animationId = requestAnimationFrame(animate);
			if (sceneRef.current) sceneRef.current.animationId = animationId;
			if (startTs === 0) startTs = ts;
			if (lastTs !== 0) {
				const dt = ts - lastTs;
				if (dt > 0) fps += (1000 / dt - fps) * 0.1;
			}
			lastTs = ts;
			if (!pausedRef.current) {
				uniforms.time.value += 0.05 * speedRef.current;
			}
			renderer.render(scene, camera);
			onFrameRef.current?.({
				time: uniforms.time.value,
				fps,
				uptime: (ts - startTs) / 1000,
				channels: sampleChannels(uniforms.time.value),
			});
		};
		sceneRef.current = {
			camera,
			scene,
			renderer,
			uniforms,
			animationId: 0,
		};
		const id = requestAnimationFrame(animate);
		sceneRef.current.animationId = id;
		return () => {
			window.removeEventListener("resize", onResize);
			ro.disconnect();
			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);
				if (container.contains(renderer.domElement)) {
					container.removeChild(renderer.domElement);
				}
				renderer.dispose();
				geometry.dispose();
				material.dispose();
				sceneRef.current = null;
			}
		};
	}, []);
	return (
		<div
			ref={containerRef}
			className={className ?? "w-full h-screen"}
			style={{
				background: "#000",
				overflow: "hidden",
				...style,
			}}
		/>
	);
}
