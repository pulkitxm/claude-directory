# LIQUID CRYSTAL — COMPONENT INTEGRATION

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
liquid-crystal.tsx
import React, { useRef, useEffect } from 'react';

// --- Custom Hook for Raw WebGL Management ---
// This hook encapsulates all WebGL setup, state management, and the animation loop.
const useWebGLShader = (canvasRef, fragmentShader, props) => {
  const webglState = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true });
    if (!gl) {
      console.error("WebGL is not supported in this browser.");
      return;
    }

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragShader = compileShader(fragmentShader, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const positionAttributeLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const uniformLocations = {
      iTime: gl.getUniformLocation(program, 'iTime'),
      iResolution: gl.getUniformLocation(program, 'iResolution'),
      iMouse: gl.getUniformLocation(program, 'iMouse'),
      uHue: gl.getUniformLocation(program, 'uHue'),
      uNoise: gl.getUniformLocation(program, 'uNoise'),
      uWarp: gl.getUniformLocation(program, 'uWarp'),
      uZoom: gl.getUniformLocation(program, 'uZoom'),
      uBrightness: gl.getUniformLocation(program, 'uBrightness'),
    };

    webglState.current = { gl, program, uniformLocations, vertexBuffer };

    return () => {
      if (gl && !gl.isContextLost()) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(vertexBuffer);
      }
    };
  }, [canvasRef, fragmentShader]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  useEffect(() => {
    if (!webglState.current) return;
    
    const { gl, uniformLocations } = webglState.current;
    const startTime = performance.now();
    let animationFrameId;

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniformLocations.iResolution, canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      const time = ((performance.now() - startTime) / 1000.0) * props.speed;
      
      gl.uniform1f(uniformLocations.iTime, time);
      gl.uniform2f(uniformLocations.iMouse, mousePos.current.x, mousePos.current.y);
      gl.uniform1f(uniformLocations.uHue, props.hue);
      gl.uniform1f(uniformLocations.uNoise, props.noise);
      gl.uniform1f(uniformLocations.uWarp, props.warp);
      gl.uniform1f(uniformLocations.uZoom, props.zoom);
      gl.uniform1f(uniformLocations.uBrightness, props.brightness);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [webglState, canvasRef, props]);
};

// --- UI Controls Component ---
export const ControlsPanel = ({ params, onParamChange }) => (
  <div className="absolute top-4 left-4 bg-gray-900/60 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl w-[340px] border border-white/10 transition-all duration-300">
    <h1 className="text-2xl font-bold mb-6 tracking-wider text-white/90">Liquid Crystal</h1>
    
    {[
      { name: 'Hue', key: 'hue', min: 0, max: 360, step: 1, value: params.hue },
      { name: 'Speed', key: 'speed', min: 0, max: 2, step: 0.01, value: params.speed },
      { name: 'Noise', key: 'noise', min: 0, max: 1, step: 0.01, value: params.noise },
      { name: 'Warp', key: 'warp', min: 0, max: 0.5, step: 0.01, value: params.warp },
      { name: 'Zoom', key: 'zoom', min: 0.5, max: 5, step: 0.01, value: params.zoom },
      { name: 'Brightness', key: 'brightness', min: 0.1, max: 2, step: 0.01, value: params.brightness },
    ].map(p => (
      <div className="mb-4" key={p.key}>
        <label htmlFor={p.key} className="block mb-2 text-sm font-medium text-white/80">
          {p.name}: {p.value.toFixed(p.step < 1 ? 2 : 0)}
        </label>
        <input
          id={p.key}
          type="range"
          min={p.min}
          max={p.max}
          step={p.step}
          value={p.value}
          onChange={onParamChange(p.key)}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>
    ))}
  </div>
);

// --- Shader Component ---
export const InteractiveShader = (props) => {
  const canvasRef = useRef(null);

  const fragmentShader = `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec2 iMouse;
    uniform float uHue;
    uniform float uNoise;
    uniform float uWarp;
    uniform float uZoom;
    uniform float uBrightness;

    vec3 hsv2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
      return c.z * mix(vec3(1.0), rgb, c.y);
    }

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
      uv *= uZoom;
      vec2 mouseUv = (iMouse * 2.0 - 1.0);
      mouseUv.y *= -1.0;
      uv += mouseUv * uWarp;
      float time = iTime * 0.5;
      float noise_pattern = snoise(uv * 1.5 + vec2(time * 0.3, -time * 0.2)) * 0.5;
      noise_pattern += snoise(uv * 3.0 + vec2(-time * 0.2, time * 0.3)) * 0.25;
      noise_pattern = (noise_pattern + 1.0) * 0.5;
      float bands = sin(noise_pattern * 15.0 - time * 2.0);
      bands = smoothstep(0.4, 0.6, bands);
      float detail = snoise(uv * 10.0 + time) * 0.5 + 0.5;
      bands = mix(bands, bands + detail, uNoise);
      vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 1.0));
      vec3 color = baseColor * bands * uBrightness;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useWebGLShader(canvasRef, fragmentShader, props);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};


demo.tsx
import React, { useState } from 'react';
import { InteractiveShader,ControlsPanel } from "@/components/ui/liquid-crystal";

export default function DemoOne() {
  // State for shader parameters, controlled by UI sliders.
  const [params, setParams] = useState({
    hue: 225,
    speed: 0.4,
    noise: 0.2,
    warp: 0.1,
    zoom: 1.5,
    brightness: 0.9,
  });

  const handleParamChange = (param) => (e) => {
    setParams(p => ({ ...p, [param]: parseFloat(e.target.value) }));
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 font-sans antialiased overflow-hidden">
      <InteractiveShader {...params} />
      <ControlsPanel params={params} onParamChange={handleParamChange} />
    </div>
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
