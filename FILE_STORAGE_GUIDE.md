# File-Based Storage Implementation

## Overview
Sistem penyimpanan data user telah diubah dari localStorage ke file-based storage untuk persistensi data yang lebih baik.

## Struktur File

### Data Files
- `src/data/users.json` - Menyimpan semua user yang terdaftar
- `src/data/currentUser.json` - Menyimpan data user yang sedang login

### API Routes
- `src/app/api/users/route.js` - CRUD operations untuk user management
- `src/app/api/auth/route.js` - Authentication (login/logout/current user)

### Hooks & Context
- `src/hooks/useFileDatabase.js` - Hook untuk berkomunikasi dengan API
- `src/contexts/AuthContext.jsx` - Updated untuk menggunakan file-based system

## API Endpoints

### User Management (`/api/users`)
- **GET** - Mendapatkan semua user (tanpa password)
- **POST** - Membuat user baru (registrasi)
- **PUT** - Update data user
- **DELETE** - Hapus user

### Authentication (`/api/auth`)
- **POST** - Login user
- **GET** - Mendapatkan current user yang sedang login
- **DELETE** - Logout (clear current user)

## Format Data User

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "08123456789",
  "address": "",
  "dateRegistered": "2025-08-06T04:39:41.678Z",
  "role": "customer"
}
```

## Keunggulan Sistem Baru

### ✅ Kelebihan
- **Persistent Data** - Data tidak hilang saat browser di-refresh/clear
- **Server-side Storage** - Data tersimpan di server, bukan browser
- **API-based** - Mudah diintegrasikan dengan sistem lain
- **Structured** - Data terorganisir dalam format JSON
- **Scalable** - Mudah diupgrade ke database sesungguhnya

### ⚠️ Catatan Penting
- Password masih dalam plain text (untuk production harus di-hash)
- File storage cocok untuk development/demo
- Untuk production sebaiknya migrasi ke database (PostgreSQL/MySQL/MongoDB)

## Cara Penggunaan

### Registrasi User Baru
```javascript
const { register } = useAuth();
const result = await register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  phone: "08123456789"
});
```

### Login User
```javascript
const { login } = useAuth();
const result = await login("john@example.com", "password123");
```

### Logout User
```javascript
const { logout } = useAuth();
await logout();
```

## Testing
Sistem telah ditest menggunakan API calls:
- ✅ User registration working
- ✅ User login working
- ✅ Current user session working
- ✅ Data persistence in JSON files working

## Next Steps
1. Update halaman login/register untuk menggunakan sistem baru
2. Test end-to-end flow melalui UI
3. Add error handling dan validation
4. Consider migration path ke database untuk production
