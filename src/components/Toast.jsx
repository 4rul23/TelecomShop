'use client';

import { useState, useEffect } from 'react';
import { X, ShoppingCart, Lock, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'info', isVisible, onClose, actionText, onAction }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-white border-2 border-red-200 text-gray-900 shadow-xl';
      case 'error':
        return 'bg-white border-2 border-red-300 text-gray-900 shadow-xl';
      case 'success':
        return 'bg-white border-2 border-green-200 text-gray-900 shadow-xl';
      default:
        return 'bg-white border-2 border-gray-200 text-gray-900 shadow-xl';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <Lock className="h-5 w-5 text-red-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'cart':
        return <ShoppingCart className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getProgressBarColor = () => {
    switch (type) {
      case 'warning':
      case 'error':
      case 'cart':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getActionButtonStyle = () => {
    switch (type) {
      case 'warning':
      case 'error':
      case 'cart':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-right-5 duration-300">
      <div className={`${getToastStyles()} rounded-xl p-4 min-w-[320px] max-w-md backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-relaxed">
              {message}
            </p>

            {actionText && onAction && (
              <button
                onClick={onAction}
                className={`mt-3 inline-flex items-center px-3 py-1.5 ${getActionButtonStyle()} text-xs font-medium rounded-lg transition-all duration-200 shadow-sm`}
              >
                {actionText}
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-xl overflow-hidden w-full">
          <div className={`h-full ${getProgressBarColor()} animate-progress-bar`}></div>
        </div>
      </div>
    </div>
  );
};

// Hook untuk mengelola toast notifications
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', actionText = null, onAction = null) => {
    const id = Date.now() + Math.random(); // Add random component to prevent duplicates
    const newToast = {
      id,
      message,
      type,
      actionText,
      onAction,
      isVisible: true
    };

    setToasts(prev => [...prev, newToast]);

    return id;
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showLoginRequired = (action = 'melakukan aksi ini', onLoginClick = null) => {
    return showToast(
      `� Login diperlukan untuk ${action}`,
      'warning',
      '🚀 Login Sekarang',
      onLoginClick
    );
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-[9999] space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          actionText={toast.actionText}
          onAction={toast.onAction}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    showLoginRequired,
    hideToast,
    ToastContainer
  };
};

export default Toast;
