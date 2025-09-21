
import prisma from '../lib/prisma';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error(`Error getting products: ${error.message}`);
  }
}
