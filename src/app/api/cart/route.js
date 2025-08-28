import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prismaClient';

// Helper function to get user from session token
async function getUserFromToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session || (session.expiresAt && session.expiresAt < new Date())) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
}

// GET /api/cart - Get user's cart items
export async function GET(request) {
  try {
    const user = await getUserFromToken(request);
    
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
    const user = await getUserFromToken(request);
    
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

    // Format response
    const formattedCartItem = {
      id: cartItem.product.id,
      name: cartItem.product.name,
      slug: cartItem.product.slug,
      price: cartItem.product.price,
      originalPrice: cartItem.product.originalPrice,
      image: cartItem.product.image,
      brand: cartItem.product.brand,
      category: cartItem.product.category.name,
      stock: cartItem.product.stock,
      quantity: cartItem.quantity,
      cartItemId: cartItem.id
    };

    return NextResponse.json({
      success: true,
      data: formattedCartItem,
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
    const user = await getUserFromToken(request);
    
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

      return NextResponse.json({
        success: true,
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

    // Format response
    const formattedCartItem = {
      id: updatedCartItem.product.id,
      name: updatedCartItem.product.name,
      slug: updatedCartItem.product.slug,
      price: updatedCartItem.product.price,
      originalPrice: updatedCartItem.product.originalPrice,
      image: updatedCartItem.product.image,
      brand: updatedCartItem.product.brand,
      category: updatedCartItem.product.category.name,
      stock: updatedCartItem.product.stock,
      quantity: updatedCartItem.quantity,
      cartItemId: updatedCartItem.id
    };

    return NextResponse.json({
      success: true,
      data: formattedCartItem,
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
    const user = await getUserFromToken(request);
    
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

    return NextResponse.json({
      success: true,
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