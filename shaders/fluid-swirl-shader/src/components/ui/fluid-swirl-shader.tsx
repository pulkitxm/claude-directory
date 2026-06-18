"use client";

import { useRef, useEffect } from "react";

/* -------------------------------------------------------------------------- */
/*  Shaders (preserved verbatim from the integration prompt)                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/*                                                                            */
/*  Every prop is OPTIONAL. Rendering <FluidSwirl /> with no props produces   */
/*  the exact look from the integration prompt (the same three pigments,      */
/*  contrast 2.0, spin 0.36, pixel_filter 700, full-viewport canvas, and the  */
/*  pointer-reactive spin_rotation). The props below simply expose the        */
/*  uniforms the original `render()` loop already drove with constants.       */
/* -------------------------------------------------------------------------- */

/** `#rrggbb` (or `#rgb`) hex string. */
export type HexColor = string;

export interface FluidSwirlProps {
  /** First / base pigment. Default `#e64d66` (prompt's `colour_1`). */
  colorOne?: HexColor;
  /** Second pigment. Default `#4d80e6` (prompt's `colour_2`). */
  colorTwo?: HexColor;
  /** Third pigment. Default `#e6cc4d` (prompt's `colour_3`). */
  colorThree?: HexColor;
  /** Paint contrast / banding. Default `2.0`. */
  contrast?: number;
  /** How tightly the vortex winds (0–1). Default `0.36`. */
  spinAmount?: number;
  /** Flow / churn speed. `0` freezes the paint. Default `1.0`. */
  spinSpeed?: number;
  /** Pixelisation filter — lower = chunkier blocks. Default `700`. */
  pixelFilter?: number;
  /** Field recentre offset. Default `[0, 0]`. */
  offset?: [number, number];
  /** Kaleidoscopic polar warp. Default `false`. */
  polar?: boolean;
  /** Polar tiling repeat when `polar` is on. Default `2`. */
  polarRepeat?: number;
  /** Polar zoom when `polar` is on. Default `1`. */
  polarZoom?: number;
  /**
   * When `true`, the canvas tracks its parent box (via `ResizeObserver`) so it
   * can sit behind a layout as a full-bleed background. When `false` (default,
   * matching the pasted component) it fills the viewport via `window` size.
   */
  fill?: boolean;
  /** Multiply spin_rotation by pointer-X like the original demo. Default `true`. */
  pointerReactive?: boolean;
  /**
   * Fires a few times a second with the average luminance of the rendered
   * field (0–1), sampled directly off the GL framebuffer. Drives live readouts.
   */
  onSample?: (luminance: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/* hex (`#rgb` / `#rrggbb`) → linear-ish [0,1] rgb triplet */
function hexToRgb(hex: HexColor): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const int = parseInt(h, 16);
  if (Number.isNaN(int) || h.length !== 6) return [1, 1, 1];
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

export function FluidSwirl({
  colorOne = "#e64d66",
  colorTwo = "#4d80e6",
  colorThree = "#e6cc4d",
  contrast = 2.0,
  spinAmount = 0.36,
  spinSpeed = 1.0,
  pixelFilter = 700,
  offset = [0, 0],
  polar = false,
  polarRepeat = 2,
  polarZoom = 1,
  fill = false,
  pointerReactive = true,
  onSample,
  className = "w-full h-screen",
  style,
}: FluidSwirlProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Keep the live props in a ref so the WebGL loop reads the latest values
  // without tearing down and rebuilding the GL program on every change.
  const propsRef = useRef({
    colorOne,
    colorTwo,
    colorThree,
    contrast,
    spinAmount,
    spinSpeed,
    pixelFilter,
    offset,
    polar,
    polarRepeat,
    polarZoom,
    pointerReactive,
    onSample,
  });
  propsRef.current = {
    colorOne,
    colorTwo,
    colorThree,
    contrast,
    spinAmount,
    spinSpeed,
    pixelFilter,
    offset,
    polar,
    polarRepeat,
    polarZoom,
    pointerReactive,
    onSample,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
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
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const positionLoc = gl.getAttribLocation(program, "position");
    const resolutionLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");
    const mouseLoc = gl.getUniformLocation(program, "mouse");

    const polarCoordinatesLoc = gl.getUniformLocation(program, "polar_coordinates");
    const polarCenterLoc = gl.getUniformLocation(program, "polar_center");
    const polarZoomLoc = gl.getUniformLocation(program, "polar_zoom");
    const polarRepeatLoc = gl.getUniformLocation(program, "polar_repeat");
    const spinRotationLoc = gl.getUniformLocation(program, "spin_rotation");
    const spinSpeedLoc = gl.getUniformLocation(program, "spin_speed");
    const offsetLoc = gl.getUniformLocation(program, "offset");
    const colour1Loc = gl.getUniformLocation(program, "colour_1");
    const colour2Loc = gl.getUniformLocation(program, "colour_2");
    const colour3Loc = gl.getUniformLocation(program, "colour_3");
    const contrastLoc = gl.getUniformLocation(program, "contrast");
    const spinAmountLoc = gl.getUniformLocation(program, "spin_amount");
    const pixelFilterLoc = gl.getUniformLocation(program, "pixel_filter");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // ----- sizing: parent box (fill) or viewport (default, like the prompt) ---
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = fill ? canvas.clientWidth || window.innerWidth : window.innerWidth;
      const h = fill ? canvas.clientHeight || window.innerHeight : window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      if (!fill) {
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let x, y;

      if ("touches" in e && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        x = e.clientX;
        y = e.clientY;
      } else {
        return;
      }

      mouseRef.current.x = (x - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (y - rect.top) / rect.height;
    };

    // ----- luminance probe: average framebuffer brightness, throttled ---------
    let lastSample = 0;
    const sampleW = 32;
    const sampleH = 32;
    const samplePixels = new Uint8Array(sampleW * sampleH * 4);
    const readLuminance = (now: number) => {
      const cb = propsRef.current.onSample;
      if (!cb || now - lastSample < 200) return;
      lastSample = now;
      gl.readPixels(0, 0, sampleW, sampleH, gl.RGBA, gl.UNSIGNED_BYTE, samplePixels);
      let sum = 0;
      for (let i = 0; i < samplePixels.length; i += 4) {
        // Rec. 601 luma of the sampled block.
        sum +=
          (0.299 * samplePixels[i] +
            0.587 * samplePixels[i + 1] +
            0.114 * samplePixels[i + 2]) /
          255;
      }
      cb(sum / (sampleW * sampleH));
    };

    const render = () => {
      const p = propsRef.current;
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      const now = performance.now();

      gl.useProgram(program);

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, currentTime);
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);

      gl.uniform1i(polarCoordinatesLoc, p.polar ? 1 : 0);
      gl.uniform2f(polarCenterLoc, 0.5, 0.5);
      gl.uniform1f(polarZoomLoc, p.polarZoom);
      gl.uniform1f(polarRepeatLoc, p.polarRepeat);

      const spinRotation =
        currentTime * 0.5 + (p.pointerReactive ? mouseRef.current.x * Math.PI : 0);
      gl.uniform1f(spinRotationLoc, spinRotation);
      gl.uniform1f(spinSpeedLoc, p.spinSpeed);
      gl.uniform2f(offsetLoc, p.offset[0], p.offset[1]);

      gl.uniform3fv(colour1Loc, hexToRgb(p.colorOne));
      gl.uniform3fv(colour2Loc, hexToRgb(p.colorTwo));
      gl.uniform3fv(colour3Loc, hexToRgb(p.colorThree));

      gl.uniform1f(contrastLoc, p.contrast);
      gl.uniform1f(spinAmountLoc, p.spinAmount);
      gl.uniform1f(pixelFilterLoc, p.pixelFilter);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      readLuminance(now);

      animationRef.current = requestAnimationFrame(render);
    };

    resize();

    // Track the parent box in fill mode; track the window otherwise.
    let ro: ResizeObserver | undefined;
    if (fill && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);

      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
      gl.deleteBuffer(buffer);
    };
    // Rebuild GL only when sizing strategy changes; all other props are read
    // live from propsRef inside the loop.
  }, [fill]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ touchAction: "none", display: "block", ...style }}
    />
  );
}
