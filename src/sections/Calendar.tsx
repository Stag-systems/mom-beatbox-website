import { useMemo, useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

function formatDate(date: Date, language: Language): string {
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function getRelativeTime(date: Date, language: Language): string {
  const now = Date.now();
  const diff = date.getTime() - now;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 60) {
    return language === 'de' ? `vor ${minutes}m` : `${minutes}m ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return language === 'de' ? `vor ${hours}h` : `${hours}h ago`;
  }
  
  const days = Math.floor(hours / 24);
  return language === 'de' ? `vor ${days}d` : `${days}d ago`;
}

interface CalendarProps {
  language: Language;
}

export function Calendar({ language }: CalendarProps) {
  const { events, loading, error, lastUpdated, refresh } = useCalendar();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = siteConfig.eventCategories;

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return events;
    return events.filter((event) => event.categoryKey === activeCategory);
  }, [activeCategory, events]);

  const patternClass = (key: string) => {
    switch (key) {
      case 'kids':
        return 'pattern-kids';
      case 'workshops':
        return 'pattern-workshops';
      case 'concerts':
        return 'pattern-concerts';
      case 'corporate':
        return 'pattern-corporate';
      default:
        return 'pattern-concerts';
    }
  };

  return (
    <section id="events" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {getLocalizedText(siteConfig.eventsCopy.title, language)}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
            {lastUpdated && (
              <span>
                {getLocalizedText(siteConfig.eventsCopy.updatedLabel, language)}:{' '}
                {getRelativeTime(lastUpdated, language)}
              </span>
            )}
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-[6px] border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:border-white/50 hover:text-white"
              aria-label={getLocalizedText(siteConfig.eventsCopy.refreshLabel, language)}
            >
              <svg
                className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <polyline points="21 3 21 9 15 9" />
              </svg>
              {getLocalizedText(siteConfig.eventsCopy.refreshLabel, language)}
            </button>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-wide text-white/70">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 rounded-[6px] border px-3 py-2 transition ${
              activeCategory === 'all'
                ? 'border-white text-white'
                : 'border-white/20 text-white/70 hover:border-white/50'
            }`}
          >
            <span className="h-4 w-4 rounded-[4px] border border-white/40" aria-hidden="true" />
            {getLocalizedText(siteConfig.eventsCopy.filterAll, language)}
          </button>
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`flex items-center gap-2 rounded-[6px] border px-3 py-2 transition ${
                activeCategory === category.key
                  ? 'border-white text-white'
                  : 'border-white/20 text-white/70 hover:border-white/50'
              }`}
            >
              <span
                className={`h-4 w-4 rounded-[4px] border border-white/40 ${patternClass(
                  category.key
                )}`}
                aria-hidden="true"
              />
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
          <div className="rounded-[6px] bg-gray-900 border border-yellow-600 p-6 text-center">
            <p className="text-yellow-400">
              {error === 'cached'
                ? getLocalizedText(siteConfig.eventsCopy.cached, language)
                : getLocalizedText(siteConfig.eventsCopy.error, language)}
            </p>
          </div>
        )}

        {!loading && filteredEvents.length === 0 && !error && (
          <div className="rounded-[6px] bg-gray-900 p-12 text-center">
            <p className="text-lg text-gray-400">
              {getLocalizedText(siteConfig.eventsCopy.empty, language)}
            </p>
          </div>
        )}

        {filteredEvents.length > 0 && (
          <ul className="divide-y divide-gray-800 border border-gray-800">
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-5 w-5 rounded-[4px] border border-white/40 ${patternClass(
                      event.categoryKey ?? siteConfig.calendar.defaultCategoryKey
                    )}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-bold text-white">{event.title}</h3>
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
