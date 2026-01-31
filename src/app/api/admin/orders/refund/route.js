import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Razorpay from 'razorpay';
import prisma from '../../../../../backend/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay is not configured' },
        { status: 500 }
      );
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (order.status !== 'CANCELLED') {
      return NextResponse.json(
        { error: 'Only cancelled orders can be refunded' },
        { status: 400 }
      );
    }
    if (!order.razorpayPaymentId) {
      return NextResponse.json(
        { error: 'No Razorpay payment linked to this order' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: keySecret,
    });

    const paymentId = order.razorpayPaymentId.trim();

    // Fetch payment to get captured amount (in paise) and validate payment exists
    const payment = await razorpay.payments.fetch(paymentId);
    const amountPaise = payment.amount;

    if (typeof amountPaise !== 'number' || amountPaise < 100) {
      return NextResponse.json(
        { error: 'Invalid or zero payment amount; cannot refund' },
        { status: 400 }
      );
    }

    const amountInteger = Math.round(Number(amountPaise));
    const currency = payment.currency || 'INR';

    // Skip if payment already fully refunded (avoids Razorpay "invalid request" on double refund)
    const existingRefunds = await razorpay.payments.fetchMultipleRefund(paymentId, { count: 100 });
    const refundItems = Array.isArray(existingRefunds) ? existingRefunds : (existingRefunds?.items ?? []);
    const refundedTotal = refundItems.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
    if (refundedTotal >= amountInteger) {
      return NextResponse.json(
        { error: 'This payment has already been fully refunded.' },
        { status: 400 }
      );
    }

    // Razorpay refund only works for captured payments. If still authorized, capture first.
    if (payment.status !== 'captured') {
      if (payment.status === 'authorized') {
        await razorpay.payments.capture(paymentId, amountInteger, currency);
      } else {
        return NextResponse.json(
          { error: `Payment cannot be refunded (status: ${payment.status}). Only captured or authorized payments are refundable.` },
          { status: 400 }
        );
      }
    }

    const refundPayload = { amount: amountInteger };

    // Call Razorpay refund API directly (bypass SDK to control exact request format)
    const keyId = process.env.RAZORPAY_KEY_ID;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const refundRes = await fetch(
      `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(refundPayload),
      }
    );
    const refundBody = await refundRes.json().catch(() => ({}));

    if (!refundRes.ok) {
      const errDesc = refundBody?.error?.description || refundRes.statusText;
      const isGenericInvalid = errDesc === 'invalid request sent';
      const manualRefundUrl = `https://dashboard.razorpay.com/app/payments/${paymentId}`;
      return NextResponse.json(
        {
          error: isGenericInvalid
            ? 'Razorpay could not process this refund automatically. Please refund from Razorpay Dashboard (link below).'
            : (errDesc || 'Refund failed'),
          manualRefundUrl: isGenericInvalid ? manualRefundUrl : undefined,
        },
        { status: refundRes.status >= 400 ? refundRes.status : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      refundId: refundBody.id,
      amount: refundBody.amount,
      status: refundBody.status,
    });
  } catch (error) {
    const msg =
      error?.error?.description ||
      error?.description ||
      error?.message ||
      'Refund failed';
    const status = error?.statusCode === 400 ? 400 : 500;
    console.error('Refund error:', error);
    return NextResponse.json(
      { error: msg },
      { status }
    );
  }
}
