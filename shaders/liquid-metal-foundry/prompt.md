# INTEGRATE AN EXISTING REACT COMPONENT

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
background-shades.tsx
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

demo.tsx
import ShadersBackground from "@/components/ui/background-shades";

export default function DemoOne() {
  return <ShadersBackground />;
}

```

INSTALL NPM DEPENDENCIES:

```bash
framer-motion, @paper-design/shaders-react
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
