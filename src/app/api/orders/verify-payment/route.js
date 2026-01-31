import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import crypto from 'crypto';
import prisma from '../../../../backend/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      orderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
        razorpayOrderId,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'signature_failed' },
      });
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayPaymentId,
        razorpaySignature,
        paymentStatus: 'captured',
        status: 'PROCESSING',
      },
    });

    const updated = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: error?.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
