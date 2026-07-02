# Canonical reference snippets (from the ORIGINAL proactiv-aceternity.vercel.app)

## Logo mark (use everywhere a logo appears: nav, footer, register card)
The original logo is a 35x35 white circle with a stylized hooked "n" path in #111B21, followed by the word "Proactiv" in white bold. Replace any generic "P"/circle-with-bars/pause icon with this:

```html
<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" style="height:24px;width:24px;">
  <circle cx="17.5" cy="17.5" r="17.5" fill="white"></circle>
  <path d="M11.0389 19.8912L11.0392 28.5579C12.6769 28.5579 14.0028 27.2273 13.9972 25.5897L13.9712 18.071L13.9899 13.8938C13.9996 11.7406 15.753 10.003 17.9061 10.0126C20.0593 10.0223 21.797 11.7756 21.7873 13.9288L21.7686 18.106L21.7686 18.7764C21.7686 19.3921 22.2677 19.8912 22.8833 19.8911C23.499 19.8911 23.998 19.392 23.998 18.7764L23.998 13.5232C23.998 9.95254 21.1035 7.05796 17.5328 7.05796C13.9735 7.05796 11.0836 9.93487 11.0677 13.4942L11.0389 19.8912Z" fill="#111B21"></path>
</svg>
```

## Footer columns — NO HEADINGS
The original footer is the brand block (logo + "Copyright © 2024 Proactiv INC" / "All rights reserved") on the left, then a `grid-cols-3` of THREE BARE LINK COLUMNS with NO titles:
- Column 1: Pricing, Blog, Contact
- Column 2: Privacy Policy, Terms of Service, Refund Policy
- Column 3: Twitter (https://twitter.com/mannupaaji), LinkedIn (https://linkedin.com/in/manuarora28), GitHub (https://github.com/manuarora700)

REMOVE the invented "Product" / "Legal" / "Social" column headings on every page. Links are plain text (muted gray, hover lighter), no icons required in the columns. Use real hrefs for the social links above.

## Navbar
Logo on far left, then the nav links (Features, Pricing, Blog, Contact) grouped immediately to the RIGHT of the logo (left-biased cluster, NOT centered), then Register + "Book a demo" (cyan pill) on the far right.

## Palette
bg #08090A (charcoal/primary), accent/secondary cyan #39C3EF, muted text neutral-400/500.
