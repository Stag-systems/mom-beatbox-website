export const siteConfig = {
  hero: {
    title: "MOM",
    tagline: "MORE THAN BEATBOX",
    bookingEmail: "booking@mom-crew.com",
    videoUrl: "/hero-video.mp4",
    fallbackImage: "/hero-fallback.jpg"
  },
  about: {
    text: "MOM is a dynamic beatbox crew consisting of three talented performers: George, Tim, and Elias. We bring energy, creativity, and rhythm to every performance, from intimate workshops to large-scale concerts. Our passion is sharing the art of beatboxing with audiences of all ages.",
    imagePlaceholder: "/about-image.jpg"
  },
  logos: [
    { name: "Client 1", image: "/logos/client1.png" },
    { name: "Client 2", image: "/logos/client2.png" },
    { name: "Client 3", image: "/logos/client3.png" },
    { name: "Client 4", image: "/logos/client4.png" },
    { name: "Client 5", image: "/logos/client5.png" },
    { name: "Client 6", image: "/logos/client6.png" }
  ],
  whatWeDo: [
    {
      title: "Kidsshow",
      description: "Interactive and engaging beatbox performances designed specifically for young audiences. We make learning rhythm fun and accessible for children of all ages.",
      icon: "🎪"
    },
    {
      title: "Workshops",
      description: "Hands-on beatbox workshops where participants learn the fundamentals of vocal percussion, rhythm patterns, and performance techniques from our experienced crew.",
      icon: "🎓"
    },
    {
      title: "Concerts",
      description: "High-energy live performances showcasing the full range of beatbox artistry. From intimate venues to festival stages, we deliver unforgettable shows.",
      icon: "🎤"
    }
  ],
  youtube: {
    videoIds: [
      "dQw4w9WgXcQ", // Placeholder - replace with actual video IDs
      "dQw4w9WgXcQ",
      "dQw4w9WgXcQ"
    ]
  },
  calendar: {
    publicIcsUrl: "https://calendar.google.com/calendar/ical/YOUR_CALENDAR_ID/public/basic.ics" // Replace with actual Google Calendar ICS URL
  },
  social: {
    instagram: "https://instagram.com/mom_crew",
    youtube: "https://youtube.com/@mom_crew",
    facebook: "https://facebook.com/mom_crew"
  }
} as const;

export type SiteConfig = typeof siteConfig;
