# Admin Access Instructions

## Cara Akses Admin Dashboard

1. **Register/Login dengan email admin:**
   - Email: `admin@telecomshop.com`
   - Password: `admin123` (atau password apapun)

2. **Atau register dengan email yang mengandung "admin":**
   - Contoh: `johnadmin@gmail.com`
   - Password: bebas

3. **Setelah login, akan muncul menu "Admin Dashboard" di:**
   - Desktop: User dropdown menu di kanan atas
   - Mobile: Menu hamburger

## Fitur Admin Dashboard

### 📊 Overview Tab
- Statistik total produk, pesanan, pengguna, revenue
- Tabel pesanan terbaru
- Cards dengan icon dan angka

### 📦 Products Tab
- Lihat semua produk dengan search dan filter
- Tambah produk baru dengan form lengkap
- Edit produk existing
- Hapus produk
- Upload gambar (URL)
- Kategori: Kabel, Router, Switch, Access Point, dll

### 🛒 Orders Tab
- Lihat semua pesanan dengan search dan filter status
- Update status pesanan (Processing, Shipped, Delivered, Cancelled)
- Detail pelanggan dan total
- Sortir berdasarkan tanggal

### 👥 Users Tab
- Lihat semua pengguna terdaftar
- Search berdasarkan nama/email
- Info registrasi dan status

### ⚙️ Settings Tab
- Pengaturan toko (nama, email kontak)
- Pengaturan pengiriman (biaya, estimasi)
- Konfigurasi sistem

## Data Management
- Semua data disimpan di localStorage
- Products auto-load dari data/products.jsx
- Orders dan Users sync dengan sistem utama
- Real-time updates

## Security
- Hanya user dengan email admin yang bisa akses
- Auto-redirect ke login jika tidak ada akses
- Protected routes
