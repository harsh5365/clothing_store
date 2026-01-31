import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '../../../../backend/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [products, orders, reviews, users] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.review.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({ products, orders, reviews, users });
  } catch (error) {
    console.error('Admin stats fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to load stats' },
      { status: 500 }
    );
  }
}
