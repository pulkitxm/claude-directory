"use client"

import { PulsingBorder, LiquidMetal } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function ShadersBackground() {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0.7, scale: 1.02, rotate: 2 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        >
          <LiquidMetal
            style={{ width: "100%", height: "100%", filter: "blur(10px)" }}
            colorBack="hsl(0, 0%, 0%, 0)"
            colorTint="hsl(29, 77%, 49%)"
            repetition={4}
            softness={0.6}
            shiftRed={0.25}
            shiftBlue={0.25}
            distortion={0.12}
            contour={1}
            shape="plane"
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={25}
            speed={2}
          />
        </motion.div>
      </div>
    </div>
  )
}
