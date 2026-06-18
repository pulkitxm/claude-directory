# INTEGRATE AN EXISTING REACT COMPONENT

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
blue-meshy-background.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Zoom factor for the visual pattern.
const ZOOM_FACTOR = 0.3;

// Base wave amplitude in domain warping.
const BASE_WAVE_AMPLITUDE = 0.2;

// Additional factor for random amplitude variations.
// waveAmp = BASE_WAVE_AMPLITUDE + RANDOM_WAVE_FACTOR * noise2D(...)
const RANDOM_WAVE_FACTOR = 0.15;

// Frequency multiplier for wave domain warp.
const WAVE_FREQUENCY = 4.0;

// Time speed factor (overall speed of animation).
const TIME_FACTOR = 0.25;

// Swirl strength near the center.
const BASE_SWIRL_STRENGTH = 1.2;

// Finer swirl timing factor.
const SWIRL_TIME_MULT = 5.0;

// Additional swirl effect modulated by noise.
const NOISE_SWIRL_FACTOR = 0.2;

// Number of fractal noise octaves in fbm (must be integer).
const FBM_OCTAVES = 10;

// 20-step palette of blues.
// If the darkest color is used, alpha=0 => total transparency in darkest areas.
const seaColors = [
  [0.0, 0.02, 0.05],
  [0.0, 0.04, 0.08],
  [0.0, 0.06, 0.12],
  [0.0, 0.08, 0.18],
  [0.0, 0.1, 0.24],
  [0.0, 0.14, 0.32],
  [0.0, 0.2, 0.4],
  [0.0, 0.24, 0.48],
  [0.0, 0.3, 0.55],
  [0.05, 0.35, 0.6],
  [0.08, 0.4, 0.65],
  [0.1, 0.45, 0.7],
  [0.15, 0.5, 0.75],
  [0.2, 0.58, 0.8],
  [0.25, 0.65, 0.85],
  [0.3, 0.72, 0.9],
  [0.4, 0.78, 0.92],
  [0.5, 0.85, 0.95],
  [0.7, 0.9, 0.97],
  [0.85, 0.95, 1.0]
];

////////////////////////////////////////////////////////////////////////////////
// DYNAMIC FRAGMENT SHADER BUILDER
////////////////////////////////////////////////////////////////////////////////

function buildFragmentShader(): string {
  // Force integer for the for-loop.
  const fbmOctavesInt = Math.floor(FBM_OCTAVES);

  // Convert seaColors array to GLSL array of vec3.
  const colorArraySrc = seaColors.map((c) => `vec3(${c[0]}, ${c[1]}, ${c[2]})`).join(",
  ");

  return `#version 300 es

precision highp float;
out vec4 outColor;

uniform vec2 uResolution;
uniform float uTime;

#define NUM_COLORS 20

// 20-step palette of blues.
vec3 seaColors[NUM_COLORS] = vec3[](
  ${colorArraySrc}
);

// ----------------------------------------------------------
// Perlin-like noise
// ----------------------------------------------------------
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float noise2D(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) +
    i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.792843 - 0.853734 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

// ----------------------------------------------------------
// Fractional Brownian Motion
// ----------------------------------------------------------
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float freq = 1.0;
  for (int i = 0; i < ${fbmOctavesInt}; i++) {
    value += amplitude * noise2D(st * freq);
    freq *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  // Normalize coords to [-1,1]
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  // Zoom in so pattern is bigger and less obviously repeated
  uv *= float(${ZOOM_FACTOR});

  // Time factor for wave domain warp
  float t = uTime * float(${TIME_FACTOR});

  // Random amplitude that changes over time
  float waveAmp = float(${BASE_WAVE_AMPLITUDE}) + float(${RANDOM_WAVE_FACTOR})
                  * noise2D(vec2(t, 27.7));

  // Sine-based domain warp
  float waveX = waveAmp * sin(uv.y * float(${WAVE_FREQUENCY}) + t);
  float waveY = waveAmp * sin(uv.x * float(${WAVE_FREQUENCY}) - t);
  uv.x += waveX;
  uv.y += waveY;

  // Additional swirl near center
  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float swirlStrength = float(${BASE_SWIRL_STRENGTH})
                        * (1.0 - smoothstep(0.0, 1.0, r));

  angle += swirlStrength * sin(uTime + r * float(${SWIRL_TIME_MULT}));
  uv = vec2(cos(angle), sin(angle)) * r;

  // Evaluate fractal noise
  float n = fbm(uv);

  // Additional swirl effect modulated by noise
  float swirlEffect = float(${NOISE_SWIRL_FACTOR})
                      * sin(t + n * 3.0);
  n += swirlEffect;

  // Convert noise to [0..1]
  float noiseVal = 0.5 * (n + 1.0);

  // Discrete palette sampling
  float idx = clamp(noiseVal, 0.0, 1.0) * float(NUM_COLORS - 1);
  int iLow = int(floor(idx));
  int iHigh = int(min(float(iLow + 1), float(NUM_COLORS - 1)));
  float f = fract(idx);

  vec3 colLow = seaColors[iLow];
  vec3 colHigh = seaColors[iHigh];
  vec3 color = mix(colLow, colHigh, f);

  // If it's the darkest color, set alpha=0 => total transparency
  if (iLow == 0 && iHigh == 0) {
    outColor = vec4(color, 0.0);
  } else {
    outColor = vec4(color, 1.0);
  }
}
`;
}

////////////////////////////////////////////////////////////////////////////////
// STATIC VERTEX SHADER
////////////////////////////////////////////////////////////////////////////////
const vertexShaderSource = `#version 300 es
precision mediump float;

in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

////////////////////////////////////////////////////////////////////////////////
// SHADER COMPILATION UTIL
////////////////////////////////////////////////////////////////////////////////
function createShaderProgram(
  gl: WebGL2RenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram | null {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) return null;

  gl.shaderSource(vertexShader, vsSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Vertex shader error:", gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
    return null;
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragmentShader) {
    gl.deleteShader(vertexShader);
    return null;
  }

  gl.shaderSource(fragmentShader, fsSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Fragment shader error:", gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Could not link WebGL program:", gl.getProgramInfoLog(program));
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

////////////////////////////////////////////////////////////////////////////////
// MAIN REACT COMPONENT
////////////////////////////////////////////////////////////////////////////////
export default function WavyBackground({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    // Build final fragment shader from above config
    const fsSource = buildFragmentShader();

    const gl = canvas.getContext("webgl2", { alpha: true })!;
    if (!gl) {
      console.error("WebGL2 is not supported by your browser.");
      return;
    }

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Transparent background
    gl.clearColor(0, 0, 0, 0);

    // Resize canvas to fill screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const program = createShaderProgram(gl, vertexShaderSource, fsSource);
    if (!program) {
      console.error("Failed to create shader program.");
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const quadVertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");

    let startTime = performance.now();

    function render() {
      const currentTime = performance.now();
      const elapsed = (currentTime - startTime) * 0.001; // seconds

      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gl.deleteProgram(program);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ background: "transparent" }} />
      {children}
    </div>
  );
}


demo.tsx
import  WavyBackground   from "@/components/ui/blue-meshy-background";

export default function DemoOne() {
   return (
    <WavyBackground className="flex min-h-screen items-center justify-center">
  <div className="z-10 space-y-4 text-center lg:space-y-6">
  <h4 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow-xl tracking-wide">
  Turning Ideas Into Impact
  </h4>
  <button className="px-6 py-3 text-lg font-semibold text-blue-900 bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
    Start Your Journey
  </button>
</div>

    </WavyBackground>
  );
}
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
