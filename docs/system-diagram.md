# System Architecture Diagrams

## High-Level System Overview

```mermaid
graph TB
    subgraph Client Browser
        A[React App] --> B[Service Worker]
        A --> C[localStorage]
        A --> D[UI Components]
    end
    
    subgraph External Services
        E[Google Calendar Public ICS]
        F[YouTube Embeds]
    end
    
    A -->|Fetch ICS| E
    D -->|Lazy Load| F
    B -->|Cache Assets| G[Cache Storage]
    C -->|Store Events| H[Calendar Cache]
    
    style A fill:#61dafb
    style B fill:#ffa500
    style C fill:#90ee90
    style E fill:#4285f4
    style F fill:#ff0000
```

## Component Hierarchy

```mermaid
graph TD
    A[App.tsx] --> B[Hero.tsx]
    A --> C[About.tsx]
    A --> D[LogoSlider.tsx]
    A --> E[WhatWeDo.tsx]
    A --> F[YouTubeShowcase.tsx]
    A --> G[Calendar.tsx]
    
    B --> H[Button - shadcn/ui]
    E --> I[Card - shadcn/ui]
    F --> J[YouTubeEmbed.tsx]
    G --> K[useCalendarEvents hook]
    
    K --> L[calendarService.ts]
    K --> M[useLocalStorage hook]
    
    style A fill:#61dafb
    style H fill:#000000,color:#fff
    style I fill:#000000,color:#fff
    style K fill:#ffa500
    style L fill:#90ee90
    style M fill:#90ee90
```

## Calendar Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Calendar Component
    participant useCalendarEvents Hook
    participant localStorage
    participant calendarService
    participant Google Calendar
    
    User->>Calendar Component: Page Load
    Calendar Component->>useCalendarEvents Hook: Initialize
    useCalendarEvents Hook->>localStorage: Check for cached events
    
    alt Cache exists
        localStorage-->>useCalendarEvents Hook: Return cached events
        useCalendarEvents Hook-->>Calendar Component: Display cached events
    else No cache
        useCalendarEvents Hook-->>Calendar Component: Show loading state
    end
    
    useCalendarEvents Hook->>calendarService: fetchIcs(url)
    calendarService->>Google Calendar: HTTP GET request
    
    alt Network success
        Google Calendar-->>calendarService: ICS data
        calendarService->>calendarService: parseIcsToEvents()
        calendarService-->>useCalendarEvents Hook: Parsed events
        useCalendarEvents Hook->>localStorage: Update cache
        useCalendarEvents Hook-->>Calendar Component: Update UI with fresh events
    else Network failure
        Google Calendar-->>calendarService: Error
        calendarService-->>useCalendarEvents Hook: Error
        useCalendarEvents Hook-->>Calendar Component: Show error + cached data
    end
```

## Offline Strategy Flow

```mermaid
graph TD
    A[User Visits Site] --> B{First Visit?}
    B -->|Yes| C[Download Assets]
    B -->|No| D{Online?}
    
    C --> E[Service Worker Caches Assets]
    E --> F[Fetch Calendar ICS]
    F --> G[Store in localStorage]
    G --> H[Display Page]
    
    D -->|Yes| I[Check for Updates]
    I --> J[Serve from Cache]
    J --> K[Fetch Fresh Calendar]
    K --> G
    
    D -->|No| L[Serve from Cache]
    L --> M{Calendar Cache Exists?}
    M -->|Yes| N[Display Cached Events]
    M -->|No| O[Show Offline Message]
    
    style E fill:#ffa500
    style G fill:#90ee90
    style L fill:#ffa500
    style N fill:#90ee90
```

## Build and Deployment Pipeline

```mermaid
graph LR
    A[Source Code] --> B[npm run build]
    B --> C[Vite Build Process]
    C --> D[TypeScript Compilation]
    C --> E[Tailwind CSS Processing]
    C --> F[Asset Optimization]
    C --> G[PWA Plugin]
    
    D --> H[dist/ folder]
    E --> H
    F --> H
    G --> I[Service Worker]
    I --> H
    
    H --> J[Vercel Deployment]
    J --> K[CDN Distribution]
    K --> L[Live Site]
    
    style C fill:#646cff
    style G fill:#ffa500
    style J fill:#000000,color:#fff
    style L fill:#4285f4
```

## Content Update Workflow

```mermaid
graph TD
    subgraph Developer Updates
        A[Edit siteConfig.ts] --> B[Commit to Git]
        B --> C[Push to GitHub]
        C --> D[Vercel Auto-Deploy]
        D --> E[Live Site Updated]
    end
    
    subgraph Client Updates Calendar
        F[Open Google Calendar] --> G[Add/Edit Event]
        G --> H[Save Event]
        H --> I[ICS Feed Auto-Updates]
        I --> J[User Visits Site]
        J --> K[Fresh Events Fetched]
        K --> L[Calendar Displayed]
    end
    
    style A fill:#90ee90
    style F fill:#4285f4
    style D fill:#000000,color:#fff
    style K fill:#61dafb
```

## Performance Optimization Strategy

```mermaid
graph TD
    A[Page Load] --> B[Critical CSS Inline]
    A --> C[Defer Non-Critical JS]
    A --> D[Lazy Load Images]
    
    B --> E[First Paint]
    C --> F[Interactive]
    D --> G[Below Fold Content]
    
    H[YouTube Embeds] --> I[Show Thumbnail]
    I --> J[User Clicks]
    J --> K[Load iframe]
    
    L[Hero Video] --> M{Mobile?}
    M -->|Yes| N[Show Fallback Image]
    M -->|No| O[Load Compressed MP4]
    
    style E fill:#90ee90
    style F fill:#90ee90
    style I fill:#ffa500
    style K fill:#ff0000
```

## Responsive Breakpoint Strategy

```mermaid
graph LR
    A[Mobile First Design] --> B[320px - 767px]
    B --> C[Tablet: 768px - 1023px]
    C --> D[Desktop: 1024px+]
    
    B --> E[Single Column]
    B --> F[Stacked Layout]
    B --> G[Touch Optimized]
    
    C --> H[Two Columns]
    C --> I[Hybrid Layout]
    
    D --> J[Multi Column]
    D --> K[Full Features]
    
    style A fill:#61dafb
    style B fill:#90ee90
    style C fill:#ffa500
    style D fill:#4285f4
```

## Error Handling Flow

```mermaid
graph TD
    A[User Action] --> B{Network Available?}
    
    B -->|Yes| C[Fetch Resource]
    B -->|No| D{Cache Available?}
    
    C --> E{Success?}
    E -->|Yes| F[Display Content]
    E -->|No| G[Log Error]
    
    D -->|Yes| H[Serve from Cache]
    D -->|No| I[Show Offline Message]
    
    G --> J{Cache Available?}
    J -->|Yes| H
    J -->|No| K[Show Error State]
    
    H --> L[Display Cached Content]
    L --> M[Show Last Updated Time]
    
    style F fill:#90ee90
    style H fill:#ffa500
    style I fill:#ff6b6b
    style K fill:#ff6b6b
```

## Security Layers

```mermaid
graph TD
    A[User Request] --> B[HTTPS Only]
    B --> C[Content Security Policy]
    C --> D[Allowed Sources]
    
    D --> E[YouTube: frame-src]
    D --> F[Google Calendar: connect-src]
    D --> G[Same Origin: default-src]
    
    H[No User Data] --> I[No Cookies]
    H --> J[No Tracking]
    H --> K[Public Data Only]
    
    L[Dependencies] --> M[npm audit]
    L --> N[Regular Updates]
    L --> O[Minimal Surface]
    
    style B fill:#90ee90
    style C fill:#4285f4
    style H fill:#90ee90
    style M fill:#ffa500
```

---

## Legend

- **Blue (#61dafb)**: React/Frontend Components
- **Orange (#ffa500)**: Service Worker/PWA Features
- **Green (#90ee90)**: localStorage/Caching
- **Google Blue (#4285f4)**: External Services
- **Red (#ff0000)**: YouTube/Third-party
- **Black**: Build Tools/Deployment
- **Red (#ff6b6b)**: Error States

---

## Notes

These diagrams provide a visual representation of the system architecture. They should be referenced during implementation to ensure all components are built according to the planned design.

For detailed implementation specifics, refer to:
- [`AGENT.md`](../AGENT.md) - Project guidelines
- [`architecture.md`](architecture.md) - Detailed architecture documentation
- [`plan.md`](../plans/plan.md) - Implementation checklist
