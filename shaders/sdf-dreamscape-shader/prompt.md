# SDF DREAMSCAPE — COMPONENT INTEGRATION

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
sdf-dreamscape.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';

// --- Custom Hooks ---

/**
 * A custom hook to throttle a callback function.
 * This ensures the function is not called more than once every `delay` milliseconds.
 * Useful for performance-critical event handlers like mouse move or scroll.
 * @param callback The function to throttle.
 * @param delay The throttle delay in milliseconds.
 * @returns A memoized, throttled version of the callback.
 */
const useThrottledCallback = (callback, delay) => {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  // Keep the latest callback in a ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args) => {
    if (!timeoutRef.current) {
      callbackRef.current(...args);
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, delay);
    }
  }, [delay]);
};


/**
 * A custom hook to encapsulate all WebGL shader logic using the native WebGL API.
 * It handles scene setup, the animation loop, and cleanup.
 * @param canvasRef Ref to the canvas element.
 * @param params Shader parameters (hue, speed, etc.).
 */
const useShaderAnimation = (canvasRef, params) => {
    const { hue, speed, intensity, complexity } = params;
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    
    // Throttled mouse move handler for performance
    const throttledMouseMove = useThrottledCallback((e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        // Remap mouse coordinates to the shader's expected range [0, 1]
        mousePos.current.x = (e.clientX - rect.left) / rect.width;
        mousePos.current.y = 1.0 - ((e.clientY - rect.top) / rect.height);
    }, 16); // Throttle to ~60fps

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported.");
            return;
        }

        // --- Shaders (GLSL) ---
        const vertexShaderSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;
        
        const fragmentShaderSource = `
            precision highp float;
            
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_hue;
            uniform float u_speed;
            uniform float u_intensity; // Now controls fractal iterations
            uniform float u_complexity; // Now controls zoom and detail

            #define PI 3.14159265359
            
            // Creative color palette function inspired by Inigo Quilez
            vec3 palette( float t ) {
                vec3 a = vec3(0.5, 0.5, 0.5);
                vec3 b = vec3(0.5, 0.5, 0.5);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(0.263, 0.416, 0.557);
                d = mix(d, vec3(0.8, 0.9, 0.3), sin(u_hue/360.0 * PI));
                return a + b*cos( 6.28318*(c*t+d) );
            }

            // Rotation matrix
            mat2 rotate2d(float angle){
                return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            }

            // Signed Distance Function for a circle
            float sdCircle( vec2 p, float r ) {
                return length(p) - r;
            }

            // The main scene map, using SDFs to define the geometry
            float map(vec2 p) {
                vec2 p_orig = p;
                float final_dist = 1000.0;
                
                // Animate rotation and scale
                p *= rotate2d(u_time * 0.1 * u_speed);
                p *= (1.0 + sin(u_time * 0.2 * u_speed) * 0.1);

                // Fractal construction (Julia set style)
                for (int i = 0; i < 8; i++) {
                    if(float(i) >= u_intensity) break; // Control iterations with intensity
                    p = abs(p) / clamp(dot(p,p), 0.2, 1.0) - vec2(0.5, 0.2);
                    p *= rotate2d(u_mouse.x * 2.0); // Mouse interaction
                }
                
                // Combine the fractal with a base shape
                final_dist = sdCircle(p, 0.5);

                return final_dist;
            }

            void main() {
                // Setup coordinates, zoom controlled by complexity
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
                uv *= (2.0 / u_complexity); // Zoom
                uv.x += u_mouse.x - 0.5; // Mouse panning
                uv.y += u_mouse.y - 0.5;

                // Get distance from the SDF map
                float dist = map(uv);
                
                // --- Coloring ---
                // Base color on the distance, creating outlines
                vec3 col = palette(u_time * 0.1 - dist * 0.2);
                
                // Create a glowing effect based on the distance
                float glow = pow(0.01 / abs(dist), 1.2);
                col += glow * 0.5;
                
                // Add a soft vignette
                col *= 1.0 - length(gl_FragCoord.xy / u_resolution.xy - 0.5) * 0.8;

                gl_FragColor = vec4(col, 1.0);
            }
        `;

        // --- WebGL Setup (Native API) ---
        const compileShader = (source, type) => {
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
            console.error(`Program link error: ${gl.getProgramInfoLog(program)}`);
            return;
        }
        gl.useProgram(program);
        
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const mouseLocation = gl.getUniformLocation(program, "u_mouse");
        const hueLocation = gl.getUniformLocation(program, "u_hue");
        const speedLocation = gl.getUniformLocation(program, "u_speed");
        const intensityLocation = gl.getUniformLocation(program, "u_intensity");
        const complexityLocation = gl.getUniformLocation(program, "u_complexity");

        // --- Render Loop ---
        let animationFrameId;
        const startTime = performance.now();
        const render = () => {
            if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            }
            gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(timeLocation, (performance.now() - startTime) * 0.001);
            gl.uniform2f(mouseLocation, mousePos.current.x, mousePos.current.y);
            gl.uniform1f(hueLocation, hue);
            gl.uniform1f(speedLocation, speed);
            gl.uniform1f(intensityLocation, intensity);
            gl.uniform1f(complexityLocation, complexity);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        // --- Event Listeners & Cleanup ---
        window.addEventListener('mousemove', throttledMouseMove);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', throttledMouseMove);
            if (gl && !gl.isContextLost()) {
                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                gl.deleteBuffer(positionBuffer);
            }
        };
    }, [hue, speed, intensity, complexity, canvasRef, throttledMouseMove]);
};


// --- Components ---

// Memoized slider component to prevent re-renders when props haven't changed.
const ControlSlider = React.memo(({ label, value, onChange, min, max, step }) => (
    <div className="flex flex-col text-white">
        <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium select-none">{label}</label>
            <span className="text-sm bg-white/10 px-2 py-0.5 rounded-full select-none">{value}</span>
        </div>
        <input
            type="range"
            min={min} max={max} step={step} value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
    </div>
));

// The core canvas component, now cleaner by using the useShaderAnimation hook.
const ShaderCanvas = React.memo(({ hue, speed, intensity, complexity }) => {
    const canvasRef = useRef(null);
    useShaderAnimation(canvasRef, { hue, speed, intensity, complexity });
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
});

// Main ShaderComponent
const ShaderComponent = () => {
    const [hue, setHue] = useState(180);
    const [speed, setSpeed] = useState(0.4);
    const [intensity, setIntensity] = useState(5.0); // Controls fractal iterations
    const [complexity, setComplexity] = useState(2.5); // Controls zoom

    // Memoize onChange handlers to prevent re-rendering of ControlSlider components.
    const handleHueChange = useCallback((e) => setHue(parseFloat(e.target.value)), []);
    const handleSpeedChange = useCallback((e) => setSpeed(parseFloat(e.target.value)), []);
    const handleIntensityChange = useCallback((e) => setIntensity(parseFloat(e.target.value)), []);
    const handleComplexityChange = useCallback((e) => setComplexity(parseFloat(e.target.value)), []);

    return (
        <div className="relative w-full h-screen bg-gray-900 font-sans overflow-hidden">
            <ShaderCanvas hue={hue} speed={speed} intensity={intensity} complexity={complexity} />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                <h1 className="text-5xl md:text-8xl font-bold text-white mix-blend-overlay select-none">
                    SDF Dreamscape
                </h1>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg p-4">
                <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-4 border border-white/10">
                    <ControlSlider label="Hue" value={hue} onChange={handleHueChange} min="0" max="360" step="1" />
                    <ControlSlider label="Speed" value={speed} onChange={handleSpeedChange} min="0.0" max="2.0" step="0.01" />
                    <ControlSlider label="Iterations" value={intensity} onChange={handleIntensityChange} min="1.0" max="8.0" step="1" />
                    <ControlSlider label="Zoom" value={complexity} onChange={handleComplexityChange} min="0.5" max="10.0" step="0.1" />
                </div>
            </div>
        </div>
    );
};

export default ShaderComponent;


demo.tsx
import ShaderComponent from "@/components/ui/sdf-dreamscape";

export default function DemoOne() {
  return <ShaderComponent />;
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
