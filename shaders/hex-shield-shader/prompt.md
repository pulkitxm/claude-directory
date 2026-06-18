YOU ARE GIVEN A TASK TO INTEGRATE AN EXISTING REACT COMPONENT IN THE CODEBASE

THE CODEBASE SHOULD SUPPORT:

- SHADCN PROJECT STRUCTURE
- TAILWIND CSS
- TYPESCRIPT

IF IT DOESN'T, PROVIDE INSTRUCTIONS ON HOW TO SETUP PROJECT VIA SHADCN CLI, INSTALL TAILWIND OR TYPESCRIPT.

DETERMINE THE DEFAULT PATH FOR COMPONENTS AND STYLES.
IF DEFAULT PATH FOR COMPONENTS IS NOT /COMPONENTS/UI, PROVIDE INSTRUCTIONS ON WHY IT'S IMPORTANT TO CREATE THIS FOLDER
COPY-PASTE THIS COMPONENT TO /COMPONENTS/UI FOLDER:

```tsx
shield-shader.tsx
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


demo.tsx
import { Component } from "@/components/ui/shield-shader";

export default function DemoOne() {
  return <Component />;
}
```

INSTALL NPM DEPENDENCIES:

```bash
three, @react-three/fiber
```

## IMPLEMENTATION GUIDELINES

1. ANALYZE THE COMPONENT STRUCTURE AND IDENTIFY ALL REQUIRED DEPENDENCIES
2. REVIEW THE COMPONENT'S ARGUMENS AND STATE
3. IDENTIFY ANY REQUIRED CONTEXT PROVIDERS OR HOOKS AND INSTALL THEM
4. QUESTIONS TO ASK

- WHAT DATA/PROPS WILL BE PASSED TO THIS COMPONENT?
- ARE THERE ANY SPECIFIC STATE MANAGEMENT REQUIREMENTS?
- ARE THERE ANY REQUIRED ASSETS (IMAGES, ICONS, ETC.)?
- WHAT IS THE EXPECTED RESPONSIVE BEHAVIOR?
- WHAT IS THE BEST PLACE TO USE THIS COMPONENT IN THE APP?

## STEPS TO INTEGRATE

0. COPY PASTE ALL THE CODE ABOVE IN THE CORRECT DIRECTORIES
1. INSTALL EXTERNAL DEPENDENCIES
2. FILL IMAGE ASSETS WITH UNSPLASH STOCK IMAGES YOU KNOW EXIST
3. USE LUCIDE-REACT ICONS FOR SVGS OR LOGOS IF COMPONENT REQUIRES THEM
