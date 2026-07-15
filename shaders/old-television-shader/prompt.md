# OLD TELEVISION SHADER — COMPONENT INTEGRATION

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
old-television-shader.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"

// Custom shader material with smooth animations
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color("#ffffff"), // Vibrant orange
    uColorB: new THREE.Color("#000000"), // Hot pink
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // Fractal noise for more complex texture
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    // Smooth interpolation
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 st = vUv;
      
      // Create flowing waves
      float wave1 = sin(st.x * 8.0 + uTime * 2.0) * 0.1;
      float wave2 = sin(st.y * 6.0 + uTime * 1.5) * 0.1;
      float wave3 = sin((st.x + st.y) * 4.0 + uTime * 3.0) * 0.05;
      
      // Add mouse interaction
      vec2 mouseInfluence = (uMouse - 0.5) * 0.3;
      st += mouseInfluence;
      
      // Combine waves
      float waves = wave1 + wave2 + wave3;
      
      float noiseValue = smoothNoise(st * 3.0 + uTime * 0.5);
      float fbmNoise = fbm(st * 2.0 + uTime * 0.3);
      float combinedNoise = mix(noiseValue, fbmNoise, 0.6);
      
      // Mix colors based on waves and noise
      float mixFactor = (waves + combinedNoise + 1.0) * 0.5;
      mixFactor = smoothstep(0.2, 0.8, mixFactor);
      
      vec3 color = mix(uColorA, uColorB, mixFactor);
      
      float glow = 1.0 - distance(st, vec2(0.5)) * 1.2;
      glow = smoothstep(0.0, 1.0, glow);
      glow += combinedNoise * 0.2;
      
      color += glow * 0.15;
      
      // Add time-based brightness variation
      float brightness = 0.9 + sin(uTime * 0.8) * 0.1;
      color *= brightness;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
)

// Extend Three.js with our custom material
extend({ WaveShaderMaterial })

// TypeScript declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: any
    }
  }
}

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  // Mouse position state
  const mouse = useRef({ x: 0, y: 0 })

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    mouse.current.x = event.clientX / window.innerWidth
    mouse.current.y = 1 - event.clientY / window.innerHeight
  }

  // Set up mouse listener
  useMemo(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      // Update time uniform for animation
      materialRef.current.uTime = state.clock.elapsedTime

      // Smooth mouse interpolation
      materialRef.current.uMouse.lerp(new THREE.Vector2(mouse.current.x, mouse.current.y), 0.05)

      // Update resolution
      materialRef.current.uResolution.set(window.innerWidth, window.innerHeight)
    }
  })

  return (
    <mesh ref={meshRef} scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <waveShaderMaterial ref={materialRef} key={WaveShaderMaterial.key} />
    </mesh>
  )
}

export default function PolishedShader() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-background">
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }} className="absolute inset-0">
        <ShaderPlane />
      </Canvas>
    </div>
  )
}



demo.tsx
import PolishedShader from "@/components/ui/old-television-shader"

export default function Home() {
  return <PolishedShader />
}
```

INSTALL NPM DEPENDENCIES:

```bash
three, @react-three/drei, @react-three/fiber
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
