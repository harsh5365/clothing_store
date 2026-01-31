import { NextResponse } from 'next/server';
import { getUniqueCategories } from '@/backend/controllers/productController';

export async function GET() {
  try {
    const categories = await getUniqueCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
