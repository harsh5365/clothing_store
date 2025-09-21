// Categories data structure
export const categories = [
  {
    id: 1,
    name: 'Men',
    slug: 'men',
    parentId: null,
    description: 'Men\'s clothing and accessories',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Women',
    slug: 'women',
    parentId: null,
    description: 'Women\'s clothing and accessories',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Men's subcategories
  {
    id: 3,
    name: 'T-Shirts',
    slug: 'men-t-shirts',
    parentId: 1,
    description: 'Men\'s t-shirts and casual tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Jeans',
    slug: 'men-jeans',
    parentId: 1,
    description: 'Men\'s jeans and denim',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Jackets',
    slug: 'men-jackets',
    parentId: 1,
    description: 'Men\'s jackets and outerwear',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Shoes',
    slug: 'men-shoes',
    parentId: 1,
    description: 'Men\'s footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Women's subcategories
  {
    id: 7,
    name: 'Dresses',
    slug: 'women-dresses',
    parentId: 2,
    description: 'Women\'s dresses and gowns',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Tops',
    slug: 'women-tops',
    parentId: 2,
    description: 'Women\'s tops and blouses',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 9,
    name: 'Pants',
    slug: 'women-pants',
    parentId: 2,
    description: 'Women\'s pants and trousers',
    image: 'https://images.unsplash.com/photo-1506629905607-1b1b1b1b1b1b?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 10,
    name: 'Shoes',
    slug: 'women-shoes',
    parentId: 2,
    description: 'Women\'s footwear',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&crop=center',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper functions
export const getMainCategories = () => categories.filter(cat => cat.parentId === null);
export const getSubCategories = (parentId) => categories.filter(cat => cat.parentId === parentId);
export const getCategoryById = (id) => categories.find(cat => cat.id === id);
export const getCategoryBySlug = (slug) => categories.find(cat => cat.slug === slug);
