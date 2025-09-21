import { products } from './products';
import { categories } from './categories';

// Simple in-memory data provider for React Admin
export const dataProvider = {
  getList: (resource, params) => {
    console.log('getList', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    // Apply filtering
    if (params.filter) {
      Object.keys(params.filter).forEach(key => {
        if (params.filter[key]) {
          data = data.filter(item => 
            item[key]?.toString().toLowerCase().includes(params.filter[key].toString().toLowerCase())
          );
        }
      });
    }

    // Apply sorting
    if (params.sort) {
      const { field, order } = params.sort;
      data.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (order === 'ASC') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = data.slice(start, end);

    return Promise.resolve({
      data: paginatedData,
      total: data.length,
    });
  },

  getOne: (resource, params) => {
    console.log('getOne', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    const record = data.find(item => item.id === params.id);
    if (!record) {
      return Promise.reject(new Error('Record not found'));
    }

    return Promise.resolve({
      data: record,
    });
  },

  getMany: (resource, params) => {
    console.log('getMany', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    const records = data.filter(item => params.ids.includes(item.id));
    return Promise.resolve({
      data: records,
    });
  },

  getManyReference: (resource, params) => {
    console.log('getManyReference', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    const records = data.filter(item => item[params.target] === params.id);
    return Promise.resolve({
      data: records,
      total: records.length,
    });
  },

  create: (resource, params) => {
    console.log('create', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    const newRecord = {
      id: Math.max(...data.map(item => item.id)) + 1,
      ...params.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.push(newRecord);

    return Promise.resolve({
      data: newRecord,
    });
  },

  update: (resource, params) => {
    console.log('update', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    const index = data.findIndex(item => item.id === params.id);
    if (index === -1) {
      return Promise.reject(new Error('Record not found'));
    }

    data[index] = {
      ...data[index],
      ...params.data,
      updatedAt: new Date().toISOString(),
    };

    return Promise.resolve({
      data: data[index],
    });
  },

  updateMany: (resource, params) => {
    console.log('updateMany', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    params.ids.forEach(id => {
      const index = data.findIndex(item => item.id === id);
      if (index !== -1) {
        data[index] = {
          ...data[index],
          ...params.data,
          updatedAt: new Date().toISOString(),
        };
      }
    });

    return Promise.resolve({
      data: params.ids,
    });
  },

  delete: (resource, params) => {
    console.log('delete', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    const index = data.findIndex(item => item.id === params.id);
    if (index === -1) {
      return Promise.reject(new Error('Record not found'));
    }

    data.splice(index, 1);

    return Promise.resolve({
      data: { id: params.id },
    });
  },

  deleteMany: (resource, params) => {
    console.log('deleteMany', resource, params);
    
    let data = [];
    switch (resource) {
      case 'products':
        data = products;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        data = [];
    }

    params.ids.forEach(id => {
      const index = data.findIndex(item => item.id === id);
      if (index !== -1) {
        data.splice(index, 1);
      }
    });

    return Promise.resolve({
      data: params.ids,
    });
  },
};
