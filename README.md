# MOM - Beatbox Crew Website

A simple, offline-first landing page for the MOM beatbox crew (George, Tim, Elias).

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library (selective use)
- **vite-plugin-pwa** - Offline-first service worker

## Features

- 📱 Mobile-first responsive design
- 🔌 Offline-first (works after first load)
- 📅 Google Calendar integration (no backend needed)
- 🎥 Video background hero section
- 🎬 YouTube showcase
- 🎪 Logo slider/marquee
- ♿ Accessibility focused

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/     # Reusable UI components
  sections/       # Page sections (Hero, About, etc.)
  content/        # Configuration and content (siteConfig.ts)
  hooks/          # Custom React hooks
  lib/            # Utilities and helpers
  types/          # TypeScript type definitions
```

## Content Management

All editable content lives in `src/content/siteConfig.ts`. Non-developers can update:
- Hero text and booking email
- About section text
- Logo images
- What We Do services
- YouTube video IDs
- Google Calendar ICS URL

## Google Calendar Setup

1. Create a public Google Calendar
2. Add your show dates/events
3. Get the public ICS URL:
   - Calendar Settings → Integrate Calendar → Secret address in iCal format
4. Update `siteConfig.ts` with the ICS URL
5. Events will auto-update on the website (cached for offline use)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (zero configuration needed)

### Other Platforms

Build command: `npm run build`
Output directory: `dist`

## Performance Goals

- ✅ Loads in under 3 seconds on 3G
- ✅ Works offline after first visit
- ✅ Responsive on 320px to 2560px viewports
- ✅ Total bundle size under 500KB (excluding video)

## License

MIT
