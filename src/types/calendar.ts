export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}

export interface CachedCalendarData {
  events: CalendarEvent[];
  fetchedAt: number;
}
