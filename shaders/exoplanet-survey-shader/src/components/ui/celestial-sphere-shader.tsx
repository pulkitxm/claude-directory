import type React from "react";
import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_cloud_density;
  uniform float u_glow_intensity;

  float random(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898,78.233,151.7182))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f*f*(3.0 - 2.0*f);

    return mix(
      mix(mix(random(i+vec3(0,0,0)), random(i+vec3(1,0,0)), u.x),
          mix(random(i+vec3(0,1,0)), random(i+vec3(1,1,0)), u.x), u.y),
      mix(mix(random(i+vec3(0,0,1)), random(i+vec3(1,0,1)), u.x),
          mix(random(i+vec3(0,1,1)), random(i+vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 6; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float d = 1.0 - dot(uv, uv);
    if (d < 0.0) discard;
    vec3 pos = vec3(uv, sqrt(d));
    vec3 coord = pos * u_cloud_density + u_time * 0.1;
    float c = fbm(coord);
    vec3 nebula = mix(u_color1, u_color2, smoothstep(0.4, 0.6, c));
    float fresnel = pow(1.0 - dot(normalize(pos), vec3(0,0,1)), 2.0)
                    * u_glow_intensity;
    vec3 glow = fresnel * u_color2;

    gl_FragColor = vec4(nebula + glow, 1.0);
  }
`;

export interface SphereTelemetry {
	elapsed: number;

	fps: number;

	rotation: number;
}

export interface ShaderCanvasProps {
	color1?: THREE.Color | string | number;
	color2?: THREE.Color | string | number;
	cloudDensity?: number;
	glowIntensity?: number;
	rotationSpeed?: number;

	fill?: boolean;

	onFrame?: (t: SphereTelemetry) => void;
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = memo(
	({
		color1 = 0xff4444,
		color2 = 0x4444ff,
		cloudDensity = 2.0,
		glowIntensity = 1.0,
		rotationSpeed = 0.5,
		fill = false,
		onFrame,
	}) => {
		const mountRef = useRef<HTMLDivElement>(null);
		const onFrameRef = useRef(onFrame);
		onFrameRef.current = onFrame;
		const rotationSpeedRef = useRef(rotationSpeed);
		rotationSpeedRef.current = rotationSpeed;

		const threeRef = useRef<{
			renderer?: THREE.WebGLRenderer;
			scene?: THREE.Scene;
			camera?: THREE.PerspectiveCamera;
			uniforms?: {
				u_time: { value: number };
				u_color1: { value: THREE.Color };
				u_color2: { value: THREE.Color };
				u_cloud_density: { value: number };
				u_glow_intensity: { value: number };
			};
			sphere?: THREE.Mesh;
			clock?: THREE.Clock;
		}>({});

		useEffect(() => {
			const container = mountRef.current;
			if (!container) return;
			const measure = () =>
				fill
					? { w: container.clientWidth, h: container.clientHeight }
					: { w: window.innerWidth, h: window.innerHeight };
			const scene = new THREE.Scene();
			const start = measure();
			const camera = new THREE.PerspectiveCamera(
				75,
				start.w / start.h,
				0.1,
				1000,
			);
			camera.position.z = 1;
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(start.w, start.h);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 1);
			container.appendChild(renderer.domElement);
			const uniforms = {
				u_time: { value: 0.0 },
				u_color1: { value: new THREE.Color(color1) },
				u_color2: { value: new THREE.Color(color2) },
				u_cloud_density: { value: cloudDensity },
				u_glow_intensity: { value: glowIntensity },
			};
			const geo = new THREE.SphereGeometry(0.6, 64, 64);
			const mat = new THREE.ShaderMaterial({
				uniforms,
				vertexShader,
				fragmentShader,
				transparent: false,
			});
			const sphere = new THREE.Mesh(geo, mat);
			scene.add(sphere);

			const clock = new THREE.Clock();
			threeRef.current = { renderer, scene, camera, uniforms, sphere, clock };
			function onResize() {
				const { w, h } = measure();
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			}
			window.addEventListener("resize", onResize);
			const ro = fill ? new ResizeObserver(onResize) : null;
			ro?.observe(container);
			onResize();
			let raf: number;
			let fpsEMA = 60;
			const loop = () => {
				const { clock, sphere } = threeRef.current;
				const delta = clock?.getDelta();
				if (sphere)
					sphere.rotation.y += (delta ?? 0) * rotationSpeedRef.current;
				uniforms.u_time.value = clock?.getElapsedTime();

				renderer.render(scene, camera);
				if (delta > 0) fpsEMA = fpsEMA * 0.9 + (1 / delta) * 0.1;
				onFrameRef.current?.({
					elapsed: uniforms.u_time.value,
					fps: fpsEMA,
					rotation: sphere?.rotation.y,
				});

				raf = requestAnimationFrame(loop);
			};
			loop();
			return () => {
				cancelAnimationFrame(raf);
				window.removeEventListener("resize", onResize);
				ro?.disconnect();
				geo.dispose();
				mat.dispose();
				renderer.dispose();
				if (container.contains(renderer.domElement)) {
					container.removeChild(renderer.domElement);
				}
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [fill, glowIntensity, color2, color1, cloudDensity]);
		useEffect(() => {
			const u = threeRef.current.uniforms;
			if (!u) return;
			u.u_color1.value.set(color1);
			u.u_color2.value.set(color2);
			u.u_cloud_density.value = cloudDensity;
			u.u_glow_intensity.value = glowIntensity;
		}, [color1, color2, cloudDensity, glowIntensity]);

		return (
			<div
				ref={mountRef}
				style={{
					position: fill ? "absolute" : "fixed",
					inset: 0,
					width: fill ? "100%" : "100vw",
					height: fill ? "100%" : "100vh",
					backgroundColor: "#000",
				}}
			/>
		);
	},
);

ShaderCanvas.displayName = "ShaderCanvas";

export default ShaderCanvas;
