'use client';

import {
  SlidersHorizontal,
  RotateCcw,
  Package,
  DollarSign,
  CheckCircle2
} from 'lucide-react';

// Constants
const PRICE_RANGES = [
  { label: "Semua", min: 0, max: 10000000 },
  { label: "< Rp 500.000", min: 0, max: 500000 },
  { label: "Rp 500.000 - 1.000.000", min: 500000, max: 1000000 },
  { label: "Rp 1.000.000 - 2.000.000", min: 1000000, max: 2000000 },
  { label: "Rp 2.000.000 - 5.000.000", min: 2000000, max: 5000000 },
  { label: "> Rp 5.000.000", min: 5000000, max: 10000000 },
];

const STOCK_OPTIONS = [
  { label: "Semua", value: "all" },
  { label: "Tersedia (>10)", value: "high" },
  { label: "Terbatas (1-10)", value: "low" },
  { label: "Habis", value: "out" },
];

export default function FilterSidebar({
  categories,
  products,
  selectedCategories,
  toggleCategory,
  selectedPriceRange,
  handlePriceRangeSelect,
  customPriceRange,
  handleCustomPriceChange,
  stockFilter,
  setStockFilter,
  setCurrentPage,
  resetFilters,
  activeFiltersCount
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <SlidersHorizontal className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Filter Produk</h3>
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
          <Package className="h-4 w-4 mr-2 text-gray-600" />
          Kategori
        </h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center group">
              <div className="relative">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                />
                {selectedCategories.includes(category) && (
                  <CheckCircle2 className="h-4 w-4 text-red-600 absolute top-0 left-0 pointer-events-none" />
                )}
              </div>
              <label
                htmlFor={`category-${category}`}
                className="ml-3 text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors"
              >
                {category}
              </label>
              <span className="ml-auto text-xs text-gray-400">
                ({products.filter(p => p.category === category).length})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-gray-600" />
          Rentang Harga
        </h4>
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <div key={range.label} className="flex items-center">
              <input
                type="radio"
                id={`price-${range.label}`}
                name="priceRange"
                checked={selectedPriceRange === range.label}
                onChange={() => handlePriceRangeSelect(range)}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <label
                htmlFor={`price-${range.label}`}
                className="ml-3 text-sm text-gray-700 cursor-pointer"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>

        {/* Custom price inputs */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-3">Atau tentukan rentang custom:</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Min</label>
              <input
                type="number"
                value={customPriceRange[0]}
                onChange={(e) => handleCustomPriceChange(0, e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Max</label>
              <input
                type="number"
                value={customPriceRange[1]}
                onChange={(e) => handleCustomPriceChange(1, e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="10000000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">Status Stok</h4>
        <div className="space-y-3">
          {STOCK_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`stock-${option.value}`}
                name="stockFilter"
                checked={stockFilter === option.value}
                onChange={() => {
                  setStockFilter(option.value);
                  setCurrentPage(1);
                }}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <label
                htmlFor={`stock-${option.value}`}
                className="ml-3 text-sm text-gray-700 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
