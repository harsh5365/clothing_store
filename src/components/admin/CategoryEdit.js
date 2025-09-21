'use client';

import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ImageInput,
  ImageField,
  SelectInput,
  ReferenceInput,
  required,
  SaveButton,
  Toolbar,
  useGetList
} from 'react-admin';

const CategoryEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const CategoryEdit = () => {
  const { data: categoriesData } = useGetList('categories');
  
  const mainCategories = categoriesData?.filter(cat => cat.parentId === null) || [];

  return (
    <Edit title="Edit Category">
      <SimpleForm toolbar={<CategoryEditToolbar />}>
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

        <BooleanInput source="isActive" />
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;
