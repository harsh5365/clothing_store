
import { NextResponse } from 'next/server';
import { getProducts } from '@/controllers/productController';

export async function GET(request) {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
