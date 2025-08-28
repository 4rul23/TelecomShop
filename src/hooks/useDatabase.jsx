'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';


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

// Helper function to make authenticated API calls
const makeApiCall = async (url, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};


export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  // Hooks should be called at the top level of the hook (not inside handlers)
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    loadCart();
  }, [auth.isLoggedIn]);

  const loadCart = async () => {
    if (!auth.isLoggedIn) {
      // If not logged in, try to load from localStorage as fallback
      const cartData = safeLocalStorageGet('indri_cart', []);
      setCart(cartData);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await makeApiCall('/api/cart');
      if (response.success) {
        setCart(response.data || []);
      } else {
        throw new Error(response.error || 'Failed to load cart');
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setError(error.message);
      // Fallback to localStorage
      const cartData = safeLocalStorageGet('indri_cart', []);
      setCart(cartData);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isClient) return;

    if (!auth.isLoggedIn) {
      // Use requireAuth to prompt and set redirectAfterLogin
      const ok = auth.requireAuth('menambahkan produk ke keranjang');
      if (!ok) return false;
    }

    try {
      setError(null);
      const response = await makeApiCall('/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          quantity
        })
      });

      if (response.success) {
        // Reload cart to get updated data
        await loadCart();
        return true;
      } else {
        throw new Error(response.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message);
      
      // Fallback to localStorage for offline functionality
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
    }
  };

  const removeFromCart = async (productId) => {
    if (!isClient) return;

    try {
      setError(null);
      const response = await makeApiCall(`/api/cart?productId=${productId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        // Reload cart to get updated data
        await loadCart();
        return true;
      } else {
        throw new Error(response.error || 'Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError(error.message);
      
      // Fallback to localStorage
      const newCart = cart.filter(item => item.id !== productId);
      setCart(newCart);
      safeLocalStorageSet('indri_cart', newCart);
      return newCart;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isClient) return;

    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    try {
      setError(null);
      const response = await makeApiCall('/api/cart', {
        method: 'PUT',
        body: JSON.stringify({
          productId,
          quantity
        })
      });

      if (response.success) {
        // Reload cart to get updated data
        await loadCart();
        return true;
      } else {
        throw new Error(response.error || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError(error.message);
      
      // Fallback to localStorage
      const newCart = cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );

      setCart(newCart);
      safeLocalStorageSet('indri_cart', newCart);
      return newCart;
    }
  };

  const clearCart = async () => {
    if (!isClient) return;

    try {
      setError(null);
      const response = await makeApiCall('/api/cart?clearAll=true', {
        method: 'DELETE'
      });

      if (response.success) {
        setCart([]);
        return true;
      } else {
        throw new Error(response.error || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError(error.message);
      
      // Fallback to localStorage
      setCart([]);
      safeLocalStorageSet('indri_cart', []);
    }
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
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemCount: getTotalItems,
    getTotal: getTotalPrice,
    isClient,
    refreshCart: loadCart
  };
};


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


export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);
  
  const auth = useAuth();

  useEffect(() => {
    setIsClient(true);
    loadOrders();
  }, [auth.isLoggedIn]);

  const loadOrders = async () => {
    if (!auth.isLoggedIn) {
      // If not logged in, try to load from localStorage as fallback
      const ordersData = safeLocalStorageGet('indri_orders', []);
      setOrders(ordersData);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await makeApiCall('/api/orders');
      if (response.success) {
        setOrders(response.data || []);
      } else {
        throw new Error(response.error || 'Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setError(error.message);
      // Fallback to localStorage
      const ordersData = safeLocalStorageGet('indri_orders', []);
      setOrders(ordersData);
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = async (orderData) => {
    if (!isClient) return;

    try {
      setError(null);
      const response = await makeApiCall('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });

      if (response.success) {
        // Reload orders to get updated data
        await loadOrders();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message);
      
      // Fallback to localStorage
      const newOrder = {
        id: Date.now(),
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      const newOrders = [newOrder, ...orders];
      setOrders(newOrders);
      safeLocalStorageSet('indri_orders', newOrders);
      return newOrder;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    if (!isClient) return;

    try {
      setError(null);
      // Note: You'll need to implement the PUT endpoint for orders
      // For now, this will fall back to localStorage
      throw new Error('Order status update via API not implemented yet');
    } catch (error) {
      console.error('Error updating order status:', error);
      setError(error.message);
      
      // Fallback to localStorage
      const newOrders = orders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      );

      setOrders(newOrders);
      safeLocalStorageSet('indri_orders', newOrders);
    }
  };

  return {
    orders,
    isLoading,
    error,
    addOrder,
    updateOrderStatus,
    isClient,
    refreshOrders: loadOrders
  };
};
