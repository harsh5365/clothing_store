import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Razorpay from 'razorpay';
import prisma from '../../../../backend/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' },
        { status: 500 }
      );
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
        status: 'PENDING',
        razorpayOrderId: null,
      },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found or already paid' }, { status: 404 });
    }

    const amountPaise = Math.round(order.total * 100);
    if (amountPaise < 1) {
      return NextResponse.json({ error: 'Invalid order amount' }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: order.orderNumber,
      notes: { our_order_id: order.id },
    });

    await prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: 'created',
      },
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: amountPaise,
      currency: 'INR',
      keyId,
    });
  } catch (error) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
