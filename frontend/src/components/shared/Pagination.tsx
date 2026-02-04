import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Props alinhadas com PaginatedResponse (page, totalPages, hasNextPage, hasPreviousPage) */
export interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page === 1) {
      return [1, 2, 3];
    }

    if (page === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [page - 1, page, page + 1];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
        className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      <div className="flex gap-1">
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${page === p
              ? 'bg-blue-600 text-white font-medium'
              : 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700'
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
    </div>
  );
}
