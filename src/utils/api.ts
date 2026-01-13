import { CategorizedEvent, OnThisDayResponse } from '../types';
import { categorizeEvent, generateEventId } from './categorization';

const API_BASE = '/api/onthisday';

export async function fetchOnThisDay(month: string, day: string): Promise<OnThisDayResponse> {
  const url = `${API_BASE}/all/${month}/${day}`;

  const response = await fetch(url, {
    headers: {
      'Api-User-Agent': 'TodaysEra/1.0 (Educational Project)'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}

export function processEvents(data: OnThisDayResponse): CategorizedEvent[] {
  const allEvents: CategorizedEvent[] = [];

  if (data.events) {
    data.events.forEach(event => {
      allEvents.push({
        ...event,
        id: generateEventId(event, 'events'),
        category: categorizeEvent(event, 'events'),
        sourceType: 'events'
      });
    });
  }

  if (data.births) {
    data.births.forEach(event => {
      allEvents.push({
        ...event,
        id: generateEventId(event, 'births'),
        category: categorizeEvent(event, 'births'),
        sourceType: 'births'
      });
    });
  }

  if (data.deaths) {
    data.deaths.forEach(event => {
      allEvents.push({
        ...event,
        id: generateEventId(event, 'deaths'),
        category: categorizeEvent(event, 'deaths'),
        sourceType: 'deaths'
      });
    });
  }

  if (data.holidays) {
    data.holidays.forEach(event => {
      allEvents.push({
        ...event,
        id: generateEventId(event, 'holidays'),
        category: categorizeEvent(event, 'holidays'),
        sourceType: 'holidays'
      });
    });
  }

  return allEvents;
}
