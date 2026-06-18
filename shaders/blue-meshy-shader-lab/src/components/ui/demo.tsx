import WavyBackground from "@/components/ui/blue-meshy-background";

export default function DemoOne() {
  return (
    <WavyBackground className="flex min-h-screen items-center justify-center">
      <div className="z-10 space-y-4 text-center lg:space-y-6">
        <h4 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow-xl tracking-wide">
          Turning Ideas Into Impact
        </h4>
        <button className="px-6 py-3 text-lg font-semibold text-blue-900 bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
          Start Your Journey
        </button>
      </div>
    </WavyBackground>
  );
}
