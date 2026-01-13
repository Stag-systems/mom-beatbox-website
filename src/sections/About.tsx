import { useState } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface AboutProps {
  language: Language;
}

export function About({ language }: AboutProps) {
  const title = getLocalizedText(siteConfig.about.title, language);
  const titleLines = title.split('\n');
  const [activeAchievementVideo, setActiveAchievementVideo] = useState<string | null>(null);
  const highlightPhrases = (text: string) => {
    const phrases = ['Georgy', 'Geo Popoff', 'Tim aka Slizzer', 'Elias aka Eon'];
    const pattern = new RegExp(`(${phrases.join('|')})`, 'g');
    return text.split(pattern).map((part, index) =>
      phrases.includes(part) ? (
        <strong key={index} className="font-black text-white">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 pb-5 lg:pb-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-300 mb-[6px]">
            {getLocalizedText(siteConfig.about.eyebrow, language)}
          </p>
          <h2 className="text-[2.16rem] leading-[1.1] font-black tracking-[0.02em] text-white uppercase sm:text-6xl md:text-7xl">
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
              className="h-full w-full object-cover grayscale contrast-125"
              loading="lazy"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 min-w-0 space-y-8 text-center lg:order-2 lg:text-left">
            <p className="mx-auto w-full text-sm leading-snug text-gray-300 lg:mx-0">
              {getLocalizedText(siteConfig.about.text, language)}
            </p>
            
            {/* Crew Members */}
            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-6">
                {getLocalizedText(siteConfig.about.membersLabel, language)}
              </h3>
              <div className="divide-y divide-white/60">
                {siteConfig.about.members.map((member) => (
                  <details
                    key={member.name}
                    className="group py-4"
                  >
                    <summary className="flex w-full cursor-pointer list-none items-center justify-between font-['Ranade'] text-2xl font-bold text-white">
                      <span className="flex-1 text-left">{member.name}</span>
                      <span className="text-2xl leading-none transition-transform duration-200">
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">-</span>
                      </span>
                    </summary>
                    <div className="mt-3 text-center text-sm text-gray-300 md:text-left">
                      <p>{highlightPhrases(getLocalizedText(member.blurb, language))}</p>
                      <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs uppercase tracking-wide text-white/70 underline underline-offset-4 hover:text-white"
                        >
                          Instagram
                        </a>
                        {member.youtube && (
                          <a
                            href={member.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs uppercase tracking-wide text-white/70 underline underline-offset-4 hover:text-white"
                          >
                            YouTube
                          </a>
                        )}
                        {member.website && (
                          <a
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs uppercase tracking-wide text-white/70 underline underline-offset-4 hover:text-white"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {language === 'de' ? 'AUSZEICHNUNGEN' : 'Competitive achievements'}
                </h3>
                <div className="mt-4 flex w-full max-w-full gap-3 overflow-x-auto pb-2 pr-4 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pr-0">
                  {siteConfig.achievements.map((achievement) => {
                    const content = (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-wide text-white">
                          {getLocalizedText(achievement.title, language)
                            .split('\n')
                            .map((line, index, array) => (
                              <span
                                key={`${achievement.city}-${achievement.year}-${index}`}
                                className="block md:inline"
                              >
                                {line}
                                {index < array.length - 1 && (
                                  <>
                                    <span className="hidden md:inline"> </span>
                                    <br className="md:hidden" />
                                  </>
                                )}
                              </span>
                            ))}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
                          {achievement.city} {achievement.year}
                        </p>
                      </>
                    );

                    return (
                      <div
                        key={`${achievement.city}-${achievement.year}`}
                        className={`relative min-w-[220px] rounded-[6px] border border-white/10 border-hairline p-3 text-center sm:text-left md:min-w-0 ${
                          achievement.phantom
                            ? 'border-dashed border-white/30 bg-white/5'
                            : 'bg-white/5 transition-shadow duration-200 hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]'
                        }`}
                      >
                        {achievement.videoId && (
                          <button
                            type="button"
                            onClick={() => setActiveAchievementVideo(achievement.videoId)}
                            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition hover:border-white/40"
                            aria-label="Play achievement video"
                          >
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M7 5v10l8-5-8-5z" />
                            </svg>
                          </button>
                        )}
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {activeAchievementVideo && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                role="dialog"
                aria-modal="true"
                aria-label="Achievement video"
              >
                <button
                  type="button"
                  className="absolute inset-0 cursor-pointer"
                  aria-label={getLocalizedText(siteConfig.accessibility.closeModal, language)}
                  onClick={() => setActiveAchievementVideo(null)}
                />
                <div className="relative z-10 w-full max-w-4xl">
                  <button
                    type="button"
                    onClick={() => setActiveAchievementVideo(null)}
                    className="absolute -top-12 right-0 text-xs uppercase tracking-wider text-white/70 hover:text-white"
                  >
                    {getLocalizedText(siteConfig.accessibility.closeModal, language)}
                  </button>
                  <div className="aspect-video w-full overflow-hidden rounded-[6px] bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeAchievementVideo}?autoplay=1&controls=1`}
                      title="Achievement video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <a
                href="#music"
                className="button-link inline-flex w-[220px] items-center justify-center whitespace-nowrap rounded-[6px] border border-white/60 border-hairline bg-transparent px-12 py-2.5 text-sm font-medium uppercase tracking-wider text-white/90 transition hover:text-white"
              >
                {language === 'de' ? 'SOUND ARCHIV' : 'Sound archive'}
              </a>
              <a
                href="#service"
                className="button-link inline-flex w-[220px] items-center justify-center whitespace-nowrap rounded-[6px] bg-white px-12 py-2.5 text-sm font-medium uppercase tracking-wider text-black transition hover:bg-white/90"
              >
                {getLocalizedText(siteConfig.about.ctaLabel, language)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
