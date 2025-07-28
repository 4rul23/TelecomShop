# Simulasi Database dengan localStorage

Sistem ini menggunakan kombinasi **localStorage** dan **file data** untuk mensimulasikan database e-commerce yang lengkap.

## 📁 Struktur Database

### 1. **File Data (`src/data/`)**
- `products.js` - Database produk dengan semua informasi
- `localStorage.js` - Utility untuk mengelola localStorage

### 2. **Hooks Database (`src/hooks/useDatabase.js`)**
- `useCart()` - Mengelola keranjang belanja
- `useWishlist()` - Mengelola wishlist
- `useAuth()` - Mengelola autentikasi user
- `useOrders()` - Mengelola pesanan
- `useProducts()` - Mengelola produk dengan sinkronisasi localStorage

## 🛒 Fitur yang Tersedia

### **Cart Management**
```javascript
const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getTotal, getItemCount } = useCart();

// Tambah produk ke cart
addToCart(product, quantity);

// Update quantity
updateQuantity(productId, newQuantity);

// Hapus dari cart
removeFromCart(productId);

// Get total harga
const total = getTotal();

// Get jumlah item
const itemCount = getItemCount();
```

### **Wishlist Management**
```javascript
const { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist } = useWishlist();

// Toggle wishlist
toggleWishlist(product);

// Cek apakah ada di wishlist
const isWishlisted = isInWishlist(productId);
```

### **Authentication**
```javascript
const { user, login, logout, isLoggedIn } = useAuth();

// Login user
login({ id: 1, name: "John Doe", email: "john@example.com" });

// Logout
logout();

// Cek status login
const loggedIn = isLoggedIn();
```

### **Orders Management**
```javascript
const { orders, createOrder, getOrderById } = useOrders();

// Buat pesanan baru
const newOrder = createOrder({
  items: cart,
  total: getTotal(),
  customerInfo: { name: "John", address: "Jakarta" }
});
```

## 🗃️ Data yang Disimpan di localStorage

### **Keys yang digunakan:**
- `indri_cart` - Data keranjang belanja
- `indri_wishlist` - Data wishlist
- `indri_user` - Data user yang login
- `indri_orders` - Riwayat pesanan
- `indri_products` - Sinkronisasi data produk

### **Contoh Data Cart:**
```json
[
  {
    "id": "digital-multimeter-dt9205a",
    "name": "Digital Multimeter Professional DT9205A",
    "brand": "MASTECH",
    "price": 450000,
    "image": "/tel.png",
    "quantity": 2,
    "stock": 15,
    "sku": "DMM-DT9205A-PRO"
  }
]
```

### **Contoh Data Wishlist:**
```json
[
  {
    "id": "oscilloscope-digital-100mhz",
    "name": "Oscilloscope Digital 100MHz DSO1102B",
    "brand": "RIGOL",
    "price": 3250000,
    "image": "/tel.png",
    "addedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## 🔧 Cara Penggunaan

### **1. Di Product Detail Page:**
```javascript
import { useCart, useWishlist } from '../../../hooks/useDatabase';

const { addToCart } = useCart();
const { toggleWishlist, isInWishlist } = useWishlist();

// Tambah ke cart
const handleAddToCart = () => {
  addToCart(product, quantity);
};

// Toggle wishlist
const handleWishlistToggle = () => {
  toggleWishlist(product);
};

// Cek status wishlist
const isWishlisted = isInWishlist(product.id);
```

### **2. Di Cart Page:**
```javascript
import { useCart } from '../hooks/useDatabase';

const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

// Update quantity
const handleQuantityChange = (productId, quantity) => {
  updateQuantity(productId, quantity);
};

// Remove item
const handleRemove = (productId) => {
  removeFromCart(productId);
};
```

## 💾 Persistensi Data

- **Data persisten** - Tersimpan di localStorage browser
- **Otomatis sinkronisasi** - Data dari file JavaScript di-sync ke localStorage
- **Real-time updates** - React hooks otomatis update UI saat data berubah
- **Cross-page consistency** - Data konsisten di semua halaman

## 🚀 Keunggulan Sistem Ini

1. **Development Friendly** - Tidak perlu setup database kompleks
2. **Real-time** - Perubahan langsung terlihat di UI
3. **Persistent** - Data tidak hilang saat refresh browser
4. **Scalable** - Mudah ditambahkan fitur baru
5. **Type Safe** - Struktur data yang konsisten
6. **Performance** - Akses data cepat dari localStorage

## 🔄 Migrasi ke Database Real

Ketika siap production, tinggal ganti:
- localStorage calls → API calls
- Local data → Database queries
- Hooks tetap sama, hanya implementasi internal yang berubah

Sistem ini perfect untuk development dan prototype! 🎉
