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

const PRODUCTS_PER_PAGE = 8;

// Price ranges for filtering (moved from products.js)
const PRICE_RANGES = [
  { label: "Semua", min: 0, max: Infinity },
  { label: "Di bawah 50rb", min: 0, max: 50000 },
  { label: "50rb - 200rb", min: 50000, max: 200000 },
  { label: "200rb - 500rb", min: 200000, max: 500000 },
  { label: "500rb - 1jt", min: 500000, max: 1000000 },
  { label: "Di atas 1jt", min: 1000000, max: Infinity }
];

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
  const [apiError, setApiError] = useState(null);

  // Get search params from URL
  const searchParams = useSearchParams();

  // Helper function to fetch products from API
  const fetchProducts = async () => {
    try {
      setApiError(null);
      const response = await fetch('/api/products?limit=1000'); // Get all products
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setApiError(error.message);
      return [];
    }
  };

  // Helper function to fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (data.success) {
        return data.data.map(cat => cat.name); // Extract category names
      } else {
        throw new Error(data.error || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to default categories if API fails
      return [
        "Konektor",
        "Kabel",
        "Networking",
        "Wireless",
        "Fiber Optic",
        "Tools",
        "Accessories",
        "Security",
        "Safety"
      ];
    }
  };

  // Load all products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        setAllProducts(productsData);
        setCategories(categoriesData);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
        setApiError('Failed to load products and categories');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Update searchTerm from URL
  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearchTerm(q);
  }, [searchParams]);

  // Filtered products with client-side search functionality
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply search filter first if there's a search term
    if (searchTerm && searchTerm.trim() !== '') {
      const searchTermLower = searchTerm.toLowerCase().trim();
      result = result.filter(product => {
        return (
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toLowerCase().includes(searchTermLower) ||
          product.category.toLowerCase().includes(searchTermLower) ||
          product.brand.toLowerCase().includes(searchTermLower) ||
          (product.specifications && 
            Object.values(product.specifications).some(spec => 
              spec.toLowerCase().includes(searchTermLower)
            ))
        );
      });
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

  // Retry function for when API calls fail
  const retryLoadData = async () => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        setAllProducts(productsData);
        setCategories(categoriesData);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading data:', error);
        setApiError('Failed to load products and categories');
      } finally {
        setIsLoading(false);
      }
    };

    await loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* API Error Display */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 mt-24 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading data
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{apiError}</p>
                </div>
              </div>
            </div>
            <div className="pl-3">
              <button
                onClick={retryLoadData}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className={apiError ? "pt-4 pb-16" : "pt-24 pb-16"}>
        <div className="container mx-auto px-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          )}

          {/* Content - only show if not loading and no API error */}
          {!isLoading && !apiError && (
            <>
          {/* Hero Banner */}
          <HeroBanner searchTerm={searchTerm} resultsCount={filteredProducts.length} />

          {/* Filter and Products Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80">
              <FilterSidebar
                id="desktop"
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
                priceRanges={PRICE_RANGES}
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {!apiError && (
        <MobileFilterModal
          isOpen={showMobileFilter}
          onClose={() => setShowMobileFilter(false)}
          resetFilters={resetFilters}
          activeFiltersCount={activeFiltersCount}
        >
          <FilterSidebar
            id="mobile"
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
            priceRanges={PRICE_RANGES}
          />
        </MobileFilterModal>
      )}
    </div>
  );
}
