import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../backend/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
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
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const order = await prisma.order.findFirst({
        where: {
          id,
          userId: session.user.id
        },
        include: {
          items: true
        }
      });
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
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

const CUSTOMER_CANCELABLE_STATUSES = ['PENDING', 'PROCESSING'];

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'id and status are required' },
        { status: 400 }
      );
    }

    if (status !== 'CANCELLED') {
      return NextResponse.json(
        { error: 'Customers can only cancel orders (status: CANCELLED)' },
        { status: 400 }
      );
    }

    const existing = await prisma.order.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (!CUSTOMER_CANCELABLE_STATUSES.includes(existing.status)) {
      return NextResponse.json(
        { error: `Order cannot be cancelled. Current status: ${existing.status}. Only PENDING or PROCESSING orders can be cancelled.` },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    console.error('Order cancel error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to cancel order' },
      { status: 500 }
    );
  }
}
