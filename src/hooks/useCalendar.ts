import { useCallback, useEffect, useState } from 'react';
import { CalendarEvent, CachedCalendarData } from '../types/calendar';
import { siteConfig } from '../content/siteConfig';

const CACHE_KEY = 'mom-calendar-events';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// Simple ICS parser - parses basic VEVENT properties
function parseICS(icsText: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const rawLines = icsText.split(/\r?\n/);
  const lines: string[] = [];

  for (const line of rawLines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  
  let currentEvent: Partial<CalendarEvent> | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === 'BEGIN:VEVENT') {
      currentEvent = { id: crypto.randomUUID() };
    } else if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.title && currentEvent.start && currentEvent.end) {
        events.push(currentEvent as CalendarEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const namePart = line.slice(0, colonIndex);
      const valuePart = line.slice(colonIndex + 1);
      const propertyName = namePart.split(';')[0].toUpperCase();
      const value = unescapeICSText(valuePart);

      if (propertyName === 'SUMMARY') {
        currentEvent.title = value;
      } else if (propertyName === 'DTSTART') {
        currentEvent.start = parseICSDate(valuePart);
      } else if (propertyName === 'DTEND') {
        currentEvent.end = parseICSDate(valuePart);
      } else if (propertyName === 'LOCATION') {
        currentEvent.location = value;
      } else if (propertyName === 'DESCRIPTION') {
        currentEvent.description = value;
      } else if (propertyName === 'URL') {
        currentEvent.infoLink = normalizeUrl(value);
      }
    }
  }
  
  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}

function parseICSDate(dateStr: string): Date {
  // Handle both date-time (20231231T120000Z) and date-only (20231231) formats
  if (dateStr.includes('T')) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    const hour = parseInt(dateStr.substring(9, 11));
    const minute = parseInt(dateStr.substring(11, 13));
    return new Date(Date.UTC(year, month, day, hour, minute));
  } else {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  }
}

function unescapeICSText(value: string): string {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function normalizeUrl(raw?: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  const match = trimmed.match(/https?:\/\/[^\s"<>]+/i);
  const candidate = match ? match[0] : trimmed;
  const cleaned = candidate.replace(/[).,]+$/g, '');
  return /^https?:\/\//i.test(cleaned) ? cleaned : undefined;
}

function extractLinkFromDescription(description?: string): string | undefined {
  if (!description) return undefined;
  const decoded = decodeHtmlEntities(description);

  const hrefMatch = decoded.match(/href=["']([^"']+)["']/i);
  const hrefUrl = normalizeUrl(hrefMatch?.[1]);
  if (hrefUrl) return hrefUrl;

  const taggedMatch = decoded.match(/#link:\s*(.+)/i);
  const taggedUrl = normalizeUrl(taggedMatch?.[1]);
  if (taggedUrl) return taggedUrl;

  return normalizeUrl(decoded);
}

function resolveCategoryKey(event: CalendarEvent): string {
  const description = (event.description ?? '').toLowerCase();
  const directTag = description.match(/(?:^|\s)(?:type:|category:|#)(kids|workshops|concerts|corporate)\b/);
  if (directTag) {
    return directTag[1];
  }

  const haystack = `${event.title} ${description} ${event.location ?? ''}`.toLowerCase();
  const match = siteConfig.eventCategories.find((category) =>
    category.keywords.some((keyword) => haystack.includes(keyword))
  );
  return match?.key ?? siteConfig.calendar.defaultCategoryKey;
}

function getCachedEvents(): CachedCalendarData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CachedCalendarData = JSON.parse(cached);
    // Convert date strings back to Date objects
    data.events = data.events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      categoryKey: event.categoryKey ?? resolveCategoryKey(event as CalendarEvent),
      infoLink: normalizeUrl(event.infoLink) ?? extractLinkFromDescription(event.description)
    }));
    
    return data;
  } catch {
    return null;
  }
}

function setCachedEvents(events: CalendarEvent[]): void {
  try {
    const data: CachedCalendarData = {
      events,
      fetchedAt: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to cache events:', error);
  }
}

async function fetchWithTimeout(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error('Failed to fetch calendar');
    }
    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchIcsText(url: string, proxyUrl?: string | readonly string[]): Promise<string> {
  const proxyUrls = Array.isArray(proxyUrl) ? [...proxyUrl] : proxyUrl ? [proxyUrl] : [];

  for (const proxy of proxyUrls) {
    try {
      const proxiedUrl = proxy.endsWith('http://') || proxy.endsWith('https://')
        ? `${proxy}${url}`
        : `${proxy}${encodeURIComponent(url)}`;
      return await fetchWithTimeout(proxiedUrl);
    } catch {
      // Try next proxy
    }
  }

  return await fetchWithTimeout(url);
}

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'cached' | 'failed' | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEvents = useCallback(async (force = false) => {
    // First, try to load from cache
    const cached = getCachedEvents();
    if (cached) {
      setEvents(cached.events);
      setLastUpdated(new Date(cached.fetchedAt));
      setLoading(false);

      // If cache is still fresh, don't fetch
      if (!force && Date.now() - cached.fetchedAt < CACHE_DURATION) {
        return;
      }
    }

    setLoading(true);

    // Fetch fresh data
    try {
      const icsText = await fetchIcsText(
        siteConfig.calendar.publicIcsUrl,
        siteConfig.calendar.corsProxyUrl
      );
      const parsedEvents = parseICS(icsText);
      const categorizedEvents = parsedEvents.map((event) => ({
        ...event,
        categoryKey: resolveCategoryKey(event),
        infoLink: normalizeUrl(event.infoLink) ?? extractLinkFromDescription(event.description)
      }));
      
      setEvents(categorizedEvents);
      setLastUpdated(new Date());
      setCachedEvents(categorizedEvents);
      setError(null);
    } catch (err) {
      console.error('Calendar fetch error:', err);
      
      // If we have cached data, keep using it
      if (cached) {
        setError('cached');
      } else {
        setError('failed');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Include upcoming or currently ongoing events.
  const now = new Date();
  const upcomingEvents = events.filter((event) => {
    if (event.end) {
      return event.end >= now;
    }
    return event.start >= now;
  });

  return {
    events: upcomingEvents,
    loading,
    error,
    lastUpdated,
    refresh: () => fetchEvents(true)
  };
}
