'use client';

import { useState } from 'react';
import { Save, Shield, Bell, Palette, Database, Download, Upload, Trash2 } from 'lucide-react';

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    siteName: 'TelecomShop',
    adminEmail: 'admin@telecomshop.com',
    allowRegistration: true,
    enableNotifications: true,
    theme: 'light',
    currency: 'IDR'
  });

  const [backupStatus, setBackupStatus] = useState('');

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      alert('Pengaturan berhasil disimpan!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Terjadi kesalahan saat menyimpan pengaturan.');
    }
  };

  const exportData = () => {
    try {
      const data = {
        products: JSON.parse(localStorage.getItem('products') || '[]'),
        orders: JSON.parse(localStorage.getItem('orders') || '[]'),
        users: JSON.parse(localStorage.getItem('users') || '[]'),
        settings: JSON.parse(localStorage.getItem('siteSettings') || '{}'),
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `telecomshop-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setBackupStatus('Data berhasil diekspor!');
      setTimeout(() => setBackupStatus(''), 3000);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Terjadi kesalahan saat mengekspor data.');
    }
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (confirm('Apakah Anda yakin ingin mengimpor data? Ini akan mengganti semua data yang ada.')) {
          localStorage.setItem('products', JSON.stringify(data.products || []));
          localStorage.setItem('orders', JSON.stringify(data.orders || []));
          localStorage.setItem('users', JSON.stringify(data.users || []));
          localStorage.setItem('siteSettings', JSON.stringify(data.settings || {}));

          setBackupStatus('Data berhasil diimpor! Silakan refresh halaman.');
          setTimeout(() => window.location.reload(), 2000);
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Terjadi kesalahan saat mengimpor data. Pastikan file backup valid.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('PERINGATAN: Ini akan menghapus SEMUA data (produk, pesanan, pengguna). Apakah Anda yakin?')) {
      if (confirm('Konfirmasi sekali lagi: Semua data akan dihapus permanen!')) {
        localStorage.removeItem('products');
        localStorage.removeItem('orders');
        localStorage.removeItem('users');
        localStorage.removeItem('cart');
        localStorage.removeItem('siteSettings');

        alert('Semua data telah dihapus. Halaman akan dimuat ulang.');
        setTimeout(() => window.location.reload(), 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h2>

      {/* Site Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Palette className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Pengaturan Situs</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Situs
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Admin
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mata Uang
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="IDR">IDR (Rupiah)</option>
              <option value="USD">USD (Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowRegistration"
              checked={settings.allowRegistration}
              onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
              className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="allowRegistration" className="ml-2 text-sm text-gray-700">
              Izinkan pendaftaran pengguna baru
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableNotifications"
              checked={settings.enableNotifications}
              onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
              className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="enableNotifications" className="ml-2 text-sm text-gray-700">
              Aktifkan notifikasi email
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveSettings}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Simpan Pengaturan
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Database className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Manajemen Data</h3>
        </div>

        {backupStatus && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {backupStatus}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Ekspor Data</h4>
            <p className="text-sm text-gray-600 mb-3">
              Unduh semua data sebagai file backup JSON
            </p>
            <button
              onClick={exportData}
              className="flex items-center w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Ekspor Data
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Impor Data</h4>
            <p className="text-sm text-gray-600 mb-3">
              Unggah file backup untuk mengembalikan data
            </p>
            <label className="flex items-center w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Impor Data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>

          <div className="border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">Hapus Semua Data</h4>
            <p className="text-sm text-red-600 mb-3">
              Hapus semua data dari sistem (tidak dapat dibatalkan)
            </p>
            <button
              onClick={clearAllData}
              className="flex items-center w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus Semua
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Shield className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Informasi Sistem</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Versi:</span>
            <span className="ml-2 text-gray-600">1.0.0</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Database:</span>
            <span className="ml-2 text-gray-600">LocalStorage</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Framework:</span>
            <span className="ml-2 text-gray-600">Next.js 15</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Terakhir Update:</span>
            <span className="ml-2 text-gray-600">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
