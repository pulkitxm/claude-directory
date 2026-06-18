import { MeshGradient } from "@paper-design/shaders-react"

export default function Waitlist() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <MeshGradient
          style={{ height: "100vh", width: "100vw" }}
          distortion={0.8}
          swirl={0.1}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(216, 90%, 27%)", "hsl(243, 68%, 36%)", "hsl(205, 91%, 64%)", "hsl(211, 61%, 57%)"]}
        />
      </div>

      <div className="relative z-10">
        {/* Main content */}
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            {/* Hero section */}
            <div className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl font-sans">
              <h1 className="text-4xl md:text-6xl tracking-tight text-white drop-shadow-2xl py-[23px] font-semibold">
                We are launching SickUI soon!
                <span className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl font-sansking-tight text-white drop-shadow-2xl font-sans">
                  {" "}
                </span>
              </h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
