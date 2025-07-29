'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const ProtectedPage = ({ children, message = 'mengakses halaman ini' }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) return; // Wait for auth check to complete

    if (!isLoggedIn) {
      // Store the current URL to redirect back after login
      const currentUrl = window.location.pathname + window.location.search;
      localStorage.setItem('redirectAfterLogin', currentUrl);

      // Show message and redirect
      alert(`Anda harus login untuk ${message}`);
      router.push('/login');
      return;
    }

    setShouldRender(true);
  }, [isLoggedIn, isLoading, router, message]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Don't render children until auth is confirmed
  if (!shouldRender || !isLoggedIn) {
    return null;
  }

  return children;
};

export default ProtectedPage;
