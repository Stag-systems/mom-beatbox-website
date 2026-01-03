# Project Handover

## Quick Start
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

If `npm run dev` fails on the default port, use:
```
npm run dev -- --host 127.0.0.1 --port 5174
```

## Structure
- `src/components/` shared UI (Header).
- `src/sections/` page sections (Hero, About, WhatWeDo, YouTube, Calendar, LogoSlider).
- `src/content/siteConfig.ts` is the single source of content/config.
- `public/` for static assets (logos, videos, images).

## Key Features
- Single-page layout (no routing).
- Offline-first via Vite PWA (service worker).
- Calendar pulls from Google Calendar ICS with cache in localStorage.
- Mobile-first layout and responsive sections.

## Content Updates
Most text and media references live in:
- `src/content/siteConfig.ts`

Examples:
- Hero title/tagline/email
- About text and image
- What We Do categories
- YouTube video IDs and titles
- Logo slider entries
- Achievements list

## Assets
- About image: `public/about.gif`
- Category images: `public/4-KATEGORIEN/`
- Logos (current working set): `public/PARTNER/`

Logo slider is wired to `public/PARTNER` in:
- `src/content/siteConfig.ts` -> `logos[]`

If you add logos, place them in `public/PARTNER` and update `logos[]`.

## Known Gotchas
- PWA caching can serve stale assets in dev. If assets look outdated:
  - Hard reload (Cmd/Ctrl+Shift+R).
  - Unregister Service Worker in DevTools > Application > Service Workers.
  - Clear site data (DevTools > Application > Storage).
- Some logo sets in other folders were tested; current working config uses `public/PARTNER`.

## Recent Changes Summary
- Removed 3D logo/three.js component.
- Added category images behind cards and styled MOM MENU.
- Added achievements toggle in About.
- Adjusted hero typography and general layout spacing.
- Implemented lightbox YouTube playback.
- Added mobile carousel arrows in MOM MENU.
- Updated logo slider entries and sizing.
- Background set to dark blue/gray diffuse gradient.

## Testing
No automated tests. Manual spot-check:
- Sections render correctly
- Logo slider scrolls
- YouTube lightbox opens/closes
- Calendar loads and filters

## Contact
If anything is unclear in `siteConfig.ts`, start there and follow references.
