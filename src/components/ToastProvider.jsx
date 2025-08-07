'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useToast } from './Toast';
import { useRouter } from 'next/navigation';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const { showToast, showLoginRequired, hideToast, ToastContainer } = useToast();
  const router = useRouter();

  const showAuthToast = (action = 'melakukan aksi ini') => {
    const handleLoginClick = () => {

      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectAfterLogin', currentUrl);
      router.push('/login');
    };

    return showLoginRequired(action, handleLoginClick);
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showAuthToast = showAuthToast;
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.showAuthToast;
      }
    };
  }, []);

  const value = {
    showToast,
    showLoginRequired: showAuthToast,
    hideToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
