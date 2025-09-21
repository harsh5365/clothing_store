'use client';

import { useGetList } from 'react-admin';
import AdminProvider from '../../../components/admin/AdminProvider';

const AdminDashboard = () => {
  const { data: products, total: productsTotal } = useGetList('products');
  const { data: categories, total: categoriesTotal } = useGetList('categories');

  const activeProducts = products?.filter(p => p.isActive).length || 0;
  const featuredProducts = products?.filter(p => p.isFeatured).length || 0;
  const mainCategories = categories?.filter(c => c.parentId === null).length || 0;
  const subCategories = categories?.filter(c => c.parentId !== null).length || 0;

  const totalStock = products?.reduce((sum, product) => {
    return sum + (product.variants?.reduce((variantSum, variant) => variantSum + variant.stock, 0) || 0);
  }, 0) || 0;

  const totalValue = products?.reduce((sum, product) => {
    const productStock = product.variants?.reduce((variantSum, variant) => variantSum + variant.stock, 0) || 0;
    return sum + (product.costPrice * productStock);
  }, 0) || 0;

  const stats = [
    {
      title: 'Total Products',
      value: productsTotal || 0,
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
        </svg>
      ),
      color: 'primary'
    },
    {
      title: 'Active Products',
      value: activeProducts,
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
      ),
      color: 'success'
    },
    {
      title: 'Featured Products',
      value: featuredProducts,
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      ),
      color: 'warning'
    },
    {
      title: 'Total Stock',
      value: totalStock,
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      ),
      color: 'info'
    },
    {
      title: 'Categories',
      value: categoriesTotal || 0,
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V7h12z"/>
        </svg>
      ),
      color: 'secondary'
    },
    {
      title: 'Inventory Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
        </svg>
      ),
      color: 'success'
    }
  ];

  return (
    <AdminProvider>
      <div className="admin-dashboard">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="h2 mb-3">Dashboard Overview</h1>
            <p className="text-muted">Welcome to your FashionFox admin panel. Here's a quick overview of your store.</p>
          </div>
        </div>

        <div className="row mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-3">
              <div className="glass p-4 rounded-4 hover-lift">
                <div className="d-flex align-items-center">
                  <div className={`me-3 text-${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="h4 mb-1">{stat.value}</h3>
                    <p className="text-muted mb-0">{stat.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="glass p-4 rounded-4">
              <h3 className="h5 mb-3">Quick Actions</h3>
              <div className="d-grid gap-2">
                <a href="/admin/products/create" className="btn btn-primary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  Add New Product
                </a>
                <a href="/admin/categories/create" className="btn btn-outline-primary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  Add New Category
                </a>
                <a href="/admin/products" className="btn btn-outline-secondary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                  Manage Products
                </a>
                <a href="/admin/categories" className="btn btn-outline-secondary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                    <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V7h12z"/>
                  </svg>
                  Manage Categories
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="glass p-4 rounded-4">
              <h3 className="h5 mb-3">Category Breakdown</h3>
              <div className="row">
                <div className="col-6">
                  <div className="text-center">
                    <h4 className="h3 text-primary">{mainCategories}</h4>
                    <p className="text-muted mb-0">Main Categories</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h4 className="h3 text-secondary">{subCategories}</h4>
                    <p className="text-muted mb-0">Sub Categories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminDashboard;
