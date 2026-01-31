'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const AdminProvider = ({ children }) => {
  return (
    <AdminProtection>
      <QueryClientProvider client={queryClient}>
        <Admin dataProvider={dataProvider} layout={AdminLayout}>
          {children}
        </Admin>
      </QueryClientProvider>
    </AdminProtection>
  );
};

export default AdminProvider;
