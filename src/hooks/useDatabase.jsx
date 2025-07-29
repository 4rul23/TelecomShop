'use client';

import { useState, useEffect } from 'react';

// Simple localStorage utilities
const safeJsonParse = (str, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    return JSON.parse(str);
  } catch (error) {
    console.warn('Error parsing JSON:', error);
    return defaultValue;
  }
};

const safeLocalStorageGet = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? safeJsonParse(item, defaultValue) : defaultValue;
  } catch (error) {
    console.warn('Error reading from localStorage:', error);
    return defaultValue;
  }
};

const safeLocalStorageSet = (key, value) => {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('Error writing to localStorage:', error);
    return false;
  }
};

// Hook untuk mengelola cart
export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadCart = () => {
      const cartData = safeLocalStorageGet('indri_cart', []);
      setCart(cartData);
      setIsLoading(false);
    };

    loadCart();
  }, []);

  const addToCart = (product, quantity = 1) => {
    if (!isClient) return;

    // Check if user is logged in before adding to cart
    const userData = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');

    if (!userData || !authToken) {
      // Use global toast function if available
      if (typeof window !== 'undefined' && window.showAuthToast) {
        window.showAuthToast('menambahkan produk ke keranjang');
      } else {
        // Fallback
        const shouldRedirect = confirm(
          `🛒 Anda harus login untuk menambahkan produk ke keranjang\n\nKlik OK untuk pergi ke halaman login, atau Cancel untuk tetap di halaman ini.`
        );
        if (shouldRedirect) {
          const currentUrl = window.location.pathname + window.location.search;
          localStorage.setItem('redirectAfterLogin', currentUrl);
          window.location.href = '/login';
        }
      }
      return false;
    }

    const existingItem = cart.find(item => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }

    setCart(newCart);
    safeLocalStorageSet('indri_cart', newCart);
    return newCart;
  };  const removeFromCart = (productId) => {
    if (!isClient) return;

    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    safeLocalStorageSet('indri_cart', newCart);
    return newCart;
  };

  const updateQuantity = (productId, quantity) => {
    if (!isClient) return;

    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );

    setCart(newCart);
    safeLocalStorageSet('indri_cart', newCart);
    return newCart;
  };

  const clearCart = () => {
    if (!isClient) return;

    setCart([]);
    safeLocalStorageSet('indri_cart', []);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount: getTotalItems, // Alias untuk kompatibilitas
    getTotal: getTotalPrice, // Alias untuk cart page
    isClient
  };
};

// Hook untuk mengelola wishlist
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadWishlist = () => {
      const wishlistData = safeLocalStorageGet('indri_favorites', []);
      setWishlist(wishlistData);
      setIsLoading(false);
    };

    loadWishlist();
  }, []);

  const addToWishlist = (productId) => {
    if (!isClient) return;

    if (!wishlist.includes(productId)) {
      const newWishlist = [...wishlist, productId];
      setWishlist(newWishlist);
      safeLocalStorageSet('indri_favorites', newWishlist);
    }
  };

  const removeFromWishlist = (productId) => {
    if (!isClient) return;

    const newWishlist = wishlist.filter(id => id !== productId);
    setWishlist(newWishlist);
    safeLocalStorageSet('indri_favorites', newWishlist);
  };

  const toggleWishlist = (product) => {
    if (!isClient) return;

    const productId = product.id;
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    isClient
  };
};

// Hook untuk mengelola orders
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadOrders = () => {
      const ordersData = safeLocalStorageGet('indri_orders', []);
      setOrders(ordersData);
      setIsLoading(false);
    };

    loadOrders();
  }, []);

  const addOrder = (order) => {
    if (!isClient) return;

    const newOrder = {
      id: Date.now(),
      ...order,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    safeLocalStorageSet('indri_orders', newOrders);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    if (!isClient) return;

    const newOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    );

    setOrders(newOrders);
    safeLocalStorageSet('indri_orders', newOrders);
  };

  return {
    orders,
    isLoading,
    addOrder,
    updateOrderStatus,
    isClient
  };
};
