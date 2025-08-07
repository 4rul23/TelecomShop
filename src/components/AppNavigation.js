'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ShoppingCart, User, LogOut, Package, Shield } from 'lucide-react';
import { useCart } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';
import { useToastContext } from './ToastProvider';

function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { getItemCount, isClient } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { showLoginRequired } = useToastContext();


  const handleCartClick = () => {
    if (!isLoggedIn) {
      showLoginRequired('mengakses keranjang belanja');
      return;
    }
    router.push('/cart');
  };


  const isAdmin = () => {
    if (!user) return false;
    return user.email === 'admin@telecomshop.com' ||
           user.role === 'admin' ||
           user.email.includes('admin');
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produk?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/produk');
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-1 transition-all duration-300 hover:scale-105">
              <span className="text-2xl font-bold text-gray-900">
                Telecom
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Shop
              </span>
            </Link>
          </div>


          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`relative group px-4 py-2 font-medium transition-all duration-200 ${
                isActiveLink('/')
                  ? 'text-red-600'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                isActiveLink('/')
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link
              href="/produk"
              className={`relative group px-4 py-2 font-medium transition-all duration-200 ${
                isActiveLink('/produk')
                  ? 'text-red-600'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Products
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                isActiveLink('/produk')
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link
              href="/about"
              className={`relative group px-4 py-2 font-medium transition-all duration-200 ${
                isActiveLink('/about')
                  ? 'text-red-600'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                isActiveLink('/about')
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </div>


          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                placeholder="Cari produk, merek, atau kategori..."
                className="w-80 pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-500 hover:text-white hover:bg-red-500 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>


            {isLoggedIn && (
              <Link
                href="/cart"
                className="relative p-2 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {isClient && getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            )}


            {!isLoggedIn && (
              <button
                onClick={handleCartClick}
                className="relative p-2 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
            )}


            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/70 backdrop-blur-md border border-gray-200 rounded-lg text-gray-900 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-sm">{user?.name || 'User'}</span>
                </button>


                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@email.com'}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profil & Pengaturan
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mr-3" />
                      Pesanan Saya
                    </Link>
                    {isAdmin() && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-3" />
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-900 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>


          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {/* Mobile Search */}
            <div className="pb-4">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Cari produk..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-gray-500 hover:text-white hover:bg-red-500 transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            <Link
              href="/"
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActiveLink('/')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-900 hover:text-red-600 hover:bg-red-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/produk"
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActiveLink('/produk')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-900 hover:text-red-600 hover:bg-red-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActiveLink('/about')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-900 hover:text-red-600 hover:bg-red-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            {isLoggedIn && (
              <Link
                href="/cart"
                className="flex items-center px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                Keranjang
                {isClient && getItemCount() > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            )}


            {!isLoggedIn && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCartClick();
                }}
                className="flex items-center px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 w-full text-left"
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                Keranjang
              </button>
            )}


            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200 mt-4">
                  Logged in as <span className="font-medium text-red-600">{user?.name || 'User'}</span>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profil & Pengaturan
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package className="h-5 w-5 mr-3" />
                  Pesanan Saya
                </Link>
                {isAdmin() && (
                  <Link
                    href="/admin"
                    className="flex items-center px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium border-t border-gray-200 mt-4 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium text-center mx-4 hover:from-red-700 hover:to-red-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}


export { NavigationBar };
