# GEOMETRIC BLUR MESH — COMPONENT INTEGRATION

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
geometric-blur-mesh.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";

const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform int u_shape;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.2831853071795864769252867665590

// 3D rotation matrices
mat3 rotateX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, -s,
        0.0, s, c
    );
}

mat3 rotateY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}

mat3 rotateZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1.0
    );
}

// Coordinate normalization
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    return p;
}

// Project 3D point to 2D
vec2 project(vec3 p) {
    float perspective = 2.0 / (2.0 - p.z);
    return p.xy * perspective;
}

// Distance from point to line segment
float distToSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// Draw a line with blur effect
float drawLine(vec2 p, vec2 a, vec2 b, float thickness, float blur) {
    float d = distToSegment(p, a, b);
    return smoothstep(thickness + blur, thickness - blur, d);
}

// Get cube vertices
void getCubeVertices(out vec3 v[8]) {
    float s = 0.7; // Scale down cube
    v[0] = vec3(-s, -s, -s);
    v[1] = vec3( s, -s, -s);
    v[2] = vec3( s,  s, -s);
    v[3] = vec3(-s,  s, -s);
    v[4] = vec3(-s, -s,  s);
    v[5] = vec3( s, -s,  s);
    v[6] = vec3( s,  s,  s);
    v[7] = vec3(-s,  s,  s);
}

// Get tetrahedron vertices
void getTetrahedronVertices(out vec3 v[4]) {
    float a = 1.0 / sqrt(3.0);
    v[0] = vec3( a,  a,  a);
    v[1] = vec3( a, -a, -a);
    v[2] = vec3(-a,  a, -a);
    v[3] = vec3(-a, -a,  a);
}

// Get octahedron vertices
void getOctahedronVertices(out vec3 v[6]) {
    v[0] = vec3( 1.0,  0.0,  0.0);
    v[1] = vec3(-1.0,  0.0,  0.0);
    v[2] = vec3( 0.0,  1.0,  0.0);
    v[3] = vec3( 0.0, -1.0,  0.0);
    v[4] = vec3( 0.0,  0.0,  1.0);
    v[5] = vec3( 0.0,  0.0, -1.0);
}

// Get icosahedron vertices (12 vertices)
void getIcosahedronVertices(out vec3 v[12]) {
    float t = (1.0 + sqrt(5.0)) / 2.0;
    float s = 1.0 / sqrt(1.0 + t * t);
    
    v[0] = vec3(-s, t * s, 0);
    v[1] = vec3( s, t * s, 0);
    v[2] = vec3(-s, -t * s, 0);
    v[3] = vec3( s, -t * s, 0);
    
    v[4] = vec3(0, -s, t * s);
    v[5] = vec3(0,  s, t * s);
    v[6] = vec3(0, -s, -t * s);
    v[7] = vec3(0,  s, -t * s);
    
    v[8] = vec3( t * s, 0, -s);
    v[9] = vec3( t * s, 0,  s);
    v[10] = vec3(-t * s, 0, -s);
    v[11] = vec3(-t * s, 0,  s);
}

// Transform and project vertices
void transformVertices(inout vec3 vertices[12], int count, mat3 rotation, float scale) {
    for (int i = 0; i < 12; i++) {
        if (i < count) {
            vertices[i] = rotation * (vertices[i] * scale);
        }
    }
}

// Draw wireframe shape
float drawWireframe(vec2 p, int shape, mat3 rotation, float scale, float thickness, float blur) {
    float result = 0.0;
    
    if (shape == 0) {
        // Cube - 12 edges
        vec3 v[8];
        getCubeVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 8; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw edges
        // Bottom face
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        
        // Top face
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[4]), thickness, blur);
        
        // Vertical edges
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[7]), thickness, blur);
        
    } else if (shape == 1) {
        // Tetrahedron - 6 edges
        vec3 v[4];
        getTetrahedronVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 4; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw all edges
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        
    } else if (shape == 2) {
        // Octahedron - 12 edges
        vec3 v[6];
        getOctahedronVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 6; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw edges connecting to top vertex
        result += drawLine(p, project(v[2]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[5]), thickness, blur);
        
        // Draw edges connecting to bottom vertex
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur);
        
        // Draw middle square
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[0]), thickness, blur);
        
    } else if (shape == 3) {
        // Icosahedron - 30 edges
        vec3 v[12];
        getIcosahedronVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 12; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw all 30 edges of icosahedron
        // Each vertex connects to exactly 5 others
        
        // Vertex 0 connections
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[11]), thickness, blur);
        
        // Vertex 1 connections (excluding already drawn)
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[9]), thickness, blur);
        
        // Vertex 2 connections
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[11]), thickness, blur);
        
        // Vertex 3 connections (excluding already drawn)
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[9]), thickness, blur);
        
        // Vertex 4 connections (excluding already drawn)
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[11]), thickness, blur);
        
        // Vertex 5 connections (excluding already drawn)
        result += drawLine(p, project(v[5]), project(v[11]), thickness, blur);
        
        // Vertex 6 connections (excluding already drawn)
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[10]), thickness, blur);
        
        // Vertex 7 connections (excluding already drawn)
        result += drawLine(p, project(v[7]), project(v[10]), thickness, blur);
        
        // Vertex 8 connections (excluding already drawn)
        result += drawLine(p, project(v[8]), project(v[9]), thickness, blur);
        
        // Vertex 9 connections (excluding already drawn)
        result += drawLine(p, project(v[9]), project(v[11]), thickness, blur);
        
        // Vertex 10 connections (excluding already drawn)
        result += drawLine(p, project(v[10]), project(v[11]), thickness, blur);
        
    } else if (shape == 4) {
        // Pyramid - 8 edges
        vec3 v[5];
        float s = 0.7; // Scale down pyramid base
        v[0] = vec3(-s, 0.0, -s);
        v[1] = vec3( s, 0.0, -s);
        v[2] = vec3( s, 0.0,  s);
        v[3] = vec3(-s, 0.0,  s);
        v[4] = vec3( 0.0, 1.0,  0.0); // Lower height
        
        // Transform vertices
        for (int i = 0; i < 5; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Base
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        
        // Edges to apex
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        
    } else if (shape == 5) {
        // Double pyramid (diamond) - 12 edges
        vec3 v[6];
        float s = 0.6; // Scale down diamond
        v[0] = vec3(-s, 0.0, -s);
        v[1] = vec3( s, 0.0, -s);
        v[2] = vec3( s, 0.0,  s);
        v[3] = vec3(-s, 0.0,  s);
        v[4] = vec3( 0.0,  1.0,  0.0);
        v[5] = vec3( 0.0, -1.0,  0.0);
        
        // Transform vertices
        for (int i = 0; i < 6; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Middle square
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        
        // Top pyramid
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        
        // Bottom pyramid
        result += drawLine(p, project(v[0]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur);
        
    } else if (shape == 6) {
        // Hexagonal prism - 18 edges
        vec3 v[12];
        float angleStep = TWO_PI / 6.0;
        
        // Generate hexagon vertices - unrolled loop
        v[0] = vec3(cos(0.0 * angleStep), -1.0, sin(0.0 * angleStep));
        v[1] = vec3(cos(1.0 * angleStep), -1.0, sin(1.0 * angleStep));
        v[2] = vec3(cos(2.0 * angleStep), -1.0, sin(2.0 * angleStep));
        v[3] = vec3(cos(3.0 * angleStep), -1.0, sin(3.0 * angleStep));
        v[4] = vec3(cos(4.0 * angleStep), -1.0, sin(4.0 * angleStep));
        v[5] = vec3(cos(5.0 * angleStep), -1.0, sin(5.0 * angleStep));
        
        v[6] = vec3(cos(0.0 * angleStep), 1.0, sin(0.0 * angleStep));
        v[7] = vec3(cos(1.0 * angleStep), 1.0, sin(1.0 * angleStep));
        v[8] = vec3(cos(2.0 * angleStep), 1.0, sin(2.0 * angleStep));
        v[9] = vec3(cos(3.0 * angleStep), 1.0, sin(3.0 * angleStep));
        v[10] = vec3(cos(4.0 * angleStep), 1.0, sin(4.0 * angleStep));
        v[11] = vec3(cos(5.0 * angleStep), 1.0, sin(5.0 * angleStep));
        
        // Transform vertices - unrolled loop
        v[0] = rotation * (v[0] * scale);
        v[1] = rotation * (v[1] * scale);
        v[2] = rotation * (v[2] * scale);
        v[3] = rotation * (v[3] * scale);
        v[4] = rotation * (v[4] * scale);
        v[5] = rotation * (v[5] * scale);
        v[6] = rotation * (v[6] * scale);
        v[7] = rotation * (v[7] * scale);
        v[8] = rotation * (v[8] * scale);
        v[9] = rotation * (v[9] * scale);
        v[10] = rotation * (v[10] * scale);
        v[11] = rotation * (v[11] * scale);
        
        // Draw bottom hexagon - unrolled
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[0]), thickness, blur);
        
        // Draw top hexagon - unrolled
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[8]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[9]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[10]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[11]), project(v[6]), thickness, blur);
        
        // Draw vertical edges - unrolled
        result += drawLine(p, project(v[0]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[11]), thickness, blur);
        
    } else {
        // Animated morphing shape
        float t = u_time * 0.5;
        float morph = sin(t) * 0.5 + 0.5;
        
        // Morph between cube and octahedron
        vec3 cube[8];
        getCubeVertices(cube);
        
        vec3 octa[6];
        getOctahedronVertices(octa);
        
        // Create morphed vertices
        vec3 v[8];
        for (int i = 0; i < 8; i++) {
            if (i < 6) {
                v[i] = mix(cube[i], octa[i] * 1.5, morph);
            } else {
                v[i] = cube[i] * (1.0 - morph * 0.3);
            }
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw morphed edges
        float alpha = 1.0 - morph * 0.5;
        
        // Cube edges (fade out as morphing)
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur) * alpha;
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur) * alpha;
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur) * alpha;
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur) * alpha;
        
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur) * alpha;
        result += drawLine(p, project(v[5]), project(v[6]), thickness, blur) * alpha;
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur) * alpha;
        result += drawLine(p, project(v[7]), project(v[4]), thickness, blur) * alpha;
        
        // Morphing diagonals (octahedron-like)
        result += drawLine(p, project(v[0]), project(v[6]), thickness, blur) * morph;
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur) * morph;
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur) * morph;
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur) * morph;
    }
    
    return clamp(result, 0.0, 1.0);
}

// Main rendering function
vec3 render(vec2 st, vec2 mouse) {
    // Calculate mouse influence for hover effect - stronger falloff
    float mouseDistance = length(st - mouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
    
    // Smooth rotation based on time and subtle mouse influence
    float time = u_time * 0.2;
    mat3 rotation = rotateY(time + (mouse.x - 0.5) * mouseInfluence * 1.0) * 
                    rotateX(time * 0.7 + (mouse.y - 0.5) * mouseInfluence * 1.0) * 
                    rotateZ(time * 0.1);
    
    // Single layer with elegant parameters
    float scale = 0.35;
    
    // INVERTED: Hover creates blur effect
    // Near mouse: blurry (0.05), far from mouse: sharp (0.0001)
    float blur = mix(0.0001, 0.05, mouseInfluence);
    
    // Dynamic thickness - thicker when blurred, thinner when clear
    float thickness = mix(0.002, 0.003, mouseInfluence);
    
    // Draw wireframe
    float shape = drawWireframe(st, u_shape, rotation, scale, thickness, blur);
    
    // Simple white with subtle blue tint
    vec3 color = vec3(0.9, 0.95, 1.0);
    
    // Subtle dimming on hover (instead of glow)
    float dimming = 1.0 - mouseInfluence * 0.3;
    
    color *= shape * dimming;
    
    // Very subtle vignette for depth
    float vignette = 1.0 - length(st) * 0.2;
    color *= vignette;
    
    // Soft tone mapping
    color = pow(color, vec3(0.9));
    
    return color;
}

void main() {
    vec2 st = coord(gl_FragCoord.xy);
    vec2 mouse = coord(u_mouse * u_pixelRatio) * vec2(1., -1.);
    
    vec3 color = render(st, mouse);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_texcoord;

void main() {
    gl_Position = vec4(a_position, 1.0);
    v_texcoord = a_uv;
}
`;

const shapes = [
    "Cube",
    "Tetrahedron", 
    "Octahedron",
    "Icosahedron",
    "Pyramid",
    "Diamond",
    "Hexagonal Prism",
    "Morphing"
];

export default function GeometricBlurMesh() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const mouseDampRef = useRef({ x: 0, y: 0 });
    const [currentShape, setCurrentShape] = useState(0);
    const animationFrameRef = useRef<number>();
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
    const startTimeRef = useRef(Date.now());

    // Initialize WebGL
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', {
            antialias: true,
            alpha: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false
        });

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        glRef.current = gl;
        
        // Set clear color to pure black
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Create shaders
        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            
            return shader;
        };

        const vShader = createShader(gl.VERTEX_SHADER, vertexShader);
        const fShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);
        
        if (!vShader || !fShader) return;

        // Create program
        const program = gl.createProgram();
        if (!program) return;
        
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            return;
        }
        
        programRef.current = program;
        gl.useProgram(program);

        // Get uniform locations
        uniformsRef.current = {
            u_mouse: gl.getUniformLocation(program, 'u_mouse'),
            u_resolution: gl.getUniformLocation(program, 'u_resolution'),
            u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
            u_time: gl.getUniformLocation(program, 'u_time'),
            u_shape: gl.getUniformLocation(program, 'u_shape')
        };

        // Create geometry
        const vertices = new Float32Array([
            -1, -1, 0,
             1, -1, 0,
            -1,  1, 0,
             1,  1, 0
        ]);

        const uvs = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            1, 1
        ]);

        // Position buffer
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        // UV buffer
        const uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
        
        const uvLocation = gl.getAttribLocation(program, 'a_uv');
        gl.enableVertexAttribArray(uvLocation);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

        return () => {
            gl.deleteProgram(program);
            gl.deleteShader(vShader);
            gl.deleteShader(fShader);
        };
    }, []);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;

            const dpr = Math.min(window.devicePixelRatio, 2);
            const width = container.clientWidth;
            const height = container.clientHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const gl = glRef.current;
            if (gl) {
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            
            mouseRef.current = {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
        };
    }, []);

    // Handle click to change shape
    useEffect(() => {
        const handleClick = () => {
            setCurrentShape(prev => (prev + 1) % shapes.length);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('click', handleClick);
            return () => container.removeEventListener('click', handleClick);
        }
    }, []);

    // Handle keyboard
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key >= '1' && e.key <= '8') {
                const index = parseInt(e.key) - 1;
                if (index < shapes.length) {
                    setCurrentShape(index);
                }
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    // Animation loop
    useEffect(() => {
        let lastTime = performance.now();

        const animate = (time: number) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            const canvas = canvasRef.current;
            const gl = glRef.current;
            const program = programRef.current;
            
            if (!canvas || !gl || !program) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            // Smooth mouse movement
            const dampingFactor = 8;
            mouseDampRef.current.x += (mouseRef.current.x - mouseDampRef.current.x) * dampingFactor * deltaTime;
            mouseDampRef.current.y += (mouseRef.current.y - mouseDampRef.current.y) * dampingFactor * deltaTime;

            // Clear and render
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Update uniforms
            const dpr = Math.min(window.devicePixelRatio, 2);
            const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
            
            if (uniformsRef.current.u_mouse) {
                gl.uniform2f(uniformsRef.current.u_mouse, mouseDampRef.current.x, mouseDampRef.current.y);
            }
            
            if (uniformsRef.current.u_resolution) {
                gl.uniform2f(uniformsRef.current.u_resolution, canvas.width, canvas.height);
            }
            
            if (uniformsRef.current.u_pixelRatio) {
                gl.uniform1f(uniformsRef.current.u_pixelRatio, dpr);
            }
            
            if (uniformsRef.current.u_time) {
                gl.uniform1f(uniformsRef.current.u_time, elapsedTime);
            }
            
            if (uniformsRef.current.u_shape) {
                gl.uniform1i(uniformsRef.current.u_shape, currentShape);
            }

            // Draw
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [currentShape]);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black cursor-pointer overflow-hidden">
            <canvas 
                ref={canvasRef}
                className="w-full h-full"
            />
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none text-center">
                <div className="text-white/20 text-xs font-light tracking-widest">
                    {shapes[currentShape].toUpperCase()}
                </div>
                <div className="text-white/10 text-[10px] font-light mt-1 tracking-wide">
                    CLICK TO SWITCH
                </div>
            </div>
        </div>
    );
}

export const Component = GeometricBlurMesh;

demo.tsx
import { Component } from "@/components/ui/geometric-blur-mesh";

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

---

IS IT POSSIBLE TO RECORD THIS WITH SOME MOUSE GESTURES? LIKE THIS INVOLVES CURSOR RELATED ANIMATIONS SO YEAH
