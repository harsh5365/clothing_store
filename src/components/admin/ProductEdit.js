'use client';

import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
  minValue,
  SaveButton,
  Toolbar,
} from 'react-admin';

const ProductEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const ProductEdit = () => (
  <Edit title="Edit Product">
    <SimpleForm toolbar={<ProductEditToolbar />}>
      <TextInput source="name" validate={[required()]} fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <NumberInput
        source="price"
        validate={[required(), minValue(0)]}
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextInput source="image" label="Image URL" fullWidth />
      <ReferenceInput source="category" reference="categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="stock" validate={[minValue(0)]} />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
