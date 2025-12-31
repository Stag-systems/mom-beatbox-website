# Quick Reference Guide - MOM Landing Page

## Essential Commands

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Production build
npm run preview     # Preview production build locally

# Deployment
vercel              # Deploy to Vercel (after installing vercel CLI)
```

## Key Files to Know

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| [`src/content/siteConfig.ts`](../src/content/siteConfig.ts) | All editable content | High |
| [`AGENT.md`](../AGENT.md) | Project guidelines | Reference only |
| [`vite.config.ts`](../vite.config.ts) | Build configuration | Low |
| [`tailwind.config.js`](../tailwind.config.js) | Styling configuration | Low |
| [`public/`](../public/) | Static assets (images, video) | Medium |

## Content Update Checklist

### To Change Text/Links
1. Open [`src/content/siteConfig.ts`](../src/content/siteConfig.ts)
2. Edit the relevant section
3. Save file
4. Rebuild: `npm run build`
5. Deploy: `vercel`

### To Replace Images
1. Add new image to [`public/`](../public/) folder
2. Update path in [`siteConfig.ts`](../src/content/siteConfig.ts)
3. Rebuild and deploy

### To Update Show Dates
**Client does this - no code changes needed!**
1. Open Google Calendar
2. Add/edit events
3. Events auto-appear on site (within cache refresh time)

See [`docs/google-calendar-setup.md`](google-calendar-setup.md) for detailed instructions.

## Component Quick Reference

### Hero Section
- **File**: [`src/sections/Hero.tsx`](../src/sections/Hero.tsx)
- **Content**: `siteConfig.hero`
- **Assets**: `public/hero-video.mp4`
- **Features**: Video background, overlay, CTA button

### About Section
- **File**: [`src/sections/About.tsx`](../src/sections/About.tsx)
- **Content**: `siteConfig.about`
- **Assets**: `public/placeholder-about.jpg`
- **Features**: Two-column responsive layout

### Logo Slider
- **File**: [`src/sections/LogoSlider.tsx`](../src/sections/LogoSlider.tsx)
- **Content**: `siteConfig.logos`
- **Assets**: `public/logos/*.png`
- **Features**: Infinite CSS marquee

### What We Do
- **File**: [`src/sections/WhatWeDo.tsx`](../src/sections/WhatWeDo.tsx)
- **Content**: `siteConfig.whatWeDo`
- **Features**: Horizontal scroll carousel

### YouTube Showcase
- **File**: [`src/sections/YouTubeShowcase.tsx`](../src/sections/YouTubeShowcase.tsx)
- **Content**: `siteConfig.youtube.videoIds`
- **Features**: Lazy-loaded embeds, responsive grid

### Calendar
- **File**: [`src/sections/Calendar.tsx`](../src/sections/Calendar.tsx)
- **Content**: `siteConfig.calendar.publicIcsUrl`
- **Features**: ICS fetch, localStorage cache, offline support

## Tech Stack at a Glance

| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 5.x | Build tool |
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | Latest | UI components (selective) |
| vite-plugin-pwa | Latest | Offline support |
| ical.js | Latest | Calendar parsing |

## Tailwind Breakpoints

```css
/* Mobile first - default styles apply to mobile */
sm:   /* 640px and up */
md:   /* 768px and up */
lg:   /* 1024px and up */
xl:   /* 1280px and up */
2xl:  /* 1536px and up */
```

**Usage Example**:
```tsx
<div className="text-sm md:text-base lg:text-lg">
  {/* Small text on mobile, larger on tablet/desktop */}
</div>
```

## Common Patterns

### Adding a New Section

1. Create component file: `src/sections/NewSection.tsx`
2. Add content to `siteConfig.ts`:
   ```typescript
   newSection: {
     title: "Section Title",
     content: "Section content..."
   }
   ```
3. Import and use in `App.tsx`:
   ```tsx
   import { NewSection } from './sections/NewSection';
   
   function App() {
     return (
       <>
         {/* ... other sections ... */}
         <NewSection />
       </>
     );
   }
   ```

### Using shadcn/ui Components

```bash
# Add a new component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

Then import:
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### localStorage Pattern

```typescript
// Read
const cached = localStorage.getItem('key');
const data = cached ? JSON.parse(cached) : null;

// Write
localStorage.setItem('key', JSON.stringify(data));

// Remove
localStorage.removeItem('key');
```

## Debugging Tips

### Service Worker Issues
```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(r => r.unregister());
});
// Then hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)
```

### Clear localStorage
```javascript
// In browser console
localStorage.clear();
```

### Check PWA Status
1. Open DevTools
2. Go to Application tab
3. Check Service Workers section
4. Check Cache Storage section

### Calendar Not Updating
1. Check ICS URL in `siteConfig.ts`
2. Verify Google Calendar is public
3. Check browser console for fetch errors
4. Clear localStorage and refresh

## Performance Checklist

- [ ] Images optimized (< 200KB each)
- [ ] Video compressed (< 5MB)
- [ ] Bundle size < 500KB (excluding video)
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Works offline after first visit

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Heading hierarchy is correct (h1 → h2 → h3)
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] ARIA labels where needed

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Mobile**:
- iOS Safari 14+
- Android Chrome 90+

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm run preview`)
- [ ] Check bundle size in `dist/` folder
- [ ] Verify all assets are included
- [ ] Test PWA functionality
- [ ] Deploy to Vercel
- [ ] Test live site on mobile device
- [ ] Verify calendar fetches correctly
- [ ] Test offline mode

## Troubleshooting

### Build Fails
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Check for TypeScript errors: `npm run type-check`

### Styles Not Applying
1. Check Tailwind class names are correct
2. Verify `tailwind.config.js` includes all content paths
3. Clear browser cache

### Calendar Not Loading
1. Verify ICS URL is correct and public
2. Check CORS headers (Google Calendar should allow)
3. Check network tab in DevTools
4. Verify `calendarService.ts` is parsing correctly

### Video Not Playing
1. Check video file exists in `public/`
2. Verify video format is MP4
3. Check browser console for errors
4. Test with fallback image

## Useful Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Google Calendar ICS Guide](https://support.google.com/calendar/answer/37648)

## Contact & Support

For questions about this project:
1. Check [`AGENT.md`](../AGENT.md) for guidelines
2. Review [`docs/architecture.md`](architecture.md) for technical details
3. See [`plans/plan.md`](../plans/plan.md) for implementation steps

---

**Last Updated**: 2025-12-31
**Version**: 1.0.0
