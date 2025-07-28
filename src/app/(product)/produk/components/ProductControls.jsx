'use client';

import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

export default function ProductControls({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showMobileFilter,
  setShowMobileFilter,
  setCurrentPage,
  resultsCount,
  totalProducts
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-sm"
        >
          <option value="name">Nama A-Z</option>
          <option value="name-desc">Nama Z-A</option>
          <option value="price">Harga Terendah</option>
          <option value="price-desc">Harga Tertinggi</option>
          <option value="rating">Rating Tertinggi</option>
          <option value="stock">Stok Terbanyak</option>
        </select>

        {/* View Mode Toggle - Hidden on mobile */}
        <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-3 transition-colors ${
              viewMode === 'grid'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-3 transition-colors ${
              viewMode === 'list'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilter(true)}
          className="lg:hidden flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Results Count */}
      <div className="flex items-center text-sm text-gray-600">
        Menampilkan {resultsCount} dari {totalProducts} produk
      </div>
    </div>
  );
}
