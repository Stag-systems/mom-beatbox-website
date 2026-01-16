import { useEffect, useRef } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface HeroProps {
  language: Language;
}

export function Hero({ language }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('muted', 'true');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      const result = video.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    const handleFirstInteraction = () => {
      tryPlay();
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction);
    return () => {
      video.removeEventListener('canplay', tryPlay);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
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
        <h1 className="sr-only">{siteConfig.hero.title}</h1>
        <img
          src="/LOGOTYPE-MOM-WHITE.svg"
          alt=""
          aria-hidden="true"
          className="mb-4 w-[min(85vw,540px)] sm:w-[min(48vw,600px)] md:w-[min(45vw,660px)]"
        />
        <div className="mb-12" aria-hidden="true" />
        <a
          href="#contact"
          className="button-link mt-4 rounded-[6px] bg-white px-12 py-2.5 text-sm font-medium tracking-wider uppercase text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black sm:mt-0"
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
