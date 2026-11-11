export const INSTALL_CMD = "npm install @paper-design/shaders-react@0.0.82";
export const SHADCN_INIT = "npm ci\nnpm run dev";
export const COMPONENT_SRC = `import { GrainGradient } from "@paper-design/shaders-react";
export function Background() { return <GrainGradient style={{ width: "100%", height: "100%" }} />; }`;
export const USAGE_SRC = `import { GrainGradientStage } from "./components/ui/grain-gradient-stage";
export function Example() { return <GrainGradientStage shape="corners" speed={1} />; }`;
export const PARAMETRIC_SRC = `import { GrainGradientStage } from "./components/ui/grain-gradient-stage";
export function Example({ speed }: { speed: number }) { return <GrainGradientStage speed={speed} />; }`;
