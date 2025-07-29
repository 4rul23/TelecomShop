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

export default function OrderSuccessContent() {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = () => {
    const orderDate = new Date(orderData?.date);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 3); // 3 days delivery

    return deliveryDate.toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">Data pesanan yang Anda cari tidak tersedia.</p>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pesanan Berhasil!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Terima kasih atas pesanan Anda. Kami telah menerima pesanan Anda dan akan segera memprosesnya.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-red-600 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Detail Pesanan</h2>
                <p className="text-red-100">ID Pesanan: {orderData.id}</p>
              </div>
              <div className="text-right">
                <p className="text-red-100">Tanggal Pesanan</p>
                <p className="font-semibold">{formatDate(orderData.date)}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Order Status */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Status Pesanan</h3>
                <p className="text-blue-600 font-medium">{orderData.status}</p>
              </div>
              <div className="flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Estimasi Pengiriman</h4>
                    <p className="text-gray-600">{getEstimatedDelivery()}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Alamat Pengiriman</h4>
                    <p className="text-gray-600">
                      {orderData.customer?.name}<br />
                      {orderData.customer?.address}<br />
                      {orderData.customer?.city} {orderData.customer?.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">No. Telepon</h4>
                    <p className="text-gray-600">{orderData.customer?.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">{orderData.customer?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Produk yang Dipesan</h3>
              <div className="space-y-4">
                {orderData.items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-white rounded-lg border overflow-hidden">
                      <img
                        src={item.image || '/placeholder-product.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderData.subtotal || orderData.total - 15000)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim</span>
                    <span>{formatPrice(orderData.shipping || 15000)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(orderData.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Metode Pembayaran</h3>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {orderData.paymentMethod === 'credit' ? 'Kartu Kredit' :
                   orderData.paymentMethod === 'bank' ? 'Transfer Bank' :
                   orderData.paymentMethod === 'ewallet' ? `E-Wallet (${orderData.selectedEwallet})` :
                   'COD'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download Invoice</span>
          </button>

          <Link
            href="/orders"
            className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Package className="w-5 h-5" />
            <span>Lihat Semua Pesanan</span>
          </Link>

          <Link
            href="/produk"
            className="flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <span>Lanjut Belanja</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Butuh Bantuan?</h3>
          <p className="text-gray-600 mb-4">
            Jika ada pertanyaan tentang pesanan Anda, silakan hubungi customer service kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+628123456789"
              className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700"
            >
              <Phone className="w-4 h-4" />
              <span>+62 812-3456-789</span>
            </a>
            <a
              href="mailto:support@telecomshop.com"
              className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700"
            >
              <Mail className="w-4 h-4" />
              <span>support@telecomshop.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
