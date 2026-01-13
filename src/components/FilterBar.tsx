import { Search, Globe, ArrowUpDown } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  countries: string[];
}

export function FilterBar({ filters, onFiltersChange, countries }: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">
            Search events
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Search events..."
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="relative">
          <label htmlFor="country-filter" className="sr-only">
            Filter by country
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe size={18} className="text-gray-400" />
          </div>
          <select
            id="country-filter"
            value={filters.country}
            onChange={(e) => onFiltersChange({ ...filters, country: e.target.value })}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
          >
            <option value="">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label htmlFor="sort-order" className="sr-only">
            Sort by year
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ArrowUpDown size={18} className="text-gray-400" />
          </div>
          <select
            id="sort-order"
            value={filters.sortOrder}
            onChange={(e) => onFiltersChange({ ...filters, sortOrder: e.target.value as 'asc' | 'desc' })}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      {(filters.country || filters.searchQuery) && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.country && (
            <button
              onClick={() => onFiltersChange({ ...filters, country: '' })}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>{filters.country}</span>
              <span className="font-bold">×</span>
            </button>
          )}
          {filters.searchQuery && (
            <button
              onClick={() => onFiltersChange({ ...filters, searchQuery: '' })}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>"{filters.searchQuery}"</span>
              <span className="font-bold">×</span>
            </button>
          )}
          <button
            onClick={() => onFiltersChange({ ...filters, country: '', searchQuery: '' })}
            className="text-sm text-gray-600 hover:text-gray-900 underline focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
