'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
// ...existing code...
import HeroBanner from './components/HeroBanner';
import FilterSidebar from './components/FilterSidebar';
import MobileFilterModal from './components/MobileFilterModal';
import ProductControls from './components/ProductControls';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { getAllProducts, searchProducts, CATEGORIES as DB_CATEGORIES, PRICE_RANGES } from '../../../data/products';

const PRODUCTS_PER_PAGE = 8;

export default function ProductListPage() {
  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [customPriceRange, setCustomPriceRange] = useState([0, 10000000]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("Semua");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get search params from URL
  const searchParams = useSearchParams();

  // Load all products and categories on mount
  useEffect(() => {
    const all = getAllProducts();
    setAllProducts(all);
    // CATEGORIES is already an array of strings
    setCategories(DB_CATEGORIES);
    setIsLoaded(true);
  }, []);

  // Update searchTerm from URL
  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearchTerm(q);
  }, [searchParams]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply search filter first if there's a search term
    if (searchTerm && searchTerm.trim() !== '') {
      result = searchProducts(searchTerm.trim());
    }

    // Then apply other filters
    result = result.filter(product => {
      // Category filter
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      // Price filter
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Stock filter
      let stockMatch = true;
      if (stockFilter === "high") stockMatch = product.stock > 10;
      else if (stockFilter === "low") stockMatch = product.stock > 0 && product.stock <= 10;
      else if (stockFilter === "out") stockMatch = product.stock === 0;

      return categoryMatch && priceMatch && stockMatch;
    });

    // Sort the results
    return result.sort((a, b) => {
      switch(sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [allProducts, selectedCategories, priceRange, searchTerm, stockFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Filter functions
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePriceRangeSelect = (range) => {
    setSelectedPriceRange(range.label);
    setPriceRange([range.min, range.max]);
    setCustomPriceRange([range.min, range.max]);
    setCurrentPage(1);
  };

  const handleCustomPriceChange = (index, value) => {
    const newRange = [...customPriceRange];
    newRange[index] = parseInt(value) || 0;
    setCustomPriceRange(newRange);
    setPriceRange(newRange);
    setSelectedPriceRange("Custom");
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000000]);
    setCustomPriceRange([0, 10000000]);
    setSelectedPriceRange("Semua");
    setStockFilter("all");
    setSortBy('name');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Count active filters
  const activeFiltersCount = selectedCategories.length +
    (selectedPriceRange !== "Semua" ? 1 : 0) +
    (stockFilter !== "all" ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Banner */}
          <HeroBanner searchTerm={searchTerm} resultsCount={filteredProducts.length} />

          {/* Filter and Products Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80">
              <FilterSidebar
                categories={categories}
                products={allProducts}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                selectedPriceRange={selectedPriceRange}
                handlePriceRangeSelect={handlePriceRangeSelect}
                customPriceRange={customPriceRange}
                handleCustomPriceChange={handleCustomPriceChange}
                stockFilter={stockFilter}
                setStockFilter={setStockFilter}
                setCurrentPage={setCurrentPage}
                resetFilters={resetFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            {/* Products Content */}
            <div className="flex-1">
              {/* Product Controls */}
              <ProductControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                showMobileFilter={showMobileFilter}
                setShowMobileFilter={setShowMobileFilter}
                setCurrentPage={setCurrentPage}
                resultsCount={currentProducts.length}
                totalProducts={filteredProducts.length}
              />

              {/* Product Grid */}
              <ProductGrid products={currentProducts} isLoading={isLoading} />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={showMobileFilter}
        onClose={() => setShowMobileFilter(false)}
        resetFilters={resetFilters}
        activeFiltersCount={activeFiltersCount}
      >
        <FilterSidebar
          categories={categories}
          products={allProducts}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedPriceRange={selectedPriceRange}
          handlePriceRangeSelect={handlePriceRangeSelect}
          customPriceRange={customPriceRange}
          handleCustomPriceChange={handleCustomPriceChange}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          setCurrentPage={setCurrentPage}
          resetFilters={resetFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </MobileFilterModal>
    </div>
  );
}
