'use client';

import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ImageField,
  EditButton,
  DeleteButton,
  ShowButton,
  CreateButton,
  TopToolbar,
  FilterButton,
  SearchInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

const ProductFilters = [
  <SearchInput key="search" source="name" alwaysOn />,
  <ReferenceInput key="category" source="category" reference="categories" label="Category">
    <SelectInput optionText="name" emptyText="All" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const ProductList = () => (
  <List
    filters={ProductFilters}
    actions={<ListActions />}
    title="Products"
    perPage={25}
  >
    <Datagrid rowClick="edit">
      <ImageField
        source="image"
        label="Image"
        sx={{ width: 60, height: 60, objectFit: 'cover' }}
      />
      <TextField source="name" label="Product Name" />
      <TextField source="category" label="Category" />
      <NumberField
        source="price"
        label="Price"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <NumberField source="stock" label="Stock" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ProductList;
