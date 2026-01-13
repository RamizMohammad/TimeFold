import { CategorizedEvent } from '../types';
import { EventCard } from './EventCard';

interface ColumnSectionProps {
  title: string;
  icon: React.ReactNode;
  events: CategorizedEvent[];
  searchQuery?: string;
  emptyMessage: string;
}

export function ColumnSection({ title, icon, events, searchQuery, emptyMessage }: ColumnSectionProps) {
  return (
    <section className="space-y-6" aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}>
      <div className="sticky top-32 bg-white/95 backdrop-blur-sm py-4 -mt-4 z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="text-gray-700">
            {icon}
          </div>
          <h2
            id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
            className="text-2xl font-bold text-gray-900"
          >
            {title}
          </h2>
        </div>
        <div className="h-1 w-16 bg-gradient-to-r from-gray-900 to-transparent rounded-full"></div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} searchQuery={searchQuery} />
          ))}
        </div>
      )}
    </section>
  );
}
