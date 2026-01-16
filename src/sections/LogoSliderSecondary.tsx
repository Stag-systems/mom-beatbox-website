import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface LogoSliderSecondaryProps {
  language: Language;
}

export function LogoSliderSecondary({ language }: LogoSliderSecondaryProps) {
  const emphasizeLogos = new Set(['TAS', 'GBB']);
  const boostLogos = new Set(['Audio']);
  const reduceLogos = new Set(['AKM']);
  const reduceLogosMedium = new Set(['Wien Xtra', 'Monsterfreunde']);
  const tightGapLogos = new Set(['Audio']);

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
                key={`logo-secondary-track-${trackIndex}`}
                className="flex items-center gap-6 pr-6 md:gap-16 md:pr-16"
                aria-hidden={trackIndex === 1}
              >
                {siteConfig.logosSecondary.map((logo) => {
                  const isEmphasized = emphasizeLogos.has(logo.name);
                  const isBoosted = boostLogos.has(logo.name);
                  const isReduced = reduceLogos.has(logo.name);
                  const isReducedMedium = reduceLogosMedium.has(logo.name);
                  const isTightGap = tightGapLogos.has(logo.name);
                  return (
                    <div
                      key={`${logo.name}-${trackIndex}`}
                      className={`flex h-32 w-72 flex-shrink-0 items-center justify-center ${
                        isTightGap ? '-mx-8' : ''
                      }`}
                    >
                      <img
                        src={logo.image}
                        alt={logo.name}
                        className={`h-24 w-64 object-contain opacity-70 transition-opacity hover:opacity-100 ${
                          isBoosted ? 'scale-[1.2]' : isEmphasized ? 'scale-[1.1]' : ''
                        } ${isReduced ? 'scale-[0.8]' : ''} ${
                          isReducedMedium ? 'scale-[0.85]' : ''
                        }`}
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
