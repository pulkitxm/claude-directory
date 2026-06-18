import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import GrainyGradient from "@/components/ui/gradient-shader-card";

interface Ripple {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

export default function App() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
      startTime: currentTime, // Use the synchronized time
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 2000);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-8"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <motion.div
        ref={cardRef}
        className="w-[800px] h-[600px] overflow-hidden relative cursor-pointer"
        style={{
          borderRadius: "48px",
          filter:
            "drop-shadow(0px 206px 82px rgba(0, 0, 0, 0.01)) drop-shadow(0px 116px 69px rgba(0, 0, 0, 0.05)) drop-shadow(0px 51px 51px rgba(0, 0, 0, 0.09)) drop-shadow(0px 13px 28px rgba(0, 0, 0, 0.1))",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        onClick={handleClick}
      >
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <GrainyGradient ripples={ripples} onTimeUpdate={handleTimeUpdate} />
        </Canvas>
      </motion.div>
    </div>
  );
}
