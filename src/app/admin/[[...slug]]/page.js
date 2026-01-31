'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Resource, ShowGuesser } from 'react-admin';
import AdminProvider from '../../../components/admin/AdminProvider';
import ProductList from '../../../components/admin/ProductList';
import ProductEdit from '../../../components/admin/ProductEdit';
import ProductCreate from '../../../components/admin/ProductCreate';
import CategoryList from '../../../components/admin/CategoryList';
import OrderList from '../../../components/admin/OrderList';

export default function AdminAppPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    if (!slug || (Array.isArray(slug) && slug.length === 0)) {
      router.replace('/admin/dashboard');
    }
  }, [slug, router]);

  if (!slug || (Array.isArray(slug) && slug.length === 0)) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AdminProvider basename="/admin">
      <Resource
        name="products"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        show={ShowGuesser}
      />
      <Resource name="categories" list={CategoryList} />
      <Resource name="orders" list={OrderList} show={ShowGuesser} />
    </AdminProvider>
  );
}
