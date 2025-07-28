'use client';

import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function MobileFilterModal({
  isOpen,
  onClose,
  children,
  resetFilters,
  activeFiltersCount
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <SlidersHorizontal className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Filter Produk</h3>
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetFilters}
                className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors px-3 py-1 rounded-md"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(85vh - 80px)' }}>
          {children}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
}
