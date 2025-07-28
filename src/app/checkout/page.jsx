'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Wallet,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  Truck,
  Clock
} from 'lucide-react';
import { useCart } from '../../hooks/useDatabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotal, getItemCount, clearCart, isClient } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Form data
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedEwallet, setSelectedEwallet] = useState('');

  // E-wallet options
  const ewalletOptions = [
    {
      id: 'gopay',
      name: 'GoPay',
      logo: '/public/ewallet/gopay.png',
      description: 'Bayar dengan GoPay',
      color: 'bg-green-500'
    },
    {
      id: 'ovo',
      name: 'OVO',
      logo: '/public/ewallet/ovo.png',
      description: 'Bayar dengan OVO',
      color: 'bg-purple-600'
    },
    {
      id: 'dana',
      name: 'DANA',
      logo: '/public/ewallet/dana.png',
      description: 'Bayar dengan DANA',
      color: 'bg-blue-600'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      logo: '/public/ewallet/shopeepay.png',
      description: 'Bayar dengan ShopeePay',
      color: 'bg-orange-500'
    },
    {
      id: 'linkaja',
      name: 'LinkAja',
      logo: '/public/ewallet/linkaja.png',
      description: 'Bayar dengan LinkAja',
      color: 'bg-red-600'
    }
  ];

  useEffect(() => {
    // Load user data if logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCustomerData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }
  }, []);

  const processOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order ID
      const orderId = `ORD-${Date.now()}`;
      const orderDate = new Date().toISOString();

      // Create order object
      const order = {
        id: orderId,
        date: orderDate,
        status: 'Processing',
        total: total,
        subtotal: subtotal,
        shipping: shipping,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        customer: { ...customerData },
        paymentMethod: paymentMethod,
        selectedEwallet: selectedEwallet
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));

      // Clear cart
      clearCart();

      // Show success state
      setOrderSuccess(true);

      // Redirect to success page after delay
      setTimeout(() => {
        router.push('/order-success?orderId=' + orderId);
      }, 3000);

    } catch (error) {
      console.error('Order processing error:', error);
      alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleInputChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep1 = () => {
    return customerData.name &&
           customerData.email &&
           customerData.phone &&
           customerData.address &&
           customerData.city &&
           customerData.postalCode;
  };

  const validateStep2 = () => {
    return paymentMethod && (paymentMethod !== 'ewallet' || selectedEwallet);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOrder = async () => {
    await processOrder();
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-8">Tidak ada produk di keranjang Anda.</p>
          <Link
            href="/produk"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan Berhasil!</h2>
          <p className="text-gray-600 mb-8">
            Terima kasih atas pesanan Anda. Kami akan memproses pesanan Anda segera.
          </p>
          <div className="animate-pulse text-red-600 font-medium">
            Mengalihkan ke halaman sukses...
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = 25000; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > step ? 'bg-red-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Informasi Pembeli</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={customerData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      value={customerData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kota *
                    </label>
                    <input
                      type="text"
                      value={customerData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Nama kota"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap *
                    </label>
                    <textarea
                      value={customerData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Alamat lengkap termasuk nama jalan, nomor rumah, RT/RW"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kode Pos *
                    </label>
                    <input
                      type="text"
                      value={customerData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catatan (Opsional)
                    </label>
                    <input
                      type="text"
                      value={customerData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Catatan untuk kurir"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Wallet className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Metode Pembayaran</h2>
                </div>

                {/* E-Wallet Options */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">E-Wallet</h3>
                  {ewalletOptions.map((ewallet) => (
                    <div
                      key={ewallet.id}
                      onClick={() => {
                        setPaymentMethod('ewallet');
                        setSelectedEwallet(ewallet.id);
                      }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'ewallet' && selectedEwallet === ewallet.id
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg ${ewallet.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{ewallet.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{ewallet.name}</h4>
                          <p className="text-sm text-gray-600">{ewallet.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          paymentMethod === 'ewallet' && selectedEwallet === ewallet.id
                            ? 'border-red-600 bg-red-600'
                            : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'ewallet' && selectedEwallet === ewallet.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bank Transfer */}
                  <div className="mt-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Transfer Bank</h3>
                    <div
                      onClick={() => {
                        setPaymentMethod('bank_transfer');
                        setSelectedEwallet('');
                      }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Transfer Bank</h4>
                          <p className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          paymentMethod === 'bank_transfer'
                            ? 'border-red-600 bg-red-600'
                            : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'bank_transfer' && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Review Pesanan</h2>
                </div>

                {/* Customer Info Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Informasi Pengiriman</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nama:</span> {customerData.name}</p>
                    <p><span className="font-medium">Email:</span> {customerData.email}</p>
                    <p><span className="font-medium">Telepon:</span> {customerData.phone}</p>
                    <p><span className="font-medium">Alamat:</span> {customerData.address}, {customerData.city} {customerData.postalCode}</p>
                    {customerData.notes && (
                      <p><span className="font-medium">Catatan:</span> {customerData.notes}</p>
                    )}
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Metode Pembayaran</h3>
                  {paymentMethod === 'ewallet' && selectedEwallet && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded ${ewalletOptions.find(e => e.id === selectedEwallet)?.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-xs">
                          {ewalletOptions.find(e => e.id === selectedEwallet)?.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{ewalletOptions.find(e => e.id === selectedEwallet)?.name}</span>
                    </div>
                  )}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Transfer Bank</span>
                    </div>
                  )}
                </div>

                {/* Order Processing */}
                {isProcessing && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memproses pesanan Anda...</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kembali
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 1 && !validateStep1()) ||
                    (currentStep === 2 && !validateStep2())
                  }
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Lanjutkan
                </button>
              ) : (
                <button
                  onClick={handleOrder}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Memproses...' : 'Buat Pesanan'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.quantity} x {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getItemCount()} item)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkos Kirim</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 mb-2">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm font-medium">Estimasi Pengiriman</span>
                </div>
                <p className="text-sm text-blue-600">3-5 hari kerja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
