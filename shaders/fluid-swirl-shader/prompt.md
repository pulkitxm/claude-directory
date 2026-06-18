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
fluid-swirl-shader.tsx
'use client';

import { useRef, useEffect } from 'react';

const vertexShader = `
  attribute vec2 position;
  varying vec2 vUv;
  
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform vec2 resolution;
  uniform float time;
  uniform vec2 mouse;
  
  uniform bool polar_coordinates;
  uniform vec2 polar_center;
  uniform float polar_zoom;
  uniform float polar_repeat;
  
  uniform float spin_rotation;
  uniform float spin_speed;
  uniform vec2 offset;
  uniform vec3 colour_1;
  uniform vec3 colour_2;
  uniform vec3 colour_3;
  uniform float contrast;
  uniform float spin_amount;
  uniform float pixel_filter;
  
  varying vec2 vUv;
  
  #define PI 3.14159265359
  #define SPIN_EASE 1.0
  
  vec2 polar_coords(vec2 uv, vec2 center, float zoom, float repeat) {
    vec2 dir = uv - center;
    float radius = length(dir) * 2.0;
    float angle = atan(dir.y, dir.x) * 1.0 / (PI * 2.0);
    return mod(vec2(radius * zoom, angle * repeat), 1.0);
  }
  
  vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / pixel_filter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - offset;
    float uv_len = length(uv);
    
    float speed = (spin_rotation * SPIN_EASE * 0.2) + 302.2;
    float new_pixel_angle = atan(uv.y, uv.x) + speed - SPIN_EASE * 20.0 * (1.0 * spin_amount * uv_len + (1.0 - 1.0 * spin_amount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);
    
    uv *= 30.0;
    speed = time * spin_speed;
    vec2 uv2 = vec2(uv.x + uv.y);
    
    for(int i = 0; i < 5; i++) {
      uv2 += sin(max(uv.x, uv.y)) + uv;
      uv += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
      uv -= 1.0 * cos(uv.x + uv.y) - 1.0 * sin(uv.x * 0.711 - uv.y);
    }
    
    float contrast_mod = (0.25 * contrast + 0.5 * spin_amount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    
    vec3 ret_col = (0.3 / contrast) * colour_1 + 
                   (1.0 - 0.3 / contrast) * (colour_1 * c1p + colour_2 * c2p + colour_3 * c3p);
    
    return vec4(ret_col, 1.0);
  }
  
  void main() {
    vec2 coords = vUv;
    
    if (polar_coordinates) {
      coords = polar_coords(vUv, polar_center, polar_zoom, polar_repeat);
    }
    
    vec2 screenSize = resolution;
    vec2 screen_coords = coords * resolution;
    
    gl_FragColor = effect(screenSize, screen_coords);
  }
`;

export function FluidSwirl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { 
      alpha: true,
      premultipliedAlpha: false 
    });
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };

    const vShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);
    
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const positionLoc = gl.getAttribLocation(program, 'position');
    const resolutionLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');
    const mouseLoc = gl.getUniformLocation(program, 'mouse');
    
    const polarCoordinatesLoc = gl.getUniformLocation(program, 'polar_coordinates');
    const polarCenterLoc = gl.getUniformLocation(program, 'polar_center');
    const polarZoomLoc = gl.getUniformLocation(program, 'polar_zoom');
    const polarRepeatLoc = gl.getUniformLocation(program, 'polar_repeat');
    const spinRotationLoc = gl.getUniformLocation(program, 'spin_rotation');
    const spinSpeedLoc = gl.getUniformLocation(program, 'spin_speed');
    const offsetLoc = gl.getUniformLocation(program, 'offset');
    const colour1Loc = gl.getUniformLocation(program, 'colour_1');
    const colour2Loc = gl.getUniformLocation(program, 'colour_2');
    const colour3Loc = gl.getUniformLocation(program, 'colour_3');
    const contrastLoc = gl.getUniformLocation(program, 'contrast');
    const spinAmountLoc = gl.getUniformLocation(program, 'spin_amount');
    const pixelFilterLoc = gl.getUniformLocation(program, 'pixel_filter');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const colors = {
      color1: [0.9, 0.3, 0.4],
      color2: [0.3, 0.5, 0.9],
      color3: [0.9, 0.8, 0.3]
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let x, y;
      
      if ('touches' in e && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        x = e.clientX;
        y = e.clientY;
      } else {
        return;
      }
      
      mouseRef.current.x = (x - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (y - rect.top) / rect.height;
    };

    const render = () => {
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      
      gl.useProgram(program);
      
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, currentTime);
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
      
      gl.uniform1i(polarCoordinatesLoc, 0);
      gl.uniform2f(polarCenterLoc, 0.5, 0.5);
      gl.uniform1f(polarZoomLoc, 1.0);
      gl.uniform1f(polarRepeatLoc, 1.0);
      
      const spinRotation = currentTime * 0.5 + mouseRef.current.x * Math.PI;
      gl.uniform1f(spinRotationLoc, spinRotation);
      gl.uniform1f(spinSpeedLoc, 1.0);
      gl.uniform2f(offsetLoc, 0.0, 0.0);
      
      gl.uniform3fv(colour1Loc, colors.color1);
      gl.uniform3fv(colour2Loc, colors.color2);
      gl.uniform3fv(colour3Loc, colors.color3);
      
      gl.uniform1f(contrastLoc, 2.0);
      gl.uniform1f(spinAmountLoc, 0.36);
      gl.uniform1f(pixelFilterLoc, 700.0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleMouseMove, { passive: true });

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      
      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-screen"
      style={{ touchAction: 'none' }}
    />
  );
}

demo.tsx
import { FluidSwirl } from "@/components/ui/fluid-swirl-shader";

export default function DemoOne() {
  return <FluidSwirl />;
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
