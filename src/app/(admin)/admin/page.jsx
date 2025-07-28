'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Home,
  BarChart3
} from 'lucide-react';

// Import komponen admin
import OverviewTab from './components/OverviewTab';
import ProductsTab from './components/ProductsTab';
import OrdersTab from './components/OrdersTab';
import UsersTab from './components/UsersTab';
import SettingsTab from './components/SettingsTab';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Safe JSON parse utility
  const safeJsonParse = (str, fallback = null) => {
    try {
      if (!str || str === 'undefined' || str === 'null') {
        return fallback;
      }
      return JSON.parse(str);
    } catch (error) {
      console.error('JSON parse error:', error);
      return fallback;
    }
  };

  // Check admin authentication
  useEffect(() => {
    checkAdminAuth();
  }, []);

  // Load data with polling
  useEffect(() => {
    if (user) {
      loadData();
      const interval = setInterval(loadData, 200);
      return () => clearInterval(interval);
    }
  }, [user]);

  const checkAdminAuth = () => {
    try {
      const userData = safeJsonParse(localStorage.getItem('user'), null);

      if (!userData || userData.role !== 'admin') {
        router.push('/login');
        return;
      }

      setUser(userData);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const loadData = () => {
    try {
      const productsData = safeJsonParse(localStorage.getItem('products'), []);
      const ordersData = safeJsonParse(localStorage.getItem('orders'), []);
      const usersData = safeJsonParse(localStorage.getItem('users'), []);

      setProducts(productsData);
      setOrders(ordersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-black">Telecom</span>
                <span className="text-red-600">Shop</span>
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <Home className="h-5 w-5 mr-2" />
                Kembali ke Website
              </Link>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: 'Produk', icon: Package },
              { id: 'orders', label: 'Pesanan', icon: ShoppingCart },
              { id: 'users', label: 'Pengguna', icon: Users },
              { id: 'settings', label: 'Pengaturan', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            products={products}
            orders={orders}
            users={users}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            setProducts={setProducts}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab orders={orders} setOrders={setOrders} />
        )}

        {activeTab === 'users' && (
          <UsersTab users={users} setUsers={setUsers} />
        )}

        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>
    </div>
  );
}
