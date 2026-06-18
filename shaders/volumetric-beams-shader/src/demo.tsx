import VolumetricBeamsFullScreen from "@/components/ui/volumetric-beams";

export default function DemoOne() {
  return (
    <VolumetricBeamsFullScreen
      className="fixed inset-0 bg-black"
      dpr={[1, 1.75]}

      // Camera/motion
      speed={2.95}
      autoRotateSpeed={0.035}
      mouseInfluence={0.35}
      pointerSmoothing={0.28}
      cameraRadius={4.8}
      fov={1.25}

      // Beam shape
      beamCount={5}
      beamHalfAngle={0.065}     // radians; 0.06–0.11
      beamEdgeSoft={0.045}
      beamRotation={0.7}
      twistDepth={0.95}         // subtle twist over Z

      // Volume/scatter
      density={0.95}
      falloff={0.15}            // radial falloff from core
      anisotropy={0.86}         // forward scattering
      lightIntensity={1.4}
      lightColor={[0.54, 0.74, 1.0]}   // cool blue core

      // Ribbing
      stripeFreq={800.0}
      stripeAmp={0.07}
      stripeSharp={0.08}
      stripeSpeed={0.102}
      stripeJitter={0.91}

      // Quality
      volSteps={190}
      stepMin={0.05}
      stepMax={0.1}
      maxDist={3.0}

      // Film/post
      bgColor={[0.04, 0.035, 0.06]}
      tint={[0.55, 0.38, 0.95]}
      grainAmount={0.005}
      vignette={0.95}
      exposure={0.5}
      gamma={2.0}
    />
  )
}
