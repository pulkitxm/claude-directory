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
