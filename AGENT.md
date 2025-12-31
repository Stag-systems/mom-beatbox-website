# AGENT.md - Project Instructions & Context

## Project Goal

Build a simple, offline-first landing page web app for a beatbox crew called "MOM" (3 members: George, Tim, Elias). The site must be mobile-first, responsive, work offline after first load, and require minimal code with no backend infrastructure.

## Tech Stack Decisions + Rationale

### Core Framework
- **Vite + React + TypeScript**: Fast dev experience, minimal boilerplate, strong typing without over-engineering
- **Tailwind CSS**: Utility-first CSS for rapid, consistent styling with minimal custom CSS
- **shadcn/ui (selective)**: Use only when it genuinely improves UX (Button, Card, Dialog) - avoid forcing it everywhere

### Offline & Caching
- **vite-plugin-pwa**: Service worker generation for offline-first capability
- **localStorage**: Cache calendar events and UI preferences client-side

### Minimal Dependencies
- **ICS parsing**: Use a small library like `ical.js` or `node-ical` (client-side compatible) - pick the smallest reliable option
- **Carousel/Marquee**: Prefer custom CSS solutions; only add a tiny dependency if absolutely necessary

### Rationale
- **No backend**: Reduces complexity, hosting costs, and maintenance burden
- **No routing**: Single-page app keeps bundle small and navigation instant
- **Minimal deps**: Faster builds, smaller bundle, fewer security vulnerabilities, easier maintenance

## Constraints + Non-Goals

### Constraints
- ✅ No backend, no database, no user accounts
- ✅ Must work offline after first successful visit
- ✅ Client must update show dates without developer knowledge (via Google Calendar)
- ✅ Keep total lines of code low - prefer readability over abstraction
- ✅ Mobile-first responsive design
- ✅ No heavy state management libraries

### Non-Goals
- ❌ No admin panel or CMS
- ❌ No user authentication or personalization
- ❌ No complex animations or heavy JavaScript
- ❌ No server-side rendering or API routes
- ❌ No analytics or tracking (can be added later if needed)

## Coding Guidelines

### General Principles
1. **Low LOC**: Prefer simple, readable code over clever abstractions
2. **Minimal deps**: Only add dependencies that provide clear value
3. **Small components**: Each component should do one thing well
4. **TypeScript strict**: Use strict mode but don't over-model - prefer simple types over complex generics

### Code Style
- Use functional components with hooks
- Prefer named exports for components
- Keep components under 150 lines; extract if larger
- Use early returns to reduce nesting
- Avoid prop drilling - use composition instead
- Comment only when "why" isn't obvious from code

### File Organization
```
src/
  components/     # Reusable UI components
  sections/       # Page sections (Hero, About, etc.)
  content/        # Configuration and content
  hooks/          # Custom React hooks
  lib/            # Utilities and helpers
  types/          # TypeScript type definitions
```

## Design Guidelines

### Mobile-First Approach
1. Design for mobile (320px+) first
2. Add breakpoints for tablet (768px+) and desktop (1024px+)
3. Test on real devices when possible
4. Touch targets minimum 44x44px

### Visual Design
- Clean, modern aesthetic
- High contrast for readability
- Consistent spacing using Tailwind scale
- Hero video with dark overlay for text readability
- White/light logos on dark backgrounds in slider

### Accessibility Basics
- Semantic HTML (header, main, section, footer)
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Color contrast WCAG AA minimum

## Content/Config Approach

### Single Source of Truth
All editable content lives in [`src/content/siteConfig.ts`](src/content/siteConfig.ts):

```typescript
export const siteConfig = {
  hero: {
    title: "MOM",
    tagline: "Placeholder tagline",
    bookingEmail: "booking@example.com"
  },
  about: {
    text: "About text...",
    imagePlaceholder: "/placeholder-about.jpg"
  },
  logos: [
    { name: "Client 1", image: "/logos/client1.png" },
    // ...
  ],
  whatWeDo: [
    { title: "Kidsshow", description: "...", icon: "..." },
    { title: "Workshops", description: "...", icon: "..." },
    { title: "Concerts", description: "...", icon: "..." }
  ],
  youtube: {
    videoIds: ["VIDEO_ID_1", "VIDEO_ID_2", "VIDEO_ID_3"]
  },
  calendar: {
    publicIcsUrl: "https://calendar.google.com/calendar/ical/..."
  }
}
```

### Benefits
- Non-developers can update content by editing one file
- Type-safe content access throughout app
- Easy to version control content changes
- Clear separation of content and code

## Offline/Caching Approach

### Service Worker (via vite-plugin-pwa)
Caches:
- HTML, CSS, JS bundles
- Static assets (images, fonts)
- Hero video (if size permits, otherwise show fallback)

### localStorage Cache
Stores:
- **Calendar events**: Fetched from Google Calendar ICS feed
  - Key: `mom-calendar-events`
  - Value: `{ events: Event[], fetchedAt: timestamp }`
- **UI preferences**: (if needed later)

### Calendar Fetch Strategy
1. On page load, check localStorage for cached events
2. Display cached events immediately (if available)
3. Fetch fresh events from ICS URL in background
4. Parse ICS → normalize to Event objects
5. Update localStorage and UI with fresh data
6. Show "Last updated: X minutes ago" in UI
7. If offline and no cache, show friendly empty state

### Error Handling
- Network timeout: 10 seconds
- Parse errors: Log and show cached data
- No cached data + offline: Show "Please connect to internet" message

## Implementation Checklist

### Phase 1: Foundation
- [ ] Scaffold Vite + React + TypeScript project
- [ ] Install and configure Tailwind CSS
- [ ] Set up shadcn/ui (init only, add components as needed)
- [ ] Create base layout structure
- [ ] Create [`siteConfig.ts`](src/content/siteConfig.ts)

### Phase 2: Sections (in order)
- [ ] Hero section with video background
- [ ] About section with text + image
- [ ] Logo slider/marquee
- [ ] What We Do carousel
- [ ] YouTube showcase grid
- [ ] Calendar section (fetch + cache + render)

### Phase 3: Offline & Polish
- [ ] Configure vite-plugin-pwa
- [ ] Test offline functionality
- [ ] Mobile responsiveness pass
- [ ] Accessibility audit
- [ ] Performance optimization

### Phase 4: Documentation
- [ ] README with setup instructions
- [ ] Google Calendar setup guide for client
- [ ] Deployment instructions (Vercel)

## Key Technical Decisions

### Calendar Solution
**Decision**: Use Google Calendar public ICS feed
**Why**: 
- Client can update via familiar Google Calendar UI
- No backend needed
- ICS is a standard format with good parsing libraries
- Can cache locally for offline support

### Video Background
**Decision**: MP4 with fallback image
**Why**:
- Better compression than GIF
- Autoplay/loop/muted works on modern browsers
- Fallback image for older browsers or failed loads

### YouTube Embeds
**Decision**: Lazy-load with thumbnail preview
**Why**:
- Reduces initial page load
- Saves bandwidth
- Better performance on mobile
- User controls when to load heavy iframe

### Carousel Implementation
**Decision**: CSS scroll-snap or minimal custom solution
**Why**:
- Native browser feature (scroll-snap)
- No JavaScript dependency
- Smooth on mobile
- Accessible by default

## Development Workflow

1. **Small increments**: Each feature in isolation
2. **Test immediately**: Verify in browser after each change
3. **Mobile-first**: Check mobile view first, then desktop
4. **Commit often**: Small, focused commits with clear messages
5. **Refer to this file**: Check constraints before adding complexity

## Success Criteria

- ✅ Loads in under 3 seconds on 3G
- ✅ Works offline after first visit
- ✅ Responsive on 320px to 2560px viewports
- ✅ Client can update calendar without developer
- ✅ No console errors or warnings
- ✅ Passes basic accessibility checks
- ✅ Total bundle size under 500KB (excluding video)
