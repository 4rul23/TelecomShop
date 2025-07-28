'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Package,
  Clock,
  Truck,
  MapPin,
  Phone,
  Mail,
  Download,
  ArrowRight
} from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      // Get order from localStorage
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const orders = JSON.parse(savedOrders);
        const order = orders.find(o => o.id === orderId);
        if (order) {
          setOrderData(order);
        }
      }
    }
    setLoading(false);
  }, [searchParams]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">Maaf, kami tidak dapat menemukan data pesanan Anda.</p>
          <Link
            href="/"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pesanan Berhasil Dibuat!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Terima kasih atas pesanan Anda. Kami akan segera memproses pesanan dan mengirimkan update status melalui email.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-xl font-bold">Detail Pesanan</h2>
                <p className="text-red-100">ID Pesanan: {orderData.id}</p>
              </div>
              <Package className="h-8 w-8" />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Tanggal Pesanan</p>
                    <p className="text-gray-600">{new Date(orderData.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Estimasi Pengiriman</p>
                    <p className="text-gray-600">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Alamat Pengiriman</p>
                    <p className="text-gray-600">{orderData.customer?.address || 'Alamat tidak tersedia'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Email Konfirmasi</p>
                    <p className="text-gray-600">{orderData.customer?.email || 'Email tidak tersedia'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Nomor Telepon</p>
                    <p className="text-gray-600">{orderData.customer?.phone || 'Telepon tidak tersedia'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Total Pesanan</p>
                    <p className="text-2xl font-bold text-red-600">{formatPrice(orderData.total)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Status Pesanan</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Sedang Diproses
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Konfirmasi Email</p>
                    <p className="text-gray-600">Telah dikirim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Timeline Pesanan</h3>
          </div>

          <div className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="space-y-6">
                {/* Current Step */}
                <div className="relative flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pesanan Diterima</p>
                    <p className="text-sm text-gray-600">Pesanan Anda telah kami terima dan sedang diproses</p>
                    <p className="text-xs text-gray-500 mt-1">{orderData.orderDate}</p>
                  </div>
                </div>

                {/* Future Steps */}
                <div className="relative flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pesanan Diproses</p>
                    <p className="text-sm text-gray-600">Produk sedang disiapkan untuk dikirim</p>
                  </div>
                </div>

                <div className="relative flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Truck className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pesanan Dikirim</p>
                    <p className="text-sm text-gray-600">Pesanan dalam perjalanan ke alamat Anda</p>
                  </div>
                </div>

                <div className="relative flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Pesanan Diterima</p>
                    <p className="text-sm text-gray-600">Pesanan telah sampai di tujuan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Invoice</span>
          </button>

          <Link
            href="/order-tracking"
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Package className="h-5 w-5" />
            <span>Lacak Pesanan</span>
          </Link>

          <Link
            href="/produk"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <span>Belanja Lagi</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Customer Support */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Butuh Bantuan?</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Customer Service</p>
                  <p className="text-gray-600">0800-1234-5678</p>
                  <p className="text-sm text-gray-500">Senin - Jumat: 08:00 - 17:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-gray-600">support@indri.com</p>
                  <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Catatan:</strong> Anda akan menerima email konfirmasi dengan detail pesanan dan nomor tracking dalam 1-2 jam ke depan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
