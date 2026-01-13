import { useState, useEffect, useMemo } from 'react';
import { Globe, Microscope, Users } from 'lucide-react';
import { Header } from './components/Header';
import { FeaturedHighlight } from './components/FeaturedHighlight';
import { FilterBar } from './components/FilterBar';
import { ColumnSection } from './components/ColumnSection';
import { SkeletonLoader } from './components/SkeletonLoader';
import { EmptyState } from './components/EmptyState';
import { fetchOnThisDay, processEvents } from './utils/api';
import { extractAllCountries, extractCountries } from './utils/categorization';
import { getMonthDay } from './utils/date';
import { CategorizedEvent, FilterState, OnThisDayResponse } from './types';

function App() {
  const [date] = useState(new Date());
  const [data, setData] = useState<OnThisDayResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    country: '',
    searchQuery: '',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { month, day } = getMonthDay(date);
        const result = await fetchOnThisDay(month, day);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [date]);

  const allEvents = useMemo(() => {
    if (!data) return [];
    return processEvents(data);
  }, [data]);

  const countries = useMemo(() => {
    return extractAllCountries(allEvents);
  }, [allEvents]);

  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    if (filters.country) {
      filtered = filtered.filter(event =>
        extractCountries(event.text).includes(filters.country)
      );
    }

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.text.toLowerCase().includes(query) ||
        event.pages[0]?.description?.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      const yearA = a.year || 0;
      const yearB = b.year || 0;
      return filters.sortOrder === 'desc' ? yearB - yearA : yearA - yearB;
    });
  }, [allEvents, filters]);

  const eventsByCategory = useMemo(() => {
    return {
      world: filteredEvents.filter(e => e.category === 'world'),
      science: filteredEvents.filter(e => e.category === 'science'),
      culture: filteredEvents.filter(e => e.category === 'culture')
    };
  }, [filteredEvents]);

  const featuredEvent = data?.selected?.[0];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header date={date} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            message="Failed to load historical events"
            suggestion={error}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header date={date} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : (
          <>
            {featuredEvent && <FeaturedHighlight event={featuredEvent} />}

            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              countries={countries}
            />

            {filteredEvents.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ColumnSection
                  title="World & History"
                  icon={<Globe size={28} />}
                  events={eventsByCategory.world}
                  searchQuery={filters.searchQuery}
                  emptyMessage="No world events found for your filters"
                />

                <ColumnSection
                  title="Science & Technology"
                  icon={<Microscope size={28} />}
                  events={eventsByCategory.science}
                  searchQuery={filters.searchQuery}
                  emptyMessage="No science events found for your filters"
                />

                <ColumnSection
                  title="Culture, Arts & People"
                  icon={<Users size={28} />}
                  events={eventsByCategory.culture}
                  searchQuery={filters.searchQuery}
                  emptyMessage="No cultural events found for your filters"
                />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              Historical content sourced from{' '}
              <a
                href="https://www.wikipedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Wikipedia
              </a>
            </p>
            <p className="text-xs text-gray-500">
              Content available under the Creative Commons Attribution-ShareAlike License
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
