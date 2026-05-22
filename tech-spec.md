# Technical Specification — The YSM Brand Lusaka

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0 | UI framework |
| `react-dom` | ^19.0 | DOM renderer |
| `vite` | ^6.0 | Build tool |
| `@vitejs/plugin-react` | ^4.0 | Vite React plugin |
| `tailwindcss` | ^4.0 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0 | Tailwind Vite integration |
| `gsap` | ^3.12 | Animation engine (ScrollTrigger, SplitText) |
| `lenis` | ^1.2 | Smooth scroll with inertia |
| `lucide-react` | ^0.460 | Icons (Menu, X, ChevronDown, Instagram, Facebook, MessageCircle, Mail) |
| `clsx` | ^2.1 | Conditional class joining |
| `tailwind-merge` | ^2.6 | Tailwind class deduplication |

No shadcn/ui components required — this is a fully custom branded landing page with no standard UI patterns.

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| `Navigation` | Custom | Shared | Fixed header with scroll-triggered background transition. Mobile: full-screen overlay menu. |
| `Footer` | Custom | Shared | 3-column footer with social links. |
| `WhatsAppFloat` | Custom | Shared | Fixed floating button with pulse animation. Always visible. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Full-viewport video background with gradient overlay. Orchestrated entrance timeline. |
| `CountdownSection` | Custom | Live countdown timer to 4 June 2026. Glassmorphism countdown cards. |
| `PillarsSection` | Custom | 3-column pillar cards with hover lift/glow effect. |
| `EarlyAccessSection` | Custom | Email capture form with demo success state. |
| `SocialSection` | Custom | Instagram + Facebook social proof cards. |
| `AboutSection` | Custom | Asymmetric two-column (55/45) layout with stats row. |
| `ContactSection` | Custom | Centered CTA with WhatsApp button. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| `WavyText` | Custom | HeroSection, PillarsSection, CountdownSection, EarlyAccessSection, SocialSection, AboutSection, ContactSection | Letter-level wave animation using GSAP SplitText + sine-driven translateY. |
| `GlassCard` | Custom | CountdownSection, PillarsSection, SocialSection | Reusable glassmorphism container: backdrop-blur, semi-transparent bg, subtle warm border. |
| `PillButton` | Custom | Navigation, HeroSection, ContactSection | Pill-shaped button (radius 100px) with primary/secondary/outline variants. |
| `ScrollReveal` | Custom | All sections | Wrapper component using IntersectionObserver + GSAP for entrance animations. |
| `CountdownUnit` | Custom | CountdownSection | Single countdown cell (number + label) with glass card styling. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| WavyText (letter wave) | GSAP + SplitText | SplitText splits into chars. GSAP timeline with staggered `translateY` using `Math.sin(time + index * 0.3) * 8px`, duration 2s, yoyo, infinite ease-in-out. | Medium |
| ScrollReveal (section entrances) | GSAP + ScrollTrigger | IntersectionObserver triggers GSAP timeline: `opacity: 0→1, y: 40→0`, duration 0.8s, ease `cubic-bezier(0.16, 1, 0.3, 1)`. Children staggered 0.12s. | Low |
| Hero entrance sequence | GSAP timeline | Orchestrated timeline on mount: label fade (0.3s delay) → headline SplitText chars wave in with stagger (0.5s) → subtitle fade up (0.9s) → CTAs fade up (1.1s). | Medium |
| Nav background transition | CSS + scroll listener | Scroll listener toggles class past hero height. CSS transition on background + backdrop-filter. | Low |
| Countdown live update | React state + setInterval | setInterval(1000) updates time remaining. Zero state shows "WE ARE LIVE". | Low |
| Card hover lift + glow | CSS transitions | `translateY(-8px)` + border-color change + `::after` pseudo-element with radial-gradient glow. Transition 0.4s. | Low |
| Button shimmer hover | CSS animation | `::after` pseudo with shimmer gradient, `translateX(-100%)→translateX(100%)` on hover. | Low |
| Scroll indicator bounce | CSS keyframes | `translateY(0)→translateY(8px)→translateY(0)`, 2s infinite ease-in-out. | Low |
| WhatsApp pulse | CSS keyframes | `scale(1)→scale(1.05)→scale(1)`, 2s infinite. | Low |
| Mobile menu overlay | GSAP | Fade in overlay, stagger nav links from bottom. Reverse on close. | Low |

---

## State & Logic

### Countdown Timer (CountdownSection)

- **Target**: `new Date('2026-06-04T00:00:00+02:00')` (CAT timezone)
- **Logic**: `setInterval(1000)` calculates `timeRemaining = target - now`. Derives days/hours/minutes/seconds. Cleanup on unmount.
- **Zero state**: When `timeRemaining <= 0`, display "WE ARE LIVE" text replacing countdown numbers.
- **SSR safety**: All Date calculations inside `useEffect` to avoid hydration mismatch.

### Email Form (EarlyAccessSection)

- **State**: `email` (string), `submitted` (boolean)
- **Validation**: Basic email regex validation. Show error state (red border) if invalid.
- **Submit**: Set `submitted = true`, show success message. No backend call — demo state only.

### Navigation Scroll Behavior

- **State**: `scrolled` (boolean) — toggled when `scrollY > viewportHeight * 0.8`
- **Smooth scroll**: `lenis.scrollTo(target)` for all anchor links. Lenis instance shared via React context.

---

## Other Key Decisions

### Single-Page Architecture
All sections rendered on one page. Navigation links use anchor scroll (`#pillars`, `#countdown`, etc.) via Lenis smooth scroll. No React Router needed.

### Video Handling
Hero video uses native `<video>` element (not a library). Attributes: `autoPlay muted loop playsInline preload="auto"`. Provide MP4 (H.264) and WebM formats. Fallback: poster image (first frame) displayed until video loads.

### Font Loading
Playfair Display (600, 700) and Inter (400, 500, 600, 700) loaded via Google Fonts `<link>` in `index.html` with `display=swap`.

### Image Optimization
All images served as optimized WebP. Use `loading="lazy"` for below-fold images. Hero video poster and logo load eagerly.

### No External Embeds
Instagram/Facebook cards are styled mockups (generated images + static data), not actual social embeds. Avoids third-party scripts and layout shift.
