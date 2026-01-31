'use client';

import { Resource, ShowGuesser } from 'react-admin';
import AdminProvider from '../../../components/admin/AdminProvider';
import ProductList from '../../../components/admin/ProductList';
import ProductEdit from '../../../components/admin/ProductEdit';
import ProductCreate from '../../../components/admin/ProductCreate';
import CategoryList from '../../../components/admin/CategoryList';
import OrderList from '../../../components/admin/OrderList';

export default function AdminAppPage() {
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
