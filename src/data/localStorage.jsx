// Utils untuk localStorage management
class LocalStorageDB {
  constructor() {
    this.KEYS = {
      CART: 'indri_cart',
      ORDERS: 'indri_orders',
      USER: 'indri_user',
      PRODUCTS: 'indri_products',
      FAVORITES: 'indri_favorites'
    };
  }

  // Safe JSON parse dengan error handling
  safeJsonParse(str, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      return JSON.parse(str);
    } catch (error) {
      console.warn('Error parsing JSON:', error);
      return defaultValue;
    }
  }

  // Safe localStorage get dengan error handling
  safeLocalStorageGet(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? this.safeJsonParse(item, defaultValue) : defaultValue;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  // Safe localStorage set dengan error handling
  safeLocalStorageSet(key, value) {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Error writing to localStorage:', error);
      return false;
    }
  }

  // Cart management
  getCart() {
    return this.safeLocalStorageGet(this.KEYS.CART, []);
  }

  setCart(cart) {
    return this.safeLocalStorageSet(this.KEYS.CART, cart);
  }

  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    this.setCart(cart);
    return cart;
  }

  removeFromCart(productId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    this.setCart(updatedCart);
    return updatedCart;
  }

  updateCartQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.setCart(cart);
      }
    }
    
    return cart;
  }

  clearCart() {
    this.safeLocalStorageSet(this.KEYS.CART, []);
    return [];
  }

  // Orders management
  getOrders() {
    return this.safeLocalStorageGet(this.KEYS.ORDERS, []);
  }

  addOrder(order) {
    const orders = this.getOrders();
    const newOrder = {
      id: Date.now(),
      ...order,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    orders.unshift(newOrder);
    this.safeLocalStorageSet(this.KEYS.ORDERS, orders);
    return newOrder;
  }

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      this.safeLocalStorageSet(this.KEYS.ORDERS, orders);
    }
    
    return orders;
  }

  // User management
  getUser() {
    return this.safeLocalStorageGet(this.KEYS.USER, null);
  }

  setUser(user) {
    return this.safeLocalStorageSet(this.KEYS.USER, user);
  }

  removeUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.KEYS.USER);
    }
  }

  // Products management (untuk admin)
  getProducts() {
    return this.safeLocalStorageGet(this.KEYS.PRODUCTS, []);
  }

  setProducts(products) {
    return this.safeLocalStorageSet(this.KEYS.PRODUCTS, products);
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: Date.now(),
      ...product,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    this.setProducts(products);
    return newProduct;
  }

  updateProduct(productId, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === productId);
    
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      this.setProducts(products);
    }
    
    return products;
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    this.setProducts(updatedProducts);
    return updatedProducts;
  }

  // Favorites management
  getFavorites() {
    return this.safeLocalStorageGet(this.KEYS.FAVORITES, []);
  }

  addToFavorites(productId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      this.safeLocalStorageSet(this.KEYS.FAVORITES, favorites);
    }
    return favorites;
  }

  removeFromFavorites(productId) {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== productId);
    this.safeLocalStorageSet(this.KEYS.FAVORITES, updatedFavorites);
    return updatedFavorites;
  }

  isFavorite(productId) {
    const favorites = this.getFavorites();
    return favorites.includes(productId);
  }

  // Utility methods
  getTotalCartItems() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalCartValue() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Clear all data (untuk reset)
  clearAllData() {
    if (typeof window !== 'undefined') {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }

  // Export data untuk backup
  exportData() {
    const data = {};
    Object.entries(this.KEYS).forEach(([name, key]) => {
      data[name] = this.safeLocalStorageGet(key, null);
    });
    return data;
  }

  // Import data dari backup
  importData(data) {
    Object.entries(data).forEach(([name, value]) => {
      const key = this.KEYS[name];
      if (key && value !== null) {
        this.safeLocalStorageSet(key, value);
      }
    });
  }

  // Search products di localStorage
  searchProducts(query) {
    const products = this.getProducts();
    const lowercaseQuery = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      (product.brand && product.brand.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get products by category
  getProductsByCategory(category) {
    const products = this.getProducts();
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get featured products
  getFeaturedProducts(limit = 8) {
    const products = this.getProducts();
    return products
      .filter(product => product.featured)
      .slice(0, limit);
  }
}

// Create and export singleton instance
const db = new LocalStorageDB();

export { db };
export default db;
