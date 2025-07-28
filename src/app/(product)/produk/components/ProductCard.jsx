'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/produk/${product.slug}`}>
      <div
        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 group
          transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl
          hover:border-red-200 hover:-translate-y-1 cursor-pointer animate-fadeInUp"
        style={{
          animationDelay: `${index * 80}ms`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images?.[0] || product.image || "/tel.png"}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'}`}
          />

          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent
            transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className={`absolute top-3 left-3 transform transition-all duration-500
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-95'}`}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-red-700 shadow-lg backdrop-blur-sm border border-red-100">
              {product.category}
            </span>
          </div>

          <div className={`absolute bottom-3 right-3 transform transition-all duration-500
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
            <div className="flex items-center px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
              <span className="text-xs font-medium text-gray-700">{product.brand}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h2 className={`font-semibold text-gray-900 text-sm lg:text-base mb-2 line-clamp-2 leading-tight
              transition-colors duration-300 ${isHovered ? 'text-red-700' : 'text-gray-900'}`}>
              {product.name}
            </h2>

            {/* Brand info */}
            <div className="mb-2">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.brand}
              </span>
            </div>

            <div className={`flex items-center transition-all duration-300
              ${isHovered ? 'transform translate-x-1' : ''}`}>
              {product.stock > 0 ? (
                <div className="flex items-center text-xs">
                  <span className={`inline-block h-2 w-2 rounded-full mr-1.5 transition-all duration-300
                    ${product.stock > 10 ? 'bg-green-500' : 'bg-amber-500'}
                    ${isHovered ? 'scale-125' : 'scale-100'}`}></span>
                  <span className={`font-medium transition-colors duration-300
                    ${product.stock > 10 ? 'text-green-700' : 'text-amber-700'}`}>
                    Stok: {product.stock} unit
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-xs">
                  <span className={`inline-block h-2 w-2 rounded-full mr-1.5 bg-red-500 transition-all duration-300
                    ${isHovered ? 'scale-125' : 'scale-100'}`}></span>
                  <span className="font-medium text-red-600">Stok Habis</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className={`flex items-baseline transition-all duration-300
              ${isHovered ? 'transform translate-x-1' : ''}`}>
              <span className="text-lg font-bold text-red-600">
                Rp{product.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out transform
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="w-full py-2.5 px-4 text-sm font-medium rounded-xl
              bg-gradient-to-r from-red-600 to-red-700 text-white text-center
              shadow-lg hover:shadow-xl transition-all duration-300">
              Lihat Detail
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
