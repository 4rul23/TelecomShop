'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, ArrowLeft, Settings, Shield, Bell, Eye, Lock } from 'lucide-react';
import ProtectedPage from '../../components/ProtectedPage';

function ProfilePage() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading, logout, setLocalAuth } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // Add tab state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && authUser) {
      setUser(authUser);
      setEditForm({
        name: authUser.name || '',
        email: authUser.email || '',
        phone: authUser.phone || '',
        address: authUser.address || '',
        dateOfBirth: authUser.dateOfBirth || ''
      });
      setLoading(false);
    }
    if (!authLoading && !authUser) {
      router.push('/login');
    }
  }, [authLoading, authUser, router]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    try {
      const updatedUser = {
        ...user,
        ...editForm
      };
      // Update localStorage (legacy) and update auth context
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (e) {
          console.warn('Failed to persist user locally', e);
        }
      }

      // Update registered users if exists (legacy)
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userIndex = registeredUsers.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...editForm };
          localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }
      } catch (e) {
        // ignore
      }

      setUser(updatedUser);
      setIsEditing(false);
      // update auth context for immediate UI consistency
      try { setLocalAuth(updatedUser); } catch (e) {}
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui profil. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    // use context logout to clear server session
    try { logout(); } catch (e) {}
    router.push('/login');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center space-x-3">
              {!isEditing && activeTab === 'profile' ? (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profil
                </button>
              ) : isEditing && activeTab === 'profile' ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Batal
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {isEditing && activeTab === 'profile' ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="bg-white/20 text-white placeholder-white/80 border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Nama lengkap"
                    />
                  ) : (
                    user.name || 'Nama belum diisi'
                  )}
                </h1>
                <p className="text-red-100 mt-1">Member sejak {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => { setActiveTab('profile'); setIsEditing(false); }}
                className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'profile'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Profil
              </button>
              <button
                onClick={() => { setActiveTab('settings'); setIsEditing(false); }}
                className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'settings'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Pengaturan
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="px-6 py-8">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="email@example.com"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {user.email || 'Email belum diisi'}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    Nomor Telepon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="081234567890"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {user.phone || 'Nomor telepon belum diisi'}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    Alamat
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Alamat lengkap"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg min-h-[80px]">
                      {user.address || 'Alamat belum diisi'}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    Tanggal Lahir
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editForm.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('id-ID') : 'Tanggal lahir belum diisi'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                {/* Account Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-600" />
                    Keamanan Akun
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">Ganti Password</p>
                          <p className="text-sm text-gray-600">Perbarui password untuk keamanan akun</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
                        Ubah
                      </button>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-red-600" />
                    Privasi
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Profil Publik</p>
                        <p className="text-sm text-gray-600">Tampilkan profil Anda kepada pengguna lain</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-red-600" />
                    Notifikasi
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifikasi</p>
                        <p className="text-sm text-gray-600">Terima notifikasi pesanan melalui email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Notifikasi Promosi</p>
                        <p className="text-sm text-gray-600">Terima info promo dan penawaran terbaru</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Zona Berbahaya</h3>
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900">Hapus Akun</p>
                        <p className="text-sm text-red-700">Tindakan ini tidak dapat dibatalkan</p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
                        Hapus Akun
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
              </div>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/produk"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="font-medium text-gray-900 mb-2">Belanja Sekarang</h3>
            <p className="text-sm text-gray-600">Jelajahi produk telekomunikasi terbaru</p>
          </Link>

          <Link
            href="/orders"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="font-medium text-gray-900 mb-2">Riwayat Pesanan</h3>
            <p className="text-sm text-gray-600">Lihat semua pesanan Anda</p>
          </Link>

          <Link
            href="/cart"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="font-medium text-gray-900 mb-2">Keranjang Belanja</h3>
            <p className="text-sm text-gray-600">Lihat item di keranjang</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProfilePageWrapper() {
  return (
    <ProtectedPage message="mengakses profil">
      <ProfilePage />
    </ProtectedPage>
  );
}

export default ProfilePageWrapper;
