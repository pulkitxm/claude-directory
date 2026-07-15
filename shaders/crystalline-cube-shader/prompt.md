# CRYSTALLINE CUBE — SHADER COMPONENT INTEGRATION

USE CATEGORY SHADERS. YOU ARE GIVEN A TASK TO INTEGRATE AN EXISTING REACT COMPONENT IN THE CODEBASE

THE CODEBASE SHOULD SUPPORT:

- SHADCN PROJECT STRUCTURE
- TAILWIND CSS
- TYPESCRIPT

IF IT DOESN'T, PROVIDE INSTRUCTIONS ON HOW TO SETUP PROJECT VIA SHADCN CLI, INSTALL TAILWIND OR TYPESCRIPT.

DETERMINE THE DEFAULT PATH FOR COMPONENTS AND STYLES.
IF DEFAULT PATH FOR COMPONENTS IS NOT /COMPONENTS/UI, PROVIDE INSTRUCTIONS ON WHY IT'S IMPORTANT TO CREATE THIS FOLDER
COPY-PASTE THIS COMPONENT TO /COMPONENTS/UI FOLDER:

```tsx
crystalline-cube.tsx
import React, { useRef, useEffect, useState } from 'react';

// Props interface for the InteractiveShader component
interface ShaderProps {
  complexity?: number;
  colorShift?: number;
  lightIntensity?: number;
  mouseInfluence?: number;
}

// The core component responsible for rendering the WebGL shader
const InteractiveShader: React.FC<ShaderProps> = ({
  complexity = 4.0,
  colorShift = 0.3,
  lightIntensity = 1.5,
  mouseInfluence = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL is not supported in this browser.");
      return;
    }

    // --- Shader Sources ---
    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // This fragment shader uses ray marching to render a 3D crystalline object.
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uComplexity;
      uniform float uColorShift;
      uniform float uLightIntensity;
      uniform float uMouseInfluence;

      #define MAX_STEPS 64
      #define MAX_DIST 100.0
      #define SURF_DIST 0.001

      // --- UTILITY FUNCTIONS ---
      // Procedural color palette function from Inigo Quilez.
      vec3 palette(float t) {
          vec3 a = vec3(0.5, 0.5, 0.5);
          vec3 b = vec3(0.5, 0.5, 0.5);
          vec3 c = vec3(1.0, 1.0, 0.5);
          vec3 d = vec3(0.8, 0.9, 0.3);
          return a + b * cos(6.28318 * (c * t + d));
      }

      // 3D rotation matrix.
      mat3 rotate(vec3 axis, float angle) {
          axis = normalize(axis);
          float s = sin(angle);
          float c = cos(angle);
          float oc = 1.0 - c;
          return mat3(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
                      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
                      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c);
      }

      // --- SIGNED DISTANCE FUNCTION (SDF) ---
      // This function defines the geometry of our scene.
      float getDist(vec3 p) {
          // Animate rotation over time.
          p = rotate(normalize(vec3(1.0, 1.0, 1.0)), iTime * 0.2) * p;
          
          // Create a base box shape.
          vec3 b = vec3(1.0);
          float box = length(max(abs(p) - b, 0.0));
          
          // Use sine waves to carve into the box, creating a complex crystalline structure.
          float displacement = sin(uComplexity * p.x) * sin(uComplexity * p.y) * sin(uComplexity * p.z);
          
          // Combine the box and the displacement.
          return box - displacement * 0.1;
      }

      // --- RAY MARCHING & RENDERING ---
      // Calculate the surface normal for lighting.
      vec3 getNormal(vec3 p) {
          vec2 e = vec2(0.001, 0);
          float d = getDist(p);
          vec3 n = d - vec3(
              getDist(p - e.xyy),
              getDist(p - e.yxy),
              getDist(p - e.yyx)
          );
          return normalize(n);
      }

      // The core ray marching algorithm.
      float rayMarch(vec3 ro, vec3 rd) {
          float dO = 0.0;
          for(int i=0; i<MAX_STEPS; i++) {
              vec3 p = ro + rd * dO;
              float dS = getDist(p);
              dO += dS;
              if(dO > MAX_DIST || dS < SURF_DIST) break;
          }
          return dO;
      }

      void main() {
        // --- UV & CAMERA SETUP ---
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec3 ro = vec3(0, 0, -3.0); // Ray origin (camera)
        vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction

        // --- RAY MARCH & COLORING ---
        float d = rayMarch(ro, rd);
        vec3 col = vec3(0);

        if (d < MAX_DIST) {
            vec3 p = ro + rd * d;
            vec3 n = getNormal(p);
            
            // --- Lighting ---
            // The light position is controlled by the mouse.
            vec2 mouse = (iMouse.xy / iResolution.xy - 0.5) * 2.0;
            vec3 lightPos = vec3(mouse.x * 2.0 * uMouseInfluence, mouse.y * 2.0 * uMouseInfluence, -3.0);
            vec3 l = normalize(lightPos - p);
            
            // Diffuse lighting.
            float dif = clamp(dot(n, l), 0.0, 1.0);
            
            // Specular lighting (highlights).
            vec3 v = normalize(ro - p);
            vec3 h = normalize(l + v);
            float spec = pow(clamp(dot(n, h), 0.0, 1.0), 32.0);
            
            // --- Material & Color ---
            // Use a procedural palette for the crystal's color.
            vec3 baseColor = palette(length(p) * 0.2 + iTime * uColorShift);
            
            // Combine lighting components.
            col = (dif * baseColor + spec * vec3(1.0)) * uLightIntensity;
        }

        // Add a background based on the ray direction.
        col += palette(length(uv) * 0.5 - iTime * uColorShift * 0.2) * 0.2;
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // --- WebGL Setup (Boilerplate) ---
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Program linking error: ${gl.getProgramInfoLog(program)}`);
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uComplexityLocation = gl.getUniformLocation(program, "uComplexity");
    const uColorShiftLocation = gl.getUniformLocation(program, "uColorShift");
    const uLightIntensityLocation = gl.getUniformLocation(program, "uLightIntensity");
    const uMouseInfluenceLocation = gl.getUniformLocation(program, "uMouseInfluence");

    // --- Animation and Interaction ---
    const startTime = performance.now();
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const renderLoop = () => {
      if (!gl || gl.isContextLost()) return;
      
      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      
      gl.uniform2f(iMouseLocation, mousePos.current.x, canvas.height - mousePos.current.y);
      gl.uniform1f(uComplexityLocation, complexity);
      gl.uniform1f(uColorShiftLocation, colorShift);
      gl.uniform1f(uLightIntensityLocation, lightIntensity);
      gl.uniform1f(uMouseInfluenceLocation, mouseInfluence);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // Cleanup function to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl && !gl.isContextLost()) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(vertexBuffer);
      }
    };
  }, [complexity, colorShift, lightIntensity, mouseInfluence]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default InteractiveShader;

demo.tsx
import React, { useRef, useEffect, useState } from 'react';
import InteractiveShader  from "@/components/ui/crystalline-cube";

export default function DemoOne() {
  // State variables to hold the shader parameters, controlled by sliders
  const [complexity, setComplexity] = useState(4.0);
  const [colorShift, setColorShift] = useState(0.3);
  const [lightIntensity, setLightIntensity] = useState(1.5);
  const [mouseInfluence, setMouseInfluence] = useState(0.5);

  return (
    <div className="relative w-full h-screen font-sans bg-black">
      {/* The main shader component that renders the visual effect */}
      <InteractiveShader
        complexity={complexity}
        colorShift={colorShift}
        lightIntensity={lightIntensity}
        mouseInfluence={mouseInfluence}
      />

      {/* UI controls panel with a new "Crystalline Core" theme */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 backdrop-blur-md text-white p-6 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
        <h1 className="text-xl font-bold mb-4 tracking-wider text-center">Crystalline Core</h1>
        
        <div className="space-y-4">
          {/* Slider for Complexity */}
          <div>
            <label htmlFor="complexity" className="block mb-2 text-sm font-medium">Complexity: {complexity.toFixed(2)}</label>
            <input
              id="complexity"
              type="range"
              min="1.0"
              max="10.0"
              step="0.1"
              value={complexity}
              onChange={(e) => setComplexity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          {/* Slider for Color Shift */}
          <div>
            <label htmlFor="colorShift" className="block mb-2 text-sm font-medium">Color Shift: {colorShift.toFixed(2)}</label>
            <input
              id="colorShift"
              type="range"
              min="0"
              max="1.0"
              step="0.01"
              value={colorShift}
              onChange={(e) => setColorShift(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          {/* Slider for Light Intensity */}
          <div>
            <label htmlFor="lightIntensity" className="block mb-2 text-sm font-medium">Light Intensity: {lightIntensity.toFixed(2)}</label>
            <input
              id="lightIntensity"
              type="range"
              min="0.5"
              max="3.0"
              step="0.01"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          {/* Slider for Mouse Influence */}
          <div>
            <label htmlFor="mouseInfluence" className="block mb-2 text-sm font-medium">Mouse Influence: {mouseInfluence.toFixed(2)}</label>
            <input
              id="mouseInfluence"
              type="range"
              min="0"
              max="1.0"
              step="0.01"
              value={mouseInfluence}
              onChange={(e) => setMouseInfluence(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>
        </div>
      </div>
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
