import { useMemo, useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

function formatDate(date: Date, language: Language): string {
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

interface CalendarProps {
  language: Language;
}

export function Calendar({ language }: CalendarProps) {
  const { events, loading, error, lastUpdated, refresh } = useCalendar();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = siteConfig.eventCategories;

  const filteredEvents = useMemo(() => {
    return activeCategory === 'all'
      ? events
      : events.filter((event) => event.categoryKey === activeCategory);
  }, [activeCategory, events]);

  return (
    <section id="events" className="pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-[2.16rem] leading-[1.1] font-black tracking-[0.02em] text-white uppercase sm:text-6xl md:text-7xl">
            {getLocalizedText(siteConfig.eventsCopy.title, language)}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-wide text-white/70">
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              aria-label={getLocalizedText(siteConfig.eventsCopy.refreshLabel, language)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              <img
                src="/refresh-arrow.svg"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </button>
            {lastUpdated && (
              <span className="text-white/60">
                {getLocalizedText(siteConfig.eventsCopy.updatedLabel, language)}{' '}
                {lastUpdated.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-wide text-white/70">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 rounded-[6px] border border-white/10 border-hairline px-6 py-2 text-[10px] font-medium tracking-wider uppercase text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black ${
              activeCategory === 'all'
                ? 'bg-white/5 text-white'
                : 'text-white/80'
            }`}
          >
            {getLocalizedText(siteConfig.eventsCopy.filterAll, language)}
          </button>
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`flex items-center gap-2 rounded-[6px] border border-white/10 border-hairline px-6 py-2 text-[10px] font-medium tracking-wider uppercase text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black ${
                activeCategory === category.key
                  ? 'bg-white/5 text-white'
                  : 'text-white/80'
              }`}
            >
              {getLocalizedText(category.label, language)}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white" />
          </div>
        )}

        {error && !loading && events.length === 0 && (
          <div className="glass-panel rounded-[6px] p-6 text-center">
            <p className="text-yellow-300">
              {error === 'cached'
                ? getLocalizedText(siteConfig.eventsCopy.cached, language)
                : getLocalizedText(siteConfig.eventsCopy.error, language)}
            </p>
          </div>
        )}

        {!loading && filteredEvents.length === 0 && !error && (
          <div className="glass-panel rounded-[6px] p-12 text-center">
            <p className="text-lg text-gray-300">
              {getLocalizedText(siteConfig.eventsCopy.empty, language)}
            </p>
          </div>
        )}

        {filteredEvents.length > 0 && (
          <ul className="glass-panel rounded-[6px]">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className="flex flex-col gap-2 border-b border-white/10 border-hairline p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    {event.location && (
                      <p className="text-xs uppercase tracking-wide text-white/60">
                        {event.location}
                      </p>
                    )}
                    {event.infoLink && (
                      <a
                        href={event.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-xs uppercase tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
                      >
                        Info
                      </a>
                    )}
                  </div>
                </div>
                <time className="text-sm font-semibold text-gray-300">
                  {formatDate(event.start, language)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
