'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Image } from 'lucide-react';

export default function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    brand: '',
    sku: '',
    inStock: true
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        image: product.image || '',
        brand: product.brand || '',
        sku: product.sku || '',
        inStock: product.inStock !== false
      });
      setImagePreview(product.image || '');
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        brand: '',
        sku: '',
        inStock: true
      });
      setImagePreview('');
    }
  }, [product]);

  // Image upload handling
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        setFormData({...formData, image: imageUrl});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({...formData, image: url});
    setImagePreview(url);
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData({...formData, image: ''});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert('Nama produk, harga, dan kategori wajib diisi');
      return;
    }

    // Generate slug from name
    const slug = formData.name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Prepare product data to match database structure
    const productData = {
      id: product?.id || Date.now(),
      name: formData.name,
      slug: slug,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.price),
      discount: 0,
      category: formData.category,
      type: formData.category.toLowerCase().replace(/\s+/g, '-'),
      brand: formData.brand,
      sku: formData.sku,
      inStock: formData.inStock,
      images: formData.image ? [formData.image] : [],
      image: formData.image, // Keep for backward compatibility
      features: [],
      specifications: {},
      rating: 0,
      reviews: 0,
      tags: []
    };

    onSave(productData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {product ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
              rows="4"
              placeholder="Masukkan deskripsi produk"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Harga
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
                required
              >
                <option value="">Pilih kategori</option>
                <option value="Kabel">Kabel</option>
                <option value="Router">Router</option>
                <option value="Switch">Switch</option>
                <option value="Modem">Modem</option>
                <option value="Aksesoris">Aksesoris</option>
                <option value="Perangkat Jaringan">Perangkat Jaringan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Brand
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
                placeholder="Contoh: AMP, Belden, TP-Link"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
                placeholder="Contoh: AMP-123, BLD-456"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Gambar Produk
            </label>

            {/* Image Preview */}
            {imagePreview && imagePreview.trim() !== '' && (
              <div className="mb-4 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.svg';
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Upload Options */}
            <div className="space-y-4">
              {/* File Upload */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> atau drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {/* URL Input */}
              <div className="text-center text-sm text-gray-500">atau</div>
              <div>
                <input
                  type="url"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
                  placeholder="Masukkan URL gambar..."
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Status Stok
              </label>
              <select
                value={formData.inStock}
                onChange={(e) => setFormData({...formData, inStock: e.target.value === 'true'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-900 bg-white"
              >
                <option value="true">Tersedia</option>
                <option value="false">Habis</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              {product ? 'Update Produk' : 'Simpan Produk'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
