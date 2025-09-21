'use client';

import { Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import AdminProvider from '../../components/admin/AdminProvider';
import ProductList from '../../components/admin/ProductList';
import ProductEdit from '../../components/admin/ProductEdit';
import ProductCreate from '../../components/admin/ProductCreate';
import CategoryList from '../../components/admin/CategoryList';
import CategoryEdit from '../../components/admin/CategoryEdit';
import CategoryCreate from '../../components/admin/CategoryCreate';

const AdminDashboard = () => {
  return (
    <AdminProvider>
      <Resource 
        name="products" 
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        show={ShowGuesser}
      />
      <Resource 
        name="categories" 
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        show={ShowGuesser}
      />
    </AdminProvider>
  );
};

export default AdminDashboard;
