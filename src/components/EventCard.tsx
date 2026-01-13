import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { CategorizedEvent, CategoryType } from '../types';
import { getYearSuffix } from '../utils/date';

interface EventCardProps {
  event: CategorizedEvent;
  searchQuery?: string;
}

const CATEGORY_COLORS: Record<CategoryType, { gradient: string; text: string; accent: string }> = {
  world: {
    gradient: 'from-blue-500 to-blue-600',
    text: 'text-blue-700',
    accent: 'border-blue-200 bg-blue-50'
  },
  science: {
    gradient: 'from-emerald-500 to-emerald-600',
    text: 'text-emerald-700',
    accent: 'border-emerald-200 bg-emerald-50'
  },
  culture: {
    gradient: 'from-amber-500 to-amber-600',
    text: 'text-amber-700',
    accent: 'border-amber-200 bg-amber-50'
  }
};

function highlightText(text: string, query: string): JSX.Element {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 font-medium rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function EventCard({ event, searchQuery = '' }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = CATEGORY_COLORS[event.category];
  const shouldShowExpand = event.text.length > 150;
  const displayText = !isExpanded && shouldShowExpand ? event.text.slice(0, 150) + '...' : event.text;
  const mainPage = event.pages[0];

  return (
    <article
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border-l-4 ${colors.accent.replace('bg-', 'border-')}`}
    >
      <div className="flex items-start gap-4">
        {event.year && (
          <div className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            <div className="text-center leading-tight">
              {getYearSuffix(event.year)}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-gray-800 leading-relaxed mb-3">
            {highlightText(displayText, searchQuery)}
          </p>

          {shouldShowExpand && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`inline-flex items-center gap-1 text-sm font-medium ${colors.text} hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded mb-3`}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Show less' : 'Show more'}
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Read more
                </>
              )}
            </button>
          )}

          {mainPage && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <a
                href={mainPage.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded transition-colors"
                aria-label={`Read more about ${mainPage.titles.display} on Wikipedia`}
              >
                <ExternalLink size={14} />
                <span>Wikipedia</span>
              </a>
              {mainPage.description && (
                <span className="text-gray-400">•</span>
              )}
              {mainPage.description && (
                <span className="text-gray-500 italic truncate">
                  {mainPage.description}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
