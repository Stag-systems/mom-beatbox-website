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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-7xl font-black tracking-tight sm:text-8xl md:text-9xl lg:text-[12rem] leading-none">
          {siteConfig.hero.title}
        </h1>
        <p className="mb-12 text-sm font-medium tracking-[0.3em] uppercase sm:text-base md:text-lg">
          {siteConfig.hero.tagline}
        </p>
        <a
          href={`mailto:${siteConfig.hero.bookingEmail}`}
          className="rounded-[6px] border-2 border-white px-10 py-3 text-sm font-medium tracking-wider uppercase text-white transition-all hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          {getLocalizedText(siteConfig.heroCopy.ctaLabel, language)}
        </a>
      </div>
    </section>
  );
}
