# Sriram — Luxury Portfolio

A cinematic, luxury dark portfolio with wine/maroon/white palette, particle network hero,
and your real photo. Built with React 18, GSAP, Framer Motion, Lenis, and Tailwind CSS.

---

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Dev server  →  http://localhost:5173
npm run dev

# 3. Production build
npm run build

# 4. Preview build
npm run preview
```

---

## 📸 Add Your Photo

Copy your photo to:
```
public/photo.jpg
```
The photo is used in both the **Hero** (right panel) and **About** sections.
Best size: portrait, at least 800×1000px, JPG or WebP.

---

## 📄 Add Your Resume

Copy your resume PDF to:
```
public/resume.pdf
```

---

## ✏️ Personalise

| File | What to update |
|---|---|
| `src/components/Contact.tsx` | Email, LinkedIn URL, GitHub URL |
| `src/components/Footer.tsx` | Social links |
| `src/components/Projects.tsx` | Real project URLs |
| `src/components/Hero.tsx` | Subtitle text |
| `index.html` | OG URL, meta description |

---

## 📁 Structure

```
src/
├── App.tsx                   # Root: Lenis, Preloader, layout
├── main.tsx
├── index.css                 # Global styles, animations
├── hooks/
│   ├── useLenis.ts           # Smooth scroll (Lenis v1 + GSAP)
│   ├── useMagnetic.ts        # Magnetic button hover
│   └── useTheme.ts           # Dark/light (dark only by default)
├── 3d/
│   └── ParticleCanvas.tsx    # Wine particle network (Canvas 2D)
└── components/
    ├── Preloader.tsx          # 5s orbital SVG preloader
    ├── CustomCursor.tsx       # Dot + ring cursor
    ├── Navbar.tsx             # Scroll-hide nav + mobile menu
    ├── Hero.tsx               # Particles + photo + glitch name
    ├── About.tsx              # Photo card + parallax
    ├── Skills.tsx             # 3 cards + constellation SVG
    ├── ProjectCard.tsx        # 3D tilt card
    ├── Projects.tsx           # Masonry 2×2 grid
    ├── Highlights.tsx         # Counters + checklist
    ├── CurrentlyWorkingOn.tsx # Animated timeline
    ├── CoreStrengths.tsx      # 4 floating cards
    ├── CareerGoal.tsx         # Parallax quote section
    ├── Contact.tsx            # Form + links + resume
    └── Footer.tsx             # Watermark footer
```

---

## 🎨 Color Palette

| Token    | Hex       | Usage                |
|----------|-----------|----------------------|
| wine     | `#6B1A2A` | Primary accent       |
| maroon   | `#3D0C16` | Deepest dark         |
| crimson  | `#8B2035` | Mid accent           |
| rose     | `#C4526A` | Light accent / hover |
| white    | `#F8F4F0` | Body text            |
| cream    | `#D4C5BA` | Subtext              |
| muted    | `#9A8880` | Labels               |

---

## 🌐 Deploy

### Vercel (recommended)
```bash
npm i -g vercel
vercel --prod
```
Or: push to GitHub → import on vercel.com → auto-deploy.

### Netlify
```bash
npm run build
# drag & drop the /dist folder at netlify.com/drop
```

---

## 📦 Tech Stack

| Library         | Version | Purpose                  |
|-----------------|---------|--------------------------|
| React           | 18.3    | UI                       |
| TypeScript      | 5.6     | Types                    |
| Vite            | 5.4     | Build                    |
| Tailwind CSS    | 3.4     | Utility styles           |
| GSAP + ST       | 3.12    | ScrollTrigger animations |
| Framer Motion   | 11.11   | Micro-interactions       |
| Lenis           | 1.1     | Smooth scroll            |
| Canvas 2D API   | —       | Particle network         |
