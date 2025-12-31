import { useCalendar } from '../hooks/useCalendar';

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = date.getTime() - now;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function Calendar() {
  const { events, loading, error, lastUpdated } = useCalendar();

  return (
    <section id="events" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            EVENTS
          </h2>
          {lastUpdated && (
            <p className="text-sm text-gray-400">
              Last updated: {getRelativeTime(lastUpdated)}
            </p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white" />
          </div>
        )}

        {error && !loading && events.length === 0 && (
          <div className="rounded-lg bg-gray-900 border border-yellow-600 p-6 text-center">
            <p className="text-yellow-400">{error}</p>
          </div>
        )}

        {!loading && events.length === 0 && !error && (
          <div className="rounded-lg bg-gray-900 p-12 text-center">
            <p className="text-lg text-gray-400">
              No upcoming shows scheduled at the moment. Check back soon!
            </p>
          </div>
        )}

        {events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden bg-gray-900 border border-gray-800 transition-all hover:border-white"
              >
                <div className="border-l-4 border-white p-6">
                  {/* Date */}
                  <div className="mb-3 flex items-baseline gap-2">
                    <time className="text-sm font-semibold text-white">
                      {formatDate(event.start)}
                    </time>
                    <span className="text-sm text-gray-400">
                      {formatTime(event.start)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {event.title}
                  </h3>

                  {/* Location */}
                  {event.location && (
                    <div className="flex items-start gap-2 text-gray-300">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{event.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <p className="mt-3 text-sm text-gray-400 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
