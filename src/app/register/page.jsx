'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import ClientOnly from '../../components/ClientOnly';

export default function RegisterPage() {
  return (
    <ClientOnly>
      <RegisterContent />
    </ClientOnly>
  );
}

function RegisterContent() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
    }

    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (formData.phone && !/^[\d\-\+\(\)\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Use the new file-based registration system
      const result = await register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone || ''
      });

      if (result.success) {
        console.log('Registration successful:', result.user);

        // Show success message or redirect
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        // Handle registration errors
        if (result.error === 'User already exists') {
          setErrors({ email: 'Email sudah terdaftar. Silakan gunakan email lain.' });
        } else {
          setErrors({ general: result.error });
        }
      }
  // registration handled by API and AuthContext; no local existingUsers variable needed

    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="flex items-center text-black hover:text-red-600 transition-all duration-200 hover:scale-105 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>


        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-1 group">
            <span className="text-4xl font-bold text-black group-hover:text-gray-800 transition-colors duration-200">Telecom</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Shop</span>
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">
            Daftar Akun Baru
          </h2>
          <p className="text-black mb-8 font-medium">
            Bergabunglah dengan ribuan pelanggan kami
          </p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-8 shadow-2xl sm:rounded-3xl sm:px-12 border-2 border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}


            <div>
              <label htmlFor="name" className="block text-sm font-bold text-black mb-3">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 text-black font-medium placeholder-gray-400 ${
                    errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-white'
                  }`}
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              {errors.name && <p className="mt-3 text-sm text-red-600 flex items-center font-medium">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>}
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-bold text-black mb-3">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 text-black font-medium placeholder-gray-400 ${
                    errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-white'
                  }`}
                  placeholder="contoh@email.com"
                />
              </div>
              {errors.email && <p className="mt-3 text-sm text-red-600 flex items-center font-medium">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>}
            </div>


            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-black mb-3">
                Nomor Telepon <span className="text-gray-500 font-normal">(Opsional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 text-black font-medium placeholder-gray-400 ${
                    errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-white'
                  }`}
                  placeholder="08123456789"
                />
              </div>
              {errors.phone && <p className="mt-3 text-sm text-red-600 flex items-center font-medium">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.phone}
              </p>}
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-bold text-black mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-14 py-4 border-2 rounded-2xl focus:outline-none focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 text-black font-medium placeholder-gray-400 ${
                    errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-white'
                  }`}
                  placeholder="Minimal 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-black transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-black transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-3 text-sm text-red-600 flex items-center font-medium">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>}
            </div>


            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-black mb-3">
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-12 pr-14 py-4 border-2 rounded-2xl focus:outline-none focus:ring-3 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 text-black font-medium placeholder-gray-400 ${
                    errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-white'
                  }`}
                  placeholder="Ulangi password Anda"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-black transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-black transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-3 text-sm text-red-600 flex items-center font-medium">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.confirmPassword}
              </p>}
            </div>


            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-lg text-base font-bold text-white transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:scale-105 active:scale-95 shadow-red-500/25'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Mendaftarkan...
                  </div>
                ) : (
                  'Daftar Akun'
                )}
              </button>
            </div>
          </form>


          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-white text-black font-bold">Sudah memiliki akun?</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/login"
                className="w-full flex justify-center py-4 px-6 border-2 border-gray-400 rounded-2xl shadow-lg bg-white text-base font-bold text-black hover:bg-gray-50 hover:border-gray-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Masuk ke Akun
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
