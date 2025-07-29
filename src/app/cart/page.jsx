'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../../hooks/useDatabase';
import ProtectedPage from '../../components/ProtectedPage';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal, getItemCount, isLoading, isClient } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (window.confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
      clearCart();
    }
  };

  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Keranjang Belanja</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
              <p className="text-gray-600 mt-1">
                {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} di keranjang Anda
              </p>
            </div>

            <Link
              href="/produk"
              className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Lanjut Belanja
            </Link>
          </div>
        </div>

        {/* Cart Content */}
        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Item Keranjang</h2>
                    <button
                      onClick={handleClearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Kosongkan Keranjang
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || '/placeholder-product.svg'}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.category}
                          </p>
                          <p className="text-lg font-semibold text-red-600 mt-2">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 flex justify-end">
                        <p className="text-lg font-semibold text-gray-900">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal ({getItemCount()} item)</span>
                      <span className="font-medium">{formatPrice(getTotal())}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ongkir</span>
                      <span className="font-medium text-green-600">Gratis</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-red-600">
                        {formatPrice(getTotal())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="p-6 pt-0">
                  <Link
                    href="/checkout"
                    className="block w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg text-center hover:bg-red-700 transition-colors mb-4"
                  >
                    Checkout
                  </Link>

                  {/* Continue Shopping */}
                  <Link
                    href="/produk"
                    className="block w-full text-center py-3 text-red-600 font-medium hover:text-red-700 transition-colors"
                  >
                    Lanjut Belanja
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Anda Kosong</h2>
            <p className="text-gray-600 mb-8">
              Belum ada produk yang ditambahkan ke keranjang.
            </p>
            <Link
              href="/produk"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Mulai Belanja
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function CartPageWrapper() {
  return (
    <ProtectedPage message="mengakses keranjang belanja">
      <CartPage />
    </ProtectedPage>
  );
}

export default CartPageWrapper;
