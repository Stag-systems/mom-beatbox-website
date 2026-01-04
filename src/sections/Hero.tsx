import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster={siteConfig.hero.fallbackImage}
        >
          <source src={siteConfig.hero.videoUrl} type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1
          className="mb-4 text-[clamp(4.05rem,18vw,8.55rem)] leading-[0.95] font-black tracking-[0.02em] text-white sm:text-8xl md:text-9xl lg:text-[12rem]"
          style={{
            textShadow:
              '-1px 0 #fff, 1px 0 #fff, 0 -1px #fff, 0 1px #fff'
          }}
        >
          {siteConfig.hero.title}
        </h1>
        <p className="mb-12 mx-auto w-full max-w-[90vw] text-base font-medium tracking-[0.3em] uppercase sm:text-lg md:max-w-[1100px] md:text-xl">
          {siteConfig.hero.tagline}
        </p>
        <a
          href={`mailto:${siteConfig.hero.bookingEmail}`}
          className="rounded-[6px] bg-white px-12 py-2.5 text-sm font-medium tracking-wider uppercase text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black"
        >
          {getLocalizedText(siteConfig.heroCopy.ctaLabel, language)}
        </a>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/70 transition hover:text-white"
        aria-label="Scroll down"
      >
        <svg
          className="h-6 w-6 animate-bounce"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 7l5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
