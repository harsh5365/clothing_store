'use client';

import {
  Create,
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

const ProductCreateToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const ProductCreate = () => (
  <Create title="Create Product">
    <SimpleForm toolbar={<ProductCreateToolbar />}>
      <TextInput source="name" validate={[required()]} fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <NumberInput
        source="price"
        validate={[required(), minValue(0)]}
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextInput source="image" label="Image URL" fullWidth />
      <ReferenceInput source="category" reference="categories" validate={[required()]}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="stock" validate={[minValue(0)]} defaultValue={0} />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
