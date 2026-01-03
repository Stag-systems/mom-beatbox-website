import { useState } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface AboutProps {
  language: Language;
}

export function About({ language }: AboutProps) {
  const title = getLocalizedText(siteConfig.about.title, language);
  const titleLines = title.split('\n');
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  return (
    <section id="about" className="bg-transparent py-24 px-4 sm:px-6 lg:px-8 pb-5 lg:pb-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
            {getLocalizedText(siteConfig.about.eyebrow, language)}
          </p>
          <h2 className="text-[2.4rem] leading-[1.1] font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 -mx-10 mt-0 aspect-square overflow-visible sm:-mx-8 sm:-mt-2 lg:order-1 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-[560px]">
            <img
              src={siteConfig.about.imagePlaceholder}
              alt={getLocalizedText(siteConfig.about.imageAlt, language)}
              className="h-full w-full object-cover grayscale"
              loading="lazy"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 space-y-8 text-center lg:order-2 lg:text-left">
            <p className="text-base leading-relaxed text-gray-300">
              {getLocalizedText(siteConfig.about.text, language)}
            </p>
            
            {/* Crew Members */}
            <div className="glass-panel rounded-[6px] p-6 space-y-4 text-left">
              <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-white mb-6">
                {getLocalizedText(siteConfig.about.membersLabel, language)}
              </h3>
              <div className="space-y-3">
                {siteConfig.about.members.map((member) => (
                  <details
                    key={member.name}
                    className="group border-b border-white/10 border-hairline pb-3 last:border-b-0 last:pb-0"
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

            <div className="pt-2 text-center lg:text-left">
              <button
                type="button"
                onClick={() => setIsAchievementsOpen((open) => !open)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/70 hover:text-white"
                aria-expanded={isAchievementsOpen}
                aria-controls="achievements-list"
              >
                Achievements
                <svg
                  className={`h-3 w-3 transition-transform ${isAchievementsOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 7l5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isAchievementsOpen && (
                <div
                  id="achievements-list"
                  className="mt-4 flex flex-col gap-3 text-[11px] uppercase tracking-[0.32em] text-white/60"
                >
                  {siteConfig.achievements.map((achievement) => (
                    <span key={`${achievement.city}-${achievement.year}`}>
                      <span className="block font-bold text-white sm:inline">
                        {getLocalizedText(achievement.title, language)}
                      </span>
                      <span className="block text-white/50 sm:inline">
                        ({achievement.city} {achievement.year})
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
