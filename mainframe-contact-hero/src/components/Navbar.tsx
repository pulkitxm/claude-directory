import { useEffect, useState } from 'react';

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
      {/* Logo — kept above the mobile overlay via relative z-10 */}
      <a href="#" className="relative z-10 flex flex-row items-center gap-3" aria-label="Mainframe home">
        <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
          Mainframe&reg;
        </span>
        <span
          className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1"
          aria-hidden="true"
        >
          &#10033;
        </span>
      </a>

      {/* Desktop nav links */}
      <nav className="hidden md:flex flex-row text-[23px] text-black" aria-label="Primary">
        {NAV_LINKS.map((label, index) => (
          <span key={label} className="flex flex-row">
            <a href="#" className="hover:opacity-60 transition-opacity">
              {label}
            </a>
            {index < NAV_LINKS.length - 1 && <span className="opacity-40">,&nbsp;</span>}
          </span>
        ))}
      </nav>

      {/* Desktop CTA */}
      <a
        href="#spade-hero"
        className="hidden md:inline-block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
      >
        Get in touch
      </a>

      {/* Mobile hamburger — above the overlay so it can close it */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        className="relative z-10 md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2"
      >
        <span
          className={`w-6 h-[2px] bg-black transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
          }`}
        />
        <span
          className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`w-6 h-[2px] bg-black transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
          }`}
        />
      </button>

      {/* Mobile navigation overlay */}
      <div
        data-testid="mobile-overlay"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-7" aria-label="Mobile">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              onClick={closeMobileMenu}
              className="text-4xl tracking-tight text-black hover:opacity-60 transition-opacity"
            >
              {label}
            </a>
          ))}
          <a
            href="#spade-hero"
            onClick={closeMobileMenu}
            className="mt-7 text-xl text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
