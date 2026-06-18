"use client";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React, { useEffect, useRef } from "react";

// Vertex shader
const vert = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
`;

// Fragment shader with water effect
const frag = (distortion: number) => `
precision highp float;

uniform float uTime;
uniform float uSwirl;
uniform float uSpeed;
uniform float uScale;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uRotation;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uWaveSpeed;
uniform float uGrain;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uResolution;

varying vec2 vUv;

// 2D noise-like wave
float wave(vec2 uv, float freq, float speed, float time) {
    return sin(uv.x * freq + time * speed) * cos(uv.y * freq + time * speed);
}

// Simple random noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Color Dodge blending
vec3 colorDodge(vec3 base, vec3 blend) {
    return min(base / (1.0 - blend + 0.0001), 1.0);
}

void main() {
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

    // Scale and offset
    uv = uv * uScale + vec2(uOffsetX, uOffsetY);

    // Rotation
    float cosR = cos(uRotation);
    float sinR = sin(uRotation);
    uv = vec2(
        uv.x * cosR - uv.y * sinR,
        uv.x * sinR + uv.y * cosR
    );

    // Water waves
    uv.x += wave(uv, uWaveFreq, uWaveSpeed, uTime) * uWaveAmp;
    uv.y += wave(uv + 10.0, uWaveFreq * 1.5, uWaveSpeed * 0.8, uTime) * uWaveAmp * 0.5;

    // Swirl
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    angle += uSwirl * radius;
    uv = vec2(cos(angle), sin(angle)) * radius;

    // Distortion loop
    float d = -uTime * 0.5 * uSpeed;
    float a = 0.0;
    for (float i = 0.0; i < ${distortion.toFixed(1)}; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
    }
    d += uTime * 0.5 * uSpeed;

    // Base color mixing
    float mix1 = (sin(d) + 1.0) * 0.5;
    float mix2 = (cos(a) + 1.0) * 0.5;
    vec3 col = mix(uColorA, uColorB, mix1);
    col = mix(col, uColorC, mix2);

    // Grain using Color Dodge
    float grain = (random(gl_FragCoord.xy + uTime) - 0.5) * uGrain;
    vec3 grainCol = vec3(0.5 + grain); // grayish grain
    col = colorDodge(col, grainCol);

    gl_FragColor = vec4(col, 1.0);
}
`;



interface NovatrixProps {
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  waveAmp?: number;
  waveFreq?: number;
  waveSpeed?: number;
  grain?: number; // NEW
}

// Convert hex to normalized RGB
const hexToRgb = (hex: string): [number, number, number] => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return [r, g, b];
};

export function GradientMesh(props: NovatrixProps): React.ReactElement {
  const ctnDom = useRef<HTMLDivElement>(null);
  const {
  colors = ["#3b2a8d", "#aaa7d7", "#f75092"],
  distortion = 5,
  swirl = 0.5,
  speed = 1.0,
  scale = 1,
  offsetX = 0.0,
  offsetY = 0.0,
  rotation = 90,
  waveAmp = 0.1,
  waveFreq = 10.0,
  waveSpeed = 0.2,
  grain = 0.06,
  ...rest
} = props;

  useEffect(() => {
    if (!ctnDom.current) return;

    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    function resize() {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
    }
    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(gl);

    const rgbColors = colors.slice(0, 3).map(hexToRgb);
    const uniforms: any = {
      uTime: { value: 0 },
      uSwirl: { value: swirl },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uOffsetX: { value: offsetX },
      uOffsetY: { value: offsetY },
      uRotation: { value: rotation },
      uWaveAmp: { value: waveAmp },
      uWaveFreq: { value: waveFreq },
      uWaveSpeed: { value: waveSpeed },
      uResolution: {
        value: new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        ),
      },
      uGrain: { value: grain },

    };

    const labels = ["A", "B", "C"];
    rgbColors.forEach((c, i) => {
      uniforms[`uColor${labels[i]}`] = { value: new Color(...c) };
    });

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag(distortion),
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animateId: number;
    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);

    ctn.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    colors, distortion, swirl, speed, scale,
    offsetX, offsetY, rotation, waveAmp, waveFreq, waveSpeed
  ]);

  return (
    <div
      ref={ctnDom}
      style={{ width: "100%", height: "100%", position: "absolute", overflow: "hidden"  }}
      {...rest}
    />
  );
}
