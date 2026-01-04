import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface LogoSliderProps {
  language: Language;
}

export function LogoSlider({ language }: LogoSliderProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...siteConfig.logos, ...siteConfig.logos];

  return (
    <section id="downloads" className="py-16 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <p className="mb-12 text-center text-xs font-medium tracking-[0.3em] uppercase text-gray-300">
          {getLocalizedText(siteConfig.logosCopy.eyebrow, language)}
        </p>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex animate-marquee space-x-16">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-36 h-14"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-10 w-auto max-w-[140px] object-contain opacity-70 transition-opacity hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
