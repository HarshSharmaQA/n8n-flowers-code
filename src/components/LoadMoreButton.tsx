import React from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  currentCount: number;
  totalCount: number;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  loading,
  hasMore,
  currentCount,
  totalCount
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Showing all {totalCount} workflows
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading more...
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Load More ({currentCount} of {totalCount})
          </>
        )}
      </button>
    </div>
  );
};