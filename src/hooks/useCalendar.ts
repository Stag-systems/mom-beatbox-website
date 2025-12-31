import { useState, useEffect } from 'react';
import { CalendarEvent, CachedCalendarData } from '../types/calendar';
import { siteConfig } from '../content/siteConfig';

const CACHE_KEY = 'mom-calendar-events';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// Simple ICS parser - parses basic VEVENT properties
function parseICS(icsText: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const lines = icsText.split(/\r?\n/);
  
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
      if (line.startsWith('SUMMARY:')) {
        currentEvent.title = line.substring(8);
      } else if (line.startsWith('DTSTART')) {
        const dateStr = line.split(':')[1];
        currentEvent.start = parseICSDate(dateStr);
      } else if (line.startsWith('DTEND')) {
        const dateStr = line.split(':')[1];
        currentEvent.end = parseICSDate(dateStr);
      } else if (line.startsWith('LOCATION:')) {
        currentEvent.location = line.substring(9);
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12);
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

function getCachedEvents(): CachedCalendarData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CachedCalendarData = JSON.parse(cached);
    // Convert date strings back to Date objects
    data.events = data.events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
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

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      // First, try to load from cache
      const cached = getCachedEvents();
      if (cached) {
        setEvents(cached.events);
        setLastUpdated(new Date(cached.fetchedAt));
        setLoading(false);
        
        // If cache is still fresh, don't fetch
        if (Date.now() - cached.fetchedAt < CACHE_DURATION) {
          return;
        }
      }

      // Fetch fresh data
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(siteConfig.calendar.publicIcsUrl, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('Failed to fetch calendar');
        }

        const icsText = await response.text();
        const parsedEvents = parseICS(icsText);
        
        setEvents(parsedEvents);
        setLastUpdated(new Date());
        setCachedEvents(parsedEvents);
        setError(null);
      } catch (err) {
        console.error('Calendar fetch error:', err);
        
        // If we have cached data, keep using it
        if (cached) {
          setError('Using cached data (offline)');
        } else {
          setError('Failed to load events. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Filter to show only upcoming events
  const upcomingEvents = events.filter(event => event.start >= new Date());

  return {
    events: upcomingEvents,
    loading,
    error,
    lastUpdated
  };
}
