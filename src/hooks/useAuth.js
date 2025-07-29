'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastFunction, setToastFunction] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'authToken') {
        checkAuthStatus();
      }
    };

    // Listen for custom auth events
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Set up toast function from window object (will be set by ToastProvider)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.showAuthToast) {
      setToastFunction(() => window.showAuthToast);
    }
  }, []);

  const checkAuthStatus = () => {
    try {
      const userData = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');

      if (userData && authToken) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const requireAuth = (actionName = 'melakukan aksi ini') => {
    if (!isLoggedIn) {
      // Store the current URL to redirect back after login
      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectAfterLogin', currentUrl);

      // Try to use toast if available, fallback to alert
      if (toastFunction) {
        toastFunction(actionName);
      } else if (typeof window !== 'undefined' && window.showAuthToast) {
        window.showAuthToast(actionName);
      } else {
        // Fallback with a more attractive alert
        const shouldRedirect = confirm(
          `🔐 Anda harus login untuk ${actionName}\n\nKlik OK untuk pergi ke halaman login, atau Cancel untuk tetap di halaman ini.`
        );
        if (shouldRedirect) {
          router.push('/login');
        }
      }
      return false;
    }
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('indri_cart'); // Clear cart on logout
    localStorage.removeItem('indri_favorites'); // Clear favorites on logout

    setUser(null);
    setIsLoggedIn(false);

    // Dispatch auth change event
    window.dispatchEvent(new Event('authChange'));

    // Redirect to home
    router.push('/');
  };

  return {
    isLoggedIn,
    user,
    isLoading,
    requireAuth,
    logout,
    checkAuthStatus
  };
};
