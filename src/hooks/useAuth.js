'use client';

import { useRouter } from 'next/navigation';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const router = useRouter();
  const ctx = useAuthContext();

  // Keep requireAuth behavior (redirectAfterLogin), but rely on context for auth state
  const requireAuth = (actionName = 'melakukan aksi ini') => {
    if (!ctx.isLoggedIn) {
      const currentUrl = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('redirectAfterLogin', currentUrl);
        } catch (e) {
          // ignore
        }
      }

      // Try to show toast if available
      if (typeof window !== 'undefined' && window.showAuthToast) {
        window.showAuthToast(actionName);
      } else {
        const shouldRedirect = confirm(
          `🔐 Anda harus login untuk ${actionName}\n\nKlik OK untuk pergi ke halaman login, atau Cancel untuk tetap di halaman ini.`
        );
        if (shouldRedirect) router.push('/login');
      }

      return false;
    }
    return true;
  };

  const logout = () => {
    // Use context logout which clears server session
    ctx.logout();
    // ensure client navigation
    router.push('/');
  };

  return {
    isLoggedIn: ctx.isLoggedIn,
    user: ctx.user,
    isLoading: ctx.loading,
    requireAuth,
    logout,
    checkAuthStatus: ctx.checkAuth
  };
};
