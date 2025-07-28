'use client';

import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import { getAllProducts } from '../../../../data/products';

export default function ProductsTab({ products, setProducts }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with database products if localStorage is empty
  useEffect(() => {
    if (!products || products.length === 0) {
      const dbProducts = getAllProducts();
      // Convert database format to localStorage format
      const formattedProducts = dbProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.images && product.images[0] ? product.images[0] : '/placeholder-product.svg',
        brand: product.brand,
        sku: product.sku,
        createdAt: new Date().toISOString()
      }));

      setProducts(formattedProducts);
      // Save to localStorage for admin modifications
      localStorage.setItem('products', JSON.stringify(formattedProducts));
    }
  }, [products, setProducts]);

  const filteredProducts = (products || []).filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteProduct = (productId) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        const updatedProducts = (products || []).filter(p => p.id !== productId);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Terjadi kesalahan saat menghapus produk.');
      }
    }
  };

  const handleSaveProduct = (productData) => {
    try {
      let updatedProducts;
      if (editingProduct) {
        // Edit existing product - preserve original ID and createdAt
        updatedProducts = (products || []).map(p =>
          p.id === editingProduct.id
            ? {
                ...productData,
                id: editingProduct.id, // Ensure ID is preserved
                createdAt: editingProduct.createdAt || new Date().toISOString(),
                // Map database structure to localStorage structure
                stock: productData.inStock !== false ? 100 : 0, // Convert inStock to stock number
                image: productData.images && productData.images.length > 0 ? productData.images[0] : productData.image
              }
            : p
        );
      } else {
        // Add new product - convert database structure to localStorage structure
        const newProduct = {
          id: Date.now(),
          name: productData.name,
          category: productData.category,
          price: productData.price,
          stock: productData.inStock !== false ? 100 : 0, // Convert inStock to stock number
          description: productData.description,
          image: productData.images && productData.images.length > 0 ? productData.images[0] : productData.image,
          brand: productData.brand,
          sku: productData.sku,
          inStock: productData.inStock,
          createdAt: new Date().toISOString()
        };
        updatedProducts = [...(products || []), newProduct];
      }

      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setShowAddForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Terjadi kesalahan saat menyimpan produk. Silakan coba lagi.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Products Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Produk</h2>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Tambah Produk
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => setEditingProduct(product)}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
