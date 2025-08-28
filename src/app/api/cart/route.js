import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prismaClient';
import fs from 'fs';
import path from 'path';
import os from 'os';

// File paths for fallback auth
const CURRENT_USER_FILE = path.join(process.cwd(), 'src/data/currentUser.json');
const TMP_CURRENT_USER_FILE = path.join(os.tmpdir(), 'telecom_current_user.json');

// In-memory fallback
let memoryCurrentUser = null;

// Helper function to read current user from file (fallback auth)
function readCurrentUser() {
  try {
    if (fs.existsSync(CURRENT_USER_FILE)) {
      const data = fs.readFileSync(CURRENT_USER_FILE, 'utf8');
      return JSON.parse(data);
    }

    if (fs.existsSync(TMP_CURRENT_USER_FILE)) {
      const data = fs.readFileSync(TMP_CURRENT_USER_FILE, 'utf8');
      return JSON.parse(data);
    }

    return memoryCurrentUser;
  } catch (error) {
    console.error('Error reading current user file:', error);
    return null;
  }
}

// Helper function to get user from session cookie (compatible with existing auth system)
async function getUserFromRequest(request) {
  try {
    // First, try database session authentication
    const token = request.cookies.get('session_token')?.value;

    if (token && prisma) {
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true }
      });

      if (session && (!session.expiresAt || session.expiresAt > new Date())) {
        return session.user;
      }
    }

    // Fallback to file-based auth (for existing logged-in users)
    const currentUser = readCurrentUser();
    if (currentUser && currentUser.id) {
      // If we have a file-based user, try to find them in the database
      if (prisma) {
        const dbUser = await prisma.user.findUnique({
          where: { id: currentUser.id }
        });
        if (dbUser) {
          return dbUser;
        }
      }

      // Return file-based user as fallback
      return currentUser;
    }

    return null;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

// GET /api/cart - Get user's cart items
export async function GET(request) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format cart items for frontend compatibility
    const formattedCartItems = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
      brand: item.product.brand,
      category: item.product.category.name,
      stock: item.product.stock,
      quantity: item.quantity,
      cartItemId: item.id
    }));

    return NextResponse.json({
      success: true,
      data: formattedCartItems
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(request) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check if product exists and has sufficient stock
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: parseInt(productId)
        }
      }
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity if item already exists
      const newQuantity = existingCartItem.quantity + quantity;

      if (product.stock < newQuantity) {
        return NextResponse.json(
          { success: false, error: 'Insufficient stock for requested quantity' },
          { status: 400 }
        );
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
        include: {
          product: {
            include: {
              category: {
                select: {
                  name: true,
                  slug: true
                }
              }
            }
          }
        }
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: user.id,
          productId: parseInt(productId),
          quantity
        },
        include: {
          product: {
            include: {
              category: {
                select: {
                  name: true,
                  slug: true
                }
              }
            }
          }
        }
      });
    }

    // Get updated cart after adding item
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format cart items for frontend compatibility
    const formattedCartItems = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
      brand: item.product.brand,
      category: item.product.category.name,
      stock: item.product.stock,
      quantity: item.quantity,
      cartItemId: item.id
    }));

    return NextResponse.json({
      success: true,
      data: formattedCartItems,
      message: 'Item added to cart successfully'
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }

    if (quantity < 0) {
      return NextResponse.json(
        { success: false, error: 'Quantity cannot be negative' },
        { status: 400 }
      );
    }

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: parseInt(productId)
        }
      },
      include: { product: true }
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // If quantity is 0, remove the item
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: { id: cartItem.id }
      });

      // Get updated cart after removing item
      const cartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
        include: {
          product: {
            include: {
              category: {
                select: {
                  name: true,
                  slug: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Format cart items for frontend compatibility
      const formattedCartItems = cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        originalPrice: item.product.originalPrice,
        image: item.product.image,
        brand: item.product.brand,
        category: item.product.category.name,
        stock: item.product.stock,
        quantity: item.quantity,
        cartItemId: item.id
      }));

      return NextResponse.json({
        success: true,
        data: formattedCartItems,
        message: 'Item removed from cart'
      });
    }

    // Check stock availability
    if (cartItem.product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Update quantity
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      }
    });

    // Get updated cart after updating quantity
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format cart items for frontend compatibility
    const formattedCartItems = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
      brand: item.product.brand,
      category: item.product.category.name,
      stock: item.product.stock,
      quantity: item.quantity,
      cartItemId: item.id
    }));

    return NextResponse.json({
      success: true,
      data: formattedCartItems,
      message: 'Cart updated successfully'
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Remove item from cart or clear entire cart
export async function DELETE(request) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (clearAll) {
      // Clear entire cart
      await prisma.cartItem.deleteMany({
        where: { userId: user.id }
      });

      return NextResponse.json({
        success: true,
        data: [],
        message: 'Cart cleared successfully'
      });
    }

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Remove specific item from cart
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: parseInt(productId)
        }
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: cartItem.id }
    });

    // Get updated cart after removing item
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format cart items for frontend compatibility
    const formattedCartItems = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      originalPrice: item.product.originalPrice,
      image: item.product.image,
      brand: item.product.brand,
      category: item.product.category.name,
      stock: item.product.stock,
      quantity: item.quantity,
      cartItemId: item.id
    }));

    return NextResponse.json({
      success: true,
      data: formattedCartItems,
      message: 'Item removed from cart successfully'
    });

  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
