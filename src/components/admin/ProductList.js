'use client';

import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ImageField,
  EditButton,
  DeleteButton,
  ShowButton,
  CreateButton,
  TopToolbar,
  FilterButton,
  SearchInput,
  SelectInput,
  ReferenceInput,
  useGetList,
  ChipField,
  FunctionField,
  DateField
} from 'react-admin';
import { categories } from '../../data/admin/categories';

const ProductFilters = [
  <SearchInput source="name" alwaysOn />,
  <ReferenceInput source="categoryId" reference="categories" label="Category">
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <SelectInput source="isActive" choices={[
    { id: true, name: 'Active' },
    { id: false, name: 'Inactive' }
  ]} />,
  <SelectInput source="isFeatured" choices={[
    { id: true, name: 'Featured' },
    { id: false, name: 'Not Featured' }
  ]} />
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const ProductList = () => {
  const { data: categoriesData } = useGetList('categories');

  const getCategoryName = (categoryId) => {
    const category = categoriesData?.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getMainCategory = (categoryId) => {
    const category = categoriesData?.find(cat => cat.id === categoryId);
    if (!category) return 'Unknown';
    
    if (category.parentId === null) {
      return category.name;
    } else {
      const parentCategory = categoriesData?.find(cat => cat.id === category.parentId);
      return parentCategory ? parentCategory.name : 'Unknown';
    }
  };

  const getSubCategory = (categoryId) => {
    const category = categoriesData?.find(cat => cat.id === categoryId);
    if (!category || category.parentId === null) return null;
    return category.name;
  };

  return (
    <List 
      filters={ProductFilters}
      actions={<ListActions />}
      title="Products"
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <ImageField 
          source="images[0]" 
          label="Image"
          sx={{ width: 60, height: 60, objectFit: 'cover' }}
        />
        <TextField source="name" label="Product Name" />
        <TextField source="sku" label="SKU" />
        <FunctionField 
          label="Category"
          render={(record) => (
            <div>
              <div className="fw-bold">{getMainCategory(record.categoryId)}</div>
              {getSubCategory(record.categoryId) && (
                <div className="text-muted small">{getSubCategory(record.categoryId)}</div>
              )}
            </div>
          )}
        />
        <NumberField 
          source="price" 
          label="Price"
          options={{ style: 'currency', currency: 'USD' }}
        />
        <NumberField 
          source="comparePrice" 
          label="Compare Price"
          options={{ style: 'currency', currency: 'USD' }}
        />
        <FunctionField 
          label="Stock"
          render={(record) => {
            const totalStock = record.variants?.reduce((sum, variant) => sum + variant.stock, 0) || 0;
            return (
              <span className={totalStock > 0 ? 'text-success' : 'text-danger'}>
                {totalStock}
              </span>
            );
          }}
        />
        <BooleanField source="isActive" label="Active" />
        <BooleanField source="isFeatured" label="Featured" />
        <DateField source="createdAt" label="Created" showTime />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ProductList;
