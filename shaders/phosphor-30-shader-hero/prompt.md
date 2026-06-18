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
phosphor-30.tsx
"use client";
import React, { useEffect, useRef } from "react";

/* shader */ 
const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;   // (width, height, dpr)
uniform float iTime;         // seconds
uniform int   iFrame;        // frame counter
uniform vec4  iMouse;        // (x, y, L, R)

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    // ====== твой шейдер (1-в-1) ======
    float s = 0.0;
    for (float i = 0.0, z = 0.0, d = 0.0; i++ < 8e1; o += (cos(s + vec4(0.0, 1.0, 8.0, 0.0)) + 1.0) / d)
    {
        vec3 p = z * normalize(FC.rgb * 2.0 - r.xyy);
        vec3 a = normalize(cos(vec3(5.0, 0.0, 1.0) + t - d * 4.0));
        p.z += 5.0;

        a = a * dot(a, p) - cross(a, p);
        for (d = 1.0; d++ < 9.0; )
            a -= sin(a * d + t).zxy / d;

        z += d = 0.1 * abs(length(p) - 3.0) + 0.07 * abs(cos(s = a.y));
    }
    o = tanh(o / 5e3);

    fragColor = vec4(o.rgb, 1.0);
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

/* ========= Вершинный шейдер: fullscreen triangle ========= */
const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/* ========= Утилиты (без throw) ========= */
function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  const log = gl.getShaderInfoLog(sh) || "";
  return { shader: ok ? sh : null, log };
}
function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  const log = gl.getProgramInfoLog(prog) || "";
  return { program: ok ? prog : null, log };
}
function drawError(gl: WebGL2RenderingContext, msg: string) {
  console.error(msg);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.clearColor(0.2, 0.0, 0.0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

/* ========= Канвас-рантайм с безопасным cleanup ========= */
function ShaderCanvas({
  fragSource,
  pixelRatio,
}: {
  fragSource: string;
  pixelRatio?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, l: 0, r: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
    if (!gl) return;

    // ----- заранее объявляем все ресурсы (никакого TDZ) -----
    let disposed = false;
    let vao: WebGLVertexArrayObject | null = null;
    let vbo: WebGLBuffer | null = null;
    let program: WebGLProgram | null = null;
    let ro: ResizeObserver | null = null;
    let resizeScheduled = false;

    // флаги для корректного removeEventListener
    let mouseBound = false;
    let ctxBound = false;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = Math.max(0, Math.min(x, rect.width));
      mouseRef.current.y = Math.max(0, Math.min(rect.height - y, rect.height));
    };
    const onDown = (e: MouseEvent) => { if (e.button === 0) mouseRef.current.l = 1; if (e.button === 2) mouseRef.current.r = 1; };
    const onUp   = (e: MouseEvent) => { if (e.button === 0) mouseRef.current.l = 0; if (e.button === 2) mouseRef.current.r = 0; };
    const onCtxMenu = (e: Event) => e.preventDefault();
    const onContextLost = (ev: Event) => { ev.preventDefault(); if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };
    const onContextRestored = () => { scheduleSize(); startRef.current = performance.now(); frameRef.current = 0; if (!rafRef.current) rafRef.current = requestAnimationFrame(tick); };

    const getDpr = () => {
      const sys = (window.devicePixelRatio || 1);
      return Math.max(1, Math.min(2, pixelRatio ?? sys)); // скобки обязательны (?? с ||)
    };

    function applySize() {
      resizeScheduled = false;
      if (disposed || !gl) return;
      const dpr = getDpr();
      const cssW = Math.max(1, (canvas.clientWidth | 0));
      const cssH = Math.max(1, (canvas.clientHeight | 0));
      const w = Math.max(1, Math.floor(cssW * dpr));
      const h = Math.max(1, Math.floor(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    function scheduleSize() {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(applySize);
    }

    // ----- геометрия -----
    vao = gl.createVertexArray();
    vbo = gl.createBuffer();
    if (!vao || !vbo) { drawError(gl, "Failed to create VAO/VBO"); return cleanup; }
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // ----- шейдеры -----
    const { shader: vs, log: vsLog } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    if (!vs) { drawError(gl, `Vertex compile error:
${vsLog}`); return cleanup; }
    const { shader: fs, log: fsLog } = safeCompile(gl, gl.FRAGMENT_SHADER, fragSource);
    if (!fs) { drawError(gl, `Fragment compile error:
${fsLog}`); gl.deleteShader(vs); return cleanup; }
    const linked = safeLink(gl, vs, fs);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!linked.program) { drawError(gl, `Program link error:
${linked.log}`); return cleanup; }
    program = linked.program;

    // ----- uniforms -----
    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uFrame = gl.getUniformLocation(program, "iFrame");
    const uMouse = gl.getUniformLocation(program, "iMouse");

    // ----- ресайз -----
    ro = new ResizeObserver(scheduleSize);
    ro.observe(canvas);
    scheduleSize();

    // ----- события -----
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("contextmenu", onCtxMenu);
    mouseBound = true;

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    ctxBound = true;

    // ----- анимация -----
    startRef.current = performance.now();
    frameRef.current = 0;

    function tick(now: number) {
      if (disposed) return;
      if (gl.isContextLost()) { rafRef.current = requestAnimationFrame(tick); return; }

      const t = (now - startRef.current) / 1000;
      frameRef.current += 1;

      try {
        if (resizeScheduled) applySize();

        gl.useProgram(program);

        const dpr = getDpr();
        const w = canvas.width, h = canvas.height;

        if (uResolution) gl.uniform3f(uResolution, w, h, dpr);
        if (uTime) gl.uniform1f(uTime, t);
        if (uFrame) gl.uniform1i(uFrame, frameRef.current);
        if (uMouse) {
          const m = mouseRef.current;
          gl.uniform4f(uMouse, m.x * dpr, m.y * dpr, m.l, m.r);
        }

        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      } catch (err) {
        drawError(gl, (err as Error)?.message ?? String(err));
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    // ----- cleanup (без TDZ) -----
    function cleanup() {
      disposed = true;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (mouseBound) {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mousedown", onDown);
        canvas.removeEventListener("mouseup", onUp);
        canvas.removeEventListener("contextmenu", onCtxMenu);
        mouseBound = false;
      }
      if (ctxBound) {
        canvas.removeEventListener("webglcontextlost", onContextLost);
        canvas.removeEventListener("webglcontextrestored", onContextRestored);
        ctxBound = false;
      }

      if (ro) { try { ro.disconnect(); } catch {} ro = null; }

      if (gl) {
        if (vbo) { try { gl.deleteBuffer(vbo); } catch {} vbo = null; }
        if (vao) { try { gl.deleteVertexArray(vao); } catch {} vao = null; }
        if (program) { try { gl.deleteProgram(program); } catch {} program = null; }
      }
    }

    return cleanup;
  }, [fragSource, pixelRatio]);

  // контейнер на 100%
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

/* ========= Default export: фуллскрин по умолчанию ========= */
export default function Component() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        background: "black",
        overflow: "hidden",
      }}
    >
      <ShaderCanvas fragSource={SHADER_SRC} />
    </div>
  );
}


demo.tsx
import  Component  from "@/components/ui/phosphor-30";

export default function DemoOne() {
  return <Component />;
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
