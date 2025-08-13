'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tentang <span className="text-red-600">TelecomShop</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solusi terpercaya untuk kebutuhan peralatan telekomunikasi dan jaringan profesional
          </p>
        </div>

        {/* About Us Section with Logo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 mb-16">
          <div className="flex flex-col items-center text-center mb-12">
            {/* Logo */}
            <div className="w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-lg bg-white border-4 border-red-100 overflow-hidden">
              <Image
                src="/telecom-shop-logo.png"
                alt="TelecomShop Logo"
                width={120}
                height={120}
                className="w-full h-full object-contain p-2"
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 text-gray-600 leading-relaxed text-lg">
            <p className="text-center">
              TelecomShop adalah platform e-commerce yang mengkhususkan diri dalam
              penyediaan peralatan telekomunikasi berkualitas tinggi untuk kebutuhan
              pendidikan SMK, profesional, dan hobbyist.
            </p>
            <p className="text-center">
              Dengan pengalaman bertahun-tahun di industri telekomunikasi, kami
              berkomitmen untuk menyediakan produk-produk terbaik dengan harga
              kompetitif dan layanan pelanggan yang memuaskan.
            </p>
            <p className="text-center">
              Misi kami adalah mendukung perkembangan teknologi telekomunikasi
              di Indonesia melalui penyediaan peralatan berkualitas dan edukasi
              yang berkelanjutan.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
              <p className="text-lg text-gray-600">
                Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-black placeholder-gray-400"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-black placeholder-gray-400"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subjek *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-black placeholder-gray-400"
                  placeholder="Subjek pesan Anda"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none text-black placeholder-gray-400"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800">Pesan Anda berhasil dikirim! Kami akan segera merespons.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.</p>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
