import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface LogoSliderProps {
  language: Language;
}

export function LogoSlider({ language }: LogoSliderProps) {
  return (
    <section id="downloads" className="py-16 px-4 overflow-hidden">
      <div className="mx-auto w-full max-w-screen-2xl">
        <p className="mb-12 text-center text-xs font-medium tracking-[0.3em] uppercase text-gray-300">
          {getLocalizedText(siteConfig.logosCopy.eyebrow, language)}
        </p>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((trackIndex) => (
              <div
                key={`logo-track-${trackIndex}`}
                className="flex items-center gap-16 pr-16"
                aria-hidden={trackIndex === 1}
              >
                {siteConfig.logos.map((logo) => (
                  <div
                    key={`${logo.name}-${trackIndex}`}
                    className="flex h-16 w-44 flex-shrink-0 items-center justify-center"
                  >
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="h-12 w-32 object-contain opacity-70 transition-opacity hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
