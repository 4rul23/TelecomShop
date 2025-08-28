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

// GET /api/orders - Get user's orders
export async function GET(request) {
  try {
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                image: true,
                brand: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format orders for frontend compatibility
    const formattedOrders = orders.map(order => ({
      id: `ORD-${order.id.toString().padStart(3, '0')}`,
      orderId: order.id,
      date: order.createdAt.toISOString().split('T')[0],
      status: getStatusLabel(order.status),
      total: order.total,
      shippingAddress: order.shippingAddress,
      items: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.image,
        brand: item.product.brand
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: formattedOrders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create new order from cart
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
    const { shippingAddress } = body;

    if (!shippingAddress) {
      return NextResponse.json(
        { success: false, error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Get user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Check stock availability for all items
    for (const cartItem of cartItems) {
      if (cartItem.product.stock < cartItem.quantity) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Insufficient stock for ${cartItem.product.name}. Available: ${cartItem.product.stock}, Required: ${cartItem.quantity}` 
          },
          { status: 400 }
        );
      }
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    // Create order with transaction to ensure data consistency
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          shippingAddress,
          status: 'pending'
        }
      });

      // Create order items and update product stock
      for (const cartItem of cartItems) {
        // Create order item
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: cartItem.product.price
          }
        });

        // Update product stock
        await tx.product.update({
          where: { id: cartItem.productId },
          data: {
            stock: {
              decrement: cartItem.quantity
            }
          }
        });
      }

      // Clear user's cart
      await tx.cartItem.deleteMany({
        where: { userId: user.id }
      });

      // Fetch complete order with items
      const completeOrder = await tx.order.findUnique({
        where: { id: newOrder.id },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  image: true,
                  brand: true
                }
              }
            }
          }
        }
      });

      return completeOrder;
    });

    // Format response
    const formattedOrder = {
      id: `ORD-${order.id.toString().padStart(3, '0')}`,
      orderId: order.id,
      date: order.createdAt.toISOString().split('T')[0],
      status: getStatusLabel(order.status),
      total: order.total,
      shippingAddress: order.shippingAddress,
      items: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.image,
        brand: item.product.brand
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };

    return NextResponse.json({
      success: true,
      data: formattedOrder,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// Helper function to map status to display label
function getStatusLabel(status) {
  const statusMap = {
    'pending': 'Processing',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  
  return statusMap[status] || status;
}