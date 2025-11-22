import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../backend/lib/prisma';

export async function POST(request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    
    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        subtotal: data.subtotal,
        shipping: data.shipping,
        tax: data.tax,
        total: data.total,
        shippingName: data.shippingName,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingState: data.shippingState,
        shippingZip: data.shippingZip,
        shippingPhone: data.shippingPhone,
        paymentMethod: data.paymentMethod,
        status: 'PENDING',
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
