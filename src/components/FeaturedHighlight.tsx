import { ExternalLink } from 'lucide-react';
import { WikipediaEvent } from '../types';
import { getYearSuffix } from '../utils/date';

interface FeaturedHighlightProps {
  event: WikipediaEvent;
}

export function FeaturedHighlight({ event }: FeaturedHighlightProps) {
  const mainPage = event.pages[0];
  const imageUrl = mainPage?.thumbnail?.source;

  return (
    <section
      className="relative overflow-hidden rounded-2xl shadow-xl mb-12"
      aria-label="Featured historical event"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>

      {imageUrl && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}

      <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
              Featured Moment
            </span>
            {event.year && (
              <>
                <span className="text-white/40">•</span>
                <span className="text-white/80 text-sm font-bold">
                  {getYearSuffix(event.year)}
                </span>
              </>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
            {event.text}
          </h2>

          {mainPage?.extract && (
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
              {mainPage.extract.slice(0, 200)}...
            </p>
          )}

          {mainPage && (
            <a
              href={mainPage.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
              aria-label={`Read full article about ${mainPage.titles.display}`}
            >
              <span>Explore on Wikipedia</span>
              <ExternalLink size={18} />
            </a>
          )}

          <div className="mt-6 pt-6 border-t border-white/20">
            <span className="text-white/60 text-sm">
              Source: Wikipedia Contributors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
