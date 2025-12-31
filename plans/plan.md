# MOM Beatbox Crew Landing Page - Project Plan

## Overview
Building an offline-first, mobile-responsive landing page for the MOM beatbox crew (George, Tim, Elias). Single-page app with no backend, using Google Calendar for client-managed show dates.

## Project Phases

### Phase 1: Foundation & Setup
- [ ] Scaffold Vite + React + TypeScript project
- [ ] Install and configure Tailwind CSS
- [ ] Initialize shadcn/ui (base setup only)
- [ ] Set up project folder structure (components, sections, content, hooks, lib, types)
- [ ] Create [`siteConfig.ts`](../src/content/siteConfig.ts) with all content placeholders
- [ ] Set up basic TypeScript types for events, config, etc.

### Phase 2: Base Layout & Shell
- [ ] Create main [`App.tsx`](../src/App.tsx) with section containers
- [ ] Add semantic HTML structure (header, main, sections, footer)
- [ ] Set up Tailwind base styles and theme configuration
- [ ] Create placeholder sections (empty divs with IDs for navigation)
- [ ] Test: Verify page structure renders correctly

### Phase 3: Hero Section
- [ ] Create [`Hero.tsx`](../src/sections/Hero.tsx) component
- [ ] Add MP4 video background with autoplay/loop/muted
- [ ] Implement dark overlay for text readability
- [ ] Add "MOM" title with large, bold styling
- [ ] Add tagline text from config
- [ ] Add shadcn/ui Button for "Book" CTA (mailto link)
- [ ] Make fully responsive (mobile-first)
- [ ] Test: Video plays, text is readable, button works

### Phase 4: About Section
- [ ] Create [`About.tsx`](../src/sections/About.tsx) component
- [ ] Add text content from config
- [ ] Add placeholder image with proper aspect ratio
- [ ] Implement responsive two-column layout (mobile stacks)
- [ ] Add proper spacing and typography
- [ ] Test: Layout works on mobile and desktop

### Phase 5: Logo Slider/Marquee
- [ ] Create [`LogoSlider.tsx`](../src/sections/LogoSlider.tsx) component
- [ ] Implement CSS-based infinite marquee animation
- [ ] Add placeholder white logos from config
- [ ] Ensure smooth animation performance
- [ ] Make responsive (adjust speed/size for mobile)
- [ ] Test: Animation is smooth, logos are visible

### Phase 6: What We Do Carousel
- [ ] Create [`WhatWeDo.tsx`](../src/sections/WhatWeDo.tsx) component
- [ ] Implement horizontal scroll-snap carousel
- [ ] Add cards for Kidsshow, Workshops, Concerts
- [ ] Include icon placeholders and descriptions from config
- [ ] Add touch/swipe support for mobile
- [ ] Add optional navigation dots or arrows
- [ ] Test: Carousel scrolls smoothly on mobile and desktop

### Phase 7: YouTube Showcase
- [ ] Create [`YouTubeShowcase.tsx`](../src/sections/YouTubeShowcase.tsx) component
- [ ] Implement responsive grid layout (1 col mobile, 2-3 cols desktop)
- [ ] Add lazy-loading for YouTube embeds (thumbnail → iframe on click)
- [ ] Pull video IDs from config
- [ ] Add proper aspect ratio containers (16:9)
- [ ] Test: Videos load on demand, grid is responsive

### Phase 8: Calendar Section - Core Logic
- [ ] Create [`Calendar.tsx`](../src/sections/Calendar.tsx) component
- [ ] Create [`useLocalStorage.ts`](../src/hooks/useLocalStorage.ts) hook
- [ ] Create [`calendarService.ts`](../src/lib/calendarService.ts) with:
  - `fetchIcs(url)` with 10s timeout
  - `parseIcsToEvents(icsText)` function
  - Error handling for network/parse failures
- [ ] Create Event type definition
- [ ] Test: ICS fetch and parse works with sample data

### Phase 9: Calendar Section - UI & Caching
- [ ] Implement localStorage caching for events
- [ ] Add "Upcoming Shows" list view
- [ ] Display event title, date, location (if available)
- [ ] Show "Last updated: X minutes ago" indicator
- [ ] Add loading state during fetch
- [ ] Add error state with friendly message
- [ ] Add empty state for offline + no cache
- [ ] Test: Cache works, offline mode shows cached data

### Phase 10: PWA & Offline Support
- [ ] Install and configure `vite-plugin-pwa`
- [ ] Configure service worker to cache:
  - HTML, CSS, JS bundles
  - Static assets (images, fonts)
  - Hero video (or fallback image)
- [ ] Add web app manifest
- [ ] Test offline mode:
  - Load page online
  - Go offline
  - Reload page (should work)
  - Check cached calendar events display

### Phase 11: Mobile Responsiveness Pass
- [ ] Test all sections on mobile (320px - 480px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1280px+)
- [ ] Fix any layout issues
- [ ] Ensure touch targets are 44x44px minimum
- [ ] Test landscape orientation on mobile
- [ ] Verify video background works on mobile

### Phase 12: Accessibility Audit
- [ ] Verify heading hierarchy (h1 → h2 → h3)
- [ ] Add alt text to all images
- [ ] Add ARIA labels where needed
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Ensure focus states are visible
- [ ] Check color contrast (WCAG AA minimum)
- [ ] Test with screen reader (basic check)
- [ ] Add skip-to-content link if needed

### Phase 13: Performance Optimization
- [ ] Optimize images (compress, use WebP where possible)
- [ ] Lazy-load images below the fold
- [ ] Minimize bundle size (check with `npm run build`)
- [ ] Ensure bundle < 500KB (excluding video)
- [ ] Test load time on simulated 3G
- [ ] Add loading states for async operations
- [ ] Optimize video file size

### Phase 14: Documentation - README
- [ ] Create comprehensive [`README.md`](../README.md) with:
  - Project description
  - Local development setup (`npm install`, `npm run dev`)
  - Build instructions (`npm run build`)
  - Deployment to Vercel (step-by-step)
  - Where to change content ([`siteConfig.ts`](../src/content/siteConfig.ts))
  - How client updates show dates (Google Calendar guide)

### Phase 15: Documentation - Google Calendar Guide
- [ ] Create [`docs/google-calendar-setup.md`](../docs/google-calendar-setup.md) with:
  - How to create a public Google Calendar
  - How to make calendar public
  - How to get the public ICS URL
  - How to add/edit events
  - How to update the ICS URL in config
  - Screenshots/visual guide

### Phase 16: Final Testing & Polish
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Fix any remaining bugs
- [ ] Clean up console warnings/errors
- [ ] Remove unused dependencies
- [ ] Final code review for simplicity
- [ ] Verify all placeholder content is clearly marked

### Phase 17: Deployment Preparation
- [ ] Create Vercel configuration (if needed)
- [ ] Test production build locally
- [ ] Verify PWA works in production mode
- [ ] Prepare deployment checklist for client
- [ ] Document environment variables (if any)

## Success Metrics

- ✅ Page loads in < 3 seconds on 3G
- ✅ Works offline after first visit
- ✅ Responsive on 320px to 2560px viewports
- ✅ Client can update calendar without developer
- ✅ No console errors or warnings
- ✅ Passes basic accessibility checks
- ✅ Total bundle size < 500KB (excluding video)
- ✅ All sections render correctly on mobile and desktop

## Risk Mitigation

### Risk: ICS parsing complexity
**Mitigation**: Use well-tested library (ical.js), add comprehensive error handling

### Risk: Video file too large
**Mitigation**: Compress video, provide fallback image, consider not caching in service worker

### Risk: Google Calendar ICS URL changes
**Mitigation**: Document clearly in README, make URL easy to update in config

### Risk: Offline mode not working
**Mitigation**: Test thoroughly, provide clear error messages, ensure graceful degradation

## Notes

- Keep each implementation step small and testable
- Refer to [`AGENT.md`](../AGENT.md) for coding guidelines
- Prefer simplicity over cleverness
- Test on real mobile devices when possible
- Document any deviations from plan
