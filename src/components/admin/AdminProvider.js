'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Admin } from 'react-admin';
import { dataProvider } from '../../data/admin/dataProvider';
import AdminLayout from './AdminLayout';
import AdminProtection from './AdminProtection';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const AdminProvider = ({ children, basename = '/admin' }) => {
  return (
    <AdminProtection>
      <BrowserRouter basename={basename}>
        <QueryClientProvider client={queryClient}>
          <Admin dataProvider={dataProvider} layout={AdminLayout} basename={basename}>
            {children}
          </Admin>
        </QueryClientProvider>
      </BrowserRouter>
    </AdminProtection>
  );
};

export default AdminProvider;
