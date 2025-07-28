'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Calendar, MapPin, Phone, Mail, ArrowLeft, Eye } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const savedUser = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');

      if (!savedUser || !authToken) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Load orders from localStorage
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const allOrders = JSON.parse(savedOrders);
        // Filter orders for current user (if needed, or show all for demo)
        setOrders(allOrders);
      } else {
        // Generate some demo orders for the user if no orders exist
        const demoOrders = [
        {
          id: 'ORD-001',
          date: '2024-01-15',
          status: 'Delivered',
          total: 2750000,
          items: [
            { name: 'RJ45 Connector Cat6', quantity: 100, price: 2500 },
            { name: 'Switch 24 Port Gigabit', quantity: 2, price: 1250000 }
          ],
          shippingAddress: parsedUser.address || 'Alamat belum diisi'
        },
        {
          id: 'ORD-002',
          date: '2024-01-20',
          status: 'Processing',
          total: 1850000,
          items: [
            { name: 'Access Point WiFi 6', quantity: 1, price: 1850000 }
          ],
          shippingAddress: parsedUser.address || 'Alamat belum diisi'
        },
        {
          id: 'ORD-003',
          date: '2024-01-25',
          status: 'Shipped',
          total: 450000,
          items: [
            { name: 'Fiber Optic Cable SC-SC 50m', quantity: 1, price: 450000 }
          ],
          shippingAddress: parsedUser.address || 'Alamat belum diisi'
        }
        ];

        setOrders(demoOrders);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Kembali ke Beranda
              </Link>
            </div>
            <Link
              href="/profile"
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
            >
              Lihat Profil
            </Link>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="h-8 w-8 mr-3 text-red-600" />
            Riwayat Pesanan
          </h1>
          <p className="mt-2 text-gray-600">
            Lihat semua pesanan yang pernah Anda buat
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pesanan</h3>
            <p className="text-gray-600 mb-6">
              Anda belum memiliki riwayat pesanan. Mulai berbelanja sekarang!
            </p>
            <Link
              href="/produk"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Mulai Berbelanja
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <button className="text-red-600 hover:text-red-700 transition-colors duration-200">
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Items Pesanan</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:border-l lg:border-gray-200 lg:pl-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Ringkasan</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Items:</span>
                          <span className="text-gray-900">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-3">
                          <span className="text-gray-900">Total:</span>
                          <span className="text-red-600">{formatPrice(order.total)}</span>
                        </div>

                        {/* Shipping Address */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            Alamat Pengiriman
                          </h5>
                          <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Status: <span className="font-medium">{order.status}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {order.status === 'Delivered' && (
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
                          Beli Lagi
                        </button>
                      )}
                      <button className="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Customer Service */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Butuh Bantuan?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Telepon</p>
                <p className="text-sm text-gray-600">0800-1234-5678</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">support@telecomshop.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
