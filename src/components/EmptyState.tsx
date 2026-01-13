import { Search } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  suggestion?: string;
}

export function EmptyState({
  message = 'No events found',
  suggestion = 'Try adjusting your filters or search query'
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-600 max-w-md">{suggestion}</p>
    </div>
  );
}
