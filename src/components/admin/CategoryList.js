'use client';

import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  FilterButton,
  SearchInput,
} from 'react-admin';

const CategoryFilters = [
  <SearchInput key="search" source="name" alwaysOn />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
  </TopToolbar>
);

const CategoryList = () => (
  <List
    filters={CategoryFilters}
    actions={<ListActions />}
    title="Categories"
    perPage={25}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="Category" />
      <TextField source="name" label="Display Name" />
    </Datagrid>
  </List>
);

export default CategoryList;
