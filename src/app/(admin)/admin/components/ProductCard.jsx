'use client';

import { Edit3, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Get image source (prioritize images array, fallback to image property)
  const getImageSrc = () => {
    if (product.images && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    if (product.image && product.image.trim() !== '') {
      return product.image;
    }
    return '/placeholder-product.svg';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={getImageSrc()}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-product.svg';
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        {product.brand && <p className="text-xs text-blue-600 mb-1">Brand: {product.brand}</p>}
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        {product.sku && <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>}
        <p className="text-lg font-bold text-red-600 mb-4">{formatPrice(product.price)}</p>

        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.inStock !== false
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock !== false ? 'Tersedia' : 'Habis'}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
