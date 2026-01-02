import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface AboutProps {
  language: Language;
}

export function About({ language }: AboutProps) {
  const title = getLocalizedText(siteConfig.about.title, language);
  const titleLines = title.split('\n');

  return (
    <section id="about" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
            {getLocalizedText(siteConfig.about.eyebrow, language)}
          </p>
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-900 lg:aspect-auto lg:h-[500px]">
            <img
              src={siteConfig.about.imagePlaceholder}
              alt={getLocalizedText(siteConfig.about.imageAlt, language)}
              className="h-full w-full object-cover grayscale"
              loading="lazy"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-gray-300">
              {getLocalizedText(siteConfig.about.text, language)}
            </p>
            
            {/* Crew Members */}
            <div className="border-2 border-blue-500 p-6 space-y-4">
              <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-white mb-6">
                {getLocalizedText(siteConfig.about.membersLabel, language)}
              </h3>
              <div className="space-y-3">
                {siteConfig.about.members.map((member) => (
                  <details
                    key={member.name}
                    className="group border-b border-gray-700 pb-3 last:border-b-0 last:pb-0"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between text-2xl font-black text-white">
                      <span>{member.name}</span>
                      <span className="text-2xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="mt-3 text-sm text-gray-300">
                      <p>{getLocalizedText(member.blurb, language)}</p>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-xs uppercase tracking-wide text-white/70 hover:text-white"
                      >
                        Instagram
                      </a>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <a
              href="#events"
              className="inline-block rounded-[6px] border-2 border-gray-600 px-8 py-3 text-sm font-medium tracking-wider uppercase text-white transition-all hover:bg-white hover:text-black hover:border-white focus:outline-none"
            >
              {getLocalizedText(siteConfig.about.ctaLabel, language)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
