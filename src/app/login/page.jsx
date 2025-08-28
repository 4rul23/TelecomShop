'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import ClientOnly from '../../components/ClientOnly';

export default function LoginPage() {
  return (
    <ClientOnly>
      <LoginContent />
    </ClientOnly>
  );
}

function LoginContent() {
  const router = useRouter();
  const { login, setLocalAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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

      await new Promise(resolve => setTimeout(resolve, 1000));


      if (formData.email === 'admin@telecomshop.com' && formData.password === 'admin123') {
        const adminData = {
          id: 'admin_001',
          name: 'Administrator',
          email: 'admin@telecomshop.com',
          role: 'admin',
          isAdmin: true
        };

        // Use context dev helper to set auth state (no localStorage)
        setLocalAuth(adminData);

        console.log('Admin login successful');

        setTimeout(() => {
          router.push('/admin');
        }, 100);
        return;
      }


      // For regular users, use the new file-based system
      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log('Login successful:', result.user);

        // Redirect after successful login (fallback to '/')
        let redirectPath = '/';
        if (typeof window !== 'undefined') {
          try {
            redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
          } catch (e) {
            // ignore
          }
        }

        setTimeout(() => {
          router.push(redirectPath);
        }, 100);
      } else {
        // Handle login errors
        if (result.error === 'Invalid credentials') {
          setErrors({ email: 'Email atau password tidak valid' });
        } else {
          setErrors({ email: result.error });
        }
      }

    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="flex items-center text-black hover:text-red-600 transition-all duration-200 hover:scale-105 font-medium w-fit"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>


      <div className="flex items-center justify-center min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-1 group">
              <span className="text-4xl font-bold text-black group-hover:text-gray-800 transition-colors duration-200">Telecom</span>
              <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Shop</span>
            </Link>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-black mb-2">
              Masuk ke Akun Anda
            </h2>
            <p className="text-black mb-8 font-medium">
              Silakan masuk untuk melanjutkan berbelanja
            </p>
          </div>

          <div className="bg-white py-12 px-8 shadow-2xl rounded-3xl border-2 border-gray-200">
            <form className="space-y-8" onSubmit={handleSubmit}>
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
                  placeholder="Masukkan password Anda"
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


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-400 rounded-lg transition-colors duration-200"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-black font-medium">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-bold text-red-600 hover:text-red-700 transition-colors duration-200">
                  Lupa password?
                </Link>
              </div>
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
                    Memverifikasi...
                  </div>
                ) : (
                  'Masuk ke Akun'
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
                <span className="px-6 bg-white text-black font-bold">Belum memiliki akun?</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/register"
                className="w-full flex justify-center py-4 px-6 border-2 border-gray-400 rounded-2xl shadow-lg bg-white text-base font-bold text-black hover:bg-gray-50 hover:border-gray-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Daftar Akun Baru
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
