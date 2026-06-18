import { PlasmaWeb } from "@/components/ui/cosmic-plasma-web";

export default function DemoOne() {
  return <div className="w-full h-screen bg-black">
      <PlasmaWeb
        hueShift={200}
        density={1.2}
        glowIntensity={1.0}
        saturation={0.8}
        brightness={0.7}
        energyFlow={1.2}
        pulseIntensity={0.3}
        attractionStrength={2.0}
        mouseAttraction={true}
        transparent={false}
      />
    </div>
}
