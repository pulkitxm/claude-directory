# BLOOM

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
bloom.tsx
'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NestedSquaresProps {
  className?: string;
}

export function NestedSquares({ className }: NestedSquaresProps = {}) {
  const squares = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className={cn("relative w-96 h-96 flex items-center justify-center bg-background", className)}>
      {squares.map((index) => {
        const padding = (index + 1) * 10;
        const delay = index * 0.1;
        
        return (
          <motion.div
            key={index}
            className="absolute border-2 border-transparent"
            style={{
              padding: `${padding}px`,
              borderImage: `linear-gradient(45deg, 
                rgb(147, 51, 234), 
                rgb(168, 85, 247), 
                rgb(196, 181, 253), 
                rgb(139, 92, 246), 
                rgb(124, 58, 237)
              ) 1`,
            }}
            initial={{
              scale: 0,
              rotate: 0,
            }}
            animate={{
              scale: 2,
              rotate: 180,
            }}
            transition={{
              duration: 2,
              delay: delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </div>
  );
}

export function Component() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <NestedSquares />
    </div>
  );
}


demo.tsx
import { Component } from "@/components/ui/bloom";

export default function DemoOne() {
  return <Component />;
}

```

INSTALL NPM DEPENDENCIES:

```bash
framer-motion
```

IMPLEMENTATION GUIDELINES
 1. ANALYZE THE COMPONENT STRUCTURE AND IDENTIFY ALL REQUIRED DEPENDENCIES
 2. REVIEW THE COMPONENT'S ARGUMENS AND STATE
 3. IDENTIFY ANY REQUIRED CONTEXT PROVIDERS OR HOOKS AND INSTALL THEM
 4. QUESTIONS TO ASK
 - WHAT DATA/PROPS WILL BE PASSED TO THIS COMPONENT?
 - ARE THERE ANY SPECIFIC STATE MANAGEMENT REQUIREMENTS?
 - ARE THERE ANY REQUIRED ASSETS (IMAGES, ICONS, ETC.)?
 - WHAT IS THE EXPECTED RESPONSIVE BEHAVIOR?
 - WHAT IS THE BEST PLACE TO USE THIS COMPONENT IN THE APP?

STEPS TO INTEGRATE
 0. COPY PASTE ALL THE CODE ABOVE IN THE CORRECT DIRECTORIES
 1. INSTALL EXTERNAL DEPENDENCIES
 2. FILL IMAGE ASSETS WITH UNSPLASH STOCK IMAGES YOU KNOW EXIST
 3. USE LUCIDE-REACT ICONS FOR SVGS OR LOGOS IF COMPONENT REQUIRES THEM
