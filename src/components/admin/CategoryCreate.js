'use client';

import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ImageInput,
  SelectInput,
  ReferenceInput,
  required,
  SaveButton,
  Toolbar,
  useGetList
} from 'react-admin';

const CategoryCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const CategoryCreate = () => {
  const { data: categoriesData } = useGetList('categories');
  
  const mainCategories = categoriesData?.filter(cat => cat.parentId === null) || [];

  return (
    <Create title="Create Category">
      <SimpleForm toolbar={<CategoryCreateToolbar />}>
        <TextInput source="name" validate={[required()]} fullWidth />
        <TextInput source="slug" validate={[required()]} fullWidth />
        <TextInput source="description" multiline rows={3} fullWidth />
        
        <ReferenceInput source="parentId" reference="categories" label="Parent Category">
          <SelectInput 
            optionText="name"
            optionValue="id"
            choices={mainCategories}
            emptyText="Main Category (No Parent)"
            emptyValue={null}
          />
        </ReferenceInput>

        <ImageInput source="image" label="Category Image">
          <ImageField source="src" title="title" />
        </ImageInput>

        <BooleanInput source="isActive" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
};

export default CategoryCreate;
