import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function FullscreenShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
    }),
    [size.width, size.height]
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.iResolution.value.set(size.width, size.height, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform vec3 iResolution; // viewport resolution (in pixels)
          uniform float iTime;      // shader playback time (in seconds)

          void mainImage(out vec4 O, vec2 I)
          {
              // Iterator, z and time
              float i, z, t = iTime;
              // Clear frag and loop 100 times (i from 0 to <1, step .01)
              O *= i;
              for(i = 0.0; i < 1.0; i += 0.01){
                  // Resolution for scaling
                  vec2 v = iResolution.xy;
                  // Center and scale outward
                  vec2 p = (I+I-v)/v.y * i;
                  // Sphere distortion and compute z
                  p /= .2 + sqrt(z = max(1.0 - dot(p,p), 0.0)) * .3;
                  // Offset for hex pattern
                  p.y += fract(ceil(p.x = p.x/.9 + t) * .5) + t * .2;
                  // Mirror quadrants
                  v = abs(fract(p) - .5);
                  // Add color and fade outward
                  O += vec4(2.0,3.0,5.0,1.0)/2e3 * z /
                       // Compute hex distance
                       (abs(max(v.x*1.5+v, v+v).y - 1.0) + .1 - i * .09);
              }
              // Tanh tonemap
              O = tanh(O*O);
          }

          void main(){
            vec4 O;
            mainImage(O, gl_FragCoord.xy);
            gl_FragColor = O;
          }
        `}
      />
    </mesh>
  );
}

export const Component = () => {
  return (
    <div className={cn("flex flex-col items-center gap-4 p-0 rounded-lg w-full h-[100vh]")}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
        {/* Black background */}
        <color attach="background" args={["#000000"]} />
        <FullscreenShader />
      </Canvas>
    </div>
  );
};
