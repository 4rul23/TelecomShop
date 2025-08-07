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


    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'authToken') {
        checkAuthStatus();
      }
    };


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

      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectAfterLogin', currentUrl);


      if (toastFunction) {
        toastFunction(actionName);
      } else if (typeof window !== 'undefined' && window.showAuthToast) {
        window.showAuthToast(actionName);
      } else {

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
    localStorage.removeItem('indri_cart');
    localStorage.removeItem('indri_favorites');

    setUser(null);
    setIsLoggedIn(false);


    window.dispatchEvent(new Event('authChange'));


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
