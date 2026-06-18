# IS IT POSSIBLE TO RECORD THIS WITH SOME MOUSE GESTURES? LIKE THIS INVOLVES CURSOR RELATED ANIMATIONS SO YEAH

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
cosmic-plasma-web.tsx
'use client'

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform float uFlowSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseAttraction;
uniform float uPulseIntensity;
uniform float uWebComplexity;
uniform float uAttractionStrength;
uniform float uMouseActiveFactor;
uniform float uEnergyFlow;
uniform bool uTransparent;
uniform float uBrightness;

varying vec2 vUv;

#define NUM_LAYERS 3.0
#define PI 3.14159265359

float Hash21(vec2 p) {
  p = fract(p * vec2(234.67, 891.23));
  p += dot(p, p + 56.78);
  return fract(p.x * p.y);
}

float Hash11(float p) {
  p = fract(p * 345.23);
  p += p * p;
  return fract(p);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(mix(Hash21(i + vec2(0.0,0.0)), 
                 Hash21(i + vec2(1.0,0.0)), u.x),
             mix(Hash21(i + vec2(0.0,1.0)), 
                 Hash21(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  
  for(int i = 0; i < 4; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

vec2 curl(vec2 p) {
  float eps = 0.01;
  float n1 = fbm(p + vec2(eps, 0.0));
  float n2 = fbm(p - vec2(eps, 0.0));
  float n3 = fbm(p + vec2(0.0, eps));
  float n4 = fbm(p - vec2(0.0, eps));
  
  return vec2(n4 - n3, n1 - n2) / (2.0 * eps);
}

float PlasmaNode(vec2 uv, vec2 offset, float seed, float time) {
  vec2 nodePos = offset;
  
  // Add organic movement
  nodePos += 0.3 * sin(time * 0.5 + seed * 6.28) * vec2(cos(seed * 12.34), sin(seed * 23.45));
  
  float dist = length(uv - nodePos);
  float pulse = sin(time * 2.0 + seed * 10.0) * 0.5 + 0.5;
  float intensity = (0.02 + 0.01 * pulse) / (dist + 0.01);
  
  return intensity * smoothstep(0.8, 0.0, dist);
}

vec3 PlasmaWeb(vec2 uv) {
  vec3 col = vec3(0.0);
  float time = uTime * uSpeed;
  
  // Create flowing field
  vec2 flow = curl(uv * 2.0 + time * 0.1);
  uv += flow * uEnergyFlow * 0.1;
  
  // Create web nodes
  vec2 gridSize = vec2(4.0 * uDensity, 3.0 * uDensity);
  vec2 grid = uv * gridSize;
  vec2 gridId = floor(grid);
  vec2 gridUv = fract(grid) - 0.5;
  
  for(int y = -1; y <= 1; y++) {
    for(int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 nodeId = gridId + offset;
      float seed = Hash21(nodeId);
      
      // Node position with some randomness
      vec2 nodeOffset = vec2(Hash21(nodeId + 1.0), Hash21(nodeId + 2.0)) - 0.5;
      nodeOffset *= 0.8;
      
      float node = PlasmaNode(gridUv, offset + nodeOffset, seed, time);
      
      // Color based on position and time
      float hue = Hash21(nodeId + 3.0) + uHueShift / 360.0 + time * 0.05;
      hue = fract(hue);
      
      vec3 nodeColor = hsv2rgb(vec3(hue, uSaturation, uBrightness));
      col += node * nodeColor;
    }
  }
  
  // Add connecting streams
  float streamNoise = fbm(uv * 8.0 + time * 0.2);
  float streams = smoothstep(0.3, 0.7, streamNoise);
  streams *= smoothstep(0.0, 0.1, sin(uv.x * 15.0 + time)) * 0.3;
  streams += smoothstep(0.0, 0.1, sin(uv.y * 12.0 + time * 1.2)) * 0.3;
  
  float streamHue = fract(uHueShift / 360.0 + 0.5 + time * 0.03);
  vec3 streamColor = hsv2rgb(vec3(streamHue, uSaturation * 0.8, uBrightness * 0.6));
  col += streams * streamColor * uGlowIntensity;
  
  // Add energy particles
  vec2 particleUv = uv * 20.0 + time * vec2(0.5, 0.3);
  float particles = 0.0;
  for(int i = 0; i < 3; i++) {
    vec2 pid = floor(particleUv + float(i) * 123.45);
    float pseed = Hash21(pid);
    
    if(pseed > 0.85) {
      vec2 ppos = fract(particleUv + float(i) * 123.45) - 0.5;
      ppos += 0.3 * sin(time + pseed * 20.0) * vec2(cos(pseed * 15.0), sin(pseed * 18.0));
      
      float pdist = length(ppos);
      float particle = (0.005 * uGlowIntensity) / (pdist + 0.001);
      particle *= smoothstep(0.3, 0.0, pdist);
      
      float particleHue = fract(pseed + uHueShift / 360.0 + time * 0.1);
      vec3 particleColor = hsv2rgb(vec3(particleHue, uSaturation, uBrightness));
      particles += particle;
    }
  }
  
  col += particles * hsv2rgb(vec3(fract(uHueShift / 360.0 + 0.8), uSaturation, uBrightness));
  
  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  
  // Mouse interaction
  if(uMouseAttraction && uMouseActiveFactor > 0.0) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    vec2 toMouse = mousePosUV - uv;
    float mouseDist = length(toMouse);
    vec2 attraction = normalize(toMouse) * (uAttractionStrength / (mouseDist * mouseDist + 1.0));
    uv += attraction * 0.1 * uMouseActiveFactor;
  }
  
  vec3 col = vec3(0.0);
  
  // Multiple layers for depth
  for(float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYERS) {
    float depth = i + 0.5;
    float scale = mix(1.0, 2.0, depth);
    float fade = (1.0 - depth * depth) * 0.8;
    
    vec3 layerCol = PlasmaWeb(uv * scale + i * 100.0);
    col += layerCol * fade;
  }
  
  // Add pulse effect
  float pulse = sin(uTime * uSpeed * 2.0) * 0.5 + 0.5;
  col *= 1.0 + pulse * uPulseIntensity * 0.3;
  
  if(uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.5, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

interface PlasmaWebProps {
  focal?: [number, number];
  flowSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseAttraction?: boolean;
  pulseIntensity?: number;
  webComplexity?: number;
  attractionStrength?: number;
  energyFlow?: number;
  transparent?: boolean;
  brightness?: number;
}

export function PlasmaWeb({
  focal = [0.5, 0.5],
  flowSpeed = 0.5,
  density = 1,
  hueShift = 240,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.8,
  saturation = 0.7,
  mouseAttraction = true,
  pulseIntensity = 0.4,
  webComplexity = 1.0,
  attractionStrength = 1.0,
  energyFlow = 1.0,
  transparent = true,
  brightness = 0.9,
  ...rest
}: PlasmaWebProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false
    });
    const gl = renderer.gl;

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program: Program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uFocal: { value: new Float32Array(focal) },
        uFlowSpeed: { value: flowSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y])
        },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseAttraction: { value: mouseAttraction },
        uPulseIntensity: { value: pulseIntensity },
        uWebComplexity: { value: webComplexity },
        uAttractionStrength: { value: attractionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uEnergyFlow: { value: energyFlow },
        uTransparent: { value: transparent },
        uBrightness: { value: brightness }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      if (!disableAnimation) {
        program.uniforms.uTime.value = t * 0.001;
      }

      const lerpFactor = 0.08;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;

      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction) {
      ctn.addEventListener('mousemove', handleMouseMove);
      ctn.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (mouseInteraction) {
        ctn.removeEventListener('mousemove', handleMouseMove);
        ctn.removeEventListener('mouseleave', handleMouseLeave);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    focal,
    flowSpeed,
    density,
    hueShift,
    disableAnimation,
    speed,
    mouseInteraction,
    glowIntensity,
    saturation,
    mouseAttraction,
    pulseIntensity,
    webComplexity,
    attractionStrength,
    energyFlow,
    transparent,
    brightness
  ]);

  return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;
}

demo.tsx
import { PlasmaWeb } from "@/components/ui/cosmic-plasma-web";

export default function DemoOne() {
  return <div className="w-full h-screen bg-black">
      <PlasmaWeb 
        hueShift={200}
        density={1.2}
        glowIntensity={1.0}
        saturation={0.8}
        brightness={0.7}
        energyFlow={1.2}
        pulseIntensity={0.3}
        attractionStrength={2.0}
        mouseAttraction={true}
        transparent={false}
      />
    </div>
}

```

INSTALL NPM DEPENDENCIES:

```bash
ogl
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
