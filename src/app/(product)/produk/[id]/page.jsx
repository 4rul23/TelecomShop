'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  ChevronRight,
  Info
} from 'lucide-react';
import { getProductById, getProductBySlug } from '../../../../data/products';
import { useCart, useWishlist } from '../../../../hooks/useDatabase';
import { useToastContext } from '../../../../components/ToastProvider';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Database hooks
  const { addToCart, getItemCount, isClient } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToastContext();

  // Load product data
  useEffect(() => {
    const loadProduct = () => {
      // First try to get product by slug
      let productData = getProductBySlug(params.id);

      // If no product found by slug, try by numeric ID (for backward compatibility)
      if (!productData) {
        const productId = parseInt(params.id);
        if (!isNaN(productId)) {
          productData = getProductById(productId);
        }
      }

      if (productData) {
        const productWithDefaults = {
          ...productData,
          inStock: productData.stock > 0,
          stockCount: productData.stock
        };
        setProduct(productWithDefaults);
      }
      setIsLoading(false);
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (type) => {
    if (!product) return;

    if (type === 'increase' && quantity < product.stockCount) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (product && isClient && !isAddingToCart) {
      setIsAddingToCart(true);

      console.log('Before adding to cart:', {
        product: product.name,
        quantity: quantity,
        isClient: isClient,
        currentCartCount: getItemCount()
      });

      try {
        const result = addToCart(product, quantity);

        // Only show success toast if addToCart actually succeeded
        if (result !== false) {
          console.log('After adding to cart:', {
            product: product.name,
            quantity: quantity,
            updatedCart: result,
            newCartCount: getItemCount()
          });

          // Show success toast notification
          showToast(
            `${product.name} berhasil ditambahkan ke keranjang!`,
            'success',
            'Lihat Keranjang',
            () => router.push('/cart')
          );

          // Reset quantity to 1 after adding
          setQuantity(1);
        }
        // If result is false, it means auth failed and useDatabase already showed auth toast

      } catch (error) {
        console.error('Error adding to cart:', error);
        // Show error toast only for actual errors, not auth failures
        showToast('Gagal menambahkan produk ke keranjang', 'error');
      } finally {
        setIsAddingToCart(false);
      }
    } else {
      console.log('Cannot add to cart:', {
        hasProduct: !!product,
        isClient: isClient,
        isAddingToCart: isAddingToCart
      });
    }
  };

  const handleWishlistToggle = () => {
    if (product && isClient) {
      const wasInWishlist = isInWishlist(product.id);
      toggleWishlist(product);

      // Show appropriate toast message
      if (wasInWishlist) {
        showToast(`${product.name} dihapus dari wishlist`, 'info');
      } else {
        showToast(`${product.name} ditambahkan ke wishlist!`, 'success');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">Produk yang Anda cari tidak tersedia.</p>
          <Link
            href="/produk"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/produk" className="hover:text-red-600 transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{product?.name || 'Loading...'}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div className="order-1 lg:order-1">
            <div className="sticky top-24">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src={product.image || "/tel.png"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-80 lg:h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = "/tel.png";
                  }}
                />

                <button
                  onClick={handleWishlistToggle}
                  disabled={!isClient}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    product ? isInWishlist(product.id)
                      ? 'bg-red-600 text-white scale-110'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:scale-105'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${product && isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-2">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full font-medium">{product.brand}</span>
                  <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                  <span className="text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-full font-medium">{product.category}</span>
                </div>

                <h1 className="text-2xl lg:text-4xl font-bold text-black leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-black">Produk Berkualitas</span>
                    <span className="text-sm text-gray-600">Terpercaya</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl lg:text-4xl font-bold text-red-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                {product.inStock ? (
                  <>
                    <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-black font-semibold">Tersedia ({product.stockCount} unit)</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-600 font-semibold">Stok Habis</span>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-black">Jumlah Pembelian:</h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="px-5 py-4 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <div className="px-8 py-4 min-w-[80px] text-center border-x-2 border-gray-200">
                      <span className="font-bold text-xl text-black">{quantity}</span>
                    </div>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="px-5 py-4 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-100 px-4 py-3 rounded-lg">
                    <div className="font-medium">Maksimal {product.stockCount} unit</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isClient || !product.inStock || isAddingToCart}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-5 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {!isClient
                    ? 'Loading...'
                    : !product.inStock
                    ? 'Stok Habis'
                    : isAddingToCart
                    ? 'Menambahkan...'
                    : 'Tambah ke Keranjang'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex">
              {[
                { id: 'description', label: 'Deskripsi Produk', icon: Info },
                { id: 'specifications', label: 'Spesifikasi Teknis', icon: Info }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-5 font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-red-600 border-b-3 border-red-600 bg-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 lg:p-12">
            {activeTab === 'description' && (
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-black mb-6">Tentang Produk</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-black mb-8">Spesifikasi Teknis Lengkap</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row sm:justify-between py-5 px-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-bold text-gray-800 mb-2 sm:mb-0">{key}</span>
                      <span className="text-black text-right font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
