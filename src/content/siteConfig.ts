export const siteConfig = {
  hero: {
    title: "MOM",
    tagline: "MORE THAN BEATBOX",
    bookingEmail: "booking@mom-crew.com",
    videoUrl: "/hero-video.mp4",
    fallbackImage: "/hero-fallback.jpg"
  },
  language: {
    default: "en",
    toggleLabel: {
      en: "Switch to German",
      de: "Wechsel zu Englisch"
    }
  },
  navigation: {
    about: { en: "About", de: "Uber uns" },
    service: { en: "Service", de: "Service" },
    music: { en: "Music", de: "Musik" },
    events: { en: "Events", de: "Events" },
    downloads: { en: "Downloads", de: "Downloads" }
  },
  about: {
    eyebrow: { en: "About us", de: "Uber uns" },
    title: {
      en: "WORLD CHAMPION\nBEATBOX CREW",
      de: "PLATZHALTER\nBEATBOX CREW"
    },
    text: {
      en: "MOM is a dynamic beatbox crew consisting of three talented performers: George, Tim, and Elias. We bring energy, creativity, and rhythm to every performance, from intimate workshops to large-scale concerts. Our passion is sharing the art of beatboxing with audiences of all ages.",
      de: "Platzhaltertext uber MOM, die Crew und die Energie der Shows."
    },
    imageAlt: {
      en: "MOM Beatbox Crew",
      de: "MOM Beatbox Crew"
    },
    imagePlaceholder: "/about-image.jpg",
    membersLabel: { en: "Crew members", de: "Crew mitglieder" },
    members: [
      {
        name: "GEORGY",
        blurb: {
          en: "Placeholder line about Georgy and his style.",
          de: "Platzhalterzeile uber Georgy und seinen Stil."
        },
        instagram: "https://instagram.com/placeholder"
      },
      {
        name: "TIM",
        blurb: {
          en: "Placeholder line about Tim and his style.",
          de: "Platzhalterzeile uber Tim und seinen Stil."
        },
        instagram: "https://instagram.com/placeholder"
      },
      {
        name: "ELIAS",
        blurb: {
          en: "Placeholder line about Elias and his style.",
          de: "Platzhalterzeile uber Elias und seinen Stil."
        },
        instagram: "https://instagram.com/placeholder"
      }
    ],
    ctaLabel: { en: "Calendar", de: "Kalender" }
  },
  logos: [
    { name: "Client 1", image: "/placeholder.svg" },
    { name: "Client 2", image: "/placeholder.svg" },
    { name: "Client 3", image: "/placeholder.svg" },
    { name: "Client 4", image: "/placeholder.svg" },
    { name: "Client 5", image: "/placeholder.svg" },
    { name: "Client 6", image: "/placeholder.svg" }
  ],
  logosCopy: {
    eyebrow: {
      en: "Used by global powerhouse",
      de: "Platzhalter fur globale partners"
    }
  },
  whatWeDo: [
    {
      key: "kids",
      title: { en: "Kids show", de: "Kidsshow" },
      description: {
        en: "Interactive and engaging beatbox performances designed for young audiences.",
        de: "Platzhalter fur interaktive Shows fur junge Zielgruppen."
      },
      icon: "🎪"
    },
    {
      key: "workshops",
      title: { en: "Workshops", de: "Workshops" },
      description: {
        en: "Hands-on beatbox workshops with rhythm patterns and performance techniques.",
        de: "Platzhalter fur Workshops und Grundlagen des Beatboxen."
      },
      icon: "🎓"
    },
    {
      key: "concerts",
      title: { en: "Concerts", de: "Konzerte" },
      description: {
        en: "High-energy live performances from intimate venues to festival stages.",
        de: "Platzhalter fur Live-Performances und Festival-Sets."
      },
      icon: "🎤"
    },
    {
      key: "corporate",
      title: { en: "Corporate party", de: "Firmenfeier" },
      description: {
        en: "Placeholder for corporate celebrations note and format.",
        de: "Platzhalter fur Firmenfeiern und Corporate Events."
      },
      icon: "🥂"
    }
  ],
  whatWeDoCopy: {
    eyebrow: {
      en: "What we do",
      de: "Was wir machen"
    },
    title: {
      en: "POWER AND REAL\nAUDIENCE CONNECTION\nON EVERY STAGE",
      de: "PLATZHALTER\nFUR DIE SECTION\nWAS WIR MACHEN"
    },
    ctaLabel: { en: "Book now", de: "Jetzt anfragen" }
  },
  youtube: {
    title: { en: "Music", de: "Musik" },
    videos: [
      {
        id: "dQw4w9WgXcQ",
        title: { en: "Placeholder video title", de: "Platzhalter video titel" }
      },
      {
        id: "dQw4w9WgXcQ",
        title: { en: "Placeholder video title", de: "Platzhalter video titel" }
      },
      {
        id: "dQw4w9WgXcQ",
        title: { en: "Placeholder video title", de: "Platzhalter video titel" }
      }
    ]
  },
  heroCopy: {
    ctaLabel: { en: "Book now", de: "Jetzt anfragen" }
  },
  eventsCopy: {
    title: { en: "Events", de: "Events" },
    updatedLabel: { en: "Last updated", de: "Zuletzt aktualisiert" },
    filterAll: { en: "All", de: "Alle" },
    refreshLabel: { en: "Refresh", de: "Aktualisieren" },
    empty: {
      en: "No upcoming shows scheduled at the moment. Check back soon!",
      de: "Keine kommenden Events geplant. Schau bald wieder vorbei."
    },
    error: {
      en: "Failed to load events. Please check your connection.",
      de: "Events konnten nicht geladen werden. Bitte Verbindung prufen."
    },
    cached: {
      en: "Using cached data (offline)",
      de: "Cache wird genutzt (offline)"
    }
  },
  accessibility: {
    menuToggle: { en: "Toggle menu", de: "Menu umschalten" },
    videoThumbnail: { en: "Video thumbnail", de: "Video vorschau" },
    youtubePlayerTitle: { en: "YouTube video player", de: "YouTube videoplayer" }
  },
  calendar: {
    publicIcsUrl: "https://calendar.google.com/calendar/ical/cda01c823c486eeb726bcd338a34505325596023116fc1e83714de282b711350%40group.calendar.google.com/private-38bf8979efc488d1af689817e25fd48a/basic.ics",
    corsProxyUrl: "https://api.allorigins.win/raw?url=",
    defaultCategoryKey: "concerts"
  },
  eventCategories: [
    {
      key: "kids",
      label: { en: "Kids show", de: "Kidsshow" },
      keywords: ["kids", "children", "school", "family", "kinder", "schule"]
    },
    {
      key: "workshops",
      label: { en: "Workshops", de: "Workshops" },
      keywords: ["workshop", "class", "kurs", "training", "academy", "seminar"]
    },
    {
      key: "concerts",
      label: { en: "Concerts", de: "Konzerte" },
      keywords: ["concert", "show", "gig", "live", "festival", "konzert"]
    },
    {
      key: "corporate",
      label: { en: "Corporate party", de: "Firmenfeier" },
      keywords: ["corporate", "company", "firm", "business", "firmenfeier", "event"]
    }
  ],
  social: {
    instagram: "https://instagram.com/mom_crew",
    youtube: "https://youtube.com/@mom_crew",
    facebook: "https://facebook.com/mom_crew"
  }
} as const;

export type SiteConfig = typeof siteConfig;
