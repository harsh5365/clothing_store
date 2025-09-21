import { categories } from './categories';

// Enhanced products data structure
export const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    slug: "classic-white-t-shirt",
    description: "Premium cotton blend t-shirt with a comfortable fit. Perfect for casual wear and everyday comfort.",
    price: 29.99,
    comparePrice: 39.99,
    costPrice: 15.00,
    sku: "TSH-WHT-001",
    barcode: "1234567890123",
    categoryId: 3, // Men's T-Shirts
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop&crop=center"
    ],
    variants: [
      { size: 'S', color: 'White', stock: 50, sku: 'TSH-WHT-S' },
      { size: 'M', color: 'White', stock: 75, sku: 'TSH-WHT-M' },
      { size: 'L', color: 'White', stock: 60, sku: 'TSH-WHT-L' },
      { size: 'XL', color: 'White', stock: 40, sku: 'TSH-WHT-XL' }
    ],
    tags: ['casual', 'cotton', 'basic', 'white'],
    isActive: true,
    isFeatured: true,
    weight: 0.2,
    dimensions: { length: 70, width: 50, height: 1 },
    seoTitle: "Classic White T-Shirt - Premium Cotton",
    seoDescription: "Shop our premium classic white t-shirt made from high-quality cotton blend. Comfortable fit for everyday wear.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Denim Jacket",
    slug: "denim-jacket",
    description: "Classic blue denim jacket with vintage wash. Perfect for layering and adding style to any outfit.",
    price: 89.99,
    comparePrice: 120.00,
    costPrice: 45.00,
    sku: "JKT-DNM-001",
    barcode: "1234567890124",
    categoryId: 5, // Men's Jackets
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
    ],
    variants: [
      { size: 'S', color: 'Blue', stock: 25, sku: 'JKT-DNM-S' },
      { size: 'M', color: 'Blue', stock: 35, sku: 'JKT-DNM-M' },
      { size: 'L', color: 'Blue', stock: 30, sku: 'JKT-DNM-L' },
      { size: 'XL', color: 'Blue', stock: 20, sku: 'JKT-DNM-XL' }
    ],
    tags: ['denim', 'jacket', 'vintage', 'blue'],
    isActive: true,
    isFeatured: true,
    weight: 0.8,
    dimensions: { length: 75, width: 60, height: 3 },
    seoTitle: "Classic Denim Jacket - Vintage Blue",
    seoDescription: "Classic blue denim jacket with vintage wash. Perfect for layering and adding style to any outfit.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Black Hoodie",
    slug: "black-hoodie",
    description: "Cozy fleece hoodie perfect for casual wear. Features a comfortable fit and soft interior lining.",
    price: 59.99,
    comparePrice: 79.99,
    costPrice: 30.00,
    sku: "HDI-BLK-001",
    barcode: "1234567890125",
    categoryId: 3, // Men's T-Shirts (hoodies under tops)
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center"
    ],
    variants: [
      { size: 'S', color: 'Black', stock: 40, sku: 'HDI-BLK-S' },
      { size: 'M', color: 'Black', stock: 55, sku: 'HDI-BLK-M' },
      { size: 'L', color: 'Black', stock: 45, sku: 'HDI-BLK-L' },
      { size: 'XL', color: 'Black', stock: 35, sku: 'HDI-BLK-XL' }
    ],
    tags: ['hoodie', 'fleece', 'casual', 'black'],
    isActive: true,
    isFeatured: false,
    weight: 0.6,
    dimensions: { length: 75, width: 55, height: 2 },
    seoTitle: "Black Fleece Hoodie - Cozy Casual Wear",
    seoDescription: "Cozy black fleece hoodie perfect for casual wear. Features comfortable fit and soft interior lining.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Slim Fit Jeans",
    slug: "slim-fit-jeans",
    description: "Modern slim fit jeans with stretch comfort. Perfect for both casual and semi-formal occasions.",
    price: 79.99,
    comparePrice: 99.99,
    costPrice: 40.00,
    sku: "JNS-SLM-001",
    barcode: "1234567890126",
    categoryId: 4, // Men's Jeans
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop&crop=center"
    ],
    variants: [
      { size: '30', color: 'Blue', stock: 20, sku: 'JNS-SLM-30' },
      { size: '32', color: 'Blue', stock: 30, sku: 'JNS-SLM-32' },
      { size: '34', color: 'Blue', stock: 35, sku: 'JNS-SLM-34' },
      { size: '36', color: 'Blue', stock: 25, sku: 'JNS-SLM-36' }
    ],
    tags: ['jeans', 'slim-fit', 'stretch', 'blue'],
    isActive: true,
    isFeatured: true,
    weight: 0.7,
    dimensions: { length: 110, width: 40, height: 2 },
    seoTitle: "Slim Fit Jeans - Modern Stretch Comfort",
    seoDescription: "Modern slim fit jeans with stretch comfort. Perfect for both casual and semi-formal occasions.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Summer Dress",
    slug: "summer-dress",
    description: "Light and breezy summer dress with floral pattern. Perfect for warm weather and casual outings.",
    price: 69.99,
    comparePrice: 89.99,
    costPrice: 35.00,
    sku: "DRS-SUM-001",
    barcode: "1234567890127",
    categoryId: 7, // Women's Dresses
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center"
    ],
    variants: [
      { size: 'XS', color: 'Floral', stock: 15, sku: 'DRS-SUM-XS' },
      { size: 'S', color: 'Floral', stock: 25, sku: 'DRS-SUM-S' },
      { size: 'M', color: 'Floral', stock: 30, sku: 'DRS-SUM-M' },
      { size: 'L', color: 'Floral', stock: 20, sku: 'DRS-SUM-L' }
    ],
    tags: ['dress', 'summer', 'floral', 'casual'],
    isActive: true,
    isFeatured: true,
    weight: 0.3,
    dimensions: { length: 100, width: 45, height: 1 },
    seoTitle: "Summer Floral Dress - Light and Breezy",
    seoDescription: "Light and breezy summer dress with floral pattern. Perfect for warm weather and casual outings.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "Leather Sneakers",
    slug: "leather-sneakers",
    description: "Premium leather sneakers with modern design. Comfortable and stylish for everyday wear.",
    price: 129.99,
    comparePrice: 159.99,
    costPrice: 65.00,
    sku: "SNK-LTH-001",
    barcode: "1234567890128",
    categoryId: 6, // Men's Shoes
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center"
    ],
    variants: [
      { size: '8', color: 'White', stock: 20, sku: 'SNK-LTH-8' },
      { size: '9', color: 'White', stock: 25, sku: 'SNK-LTH-9' },
      { size: '10', color: 'White', stock: 30, sku: 'SNK-LTH-10' },
      { size: '11', color: 'White', stock: 20, sku: 'SNK-LTH-11' }
    ],
    tags: ['sneakers', 'leather', 'white', 'casual'],
    isActive: true,
    isFeatured: false,
    weight: 0.8,
    dimensions: { length: 30, width: 20, height: 10 },
    seoTitle: "Premium Leather Sneakers - Modern Design",
    seoDescription: "Premium leather sneakers with modern design. Comfortable and stylish for everyday wear.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper functions
export const getProductsByCategory = (categoryId) => products.filter(product => product.categoryId === categoryId);
export const getProductById = (id) => products.find(product => product.id === id);
export const getProductBySlug = (slug) => products.find(product => product.slug === slug);
export const getFeaturedProducts = () => products.filter(product => product.isFeatured);
export const getActiveProducts = () => products.filter(product => product.isActive);
