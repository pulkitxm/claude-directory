I WANT TO BUILD A LANDING PAGE. BEFORE I PROVIDE ANY COMPONENTS, SET UP THE PROJECT WITH THESE EXACT SPECIFICATIONS.

### PROJECT TYPE

SINGLE-PAGE LANDING PAGE WEBSITE.

### TECH STACK (DO NOT CHANGE)

- VITE + REACT
- TYPESCRIPT
- TAILWIND CSS + TAILWIND-MERGE + CLSX
- FRAMER MOTION (ANIMATIONS)
- LUCIDE REACT (ICONS)

### FOLDER STRUCTURE

```
/src
  /components
    /ui               ← All UI components go here
  /lib
    utils.ts          ← cn() utility function
  App.tsx             ← Main landing page (components stack here)
  main.tsx            ← Entry point
  index.css           ← Tailwind base styles
```

---

### STEP 1: DEPENDENCIES

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

### STEP 2: CONFIGURE PATH ALIAS

MAKE SURE `@/` RESOLVES TO `/src/`:

**VITE.CONFIG.TS:**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**TSCONFIG.JSON (ADD TO COMPILEROPTIONS):**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### STEP 3: /SRC/LIB/UTILS.TS

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### STEP 4: /SRC/INDEX.CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  -webkit-font-smoothing: antialiased;
}
```

### STEP 5: /SRC/MAIN.TSX

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### STEP 6: /SRC/APP.TSX

```tsx
function App() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Components will be stacked here */}
    </main>
  )
}

export default App
```

---

## ⛔ CRITICAL: COMPONENT CODE RULES ⛔

**READ THIS CAREFULLY. THIS IS THE MOST IMPORTANT PART.**

WHEN I PROVIDE COMPONENT CODE AFTER THIS SETUP, YOU MUST FOLLOW THESE RULES:

### 1. COPY CODE EXACTLY — ZERO CHANGES

- COPY MY CODE **CHARACTER FOR CHARACTER**
- DO NOT CHANGE A SINGLE CLASSNAME
- DO NOT CHANGE A SINGLE COLOR VALUE
- DO NOT CHANGE A SINGLE HEX CODE (#FFFFFF, #7D4EFF, ETC.)
- DO NOT CHANGE ANY TEXT CONTENT OR VALUES
- DO NOT CHANGE ANY NUMBERS (12,245 STAYS 12,245, NOT 2,847)

### 2. DO NOT ADAPT TO ANY THEME

- MY COMPONENTS HAVE THEIR OWN COLORS BUILT-IN
- IGNORE ANY GLOBAL DARK MODE OR THEME
- IF MY CODE SAYS `bg-white`, USE `bg-white` — NOT `bg-[#1a1a2e]`
- IF MY CODE SAYS `text-[#121212]`, USE `text-[#121212]` — NOT `text-white`

### 3. DO NOT REDESIGN OR "IMPROVE"

- DO NOT CHANGE LAYOUT (VERTICAL STAYS VERTICAL)
- DO NOT CHANGE BORDER-RADIUS VALUES
- DO NOT CHANGE SHADOW VALUES
- DO NOT CHANGE GRID/FLEX STRUCTURE
- DO NOT ADD YOUR OWN DESIGN PATTERNS

### 4. DO NOT CHANGE STRUCTURE

- IF I HAVE 4 STATCARDS, CREATE EXACTLY 4 STATCARDS
- IF CARDS ARE STACKED VERTICALLY, KEEP THEM VERTICAL
- IF I USE `rounded-full`, KEEP `rounded-full` — NOT `rounded-xl`

### 5. PATH TRANSLATION ONLY

THE ONLY THING YOU MAY TRANSLATE:

- `/components/ui/` → `/src/components/ui/`
- `/app/page.tsx` → `/src/App.tsx`
- `/lib/utils` → `/src/lib/utils`

### 6. IGNORE "use client"

MY CODE MAY HAVE `"use client"` AT THE TOP. KEEP IT — IT CAUSES NO HARM IN VITE.

### 7. SILENT EXECUTION

- DO NOT ASK QUESTIONS
- DO NOT SUGGEST IMPROVEMENTS
- DO NOT EXPLAIN WHAT YOU'RE DOING
- JUST CREATE THE FILE AND UPDATE APP.TSX

---

## ❌ EXAMPLES OF VIOLATIONS (DO NOT DO THESE)

| MY CODE | WRONG (VIOLATION) | CORRECT |
|---------|-------------------|---------|
| `bg-white` | `bg-[#1a1a2e]/80` | `bg-white` |
| `text-[#121212]` | `text-white` | `text-[#121212]` |
| `value="12,245"` | `value="2,847"` | `value="12,245"` |
| `rounded-full` | `rounded-xl` | `rounded-full` |
| 4 VERTICAL CARDS | 2X2 GRID | 4 VERTICAL CARDS |
| `border-[#F1F1F1]` | `border-white/5` | `border-[#F1F1F1]` |

**IF YOU CHANGE ANY OF THESE, YOU HAVE FAILED THE TASK.**

---

## ✅ WHAT SUCCESS LOOKS LIKE

1. FILE CREATED AT EXACT PATH (WITH /SRC/ PREFIX)
2. CODE IS **IDENTICAL** TO WHAT I PROVIDED
3. COMPONENT IMPORTED INTO APP.TSX
4. COMPONENT RENDERS WITH MY COLORS, MY LAYOUT, MY VALUES
5. NO "DARK MODE ADAPTATION"
6. NO "DESIGN IMPROVEMENTS"

---

### CONFIRMATION

REPLY ONLY WITH:

1. "PROJECT SETUP COMPLETE"
2. A LIST OF THE FILES CREATED
3. THE CURRENT CODE FOR `/src/App.tsx`

THEN WAIT FOR MY FIRST COMPONENT.

**REMEMBER: YOUR JOB IS TO BE A COPY MACHINE, NOT A DESIGNER.**
