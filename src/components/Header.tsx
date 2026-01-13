import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/date';

interface HeaderProps {
  date: Date;
}

export function Header({ date }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              TimeFold
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              A Daily Editorial of World History
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
            <Calendar size={20} className="text-gray-500" />
            <time
              dateTime={date.toISOString().split('T')[0]}
              className="text-lg font-semibold text-gray-900"
            >
              {formatDate(date)}
            </time>
          </div>
        </div>
      </div>
    </header>
  );
}
