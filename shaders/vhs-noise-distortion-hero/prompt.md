# VHS HERO SECTION WITH NOISE — REACT COMPONENT INTEGRATION

YOU ARE GIVEN A TASK TO INTEGRATE AN EXISTING REACT COMPONENT IN THE CODEBASE

THE CODEBASE SHOULD SUPPORT:

- SHADCN PROJECT STRUCTURE
- TAILWIND CSS
- TYPESCRIPT

IF IT DOESN'T, PROVIDE INSTRUCTIONS ON HOW TO SETUP PROJECT VIA SHADCN CLI, INSTALL TAILWIND OR TYPESCRIPT.

DETERMINE THE DEFAULT PATH FOR COMPONENTS AND STYLES.
IF DEFAULT PATH FOR COMPONENTS IS NOT `/COMPONENTS/UI`, PROVIDE INSTRUCTIONS ON WHY IT'S IMPORTANT TO CREATE THIS FOLDER

COPY-PASTE THIS COMPONENT TO `/COMPONENTS/UI` FOLDER:

```tsx
vhs-hero-section.tsx
"use client"

import { gsap } from "gsap"
import { useFrame, Canvas } from "@react-three/fiber"
import type { Points } from "three"
import type { ShaderMaterial } from "three"
import type * as THREE from "three"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Button } from "/src/components/ui/button"

interface DistortionBackgroundProps {
  mousePosition: { x: number; y: number }
}

function DistortionBackground({ mousePosition }: DistortionBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: [0, 0] },
      uResolution: { value: [window.innerWidth, window.innerHeight] },
      uNoiseScale: { value: 8.0 },
      uDistortionStrength: { value: 0.3 },
    }),
    [],
  )

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uDistortionStrength;

    // Noise function
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vUv = uv;

      vec3 pos = position;

      // Add vertex distortion
      float n1 = noise(uv * 10.0 + uTime * 0.5);
      float n2 = noise(uv * 20.0 - uTime * 0.3);

      pos.z += sin(pos.x * 5.0 + uTime * 2.0) * uDistortionStrength * n1;
      pos.z += cos(pos.y * 8.0 + uTime * 1.5) * uDistortionStrength * n2;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uNoiseScale;
    uniform float uDistortionStrength;
    varying vec2 vUv;

    // Enhanced noise functions
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;

      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    vec3 distortedNoise(vec2 uv) {
      vec2 st = uv * uNoiseScale;

      // Create complex distortion
      float time = uTime * 0.5;
      vec2 q = vec2(fbm(st + vec2(0.0, 0.0)),
                    fbm(st + vec2(5.2, 1.3)));

      vec2 r = vec2(fbm(st + 4.0 * q + vec2(1.7 - time * 0.15, 9.2)),
                    fbm(st + 4.0 * q + vec2(8.3 - time * 0.126, 2.8)));

      float f = fbm(st + r);

      // Mouse interaction distortion
      vec2 mouseInfluence = (uMouse - 0.5) * 2.0;
      float mouseDistance = length(uv - (uMouse * 0.5 + 0.5));
      float mouseEffect = 1.0 - smoothstep(0.0, 0.6, mouseDistance);

      // Add glitch effect
      float glitch = step(0.98, random(vec2(floor(uTime * 10.0), floor(uv.y * 50.0))));
      f += glitch * 0.5;

      // Color mapping with distortion
      vec3 color = vec3(0.0);

      color.r = f * f * f + 0.6 * f * f + 0.5 * f;
      color.g = f * f * f * f + 0.4 * f * f + 0.2 * f;
      color.b = f * f * f * f * f * f + 0.7 * f * f + 0.5 * f;

      // Add noise texture
      float noiseTexture = random(uv * 100.0 + time);
      color += noiseTexture * 0.1;

      // Mouse interaction color shift
      color += mouseEffect * vec3(0.3, 0.1, 0.2);

      // Scanline effect
      float scanline = sin(uv.y * 800.0) * 0.04;
      color += scanline;

      return color;
    }

    void main() {
      vec2 uv = vUv;

      // Add chromatic aberration
      float aberration = 0.005;
      vec3 color;
      color.r = distortedNoise(uv + vec2(aberration, 0.0)).r;
      color.g = distortedNoise(uv).g;
      color.b = distortedNoise(uv - vec2(aberration, 0.0)).b;

      // Add film grain
      float grain = random(uv + uTime) * 0.1;
      color += grain;

      // Vignette effect
      float vignette = 1.0 - length(uv - 0.5) * 1.2;
      color *= vignette;

      // Contrast and saturation boost
      color = pow(color, vec3(1.2));
      color *= 1.3;

      gl_FragColor = vec4(color, 0.95);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value = [mousePosition.x, mousePosition.y]

      // Dynamic distortion based on time
      const distortion = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      materialRef.current.uniforms.uDistortionStrength.value = distortion
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[25, 25, 100, 100]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  )
}


interface NoiseParticlesProps {
  count: number
  mousePosition: { x: number; y: number }
}

function NoiseParticles({ count, mousePosition }: NoiseParticlesProps) {
  const pointsRef = useRef<Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // Noise-based colors (red, white, cyan)
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i3] = 1.0 // Red
        colors[i3 + 1] = 0.0
        colors[i3 + 2] = 0.0
      } else if (colorChoice < 0.66) {
        colors[i3] = 1.0 // White
        colors[i3 + 1] = 1.0
        colors[i3 + 2] = 1.0
      } else {
        colors[i3] = 0.0 // Cyan
        colors[i3 + 1] = 1.0
        colors[i3 + 2] = 1.0
      }

      sizes[i] = Math.random() * 0.03 + 0.01
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Chaotic movement
        positions[i3] += (Math.random() - 0.5) * 0.02
        positions[i3 + 1] += (Math.random() - 0.5) * 0.02
        positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 3 + i * 0.1) * 0.01

        // Mouse repulsion
        const mouseInfluence =
          1 / (1 + Math.abs(positions[i3] - mousePosition.x * 10) + Math.abs(positions[i3 + 1] - mousePosition.y * 10))
        if (mouseInfluence > 0.1) {
          positions[i3] += (Math.random() - 0.5) * 0.1
          positions[i3 + 1] += (Math.random() - 0.5) * 0.1
        }

        // Boundary wrapping
        if (Math.abs(positions[i3]) > 10) positions[i3] *= -0.8
        if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= -0.8
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} sizeAttenuation blending={2} />
    </points>
  )
}


interface GlitchTextProps {
  text: string
  className?: string
  fontSize?: string
  fontFamily?: string
  fontWeight?: string
  color?: string
  glitchIntensity?: number
  glitchFrequency?: number
}

export function GlitchText({
  text,
  className = "",
  fontSize = "4rem",
  fontFamily = "inherit",
  fontWeight = "900",
  color = "#ffffff",
  glitchIntensity = 0.8,
  glitchFrequency = 100,
}: GlitchTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const originalText = text

    // Create glitch effect
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const glitchAnimation = () => {
      if (Math.random() > 1 - glitchIntensity * 0.05) {
        // Random glitch based on intensity
        const glitchedText = originalText
          .split("")
          .map((char) => {
            if (Math.random() > 1 - glitchIntensity * 0.2) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join("")

        element.textContent = glitchedText

        setTimeout(
          () => {
            element.textContent = originalText
          },
          50 + Math.random() * (100 * glitchIntensity),
        )
      }
    }

    const interval = setInterval(glitchAnimation, glitchFrequency)

    // GSAP glitch effects with intensity
    gsap.to(element, {
      textShadow: `${2 * glitchIntensity}px 0 #ff0000, ${-2 * glitchIntensity}px 0 #00ffff`,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    return () => {
      clearInterval(interval)
    }
  }, [text, glitchIntensity, glitchFrequency])

  return (
    <h1
      ref={textRef}
      className={`${className} relative`}
      style={{
        fontSize,
        fontFamily,
        fontWeight,
        color,
        textShadow: `2px 0 #ff0000, -2px 0 #00ffff, 0 0 20px rgba(255, 255, 255, 0.5)`,
      }}
    >
      {text}
    </h1>
  )
}

export default function DistortHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 100,
        scale: 0.8,
        filter: "blur(10px)",
      })

      gsap.set(canvasRef.current, {
        opacity: 0,
        scale: 1.2,
      })

      // Create aggressive timeline
      const tl = gsap.timeline({ delay: 0.2 })

      // Canvas entrance with distortion
      tl.to(canvasRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power4.out",
      })

      // Aggressive text entrance
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "back.out(2)",
        },
        "-=1.5",
      )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1",
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )

      // Glitch effects
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
      glitchTl
        .to(heroRef.current, {
          filter: "hue-rotate(180deg) saturate(2)",
          duration: 0.1,
        })
        .to(heroRef.current, {
          filter: "none",
          duration: 0.1,
        })
        .to(heroRef.current, {
          x: 5,
          duration: 0.05,
        })
        .to(heroRef.current, {
          x: -5,
          duration: 0.05,
        })
        .to(heroRef.current, {
          x: 0,
          duration: 0.05,
        })

      // Mouse interaction chaos
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30
        const y = (e.clientY / window.innerHeight - 0.5) * 30

        gsap.to(titleRef.current, {
          x: x * 0.1,
          y: y * 0.05,
          rotationX: y * 0.02,
          rotationY: x * 0.02,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Distorted WebGL Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: "linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)" }}
        >
          <DistortionBackground mousePosition={mousePosition} />
          <NoiseParticles count={800} mousePosition={mousePosition} />
        </Canvas>
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Content */}
      <div ref={heroRef} className="relative z-20 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          <div ref={titleRef}>
            <GlitchText
              text="VHS HERO SECTION"
              fontSize="clamp(4rem, 12vw, 12rem)"
              fontFamily="'Courier New', monospace"
              fontWeight="900"
              color="#ffffff"
              glitchIntensity={0.9}
              glitchFrequency={80}
              className="leading-none tracking-tighter"
            />
          </div>

          <div className="mt-4">
            <GlitchText
              text="WITH NOISE"
              fontSize="clamp(1.5rem, 4vw, 3rem)"
              fontFamily="'Courier New', monospace"
              fontWeight="400"
              color="#ff0000"
              glitchIntensity={0.6}
              glitchFrequency={150}
              className="tracking-widest opacity-80"
            />
          </div>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-red-400 mb-12 max-w-3xl mx-auto leading-relaxed font-mono tracking-wider uppercase"
            style={{
              textShadow: "0 0 10px rgba(255, 0, 0, 0.5), 2px 0 #00ffff, -2px 0 #ff0000",
            }}
          >
            {">"} REALITY.CORRUPTED {"<"}
            <br />
            {">"} NOISE.AMPLIFIED {"<"}
          </p>

          <div ref={buttonRef}>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-red-600/20 backdrop-blur-sm border-2 border-red-500 text-red-400 hover:bg-red-600/40 hover:text-white px-10 py-4 text-lg font-mono uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">
                {">"} ENTER_CHAOS {"<"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Glitch UI Elements */}
      <div className="absolute top-8 left-8 z-30">
        <div className="text-red-400 font-mono text-xs tracking-wider">{">"} SYSTEM.CORRUPTED</div>
      </div>

      <div className="absolute top-8 right-8 z-30">
        <div className="text-cyan-400 font-mono text-xs tracking-wider">ERROR_404 {"<"}</div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-px h-16 bg-gradient-to-b from-red-500/60 to-transparent animate-pulse" />
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-15 pointer-events-none opacity-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)",
        }}
      />
    </div>
  )
}

export const Component = ()  => {
  return (
    <DistortHero />
  )
}

demo.tsx
import { Component } from "@/components/ui/vhs-hero-section";

export default function DemoOne() {
  return <Component />;
}
```

COPY-PASTE THESE FILES FOR DEPENDENCIES:

```tsx
shadcn/button
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

INSTALL NPM DEPENDENCIES:

```bash
gsap, three, @react-three/fiber, @radix-ui/react-slot, class-variance-authority
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
