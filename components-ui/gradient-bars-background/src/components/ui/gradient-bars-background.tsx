import React from 'react';

interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  className?: string;
}

const GradientBars: React.FC<GradientBarsProps> = ({
  numBars = 15,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  animationDuration = 2,
  className = '',
}) => {
  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% { transform: scaleY(var(--initial-scale)); }
          100% { transform: scaleY(calc(var(--initial-scale) * 0.7)); }
        }
      `}</style>

      <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
        <div
          className="flex h-full"
          style={{
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: '100%',
                  background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${height / 100})`,
                  transformOrigin: 'bottom',
                  transition: 'transform 0.5s ease-in-out',
                  animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.1}s`,
                  outline: '1px solid rgba(0, 0, 0, 0)',
                  boxSizing: 'border-box',
                  // @ts-ignore
                  '--initial-scale': height / 100,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

interface ComponentProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function Component({
  numBars = 7,
  gradientFrom = 'rgb(255, 60, 0)',
  gradientTo = 'transparent',
  animationDuration = 2,
  backgroundColor = 'rgb(10, 10, 10)',
  children,
}: ComponentProps) {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <GradientBars
        numBars={numBars}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        animationDuration={animationDuration}
      />

      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          {children}
        </div>
      )}
    </section>
  );
}

export { Component, GradientBars };
export type { GradientBarsProps, ComponentProps };
