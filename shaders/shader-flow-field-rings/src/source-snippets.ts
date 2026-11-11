import currentComponent from "./components/ui/shader-animation.tsx?raw";
export const SHADER_ANIMATION_SOURCE = currentComponent;
export const DEMO_SOURCE =
	'import { ShaderAnimation } from "@/components/ui/shader-animation";\nexport default function Example() { return <ShaderAnimation />; }';
export const INSTALL_SOURCE =
	"npm ci\nnpm install --save-exact three@0.160.1\nnpm install --save-dev --save-exact @types/three@0.160.0\nnpm run dev";
export const USAGE_SOURCE =
	'import { ShaderAnimation } from "@/components/ui/shader-animation";\nexport default function Example() { return <ShaderAnimation />; }';
