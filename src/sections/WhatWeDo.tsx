import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarEvent } from '../types/calendar';

interface WhatWeDoProps {
  language: Language;
}

export function WhatWeDo({ language }: WhatWeDoProps) {
  const title = getLocalizedText(siteConfig.whatWeDoCopy.title, language);
  const titleLines = title.split('\n');
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isAdjusting = useRef(false);
  const { events, loading } = useCalendar();
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const tripledItems = [
    ...siteConfig.whatWeDo,
    ...siteConfig.whatWeDo,
    ...siteConfig.whatWeDo
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const setWidth = carousel.scrollWidth / 3;
    carousel.scrollLeft = setWidth;
  }, []);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || isAdjusting.current) return;

    const setWidth = carousel.scrollWidth / 3;
    const left = carousel.scrollLeft;
    const min = setWidth * 0.25;
    const max = setWidth * 1.75;

    if (left < min) {
      isAdjusting.current = true;
      carousel.scrollLeft = left + setWidth;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    } else if (left > max) {
      isAdjusting.current = true;
      carousel.scrollLeft = left - setWidth;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    }
  };

  const nextEvent = useMemo<CalendarEvent | null>(() => {
    if (!activeCategoryKey) return null;
    return events.find((event) => event.categoryKey === activeCategoryKey) ?? null;
  }, [activeCategoryKey, events]);

  const formatDate = (date: Date) => {
    const locale = language === 'de' ? 'de-DE' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section id="service" className="bg-transparent py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 mb-4">
            {getLocalizedText(siteConfig.whatWeDoCopy.eyebrow, language)}
          </p>
          <h2
            className="text-[2.4rem] leading-[1.1] font-black tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-20 md:hidden">
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                carouselRef.current?.scrollBy({ left: -280, behavior: 'smooth' })
              }
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white/80"
              aria-label="Scroll left"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                carouselRef.current?.scrollBy({ left: 280, behavior: 'smooth' })
              }
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-white/80"
              aria-label="Scroll right"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M8 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 px-6"
            >
            {tripledItems.map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="glass-card group relative min-w-[80%] snap-center overflow-hidden rounded-[6px]"
              >
                <button
                  type="button"
                  onClick={() => setActiveCategoryKey(item.key)}
                  className="relative flex min-h-[360px] w-full items-end justify-start px-5 py-5 text-left"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/85"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="glass-panel rounded-full px-5 py-2">
                      <h3
                        className="text-sm font-semibold text-white uppercase tracking-normal"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {getLocalizedText(item.title, language)}
                      </h3>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="mt-20 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.whatWeDo.map((item) => (
            <div
              key={item.key}
              className="glass-card group relative overflow-hidden rounded-[6px]"
            >
              <button
                type="button"
                onClick={() => setActiveCategoryKey(item.key)}
                className="relative flex min-h-[360px] w-full items-end justify-start px-5 py-5 text-left"
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/85"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="glass-panel rounded-full px-5 py-2">
                    <h3
                      className="text-sm font-semibold text-white uppercase tracking-normal"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {getLocalizedText(item.title, language)}
                    </h3>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block rounded-[6px] border border-white border-hairline px-12 py-2.5 text-sm font-medium uppercase tracking-wider text-white/80 transition hover:text-white"
          >
            {getLocalizedText(siteConfig.whatWeDoCopy.ctaLabel, language)}
          </a>
        </div>

        {activeCategoryKey && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute inset-0 cursor-pointer"
              aria-label={getLocalizedText(siteConfig.accessibility.closeModal, language)}
              onClick={() => setActiveCategoryKey(null)}
            />
            <div className="relative z-10 w-full max-w-lg">
              <button
                type="button"
                onClick={() => setActiveCategoryKey(null)}
                className="absolute -top-10 right-0 text-xs uppercase tracking-wider text-white/70 hover:text-white"
              >
                X
              </button>
              <div className="glass-panel rounded-[6px] border border-white/10 border-hairline p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  {getLocalizedText(siteConfig.whatWeDoCopy.nextEventLabel, language)}
                </p>
                {loading && (
                  <p className="mt-3 text-sm text-white/70">
                    {getLocalizedText(siteConfig.whatWeDoCopy.loadingLabel, language)}
                  </p>
                )}
                {!loading && !nextEvent && (
                  <div className="mt-3 space-y-4">
                    <p className="text-sm text-white/70">
                      {getLocalizedText(siteConfig.whatWeDoCopy.noUpcomingLabel, language)}
                    </p>
                    <a
                      href={`mailto:${siteConfig.hero.bookingEmail}`}
                      className="glass-button inline-flex items-center rounded-[6px] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:text-white"
                    >
                      {getLocalizedText(siteConfig.whatWeDoCopy.requestLabel, language)}
                    </a>
                  </div>
                )}
                {!loading && nextEvent && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-2xl font-black text-white">
                      {nextEvent.title}
                    </h3>
                    {nextEvent.location && (
                      <p className="text-xs uppercase tracking-wide text-white/60">
                        {nextEvent.location}
                      </p>
                    )}
                    <time className="text-sm font-semibold text-gray-300">
                      {formatDate(nextEvent.start)}
                    </time>
                    <a
                      href="#events"
                      className="glass-button inline-flex items-center rounded-[6px] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:text-white"
                    >
                      {getLocalizedText(siteConfig.whatWeDoCopy.calendarLabel, language)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
