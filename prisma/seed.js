
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Classic T-Shirt',
        description: 'A comfortable, classic t-shirt.',
        price: 19.99,
      },
      {
        name: 'Slim Fit Jeans',
        description: 'Modern slim fit jeans.',
        price: 49.99,
      },
      {
        name: 'Leather Jacket',
        description: 'A stylish leather jacket.',
        price: 149.99,
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight and comfortable running shoes.',
        price: 79.99,
      },
      {
        name: 'Beanie Hat',
        description: 'A warm and stylish beanie hat.',
        price: 14.99,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
