import { GradientMesh } from "@/components/ui/gradient-mesh";

export default function DemoOne() {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      <GradientMesh />
      <h1 className="text-black mix-blend-overlay tracking-tighter text-7xl font-bold text-center z-10">
         Gradient Mesh
      </h1>
    </div>
  );
}
