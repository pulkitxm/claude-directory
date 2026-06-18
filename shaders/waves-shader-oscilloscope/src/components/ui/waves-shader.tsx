// ShaderComponent.tsx

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export const ShaderComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let camera: THREE.Camera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let clock: THREE.Clock;
    let uniforms: { [key: string]: THREE.IUniform };

    const init = () => {
      clock = new THREE.Clock();
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();

      // ✅ Updated geometry
      const geometry = new THREE.PlaneGeometry(2, 2);

      uniforms = {
        u_time: { value: 1.0 },
        u_resolution: { value: new THREE.Vector2() },
      };

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          gl_Position = vec4(position, 1.0);
          vUv = uv;
        }
      `;

      const fragmentShader = `
        precision highp float;

        uniform vec2 u_resolution;
        uniform float u_time;
        varying vec2 vUv;

        const float PI = 3.1415926535897932384626433832795;
        const float TAU = PI * 2.;

        void coswarp(inout vec3 trip, float warpsScale ){
          trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (u_time * .25));
          trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (u_time * .25));
          trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (u_time * .25));
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy + 0.5;

          float t = (u_time *.2) + length(fract((uv-.5) *10.));
          float t2 = (u_time *.1) + length(fract((uv-.5) *20.));

          vec2 uv2 = uv;
          vec3 w = vec3(uv.x, uv.y, 1.);
          coswarp(w, 3.);

          uv.x+= w.r;
          uv.y+= w.g;

          vec3 color = vec3(0., .5, uv2.x);
          color.r = sin(u_time *.2) + sin(length(uv-.5) * 10.);
          color.g = sin(u_time *.3) + sin(length(uv-.5) * 20.);

          coswarp(color, 3.);

          color = vec3(smoothstep(color.r, sin(t2), sin(t)));

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);

      container.appendChild(renderer.domElement);

      const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.x = renderer.domElement.width;
        uniforms.u_resolution.value.y = renderer.domElement.height;
      };

      window.addEventListener("resize", onWindowResize);
      onWindowResize();

      const animate = () => {
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-screen overflow-hidden rounded-lg")}
    />
  );
};
