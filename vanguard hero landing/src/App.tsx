import { useState } from 'react'
import { ArrowUpRight, Award, Crown, X } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4'

const NAV_LINKS = ['Projects', 'Studio', 'Offerings', 'Inquire']

const STATS = [
  { value: '250+', label: 'Brands Transformed' },
  { value: '95%', label: 'Client Retention' },
  { value: '10+', label: 'Years in the Game' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Scrim keeps white text legible over bright video frames */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
          <a
            href="#"
            className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl"
          >
            VANGUARD
          </a>

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-inter text-sm uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="hidden items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition-colors hover:border-white/60 hover:bg-white/10 md:flex"
          >
            GET IN TOUCH
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="space-y-1.5 md:hidden"
          >
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-4 bg-white" />
          </button>
        </header>

        <div
          data-testid="mobile-menu"
          className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
            menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
              VANGUARD
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-white"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl"
                style={{
                  transitionDelay: `${i * 80 + 100}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {link}
              </a>
            ))}

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex items-center gap-2 border border-white/30 px-8 py-4 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60 hover:bg-white/10"
              style={{
                transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              GET IN TOUCH
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>

        <main className="flex flex-1 items-center px-6 sm:px-10 lg:px-16">
          <div>
            <div className="animate-fade-up mb-6 flex items-center gap-3 lg:mb-8">
              <Crown className="h-4 w-4 text-white/70" />
              <span className="font-inter text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                World-Class Digital Collective
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Design.</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Disrupt.</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Conquer.</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-6 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8">
              We build fierce brand identities
              <br />
              that don&apos;t just turn heads —{' '}
              <span className="font-bold text-white">they lead.</span>
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10">
              <a
                href="#"
                className="group flex items-center gap-2 bg-black px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs"
              >
                SEE OUR WORK
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="hidden items-center gap-3 sm:flex">
                <Award className="h-8 w-8 text-white/50" />
                <div className="font-inter text-xs uppercase tracking-wider text-white/60">
                  <p>Top-Rated</p>
                  <p>Brand Studio</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap gap-6 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
