# UI Revamp Design Spec

## Overview

Full visual redesign of Felix Omondi's portfolio from a dark terminal/hacker aesthetic to a clean, minimal, light design with quiet playful personality. No chatbot. No AI slop.

**Design philosophy**: "Quiet Confidence" — extreme minimalism with personality hiding in micro-interactions. The coral accent pops because it's used sparingly.

## Pages

All existing pages stay: Home, Projects, Project Detail, Experience, Contact. The Gemini chatbot (ChatbotButton + Chatbot components) is removed entirely.

---

## 1. Color System

| Token           | Value     | Usage                                      |
|-----------------|-----------|--------------------------------------------|
| `bg-base`       | `#F5F7FA` | Page background                            |
| `bg-surface`    | `#FFFFFF` | Cards, elevated surfaces                   |
| `border-default`| `#E2E6ED` | Card borders, dividers                     |
| `text-primary`  | `#1A1D23` | Headings, primary content                  |
| `text-secondary`| `#6B7280` | Descriptions, metadata                     |
| `text-muted`    | `#9CA3AF` | Captions, timestamps                       |
| `accent`        | `#E8725C` | Links, hovers, interactive highlights      |
| `accent-hover`  | `#D4614D` | Darker coral for hover states              |
| `accent-soft`   | `#FEF0ED` | Light coral tint for tags, badges          |

No dark mode. One theme, done well.

---

## 2. Typography

**Font**: Plus Jakarta Sans (Google Fonts, free)

| Element              | Weight         | Size             | Tracking  | Color            |
|----------------------|----------------|------------------|-----------|------------------|
| Page title (h1)      | 700 (Bold)     | 3rem / 48px      | -0.03em   | `text-primary`   |
| Section heading (h2) | 600 (Semi)     | 1.75rem / 28px   | -0.02em   | `text-primary`   |
| Card title (h3)      | 600 (Semi)     | 1.25rem / 20px   | -0.01em   | `text-primary`   |
| Body text            | 400 (Regular)  | 1rem / 16px      | normal    | `text-secondary` |
| Small/caption        | 400 (Regular)  | 0.875rem / 14px  | normal    | `text-muted`     |
| Links                | 500 (Medium)   | inherit          | normal    | `accent`         |

**Rules**:
- No monospace anywhere — clean break from terminal aesthetic
- Tight negative tracking on headings for confident feel
- Body line-height: 1.6
- One font family for everything

---

## 3. Layout & Spacing

**Container**: Max-width `960px`, centered.

**Spacing scale**:
- Section gaps: `80px`
- Card gaps: `24px`
- Inner card padding: `24px`
- Page top padding: `120px`

**Navigation**:
- Fixed top bar, white background, subtle bottom border
- Name on left (plain text, bold, links to home)
- Page links on right: Projects, Experience, Contact
- No icons, no logo
- Mobile: hamburger menu
- Active page: coral underline

**Grids**:
- Projects: 2-column on desktop, 1-column on mobile
- Experience: single column, stacked cards
- Home: single column, sequential sections

**Footer**:
- Minimal: name, year, 2-3 social links (GitHub, LinkedIn)

---

## 4. Components

### Cards
- White background (`bg-surface`)
- `1px` border in `border-default`
- `8px` border-radius
- No shadow at rest
- Hover: subtle shadow (`0 4px 12px rgba(0,0,0,0.06)`) + translate up `2px`
- Transition: `200ms ease`

### Buttons
- Primary: coral background, white text, `8px` radius, `500` weight
- Secondary: transparent, `1px` border in `border-default`, `text-primary`
- Hover: darken slightly, no glow, no scale

### Tags/Pills
- `accent-soft` background (`#FEF0ED`)
- Coral text (`accent`)
- `4px` radius, small padding
- No borders

### Links
- Coral colored, no underline at rest
- Underline on hover (simple `text-decoration`)

### Form Inputs
- White background, `1px` border
- Focus: border transitions to coral, no box-shadow glow
- Placeholder: `text-muted`

### Dividers
- `1px` line in `border-default`, full container width
- Playful detail: tiny hand-drawn squiggle `~` in coral at center

---

## 5. Micro-interactions & Personality

### Hover Interactions
- Project cards: `2px` lift with soft shadow fade-in
- Links: coral underline slides in from left (CSS only)
- Nav items: small coral dot appears below on hover

### Page Transitions
- Sections fade in on scroll with `20px` upward movement
- `100ms` stagger between items (Framer Motion)
- `300ms` max duration — fast, not dramatic

### Playful Details (one per page)
- **Home**: Name letter-spacing shifts subtly on hover (breathing effect)
- **Projects**: Card hover rotates `0.5deg` — barely noticeable
- **Experience**: Cards fade in with a slightly longer stagger (`150ms`) for a cascading feel
- **Contact**: Send button text changes to "Sending..." with ellipsis animation
- **Footer**: Small `~` next to name changes color on hover

### What We're NOT Doing
- No particle effects
- No gradient animations
- No parallax scrolling
- No animated backgrounds
- No cursor effects
- No page transition animations between routes
- No loading screens

---

## 6. Page Structure

### Home
- Hero: name (h1), one-line bio in `text-secondary`, no avatar
- 2-3 sentence about paragraph
- "Featured Projects" section: 2-3 top project cards
- "Get in touch" line with link to contact
- No system snapshots, no education section, no terminal styling

### Projects
- Page title + one-line description
- 2-column card grid
- Each card: project name (h3), short description, tech pills, link arrow
- Cards link to detail pages or external URLs

### Project Detail
- Back link ("Back to projects", coral)
- Title (h1), description
- Tech stack pills
- Content / screenshots
- Links to live demo + GitHub

### Experience
- Page title + one-line description
- Stacked cards: role, company, date range, description, skill pills
- No timeline — just clean stacked cards

### Contact
- Page title + friendly message
- Form: name, email, message, send button
- Social links below
- No "guidelines" section

---

## 7. Removals

- `Chatbot.tsx` and `ChatbotButton.tsx` — deleted
- `/api/chat` route — deleted
- All terminal styling (`$ prompt`, `// comment`, monospace UI text)
- Glassmorphic effects, noise overlays, gradient backgrounds, grid patterns
- Dark color scheme entirely
- `next-themes` (no dark mode toggle needed)
- GEMINI_API_KEY from environment (chat API removed)

---

## 8. Tech Stack Changes

- **Keep**: Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lucide React, Resend
- **Add**: Plus Jakarta Sans (Google Fonts)
- **Remove**: next-themes, Gemini API dependency
- **Modify**: globals.css completely rewritten, all page files redesigned
