import currentComponent from "../components/ui/shader-lines.tsx?raw";
export const INSTALL_CLI =
	"npm ci\nnpm install --save-exact three@0.171.0\nnpm install --save-dev --save-exact @types/three@0.171.0\nnpm run dev";
export const USAGE_TSX =
	'import { ShaderAnimation } from "@/components/ui/shader-lines";\nexport default function Example() { return <ShaderAnimation />; }';
export const COMPONENT_TSX = currentComponent;
export const FRAGMENT_GLSL =
	currentComponent
		.match(/const fragmentShader\s*=\s*`([\s\S]*?)`/)?.[1]
		?.trim() ?? "";
