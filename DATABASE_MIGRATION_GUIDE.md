# Database Migration Guide - TelecomShop

## Overview
This guide will help you migrate your cart system and products from localStorage/JSON files to a Prisma + Neon database setup.

## Prerequisites

1. **Neon Database Setup**
   - Make sure you have a Neon database instance running
   - Ensure you have the `DATABASE_URL` environment variable set

2. **Environment Variables**
   Create a `.env` file in your project root with:
   ```env
   DATABASE_URL=\"your-neon-database-url\"
   ```

## Migration Steps

### Step 1: Database Schema Migration

1. **Generate Prisma Client and Run Migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Verify Database Schema**
   ```bash
   npx prisma studio
   ```
   This will open Prisma Studio where you can view your database tables.

### Step 2: Seed Products Data

1. **Run the Migration Script**
   ```bash
   node scripts/migrate-products-to-prisma.js
   ```

   This will:
   - Create all categories from your `CATEGORIES` array
   - Migrate all 40 products from `src/data/products.js` to the database
   - Show progress and statistics

2. **Verify Data Migration**
   Check Prisma Studio or run:
   ```bash
   npx prisma studio
   ```
   You should see:
   - 9 categories in the `Category` table
   - 40 products in the `Product` table

### Step 3: Test API Endpoints

#### Products API

1. **Get All Products**
   ```bash
   curl http://localhost:3000/api/products
   ```

2. **Search Products**
   ```bash
   curl \"http://localhost:3000/api/products?search=router&category=networking\"
   ```

3. **Get Single Product**
   ```bash
   curl http://localhost:3000/api/products/1
   ```

#### Categories API

1. **Get All Categories**
   ```bash
   curl http://localhost:3000/api/categories
   ```

#### Cart API (Requires Authentication)

1. **First, you need to login and get an auth token**
   - Go to your login page and login with a valid user
   - The auth token will be stored in localStorage

2. **Get Cart Items**
   ```bash
   curl -H \"Authorization: Bearer YOUR_AUTH_TOKEN\" http://localhost:3000/api/cart
   ```

3. **Add to Cart**
   ```bash
   curl -X POST -H \"Content-Type: application/json\" -H \"Authorization: Bearer YOUR_AUTH_TOKEN\" \\n        -d '{\"productId\": 1, \"quantity\": 2}' \\n        http://localhost:3000/api/cart
   ```

### Step 4: Test Frontend Integration

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Cart Functionality**
   - Login to your account
   - Navigate to `/produk` to view products
   - Add products to cart
   - Navigate to `/cart` to view cart
   - Update quantities
   - Remove items
   - Clear cart

3. **Test Error Handling**
   - Try using cart functionality while logged out
   - Test with network disconnected (should fallback to localStorage)
   - Test error messages and retry functionality

### Step 5: Test Order Creation

1. **Create Order from Cart**
   - Add items to cart
   - Go to checkout page
   - Fill shipping address
   - Submit order

2. **View Orders**
   - Navigate to `/orders` to see order history
   - Orders should be loaded from database

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify `DATABASE_URL` in `.env` file
   - Ensure Neon database is accessible
   - Check network connectivity

2. **Prisma Schema Errors**
   ```bash
   npx prisma generate
   npx prisma db push --force-reset  # Use with caution - resets data
   ```

3. **Migration Script Errors**
   - Check if categories are created first
   - Verify product data format
   - Check console for specific error messages

4. **API Authentication Errors**
   - Ensure user is logged in
   - Check if auth token is valid
   - Verify session hasn't expired

### Fallback Behavior

The system is designed with fallback behavior:
- If API calls fail, cart operations fall back to localStorage
- If user is not authenticated, localStorage is used
- Error messages are displayed with retry options

## Database Schema Overview

### Tables Created

1. **User** - Existing user accounts
2. **Session** - User authentication sessions
3. **Category** - Product categories
4. **Product** - All product information
5. **CartItem** - User cart items (linked to users)
6. **WishlistItem** - User wishlist items
7. **Order** - Customer orders
8. **OrderItem** - Individual items in orders

### Key Relationships

- Products belong to Categories
- CartItems link Users to Products
- Orders belong to Users
- OrderItems link Orders to Products

## Performance Considerations

1. **Database Indexing**
   - Indexes on frequently queried fields (userId, productId, slug)
   - Category-based filtering optimized

2. **API Optimization**
   - Pagination for product listings
   - Efficient cart loading with joins
   - Transaction safety for order creation

3. **Frontend Optimization**
   - Loading states for better UX
   - Error handling with retry mechanisms
   - Optimistic updates where appropriate

## Security Features

1. **Authentication Required**
   - Cart operations require valid auth token
   - Session-based authentication

2. **Data Validation**
   - Input validation on all API endpoints
   - Stock checking before adding to cart
   - Unique constraints on critical fields

3. **Error Handling**
   - Graceful degradation to localStorage
   - No sensitive data exposure in errors

## Next Steps

1. **Implement Wishlist API** (currently uses localStorage)
2. **Add Product Search Optimization** (full-text search)
3. **Implement Order Status Updates**
4. **Add Inventory Management**
5. **Implement Real-time Stock Updates**

## Testing Checklist

- [ ] Database connection established
- [ ] Products migrated successfully
- [ ] Categories created
- [ ] Product API endpoints working
- [ ] Cart API endpoints working
- [ ] Frontend cart functionality working
- [ ] Order creation working
- [ ] Error handling working
- [ ] Fallback to localStorage working
- [ ] Authentication integration working

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify database connectivity
3. Ensure all environment variables are set
4. Check that Prisma client is generated
5. Review the API endpoint responses

The migration maintains backward compatibility, so your existing functionality should continue working while gaining the benefits of a proper database backend.
