import prisma from '../lib/prisma';

const parseId = (id) => (typeof id === 'string' ? parseInt(id, 10) : id);

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error(`Error getting products: ${error.message}`);
  }
}

export async function getProductById(id) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseId(id) },
    });
    return product;
  } catch (error) {
    throw new Error(`Error getting product: ${error.message}`);
  }
}

export async function createProduct(data) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        price: Number(data.price),
        image: data.image ?? null,
        category: data.category ?? null,
        stock: data.stock != null ? Number(data.stock) : 0,
      },
    });
    return product;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
}

export async function updateProduct(id, data) {
  try {
    const product = await prisma.product.update({
      where: { id: parseId(id) },
      data: {
        ...(data.name != null && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.price != null && { price: Number(data.price) }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.stock != null && { stock: Number(data.stock) }),
      },
    });
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
}

export async function deleteProduct(id) {
  try {
    await prisma.product.delete({
      where: { id: parseId(id) },
    });
    return { id: parseId(id) };
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
}

export async function getUniqueCategories() {
  try {
    const products = await prisma.product.findMany({
      select: { category: true },
      where: { category: { not: null } },
    });
    const names = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();
    return names.map((name, i) => ({ id: name, name }));
  } catch (error) {
    throw new Error(`Error getting categories: ${error.message}`);
  }
}
