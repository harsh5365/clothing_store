function apiUrl(path) {
  return path;
}

function applyFilter(data, filter) {
  if (!filter || !Object.keys(filter).length) return data;
  return data.filter((item) => {
    return Object.entries(filter).every(([key, value]) => {
      if (value == null || value === '') return true;
      const itemVal = item[key];
      if (itemVal == null) return false;
      return String(itemVal).toLowerCase().includes(String(value).toLowerCase());
    });
  });
}

function applySort(data, sort) {
  if (!sort?.field) return data;
  const { field, order } = sort;
  const dir = order === 'ASC' ? 1 : -1;
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal === bVal) return 0;
    return (aVal > bVal ? 1 : -1) * dir;
  });
}

// React Admin data provider – all data from API only
export const dataProvider = {
  getList: async (resource, params) => {
    if (resource === 'products') {
      const res = await fetch(apiUrl('/api/products'));
      if (!res.ok) throw new Error('Failed to fetch products');
      let data = await res.json();
      data = applyFilter(data, params.filter);
      data = applySort(data, params.sort);
      const total = data.length;
      const { page, perPage } = params.pagination;
      const start = (page - 1) * perPage;
      data = data.slice(start, start + perPage);
      return { data, total };
    }
    if (resource === 'categories') {
      const res = await fetch(apiUrl('/api/categories'));
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      const total = data.length;
      const { page, perPage } = params.pagination;
      const start = (page - 1) * perPage;
      const paginated = data.slice(start, start + perPage);
      return { data: paginated, total };
    }
    if (resource === 'orders') {
      const res = await fetch(apiUrl('/api/admin/orders'));
      if (!res.ok) throw new Error('Failed to fetch orders');
      let data = await res.json();
      data = applyFilter(data, params.filter);
      data = applySort(data, params.sort);
      const total = data.length;
      const { page, perPage } = params.pagination;
      const start = (page - 1) * perPage;
      data = data.slice(start, start + perPage);
      return { data, total };
    }
    return { data: [], total: 0 };
  },

  getOne: async (resource, params) => {
    if (resource === 'products') {
      const res = await fetch(apiUrl(`/api/products?id=${params.id}`));
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      return { data };
    }
    if (resource === 'categories') {
      const res = await fetch(apiUrl('/api/categories'));
      if (!res.ok) throw new Error('Failed to fetch categories');
      const list = await res.json();
      const record = list.find((c) => c.id === params.id || c.name === params.id);
      if (!record) return { data: { id: params.id, name: params.id } };
      return { data: record };
    }
    if (resource === 'orders') {
      const res = await fetch(apiUrl(`/api/admin/orders?id=${params.id}`));
      if (!res.ok) throw new Error('Order not found');
      const data = await res.json();
      return { data };
    }
    throw new Error('Unknown resource');
  },

  getMany: async (resource, params) => {
    if (resource === 'products') {
      const res = await fetch(apiUrl('/api/products'));
      if (!res.ok) throw new Error('Failed to fetch products');
      let data = await res.json();
      data = data.filter((item) => params.ids.includes(item.id));
      return { data };
    }
    if (resource === 'categories') {
      const res = await fetch(apiUrl('/api/categories'));
      if (!res.ok) throw new Error('Failed to fetch categories');
      const list = await res.json();
      const data = list.filter((c) => params.ids.includes(c.id));
      return { data };
    }
    if (resource === 'orders') {
      const res = await fetch(apiUrl('/api/admin/orders'));
      if (!res.ok) throw new Error('Failed to fetch orders');
      const list = await res.json();
      const data = list.filter((o) => params.ids.includes(o.id));
      return { data };
    }
    return { data: [] };
  },

  getManyReference: async (resource, params) => {
    if (resource === 'products' && params.target === 'categoryId') {
      const res = await fetch(apiUrl('/api/products'));
      if (!res.ok) throw new Error('Failed to fetch products');
      let data = await res.json();
      data = data.filter((item) => item.category === params.id);
      data = applySort(data, params.sort);
      const total = data.length;
      const { page, perPage } = params.pagination;
      const start = (page - 1) * perPage;
      data = data.slice(start, start + perPage);
      return { data, total };
    }
    return { data: [], total: 0 };
  },

  create: async (resource, params) => {
    if (resource === 'products') {
      const res = await fetch(apiUrl('/api/products'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create product');
      }
      const data = await res.json();
      return { data };
    }
    throw new Error('Create not supported for this resource');
  },

  update: async (resource, params) => {
    if (resource === 'products') {
      const res = await fetch(apiUrl(`/api/products?id=${params.id}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update product');
      }
      const data = await res.json();
      return { data };
    }
    throw new Error('Update not supported for this resource');
  },

  updateMany: async (resource, params) => {
    if (resource === 'products') {
      const results = await Promise.all(
        params.ids.map((id) =>
          fetch(apiUrl(`/api/products?id=${id}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params.data),
          })
        )
      );
      if (results.some((r) => !r.ok)) throw new Error('Failed to update some products');
      return { data: params.ids };
    }
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    if (resource === 'products') {
      const res = await fetch(apiUrl(`/api/products?id=${params.id}`), { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to delete product');
      }
      return { data: { id: params.id } };
    }
    throw new Error('Delete not supported for this resource');
  },

  deleteMany: async (resource, params) => {
    if (resource === 'products') {
      await Promise.all(
        params.ids.map((id) => fetch(apiUrl(`/api/products?id=${id}`), { method: 'DELETE' }))
      );
      return { data: params.ids };
    }
    return { data: params.ids };
  },
};
