export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  infoLink?: string;
  categoryKey?: string;
}

export interface CachedCalendarData {
  events: CalendarEvent[];
  fetchedAt: number;
}
