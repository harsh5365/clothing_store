'use client';

import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  DeleteButton,
  ShowButton,
  CreateButton,
  TopToolbar,
  FilterButton,
  SearchInput,
  SelectInput,
  BooleanField,
  FunctionField,
  DateField,
  useGetList
} from 'react-admin';

const CategoryFilters = [
  <SearchInput source="name" alwaysOn />,
  <SelectInput source="parentId" choices={[
    { id: null, name: 'Main Categories' },
    { id: 1, name: 'Men' },
    { id: 2, name: 'Women' }
  ]} />,
  <SelectInput source="isActive" choices={[
    { id: true, name: 'Active' },
    { id: false, name: 'Inactive' }
  ]} />
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const CategoryList = () => {
  const { data: categoriesData } = useGetList('categories');

  const getParentName = (parentId) => {
    if (!parentId) return 'Main Category';
    const parent = categoriesData?.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Unknown';
  };

  const getCategoryType = (record) => {
    if (record.parentId === null) {
      return <span className="badge bg-primary">Main Category</span>;
    } else {
      return <span className="badge bg-secondary">Sub Category</span>;
    }
  };

  return (
    <List 
      filters={CategoryFilters}
      actions={<ListActions />}
      title="Categories"
      perPage={25}
    >
      <Datagrid rowClick="edit">
        <ImageField 
          source="image" 
          label="Image"
          sx={{ width: 60, height: 60, objectFit: 'cover' }}
        />
        <TextField source="name" label="Category Name" />
        <TextField source="slug" label="Slug" />
        <FunctionField 
          label="Type"
          render={(record) => getCategoryType(record)}
        />
        <FunctionField 
          label="Parent"
          render={(record) => getParentName(record.parentId)}
        />
        <TextField source="description" label="Description" />
        <BooleanField source="isActive" label="Active" />
        <DateField source="createdAt" label="Created" showTime />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default CategoryList;
