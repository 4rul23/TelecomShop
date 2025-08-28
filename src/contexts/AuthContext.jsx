'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useFileDatabase } from '../hooks/useFileDatabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const fileDB = useFileDatabase();

  useEffect(() => {
    setIsClient(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!isClient) return;

    try {
      const result = await fileDB.getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const result = await fileDB.loginUser(email, password);
      if (result.success) {
        setUser(result.user);
        setIsLoggedIn(true);
        // Notify any legacy listeners (or components listening for authChange)
        if (typeof window !== 'undefined') {
          try {
            window.dispatchEvent(new Event('authChange'));
          } catch (e) {
            console.warn('authChange dispatch failed', e);
          }
        }
        // session persistence is handled by an HttpOnly cookie + server-side session
        // do not write raw user/auth tokens to localStorage for security
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const result = await fileDB.registerUser(userData);
      if (result.success) {
        // Auto login after registration
        const loginResult = await login(userData.email, userData.password);
        return loginResult;
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await fileDB.logoutUser();
      setUser(null);
      setIsLoggedIn(false);
      if (typeof window !== 'undefined') {
        try {
          // Do not remove server session user here; cookie/session is cleared server-side.
          // Keep client-side storage for cart/favorites only.
          localStorage.removeItem('indri_cart');
          localStorage.removeItem('indri_favorites');
          window.dispatchEvent(new Event('authChange'));
        } catch (e) {
          console.warn('Failed to clear localStorage on logout', e);
        }
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // Dev helper: set auth directly (used by admin shortcut in login page)
  const setLocalAuth = (userObj) => {
    setUser(userObj);
    setIsLoggedIn(Boolean(userObj));
    if (typeof window !== 'undefined') {
      try {
        // notify legacy listeners
        window.dispatchEvent(new Event('authChange'));
      } catch (e) {
        console.warn('authChange dispatch failed', e);
      }
    }
  };

  const value = {
    isLoggedIn,
    user,
    loading,
    isClient,
    login,
    register,
    logout,
  setLocalAuth,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
